import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import { userRegistrationReducer, userSingInReducer } from './components/userReducer';


const initialState = {
    userSignIn: {
            userInfo: localStorage.getItem('userInfo')
              ? JSON.parse(localStorage.getItem('userInfo'))
              : null,
          },
}
const reducer = combineReducers({

    userSignIn: userSingInReducer,
    userRegistration: userRegistrationReducer
   
})
const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store