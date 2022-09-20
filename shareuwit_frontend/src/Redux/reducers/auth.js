import {SETUSER} from '../constant'

//初始化状态
const userInitState = {
    user:{}
}

const auth = (preState = userInitState, action) =>{
    switch(action.type){
        case SETUSER:
            return {
                user:action.data
            }
        default:
            return preState;
    }
}

export default auth