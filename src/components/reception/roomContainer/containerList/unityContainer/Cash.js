import React from 'react';
import {changeState} from '../../../../helpers/receptionHelper.js';
const Cash = (props) => {
    if(props.cash === undefined) return null;
    const {title,state,showComponent,key,order} = props.cash ;

    const functions = () => {
        props.changeToGreenOrAmberCash(key,state);
        props.showHideForm(order);
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