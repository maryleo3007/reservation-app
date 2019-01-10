import React,{Component} from 'react';

//components sidebar
import SidebarLg from './Sidebar-lg';
import SidebarSm from './Sidebar-sm';

class Sidebar extends Component {
    state = {
        reception : 'rooms',
        registerRooms : 'registerRooms',
        registerCash: 'registerCash'
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
        const showNav = this.props.sidebarState;
        return (
            <div className="sidebar-content">
                {showNav ? 
                    <SidebarLg 
                        changeSidebar = {this.props.changeSidebar}
                        changeReception = {this.changeReception}
                        changeRegisterRooms = {this.changeRegisterRooms}
                        changeRegisterCash = {this.changeRegisterCash}
                        userImage = {this.props.userImage}
                        userData = {this.props.userData}
                        userName = {this.props.userName}
                        logOut = {this.props.logOut}
                    /> : 
                    <SidebarSm
                        changeSidebar = {this.props.changeSidebar}
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