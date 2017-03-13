import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/map';
import InfoPanel from './components/infoPanel';
import './index.css';


import reducer from './state/reducer';
import { createStore } from 'redux';

const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import { Provider } from 'react-redux';
const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <div>
        <Map />
        <InfoPanel />
      </div>
    </Provider>
  ), document.getElementById('root'));
};

store.subscribe(render);
render();