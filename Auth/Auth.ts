import { setCookie, getCookie, removeCookies } from "cookies-next";
import { AxiosResponse } from "axios";
type User = {
  _id: string;
  token: string;
  userName: string;
  avatar: string;
  theme: string;
};

// User Callback function
type UserCB = (user: User | null, error: any) => void;

class Auth {
  user: User | null;
  error: string | null;
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
  onUserChange(error?: string | null) {
    this.cb && this.cb(this.user, error);
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
        const { userToken, user_name, avatar, _id, theme } = respone.data;
        this.user = {
          _id: _id,
          token: userToken,
          userName: user_name,
          avatar: avatar,
          theme: theme,
        };
        setCookie("6gR265$m_t0k3n", userToken, {
          sameSite: "none",
          secure: true,
        });
        setCookie("user", this.user, {
          sameSite: "none",
          secure: true,
        });
        // window.sessionStorage.setItem("user", JSON.stringify(this.user));
        // this.onUserChange(this.user);
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
  async resolveUser(cb: UserCB) {
    // const signedInUser = window.sessionStorage.getItem("user");
    const authCookie = getCookie("6gR265$m_t0k3n");
    const { user, message } = await fetch(
      "https://insta-clone-backend-rust.vercel.app/api/v1/user/auth",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCookie,
        },
        method: "POST",
      }
    ).then(async (res) => {
      if (res.status !== 200) {
        const { message } = await res.json();
        return {
          status: false,
          user: null,
          message: message,
        };
      }
      return res.json();
    });
    this.user = user;
    this.error = message;
    this.onAuthStateChange(cb);
    this.onUserChange(this.error);
  }
}

export { Auth, type User };
