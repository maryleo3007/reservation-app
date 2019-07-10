import React, { Component } from 'react';
import {ref} from './../../services/firebase';
import logo from './../../assets/logo.png';
import recepcionist from './../../assets/recepcionist.png';
import {getHourWithOutSecond} from './../helpers/date';

class ExecutivePPanorama extends Component {

    dbRoom = ref.child('RoomPP/');
    // dbTime = ref.child('currentTime/');

    state = {
        roomList: undefined,
        currentTime: ''
    };

    componentDidMount(){
        this.dbRoom.on('value', snap => {
            const arrRooms = [];
            snap.forEach(data => {
                if(data.val().id < 7){
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
                } 
            })
        }) 

        this.setState({currentTime: getHourWithOutSecond()})

        setInterval(() => {
            let currentTime = getHourWithOutSecond()
            // this.dbTime.update({time : currentTime})
            this.setState({currentTime})
            console.log(currentTime);
            
          }, 5000);
    }

    showRooms = () => {
        if(this.state.roomList === undefined ) return null
        const rooms = this.state.roomList 
        if(rooms[5] === undefined ) return null
        else{
               
            const bgRoom1 = rooms[0].state === 'Ocupado' ? 'unavailable text-light' : 'available' 
            const bgRoom2 = rooms[1].state === 'Ocupado' ? 'unavailable text-light border-selected' : 'available' 
            const bgRoom3 = rooms[2].state === 'Ocupado' ? 'unavailable text-light border-selected' : 'available' 
            const bgRoom4 = rooms[3].state === 'Ocupado' ? 'unavailable text-light border-selected' : 'available' 
            const bgRoom5 = rooms[4].state === 'Ocupado' ? 'unavailable text-light border-selected' : 'available' 
            const bgRoom6 = rooms[5].state === 'Ocupado' ? 'unavailable text-light border-selected' : 'available' 
            
            return (
                <div className="bg-light p-4 ex-pp-content">
                    <div className="bg-white">
                            <div className='mx-3 py-2 px-4 d-flex justify-content-between align-items-center w-100'>
                                <div>
                                    <img className='logo-inteligo' src={logo} alt='Logo Inteligo'/>
                                </div>
                                <div>
                                    <span className='hour-executive'>{this.state.currentTime}</span>
                                </div>
                            </div>
                            <div className="container-fluid">
                                <div className = "row">
                                    <div className={`${bgRoom5} col-lg-3 offset-lg-1 col-xl-3 offset-xl-1 col-xs-3 offset-xs-1 col-sm-3 offset-sm-1 col-md-3 offset-md-1 p-1 border border-top border-blue height-18 d-flex align-items-center justify-content-center text-center`}>
                                        <div>
                                            <span className='name-room'>{rooms[4].title}</span>
                                            <br/>
                                            {
                                                rooms[4].state === 'Ocupado' ? (
                                                    <div>
                                                        <span>{rooms[4].time}</span>
                                                        <br/>
                                                        <span>{rooms[4].executive}</span>
                                                    </div>
                                                ) : ''
                                            }                                   
                                        </div>
                                    </div>
                                    <div className={`col-lg-1 col-xl-1 col-xs-1 col-sm-1 col-md-1 p-1 height-18 d-flex align-items-center justify-content-center text-center bg-no-recep`}>
                                    <img className='recepcionista-inteligo' src={recepcionist} alt='Recepcion Inteligo'/>
                                    </div>
                                    <div className={`${bgRoom6} col-lg-3 col-xl-3 col-xs-3 col-sm-3 col-md-3 p-1 border border-top border-blue height-18 d-flex align-items-center justify-content-center text-center`}>
                                        <div>
                                            <span className='name-room'>{rooms[5].title}</span>
                                            <br/>
                                            {
                                                rooms[5].state === 'Ocupado' ? (
                                                    <div>
                                                        <span>{rooms[5].time}</span>
                                                        <br/>
                                                        <span>{rooms[5].executive}</span>
                                                    </div>
                                                ) : ''
                                            }                                   
                                        </div>
                                    </div>
                                    <div className={`${bgRoom1} col-lg-2 col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border border-top border-blue height-18 d-flex align-items-center justify-content-center text-center`}>
                                        <div>
                                            <span className='name-room'>{rooms[0].title}</span>
                                            <br/>
                                            {
                                                rooms[0].state === 'Ocupado' ? (
                                                    <div>
                                                        <span>{rooms[0].time}</span>
                                                        <br/>
                                                        <span>{rooms[0].executive}</span>
                                                    </div>
                                                ) : ''
                                            }                                   
                                        </div>
                                    </div>
                                    <div className={`${bgRoom2} col-lg-2 col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border border-top border-blue height-18 d-flex align-items-center justify-content-center text-center`}>
                                        <div>
                                            <span className='name-room'>{rooms[1].title}</span>
                                            <br/>
                                            {
                                                rooms[1].state === 'Ocupado' ? (
                                                    <div>
                                                        <span>{rooms[1].time}</span>
                                                        <br/>
                                                        <span>{rooms[1].executive}</span>
                                                    </div>
                                                ) : ''
                                            }                                   
                                        </div>
                                    </div>
                                </div>
                                <div className = "row">
                            <div className={`${bgRoom3} col-lg-2 offset-lg-10 col-xl-2 offset-xl-10 col-xs-2 offset-xs-10 col-sm-2 offset-sm-10 col-md-2 offset-md-10 p-1 border border-top border-blue height-18 d-flex align-items-center justify-content-center text-center`}>
                                <div>
                                    <span className='name-room'>{rooms[2].title}</span>
                                    <br/>
                                    {
                                        rooms[2].state === 'Ocupado' ? (
                                            <div>
                                                <span>{rooms[2].time}</span>
                                                <br/>
                                                <span>{rooms[2].executive}</span>
                                            </div>
                                        ) : ''
                                    }                                   
                                </div>
                            </div>
                            <div className={`${bgRoom4} col-lg-2 offset-lg-10 col-xl-2 offset-xl-10 col-xs-2 offset-xs-10 col-sm-2 offset-sm-10 col-md-2 offset-md-10 p-1 border border-top border-blue height-18 d-flex align-items-center justify-content-center text-center`}>
                            <div>
                                <span className='name-room'>{rooms[3].title}</span>
                                <br/>
                                {
                                    rooms[3].state === 'Ocupado' ? (
                                        <div>
                                            <span>{rooms[3].time}</span>
                                            <br/>
                                            <span>{rooms[3].executive}</span>
                                        </div>
                                    ) : ''
                                }                                   
                        </div>
                    </div>
                    
                    </div>
                            </div> 
                        
                    </div>
                </div>
            )
        }
            
    }
        
    render() {
        return (
            <React.Fragment>
                {this.showRooms()}
            </React.Fragment>
        );
    }
}

export default ExecutivePPanorama;