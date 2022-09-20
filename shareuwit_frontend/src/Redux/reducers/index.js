import {combineReducers} from 'redux'
import auth from './auth'
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducer = combineReducers({
    auth,
})

export default rootReducer