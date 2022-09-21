import {SETUSER} from '../constant'

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
            console.log('后端返回数据',res.data)
            dispatch(setUserObj(res.data))
        })
    }
}