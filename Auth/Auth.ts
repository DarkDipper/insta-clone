type User = {
  userName: string;
  email: string;
  passWord: string;
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
  async signIn(userName: string, passWord: string) {
    console.log(`Sign in with email: ${userName} password: ${passWord}`);
    this.user = {
      userName: "John",
      passWord: "123456",
      email: "john@gmail.com",
      token: "789456",
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
    this.onAuthStateChange(cb)
    this.onUserChange(this.user)
  }
}

export { Auth, type User };
