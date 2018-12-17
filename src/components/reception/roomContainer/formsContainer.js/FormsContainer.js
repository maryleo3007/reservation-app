import React, { Component } from 'react';
import RoomForm from './RoomForm';


class FormsContainer extends Component {
    render() { 
        return ( 
            <div>
                {this.props.rooms.map(room => 
                    <RoomForm
                        key = {room.id}
                        room = {room}
                        changeState = {this.props.changeState}
                    />
                )}
            </div>
         );
    }
}
 
export default FormsContainer;