import axios from 'axios';
import { Config } from 'react-native-config';
import useAuthStore from './state/auth';

const instance = axios.create({
  baseURL: Config.API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const {
      auth: { token: authToken },
    } = useAuthStore.getState();

    // prevent undefined becoming a string
    const token = authToken || '';

    if (config.headers) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (err: Error) => Promise.reject(err)
);

export default instance;
