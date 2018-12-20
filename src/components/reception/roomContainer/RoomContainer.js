import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';
import FormsContainer from './formsContainer.js/FormsContainer';

class RoomContainer extends Component {

    render() {
        return (
            <div className="room-container container">
                <div className="row">
                    <div className="col-7">
                        <div className="roomsList-container bg-white mt-5">
                            <div className="roomlist-container container-fluid">
                                <RoomList
                                    rooms = {this.props.rooms} 
                                />
                            </div>
                            <div className="cashRoomlist-container">
                                <CashList
                                    cashs = {this.props.cashs}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="bg-white">
                                <FormsContainer rooms = {this.props.rooms} changeState = {this.props.changeState}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="bg-white mt-5">
                            formulario
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default RoomContainer