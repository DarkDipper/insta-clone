import type { User } from "./Auth";

type State = {
  user: User | null;
  initializing: boolean;
  error: string | null;
};
type Action = {
  type: string;
  payload: User | string | undefined;
};

function AuthReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        initializing: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload as User,
        initializing: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        initializing: false,
        error: action.payload as string,
      };
    default:
      return state;
  }
}

export default AuthReducer;
