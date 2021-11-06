import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestOpenApi from './services/openapi/test/openapi/TestOpenApi';
import Test2 from './services/openapi/test/openapi/Test2';
import Adduser from './components/Adduser';

function App() {
  return (
    <div className="App">
      <TestOpenApi />
      <Test2 />
      <Adduser />
    </div>
  );
}

export default App;
