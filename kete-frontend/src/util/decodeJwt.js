function urlDecode(str) {
  str = str.replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/\s/g, ' ');

  return atob(str);
}

function decodeJwt(token) {
  const body = token.split('.')[1];
  return JSON.parse(urlDecode(body));
}

export default decodeJwt;
