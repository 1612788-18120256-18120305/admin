import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Windmill } from '@windmill/react-ui';
import store from './myStore';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Windmill>
      <App />
    </Windmill>
  </Provider>,
  document.getElementById('root')
);
