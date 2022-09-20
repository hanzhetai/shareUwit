import React, { Component } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import './index.css'

export default class MyContent extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="bg">
          <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
        </Container>
      </React.Fragment>
    );
  }
}
