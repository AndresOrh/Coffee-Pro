import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(
    function (config) {
        console.warn("Interceptor on request");

        return config;
    },
    function (error) {
        console.error("Interceptor error: ", error);
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        console.warn("Interceptor response: ", response);
        return response.data;
    },

    function (error) {
        return Promise.reject(error);
    },
);

export default instance;