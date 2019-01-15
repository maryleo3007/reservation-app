import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';
import FormsContainer from './formsContainer.js/FormsContainer';
import {ref} from './../../../services/firebase';

class RoomContainer extends Component {

    state = {
        shownCashOne:false,
        shownCashTwo:false,
        roomAvailable: 'Disponible',
        roomToBeConfirmed : 'Por confirmar',
        roomOccupied : 'Ocupado',
        roomNotAvailable: 'No disponible',
        roomOnHold: 'En espera de sala'
    }

    dbRoom = ref.child('Room/');

    onToggleForm = (id) => {
        if (id === 1) {
            this.setState({shownCashOne: !this.state.shownCashOne})
        }
        if (id === 2) {
            this.setState({shownCashTwo: !this.state.shownCashTwo})
        }
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

    render() {
        const cashArr = this.props.cashs.sort(function(a, b) {
            return a.id - b.id;
        });

        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50'
        return (
            
            <div className={`room-container container-fluid ${marginLeft}`}>
                <div className="row mt-3">
                    <div className="col-8">
                        <div className="roomsList-container bg-white p-3">
                            <div className="container bg-white container-fluid">
                                <RoomList
                                    rooms = {this.props.rooms} 
                                    responsable = {this.props.responsable} 
                                    changeToGreenOrAmber = {this.changeToGreenOrAmber}
                                />
                            </div>
                            <div className="cashRoomlist-container col-lg-3 col-md-3">
                                <CashList
                                    cashs = {cashArr}
                                    onToggleForm = {this.onToggleForm}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 pl-0">
                        <div className="bg-white pl-2">
                            <FormsContainer 
                                rooms = {this.props.rooms}
                                objRegister = {this.props.objRegister} 
                                addRegister = {this.props.addRegister}
                                responsable = {this.props.responsable}
                                cashs = {cashArr}
                                shownCashOne = {this.state.shownCashOne}
                                shownCashTwo = {this.state.shownCashTwo}
                            />
                            <p>componente de formulario</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomContainer