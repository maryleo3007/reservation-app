import React, { Component } from 'react';
import {app} from './../services/firebase';

//components
import CashList from './reception/roomContainer/containerList/CashList';

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

  constructor(props){
    super(props);
    
    this.db = app.database().ref().child('CashRoom/');
    this.state = {
      cashList :[]
    };
  }

  componentDidMount() {
    this.db.on('value', snap =>{
      let arr = [];
      snap.forEach(data =>{
        let cashObj = {
          id: data.val().id,
          state: data.val().state,
          time: data.val().time,
          title: data.val().title
        }
        arr.push(cashObj)
        this.setState({cashList:arr})
      })
    })
  }

  // componentWillMount() {
    
  //   this.db.on("child_added", function(dataSnapshot) {
  //     this.items.push(dataSnapshot.val());
  //     this.setState({
  //       cashList: this.items
  //     });
  //   }.bind(this));
  // }

  render() {
    
    return (
      <div className='container'>
        <div className='row'>
          <p className='col-2'>recepción</p>
          <CashList
            cashs = {this.state.cashList}
          />
        </div>
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
      </div> 
    );
  }
}

export default App;
