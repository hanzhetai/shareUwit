import axiosInstance from "../utils/request"
import {APP_API_URL} from '../baseConfig'
import getUserInfo from "../utils/getUserInfo"

// 网络请求访问路径
export const base = {
    baseUrl: APP_API_URL,
    signup:  "auth/users/",
    login: "auth/jwt/create",
    userInfo: "auth/users/me",
    tokenRefresh: "auth/jwt/refresh/"
}

// 网络请求方法
const api = {
    // 注册
    /**
    params ={
        email: "",
        username: "",
        password: ""
    }
    */
    signup(params){
        return axiosInstance.post(base.baseUrl + base.signup, params)
    },
    // 登录
    /**
    params ={
        username: "",
        password: ""
    }
    */
    login(params){
        return axiosInstance.post(base.baseUrl + base.login, params)
    },
    //刷新token
    tokenRefresh(refreshToken){
        return axiosInstance.post(base.baseUrl + base.tokenRefresh, refreshToken)
    },
    //获取用户信息
    userInfo(config){
        return axiosInstance.get(base.baseUrl + base.userInfo, config)
    },
}

export default api;