import React, { Component } from 'react';
import RoomForm from './RoomForm';
import CashForm from './CashForm';

class FormsContainer extends Component {
    
    render() { 
        if(this.props.formCashList === undefined) return null;
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
                {
                    this.props.cashs.map( cash =>
                        <CashForm
                            key = {cash.id}
                            cash = {cash}
                            formCash = {this.props.formCashList.find( formCash => formCash.id === cash.id)}
                            showHideFormArr = {this.props.showHideFormArr[cash.order].showRoom}
                            showHideForm = {this.props.showHideForm}
                            changeCashState = {this.props.changeCashState}
                            changeCashComponent = {this.props.changeCashComponent}
                            updateDtHrInitCashForm = {this.props.updateDtHrInitCashForm}
                            updateTeamCash = {this.props.updateTeamCash}
                            updateCommentsCash = {this.props.updateCommentsCash}
                        />
                    )
                }
            </div>
         );
    }
}

export default FormsContainer;