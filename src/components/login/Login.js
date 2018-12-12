import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {
    gotoComponet = (component) => {
        if(component === 'recepcion') {
            return '/'+ component
        } else if (component === 'caja') {
            return '/'+ component
        } else if (component === 'menu') {
            return '/'+ component
        } else if (component === 'administradora') {
            return '/'+ component
        }
    }
    render() { 
        return ( 
           
            <div>
                <p>Login component</p>
                <Link to={this.gotoComponet('administradora')}>Ir a cash</Link>
            </div>

         );
    }
}
 
export default Login;