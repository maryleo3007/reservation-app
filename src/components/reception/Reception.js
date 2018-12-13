import React, { Component } from 'react';
import {app} from './../../services/firebase';

//components
import RoomContainer from './roomContainer/RoomContainer';
import Sidebar from './../Sidebar';

class Reception extends Component {

    constructor(props){
        super(props);
        
        this.dbCashRoom = app.database().ref().child('CashRoom/');
        this.dbRoom = app.database().ref().child('Room/');
        this.state = {
          cashList :[],
          roomList : []
        };
      }

    componentDidMount() {
    this.dbCashRoom.on('value', snap =>{
        const arrCash = [];
        snap.forEach(data =>{
        let cashObj = {
            id: data.val().id,
            state: data.val().state,
            time: data.val().time,
            title: data.val().title
        }
        arrCash.push(cashObj)
        this.setState({cashList:arrCash})
        })
    })

    this.dbRoom.on('value',snap=>{
        const arrRooms = [];
        snap.forEach(data =>{
            let roomObj = {
                id: data.val().id,
                state: data.val().state,
                time:data.val().time,
                title:data.val().title,
                floor: data.val().floor,
                executive: data.val().executive
            }
            arrRooms.push(roomObj);
            this.setState({roomList:arrRooms})
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
            <div className="wrapper">
                <Sidebar />
                <RoomContainer
                    rooms = {this.state.roomList}
                    cashs = {this.state.cashList}
                />
            </div> 
         );
    }
}
 
export default Reception;