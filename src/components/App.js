import React, { Component } from 'react';
import {app} from './../services/firebase';

//components
import CashList from './reception/roomContainer/containerList/CashList';

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
        
      </div>
    );
  }
}

export default App;
