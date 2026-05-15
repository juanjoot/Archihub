import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setStorage, getStorage, removeStorage } from "../../services/utils";

export const actionTypes = {
  SetAuth: "[Auth] Set Authentication",
  Logout: "[Auth] Logout",
  SetUser: "[Auth] Set User",
};

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const initialAuthState = {
  token: getStorage(TOKEN_KEY) || null,
  user: (() => {
    try {
      const userData = getStorage(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  })(),
  isAuthenticated: !!getStorage(TOKEN_KEY),
};

export const reducer = persistReducer(
  {
    storage,
    key: "cev-auth",
    whitelist: ["token", "user", "isAuthenticated"],
  },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.SetAuth: {
        const { token, user } = action.payload;
        // Save to localStorage with 7 days expiration
        setStorage(TOKEN_KEY, token, 7 * 24 * 60 * 60);
        setStorage(USER_KEY, JSON.stringify(user), 7 * 24 * 60 * 60);
        
        return {
          ...state,
          token,
          user,
          isAuthenticated: true,
        };
      }

      case actionTypes.Logout: {
        // Remove from localStorage
        removeStorage(TOKEN_KEY);
        removeStorage(USER_KEY);
        
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
        };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        setStorage(USER_KEY, JSON.stringify(user), 7 * 24 * 60 * 60);
        
        return {
          ...state,
          user,
        };
      }

      default: {
        return state;
      }
    }
  }
);

export const actions = {
  setAuth: (token, user) => ({
    type: actionTypes.SetAuth,
    payload: { token, user },
  }),
  logout: () => ({
    type: actionTypes.Logout,
  }),
  setUser: (user) => ({
    type: actionTypes.SetUser,
    payload: { user },
  }),
};

// Selectors
export const selectAuth = (state) => state.auth;
export const selectToken = (state) => state.auth?.token;
export const selectUser = (state) => state.auth?.user;
export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated || false;
