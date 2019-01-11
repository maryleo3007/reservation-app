import React, { Component } from 'react';
import RoomForm from './RoomForm';
import PropTypes from 'prop-types';
import CashOneForm from './cashForms/CashOneForm';
import CashTwoForm from './cashForms/CashTwoForm';

class FormsContainer extends Component {
    
    render() { 
        // console.log(this.props.cashs.id)
        return ( 
            <div>
                {/* {this.props.rooms.map(room => 
                    <RoomForm
                        key = {room.id}
                        room = {room}
                        objRegister = {this.props.objRegister}
                        changeState = {this.props.changeState}
                        addRegister = {this.props.addRegister}
                        responsable = {this.props.responsable}
                    />
                )} */}
                {this.props.shownCashOne ? <CashOneForm
                    cash = {this.props.cashs.id}
                /> : ""}
                {this.props.shownCashTwo ? <CashTwoForm
                    cash = {this.props.cashs.id}
                /> : ""}
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