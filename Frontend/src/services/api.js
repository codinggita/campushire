import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const studentLoginCall = async (credentials) => {
  const response = await api.post('/auth/student-login', credentials);
  return response.data;
};

export const companyLoginCall = async (credentials) => {
  const response = await api.post('/auth/company-login', credentials);
  return response.data;
};

export default api;
