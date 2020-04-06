const encode = {
  /* eslint-disable */
  utf8Encode(str) {

    const string = str.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    let utftext = '';
    let start = 0;
    let end = 0;

    for (let n = 0; n < string.length; n++) {
      const c1 = string.charCodeAt(n);
      let enc = null;

      if (c1 < 128) {
        end++;
      } else if ((c1 > 127) && (c1 < 2048)) {
        enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
      } else {
        enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.substring(start, end);
        }
        utftext += enc;
        start = end = n + 1;
      }
    }

    if (end > start) {
      utftext += string.substring(start, string.length);
    }

    return utftext;
  },

  base64(string) {
    const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    if (!string) {
      return string;
    }
    const data = encode.utf8Encode(string);
    let i = 0;
    let ac = 0;
    const tempArray = [];
    do {
      const o1 = data.charCodeAt(i++);
      const o2 = data.charCodeAt(i++);
      const o3 = data.charCodeAt(i++);

      const bits = o1 << 16 | o2 << 8 | o3;

      const h1 = bits >> 18 & 0x3f;
      const h2 = bits >> 12 & 0x3f;
      const h3 = bits >> 6 & 0x3f;
      const h4 = bits & 0x3f;
      tempArray[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    let enc = tempArray.join('');

    switch (data.length % 3) {
      case 1:
        enc = `${enc.slice(0, -2)}==`;
        break;
      case 2:
        enc = `${enc.slice(0, -1)}=`;
        break;
      default:
      	break;
    }

    return enc;
  },
  /* eslint-disable */
};

export default encode;

export const {
  utf8Encode,
  base64
} = encode;
