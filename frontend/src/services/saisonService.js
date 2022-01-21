import axios from 'axios';

const url = 'http://localhost:3001/saison/';

export const findAllSaison = () => axios.get(`${url}findAll`);
export const findOneByIdSaison = (id) => axios.get(`${url}findOneById/${id}`);
export const findOneByYearSaison = (year) =>
    axios.get(`${url}findOneByYear/${year}`);
export const findOneSetupSaisonByCircuit = (year, circuit) =>
    axios.get(`${url}findOneSetupSaisonByCircuit/${year}/${circuit}`);

export const createSaison = (data) => axios.post(`${url}create`, data);

export const updateSaison = (data, id) => axios.put(`${url}update/${id}`, data);
export const addTasksSaison = (data, id) =>
    axios.put(`${url}addTasks/${id}`, data);

export const deleteSaison = (id) => axios.delete(`${url}delete/${id}`);
