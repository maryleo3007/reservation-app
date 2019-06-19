import React, { Component } from 'react';
import {ref} from './../../../services/firebase';
import RoomList from '../../reception/roomContainer/containerList/RoomsList';
import CashList from './../../reception/roomContainer/containerList/CashList';

class RoomsHeadquarters extends Component {

    state = {
        roomAvailable: 'Disponible',
        roomToBeConfirmed : 'Por confirmar',
        roomOccupied : 'Ocupado',
        roomNotAvailable: 'No disponible',
        roomOnHold: 'En espera de sala',
        showHideFormArr: {
           1: { showRoom: false}, 
           2: { showRoom: false},
           3: { showRoom: false},
           4: { showRoom: false},
           5: { showRoom: false},
           6: { showRoom: false},
           7: { showRoom: false},
           8: { showRoom: false},
           9: { showRoom: false},
           10: { showRoom: false},
           11: { showRoom: false},
           12: { showRoom: false},
           13: { showRoom: false},
           14: { showRoom: false}
        },
        headquarters: 'Oficina principal Inteligo'
    }

    dbRoom = ref.child('Room/');
    dbCashRoom = ref.child('CashRoom/');

    chageHeadquarters1 =()=>{
        this.setState({
            headquarters: 'Oficina principal Inteligo'
        })
    }

    chageHeadquarters2 =()=>{
        this.setState({
            headquarters: 'Oficina Patio Panorama Surco'
        })
    }

    changeToGreenOrAmber=()=>{
   
    }

    showHideForm=()=>{

    }

    changeToGreenOrAmberCash=()=>{

    }

    render() {

        const cashArr = this.props.cashs.sort(function(a, b) {
            return a.id - b.id;
        });

        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50';
        const show = this.props.showComponent ===  'rooms' ? 'd-block' : 'd-none'

        return (
            <div className={`${marginLeft} ${show}`}>
                <p className='btn btn-primary' onClick={()=>{this.chageHeadquarters1()}}>Oficina principal</p> 
                <p onClick={()=>{this.chageHeadquarters2()}} className='btn btn-primary'>Oficina Patio Panorama</p>
                <div>
                    {this.state.headquarters === 'Oficina principal Inteligo' ? (
                        <div className={`room-container container-fluid`}>
                        <div className="row mt-3">
                            <div className="col-6">
                                <div className="roomsList-container bg-white p-3">
                                    <div className="container-fluid">
                                        <RoomList
                                            rooms = {this.props.rooms} 
                                            responsable = {this.props.responsable} 
                                            changeToGreenOrAmber = {this.changeToGreenOrAmber}
                                            showHideFormArr = {this.state.showHideFormArr}
                                            showHideForm = {this.showHideForm}
                                        />
                                    </div>
                                    <div className="cashRoomlist-container col-lg-3 col-md-3">
                                        <CashList
                                            cashs = {cashArr}
                                            showHideFormArr = {this.state.showHideFormArr}
                                            showHideForm = {this.showHideForm}
                                            changeToGreenOrAmberCash = {this.changeToGreenOrAmberCash}
                                            changeCashComponent = {this.props.changeCashComponent}
                                            datauser = {this.props.datauser}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : this.state.headquarters === 'Oficina Patio Panorama Surco' ? (
                        <div>
                            salas de patio panorama
                        </div>
                    ) : ''}
                    
                </div>
                
            </div>
        );
    }
}

export default RoomsHeadquarters;