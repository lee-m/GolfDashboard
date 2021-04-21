import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

import 'devextreme/dist/css/dx.common.css';
import './css/dx.generic.theme.css';
import './css/index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);