import React, { Component } from 'react';
class RoomForm extends Component {

    state = { 
        roomState : {
            title: this.props.room.title,
            state: this.props.room.state,
            time: this.props.room.time,
            executive: this.props.room.executive,
            key: this.props.room.key,
        },
        available: 'disponible',
        probable: 'probable',
        unavailable: 'ocupado'
    }

    // refs 

    startTime = React.createRef();
    collaborator = React.createRef();
    area = React.createRef(); 
    appointment = React.createRef();
    commentary = React.createRef();
    date = React.createRef(); 
    executiveHour = React.createRef();
    finalHour = React.createRef();
    floor = React.createRef();
    roomId = React.createRef();
    team = React.createRef();
    responsibleRegistry = React.createRef();
    box = React.createRef();
    idForm = React.createRef();


    changeAvailable = (e) => {
        e.preventDefault();
        this.props.changeState(this.state.roomState.key, this.state.available)            
    }

    changeProbable = (e) => {
        e.preventDefault();
        this.props.changeState(this.state.roomState.key, this.state.probable)            
    }

    changeUnavailable = (e) => {
        e.preventDefault();
        this.props.changeState(this.state.roomState.key, this.state.unavailable)            
    }

    addRegister = e => {
        e.preventDefault();

        // objeto del auto
        const objResgister = {
            startTime: this.startTime.current.value,
            collaborator: this.collaborator.current.value,
            area: this.area.current.value, 
            appointment: this.appointment.current.value,
            commentary: this.commentary.current.value,
            date: this.date.current.value, 
            executiveHour: this.executiveHour.current.value,
            finalHour: this.finalHour.current.value,
            floor: this.floor.current.value,
            roomId: this.roomId.current.value,
            team: this.team.current.value,
            responsibleRegistry: this.responsibleRegistry.current.value,
            box: this.box.current.value,
            idForm: this.idForm.current.value,
      };
  
    //   this.props.cotizarSeguroProps(objResgister);
  
      // reset form
      console.log(objResgister);
      
      e.currentTarget.reset();

    
    };
    render() {
        return (
            <div>
                <div>
                    <span>{this.state.roomState.title}</span>
                    <button onClick={this.changeAvailable}>Disponible</button>
                    <button onClick={this.changeProbable}>Probable</button>
                    <button onClick={this.changeUnavailable}>Ocupado</button>
                </div>
                <form onSubmit={this.addRegister}>
                    <div className="form-group">
                        <label>Hora de atención</label>
                        <input type="text" className="form-control" placeholder="hora de atención" ref={this.startTime}/>
                    </div>
                    <div className="form-group">
                        <label>Personal responsable</label>
                        <input type="text" className="form-control" placeholder="" ref={this.responsibleRegistry}/>
                    </div>
                    <div className="form-group">
                        <label>Area del responsable </label>
                        <input type="text" className="form-control" placeholder="" ref={this.area}/>
                    </div>
                    <div className="form-group">
                        <label>Uso de Caja</label>
                        <input type="text" className="form-control" placeholder="" ref={this.box}/>
                    </div>
                    <div className="form-group">
                        <label>Fecha</label>
                        <input type="text" className="form-control" placeholder="" ref={this.date}/>
                    </div>
                    <div className="form-group">
                        <label>Piso</label>
                        <input type="text" className="form-control" placeholder="" ref={this.floor}/>
                    </div>
                    <div className="form-group">
                        <label>Sala id</label>
                        <input type="text" className="form-control" placeholder="" ref={this.roomId}/>
                    </div>
                    <div className="form-group">
                        <label>Persona</label>
                        <input type="text" className="form-control" placeholder="" ref={this.collaborator}/>
                    </div>
                    <div className="form-group">
                        <label>Equipo</label>
                        <input type="text" className="form-control" placeholder="" ref={this.team}/>
                    </div>
                    <div className="form-group">
                        <label>Cita</label>
                        <input type="text" className="form-control" placeholder="" ref={this.appointment}/>
                    </div>
                    <div className="form-group">
                        <label>Comentario</label>
                        <textarea className="form-control" rows="3" ref={this.commentary}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Hora final</label>
                        <input type="text" className="form-control" placeholder="" ref={this.finalHour}/>
                    </div>
                    <div className="form-group">
                        <label>form id</label>
                        <input type="text" className="form-control" placeholder="" ref={this.idForm}/>
                    </div>
                    <div className="form-group">
                        <label>Hora ejecutivo</label>
                        <input type="text" className="form-control" placeholder="" ref={this.executiveHour}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
         );
    }
}
 
export default RoomForm;