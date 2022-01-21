import axios from 'axios';

const url = 'http://localhost:3001/entitySetup/';

export const findAllEntitySetup = () => axios.get(`${url}findAll`);
export const findOneByIdEntitySetup = (id) =>
    axios.get(`${url}findOneById/${id}`);

export const createEntitySetup = (data) => axios.post(`${url}create`, data);
