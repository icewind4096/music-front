//二次封装
// 引入axios
import axios from 'axios'

// 引入nprogress还要引入nprogress的样式
import nprogress from 'nprogress'
import "nprogress/nprogress.css";

// 创建axios实例
const baseURL = import.meta.env.VITE_API_HOST

const requests = axios.create({
    //配置对象
    baseURL: baseURL,
    timeout: 5000,
});

// // 请求拦截器
// requests.interceptors.request.use((config)=>{
//     // 进度条开始动作
//     nprogress.start();
//
//     //config 中的header属性很重要
//     return config;
// })
//
// // 响应拦截器
// requests.interceptors.response.use((response)=>{
//         // 进度条运行结束
//         nprogress.done();
//
//         //成功返回的回调
//         return response.data;
//     },
//     (error)=>{
//         // 进度条运行结束
//         nprogress.done;
//
//         //失败返回的对象
//         console.log(error)
//         return Promise.reject(new Error('fail'))
//     }
// );

const {get, put, post} = requests

export {get, put, post}
