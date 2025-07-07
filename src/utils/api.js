import Cookies from "js-cookie";

export const API_BASE =
  "https://arccorpbackendprosustrack-production.up.railway.app/api";

export async function apiFetch(endpoint, options = {}) {
  const token = Cookies.get("authToken");
  return fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
      ...options.headers,
    },
  });
}
