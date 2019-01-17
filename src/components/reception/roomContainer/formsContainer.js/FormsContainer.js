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
                    cash = {this.props.cashs.filter( cash => cash.id === 1)}
                    formCash = {this.props.formCashList.filter( formCash => formCash.id === 1)}
                    changeCashState = {this.props.changeCashState}
                    updateDtHrInitCashForm = {this.props.updateDtHrInitCashForm}
                    updateTeamCash = {this.props.updateTeamCash}
                    updateCommentsCash = {this.props.updateCommentsCash}
                /> : ""}
                {this.props.shownCashTwo ? <CashTwoForm
                    cash = {this.props.cashs.filter( cash => cash.id === 2)}
                    changeCashState = {this.props.changeCashState}
                /> : ""}
            </div>
         );
    }
}
 
export default FormsContainer;