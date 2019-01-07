import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'
import {ref, storage} from './../../services/firebase';

//components
import RoomContainer from './roomContainer/RoomContainer';
import RegisterContainer from './registerContainer/RegisterContainer';
import Sidebar from './../Sidebar';

class Reception extends Component {
    
    dbCashRoom = ref.child('CashRoom/');
    dbRoom = ref.child('Room/');
    dbUsers = ref.child('Users/').child(this.props.responsable.uid).child('/info');

    state = {
        showComponent : true,
        cashList :[],
        roomList : [],
        userImage: {},
        userName: "",
        objRegister: {}
    };

    changeComponent= (change) => {
        this.state.showComponent ? 
        this.setState({ showComponent : change}) 
        : 
        this.setState({ showComponent : change })
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
                    executive: data.val().executive,
                    key: data.key
                }
                arrRooms.push(roomObj);
                this.setState({roomList:arrRooms}) 
            })
        })  

        ref.child('users').child(this.props.responsable.uid).child('info').child('name').on('value', (snapshot) => {
            if(snapshot.val()) {
              this.setState({userName:snapshot.val()})
            }
        })  

        let cutName = this.props.responsable.userMail.indexOf("@");
        let name = this.props.responsable.userMail.substring(0, cutName);
        this.storage = storage.ref('/users').child(`${name}.jpg`).getDownloadURL().then(url => {
            this.setState({userImage:url})
        })
    }
    
    logOut = (e) => {
        e.preventDefault()
        logout()
    }

    changeState = (key, state) => {
        ref.child('Room/').child('/'+ key).update({
            state: state
        });
    }
    addRegister = (objRegister) => {
        const refRoomList  = ref.child('roomRegister');
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

    addCashRegister = (obj) => {
        const refCashList  = ref.child('cashRegister');
        const addCashRegister = refCashList.push({
            startTime: obj.startTime,
            date: obj.date,
        })
        
        const newCashRegisterkey = addCashRegister.key
        refCashList.child(newCashRegisterkey).update({
            idRegCash: newCashRegisterkey
        })
        this.setState({
            obj
        })
    }
    render() { 
        const showComponent = this.state.showComponent;
        return ( 
                <div className="wrapper ">
                    <Sidebar 
                        changeComponent = {this.changeComponent}
                        userImage = {this.state.userImage}
                        userName={this.state.userName}
                        userData = {this.props.responsable}
                        logOut = {this.logOut}
                    />
                    {showComponent ? 
                        <RoomContainer
                        rooms = {this.state.roomList}
                        cashs = {this.state.cashList}
                        objRegister = {this.state.objRegister}
                        changeState = {this.changeState}
                        addRegister = {this.addRegister}
                        responsable = {this.props.responsable}
                        /> : 
                        <RegisterContainer />
                    }
                </div> 
        )
}
}

export default Reception;