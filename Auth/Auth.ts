type User = {
  // userName: string;
  // email: string;
  // passWord: string;
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
  async signUp(userName: string, passWord: string, Email: string) {
    const respone = await fetch("http://localhost:5000/api/v1/user/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: passWord,
        email: Email,
      }),
    });
    const json = await respone.json();
    return json;
  }
  async signIn(userName: string, passWord: string) {
    console.log(`Sign in with email: ${userName} password: ${passWord}`);
    const respone = await fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: passWord,
      }),
    });
    const json = await respone.json();
    this.user = {
      token: json.userToken,
    };
    window.sessionStorage.setItem("user", JSON.stringify(this.user));
    this.onUserChange(this.user);
  }
  async signOut() {
    console.log("Sign out");
    window.sessionStorage.removeItem("user");
    this.user = null;
    this.onUserChange(this.user);
  }
  resolveUser(cb: UserCB) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.sessionStorage.getItem("user");
        if (signedInUser) {
          this.user = JSON.parse(signedInUser);
        }
      }
      this.onAuthStateChange(cb);
      this.onUserChange(this.user);
    }, 0);
  }
}

export { Auth, type User };
