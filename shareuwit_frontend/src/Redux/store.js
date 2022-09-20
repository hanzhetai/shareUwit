import {legacy_createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export default legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));