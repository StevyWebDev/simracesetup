import axios from 'axios';

const url = 'http://localhost:3001/formulaOne/';

export const findAllFormulaOne = () => axios.get(`${url}findAll`);
export const findOneByIdFormulaOne = (id) =>
    axios.get(`${url}findOneById/${id}`);

export const createFormulaOne = (data) => axios.post(`${url}create`, data);

export const updateFormulaOne = (data, id) =>
    axios.put(`${url}update/${id}`, data);

export const deleteFormulaOne = (id) => axios.delete(`${url}delete/${id}`);
