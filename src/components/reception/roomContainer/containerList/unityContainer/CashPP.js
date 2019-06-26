import React from 'react';
import {changeState} from '../../../../helpers/receptionHelper.js';

const CashPP = (props) => {
    
    if(props.cash === undefined) return null;
    const { title, state, key ,order, userId_open, formCash_id} = props.cash ;
    
    const functions = () => {
        if (state !== 'No disponible') {
            props.changeToGreenOrAmberCash(key,state, userId_open, formCash_id);
            
            // if((state === 'Por confirmar' && userId_open !== props.datauser.uid)){
            //     console.log('no puede abrir pq esta en estado sin confirmar')
            // }else{
            //     props.showHideForm(order);
            // }
            props.showHideForm(order);
        }
    }
    const showClass = changeState(state);

    return (
        <div className={`room-content min-height-15 h-100 mb-0 ${showClass}`}  onClick={functions}>
            <div className=" d-flex h-100 border-cash-dif">
                <div className="row justify-content-center align-self-center mx-auto text-capitalize">
                    {title}
                </div>
            </div>
        </div>
    );
}

export default CashPP;