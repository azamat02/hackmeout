import axios from "axios";

export default class AuthService {
  constructor() {
    this._apiBase = 'http://localhost:8080/api/v1/auth'
  }

  SignUp = async (data) => {
    let res = await axios.post(`${this._apiBase}/signup`, data).then((response)=>{
      return response
    })
    return res;
  }

  SignIn = async (data) => {
    let res = await axios.post(`${this._apiBase}/authorization`, data).then((response)=>{
      return response
    })
    return res;
  }

  AuthCheck = () => {
    if (localStorage.getItem('token') != null ?? localStorage.getItem('user')) {
      return true
    }
    return false
  }

  Logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

