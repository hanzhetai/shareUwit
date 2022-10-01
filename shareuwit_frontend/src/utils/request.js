import axios from 'axios';
import api from '../api';
import {base} from '../api'
import {APP_API_URL} from '../baseConfig'
import {Buffer} from 'buffer';
//import qs from 'query-string';

//引入函数
import getUserInfo from '../utils/getUserInfo'

//创建axios实例
const axiosInstance = axios.create({
    baseURL: APP_API_URL,
    timeout:5000,
    //读取localstorage里的access—token
    headers:{
        Authorization: localStorage.getItem('access_token') 
            ? 'JWT ' + localStorage.getItem('access_token')
            : null
    }
});

//解密操作（替代旧有的atob解密方案）
function base64Str(str){
    return new Buffer.from(str, 'base64').toString('utf8')
};
//加密操作（替代旧有的btoa加密方案）
function Strbase64(str){
    return new Buffer.from(str, 'utf8').toString('base64')
};

//请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
});

//Refresh Token更新机制//响应拦截器
axiosInstance.interceptors.response.use(
	(response) => {
		console.log('响应成功',response)
		return response;
	},

	async function (error) {
        console.log('Interceptors error',error)
		const originalRequest = error.config;
        console.log('error.config',originalRequest)

		//本地请求超时
		if (error.code == 'ECONNABORTED') {
			console.log('连接失败',error)
			return Promise.reject(error);
		}
        
        //服务器断连时提示//后续修改为顶部flash提醒
		if (error.response.status == 0) {
			// alert(
			// 	'后台服务器疑似出现问题，' +
			// 	'也许问题是出在了跨域请求上，' +
			// 	'非常抱歉--我们将会尽快解决这一问题！'
			// );
			console.log('orginalRequest.url',originalRequest.url);
			return Promise.reject(error);
		};

		//400错误

		//401错误，返回登录页面
		if (error.response.status == 401) {
			console.log('401错误，返回登录页面')
			//本地抹去用户信息
			window.localStorage.removeItem('refresh_token');
			window.localStorage.removeItem('access_token');
			window.localStorage.removeItem('id');
			window.localStorage.removeItem('username');
			//跳转至登录页面
			window.location = '/login/';
			return Promise.reject(error);
		};

		//一般情况
		//获取本地储存的refresh token
		const refreshToken = localStorage.getItem('refresh_token');
		if (refreshToken){
			//计算当前时间
			const now = Math.ceil(Date.now() / 1000);
			//解析refresh token
			const tokenParts = JSON.parse(base64Str(refreshToken.split('.')[1]));
			//解析本地储存的refresh token的exp值，当尚未过期时，向后台发送refresh token，获取新的access token
			if(tokenParts.exp > now){
				return api.tokenRefresh({refesh: refreshToken})
						  .then(response=>{
							//后台返回新的access token，储存于本地的local storage
							localStorage.setItem('access_token', response.data.access);
							//更新axiosInstance的请求头
							axiosInstance.defaults.headers['Authorization'] =
		 						'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] = 
								'JWT ' + response.data.access;
							//更新用户信息
							getUserInfo();
							//更新axiosInstance
							return axiosInstance;		
						  })
						  .catch(error => console.log(error))
			} else {
				//当refresh token过期时，则跳转至登录界面，用户重新登录
				console.log('Refresh token is expired', tokenParts.exp, now);
				window.localStorage.removeItem('id');
				window.localStorage.removeItem('username');
				window.location = '/login';
			}
		} else {
			//当refresh token不存在或失效时（被篡改），则跳转至登录界面，用户重新登录
			console.log('Refresh token not available.');
			//本地抹去用户信息
			window.localStorage.removeItem('id');
			window.localStorage.removeItem('username');
			//跳转至登录页面
			window.location = '/login';
		}
		return Promise.reject(error);
	}
);

export default axiosInstance