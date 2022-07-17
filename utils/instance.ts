import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://onaka-api.herokuapp.com/api/v1'
});
