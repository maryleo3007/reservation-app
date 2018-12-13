import React from 'react';

const Room = (props) => {
    
    const {title} = props.room ;
    
    return (
        <div className="">
            {title}
        </div>
    );
}

export default Room