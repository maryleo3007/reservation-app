import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';

class RoomContainer extends Component {

    render() {
        return (
            <div className="room-container">
            <style jsx>{`.room-container { margin-left: 250px;}`}</style>
                <div className="container m-5">
                    <div className="row">
                        <div className="col-7">
                            <div className="bg-white">
                                <RoomList
                                    rooms = {this.props.rooms} 
                                />
                                <CashList
                                    cashs = {this.props.cashs}
                                />
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