import customAxios from "../components/extra/customAxios";

export default class UserService {
  constructor() {
    this._apiBase = 'http://localhost:8080/api/v1/user'
  }

  GetAllUsers = async () => {
    let res = await customAxios.get('user/get-all-users').then((response)=>{
      return response
    })
    return res;
  }
}

