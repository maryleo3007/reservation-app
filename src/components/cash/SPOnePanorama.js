import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase';
import {ref} from './../../services/firebase';
import { getHour, getDateFull } from './../helpers/date.js';
import { changeNameBranchOffice} from './../helpers/receptionHelper';
import './cashComponent.css';

class SPOnePanorama extends Component {
    state={
        userName: '',
        client: {},
        currentObjSpecialCash: {},
        currentObjCashRoom: {},
        currentObjFormCash:{},
        clientAttented : true,
        stateValue : '',
        availableClass : '',
        getHourReg : false,
        hourStartSC : ''
    }
        
    dbFormCash = ref.child('FormCajaPP/-LWRAmCghpfW7PXIv7_P');
    dbCashRoom = ref.child('CashRoomPP/-lajsdiwoj2');
    dbSpecialCash = ref.child('SpecialCashPP/-LAOP22KASD-adSD1');
    dbClients =  ref.child('ClientsPP/')
    refRegister = ref.child('CashRegister')
    //actualizar hora de atención del form de caja
    updateHrAtCashForm = (hourAttention) => {
        this.dbFormCash.update({
            hourAttention: hourAttention
        })
    }
    //actualizar hora final de atención del form de caja
    clearCashForm = () => {
        const teamObj = {
            label: '',
            value: ''
        }
        this.dbFormCash.update({
            appointment: "",
            date:"",
            fromRoom:"",
            hourInit:"00:00:00",
            hourEnd: "",
            hourAttention:"00:00:00",
            team:teamObj,
            comments:""
        })
    }
    //agregar registro de caja
    addRegisterCash = (obj) => {
        const addRegister = this.refRegister.push({
            indicator : obj.indicator,
            date: obj.date,
            cash: obj.cash,
            hourInit: obj.hourInit,
            hourAttention: obj.hourAttention,
            hourEnd: obj.hourEnd,
            team:obj.team,
            comment:obj.comment,
            branchOffice: obj.branchOffice
        })
        const newRegister = addRegister.key;
        this.refRegister.child(newRegister).update({
            id: newRegister
        })
    }
    //cambia estado de caja
    changeCashStateAvailable = () => {
        this.dbCashRoom.update({
            state: 'Disponible',
            showComponent: true
        });
    }
    //cambia a estado de caja a ausente
    changeStateCash = (state) => {
        this.dbCashRoom.update({
            state
        });
    }
    //cambia estado de caja especial
    changeStateSpecialCash = (state) => {
        this.dbSpecialCash.update({
            state
        });
    }

    addRegisterSpecialCash = (obj) => {
        const refRegister = ref.child('CashSpecialRegister/');
        const addRegister = refRegister.push({
            name : obj.name,
            state: obj.state,
            hourInit: obj.hourInit,
            hourEnd: obj.hourEnd,
            branchOffice: obj.branchOffice,
            date: obj.date
        })
        const newRegister = addRegister.key;
        refRegister.child(newRegister).update({
            id: newRegister
        })
    }

    componentDidMount(){
        this.dbFormCash.on('value',snap => {
            this.setState({currentObjFormCash:snap.val()})
        });

        this.dbCashRoom.on('value', snap => {
            this.setState({currentObjCashRoom:snap.val()})
        });

        this.dbSpecialCash.on('value', snap => {
            this.setState({currentObjSpecialCash: snap.val()})
        });

        this.dbClients.on('value', snap => {
            this.setState({client: snap.val()})
        });
    }

    /*funciones de caja especial*/
    updateHourAttention = () => {
        const hourAttention = getHour();
        this.updateHrAtCashForm(hourAttention);
        this.setState({clientAttented:false})
    }
    updateClearCashForm =() =>{
        
        const hourEndAttention = getHour();   
        const {comments, date, hourAttention, hourInit, team, appointment} = this.state.currentObjFormCash;
        
        let branchOfficeName = changeNameBranchOffice(this.props.data.branchOffice);

        let obj = {
            indicator : appointment,
            date: date,
            cash: this.state.currentObjCashRoom.title,
            hourInit: hourInit,
            hourAttention: hourAttention,
            hourEnd: hourEndAttention,
            team:team.value,
            comment:comments,
            branchOffice: branchOfficeName
        }
        this.addRegisterCash(obj);
        this.changeCashStateAvailable();
        this.setState({clientAttented:true});
        this.clearCashForm();
        // this.props.updateNumOfClients();
    }
    getStateSpecialCash = (e) => {
        
        // let dataVal= e.target.options[e.target.selectedIndex].dataset
        let value = e.target.value;
        if(value === 'No disponible'){
            this.setState({getHourReg : true, hourStartSC: getHour()})
        }

        if(this.state.getHourReg && value === 'Disponible'){
            this.setState({getHourReg : false, hourEndSC: getHour()})
            let objSpecialCash = {
                name : this.state.currentObjCashRoom.title,
                state: 'No disponible',
                hourInit: this.state.hourStartSC,
                hourEnd: getHour(),
                branchOffice: changeNameBranchOffice(this.props.data.branchOffice),
                date: getDateFull()
            }
            this.addRegisterSpecialCash(objSpecialCash);
        }
        
        this.changeStateSpecialCash(value);
       
        (this.state.currentObjCashRoom.state === 'Disponible' || this.state.currentObjCashRoom.state === 'No disponible') ? 
            this.changeStateCash(value):
            alert('no puede cambiar de estado cuando la caja esta en ocupado o por confirmar')
    
    }

