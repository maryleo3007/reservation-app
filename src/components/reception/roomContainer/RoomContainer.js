import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';

class RoomContainer extends Component {

    render() {
        return (
            <div className="room-container">
                <div className="container m-5">
                    <div className="row">
                        <div className="col-7">
                            <div className="roomsList-container bg-white">
                                <div className="roomlist-container">
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
                        </div>
                        <div className="col-4">
                            <div className="bg-white">
                                formulario
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default RoomContainer