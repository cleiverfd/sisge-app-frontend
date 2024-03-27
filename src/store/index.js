// import { createApp } from 'vue';
import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";

axios.defaults.baseURL = 'http://appsisgebackend.test/api';
axios.defaults.withCredentials = false;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    authenticating: false
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
      if (!credentials.email || !credentials.password) {
        return { 'error': 'Email y contraseña son campos requeridos.' };
      }

      try {
        commit('SET_AUTHENTICATING', true);

        const response = await axios.post('/user/login', credentials);

        if (response.data.token && response.data.user) {
          commit('SET_TOKEN', response.data.token);
          commit('SET_USER', response.data.user);
          localStorage.setItem('token', response.data.token);
          return response.data;
        } else {
          return response.response.data;
        }

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

      commit('SET_TOKEN', null);
      commit('SET_USER', null);
      localStorage.removeItem('token');
    },

    async checkAuthentication({ commit, state }) {
      // Verifica la autenticación al cargar la aplicación
      if (state.token) {
        try {
          const response = await axios.get('/user/login');
          commit('SET_USER', response.data.user);
        } catch (error) {
          console.error('Error al verificar la autenticación:', error);
          commit('SET_USER', null);
          commit('SET_TOKEN', null);
          localStorage.removeItem('token');
        }
      }
    },
    
  },
  plugins: [createPersistedState()],
});

export default store;
