import { setCookie, getCookie, removeCookies } from "cookies-next";
import { AxiosResponse } from "axios";
type User = {
  token: string;
};

// User Callback function
type UserCB = (user: User | null, error: any) => void;

class Auth {
  user: User | null;
  error: { message: string } | null;
  cb: UserCB | null;

  constructor() {
    this.user = null;
    this.error = null;
    this.cb = null;
  }
  onAuthStateChange(cb: UserCB) {
    this.cb = cb;
    return () => {
      this.cb = null;
    };
  }
  protected onUserChange(user: User | null, error?: { message: string }) {
    this.cb && this.cb(user, error);
  }
  async signUp(respone: AxiosResponse | void) {
    try {
      if (respone === undefined) {
        throw Error("Respone is void");
      }
      const { status, message, data } = await respone.data;
      return true;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      return false;
    }
  }
  async signIn(respone: AxiosResponse | void) {
    try {
      if (respone === undefined) {
        throw Error("Respone is void");
      }
      if (respone.status === 200) {
        const { userToken } = respone.data;
        this.user = {
          token: userToken,
        };
        setCookie("6gR265$m_t0k3n", userToken, {
          sameSite: "none",
          secure: true,
        });
        // window.sessionStorage.setItem("user", JSON.stringify(this.user));
        this.onUserChange(this.user);
      } else {
        throw Error(`${respone.status}`);
      }
      return true;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      return false;
    }
  }
  async signOut() {
    console.log("Sign out");
    // window.sessionStorage.removeItem("user");
    removeCookies("6gR265$m_t0k3n");
    this.user = null;
    this.onUserChange(this.user);
  }
  resolveUser(cb: UserCB) {
    setTimeout(() => {
      if (window) {
        // const signedInUser = window.sessionStorage.getItem("user");
        const signedInUser = getCookie("6gR265$m_t0k3n");

        if (typeof signedInUser === "string") {
          this.user = {
            token: signedInUser,
          };
        }
      }
      this.onAuthStateChange(cb);
      this.onUserChange(this.user);
    }, 0);
  }
}

export { Auth, type User };
