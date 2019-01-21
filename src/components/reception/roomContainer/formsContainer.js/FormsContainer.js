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
                        addRegister = {this.props.addRegister}
                        responsable = {this.props.responsable}
                        showHideFormArr = {this.props.showHideFormArr[room.id].showRoom}
                        showHideForm = {this.props.showHideForm}
                        position = {this.props.position}
                    />
                )} */}
                <CashOneForm
                    cash = {this.props.cashs.filter( cash => cash.id === 1)}
                    formCash = {this.props.formCashList.filter( formCash => formCash.id === 1)}
                    changeCashState = {this.props.changeCashState}
                    updateDtHrInitCashForm = {this.props.updateDtHrInitCashForm}
                    updateTeamCash = {this.props.updateTeamCash}
                    updateCommentsCash = {this.props.updateCommentsCash}
                    shownCashOne = {this.props.shownCashOne}
                />
                {/* <CashTwoForm
                    cash = {this.props.cashs.filter( cash => cash.id === 2)}
                    changeCashState = {this.props.changeCashState}
                    shownCashTwo = {this.props.shownCashTwo}
                />  */}
            </div>
         );
    }
}

export default FormsContainer;