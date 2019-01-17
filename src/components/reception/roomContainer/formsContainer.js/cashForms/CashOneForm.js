import React,{Component} from 'react';
import {getDateFull, getHour} from '../../../../helpers/date.js';
import {changeTitleState} from '../../../../helpers/receptionHelper.js';

class CashOneForm extends Component {

    state = { 
        customerIncome: false
    }
    teamRef= React.createRef();
    commentsRef = React.createRef();

    customerIncome = () => {
        const objCash = {
            date: getDateFull(),
            hourInit: getHour()
        }
        this.setState({customerIncome: true})
        this.props.changeCashState((this.props.cash)[0].key,3)
        this.props.updateDtHrInitCashForm((this.props.cash)[0].uidCash,objCash);
    }

    updateTeam = (e) =>{
        e.preventDefault();
        this.props.updateTeamCash('-LWRAmCghpfW7PXIv7_P',this.teamRef.current.value)
    }
    updateComements = (e) => {
        e.preventDefault();
        this.props.updateCommentsCash('-LWRAmCghpfW7PXIv7_P', this.commentsRef.current.value)
    }
    
    render() {
        // {appointment,fromRoom,hourAttention,hourEnd,hourInit} = (this.props.formCash)[0]
        const formCash = (this.props.formCash)[0]
        const cash = (this.props.cash)[0];
        const showCustomerIncome = this.state.customerIncome;
        const showState = changeTitleState(cash.state)
        return (
            <div>
                <div className="form-cash">
                    <div>
                        <div className="text-center title-form">{cash.title}</div>
                        <div className="text-center state-form">{showState }</div>
                        <hr/>
                    </div>
                    {
                        !showCustomerIncome ?
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
                                <div className="col-sm-7">
                                <label>{formCash.hourAttention}</label>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Equipo</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" ref={this.teamRef} onKeyUp={this.updateTeam}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Comentarios</label>
                        <div className="col-sm-12">
                        <textarea className="form-control" rows="3" ref={this.commentsRef} onKeyUp={this.updateComements}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CashOneForm