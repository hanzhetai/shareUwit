import axios from 'axios'

// 网络请求访问路径
const base = {
    baseUrl: "http://127.0.0.1:8000/",
    signup:  "auth/users/",
    login: "auth/jwt/create"
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
        return axios.post(base.baseUrl + base.signup, params)
    },
    // 登录
    /**
    params ={
        username: "",
        password: ""
    }
    */
    login(params){
        return axios.post(base.baseUrl + base.login, params)
    }
}

export default api;