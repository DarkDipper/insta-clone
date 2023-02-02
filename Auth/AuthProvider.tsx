import {
  createContext,
  useEffect,
  useState,
  useReducer,
  Dispatch,
} from "react";
import AuthReducer from "./AuthReducer";
import { Auth, User } from "./Auth";

const INITIAL_STATE = {
  user: null,
  initializing: true,
  error: null,
};

const auth = new Auth();

const redirectKey = "sign_in_redirect";

const AuthContext = createContext<
  | {
      auth: Auth;
      initializing: boolean;
      user: User | null;
      error: string | null;
      setRedirect: (redirect: string) => void;
      getRedirect: () => string | null;
      clearRedirect: () => void;
      dispatch: Dispatch<any>;
    }
  | undefined
>(undefined);

function setRedirect(redirect: string) {
  window.sessionStorage.setItem(redirectKey, redirect);
}

function getRedirect(): string | null {
  return window.sessionStorage.getItem(redirectKey);
}

function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey);
}

function AuthProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    dispatch({ type: "LOGIN_START", payload: undefined });
    auth.resolveUser((user, error) => {
      // console.log("auth state changed", user);
      if (user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        console.log("Finished authorize");
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
      }
    });
  }, []);
  const value = {
    auth,
    initializing: state.initializing,
    user: state.user,
    error: state.error,
    setRedirect,
    getRedirect,
    clearRedirect,
    dispatch,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
