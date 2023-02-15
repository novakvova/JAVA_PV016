import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const App = () => {

  useEffect(() => {
    console.log("use effect App");
    axios.get("http://localhost:8083/api/categories")
      .then(resp => {
        console.log("Server result", resp);
      });
  }, []);
  
  
  return (
    <>
      <h1>Привіт REACT!</h1>
      <h2>Привіт сало</h2>
    </>
  );
}

export default App;
