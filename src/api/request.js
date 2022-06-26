import axios from 'axios'
import store from "../store";
import {Notify} from "quasar";

const baseURL = import.meta.env.VITE_API_HOST

// 创建axios实例
const instance = axios.create({
    baseURL: baseURL,
    timeout: 15000,
});

// request 拦截器
// request拦截器
instance.interceptors.request.use(
    config => {
        if (store.state.user.token) {
            config.headers['Authorization'] = 'Bearer ' + store.state.user.token // 让每个请求携带自定义token
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response 拦截器
instance.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        if (response.data.code != 20000) {
            handleErrorResponse(response);
            return Promise.reject(response.data);
        }

        return response.data.data;
    },
   error => {
       console.log('err===>' + error) // for debug
       Notify.create({
           type: 'negative',
           message: error.message,
           position: 'top',
       })
       return Promise.reject(error)
    }
)

const handleErrorResponse = response =>{
    Notify.create({
        type: 'negative',
        message: response.data.message,
        position: 'top',
    })

    /**
     * code为非20000错误要细分，不能全部都登出，todo
     */
    store.dispatch("user/logout").then(() =>
        window.location.reload
    );
}

const {get, post, put} = instance;

export {get, post, put}
