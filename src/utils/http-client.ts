import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use((response) => {
  return response;
});

export const httpClient = axios;
export const fetcher = (url: string) => httpClient(url).then((res) => res.data);
