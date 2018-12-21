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
    dbUsers = ref.child('Users/').child(this.props.data.uid).child('/info');

    state = {
        showComponent : true,
        cashList :[],
        roomList : [],
        userImage: {},
        userName: ""
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

        ref.child('users').child(this.props.data.uid).child('info').child('name').on('value', (snapshot) => {
            if(snapshot.val()) {
              this.setState({userName:snapshot.val()})
            }
        })  

        let cutName = this.props.data.userMail.indexOf("@");
        let name = this.props.data.userMail.substring(0, cutName);
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

    render() { 
        const showComponent = this.state.showComponent;
        return ( 
            <div>
                <div className="wrapper ">
                    <Sidebar 
                        changeComponent = {this.changeComponent}
                        userImage = {this.state.userImage}
                        userName={this.state.userName}
                        userData = {this.props.data}
                        logOut = {this.logOut}
                    />
                    {showComponent ? 
                        <RoomContainer
                        rooms = {this.state.roomList}
                        cashs = {this.state.cashList}
                        /> : 
                        <RegisterContainer />
                    }
                </div> 
            </div>
            
        )
    }
}

export default Reception;