import React, { Component } from 'react';
import {ref} from './../../../../services/firebase';
import {getCurrenHour, getCurrentDate} from '../../../helpers/roomHelpers'
import Select from 'react-select';

class RoomForm extends Component {

    state = { 
        available: 'Disponible',
        toBeConfirmed: 'Por confirmar',
        unavailable: 'No disponible',
        occupied: 'Ocupado',
        objectFb: {},
        checked: false
    }

    dbFormSala = ref.child('FormSala/'+this.props.room.id);

    // refs 

    startTime = React.createRef();
    person = React.createRef();
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

    changeToBeConfirmed = (e) => {
        e.preventDefault();
        this.props.changeState(this.props.room.key, this.state.toBeConfirmed)            
    }

    changeUnavailable = (e) => {
        e.preventDefault();
        this.props.changeState(this.props.room.key, this.state.unavailable)            
    }

    changeOccupied = (e) => {
        e.preventDefault();
        this.props.changeState(this.props.room.key, this.state.occupied)            
    }

    updateFormDafault = () => {
        this.dbFormSala.update({
            appoinment: '',
            appoinmentBooleanN: false,
            appoinmentBooleanY: false,
            area: '',
            collaborator: '',
            comment: '',
            date: '',
            divs: {
                butonPlay: true,
                divHourStart: false,
                divTrash: false,
                div3Buttons: false,
                buttonExecutive: true
            },
            floor: '',
            hourEnd: '',
            hourExecutive: '',
            hourStart: '',
            person: {
                label: 'Seleccionar...',
                value: 'Seleccionar...'
            },
            room: this.props.room.id,
            team: {
                label: 'Seleccionar...',
                value: 'Seleccionar...'
            },
            use: 'Solo uso de sala',
            useChecked: false

        }); 
    }

    addRegister = (e) => {
        e.preventDefault();

        this.room.current.value = this.props.room.title;
        this.floor.current.value = this.props.room.floor;
        this.area.current.value = this.props.position;
        this.finalHour.current.value = getCurrenHour()
        if (this.commentary.current.value === '') {
            this.commentary.current.value = 'No hay comentarios'
        }
        // objeto del auto
        const objResgister = {
            startTime: this.startTime.current.value,
            person: this.state.objectFb.person.value,
            area: this.area.current.value, 
            appointment: this.appointment.current.value,
            commentary: this.commentary.current.value,
            date: this.date.current.value, 
            executiveHour: this.executiveHour.current.value,
            finalHour: this.finalHour.current.value,
            floor: this.floor.current.value,
            room: this.room.current.value,
            team: this.state.objectFb.team.value,
            responsableRegistry: this.responsableRegistry.current.value,
            box: this.box.current.value,
            id: this.props.room.id
        };
  
      // reset form
      this.props.addRegister(objResgister)
      this.updateFormDafault();
      e.currentTarget.reset();
      this.setState({
        checked: false
      })

      this.changeAvailable(e)
      this.props.showHideForm(this.props.room.id)
      
    };

    resetForm =(e) => {
        e.preventDefault();
        this.updateFormDafault();
        this.setState({
            checked: false
        })
    }

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

    updateHourStart = (e) => {
        e.preventDefault();
        const hourStart = getCurrenHour()
        this.dbFormSala.update({
            hourStart
        });
    }

