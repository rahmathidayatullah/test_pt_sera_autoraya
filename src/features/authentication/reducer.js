import {
  USER_LOGIN_ERROR,
  USER_LOGIN_START,
  RESET_STATUS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_START,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_ERROR,
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      user: null,
      token: null,
      statusLogin: statuslist.idle,
      statusRegister: statuslist.idle,
    };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        statusLogin: statuslist.process,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        statusLogin: statuslist.success,
        dataLogin: action.payload,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        statusLogin: statuslist.error,
      };
    case USER_REGISTER_START:
      return {
        ...state,
        statusRegister: statuslist.process,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        statusRegister: statuslist.success,
        dataRegister: action.payload,
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        statusRegister: statuslist.error,
      };
    case RESET_STATUS:
      return {
        ...state,
        statusLogin: statuslist.idle,
        statusRegister: statuslist.idle,
      };

    default:
      return state;
  }
}
