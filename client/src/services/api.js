import axios from 'axios';

const API_BASE = 'http://localhost:5216/api';

export const getCustomers = () => axios.get(`${API_BASE}/Customer`);
export const getCustomerById = (id) => axios.get(`${API_BASE}/Customer/${id}`);
export const getProductsByCustomer = (id, page = 1, pageSize = 5, sortBy = 'ProductId', sortOrder = 'asc') =>
  axios.get(`${API_BASE}/Product/${id}`, { params: { page, pageSize, sortBy, sortOrder } });
export const addProduct = (product) => axios.post(`${API_BASE}/Product`, product);
export const updateProduct = (id, product) => axios.put(`${API_BASE}/Product/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/Product/${id}`);
