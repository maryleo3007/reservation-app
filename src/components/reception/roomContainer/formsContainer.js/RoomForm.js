import React, { Component } from 'react';
import {ref} from './../../../../services/firebase';
import {getCurrenHour, getCurrentDate} from '../../../helpers/roomHelpers'

class RoomForm extends Component {

    state = { 
        available: 'disponible',
        probable: 'probable',
        unavailable: 'ocupado',
        objectFb: {},
        checked: false
    }

    dbFormSala = ref.child('FormSala/'+this.props.room.id);

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


    updateRoomResponsable = (key, responsable) => {
        ref.child('Room/').child('/' + key).update({
            responsable
        });
    }

    updateComment = (val) => {
        this.dbFormSala.update({
            comment : val
        });
    }

    updateHourStart = () => {
        const hourStart = getCurrenHour()
        this.dbFormSala.update({
            hourStart
        });
    }

    updateCollaborator = () => {
        const cutName = this.props.responsable.indexOf(' ');
        const collaborator = this.props.responsable.substring(0, cutName);
        this.updateRoomResponsable(this.props.room.key, collaborator);
        this.dbFormSala.update({
            collaborator
        });
    }

    updateUse = (use) => {
        this.dbFormSala.update({
            use
        });
    }

    updateDate = () => {
        
        const a = getCurrentDate()
        console.log(a)
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
    
        this.setState({
            checked: !this.state.checked
        },()=> {
                if(this.state.checked){ 
                    const use = 'Uso de sala para caja'
                    this.updateUse(use)
                } else {
                    const use = 'Solo uso de sala'
                    this.updateUse(use)
                }
            }       
        )  
      }

    componentDidMount() {
        this.dbFormSala.on('value', snap => {
                let objectFb = {
                    appoinment: snap.val().appoinment,
                    area: snap.val().area,
                    collaborator: snap.val().collaborator,
                    comment: snap.val().comment,
                    date: snap.val().date,
                    floor: snap.val().floor,
                    hourEnd: snap.val().hourEnd,
                    hourExecutive: snap.val().hourExecutive,
                    hourStart: snap.val().hourStart,
                    person: snap.val().person,
                    room: snap.val().room,
                    team: snap.val().team,
                    use: snap.val().use
                }
                this.setState({
                    objectFb
                })
        })
    }

    render() {
        let showform = this.props.showHideFormArr ? 'd-block' : 'd-none'
        return (
            <div className={`form-container ${showform}`}>
                <div>
                    <span>{this.props.room.title}</span>
                </div>
                <form onSubmit={this.addRegister} id={this.props.room.key}>
                {/* inputs hidden */}
                    <input type="hidden" className="form-control" placeholder="" ref={this.room}/>
                    <input type="hidden" className="form-control" placeholder="" ref={this.area}/>
                    <input type="hidden" className="form-control" placeholder="" ref={this.floor}/>
                    <div className="form-group">
                        <label>Ingreso del cliente</label>
                        <button onClick={() => {this.updateHourStart(); this.updateCollaborator(); this.updateDate()}}>Play</button>
                        <input type="text" className="form-control" placeholder="hora de atención" ref={this.startTime} defaultValue={this.state.objectFb.hourStart}/>
                    </div>
                    <div className="form-group">
                        <label>Personal responsable</label>
                        <input type="text" className="form-control" placeholder="" ref={this.responsableRegistry} defaultValue={this.state.objectFb.collaborator}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Uso de Caja</label><br/>
                        <input className="form-check-input" type="checkbox" checked={this.state.checked} onChange={(e)=>this.handleInputChange(e)}/>
                        <label className="form-check-label">
                        Solo para uso de caja
                        </label>
                        <p>{this.state.objectFb.use}</p>
                        <input type="text" className="form-control" placeholder="" ref={this.box} defaultValue={this.state.objectFb.use}/>
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
                        <input type="text" className="form-control" placeholder="" ref={this.appointment} defaultValue={this.state.objectFb.appoinment}/>
                    </div>
                    <div className="form-group">
                        <label>Comentario</label>
                        <input className="form-control" rows="3" ref={this.commentary} onKeyUp={()=> this.updateComment(this.commentary.current.value)}
                        defaultValue={this.state.objectFb.comment}/>
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

