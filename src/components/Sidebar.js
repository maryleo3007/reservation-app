import React,{Component} from 'react';

//components sidebar
import SidebarLg from './Sidebar-lg';
import SidebarSm from './Sidebar-sm';

class Sidebar extends Component {
    state = {
        sidebarState : true
    }
    changeSidebar(){
        console.log('holi')
    }
    render() {
        const showNav = this.state.sidebarState;
        return (
            <div>
                {showNav ? 
                    <SidebarLg 
                        changeSidebar = {this.changeSidebar}
                    /> : 
                    <SidebarSm
                        changeSidebar = {this.changeSidebar}
                    />
                }
            </div>
        );
    }
}

export default Sidebar