// ./src/context/User/UserState.js
import { useReducer } from "react";

import AlertReducer from "./AlertReducer";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const initialState = {
    show: false,
    msg: null,
    cta: null,
    ctaURL: "",
  };

  const [globalState, dispatch] = useReducer(AlertReducer, initialState);

  const setShowOn = (data) => {
    dispatch({
      type: "SHOW_ON",
      payload: data,
    });
  };

  const setShowOff = () => {
    dispatch({
      type: "SHOW_OFF",
      payload: false,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        show: globalState.show,
        msg: globalState.msg,
        cta: globalState.cta,
        ctaURL: globalState.ctaURL,
        setShowOff,
        setShowOn,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
