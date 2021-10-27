import axios from 'axios';

const customAxios = axios.create({ baseURL: `http://localhost:8080/api/v1/`, timeout: 10000});

const requestHandler = request => {
  const token = localStorage.getItem('token')

  request.headers.Authorization = `Bearer ${token}`;

  return request;

};

const responseHandler = response => {

  return response;
};


const errorHandler = error => {

  return Promise.reject(error);
};


customAxios.interceptors.request.use(

  request => requestHandler(request),

  error => errorHandler (error)

);

customAxios.interceptors.response.use(

  response => responseHandler (response),

  error => {
      if (error.response.status === 401) { localStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);

export default customAxios


