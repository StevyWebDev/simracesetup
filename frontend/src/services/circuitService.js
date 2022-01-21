import axios from 'axios';

const url = 'http://localhost:3001/circuit/';

export const findOneByIdCircuit = (id) => axios.get(`${url}findOneById/${id}`);
export const findAllCircuit = () => axios.get(`${url}findAll`);

export const createCircuit = (data) => axios.post(`${url}create`, data);

export const updateCircuit = (data, id) =>
    axios.put(`${url}update/${id}`, data);

export const deleteCircuit = (id) => axios.delete(`${url}delete/${id}`);
