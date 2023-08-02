import { useReducer, useMemo, createContext } from "react";

const initOrderState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  //   pessangerAmount: 0,
  //   luggageAmount: 0,
  date: "",
  notes: "",
  payment: "",
  succesForm: false,
};

const REDUCER_ACTION_TYPE = {
  change: "change",
  submit: "submit",
  clear: "clear",
};

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.change:
      if (!action.payload) {
        throw new Error("action.payload missing in CHANGE Order");
      }

      const { key, value } = action.payload;

      return { ...state, [key]: value };
    case REDUCER_ACTION_TYPE.submit:
      if (!action.payload) {
        throw new Error("action.payload missing in SUBMIT Order");
      }
      return { state, succesForm: action.payload.data };
    case REDUCER_ACTION_TYPE.clear:
      state = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        date: "",
        notes: "",
        payment: "",
        succesForm: false,
      };

      break;

    default:
      break;
  }
};

const useOrderContext = (initOrderState) => {
  const [state, dispatch] = useReducer(reducer, initOrderState);

  const REDUCER_ACTION = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  return {
    dispatch,
    state,
    REDUCER_ACTION,
  };
};

const initOrderContextState = {
  dispatch: () => {},
  state: initOrderState,
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
};

export const OrderContext = createContext(initOrderContextState);

export const OrderProvider = ({ children }) => {
  return (
    <OrderContext.Provider value={useOrderContext(initOrderState)}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
