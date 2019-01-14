import React, { Component } from 'react';

class Room extends Component {

    showRooms = () => {
        if(this.props.room === undefined) return null
        const {id, state, time, title, floor, executive, key} = this.props.room;
        const cutName = this.props.responsable.indexOf(' ');
        const name = this.props.responsable.substring(0, cutName);
        const classRoomAvailable = state === 'Disponible' ? 'room-available' : ''
        const classRoomToBeConfirmed = state === 'Por confirmar' ? 'room-to-be-confirmed' : ''
        const classRoomOccupied = state === 'Ocupado' ? 'room-occupied' : '' 
        const classRoomNotAvailable = state === 'No disponible' ? 'room-not-available' : '' 
        const classRoomOnHold = state === 'En espera de caja' ? 'room-on-hold' : '' 
        
        return (
            <div atrkey={key} id={id} className={`room-content min-height-15 mb-0 ${classRoomNotAvailable} ${classRoomAvailable} ${classRoomToBeConfirmed} ${classRoomOccupied} ${classRoomOnHold}`}>
                <span className='d-block'><b>{title}</b></span>
                 <span className='d-block'>{time}</span>
                <span className='d-block'>{executive}</span>
                <hr className='m-0'/>
                <span className='d-block'>{name}</span>
            </div>
        )
    }
    render() { 
        return ( 
            <div className="">
                {this.showRooms()}
            </div>
         );
    }
}


export default Room