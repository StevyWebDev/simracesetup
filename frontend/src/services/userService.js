import axios from 'axios';

const url = 'http://localhost:3001/user/';

export const signUp = (data) => axios.post(`${url}signUp`, data);
export const login = (data) => axios.post(`${url}login`, data);
