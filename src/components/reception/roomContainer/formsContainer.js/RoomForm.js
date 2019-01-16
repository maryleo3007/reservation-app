import React, { Component } from 'react';
class RoomForm extends Component {

    state = { 
        available: 'disponible',
        probable: 'probable',
        unavailable: 'ocupado',
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
    room = React.createRef();
    team = React.createRef();
    responsableRegistry = React.createRef();
    box = React.createRef();


    changeAvailable = (e) => {
        e.preventDefault();
        this.props.changeState(this.props.room.key, this.state.available)            
    }

    changeProbable = (e) => {
        e.preventDefault();
        this.props.changeState(this.props.room.key, this.state.probable)            
    }

    changeUnavailable = (e) => {
        e.preventDefault();
        this.props.changeState(this.props.room.key, this.state.unavailable)            
    }

    addRegister = e => {
        e.preventDefault();

        this.room.current.value = this.props.room.title;
        this.floor.current.value = this.props.room.floor;
        this.area.current.value = this.props.responsable.position;
        
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
            room: this.room.current.value,
            team: this.team.current.value,
            responsableRegistry: this.responsableRegistry.current.value,
            box: this.box.current.value
        };
  
      // reset form
      this.props.addRegister(objResgister)
      
      e.currentTarget.reset();
    };

    componentDidMount() {
        console.log(this.props.showHideFormArr);
        
    }

    render() {
        let showform = this.props.showHideFormArr ? 'd-block' : 'd-none'
        return (
            <div className={`form-container ${showform}`}>
                <div>
                    <span>{this.props.room.title}</span>
                    <button onClick={this.changeAvailable}>Disponible</button>
                    <button onClick={this.changeProbable}>Probable</button>
                    <button onClick={this.changeUnavailable}>Ocupado</button>
                </div>
                <form onSubmit={this.addRegister}>
                {/* inputs hidden */}
                    <input type="hidden" className="form-control" placeholder="" ref={this.room}/>
                    <input type="hidden" className="form-control" placeholder="" ref={this.area}/>
                    <input type="hidden" className="form-control" placeholder="" ref={this.floor}/>
                    <div className="form-group">
                        <label>Hora de atención</label>
                        <input type="text" className="form-control" placeholder="hora de atención" ref={this.startTime}/>
                    </div>
                    <div className="form-group">
                        <label>Personal responsable</label>
                        <input type="text" className="form-control" placeholder="" ref={this.responsableRegistry}/>
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
                        <label>Sala id</label>
                        <input type="text" className="form-control" placeholder="" ref={this.room}/>
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

