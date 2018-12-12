import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {
    gotoComponet = (component) => {
        console.log(component);
        
        if(component) {
            if(component === 'recepcion') {
                return '/'+ component
            } else if (component === 'caja') {
                return '/'+ component
            } else if (component === 'menu') {
                return '/'+ component
            } else if (component === 'administradora') {
                return '/'+ component
            }
        } else if (component === undefined){
           return '/'
        } 
         
    }
    render() { 
        return ( 
           
            <div>
                <p>Login component</p>
                <Link to={this.gotoComponet()}>Ir a cash</Link>
            </div>

         );
    }
}
 
export default Login;