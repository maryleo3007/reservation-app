import React, { Component } from 'react';
import {getDateFull, getHour} from '../../../helpers/date.js';
import {ref} from './../../../../services/firebase';
import Select from 'react-select';

class CashFormPP extends Component {

    state = {
        cashFormObj: {}
    }

    teamRef= React.createRef();
    commentsRef = React.createRef();
    
    customerIncome = () => {
        const objCash = {
            date: getDateFull(),
            hourInit: getHour()
        }
        console.log(getDateFull());
        console.log(getHour());
        this.props.changeCashState(this.props.cash.key,'Ocupado');
        this.props.updateDtHrInitCashForm(this.props.cash.formCash_id,objCash);
        this.props.updateIndicatorCash(this.props.cash.formCash_id,'Sólo caja')
        // this.props.changeCashComponent(this.props.cash.key,true);
    }
    
    updateComements = (e) => {
        ref.child(`FormCajaPP/${this.props.cash.formCash_id}`).update({
            comments : e.target.value
        });
    }
    //limpia el formulario de caja
    resetFormCash = (e) => {
        e.preventDefault();
        const objCash = {
            date:'',
            hourInit: ''
        }
        const objTeam = {
            label : '',
            value: ''
        }
        this.updateTeam(objTeam);
        this.props.updateCommentsCash(this.props.cash.formCash_id, '');
        this.props.updateDtHrInitCashForm(this.props.cash.formCash_id, objCash);
        this.props.changeCashState(this.props.cash.key,'Por confirmar');
    }

    handleChange = (selectedOption) => {
        this.updateTeam(selectedOption)
    }

    updateTeam = (team) => {
        ref.child(`FormCajaPP/${this.props.cash.formCash_id}`).update({
            team : {
                value: team.value,
                label: team.value
            }
        })
    }

    componentDidMount () {
        ref.child(`FormCajaPP/${this.props.cash.formCash_id}`).on('value', snap => {
            let cashFormObj = {
                team: snap.val().team,
                comments: snap.val().comments
            }
            this.setState({
                cashFormObj
            })
        }) 
    }

    render() {

        if(this.props.formCash === undefined) return null; 
        const formCash = this.props.formCash;
        
        if(formCash === undefined) return null; 
        const cash = this.props.cash;
        let showCustomerIncome = true; let showClass = '';
        
        if (cash.state === 'Disponible') {
            this.props.showHideFormArr[cash.order].showRoom = false;
        }
        if (cash.state === 'Disponible' || cash.state === 'Por confirmar') {
            showCustomerIncome = true;
        } else if(cash.state === 'Ocupado'){
            showCustomerIncome = false;
        }

        
        this.props.showHideFormArr[cash.order].showRoom ? showClass = 'd-block form-cash mb-3 bg-white' : showClass = ' d-none'

        return (
            <div>{cash.state === 'Disponible' ? (''):
                    (<div className={showClass}>
                        {showCustomerIncome?'':<button onClick={this.resetFormCash} className="btn-trash-form"><i className="fa fa-trash" aria-hidden="true"></i></button>}
                        <div>
                            <div className="text-center title-form">{cash.title}</div>
                            <div className="text-center state-form">{cash.state }</div>
                            <hr/>
                        </div>
                        {showCustomerIncome?
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label">Ingreso de cliente</label>
                                <div className="col-sm-7">
                                    <button className="btn-play" onClick={this.customerIncome}><i aria-hidden="true" className="fa fa-caret-right"></i></button>
                                </div>
                            </div> :
                            <div>
                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">Pedido de caja</label>
                                    <div className="col-sm-7 title-form">
                                        <label>{formCash.hourInit}</label>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">Atención en caja</label>
                                    <div className="col-sm-7 title-form">
                                        <label>{formCash.hourAttention}</label>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label">Equipo</label>
                            <div className="col-sm-7">
                                <Select
                                    value = { this.state.cashFormObj.team }
                                    onChange={this.handleChange}
                                    options={this.props.optionTeam}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label">Comentarios</label>
                            <div className="col-sm-12">
                            <textarea className="form-control" rows="3" defaultValue={this.state.cashFormObj.comments} ref={this.commentsRef} onKeyUp={this.updateComements}></textarea>
                            </div>
                        </div>
                    </div>
                    )
                }</div>
        );
    }
}

export default CashFormPP;