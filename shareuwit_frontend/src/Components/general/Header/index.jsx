import React, {Suspense} from 'react'
import {Link} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserAvatar from './userAvatar';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

{/* 创建页面的主题颜色 */}
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#757de8',
    },
    loginButton: {
      main: '#e3f2fd',
    },
  },
});

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePushToEditor = () => {
    window.location = './create'
  };

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 电脑屏幕适配 */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          {/* LOGO字体 */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            shareUwit
          </Typography>
          
          {/* 菜单栏 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
            {/* 菜单栏显示内容 */}
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">主页</Typography>
              <Typography textAlign="center">空间</Typography>
              <Typography textAlign="center">创作</Typography>
            </MenuItem>
            </Menu>
          </Box>
          


          {/* 小屏幕适配 */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              shareUwit
            </Typography>     
               
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              主页
            </Button>

            <Button
              
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              空间
            </Button>

            {
              localStorage.getItem('refresh_token')
              ?
              <Button
              onClick={handlePushToEditor}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              创作
            </Button>
              :
              null

            }
          </Box>

          <Box sx={{ flexGrow: 0 }} display="flex" flexDirection="column" >
          {
            localStorage.getItem('refresh_token') 
            ?
            <UserAvatar />
            :
            <Box sx={{ flexGrow: 0 }}>
              <Link to='/login'><Button variant="text" color='loginButton'>登录</Button></Link>
            </Box>
          }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default ResponsiveAppBar;
