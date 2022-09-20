import {SETUSER} from '../constant'

export function setUserObj(data){
    return {
        type: SETUSER,
        data
    }
}