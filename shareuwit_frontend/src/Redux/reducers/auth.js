import {SETUSER} from '../constant'

//初始化状态
const userInitState = {
    token:{}
}

const auth = (preState = userInitState, action) =>{
    switch(action.type){
        case SETUSER:
            return {
                token:action.data
            }
        default:
            return preState;
    }
}

export default auth