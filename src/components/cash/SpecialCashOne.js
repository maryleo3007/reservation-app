import React,{Component} from 'react';
import {getHour} from './../helpers/date.js';
import './cashComponent.css';

class SpecialCashOne extends Component {

    state = {
        clientAttented : true
    }
    updateHourAttention = () => {
        
        const hourAttention = getHour();
        this.props.updateHrAtCashForm(this.props.currentObjFormCash.key,hourAttention);
        this.setState({clientAttented:false})
    }
    updateClearCashForm = () => {
        const hourEndAttention = getHour();   
        const {comments, date, hourAttention, hourInit, team} = this.props.currentObjFormCash;

        let obj = {
            indicator : "solo caja",
            date: date,
            cash: this.props.currentObjCashRoom.title,
            hourInit: hourInit,
            hourAttention: hourAttention,
            hourEnd: hourEndAttention,
            team:team,
            comment:comments
        }
        this.props.addRegisterCash(obj);
        this.props.changeCashState(this.props.currentObjCashRoom.key);
        this.setState({clientAttented:true});
        this.props.updateClearCashForm(this.props.currentObjFormCash.key);
    }

    render() {
        if(this.props.currentObjCashRoom === undefined ) return null;

        let currentObjCashRoom =  {};
        let clientAttented = this.state.clientAttented;
        let clientAproaching = false;
        if (Object.keys(this.props.currentObjCashRoom).length !== 0 && this.props.currentObjCashRoom !== undefined) {
            currentObjCashRoom = this.props.currentObjCashRoom
            if (currentObjCashRoom.state === 'Ocupado') {
                clientAproaching = true
            }
        }
        
        return (
            <div className="content-specialCash px-5 py-3">
                <div className="container">
                    <div className="row mx-5 mt-4 h-90">
                        <div className="col-8 col-sm-8 col-md-8 bg-title title-wait-clients h-25 rounded-top">
                            <div className="text-center">Clientes en espera</div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 bg-white rounded-bottom rounded-left  content-wait-clients h-75">
                            <div className="d-flex h-100">
                                <div className="justify-content-center align-self-center mx-auto title-form">4 clientes</div>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-5 mt-4 h-90">
                        <div className="col-8 col-sm-8 col-md-8 bg-title title-special-cash h-25 rounded-top">
                            <div className="text-center">Caja especial</div>
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
                            <div className="d-flex h-100">
                                <div className="justify-content-center align-self-center mx-auto title-form">
                                    <span className="box-available rounded-circle px-3 mr-3 myState-cash"></span> <span>Disponible</span>
                                </div>
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
        );
    }
}
export default SpecialCashOne;