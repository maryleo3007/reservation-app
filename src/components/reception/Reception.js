import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'

class Reception extends Component {

    logOut = (e) => {
        e.preventDefault()
        logout()
      }
      render () {
        return (
          <div>
            <p>recepcion</p>
            
            <button
              style={{border: 'none', background: 'transparent'}}
              onClick={this.logOut}
              className="navbar-brand">Logout</button>
          </div>
          
        )
      }
}
 
export default Reception;