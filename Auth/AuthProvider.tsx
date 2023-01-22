import { createContext, useEffect, useState, useContext } from "react";
import { Auth, User } from "./Auth";

const auth = new Auth();

const redirectKey = "sign_in_redirect";

const AuthContext = createContext<
  | {
      auth: Auth;
      initializing: boolean;
      user: User | null;
      error: { message: string } | null;
      setRedirect: (redirect: string) => void;
      getRedirect: () => string | null;
      clearRedirect: () => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth.resolveUser((user, error) => {
      console.log("auth state changed", user);
      if (user) {
        setUser(user);
        setError(null);
      } else {
        setUser(null);
        if (error) {
          setError(error);
        }
      }
      setInitializing(false);
    });
  }, []);
  const value = {
    auth,
    initializing,
    user,
    error,
    setRedirect,
    getRedirect,
    clearRedirect,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
