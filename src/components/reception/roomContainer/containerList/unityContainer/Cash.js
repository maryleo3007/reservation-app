import React from 'react';

const Cash = (props) => {
    
    const {title} = props.cash ;
    
    return (
            <div className="col-lg-3 col-md-3">
                {title}
            </div>
    );
}

export default Cash