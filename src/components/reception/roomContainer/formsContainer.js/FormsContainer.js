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
                
                {this.props.shownCashOne ? <CashOneForm
                    changeStateCash = {this.props.changeStateCash}
                    cash = {this.props.cashs.filter( cash => cash.id == 1)}
                /> : ""}
                {this.props.shownCashTwo ? <CashTwoForm
                    cash = {this.props.cashs.filter( cash => cash.id == 2)}
                /> : ""}
            </div>
         );
    }
}
 
export default FormsContainer;