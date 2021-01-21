// import Vue from 'vue'
import axios from 'axios';
import Store from '../store/store'
//创建axios实例
const service = axios.create({
    baseURL: 'http://192.168.9.44:9090', //基础请求地址
    timeout: 5000
})

/**
 * 请求拦截器，携带每个请求的token 
 */
service.interceptors.request.use(config => {
    //去除储存于vuex中的token
    const token = Store.state.token;
    if(token){
        //headers携带数据处理
        config.headers['X-Access-Token'] = token;
        config.headers['Authorization']  = token;
    }
    if(config.method == 'get') {
        config.params = {
            _t: Date.parse(new Date()) / 1000, //让每个请求都携带一个不同的时间参数，防止浏览器缓存不发送请求
            ...config.params
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})
/**
 * 响应拦截器中的error错误处理
 */
const err = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                console.log({
                    message: '系统提示',
                    description: '未授权，请重新登录',
                    duration: 4
                })
                break
            case 403:
                console.log({
                    message: '系统提示',
                    description: '拒绝访问'
                })
                break

            case 404:
                console.log({
                    message: '系统提示',
                    description: '很抱歉，资源未找到!',
                    duration: 4
                })
                break
            case 500:
                console.log({
                    message: '系统提示',
                    description: 'Token失效，请重新登录!'
                })
                break
            case 504:
                console.log({
                    message: '系统提示',
                    description: '网络超时'
                })
                break
            default:
                console.log({
                    message: '系统提示',
                    description: error.response.data.message,
                })
                break
        }
    }
    return Promise.reject(error)
}
/**
 * 响应拦截器,将响应中的token取出,放到state中
 */
service.interceptors.response.use((response) => {
    const token = response.headers["authorization"]
    if (token) {
        //操作token,将token储存在state中
        Store.dispatch('tokenchange')
    }
    return response.data
}, err)

export {
    service as axios
}