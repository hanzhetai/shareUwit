import api from '../../api'
import axiosInstance from '../../utils/request'
import {SETUSER} from '../constant'
import getUserInfo from '../../utils/getUserInfo'

export function setUserObj(data){
    return {
        type: SETUSER,
        data
    }
}

//异步处理
export function asyncSetUserObj(data){
    return dispatch =>{
        return api.login(data).then((res)=>{
            //存入redux
            console.log('后端返回数据',res.data)
            localStorage.setItem('access_token',res.data.access);
            localStorage.setItem('refresh_token',res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
            dispatch(setUserObj(res.data));       
            window.location = "/"
        })
    }
}