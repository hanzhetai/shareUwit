//引入Login的UI组件
import LoginUI from '../../Pages/Login/loginUI'

//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'
import store from '../../Redux/store'

//引入常量
import {SETUSER} from '../../Redux/constant'

//引入action
import {setUserObj} from '../../Redux/actions/auth'

//检查状态
function mapStateToProps(state){
    return {reduxState: state}
}


//通知redux执行setUser
function mapDispatchToProps(dispatch) {
    return {
        //通知redux执行
        setUser:(userObj) => {dispatch(setUserObj(userObj))}
    }
}

//使用connect()()创建并暴露Login的容器组件
export default connect(mapStateToProps,mapDispatchToProps)(LoginUI)