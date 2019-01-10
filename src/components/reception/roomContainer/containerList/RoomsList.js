import React,{Component} from 'react';
import Room from './unityContainer/Room';

class RoomList extends Component {

    render() {
        return (
            <div className="">
                {this.props.rooms.map(room => 
                    <Room
                        key = {room.id}
                        room = {room}
                        showRoom = {this.props.showRoom}
                    />
                )}
            </div>
        );
    }
}

export default RoomList