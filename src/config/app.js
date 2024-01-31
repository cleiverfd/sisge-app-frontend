// src/plugins/axios.js
import { createApp } from 'vue';
import axios from 'axios';

const app = createApp();

const apiClient = axios.create({
  baseURL: 'http://legalcasebackprivate.test/api/user', 
});

app.config.globalProperties.$api = apiClient;

export default {
  install() {
    app.config.globalProperties.$api = apiClient;
  },
};
