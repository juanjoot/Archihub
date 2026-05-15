import { getStorage, setStorage, removeStorage } from "./utils";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

/**
 * Check if user is authenticated by verifying token exists and is valid
 */
export function isAuthenticated() {
  const token = getStorage(TOKEN_KEY);
  return !!token;
}

/**
 * Get the stored JWT token
 */
export function getToken() {
  return getStorage(TOKEN_KEY);
}

/**
 * Get the stored user data
 */
export function getUser() {
  try {
    const userData = getStorage(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

/**
 * Save authentication data to localStorage
 */
export function saveAuth(token, user, expiresInSeconds = 7 * 24 * 60 * 60) {
  setStorage(TOKEN_KEY, token, expiresInSeconds);
  setStorage(USER_KEY, JSON.stringify(user), expiresInSeconds);
}

/**
 * Clear authentication data from localStorage
 */
export function clearAuth() {
  removeStorage(TOKEN_KEY);
  removeStorage(USER_KEY);
}

/**
 * Get authorization headers with JWT token if available
 */
export function getAuthHeaders() {
  const headers = new Headers({ "Content-Type": "application/json" });
  const token = getToken();
  
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  
  return headers;
}
