import React, { Component } from 'react';

class RoomForm extends Component {   

    render() {

        const {title, state, time, executive, key} = this.props.room ;
        const available = 'disponible';
        const probable = 'probable';
        const unavailable = 'ocupado'


        let changeAvailable = (e) => {
            e.preventDefault();
            this.props.changeState(key, available)            
        }

        let changeProbable = (e) => {
            e.preventDefault();
            this.props.changeState(key, probable)            
        }

        let changeUnavailable = (e) => {
            e.preventDefault();
            this.props.changeState(key, unavailable)            
        }

        
        return (
            <div className="">
            <span><b>Formulario :</b> {title}</span>
            <button onClick={changeAvailable}>Disponible</button>
            <button onClick={changeProbable}>Probable</button>
            <button onClick={changeUnavailable}>Ocupado</button>
            <button>Hora</button>
            <button>Ejecutivo</button> 
            </div>
        );
    }
}
 
export default RoomForm;