import React from 'react';

const Room = (props) => {
    
    const {title, state, time, executive} = props.room ;
    
    return (
        <div className="">
        <span><b>Nombre:</b> {title}</span>
        </div>
    );
}

export default Room