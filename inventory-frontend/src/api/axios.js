import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
    },
});
// tự động gắn token
api.interceptors.request.use(

    (config)=>{

        const token = localStorage.getItem("token");


        if(token){

            config.headers.Authorization =
            `Bearer ${token}`;

        }


        return config;

    },

    (error)=>{

        return Promise.reject(error);

    }

);
export default api;