    render() { 
        console.log('render caja 1 panorama');
        
          
        if(this.state.currentObjSpecialCash === undefined || this.state.currentObjCashRoom === undefined  || this.state.currentObjFormCash === undefined) return null;
        let clientAttented = this.state.clientAttented; let clientAproaching = false; let selectDisabled = true;
        let numberOfClients = this.state.client.numberOfClients;
        
        if (this.state.currentObjCashRoom.state === 'Ocupado') {
            clientAproaching = true;
        }
        if (this.state.currentObjCashRoom.state === 'Disponible' || this.state.currentObjCashRoom.state === 'No disponible') {
            selectDisabled = false;
        } 
        let branchOfficeName = changeNameBranchOffice(this.props.data.branchOffice);
        return ( 
            <div className="bg-main">
                <div> 
                <div className="content-specialCash px-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="text-muted text-center">{branchOfficeName}</div>
                            <div className="container">
                                <div className="row mt-4 h-90">
                                    <div className="col-8 col-sm-8 col-md-8 bg-title title-wait-clients h-25 rounded-top">
                                        <div className="text-center">Clientes en espera</div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 bg-white rounded-bottom rounded-left  content-wait-clients h-75">
                                        <div className="d-flex h-100">
                                            <div className="justify-content-center align-self-center mx-auto title-form">{numberOfClients} clientes</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4 h-90">
                                    <div className="col-8 col-sm-8 col-md-8 bg-title title-special-cash h-25 rounded-top">
                                        <div className="text-center">Caja especial </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 bg-white rounded-bottom rounded-left content-special-cash h-75">
                                        <div className="d-flex h-100">
                                            <div className="justify-content-center align-self-center mx-auto title-form">
                                                {this.props.data.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4 h-90">
                        <div className="col-8 col-sm-8 col-md-8 bg-title title-state-cash h-25 rounded-top">
                            <div className="text-center">Mi estado</div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 bg-white rounded-bottom rounded-left content-state-cash  h-75">
                            <div className="d-flex justify-content-center mt-4">
                                <span className={`${this.state.currentObjSpecialCash.state === 'Disponible' ? 'box-available' : 'box-unAvailable'} rounded-circle pr-3 mr-3 myState-cash`}></span>
                                <select name="stateValue" className="d-inline-block title-form" onChange={this.getStateSpecialCash} disabled={selectDisabled ? true : null} value={this.state.currentObjSpecialCash.state}>
                                    <option value="Disponible">Disponible</option>
                                    <option value="No disponible">No disponible</option>
                                </select>
                            </div>
                        </div>
                    </div>
                            </div>
                        </div>
                        <div className="col-6 box-attend">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 bg-white content-state-cash">
                                    <div className="d-flex h-100">
                                        {clientAproaching?
                                            <div className="justify-content-center align-self-center mx-auto title-form">
                                                {
                                                    clientAttented ?
                                                    <div className="text-center pt-3">
                                                        <p className="pt-4">Cliente se está aproximando</p>
                                                        <button className="btn-specialCash" onClick={this.updateHourAttention}>Iniciar Atención</button>
                                                        <audio ref="audio_tag" className='d-none' src="https://firebasestorage.googleapis.com/v0/b/recepcion-prod.appspot.com/o/SD_ALERT_29.mp3?alt=media&token=45fc466e-4aab-4898-8f9e-89ebc1f7d139" controls autoPlay/>
                                                    </div>:
                                                    <button className="btn-specialCash-out" onClick={this.updateClearCashForm}>Salida del cliente</button>
                                                }
                                            </div>:
                                            <div></div>
                                        }        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
            </div>    
                
                <button
                style={{border: 'none', background: 'transparent'}}
                onClick={() => {
                    logout()
                }}
                className="navbar-brand text-secondary"><i aria-hidden="true" className="fa fa-sign-out"></i>Salir</button>
            </div>
         );
    }
}
 
export default SPOnePanorama;