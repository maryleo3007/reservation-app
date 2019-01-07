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

// firebase
import { firebaseAuth, ref } from '../services/firebase'

// router
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function PrivateRouteReception ({component: Component, data, state, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.position === 'recepcionista'
        ? <Component {...props} responsable={data}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteAdmin ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.position === 'administradora'
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteCash ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.position === 'cajera'
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteWaiter ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.position === 'mozo'
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
            if(data.position ==='recepcionista') {
              return <Redirect to='/recepcion' />
            } else if (data.position ==='administradora') {
              return <Redirect to='/admin' />
            } else if (data.position ==='cajera') {
              return <Redirect to='/caja' />
            } else if (data.position ==='mozo') {
              return <Redirect to='/menu' />
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
    userMail: '',
    uid: '',
    position: ''
  }
  
  componentDidMount () { 
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => { 
      if (user) {
        
        ref.child('users').child(user.uid).child('info').child('position').on('value', (snapshot) => {
          if(snapshot.val()) {
            this.setState({
                authed: true,
                loading: false,
                userMail: user.email,
                uid: user.uid,
                position: snapshot.val()
              })
            }
          })        
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: '',
          uid: '',
          position: ''
        })
      }
    })
  }

  componentWillUnmount () { 
    this.removeListener()
  }

  render() {
    return this.state.loading === false ? <h1>Loading</h1> : (
      <Router>
        <div>
              <Switch>
                <PublicRoute exact data={this.state} path='/' component={Login} />
                <PublicRoute data={this.state} path='/register' component={Register} />
                <PublicRoute data={this.state} path='/ejecutivo' component={Executive} />
                <PrivateRouteReception data={this.state} path='/recepcion' component={Reception} state={this.state}/>
                <PrivateRouteAdmin data={this.state} path={'/admin'} component={Admin} />
                <PrivateRouteCash data={this.state} path={'/caja'} component={Cash} />
                <PrivateRouteWaiter data={this.state} path={'/menu'} component={Waiter} />
                <Route component={Error} />
              </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
