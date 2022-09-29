import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function UserAvatar() {
  //用户菜单设置
  const settings = ['个人资料', '收到消息', '退出登录'];

  const [username,setUsername] = React.useState();

  React.useEffect(()=>{
    const username = localStorage.getItem('username');
    setUsername(username);
  },[]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Typography textAlign="center">{username}</Typography>
    </Box>
  )
}
