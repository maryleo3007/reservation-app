import React,{Component} from 'react';
import Room from './unityContainer/Room';

class RoomList extends Component {

    render() {
        return (
            <div className="row room-list">
                {this.props.rooms.map(room => 
                    <Room
                        key = {room.id}
                        room = {room}
                    />
                )}
            </div>
        );
    }
}

export default RoomList