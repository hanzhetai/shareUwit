import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'

import App from '../App'
import SignUpPage from '../Pages/SignUp'
import LoginPage from '../Pages/Login'

export default class index extends Component {
  /* 于中央展示区注册路由 */
  render() {
    return (
      <Routes>
        <Route exact path='/' component={App}></Route>
        <Route path='/signup' component={SignUpPage}></Route>
        <Route path='/login' component={LoginPage}></Route>
      </Routes>
    )
  }
}
