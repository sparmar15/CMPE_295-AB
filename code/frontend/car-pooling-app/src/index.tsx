import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Home from './Home';
import Navbar from './Navbar';
import { Footer } from './Footer';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Navbar/>
    <Home />
    <Footer/>
  </React.StrictMode>
);
