import React, { Component } from 'react';
import { login, resetPassword } from './../helpers/authFirebase'
import {ref} from './../../services/firebase';

import Offices from './../office/Offices';

  function setErrorMsg(error) {
      return {
          loginMessage: error
      }
  }

  export default class Login extends Component {
    
    state = { 
      loginMessage: null,
      offices: '',
      officeValue: ''
    }

    dbOffices = ref.child('/BranchOffice');
  
    // funcion de logueo
    handleSubmit = (e) => {
      e.preventDefault()
      login(this.email.value, this.pw.value)
        .then( (param) => {
          console.log('hola')
          // ref.child(`users/${param.user.uid}/info`).update({branchOffice : this.state.officeValue});
        })
        .catch((error) => {   
        this.setState(setErrorMsg('Invalid username/password.'))
        })
    }
  
    // funcion para reestablecer contraseña
    resetPassword = () => {
      resetPassword(this.email.value)
        .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
        .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
    }

    getOffice = e => {
      const {name, value} = e.target;
      this.setState({[name]:value});
    }

    getOffices = () => {
      this.dbOffices.on('value', snap => {
        if(snap.val() !== null)  {
            this.setState({
              offices : snap.val()
            })
        }
      });
    }

    componentDidMount(){
      this.getOffices();
    }

    render () {
      
      return (
        <div className="d-flex container-login">
          <div className="row justify-content-center align-self-center mx-auto bg-white">
            <h2 className="w-100 text-center text-secondary mt-5"> Login </h2>
            <hr className="w-75 my-4"/>
            <form id="form-login"  onSubmit={this.handleSubmit}>
                <div className="container-fluid">
                  <div className="row mb-4">
                    <div className="col-2">
                      <i aria-hidden="true" className="fa fa-user-o"></i>
                    </div>
                    <div className="col-10">
                      <div className="form-group"> 
                        <input type="text" required="required" ref={(email) => this.email = email}/>
                        <label htmlFor="input" className="control-label">Email</label><i className="bar"></i>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-2">
                      <i aria-hidden="true" className="fa fa-unlock-alt"></i>
                    </div>
                    <div className="col-10">
                      <div className="form-group">
                        <input type="password" required="required" ref={(pw) => this.pw = pw}/>
                        <label htmlFor="input" className="control-label">Password</label><i className="bar"></i>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-2"><i aria-hidden="true" className="fa fa fa-dot-circle-o"></i></div>
                    <div className="col-10">
                      <div className="form-group">
                        <select name="officeValue" className="form-control" onChange={this.getOffice}>
                            <option value="">Elije tu departamento</option>
                            {Object.keys(this.state.offices).map(key => (
                                <Offices key={key} office = {this.state.offices[key]} />
                            ))}
                        </select>
                        <label htmlFor="select" className="control-label">Sede</label><i className="bar"></i>
                      </div>
                    </div>
                  </div>
                </div>
                {
                  this.state.loginMessage &&
                  <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span className="">Nombre o contraseña incorrecto</span>
                  </div>
                }
                <button type="submit" className="btn btn-primary w-100 my-3">Ingresar</button>
             
          </form>
          </div>
        </div>  
      )
    }
  }