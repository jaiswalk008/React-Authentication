import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


import './index.css';
import App from './App';
import LoginContextProvider from './components/Store/LoginContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <LoginContextProvider><App /></LoginContextProvider> 
  </BrowserRouter>
);
