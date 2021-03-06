import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';
import FormsContainer from './formsContainer.js/FormsContainer';
import {ref} from './../../../services/firebase';

class RoomContainer extends Component {

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
        floor: 21
    }

    dbRoom = ref.child('Room/');
    dbCashRoom = ref.child('CashRoom/');
    dbFormCash = ref.child('FormCaja/');

    change17 =()=>{
        this.setState({
            floor: 17
        })
    }

    change21 =()=>{
        this.setState({
            floor: 21
        })
    }


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

        const button17 = this.state.floor === 17 ? 'selected' : 'not-selected'
        const button21 = this.state.floor === 21 ? 'selected' : 'not-selected'
        const show17 = this.state.floor === 17 ? 'd-flex' : 'd-none'
        const show21 = this.state.floor === 21 ? 'd-flex' : 'd-none'

        return (
            
            <div className={`room-container container-fluid ${marginLeft} ${show}`}>
                <div>
                    <div className='d-flex ml-5 w-75 justify-content-around align-items-center pt-3'>
                        <span className={`${button21} btn`} onClick={()=>{this.change21()}}>Piso 21</span> 
                        <span onClick={()=>{this.change17()}} className={`${button17} btn`}>Piso 17</span>
                    </div>
                    <div>
                        <div  className={`${show21} row mt-3`}>
                            <div className="col-7">
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
                            <div className="col-5 px-5 py-2">
                                <div>
                                    <FormsContainer 
                                        rooms = {this.props.rooms}
                                        objRegister = {this.props.objRegister} 
                                        addRegister = {this.props.addRegister}
                                        responsable = {this.props.responsable}
                                        cashs = {cashArr}
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
                        <div className={`${show17} row mt-3`}>
                            <div className="col-7">
                                <div className="roomsList-container bg-white p-3">
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
                </div>
            </div>
        );
    }
}

export default RoomContainer