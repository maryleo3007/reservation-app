import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'

class Waiter extends Component {
    render() { 
        return ( 
            <div>
                componente mozo
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
 
export default Waiter;