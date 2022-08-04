import React, { FC } from 'react';
import { createBrowserHistory, BrowserHistory } from 'history';
import MicroFrontend from './MicroFrontends';

import './App.css';

interface IFirstProps {
  history: string | BrowserHistory;
}

interface ISecondProps {
  history: string | BrowserHistory;
}

const defaultHistory = createBrowserHistory();

const { REACT_APP_FIRST: firstHost, REACT_APP_SECOND: secondHost } =
  process.env;

const First: FC<IFirstProps> = ({ history }) => (
  <MicroFrontend history={history} host={firstHost} name="First" />
);

const Second: FC<ISecondProps> = ({ history }) => (
  <MicroFrontend history={history} host={secondHost} name="Second" />
);

const App = () => (
  <div
    style={{
      background: 'tomato',
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ width: '100%' }}>
      <First history={defaultHistory} />
    </div>
    <div style={{ width: '100%' }}>
      <First history={defaultHistory} />
      <Second history={defaultHistory} />
    </div>
  </div>
);

export default App;
