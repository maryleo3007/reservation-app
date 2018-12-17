import React from 'react';

const Room = (props) => {
    
    const {title, state, time, executive} = props.room ;
    
    return (
        <div className="">
        <span><b>Nombre:</b> {title}</span>
        <span><b>Estado:</b> {state}</span>
        <span><b>Hora:</b> {time}</span>
        <span><b>Ejecutivo:</b> {executive}</span>
        </div>
    );
}

export default Room