import axios from 'axios';


const api = `http://localhost:8000/`;
const ApiService = {
    init() {
        axios.interceptors.request.use(async (config) => {
            config.headers = {
                Accept: 'application/json',
            };
            return config;
        });
    },


    get({resource, params}: { resource: any, params: any }) {
        return axios.get(`${api}${resource}`, params);
    },

    post({resource, params}: { resource: any, params: any }) {
        return axios.post(`${api}${resource}`, params);
    },

    put({resource, params}: { resource: any, params: any }) {
        return axios.put(`${process.env.REACT_APP_BASE_URL}${resource}`, params);
    },

    delete({resource, params}: { resource: any, params: any }) {
        return axios.delete(`${process.env.REACT_APP_BASE_URL}${resource}`, params);
    },
};

export default ApiService;
