import customAxios from "../components/extra/customAxios";

export default class FileService {
  constructor() {
    this._apiBase = 'http://localhost:8080/api/v1/'
  }

  SendSign = async (data) => {
    let res = await customAxios.post('signed-document/create-signed-document', data).then((response)=>{
      return response
    })
    return res;
  }

  SendFile = async (data) => {
    let res = await customAxios.post('document-for-signing/create-document-for-signing', data).then((response)=>{
      return response
    })
    return res;
  }

  GetFilesByUsername = async () => {
    let res = await customAxios.get('document-for-signing/get-document-for-signing/receiver').then((response)=>{
      return response
    })
    return res;
  }
}

