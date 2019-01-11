import React,{Component} from 'react';

//components sidebar
import SidebarLg from './Sidebar-lg';
import SidebarSm from './Sidebar-sm';

class Sidebar extends Component {
    state = {
        reception : 'rooms',
        registerRooms : 'registerRooms',
        registerCash: 'registerCash',
        classSidebar: {
            activeClassRooms: true,
            activeClassRegisterRooms : false,
            activeClassRegisterCash : false,
        }
    }

    changeReception = () => {
        this.props.changeComponent(this.state.reception)
        this.setState({
            classSidebar: {
                activeClassRooms:true, 
                activeClassRegisterRooms:false, 
                activeClassRegisterCash:false
            }
        })
    }

    changeRegisterRooms = () => {
        this.props.changeComponent(this.state.registerRooms)
        this.setState({
            classSidebar: {
                activeClassRooms:false, 
                activeClassRegisterRooms:true, 
                activeClassRegisterCash:false
            }
        })
    }

    changeRegisterCash = () => {
        this.props.changeComponent(this.state.registerCash)
        this.setState({
            classSidebar: {
                activeClassRooms:false, 
                activeClassRegisterRooms:false, 
                activeClassRegisterCash:true
            }
        })
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
                        classSidebar = {this.state.classSidebar}
                    /> : 
                    <SidebarSm
                        changeSidebar = {this.props.changeSidebar}
                        changeReception = {this.changeReception}
                        changeRegisterRooms = {this.changeRegisterRooms}
                        changeRegisterCash = {this.changeRegisterCash}
                        logOut = {this.props.logOut}
                        classSidebar = {this.state.classSidebar}
                    />
                }
            </div>
        );
    }
}

export default Sidebar