import axios from 'axios';

export const AXIOS_INSTANCE = axios.create({ baseURL: '' });

export const customInstance = <T>({ url, method, params, data, headers }: any) =>
  AXIOS_INSTANCE({
    url,
    method,
    params,
    data,
    headers,
  }).then((res) => res.data as T); 