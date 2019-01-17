import React from 'react';
import {changeState} from '../../../../helpers/receptionHelper.js';
const Cash = (props) => {
    const {title,state,showComponent,key} = props.cash ;
    const functions = () => {
        props.onToggleForm(showComponent);
        props.changeCashComponent();
        if (!showComponent) {
            props.changeCashState(key,2);
        } else {
            props.changeCashState(key,1);
        }
    }
    const showClass = changeState(state);


    return (
        <div className={showClass}  onClick={functions}>
            <div className="container d-flex h-100">
                <div className="row justify-content-center align-self-center mx-auto text-capitalize">
                    {title}
                </div>
            </div>
        </div>
    );
}

export default Cash