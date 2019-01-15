import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'
import {ref, storage} from './../../services/firebase';

//components
import RoomContainer from './roomContainer/RoomContainer';
import Sidebar from './../Sidebar';
import RegisterCash from './registerContainer/registerCash';
import RegisterRooms from './registerContainer/registerRooms';

class Reception extends Component {
    
    dbCashRoom = ref.child('CashRoom/');
    dbRoom = ref.child('Room/');
    dbUsers = ref.child('Users/').child(this.props.responsable.uid).child('/info');

    state = {
        showComponent : 'rooms',
        cashList :[],
        roomList : [],
        userImage: {},
        userName: "",
        objRegister: {},
        shownCashOne:false,
        shownCashTwo:false,
        stateOne:1,
        stateTwo:1
    };

    // mostrar componente de salas o registros
    changeComponent= (change) => {
        this.setState({ showComponent : change}) 
    }
    componentDidMount() {
        this.dbCashRoom.on('value', snap =>{
            const arrCash = [];
            snap.forEach(data =>{
                let cashObj = {
                id: data.val().id,
                state: data.val().state,
                time: data.val().time,
                title: data.val().title,
                key: data.key
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

    // func cambia estado de sala
    changeState = (key, state) => {
        ref.child('Room/').child('/'+ key).update({
            state: state
        });
    }

    // agrega registro de formulario
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

    //cambia estado de caja
    changeCashState = (key, state) => {
        ref.child('CashRoom').child('/'+ key).update({
            state: state
        });
    }
    onToggleForm = (id,key) => {
        if (id === 1) {
            this.setState({shownCashOne: !this.state.shownCashOne})
            this.state.shownCashOne ? this.setState({stateOne: 2}) : this.setState({stateOne: 1}) 
            this.changeCashState(key, this.state.stateOne)
        }
        if (id === 2) {
            this.setState({shownCashTwo: !this.state.shownCashTwo})
            this.state.shownCashTwo ? this.setState({stateTwo: 2}) : this.setState({stateTwo: 1}) 
        }

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
                    {showComponent === 'registerRooms' ? 
                        <RegisterRooms/>
                         : showComponent === 'registerCash' ?
                        <RegisterCash /> :
                        <RoomContainer
                        rooms = {this.state.roomList}
                        cashs = {this.state.cashList}
                        objRegister = {this.state.objRegister}
                        changeState = {this.changeState}
                        addRegister = {this.addRegister}
                        responsable = {this.props.responsable}
                        changeCashState = {this.changeCashState}
                        onToggleForm = {this.onToggleForm}
                        shownCashOne = {this.state.shownCashOne}
                        shownCashTwo = {this.state.shownCashTwo}
                        />
                    }
                </div> 
        )
}
}

export default Reception;