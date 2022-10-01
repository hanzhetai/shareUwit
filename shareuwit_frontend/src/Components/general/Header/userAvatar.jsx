import React, { Component } from 'react';
import axiosInstance from '../../../utils/request';
import getUserInfo from '../../../utils/getUserInfo';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from '@mui/material';


export default function UserAvatar() {
  const [username,setUsername] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(()=>{
    const username = localStorage.getItem('username');
    {username ? setUsername(username) : getUserInfo(localStorage.getItem('access_token'))}
  },[]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserLogout = () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('id');
    setUsername(username => null);
    setAnchorElUser(null);
    window.location = "/"
  }

  return (
    <div sx={{ flexGrow: 0 }}>
      <Typography textAlign="center" sx={{ p: 0 }} onClick={handleOpenUserMenu}>
        {username}
      </Typography>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >    
        <MenuItem>个人资料</MenuItem>
        <MenuItem>收到消息</MenuItem>
        <MenuItem onClick={handleUserLogout}>退出登录</MenuItem>
      </Menu>
    </div>
  )
}