import React from 'react';
import {Link, Routes, Route, Navigate} from 'react-router-dom'

import Grid from '@mui/material/Unstable_Grid2';

import Header from './Components/general/Header';
import Content from './Components/general/Content'

import SignUpPage from './Pages/SignUp'
import LoginPage from './Pages/Login'
import HomePage from './Pages/Home';

import './App.css'

const App = () => (
  <Grid container spacing={2}>
    <Grid xs={12}>
      <Header />
    </Grid>

    <Grid xs={2}>
      <Content />
    </Grid>

    <Grid xs={8}>
      {/* 于中央展示区注册路由 */}
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<Navigate to='/home'/>}/>
      </Routes>
    </Grid>

    <Grid xs={2}>
      <Content />
    </Grid>
  </Grid>
);

export default App;