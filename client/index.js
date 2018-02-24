// https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/Root/Container/App';
import './scss/core.scss';

ReactDOM.render(
     <App appTitle="React Mapper" version="0.1a" />,
     document.getElementById('container')
);