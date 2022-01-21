import axios from 'axios';

const url = 'http://localhost:3001/formulaTwo/';

export const findAllFormulaTwo = () => axios.get(`${url}findAll`);
export const findOneByIdFormulaTwo = (id) =>
    axios.get(`${url}findOneById/${id}`);

export const createFormulaTwo = (data) => axios.post(`${url}create`, data);

export const updateFormulaTwo = (data, id) =>
    axios.put(`${url}update/${id}`, data);

export const deleteFormulaTwo = (id) => axios.delete(`${url}delete/${id}`);
