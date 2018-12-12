import React from 'react';

const Cash = (props) => {
    
    const {title} = props.cash ;
    
    return (
        <div className="col s12 m6 l4">
            {title}
        </div>
    );
}

export default Cash