import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    const { accessToken } = JSON.parse(token);
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axios.interceptors.response.use((response) => {
  return response;
});

export const httpClient = axios;
export const fetcher = (url: string) => httpClient(url).then((res) => res.data);
