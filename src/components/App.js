import React, { Component } from 'react';

// components
import Login from './login/Login';
import Reception from './reception/Reception';
import Cash from './cash/CashContainer';
import Executive from './executive/Executive';
import Admin from './admin/Admin';
import Waiter from './waiter/Waiter';
import Error from './error/Error';

// router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class App extends Component {
  render() {
    
    return (
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/recepcion" component={Reception}/>
              <Route path="/caja" component={Cash}/>
              <Route path="/ejecutivo" component={Executive}/>
              <Route path="/menu" component={Waiter}/>
              <Route path="/administradora" component={Admin}/>
              <Route component={Error}/>
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App;
