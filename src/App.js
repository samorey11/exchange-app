import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import XChange from './XChange';
import XRates from './XRates';
import { json, checkStatus } from './utils';


import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>
}



const App = () => {

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">X-Change</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/XRates/">X-Rates</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={XChange} />
        <Route path="/XRates" component={XRates} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
