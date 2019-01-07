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
            checkInTime: this.checkInTime.current.value,
            attentionTime: this.attentionTime.current.value,
            date: this.date.current.value, 
            finalTime: this.finalTime.current.value
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
                    <div className="form-group">
                        <label>Hora de llegada</label>
                        <input type="text" className="form-control" placeholder="hora de atención" ref={this.checkInTime}/>
                    </div>
                    <div className="form-group">
                        <label>Hora de atención</label>
                        <input type="text" className="form-control" placeholder="hora de atención" ref={this.attentionTime}/>
                    </div>
                    <div className="form-group">
                        <label>Fecha</label>
                        <input type="text" className="form-control" placeholder="" ref={this.date}/>
                    </div>
                    <div className="form-group">
                        <label>Hora final</label>
                        <input type="text" className="form-control" placeholder="" ref={this.finalTime}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        );
    }
}

export default CashForm