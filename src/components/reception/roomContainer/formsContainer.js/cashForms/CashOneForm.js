import React,{Component} from 'react';
import {getDateFull, getHour} from '../../../../helpers/date.js';

class CashOneForm extends Component {

    state = { 
        customerIncome: false,
        cashOrderTime: '',
        available: 'disponible',
        busy: 'ocupado',
        unavailable: 'no_disponible',
    }
    checkInTime = React.createRef();
    attentionTime = React.createRef();
    date = React.createRef(); 
    finalTime = React.createRef(); 

    addCashRegister = e => {
        e.preventDefault();
        const objResgister = {
            // checkInTime: si viene de sala o si viene directo a caja
            attentionTime: this.attentionTime.current.value,
            date: this.date.current.value, 
            finalTime: this.finalTime.current.value,
            // orderTime:  
            // attentionTime: 
            // outTime: 
        };

      this.props.addCashRegister(objResgister)
      
      e.currentTarget.reset();
    };

    customerIncome = () => {
        this.setState({
            customerIncome: true,
            cashOrderTime: `${getDateFull()}-${getHour()}`
        })
    }
    
    render() {
        const cash = (this.props.cash)[0];
        const showCustomerIncome = this.state.customerIncome;
        const cashOrderHour = (this.state.cashOrderTime).substr(11);
        return (
            
            <div>
                <div onSubmit={this.addCashRegister} className="form-cash">
                    <div>
                        <div className="text-center title-form">{cash.title}</div>
                        <div className="text-center state-form">{cash.state }</div>
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
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label">Pedido de caja</label>
                            <div className="col-sm-7 title-form">
                                <label>{cashOrderHour}</label>
                            </div>
                        </div>
                    }
                    
                    
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Atención en caja</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" ref={this.attentionTime}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Salida de caja</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" ref={this.date}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Hora final</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" ref={this.finalTime}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CashOneForm