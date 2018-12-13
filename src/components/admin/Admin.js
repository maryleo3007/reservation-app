import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'

class Admin extends Component {
    render() { 
        return ( 
            <div>
                <p>Administradora</p>
                
                <button
                style={{border: 'none', background: 'transparent'}}
                onClick={() => {
                    logout()
                }}
                className="navbar-brand">Logout</button>
            </div>
         );
    }
}
 
export default Admin;