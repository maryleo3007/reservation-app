import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';
import FormsContainer from './formsContainer.js/FormsContainer';

class RoomContainer extends Component {

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
                                    onToggleForm = {this.props.onToggleForm}
                                    changeCashState = {this.props.changeCashState}
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
                                addRegister = {this.props.addRegister}
                                responsable = {this.props.responsable}
                                cashs = {cashArr}
                                shownCashOne = {this.props.shownCashOne}
                                shownCashTwo = {this.props.shownCashTwo}
                                changeCashState = {this.props.changeCashState}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomContainer