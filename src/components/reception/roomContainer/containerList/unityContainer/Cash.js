import React from 'react';

const Cash = (props) => {
    
    const {title,state} = props.cash ;
    const classNames = {available:'border cash-item box-available',toBeConfirm:' border cash-item box-toBeCofirm',unAvailable:'border cash-item box-unAvailable'}

    let showClass = '';

    if (state === 1) {
        showClass = classNames.available;
    } else if (state === 2) {
        showClass = classNames.toBeConfirm;
    } else if (state === 3){
        showClass = classNames.unAvailable;
    }

    const functions = () => {
        props.changeCashState();
        props.onToggleForm();
    }

    return (
        <div className={showClass}  onClick={functions}>
            <div className="container d-flex h-100">
                <div className="row justify-content-center align-self-center mx-auto text-uppercase">
                    {title}
                </div>
            </div>
        </div>
    );
}

export default Cash