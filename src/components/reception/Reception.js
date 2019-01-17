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
    dbFormCash = ref.child('FormCaja/');

    state = {
        showComponent : 'rooms',
        cashList :[],
        roomList : [],
        userImage: {},
        userName: "",
        objRegister: {},
        shownCashOne:false,
        shownCashTwo:false,
        formCashList:[]
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
                key: data.key,
                showComponent: data.val().showComponent,
                uidCash: data.val().uidCash
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
        
        this.dbFormCash.on('value',snap => {
            const arrFormCash = [];
            snap.forEach(data=>{
                let objFormCash = {
                    appointment:  data.val().appointment,
                    caja_id:   data.val().caja_id,
                    date:   data.val().date,
                    fromRoom:  data.val().fromRoom,
                    hourAttention:  data.val().hourAttention,
                    hourEnd: data.val().hourEnd,
                    hourInit:   data.val().hourInit,
                    id:  data.val().id,
                    team: data.val().team,
                    comments: data.val().comments                  
                }
                arrFormCash.push(objFormCash)
                this.setState({formCashList:arrFormCash})
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
    /*****funciones para caja */
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

    //cambia estado de caja
    changeCashComponent= (key, showComponent) => {
        ref.child('CashRoom').child('/'+ key).update({
            showComponent: showComponent
        });
    }
    
    onToggleForm = (id) => {    
        if (id === 1) {
            this.setState({shownCashOne: !this.state.shownCashOne})
        }
        if (id === 2) {
            this.setState({shownCashTwo: !this.state.shownCashTwo})
        }
    }

    //actualizar hora de inicio y fecha de registro del form de caja
    updateDtHrInitCashForm = (key,obj) => {
        ref.child('FormCaja').child('/'+key).update({
            date: obj.date,
            hourInit: obj.hourInit
        })
    }
    /*********funciones para formularios de caja*********** */
    //actualizar equipo de formulario de caja
    updateTeamCash = (key,team) => {
        ref.child('FormCaja').child('/'+key).update({
            team:team
        })
    }
    //actualizar commentario de formulario de caja
    updateCommentsCash = (key,comments) => {
        ref.child('FormCaja').child('/'+key).update({
            comments:comments
        })
    }
    render() { 
        
        const showComponent = this.state.showComponent;
        return ( 
                <div className="wrapper bg-main">
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
                        shownCashOne = {this.state.shownCashOne}
                        shownCashTwo = {this.state.shownCashTwo}
                        changeCashState = {this.changeCashState}
                        onToggleForm = {this.onToggleForm}
                        changeCashComponent = {this.changeCashComponent}
                        updateDtHrInitCashForm = {this.updateDtHrInitCashForm}
                        formCashList = {this.state.formCashList}
                        updateTeamCash = {this.updateTeamCash}
                        updateCommentsCash = {this.updateCommentsCash}
                        />
                    }
                </div> 
        )
}
}

export default Reception;