import React, { Component } from 'react'
import Login from '../../Containers/Auth'
import store from '../../Redux/store'

export default class login extends Component {
  render() {
    return (
      <div>
        <Login store = {store}/>
      </div>
    )
  }
}
