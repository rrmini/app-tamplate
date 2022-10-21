import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // baseURL: import.meta.env.VUE_APP_URL_API,
    baseURL: 'http://localhost/api/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
})



instance.interceptors.request.use(function (config){
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error){
    return Promise.reject(error);
})

instance.interceptors.response.use(function (response){
    console.log(response)
    return response
}, error => {
    if(error.response.status ===401 || error.response.status ===419) {
        const token = localStorage.getItem('token')
        if (token) {
            localStorage.removeItem('token')
        }
        return Promise.reject(error);
        window.location.replace('/login')
    }
    else if (error.response.status ===422 || error.response.status ===500) {
        return Promise.reject(error);
    }
})

export default instance
