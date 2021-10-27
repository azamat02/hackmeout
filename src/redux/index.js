import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer, {signIn} from "./authReducer";
import thunk from 'redux-thunk'
import AuthService from "../services/authService";

const rootReducer = combineReducers({
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
})

const authService = new AuthService()

if (authService.AuthCheck()) {
  store.dispatch(signIn(JSON.parse(localStorage.getItem('user'))))
}

