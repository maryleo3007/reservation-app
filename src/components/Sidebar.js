import React,{Component} from 'react';

//components sidebar
import SidebarLg from './Sidebar-lg';
import SidebarSm from './Sidebar-sm';

class Sidebar extends Component {
    state = {
        sidebarState : true,
        reception : true,
        register : false
    }
    changeSidebar = (change) => {
        this.state.sidebarState ? 
        this.setState({sidebarState : change}) :  this.setState({sidebarState : change})  
    }
    changeReception = () => {
        this.props.changeComponent(this.state.reception)
    }
    changeRegister = () => {
        this.props.changeComponent(this.state.register)
    }
   
    render() {
        const showNav = this.state.sidebarState;
        return (
            <div>
                {showNav ? 
                    <SidebarLg 
                        changeSidebar = {this.changeSidebar}
                        changeReception = {this.changeReception}
                        changeRegister = {this.changeRegister}
                    /> : 
                    <SidebarSm
                        changeSidebar = {this.changeSidebar}
                        changeComponent = {this.changeComponent}
                        changeRegister = {this.changeRegister}
                    />
                }
            </div>
        );
    }
}

export default Sidebar