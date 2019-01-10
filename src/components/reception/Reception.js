import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'
import {app} from './../../services/firebase';
import PropTypes from 'prop-types';


//components
import RoomContainer from './roomContainer/RoomContainer';
import Sidebar from './../Sidebar';

class Reception extends Component {

    dbCashRoom = app.database().ref().child('CashRoom/');
    dbRoom = app.database().ref().child('Room/');
    state = {
        cashList :[],
        roomList : [],
        objRegister: {},
        showRoom: false
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

    changeState = (key, state) => {
        app.database().ref().child('Room/').child('/'+ key).update({
            state: state
        });
    }


    addRegister = (objRegister) => {
        const refRoomList  = app.database().ref().child('roomRegister');
        const addRegister = refRoomList.push({
            startTime: objRegister.startTime,
            collaborator: objRegister.collaborator,
            area: objRegister.area,
            appointment: objRegister.appointment, 
            commentary: objRegister.commentary,
            date: objRegister.date,
            executiveHour: objRegister.executiveHour,
            finalHour: objRegister.finalHour,
            floor: objRegister.floor,
            room: objRegister.room,
            team: objRegister.team,
            responsableRegistry: objRegister.responsableRegistry,
            box: objRegister.box
        })
        
        const newRegisterkey = addRegister.key
        refRoomList.child(newRegisterkey).update({
            idRegRoom: newRegisterkey
        })
        this.setState({
            objRegister
        })
    }

    render () {
        return (
            <div>
                <div className="wrapper">
                <Sidebar />
                <RoomContainer
                    rooms = {this.state.roomList}
                    cashs = {this.state.cashList}
                    objRegister = {this.state.objRegister}
                    changeState = {this.changeState}
                    addRegister = {this.addRegister}
                    responsable = {this.props.responsable}
                    showRoom = {this.state.showRoom}
                />
            </div> 
            <button
                style={{border: 'none', background: 'transparent'}}
                onClick={this.logOut}
                className="navbar-brand">Logout
            </button>
            </div>
            
        )
    }
}

Reception.propTypes = {
    responsable: PropTypes.shape({
        authed: PropTypes.boolean,
        loading: PropTypes.boolean,
        uid: PropTypes.string,
        user: PropTypes.string
    })
};

export default Reception;