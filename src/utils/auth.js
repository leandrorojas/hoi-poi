// Note: localStorage is used here because this module is consumed by multiple
// micro-frontends via Module Federation, where HttpOnly cookies would require
// a shared backend. If your deployment adds a BFF or auth proxy, migrate to
// HttpOnly Secure SameSite cookies for stronger XSS protection.
const TOKEN_KEY = "hoi_poi_auth_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
