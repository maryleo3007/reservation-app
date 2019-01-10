import React from 'react';

const Room = (props) => {
    
    const {title, state, time, executive} = props.room ;
    
    return (
        <div className="room-item text-center p-2 border-top border-left border-dark">
        <span><b>Nombre:</b> {title}</span>
        </div>
    );
}

export default Room