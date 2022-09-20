import React, { Component } from 'react'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'

import App from '../App'
import SignUpPage from '../Pages/SignUp'
import LoginPage from '../Pages/Login'

export default class index extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path='/' component={App}></Route>
            <Route path='/signup' component={SignUpPage}></Route>
            <Route path='/login' component={LoginPage}></Route>
        </Switch>
      </Router>
    )
  }
}
