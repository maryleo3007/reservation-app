import React, { Component } from 'react';

// components
import Login from './login/Login';
import Reception from './reception/Reception';
import Cash from './cash/CashContainer';
import Executive from './executive/Executive';
import Admin from './admin/Admin';
import Waiter from './waiter/Waiter';
import Error from './error/Error';
import Register from './registerUser/Register';

import { firebaseAuth } from '../components/config/enviroment'

// router
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


function PrivateRouteReception ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.user === 'ale@gmail.com'
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteAdmin ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.user === 'mari@gmail.com'
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if(!data.authed) {
          return <Component {...props} />
        } else {
          if(data.user ==='ale@gmail.com') {
            return <Redirect to='/recepcion' />
          } else if (data.user ==='mari@gmail.com') {
            return <Redirect to='/admin' />
          }
        }
      }
        
      }
    />
  )
}


class App extends Component {
  state = {
    authed: false,
    loading: true,
    user: ''
    
  }

  componentDidMount () { 
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => { 
      
      if (user) {
        console.log(user.email)
        this.setState({
          authed: true,
          loading: false,
          user: user.email
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: ''
        })
      }
    })
  }

  componentWillUnmount () { 
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Router>
        <div>
          <div className="container">
            <div className="row">
              <Switch>
                <PublicRoute exact data={this.state} path='/' user={this.state.user} component={Login} />
                <PublicRoute data={this.state} path='/register' component={Register} />
                <PrivateRouteReception data={this.state} path='/recepcion' component={Reception} />
                <PrivateRouteAdmin data={this.state} user={this.state.user} path={'/admin'} component={Admin} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
