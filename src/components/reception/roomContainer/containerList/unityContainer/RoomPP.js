import React, { Component } from 'react';

class RoomPP extends Component {

    showRoom = () => {
        if(this.props.room === undefined) return null
        const {id, state, time, title, floor, executive, key, responsable} = this.props.room;
        const cutName = this.props.responsable.indexOf(' ');
        const name = this.props.responsable.substring(0, cutName);
        const classRoomAvailable = state === 'Disponible' ? 'room-available' : ''
        const classRoomToBeConfirmed = state === 'Por confirmar' ? 'room-to-be-confirmed' : ''
        const classRoomOccupied = state === 'Ocupado' ? 'room-occupied' : '' 
        const classRoomOnHold = state === 'En espera de caja' ? 'room-on-hold' : '' 
        const showDetails = state === 'Ocupado' || state === 'En espera de caja' ? 'd-flex' : 'd-none'
        
        return (
            <div onClick={() => {
                this.props.changeToGreenOrAmber();
                this.props.showHideForm(id);
            }} atrkey={key} id={id} className={`room-content min-height-15 mb-0 
            ${classRoomAvailable} ${classRoomToBeConfirmed} ${classRoomOccupied} ${classRoomOnHold}`}
            >
                <span className='d-block'><b>{title}</b></span>
                <div className={`${showDetails}`}>
                    <span className='d-block'>{time}</span>
                    <span className='d-block mb-1'>{executive}</span>
                    <hr className='m-0'/>
                    <span className='d-block'>{responsable}</span>
                </div>                 
            </div>
        )
    }

    render() {
        return (
            <div className="" >
                {this.showRoom()}
            </div>
        );
    }
}

export default RoomPP;