import { USER_REGISTRATION_FAIL, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_SIGN_IN_FAIL, USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS, USER_SIGN_OUT } from "./Actions/userAction";


export const userSingInReducer = (
    state = { userInfo: {}, loading: true },
    action
  ) => {
    switch (action.type) {
      case USER_SIGN_IN_REQUEST:
        return { loading: true };
      case USER_SIGN_IN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_SIGN_IN_FAIL:
        return { loading: false, error: action.payload };
      case USER_SIGN_OUT:
        return { loading: false, userInfo: {} };
      default:
        return state;
    }
  };
  
  export const userRegistrationReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case USER_REGISTRATION_REQUEST:
        return { loading: true };
      case USER_REGISTRATION_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTRATION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return (state = {});
    }
  };
  