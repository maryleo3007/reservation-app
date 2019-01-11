import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';
import FormsContainer from './formsContainer.js/FormsContainer';
import {ref} from './../../../services/firebase';

class RoomContainer extends Component {

    state = {
        shownCashOne:false,
        shownCashTwo:false,
    }

    onToggleForm = (id) => {
        if (id === 1) {
            this.setState({shownCashOne: !this.state.shownCashOne})
        }
        if (id === 2) {
            this.setState({shownCashTwo: !this.state.shownCashTwo})
        }
    }

    render() {
        
        const cashArr = this.props.cashs.sort(function(a, b) {
            return a.id - b.id;
        });

        return (
            <div className="room-container container">
                <div className="row mt-4">
                    <div className="col-7">
                        <div className="roomsList-container bg-white">
                            <div className="roomlist-container container-fluid">
                                <RoomList
                                    rooms = {this.props.rooms}  
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
                    <div className="col-5">
                        <div className="bg-white">
                            <FormsContainer 
                                rooms = {this.props.rooms}
                                objRegister = {this.props.objRegister} 
                                changeState = {this.props.changeState}
                                changeStateCash = {this.props.changeStateCash}
                                addRegister = {this.props.addRegister}
                                responsable = {this.props.responsable}
                                cashs = {cashArr}
                                shownCashOne = {this.state.shownCashOne}
                                shownCashTwo = {this.state.shownCashTwo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomContainer