import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css"

//二次axios
const request = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 3000,
    //headers: {'X-Custom-Header': 'foobar'},//带一个头
  });

  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    nProgress.start();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //进度条结束
    nProgress.done(); 
    return response.data;//返回响应的data数据
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });


export default request