    updateCollaborator = (e) => {
        e.preventDefault();
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

    updateDate = (e) => {
        e.preventDefault();
        const date = getCurrentDate()
        this.dbFormSala.update({
            date
        });
    }

    updateAppoinment = (appoinment) => {
        this.dbFormSala.update({
            appoinment
        });
    }

    updateAppoinmentBooleanN = (appoinmentBooleanN) => {
        this.dbFormSala.update({
            appoinmentBooleanN
        });
    }

    updateAppoinmentBooleanY = (appoinmentBooleanY) => {
        this.dbFormSala.update({
            appoinmentBooleanY
        });
    }

    updateHourExecutive = (e) => {
        e.preventDefault();
        const hourExecutive = getCurrenHour()
        this.dbFormSala.update({
            hourExecutive
        });
    }

    updatePerson = (person) => {
        this.dbFormSala.update({
            person : {
                value: person.value,
                label: person.value
            }
        });        
    }

    updateTeam = (team) => {
        this.dbFormSala.update({
            team : {
                value: team.value,
                label: team.value
            },
            divs: {
                butonPlay: this.state.objectFb.divs.butonPlay,
                divHourStart: this.state.objectFb.divs.divHourStart,
                divTrash: this.state.objectFb.divs.divTrash,
                div3Buttons: true,
                buttonExecutive: this.state.objectFb.divs.buttonExecutive
            }
        });
    }

    selectPerson = (selectedOption, e) => {
        this.updatePerson(selectedOption)
        this.updateTeam(selectedOption.team)
    }

    handleChange = (selectedOption) => {
        this.updateTeam(selectedOption)
      }

    useCashCheckbox=()=> {
        this.setState({
            checked: !this.state.checked
        },()=> {
                if(this.state.checked){ 
                    this.dbFormSala.update({
                        useChecked : true
                    });
                    const use = 'Uso de sala para caja'
                    this.updateUse(use)
                } else {
                    this.dbFormSala.update({
                        useChecked : false
                    });
                    const use = 'Solo uso de sala'
                    this.updateUse(use)
                }
            }       
        )  
    }

    apoinmentCheckbox = (e) => {
        if(e.target.value === 'si') {
            const appoinment = e.target.value;
            const appoinmentBooleanY = true;
            const appoinmentBooleanN = false;
            this.updateAppoinmentBooleanN(appoinmentBooleanN)
            this.updateAppoinmentBooleanY(appoinmentBooleanY)
            this.updateAppoinment(appoinment)
        } else if (e.target.value === 'no') {
            const appoinment = e.target.value;
            const appoinmentBooleanY = false;
            const appoinmentBooleanN = true;
            this.updateAppoinmentBooleanN(appoinmentBooleanN)
            this.updateAppoinmentBooleanY(appoinmentBooleanY)
            this.updateAppoinment(appoinment)
        } 
    }

    updateDivs = (divs) => {
        this.dbFormSala.update({
            divs: {
                butonPlay: !divs.butonPlay,
                divHourStart: !divs.divHourStart,
                divTrash: !divs.divTrash,
                div3Buttons: !divs.div3Buttons,
                buttonExecutive: !divs.buttonExecutive
            }
        })
    }

    showHourHidePlay = (divs) => {
        this.dbFormSala.update({
            divs: {
                butonPlay: !divs.butonPlay,
                divHourStart: !divs.divHourStart,
                divTrash: !divs.divTrash,
                div3Buttons: divs.div3Buttons,
                buttonExecutive: divs.buttonExecutive
            }
        })
    }

    hideButtonExecutive = (divs) => {
        this.dbFormSala.update({
            divs: {
                butonPlay: divs.butonPlay,
                divHourStart: divs.divHourStart,
                divTrash: divs.divTrash,
                div3Buttons: divs.div3Buttons,
                buttonExecutive: false
            }
        });
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
                    use: snap.val().use,
                    appoinmentBooleanN: snap.val().appoinmentBooleanN,
                    appoinmentBooleanY: snap.val().appoinmentBooleanY,
                    divs: snap.val().divs,
                    useChecked: snap.val().useChecked
                }
                this.setState({
                    objectFb
                })
        })        
    }

    

    render() {
        let showform = this.props.showHideFormArr ? 'd-block' : 'd-none'
        let buttonPlay = this.props.divs.butonPlay ? 'd-block' : 'd-none'
        let divTrash =  this.props.divs.divTrash ? 'd-block' : 'd-none'
        let divHourStart = this.props.divs.divHourStart ? 'd-block' : 'd-none'
        let div3Buttons = this.props.divs.div3Buttons ? 'd-block' : 'd-none'
        let buttonExecutive = this.props.divs.buttonExecutive ? 'd-block' : 'd-none'
        return (
            <div className={`form-container ${showform}`}>
                <div>
                    <span>{this.props.room.title}</span>
                </div>
                <div>
                    <span>{this.props.room.state}</span>
                </div>
                <form onSubmit={this.addRegister} id={this.props.room.key}>
                {/* inputs hidden */}
                    <input type="hidden" className="form-control" placeholder="" ref={this.room}/>
                    <input type="hidden" className="form-control" placeholder="" ref={this.area}/>
                    <input type="hidden" className="form-control" placeholder="" ref={this.floor}/>
                    <div className="form-group">
                    <div className={`${divTrash}`}>
                        <button type='reset' onClick={(e)=>{this.resetForm(e); this.changeToBeConfirmed(e)}}>Tachito</button>
                    </div>
                    <div className={`${buttonPlay}`}>
                        <button onClick={(e) => {this.updateHourStart(e); this.updateCollaborator(e); this.updateDate(e); this.changeOccupied(e); this.showHourHidePlay(this.state.objectFb.divs)}}>Play</button>
                    </div>
                    <div className={`${divHourStart}`}>
                        <p>{this.state.objectFb.hourStart}</p>
                        <input type="text" className="d-none" placeholder="hora de atención" ref={this.startTime} defaultValue={this.state.objectFb.hourStart}/>
                    </div>  
                    </div>
                    <div className="form-group">
                        <input type="text" className="d-none" placeholder="" ref={this.responsableRegistry} defaultValue={this.state.objectFb.collaborator}/>

                    </div>
                    <div className="form-group">
                        <input type="text" className="d-none" placeholder="" ref={this.date}  defaultValue={this.state.objectFb.date}/>
                    </div>
                    <div className="form-group">
                        <label>Persona</label>
                        <Select
                            ref={this.person}
                            value={this.state.objectFb.person}
                            onChange={(e)=> this.selectPerson(e)}
                            options={this.props.optionPerson}
                            key={this.props.optionPerson.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Equipo</label>
                        <Select
                            value={this.state.objectFb.team}
                            onChange={this.handleChange}
                            options={this.props.optionTeam}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cita</label><br/>
                        <input className="form-check-input" type="radio" name="exampleRadios" onClick={(e) => this.apoinmentCheckbox(e)} value='si' checked={this.state.objectFb.appoinmentBooleanY}/>
                        <span>si</span> <br/>
                        <input className="form-check-input" type="radio" name="exampleRadios" onClick={(e) => this.apoinmentCheckbox(e)}  value="no" checked={this.state.objectFb.appoinmentBooleanN} />
                        <span>No</span>

                        <input type="text"  className="form-control d-none" placeholder="" ref={this.appointment} defaultValue={this.state.objectFb.appoinment}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Comentario</label>
                        <input className="form-control" rows="3" ref={this.commentary} onKeyUp={()=> this.updateComment(this.commentary.current.value)}
                        defaultValue={this.state.objectFb.comment}/>
                    </div>
                    <div className="form-group">
                        <input className="form-check-input" type="checkbox" checked={this.state.objectFb.useChecked} onChange={(e)=>this.useCashCheckbox(e)}/>
                        <label className="form-check-label">
                        Solo para uso de caja
                        </label>
                        <input type="text" className="d-none" placeholder="" ref={this.box} defaultValue={this.state.objectFb.use}/>
                    </div>
                    <div className="form-group">
                        <input type="text"  className="d-none" placeholder="" ref={this.finalHour}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="d-none" placeholder="" ref={this.executiveHour} defaultValue={this.state.objectFb.hourExecutive}/>
                    </div>
                    <div className={`${div3Buttons}`}>
                        <button className={`${buttonExecutive}`} onClick={(e) => {this.updateHourExecutive(e); this.hideButtonExecutive(this.state.objectFb.divs)}}>Ejecutivo</button>
                        <button>Caja</button>
                        <button>Salida</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
         );
    }
}

export default RoomForm;

