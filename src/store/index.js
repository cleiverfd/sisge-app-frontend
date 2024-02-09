// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = 'http://legalcasebackprivate.test/api';

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    authenticating: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_AUTHENTICATING(state, status) {
      state.authenticating = status;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_AUTHENTICATING', true);

        const response = await axios.post('/user/login', credentials);
        if(response.data.token && response.data.user){
          commit('SET_TOKEN', response.data.token);
          commit('SET_USER', response.data.user);
          localStorage.setItem('token', response.data.token);  
        }
        const user = response.data?.user || response.data;
        return user;

      } catch (error) {
        console.error('Error de inicio de sesión:', error);
        throw error;
      } finally {
        commit('SET_AUTHENTICATING', false);
      }
    },
    async logout({ commit }) {
      try {

        await axios.post('/user/logout');
      } catch (logoutError) {
        console.error('Error al cerrar sesión en el backend:', logoutError);
      }

      // Limpia el token y el usuario del estado y el almacenamiento local
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
      localStorage.removeItem('token');
    },
    async checkAuthentication({ commit, state }) {
      // Verifica la autenticación al cargar la aplicación
      if (state.token) {
        try {
          const response = await axios.get('/user/login'); // Reemplaza con tu ruta para obtener la información del usuario
          commit('SET_USER', response.data.user);
        } catch (error) {
          console.error('Error al verificar la autenticación:', error);
          commit('SET_USER', null);
          commit('SET_TOKEN', null);
          localStorage.removeItem('token');
        }
      }
    },
    async fetchData({ state }, { path, method = 'get', data = null }) {
      try {
        const response = await axios({
          method,
          url: `/${path}`,
          data,
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(`Error al realizar la solicitud a ${path}:`, error);
        throw error;
      }
    },
  },
});

// Interceptor de respuesta para manejar la renovación del token (mismo código que en respuestas anteriores)
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si la solicitud falla debido a un token expirado y no estamos renovándolo actualmente
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Realiza una solicitud para renovar el token (reemplaza '/api/refresh' con tu ruta correspondiente)
        const response = await axios.post('/api/refresh', { refreshToken: localStorage.getItem('refreshToken') });

        // Actualiza el token en el estado y en el almacenamiento local
        store.commit('SET_TOKEN', response.data.token);
        localStorage.setItem('token', response.data.token);

        // Vuelve a intentar la solicitud original con el nuevo token
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Error al renovar el token:', refreshError);
        // Puedes redirigir a la página de inicio de sesión o realizar otras acciones según tus necesidades
        // router.push('/login');
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default store;
