import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase'

class Cash extends Component {
    render() { 
        return ( 
            <div>Cash component

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
 
export default Cash;