import axios from 'axios';

const axiosInstance = (token?: string) =>
  axios.create({
    baseURL: 'https://dev.pondokdigital.pondokqu.id/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export default axiosInstance;
