import React,{Component} from 'react';

//components sidebar
import SidebarLg from './Sidebar-lg';
import SidebarSm from './Sidebar-sm';

class Sidebar extends Component {
    state = {
        sidebarState : true,
        reception : 'rooms',
        registerRooms : 'registerRooms',
        registerCash: 'registerCash'
    }

    // show and hide sidebar
    changeSidebar = (change) => {
        this.state.sidebarState ? 
        this.setState({sidebarState : change}) :  this.setState({sidebarState : change})  
    }


    changeReception = () => {
        this.props.changeComponent(this.state.reception)
    }

    changeRegisterRooms = () => {
        this.props.changeComponent(this.state.registerRooms)
    }

    changeRegisterCash = () => {
        this.props.changeComponent(this.state.registerCash)
    }
   
    render() {
        const showNav = this.state.sidebarState;
        return (
            <div className="sidebar-content">
                {showNav ? 
                    <SidebarLg 
                        changeSidebar = {this.changeSidebar}
                        changeReception = {this.changeReception}
                        changeRegisterRooms = {this.changeRegisterRooms}
                        changeRegisterCash = {this.changeRegisterCash}
                        userImage = {this.props.userImage}
                        userData = {this.props.userData}
                        userName = {this.props.userName}
                        logOut = {this.props.logOut}
                    /> : 
                    <SidebarSm
                        changeSidebar = {this.changeSidebar}
                        changeReception = {this.changeReception}
                        changeRegisterRooms = {this.changeRegisterRooms}
                        changeRegisterCash = {this.changeRegisterCash}
                        logOut = {this.props.logOut}
                    />
                }
            </div>
        );
    }
}

export default Sidebar