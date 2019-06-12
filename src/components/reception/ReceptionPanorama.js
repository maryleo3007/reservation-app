import React, {Component} from 'react';
import {logout} from './../../components/helpers/authFirebase';
import {ref,storage} from './../../services/firebase';
import { getCutName } from './../helpers/receptionHelper';

//components
import Sidebar from './../Sidebar';
import RegisterCash from './registerContainer/registerCash';
import RegisterRooms from './registerContainer/registerRooms';
class ReceptionPanorama extends Component {

    state = {
        showComponent: 'rooms',
        userImage: {},
        userName: "",
        sidebarState: true
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

    logOut = (e) => {
        e.preventDefault()
        logout()
    }

    componentDidMount() {

        ref.child('users').child(this.props.responsable.uid).child('info').child('name').on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    userName: snapshot.val()
                })
            }
        })

        
        let name = getCutName(this.props.responsable.userMail); 
        
        this.storage = storage.ref('/users').child(`${name}.jpg`).getDownloadURL().then(url => {
            this.setState({
                userImage: url
            })
        })
    }

    render() {
        const showComponent = this.state.showComponent;
        return ( 
            <div className = "wrapper bg-main" >
            <Sidebar changeComponent = {this.changeComponent}
                userImage = {this.state.userImage}
                userName = {this.state.userName}
                userData = {this.props.responsable}
                logOut = {this.logOut}
                changeSidebar = {this.changeSidebar}
                sidebarState = {this.state.sidebarState}/> {showComponent === 'registerRooms' ?<RegisterRooms
                sidebarState = {this.state.sidebarState}/>: showComponent === 'registerCash' ?
                <RegisterCash 
                sidebarState = {this.state.sidebarState}/> : 
                <div>componente recepcion panorama</div>
            } </div>
        )
    }
}

export default ReceptionPanorama;