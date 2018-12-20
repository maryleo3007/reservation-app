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
                        objRegister = {this.props.objRegister}
                        changeState = {this.props.changeState}
                        addRegister = {this.props.addRegister}
                        responsable = {this.props.responsable}
                    />
                )}
            </div>
         );
    }
}
 
export default FormsContainer;