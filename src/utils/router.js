export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!');  // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes, routerData, path) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every((item) => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter((item) => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }

  // 增加isPrimary标志位为true的路由
  renderArr = renderArr.concat(routes.filter((route) => routerData[path + route].isPrimary));
  // 去重
  renderArr = [...new Set(renderArr)];
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData, defaultPrimary = false) {
  const routerDataCopy = { ...routerData };
  Object.keys(routerDataCopy).forEach((key) => {
    if (routerDataCopy[key].isPrimary === undefined) {
      routerDataCopy[key].isPrimary = defaultPrimary;
    }
  });
  let routes = Object.keys(routerDataCopy)
    .filter((routePath) => routePath.indexOf(path) === 0 && routePath !== path);
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map((item) => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes, routerDataCopy, path);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    // 对于 item， 存在 isPrimary 为 false 的子路由，则 exact 为 false
    const exact = !routes.some((route) => route !== item
      && !routerDataCopy[path + route].isPrimary
      && getRelation(route, item) === 1);
    return {
      ...routerDataCopy[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}
