import axios from "axios"

export const USER_SIGN_IN_REQUEST = "USER_SIGNIN_REQUEST"
export const USER_SIGN_IN_SUCCESS = "USER_SIGNIN_SUCCESS"
export const USER_SIGN_IN_FAIL = "USER_SIGNIN_FAIL"
export const USER_SIGN_OUT = "USER_SIGNIN_OUT"

export const USER_REGISTRATION_REQUEST = "USER_REGISTRATION_REQUEST"
export const USER_REGISTRATION_SUCCESS = "USER_REGISTRATION_SUCCESS"
export const USER_REGISTRATION_FAIL = "USER_REGISTRATION_FAIL"

export const userSingInAction = (email, password) => async (
    dispatch
  ) => {
    dispatch({ type: USER_SIGN_IN_REQUEST });
    try {
      const { data } = await axios.post("http://localhost:5000/signin", { email, password }, {
          headers: {
              "Content-Type": "application/json"
          }
      });
      dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_SIGN_IN_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.error,
      });
    }
  };



  export const userRegistrationAction = (firstName, lastName,  email, phoneNumber, password) => async(dispatch) => {
    dispatch({type: USER_REGISTRATION_REQUEST})
    try {
      const { data } = await axios.post("http://localhost:5000/register", { firstName, lastName,  email, phoneNumber, password }, {
        headers: {
            "Content-Type": "application/json"
        }
      });
      dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data });
      dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTRATION_FAIL,
        payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
      });
    }
  }

export  const signOutAction = ()=> (dispatch)=> {
      localStorage.removeItem('userInfo')
      dispatch({type: USER_SIGN_OUT})
  }