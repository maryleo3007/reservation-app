import React from 'react';

const Cash = (props) => {
    const {title} = props.cash ;
    return (
        <div className="border cash-item" onClick={props.onToggleForm}>
            <div className="container d-flex h-100">
                <div className="row justify-content-center align-self-center mx-auto text-uppercase">
                    {title}
                </div>
            </div>
        </div>
    );
}

export default Cash