import React, { Component } from 'react';
import RoomForm from './RoomForm';
import PropTypes from 'prop-types';

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
 
FormsContainer.propTypes = {
    changeState: PropTypes.func,
    addRegister: PropTypes.func,
    responsable: PropTypes.shape({
        authed: PropTypes.boolean,
        loading: PropTypes.boolean,
        uid: PropTypes.string,
        user: PropTypes.string
    })
};

export default FormsContainer;