import React,{Component} from 'react';
import { getHour, getDateFull } from './../helpers/date.js';
import { changeNameBranchOffice} from './../helpers/receptionHelper';
import './cashComponent.css';

class SpecialCashOne extends Component {

    state = {
        clientAttented : true,
        stateValue : '',
        availableClass : '',
        getHourReg : false
    }
    
    updateHourAttention = () => {
        
        const hourAttention = getHour();
        this.props.updateHrAtCashForm(this.props.currentObjFormCash.key,hourAttention);
        this.setState({clientAttented:false})
    }

    updateClearCashForm = () => {
        
        const hourEndAttention = getHour();   
        const {comments, date, hourAttention, hourInit, team, appointment} = this.props.currentObjFormCash;
        
        let branchOfficeName = changeNameBranchOffice(this.props.data.branchOffice);

        let obj = {
            indicator : appointment,
            date: date,
            cash: this.props.currentObjCashRoom.title,
            hourInit: hourInit,
            hourAttention: hourAttention,
            hourEnd: hourEndAttention,
            team:team.value,
            comment:comments,
            branchOffice: branchOfficeName
        }

        this.props.addRegisterCash(obj);
        this.props.changeCashStateAvailable(this.props.currentObjCashRoom.key);
        this.setState({clientAttented:true});
        this.props.updateClearCashForm(this.props.currentObjFormCash.key);
        // this.props.updateNumOfClients();
    }

    getStateSpecialCash = (e) => {
        let hourStart = '';
        // let dataVal= e.target.options[e.target.selectedIndex].dataset
        let value = e.target.value;
        if(value === 'No disponible'){
            hourStart = getHour();
            this.setState({getHourReg : true})
        }

        if(this.state.getHourReg && value === 'Disponible'){
            console.log(value);
        }
        
        this.props.changeStateSpecialCash(this.props.currentObjSpecialCash.key, value);

        (this.props.currentObjCashRoom.state === 'Disponible' || this.props.currentObjCashRoom.state === 'No disponible') ? 
            this.props.changeStateCash(this.props.currentObjCashRoom.key, value):
            alert('no puede cambiar de estado cuando la caja esta en ocupado o por confirmar')
        
    }

    render() {

        if(this.props.currentObjCashRoom === undefined ) return null;
        if(this.props.currentObjSpecialCash === undefined ) return null;
        if(this.props.client.numberOfClients === undefined) return null;

        let currentObjCashRoom =  {}; let clientAttented = this.state.clientAttented; let clientAproaching = false; let selectDisabled = true;
        let numberOfClients = this.props.client.numberOfClients;

        if (Object.keys(this.props.currentObjCashRoom).length !== 0 && this.props.currentObjCashRoom !== undefined) {
            currentObjCashRoom = this.props.currentObjCashRoom
            if (currentObjCashRoom.state === 'Ocupado') {
                clientAproaching = true
            }
            if (currentObjCashRoom.state === 'Disponible' || currentObjCashRoom.state === 'No disponible') {
                selectDisabled = false;
            } 
        }

        let branchOfficeName = changeNameBranchOffice(this.props.data.branchOffice)

        return (
            <div>
                <small className="text-muted pl-3">{branchOfficeName}</small>
                <div className="content-specialCash px-5 py-3">
                <div className="container">
                    <div className="row mx-5 mt-4 h-90">
                        <div className="col-8 col-sm-8 col-md-8 bg-title title-wait-clients h-25 rounded-top">
                            <div className="text-center">Clientes en espera</div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 bg-white rounded-bottom rounded-left  content-wait-clients h-75">
                            <div className="d-flex h-100">
                                <div className="justify-content-center align-self-center mx-auto title-form">{numberOfClients} clientes</div>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-5 mt-4 h-90">
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
                    <div className="row mx-5 mt-4 h-90">
                        <div className="col-8 col-sm-8 col-md-8 bg-title title-state-cash h-25 rounded-top">
                            <div className="text-center">Mi estado</div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 bg-white rounded-bottom rounded-left content-state-cash  h-75">
                            <div className="d-flex justify-content-center mt-4">
                                <span className={`${this.props.currentObjSpecialCash.state === 'Disponible' ? 'box-available' : 'box-unAvailable'} rounded-circle pr-3 mr-3 myState-cash`}></span>
                                <select name="stateValue" className="d-inline-block title-form" onChange={this.getStateSpecialCash} disabled={selectDisabled ? true : null} value={this.props.currentObjSpecialCash.state}>
                                    <option value="Disponible">Disponible</option>
                                    <option value="No disponible">No disponible</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-5 mt-4 h-300">
                        <div className="col-12 col-sm-12 col-md-12 bg-white content-state-cash">
                        <div className="d-flex h-100">
                            {clientAproaching?
                                <div className="justify-content-center align-self-center mx-auto title-form">
                                    {
                                        clientAttented ?
                                        <div className="text-center">
                                            <p>Cliente se está aproximando</p>
                                            <button className="btn-specialCash" onClick={this.updateHourAttention}>Iniciar Atención</button>
                                        </div>:
                                        <button className="btn-specialCash" onClick={this.updateClearCashForm}>Salida del cliente</button>
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
        );
    }
}
export default SpecialCashOne;