import React from 'react'
import ReactDOM from 'react-dom/client'
import './shared/Styles/index.css'
import { Provider } from 'react-redux';
import reduxStore from './shared/reduxStore.js';
import AppRoutes from './AppRoutes.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={reduxStore}>
    <AppRoutes />
  </Provider>
)
