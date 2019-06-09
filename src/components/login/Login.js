import React, { Component } from 'react';
import { login,logout, resetPassword } from './../helpers/authFirebase'

function setErrorMsg(error) {
    return {
        loginMessage: error
    }
}

  export default class Login extends Component {
    state = { 
      loginMessage: null,
    }
  
    // funcion de logueo
    handleSubmit = (e) => {
      e.preventDefault()
      login(this.email.value, this.pw.value)
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
    render () {
      return (
        <div className="contaiener-fluid">
          <div className="col-6">hola</div>
          <div className="col-6">
            <h1> Login </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
              </div>
              {
                this.state.loginMessage &&
                <div className="alert alert-danger" role="alert">
                  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  <span className="">Nombre o contraseña incorrecto</span>
                </div>
              }
              <button type="submit" className="btn btn-primary">Login</button>
              <button
                  style={{border: 'none', background: 'transparent'}}
                  onClick={() => {
                      logout()
                  }}
                  className="navbar-brand">Logout</button>
            </form>
          </div> 
        </div>
        
      )
    }
  }