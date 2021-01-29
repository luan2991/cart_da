import axiosClient from './axiosClient';

const productApi = {
  getAll(params) {
    // throw new Error('Loi ne :P');
    const url = '/products';
    return axiosClient.get(url, { params });
  },

  getById(id) {
    // throw new Error('Loi ne :P');
    const url = `/products/${id}`;
    return axiosClient.get(url, { id });
  },

  add(data) {
    const url = '/products';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
