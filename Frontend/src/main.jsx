import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './shared/Styles/index.css'
import { Provider } from 'react-redux';
import reduxStore from './shared/reduxStore.js';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={reduxStore}>
      <App />
    </Provider>
)
