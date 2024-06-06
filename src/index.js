import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store'


const options = {
  timeout: 10000,
  // position: positions.BOTTOM_CENTER,
  // transition: transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
   
      <App />
    
  </Provider>,
);

reportWebVitals();
