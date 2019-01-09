import React, { Component } from 'react';
import RoomForm from './RoomForm';
import CashOneForm from './cashForms/CashOneForm';
import CashTwoForm from './cashForms/CashTwoForm';

class FormsContainer extends Component {
    
    render() { 
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
                {this.props.shownCashOne ? <CashOneForm/> : ""}
                {this.props.shownCashTwo ? <CashTwoForm/> : ""}
            </div>
         );
    }
}
 
export default FormsContainer;