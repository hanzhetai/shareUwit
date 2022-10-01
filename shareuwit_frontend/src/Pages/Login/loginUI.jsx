import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../../api';
import axiosInstance from '../../utils/request';
import getUserInfo from '../../utils/getUserInfo';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

//消息提醒
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (msg) => toast.warn('😲' + '😲' + msg + '😲' + '😲', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  });

export default class LoginUI extends Component {
  state = {
    username:'',
    password:'',
  }
  
  changeHandle = (event) =>{
    this.setState({
      [event.target.name]:event.target.value.trim()
    })
  }

  onSubmit = () =>{
    const {username, password} = this.state;
    const userObj = {username:username, password:password};
    api.login(userObj)
       .then((res)=>{
        localStorage.setItem('access_token',res.data.access);
        localStorage.setItem('refresh_token',res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
        return res 
      })
      .then(async (res)=>{
        const accessToken = res.data.access;
        await getUserInfo(accessToken);
        window.location = "/"
      })
      .catch(
        err=>{
          console.log(err);
          {notify(err.message)};
        }
      );
  }

  render() {
    return (
      <div align='center'>
        <Card sx={{ minWidth: 350, maxWidth: 500, marginTop: 15}}>
          <CardContent>
            <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
              登录页面
            </Typography>
            
            <ToastContainer theme='dark'/>
              <TextField
                id="username"
                required
                name='username'
                onChange={this.changeHandle}
                label="用户名/邮箱"
                sx={{ minWidth: 250, maxWidth: 300 }}
              />

              <br />
              <p />

              <TextField
                id="password"
                required
                type='password'
                name='password'
                onChange={this.changeHandle}
                label="用户密码"
                sx={{ minWidth: 250, maxWidth: 300 }}
              />

              <br />
              <p />

              <Button
                id="loginButton"
                onClick={this.onSubmit}
                variant="contained" 
                sx={{ minWidth: 250, maxWidth: 300, height: 45}}
              >
                登&emsp;录
              </Button>

              <br />
              <p />
              <CardActions sx={{ justifyContent: "center" }}>
              <Link to='/' >
                <Button 
                  id='forgetPassword'
                  size="small" 
                  width='500px'
                >
                  忘记密码
                </Button>
              </Link>
          
              <Link to='/signup'>
                <Button
                  id='signup'
                  size="small" 
                  width='500px'
                >
                  注册用户
                </Button>
              </Link>
              </CardActions>

          </CardContent>
        </Card>
      </div>
    )
  }
}