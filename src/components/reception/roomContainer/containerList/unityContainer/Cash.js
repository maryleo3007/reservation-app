import React from 'react';
import {changeState} from '../../../../helpers/receptionHelper.js';
const Cash = (props) => {
    
    if(props.cash === undefined) return null;
    const {title,state,key,order, userId_open} = props.cash ;

    const functions = () => {
        props.changeToGreenOrAmberCash(key,state, userId_open);
        if(state === 'Por confirmar' && userId_open !== props.datauser.uid){
            console.log('no puede abrir pq esta en estado sin confirmar')
        }else{
            props.showHideForm(order);
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