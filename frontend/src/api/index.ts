import { toast } from 'sonner';

import { ChainlitAPI, ClientError } from '@chainlit/react-client';

// const devServer = 'http://192.168.0.110:5051';
// const devServer = 'https://crypto-beat--alvin.modal.run';
// const devServer = 'https://avinai-api.tekup.vn';
const devServer = import.meta.env.VITE_DEVSERVER_URL
const url = import.meta.env.DEV ? devServer : window.origin;
const serverUrl = new URL(url);

const httpEndpoint = `${serverUrl.protocol}//${serverUrl.host}`;

const on401 = () => {
  if (window.location.pathname !== '/login') {
    // The credentials aren't correct, remove the token and redirect to login
    window.location.href = '/login';
  }
};

const onError = (error: ClientError) => {
  toast.error(error.toString());
};

export const apiClient = new ChainlitAPI(httpEndpoint, 'app', on401, onError);
