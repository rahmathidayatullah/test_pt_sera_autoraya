import {
  USER_LOGIN_ERROR,
  USER_LOGIN_START,
  RESET_STATUS,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_ERROR,
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
} from "./constants";
import axios from "axios";
// import { config } from "../../config";

import { login, registerUser } from "../../api/authentication";

export const postLogin = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: USER_LOGIN_START,
    });
    try {
      let res = await axios.post("https://reqres.in/api/login", formData);

      console.log("data login berhasil", res);
    } catch (error) {
      console.log("error.response", error.response);
      dispatch({
        type: USER_LOGIN_ERROR,
      });
    }
  };
};

export const userRegister = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: USER_REGISTER_START,
    });
    try {
      let res = await axios.post("https://reqres.in/api/register", formData);

      console.log("data login berhasil", res);
    } catch (error) {
      console.log("error.response", error.response);
      dispatch({
        type: USER_REGISTER_ERROR,
      });
    }
  };
};
