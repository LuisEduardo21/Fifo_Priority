import React from 'react';
import { Sistema } from './pages/Sistema';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div>
       <Header />
       <Sistema></Sistema>
     
    </div>
  );
}

export default App;
