import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
  userData: {}
}

export const signIn = createAction('AUTH/SIGN_IN')
export const logout = createAction('AUTH/LOGOUT')

export default createReducer(initialState, {
    [signIn]: function (state, action) {
      state.authorized = true;
      state.userData = action.payload
    },
    [logout]: function (state) {
      state.authorized = false;
      state.userData = {}
    }
  }
)
