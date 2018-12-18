import React, { Component } from 'react';

class RoomForm extends Component {    
    render() {

        const {title, state, time, executive, key} = this.props.room ;

        const changeState = (e) => {
            e.preventDefault();
            this.props.changeState(key)            
        }

        return (
            <div className="">
            <span><b>Formulario :</b> {title}</span>
            <button onClick={changeState}>Probable</button>
            <button>Disponible</button>
            <button>Ocupado</button>
            <button>Hora</button>
            <button>Ejecutivo</button> 
            </div>
        );
    }
}
 
export default RoomForm;