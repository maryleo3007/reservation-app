import React, { Component } from 'react';
import {ref} from './../../../../services/firebase';
import {getCurrenHour, getCurrentDate} from '../../../helpers/roomHelpers'
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class RoomForm extends Component {

    state = { 
        available: 'Disponible',
        toBeConfirmed: 'Por confirmar',
        unavailable: 'No disponible',
        occupied: 'Ocupado',
        roomOnHold: 'En espera de caja',
        objectFb: {},
        checked: false,
        modal: false,
        close: true

    }

    dbFormSala = ref.child('FormSala/'+this.props.room.id);
    dbRoom = ref.child('Room/'+this.props.room.key);


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
    branchOffice = React.createRef();

    changeAvailable = () => {
        // e.preventDefault();
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

    changeOccupied = () => {
        this.props.changeState(this.props.room.key, this.state.occupied)            
    }

    changeRoomOnHold = () => {
        this.props.changeState(this.props.room.key, this.state.roomOnHold)              
    }

    setTimeStartForRoom = (time) => {
        this.dbRoom.update({
            time
        })
    }

    setExecutiveForRoom = (executive) => {
        this.dbRoom.update({
            executive: executive
        })        
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

    objResgister = (bool, msg) => {
        this.room.current.value = this.props.room.title;
        this.floor.current.value = this.props.room.floor;
        this.area.current.value = this.props.position;
        this.finalHour.current.value = getCurrenHour()

        if (this.commentary.current.value === '') {
            this.commentary.current.value = 'No hay comentarios'
        }
        if (this.executiveHour.current.value === '') {
            this.executiveHour.current.value = 'No hay atención de ejecutivo'
        }
        if(!bool){
            this.updateUse(msg)
            this.box.current.value = msg 
        } else {
            this.box.current.value = this.state.objectFb.use
        }
        let branchOffice = '';

        if (this.props.datauser.branchOffice === '1') {
            branchOffice = 'Oficina principal Inteligo'
        } else if (this.props.datauser.branchOffice === '2') {
            branchOffice = 'Oficina Patio Panorama Surco'
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
            id: this.props.room.id,
            branchOffice: branchOffice
        };
  
      // reset form
      this.props.addRegister(objResgister)
    }

    addRegister = () => {
        // e.preventDefault();
        this.objResgister(this.state.objectFb.useChecked, 'Solo uso de sala')
        this.updateFormDafault();
        // e.currentTarget.reset();
        this.setState({
            checked: false
        })
        this.changeAvailable();
        this.props.showHideForm(this.props.room.id);
        this.setExecutiveForRoom(' ')
    };

    resetForm =(e) => {
        e.preventDefault();
        this.updateFormDafault();
        this.setState({
            checked: false
        })
    }

    roomToCash =(e) => {
        
        e.preventDefault();

        this.objResgister(this.state.objectFb.useChecked, 'Uso de sala y caja');
        this.setState({
            checked: false
        })
        this.changeAvailable();
        this.updateFormDafault();
        this.props.showHideForm(this.props.room.id);
        this.setExecutiveForRoom(' ')
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

    updateHourStart = (e, key) => {
        e.preventDefault();
        const hourStart = getCurrenHour()
        this.dbFormSala.update({
            hourStart
        });
        this.setTimeStartForRoom(hourStart)
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

    updateHourExecutive = () => {
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
        this.setExecutiveForRoom(selectedOption.value)
    }

    handleChange = (selectedOption) => {
        this.updateTeam(selectedOption)
      }

    useCashCheckbox=(e)=> {
        this.setState({
            checked: !this.state.checked
        },()=> {
                if(this.state.checked){ 
                    this.dbFormSala.update({
                        useChecked : true
                    });
                    const use = 'Uso de sala para caja'
                    this.updateUse(use)
                    this.changeRoomOnHold()
                }else if (this.state.checked === false){
                    this.dbFormSala.update({
                        useChecked : false
                    });
                    const use = 'Solo uso de sala'
                    this.updateUse(use)
                    this.changeOccupied()
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

    toggle=()=> {
        this.setState({
          modal: !this.state.modal,
          close: !this.state.close
        },
        );
    }

    componentDidMount() {
        console.log(this.props);
        
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
            <div className={`form-container ${showform} py-4 px-5 bg-white mb-3`}>
                <div className={`${divTrash} button-trash`}>
                        <button type='reset' className='btn' onClick={(e)=>{this.resetForm(e); this.changeToBeConfirmed(e);this.setExecutiveForRoom(' ')}}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>            
                <div className='text-center mt-4'>
                    <span class='title-form-room'>{this.props.room.title}</span>
                </div>
                <div className='text-center'>
                    <span class='title-form-state'>{this.props.room.state}</span>
                </div>
                <hr className='m-0 mb-4'/>
                <form id={this.props.room.key}>
                <div>               
                    <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={this.state.modal} className={`${this.props.className} modal-room-to-form`}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody className='text-center question-modal'>
                        {/* <Button onClick={()=>this.toggle()}>Cerrar</Button> */}
                        <span>¿El cliente pasará de </span><b>{this.props.room.title}</b> <span>a </span><b>CAJA </b>
                        <select class="custom-select d-inline w-auto">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        <span> ?</span>                        
                    </ModalBody>
                    <ModalFooter className='modal-buttons'>
                        <button className='btn' onClick={(e)=>{this.toggle(e);this.roomToCash(e)}}>Confirmar</button>
                        <Button className='btn' onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                    </Modal>
                </div>
                {/* inputs hidden */}
                    <input type="hidden" className="form-control" placeholder="" ref={this.room}/>
                    <input type="hidden" className="form-control" placeholder="" ref={this.area}/>
                    <input type="hidden" className="form-control" placeholder="" ref={this.floor}/>

                    <div className="form-group">
                    
                    <div className={`${buttonPlay}`}>
                        <span>Ingreso del cliente</span>
                        <button className='ml-2 btn button-play' onClick={(e) => {this.updateHourStart(e); this.updateCollaborator(e); this.updateDate(e); this.changeOccupied(e); this.showHourHidePlay(this.state.objectFb.divs)}}><i class="fa fa-play" aria-hidden="true"></i></button>
                    </div>
                    <div className={`${divHourStart}`}>
                        <span>Ingreso del cliente</span>
                        <span className='ml-2 start-hour-user'>{this.state.objectFb.hourStart}</span>
                        <input type="text" className="d-none" placeholder="hora de atención" ref={this.startTime} defaultValue={this.state.objectFb.hourStart}/>
                    </div>  
                    </div>
                    <div className="form-group">
                        <input type="text" className="d-none" placeholder="" ref={this.responsableRegistry} defaultValue={this.state.objectFb.collaborator}/>

                    </div>
                    <div className="form-group">
                        <input type="text" className="d-none" placeholder="" ref={this.branchOffice} defaultValue={this.props.datauser.branchOffice}/>

                    </div>
                    <div className="form-group">
                        <input type="text" className="d-none" placeholder="" ref={this.date}  defaultValue={this.state.objectFb.date}/>
                    </div>
                    <div className="form-group row">
                        <label className='col-3'>Persona</label>
                        <Select
                            ref={this.person}
                            value={this.state.objectFb.person}
                            onChange={(e)=> this.selectPerson(e)}
                            options={this.props.optionPerson}
                            key={this.props.optionPerson.value}
                            className='col-9'
                        />
                    </div>
                    <div className="form-group row">
                        <label className='col-3'>Equipo</label>
                        <Select
                            value={this.state.objectFb.team}
                            onChange={this.handleChange}
                            options={this.props.optionTeam}
                            className='col-9'
                        />
                    </div>
                    <div className="form-group row">
                        <label className='col-3'>Cita</label><br/>
                        <div className='col-9 pl-5'>
                            <input className="form-check-input" type="radio" name="exampleRadios" onClick={(e) => this.apoinmentCheckbox(e)} value='si' checked={this.state.objectFb.appoinmentBooleanY}/>
                            <span className='ml-1'>si</span>
                            <input className="form-check-input ml-4" type="radio" name="exampleRadios" onClick={(e) => this.apoinmentCheckbox(e)}  value="no" checked={this.state.objectFb.appoinmentBooleanN} />
                            <span className='ml-5'>No</span>
                        </div>
                        <input type="text"  className="form-control d-none" placeholder="" ref={this.appointment} defaultValue={this.state.objectFb.appoinment}/>
                    </div>                    
                    <div className="form-group">
                        <label>Comentario</label>
                        <input className="form-control h-commentary" rows="3" ref={this.commentary} onKeyUp={()=> this.updateComment(this.commentary.current.value)}
                        defaultValue={this.state.objectFb.comment}/>
                    </div>
                    <div className="form-group">
                        <input className="ml-1 form-check-input" type="checkbox" checked={this.state.objectFb.useChecked} onChange={(e)=>this.useCashCheckbox(e)}/>
                        <label className="ml-4 form-check-label">
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
                        <div className='d-flex justify-content-around buttons-form'>
                            <div className={`${buttonExecutive} btn`} onClick={() => {this.updateHourExecutive(); this.hideButtonExecutive(this.state.objectFb.divs)}}>
                                <p><i class="fa fa-user-o" aria-hidden="true"></i></p>
                                <p>ejecutivo</p>
                            </div>
                            <div onClick={()=>this.toggle()} className='btn'>
                                <p><i class="fa fa-dashcube" aria-hidden="true"></i></p>
                                <p>Caja</p>    
                            </div>
                            <div onClick={()=>this.addRegister()} className='btn'>
                                <p><i class="fa fa-sign-out" aria-hidden="true"></i></p>  
                                <p>Salida</p>    
                            </div>
                        </div>                                     
                    </div>                    
                </form>
            </div>
         );
    }
}

export default RoomForm;

