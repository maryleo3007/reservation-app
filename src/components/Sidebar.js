import React,{Component} from 'react';

//components sidebar
import SidebarLg from './Sidebar-lg';
import SidebarSm from './Sidebar-sm';

class Sidebar extends Component {
    state = {
        sidebarState : true
    }
    changeSidebar(){

    }
    render() {
        const showNav = this.state.sidebarState;
        return (
            <div>
                {showNav ? 
                    <SidebarLg 
                        sidebarState = {this.state}
                        changeSidebar = {this.changeSidebar}
                    /> : 
                    <SidebarSm
                        sidebarState = {this.state}
                        changeSidebar = {this.changeSidebar}
                    />
                }
            </div>
        );
    }
}

export default Sidebar