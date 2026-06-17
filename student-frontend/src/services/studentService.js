import apiClient from '../api/axiosConfig';

const STUDENTS_URL = '/students';

export const studentService = {
  getAll: async () => {
    const response = await apiClient.get(STUDENTS_URL);
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`${STUDENTS_URL}/${id}`);
    return response.data;
  },
  create: async (student) => {
    const response = await apiClient.post(STUDENTS_URL, student);
    return response.data;
  },
  update: async (id, student) => {
    const response = await apiClient.put(`${STUDENTS_URL}/${id}`, student);
    return response.data;
  },
  delete: async (id) => {
    await apiClient.delete(`${STUDENTS_URL}/${id}`);
  }
};