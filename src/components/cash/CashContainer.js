import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase';
import SpecialCashOne from './SpecialCashOne.js';

class Cash extends Component {
    render() { 
        return ( 
            <div className="bg-main">
                <SpecialCashOne />
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