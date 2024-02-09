// api.js
import axios from 'axios';
import store from '@/store';

const baseURL = axios.defaults.baseURL; // Obtén la URL base configurada en el store

// Función para realizar solicitudes con token
const requestWithToken = async (path, method, data) => {
  try {
    const response = await axios({
      method,
      url: `${baseURL}/${path}`, // Utiliza la URL base configurada
      data,
      headers: {
        Authorization: `Bearer ${store.state.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al realizar la solicitud a ${path}:`, error);
    throw error;
  }
};

// Función para realizar solicitudes GET
export const get = async (path) => {
  return requestWithToken(path, 'get', null);
};

// Función para realizar solicitudes POST
export const post = async (path, data) => {
  return requestWithToken(path, 'post', data);
};

// Función para realizar solicitudes PUT
export const put = async (path, data) => {
  return requestWithToken(path, 'put', data);
};

// Función para realizar solicitudes DELETE
export const remove = async (path) => {
  return requestWithToken(path, 'delete', null);
};
