import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/map.jsx';
import InfoPanel from './components/InfoPanel.tsx';
import StatisticChooser from './components/StatisticChooser.tsx';
import './index.css';

import reducer from './state/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <div>
        <Map />
        <InfoPanel />
        <StatisticChooser />
      </div>
    </Provider>
  ), document.getElementById('root'));
};

store.subscribe(render);
render();