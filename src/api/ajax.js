// axios二次封装
// const qs = require('qs');
import axios from 'axios'
const instance = axios.create({
    // baseURL: 'http://localhost:4000',
    baseURL: '/api',
    timeout: 20000
})
// 配置请求拦截器
instance.interceptors.request.use((config) => {
    return config
})
// 配置响应拦截器
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error);
        return new Promise(() => { })
    }
)
export default instance