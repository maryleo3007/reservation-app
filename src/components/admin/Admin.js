import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'
import {ref,storage} from './../../services/firebase';
import { getCutName } from './../helpers/receptionHelper';


//components
import RegisterCash from './../reception/registerContainer/registerCash';
import RoomsHeadquarters from './registerContainer/RoomsHeadquarters';
import RegisterRooms from './../reception/registerContainer/registerRooms';
import Sidebar from './../Sidebar';

class Admin extends Component {

    dbCashRoom = ref.child('CashRoom/');
    dbRoom = ref.child('Room/');
    dbUsers = ref.child('users/').child(this.props.responsable.uid).child('/info');
    dbFormCash = ref.child('FormCaja/');

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
    };

    logOut = (e) => {
        e.preventDefault()
        logout()
    }

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

        ref.child('users').child(this.props.responsable.uid).child('info').child('name').on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    userName: snapshot.val()
                })
            }
        })

        
        let name = getCutName(this.props.responsable.userMail); 
        console.log(name);
        
        
        this.storage = storage.ref('/users').child(`${name}.jpg`).getDownloadURL().then(url => {
            this.setState({
                userImage: url
            })
        })
    }

    render() { 
        return (
            <div> 
                <div className="admin-content">
                    <Sidebar changeComponent = {this.changeComponent}
                        userImage = {this.state.userImage}
                        userName = {this.state.userName}
                        userData = {this.props.responsable}
                        logOut = {this.logOut}
                        changeSidebar = {this.changeSidebar}
                        sidebarState = {this.state.sidebarState}/>
                    <RegisterRooms showComponent={this.state.showComponent} sidebarState = {this.state.sidebarState}/>
                    <RegisterCash showComponent={this.state.showComponent} sidebarState = {this.state.sidebarState}/>
                    <RoomsHeadquarters showComponent={this.state.showComponent} sidebarState = {this.state.sidebarState}/>
                </div> 
                {/* <div>
                    <p>Administradora</p>
                    
                    <button
                    style={{border: 'none', background: 'transparent'}}
                    onClick={() => {
                        logout()
                    }}
                    className="navbar-brand">Logout</button>
                </div> */}
            </div>
         );
    }
}
 
export default Admin;