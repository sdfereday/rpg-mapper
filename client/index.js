// https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/Root/Container/App';
import './scss/core.scss';

import { Provider } from 'react-redux'
import tstore from "./src/Data/Store/Store";

ReactDOM.render(
     <Provider store={tstore}>
         <App appTitle="React Mapper" version="1.1a" />
     </Provider>,
     document.getElementById('container')
);