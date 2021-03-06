import React, {Component} from 'react';
import {logout} from './../../components/helpers/authFirebase';
import {ref,storage} from './../../services/firebase';
import { getCutName } from './../helpers/receptionHelper';

//components
import RoomContainer from './roomContainer/RoomContainer';
import Sidebar from './../Sidebar';
import RegisterCash from './registerContainer/registerCash';
import RegisterRooms from './registerContainer/registerRooms';
import './../../rooms.css'

class Reception extends Component {

    dbCashRoom = ref.child('CashRoom/');
    dbRoom = ref.child('Room/');
    dbUsers = ref.child('Users/').child(this.props.responsable.uid).child('/info');
    dbFormCash = ref.child('FormCaja/');
    dbClients = ref.child('Clients');

    state = {
        showComponent: 'rooms',
        cashList: [],
        roomList: [],
        objRegister: {},
        showRoom: false,
        userImage: {},
        userName: "",
        shownCashOne:false,
        shownCashTwo:false,
        formCashList:[],
        sidebarState: true,
        numberOfClients: 0
    };

    // mostrar componente de salas o registros
    changeComponent = (change) => {
        this.setState({
            showComponent: change
        })
    }

    // show and hide sidebar
    changeSidebar = (change) => {
        this.state.sidebarState ?
            this.setState({
                sidebarState: change
            }) : this.setState({
                sidebarState: change
            })
    }

    // función cambia estado de sala
    changeState = (key, state) => {
        ref.child('Room/').child('/' + key).update({
            state
        });
    } 

    componentDidMount() {
        this.dbCashRoom.on('value', snap => {
            const arrCash = [];
            snap.forEach(data =>{
                let cashObj = {
                id: data.val().id,
                state: data.val().state,
                time: data.val().time,
                title: data.val().title,
                key: data.key,
                showComponent: data.val().showComponent,
                formCash_id: data.val().formCash_id,
                order: data.val().order,
                userId_open: data.val().userId_open
            }
            arrCash.push(cashObj)
            this.setState({cashList:arrCash})
            }) 
        })


        this.dbRoom.on('value', snap => {
            const arrRooms = [];
            snap.forEach(data => {
                let roomObj = {
                    id: data.val().id,
                    state: data.val().state,
                    time: data.val().time,
                    title: data.val().title,
                    floor: data.val().floor,
                    executive: data.val().executive,
                    responsable: data.val().responsable,
                    key: data.key,
                }
                arrRooms.push(roomObj);
                this.setState({
                    roomList: arrRooms
                })
            })
        }) 
        
        this.dbFormCash.on('value',snap => {
            const arrFormCash = [];
            snap.forEach(data=>{
                let objFormCash = {
                    appointment:  data.val().appointment,
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

        this.dbClients.on('value', snap => {
            this.setState({
                numberOfClients: snap.val().numberOfClients
            })
        })

        ref.child('users').child(this.props.responsable.uid).child('info').child('name').on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    userName: snapshot.val()
                })
            }
        })

        
        let name = getCutName(this.props.responsable.userMail); 
        
        this.storage = storage.ref('/users').child(`${name}.jpg`).getDownloadURL().then(url => {
            console.log(url)
            this.setState({
                userImage: url
            })
        })
    }

    logOut = (e) => {
        e.preventDefault()
        logout()
    }

    // agrega registro de formulario
    addRegister = (objRegister) => {
        const refRoomList = ref.child('roomRegister');
        const addRegister = refRoomList.push({
            startTime: objRegister.startTime,
            person: objRegister.person,
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
            box: objRegister.box,
            id: objRegister.id,
            branchOffice: objRegister.branchOffice
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
            state
        });
    }

    //cambia estado de caja
    changeCashComponent= (key, showComponent) => {
        ref.child('CashRoom').child('/'+ key).update({
            showComponent
        });
    }

    //actualizar hora de inicio y fecha de registro del form de caja
    updateNumOfClients = () => {
        if (this.state.numberOfClients > 0) {
            let discountnumberOfClients = --this.state.numberOfClients;
            ref.child('Clients').update({
                numberOfClients: discountnumberOfClients
            })
        }
        else return null
    }

    updateDtHrInitCashForm = (key,obj) => {
        ref.child('FormCaja').child('/'+key).update({
            date: obj.date,
            hourInit:obj.hourInit
        })
    }
    /*********funciones para formularios de caja*********** */
    //actualizar equipo de formulario de caja
    updateTeamCash = (key,team) => {
        ref.child('FormCaja').child('/'+key).update({
            team
        })
    }
    //actualizar commentario de formulario de caja
    updateCommentsCash = (key,comments) => {
        ref.child('FormCaja').child('/'+key).update({
            comments
        })
    }

    updateIndicatorCash = (key, appointment) => {
        ref.child('FormCaja').child('/'+key).update({
            appointment
        })
    }

    render() {

        return ( <div className = "wrapper bg-main" >
            <Sidebar changeComponent = {this.changeComponent}
                userImage = {this.state.userImage}
                userName = {this.state.userName}
                userData = {this.props.responsable}
                logOut = {this.logOut}
                changeSidebar = {this.changeSidebar}
                sidebarState = {this.state.sidebarState}/> 
                
                <RegisterRooms showComponent={this.state.showComponent} sidebarState = {this.state.sidebarState}/>
                <RegisterCash showComponent={this.state.showComponent} sidebarState = {this.state.sidebarState}/>
                <RoomContainer
                    showComponent={this.state.showComponent}
                    rooms={this.state.roomList}
                    cashs = {this.state.cashList}
                    objRegister = {this.state.objRegister}
                    changeCashState = {this.changeCashState}
                    changeCashComponent = {this.changeCashComponent}
                    updateDtHrInitCashForm = {this.updateDtHrInitCashForm}
                    formCashList = {this.state.formCashList}
                    updateTeamCash = {this.updateTeamCash}
                    updateCommentsCash = {this.updateCommentsCash}
                    updateIndicatorCash = {this.updateIndicatorCash}
                    updateNumOfClients = {this.updateNumOfClients}
                    changeState = {this.changeState}
                    addRegister = {this.addRegister}
                    responsable = {this.state.userName}
                    datauser = {this.props.responsable}
                    position = {this.props.responsable.position}
                    sidebarState = {this.state.sidebarState}
                />
        </div> 
        )
    }
}

export default Reception;