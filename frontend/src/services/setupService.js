import axios from 'axios';

const url = 'http://localhost:3001/setup/';

const createSetup = (data, year, circuit) =>
    axios.post(`${url}create/${year}/${circuit}`, data);

export default createSetup;
