import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';
import FormsContainer from './formsContainer.js/FormsContainer';
import PropTypes from 'prop-types';

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
                                        showRoom = {this.props.showRoom}
                                    />
                                </div>
                                <div className="cashRoomlist-container">
                                    <CashList
                                        cashs = {this.props.cashs}
                                        showRoom = {this.props.showRoom}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="bg-white">
                                <FormsContainer 
                                    rooms = {this.props.rooms}
                                    objRegister = {this.props.objRegister} 
                                    changeState = {this.props.changeState}
                                    addRegister = {this.props.addRegister}
                                    responsable = {this.props.responsable}
                                    showRoom = {this.props.showRoom}
                                    />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

RoomContainer.propTypes = {
    changeState: PropTypes.func,
    addRegister: PropTypes.func,
    showRoom: PropTypes.bool,
    responsable: PropTypes.shape({
        authed: PropTypes.boolean,
        loading: PropTypes.boolean,
        uid: PropTypes.string,
        user: PropTypes.string
    }),
    rooms: PropTypes.array
};


export default RoomContainer