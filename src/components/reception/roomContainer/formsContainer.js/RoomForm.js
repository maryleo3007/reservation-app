import React, { Component } from 'react';
class RoomForm extends Component {

    state = { 
        roomState : {
            title: this.props.room.title,
            state: this.props.room.state,
            time: this.props.room.time,
            executive: this.props.room.executive,
            key: this.props.room.key,
        },  
        available: 'disponible',
        probable: 'probable',
        unavailable: 'ocupado'
    }

    changeAvailable = (e) => {
        e.preventDefault();
        this.props.changeState(this.state.roomState.key, this.state.available)            
    }

    changeProbable = (e) => {
        e.preventDefault();
        this.props.changeState(this.state.roomState.key, this.state.probable)            
    }

    changeUnavailable = (e) => {
        e.preventDefault();
        this.props.changeState(this.state.roomState.key, this.state.unavailable)            
    }
    render() { 
        return ( 
            <div>
                <div>
                    <span><b>Formulario :</b> {this.state.roomState.title} </span>
                    <button onClick={this.changeAvailable}>Disponible</button>
                    <button onClick={this.changeProbable}>Probable</button>
                    <button onClick={this.changeUnavailable}>Ocupado</button>
                    <button>Hora</button>
                    <button>Ejecutivo</button> 
                </div>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
         );
    }
}
 
export default RoomForm;
