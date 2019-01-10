import React from 'react';

const Room = (props) => {
    
    const {title, state, time, executive} = props.room ;
    
    return (
        <div className="">
            <button className='btn btn-primary mb-2'>{title}</button>
        </div>
    );
}

export default Room