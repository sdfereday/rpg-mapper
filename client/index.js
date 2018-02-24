// https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './src/Root/AppComponent';
import './scss/core.scss';

ReactDOM.render(
     <AppComponent
         appTitle="React Mapper"
         version="0.1a"
     />,
     document.getElementById('container')
);