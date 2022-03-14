import './App.css';
import React, {useState, useEffect} from "react";
import LoginRegistration from './views/LoginRegistration';
import Dashboard from './views/Dashboard';
import Canvas from './components/Canvas';
import Gallery from './components/Gallery';
import {Router} from '@reach/router';


function App() {

    const [doodles, setDoodles] = useState([]);

  return (
    <div className="app">
      <Router>

        <LoginRegistration path="/" />

        <Dashboard path="/compose/dashboard" />

        <Canvas path="/compose/doodle" 
        doodles = {doodles}
        setDoodles = {setDoodles}
        />

        <Gallery path="/compose/gallery"/>

      </Router>
    </div>
  );
}

export default App;
