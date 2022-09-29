import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import api from '../../api'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

export default class SignUp extends Component {
  state = {
    email:'',
    username:'',
    password:'',
    confirmPassword:'',
    confirm:true,
    errors:[]
  }

  changeHandle = (event) =>{
    this.setState({
      [event.target.name]:event.target.value.trim()
    })
  }

  //由于setState是异步回调，因此在input中并不会立刻刷新state，通过在setState再次执行回调获取当前输入值，进行password的比对
  handlePassword = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    },()=>{
      const password = this.state.password;
      const confirmPassword = this.state.confirmPassword;
      if (password == confirmPassword){
        this.setState({confirm:true})
      } else {
        this.setState({confirm:false})
      }
    })
  }

  onSubmit = () => {
    const {email,username,password} = this.state;
    api.signup(
      {
        email: email,
        username: username,
        password: password,
      }
    ).then(function(response){
      const status = response.status;
      console.log(response)
      //注册成功，跳转至登录页面
      if (status == 201) {
        window.location = "/login"
      }
    }).catch(AxiosError=>{
      this.setState({
        errors:AxiosError.response.data
      },()=>{console.log(this.state)})
    }
    )
  }


  render() {
    const {confirm, errors} = this.state
    return (
      <div align='center'>
        <Card sx={{ minWidth: 350, maxWidth: 500, marginTop: 15}}>
          <CardContent>
            <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
              注册页面
            </Typography>

              <TextField
                id="outlined-required email"
                required
                name='email'
                onChange={this.changeHandle}
                error = {errors.email ? true : false}
                helperText={errors.email ? errors.email : ""}
                label="邮箱"
                sx={{ minWidth: 250, maxWidth: 300 }}
              />

              <br />
              <p />

              <TextField
                id="outlined-required username"
                required
                name='username'
                onChange={this.changeHandle}
                error = {errors.username ? true : false}
                helperText={errors.username ? errors.username : ""}
                label="用户名"
                sx={{ minWidth: 250, maxWidth: 300 }}
              />

              <br />
              <p />
              
              <TextField
                id="password"
                required
                type='password'
                name='password'
                onChange= {this.handlePassword}
                error = {errors.password ? true : false}
                helperText={errors.password ? errors.password : ""}
                label="用户密码"
                sx={{ minWidth: 250, maxWidth: 300 }}
              />

              <br />
              <p />

              <TextField
                id="confirmPassword"
                required
                type='password'
                name='confirmPassword'
                onChange= {this.handlePassword}
                error = {confirm ? false : true}
                helperText={confirm ?  "" : errors.password}
                label="确认密码"
                sx={{ minWidth: 250, maxWidth: 300 }}
              />

              <br />
              <p />

              <Button
                id="signUpButton"
                disabled={confirm ? false : true}
                onClick={this.onSubmit}
                variant="contained"
                sx={{ minWidth: 250, maxWidth: 300, height: 45}}
              >
                注&emsp;册
              </Button>

              <br />
              <p />
              <CardActions sx={{ justifyContent: "center" }}>
          
              <Link to='/login'>
                <Button id="login" size="small" width='500px'>登录账户</Button>
              </Link>
              </CardActions>

          </CardContent>
        </Card>
      </div>
    )
  }
}
