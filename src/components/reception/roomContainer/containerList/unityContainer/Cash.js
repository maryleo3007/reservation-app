import React from 'react';

const Cash = (props) => {
    
    const {title} = props.cash ;

    // handleOpenCashForm = () => {

    // }
    
    return (
            <div className="border cash-item align-middle text-center text-capitalize">
                {title}
            </div>
    );
}

export default Cash