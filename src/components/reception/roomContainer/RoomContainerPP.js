import React, { Component } from 'react';
import {ref} from './../../../services/firebase';
import FormsContainerPP from './formsContainer.js/FormsContainerPP';
import RoomListPP from './containerList/RoomListPP';
import CashListPP from './containerList/CashListPP';

class RoomContainerPP extends Component {

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
        }
    }

    dbRoom = ref.child('RoomPP/');
    dbCashRoom = ref.child('CashRoomPP/');
    dbFormCash = ref.child('FormCajaPP/');

    // change state room
    changeToGreenOrAmber = (key, state) => {
        if (state === 'Disponible') {
            this.dbRoom.child('/'+ key).update({
                state: 'Por confirmar'
            });
        } else if (state === 'Por confirmar') {
            this.dbRoom.child('/'+ key).update({
                state: 'Disponible'
            });
        }
    }

    changeToGreenOrAmberCash = (key, state, userId_open, keyFormCash) => {
        
        if (state === 'Disponible') {
            this.dbCashRoom.child('/'+ key).update({
                state: 'Por confirmar',
                userId_open: this.props.datauser.uid
            });
            this.dbFormCash.child('/'+keyFormCash).update({
                userId_open: this.props.datauser.uid
            });
            this.dbCashRoom.child('/'+key).update({
                userId_open: this.props.datauser.uid
            })
        } else if (state === 'Por confirmar') {
            this.dbCashRoom.child('/'+ key).update({
                state: 'Disponible',
                userId_open: ''
            });
            this.dbFormCash.child('/'+keyFormCash).update({
                userId_open: ''
            })
            this.dbCashRoom.child('/'+key).update({
                userId_open: ''
            })
        }
    }

    showHideForm = (i) => {
            this.setState(({showHideFormArr}) => ({
                showHideFormArr: {
                    ...showHideFormArr,
                    [i] :{
                        showRoom: !this.state.showHideFormArr[i].showRoom
                    }   
                }            
            }))     
    }

    render() {

        const cashArr = this.props.cashs.sort(function(a, b) {
            return a.id - b.id;
        });

        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50';
        const show = this.props.showComponent ===  'rooms' ? 'd-block' : 'd-none'


        return (
            <div className={`room-container container-fluid ${marginLeft} ${show}`}>
                <div className="row mt-3">
                    <div className="col-8">
                        <div className="roomsList-container bg-white p-3">
                            <div className="container-fluid">
                                <RoomListPP
                                    rooms = {this.props.rooms} 
                                    responsable = {this.props.responsable} 
                                    changeToGreenOrAmber = {this.changeToGreenOrAmber}
                                    showHideFormArr = {this.state.showHideFormArr}
                                    showHideForm = {this.showHideForm}
                                    cashs = {this.props.cashs}
                                    changeToGreenOrAmberCash = {this.changeToGreenOrAmberCash}
                                    changeCashComponent = {this.props.changeCashComponent}
                                    datauser = {this.props.datauser}
                                />
                            </div>
                            {/* <div className="cashRoomlist-container col-lg-3 col-md-3">
                                <CashListPP
                                    cashs = {cashArr}
                                    showHideFormArr = {this.state.showHideFormArr}
                                    showHideForm = {this.showHideForm}
                                    changeToGreenOrAmberCash = {this.changeToGreenOrAmberCash}
                                    changeCashComponent = {this.props.changeCashComponent}
                                    datauser = {this.props.datauser}
                                />
                            </div> */}
                        </div>
                    </div>
                    <div className="col-4 px-5 py-2">
                        <div>
                            <FormsContainerPP 
                                rooms = {this.props.rooms}
                                objRegister = {this.props.objRegister} 
                                addRegister = {this.props.addRegister}
                                responsable = {this.props.responsable}
                                cashs = {this.props.cashs}
                                formCashList = {this.props.formCashList}
                                changeCashState = {this.props.changeCashState}
                                updateDtHrInitCashForm = {this.props.updateDtHrInitCashForm}
                                updateTeamCash = {this.props.updateTeamCash}
                                updateCommentsCash = {this.props.updateCommentsCash}
                                updateIndicatorCash = {this.props.updateIndicatorCash}
                                updateNumOfClients = {this.props.updateNumOfClients}
                                changeCashComponent = {this.props.changeCashComponent}
                                showHideFormArr = {this.state.showHideFormArr}
                                showHideForm = {this.showHideForm}
                                position = {this.props.position}
                                changeState = {this.props.changeState}
                                datauser = {this.props.datauser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomContainerPP;