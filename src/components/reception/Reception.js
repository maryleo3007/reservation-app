import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'
import {app} from './../../services/firebase';

//components
import RoomContainer from './roomContainer/RoomContainer';
import Sidebar from './../Sidebar';

class Reception extends Component {

    dbCashRoom = app.database().ref().child('CashRoom/');
    dbRoom = app.database().ref().child('Room/');
    state = {
        cashList :[],
        roomList : []
    };
    

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
                    executive: data.val().executive,
                    key: data.key
                }
                arrRooms.push(roomObj);
                this.setState({roomList:arrRooms}) 
            })
        })
        
    }

    logOut = (e) => {
        e.preventDefault()
        logout()
    }

    changeState = (state) => {
        app.database().ref().child('Room/').child('/'+ state).update({
            state: 'ocupado'
        });
    }

    render () {
        return (
            <div>
                <div className="wrapper">
                <Sidebar />
                <RoomContainer
                    rooms = {this.state.roomList}
                    cashs = {this.state.cashList}
                    changeState = {this.changeState}
                />
            </div> 
            <button
                style={{border: 'none', background: 'transparent'}}
                onClick={this.logOut}
                className="navbar-brand">Logout
            </button>
            {/* <button onClick={this.changeState}>cambiar estado</button> */}

            </div>
            
        )
    }
}

export default Reception;