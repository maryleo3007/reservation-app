import React,{Component} from 'react';

class CashForm extends Component {
    state = { 
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

    render() {
        return (
            <div>
                <div>
                    <span>{this.props.cash.title}</span>
                </div>
                <form onSubmit={this.addCashRegister}>
                    <input type="hidden"  ref={this.orderTime}/>
                    <input type="hidden"  ref={this.attentionTime}/>
                    <input type="hidden"  ref={this.outTime}/>
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Pedido de caja</label>
                        <div className="col-sm-7">
                            <input type="text" readOnly className="form-control-plaintext"  value="9:41:45"/>
                        </div>
                    </div>
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
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        );
    }
}

export default CashForm