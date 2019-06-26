import React from 'react';
import './App.css';
import {Route, Link} from 'react-micro-router';
import Search from './Components/search'; 
import Home from './Components/home';



function App() {
  return (
    <div className="App">
    <Link to="/">Home</Link> {" "}
            <Link to="/search">Search</Link>
 
            <Route path="/" exact>
            <Home/>
            </Route>
 
            <Route path="/search">
            <Search/>
            </Route>
    </div>
  );
}

export default App;
