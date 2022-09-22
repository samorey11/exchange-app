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
      <nav className="navbar navbar-expand-md navbar-light">
        <Link className="navbar-brand ms-5" to="/">X-Change</Link>
        <div className="navbar-collapse collapse show" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/XRates/">X-Rates</Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <hr className="mt-4 mt-xl-3" id="divider" />

      <Switch>
        <Route path="/" exact component={XChange} />
        <Route path="/XRates" component={XRates} />
        <Route component={NotFound} />
      </Switch>

      <hr className="mt-4 mt-xl-3" id="divider" />

      <footer className="container-fluid ms-5">
        <div className="row pt-5 d-none d-md-flex footerNav">
          <h5 className="mb-3" id="footer"> Find me at: </h5><a className="portfolio" href="https://wondrous-malabi-f22571.netlify.app/"> Sam Morey</a>
        </div>
      </footer>
    </Router>
  )
}

export default App;
