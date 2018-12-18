import React, { Component } from 'react';

//components
import RegisterContainer from './registerContainer/RegisterContainer';
import Sidebar from './../Sidebar';

class Admin extends Component {
    render() { 
        return ( 
            <div className="admin-content">
                <Sidebar />
                <RegisterContainer />
            </div> 
         );
    }
}
 
export default Admin;