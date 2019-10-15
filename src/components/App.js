import React, { Component } from 'react';

// components
import Login from './login/Login';
import Reception from './reception/Reception';
import ReceptionPanorama from './reception/ReceptionPanorama';
// import Cash from './cash/CashContainer';
// import CashPP from './cash/CashContainerPP';
import ExecutiveCapital from './executive/Executive';
import ExecutivePPanorama from './executive/ExecutivePPanorama';
import Admin from './admin/Admin';
import Waiter from './waiter/Waiter';
import Error from './error/Error';
import Register from './registerUser/Register';
/**Modificacion de caja 14/10/2019*/
import SPOneCapital from './cash/SPOneCapital';
import SPTwoCapital from './cash/SPTwoCapital';
import SPOnePanorama from './cash/SPOnePanorama';
import SPTwoPanorama from './cash/SPTwoPanorama';
// firebase
import { firebaseAuth, ref } from '../services/firebase'

// router
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function PrivateRouteReception ({component: Component, data, state, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.position === 'recepcionista' && data.branchOffice === '1'
        ? <Component {...props} responsable={data}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteReceptionPanorama ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.position === 'recepcionista' && data.branchOffice === '2'
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
        ? <Component {...props} responsable={data}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

// function PrivateRouteCash ({component: Component, data, ...rest}) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => data.authed === true && data.position === 'cajera' && data.branchOffice === '1'
//         ? <Component {...props} data={data}/>
//         : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
//     />
//   )
// }

// function PrivateRouteCashPP ({component: Component, data, ...rest}) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => data.authed === true && data.position === 'cajera' && data.branchOffice === '2'
//         ? <Component {...props} data={data}/>
//         : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
//     />
//   )
// }
function PrivateRouteCashCapitalOne ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.uid === 'tcNphe4I8Wd2pLLEkEDVh7BAMwq2' 
        ? <Component {...props} data={data}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteCashCapitalTwo ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.uid === 'qC6HvbVDk3WBVmqAXEkq1RnKe3s1'
        ? <Component {...props} data={data}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}
function PrivateRouteCashPPOne ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.uid === 'z4z6cr7G5Gc515a6fWGAP5uuGrZ2'
        ? <Component {...props} data={data}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteCashPPTwo ({component: Component, data, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => data.authed === true && data.uid === 'RSSUvaMUv5YK9jF6z9cSqQytn6A3'
        ? <Component {...props} data={data}/>
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
            if(data.position ==='recepcionista' && data.branchOffice === '1' ) {
              return <Redirect to='/recepcion' />
            } else if (data.position ==='recepcionista' && data.branchOffice === '2') {
              return <Redirect to='/recepcionPanorama' />
            }else if (data.position ==='administradora') {
              return <Redirect to='/admin' />
            } else if (data.uid ==='tcNphe4I8Wd2pLLEkEDVh7BAMwq2') {
              return <Redirect to='/cajaCapital-1' />
            } else if (data.uid ==='qC6HvbVDk3WBVmqAXEkq1RnKe3s1') {
              return <Redirect to='/cajaCapital-2' />
            } else if (data.uid ==='z4z6cr7G5Gc515a6fWGAP5uuGrZ2') {
              return <Redirect to='/cajaPanorama-1' />
            } else if (data.uid ==='RSSUvaMUv5YK9jF6z9cSqQytn6A3') {
              return <Redirect to='/cajaPanorama-2' />
            }else if (data.uid ==='mozo') {
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
    position: '',
    name:'',
    branchOffice:''
  }
  
  componentDidMount () { 
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => { 
      if (user) {
        
        ref.child('users').child(user.uid).child('info').on('value', (snapshot) => { //*modificado* la ruta se modifico desde info, para obtener también el "name" de c/cajera
          
        if(snapshot.val()) {
            this.setState({
                authed: true,
                loading: false,
                userMail: user.email,
                uid: user.uid,
                position: snapshot.val().position,
                name: snapshot.val().name,
                branchOffice: snapshot.val().branchOffice
              })
            }
          })        
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: '',
          uid: '',
          position: '',
          name:'',
          branchOffice: ''
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
              <Switch>
                <PublicRoute exact data={this.state} path='/' component={Login} />
                <PublicRoute data={this.state} path='/register' component={Register} />
                <PublicRoute data={this.state} path='/ejecutivo-capital' component={ExecutiveCapital} />
                <PublicRoute data={this.state} path='/ejecutivo-ppanorama' component={ExecutivePPanorama} />
                <PrivateRouteReception data={this.state} path='/recepcion' component={Reception} state={this.state}/>
                <PrivateRouteAdmin data={this.state} path={'/admin'} component={Admin} />
                {/* <PrivateRouteCash data={this.state} path={'/caja'} component={SPOneCapital} />
                <PrivateRouteCashPP data={this.state} path={'/cajaPanorama'} component={CashPP} /> */}
                <PrivateRouteCashCapitalOne data={this.state} path={'/cajaCapital-1'} component={SPOneCapital} />
                <PrivateRouteCashCapitalTwo data={this.state} path={'/cajaCapital-2'} component={SPTwoCapital} />
                <PrivateRouteCashPPOne data={this.state} path={'/cajaPanorama-1'} component={SPOnePanorama} />
                <PrivateRouteCashPPTwo data={this.state} path={'/cajaPanorama-2'} component={SPTwoPanorama} />
                <PrivateRouteWaiter data={this.state} path={'/menu'} component={Waiter} />
                <PrivateRouteReceptionPanorama data={this.state} path='/recepcionPanorama' component={ReceptionPanorama} state={this.state}/>
                <Route component={Error} />
              </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
