import React, { Component } from 'react';
import {DB_CONFIG} from './../services/firebase';
import firebase from 'firebase';
import 'firebase/database';

//components
import CashList from './cash/CashList';

class App extends Component {

  constructor(props){
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('CashRoom/');
    console.log(this.db)
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
      
      console.log(this.state);
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

  // state = {
  //   cashList :[
  //     {
  //       id:1,
  //       title:"caja1"
  //     }
  //   ]
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
        
      </div>
    );
  }
}

export default App;
