import { useReducer, useMemo, createContext } from "react";
import { browserHistory } from "react-router";

const initAuthState = {
  modalRegis: false,
  modalLogin: false,
  isLogin: false,
  user: null,
};

const REDUCER_ACTION_TYPE = {
  toggleModalRegis: "toggleModalRegis",
  toggleModalLogin: "toggleModalLogin",
  login: "login",
  logout: "logout",
};

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.toggleModalLogin:
      if (!action.payload) {
        throw new Error("action.payload missing in toggleModalLogin");
      }

      return { ...state, [action.payload.key]: action.payload.value };
    case REDUCER_ACTION_TYPE.toggleModalRegis:
      if (!action.payload) {
        throw new Error("action.payload missing in toggleModalRegis");
      }

      return { ...state, [action.payload.key]: action.payload.value };
    case REDUCER_ACTION_TYPE.login:
      return { ...state, user: action.payload.user, isLogin: true };
      break;
    case REDUCER_ACTION_TYPE.logout:
      return { ...state, user: null, isLogin: false };

      break;

    default:
      break;
  }
};

const useAuthContext = (initAuthState) => {
  const [state, dispatch] = useReducer(reducer, initAuthState);

  const REDUCER_ACTION = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  return {
    dispatch,
    state,
    REDUCER_ACTION,
  };
};

const initAuthContextState = {
  dispatch: () => {},
  state: initAuthState,
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
};

export const AuthContext = createContext(initAuthContextState);

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuthContext(initAuthState)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
