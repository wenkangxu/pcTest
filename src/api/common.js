export default function common(api) {
  return {
    // 请求数据
    queryData: (query) => api.get('/server/getData', query),
    // 提交数据
    submitData: (query) => api.post('/server/submitData', query),
  };
}
