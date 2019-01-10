import React,{Component} from 'react';

class SidebarSm extends Component {
    state ={
        activeClassRooms: true,
        activeClassRegisterRooms : false,
        activeClassRegisterCash : false,
    }

    changeSidebar = () =>{
        const change = true
        this.props.changeSidebar(change);
    }
    changeReception = () =>{
        this.props.changeReception();
        this.setState({activeClassRooms:true, activeClassRegisterRooms:false, activeClassRegisterCash:false})
    }

    changeRegisterRooms = () =>{
        this.props.changeRegisterRooms();
        this.setState({activeClassRooms:false, activeClassRegisterRooms:true, activeClassRegisterCash:false})
    }

    changeRegisterCash = () =>{
        this.props.changeRegisterCash();
        this.setState({activeClassRooms:false, activeClassRegisterRooms:false, activeClassRegisterCash:true})
    }
    render() {
        const logOut = this.props.logOut;
        const classNameRooms = this.state.activeClassRooms ? 'icon-active' : ''
        const classNameRegisterRooms = this.state.activeClassRegisterRooms ? 'icon-active' : ''
        const classNameRegisterCash = this.state.activeClassRegisterCash ? 'icon-active' : ''
        return (
            <nav id="sidebar-sm" className="sidebar">
                <div className="d-flex justify-content-between mt-3"> 
                    <i className="fa fa-bars icon-menu pl-3 pb-2" id="menu" onClick={this.changeSidebar}></i>
                </div>
                <div aria-orientation="vertical" className="nav flex-column ng-star-inserted">
                    <a className='nav-link' onClick={this.changeReception}>
                        <i aria-hidden="true" className={`fa fa-pencil pr-2 ${classNameRooms}`}></i>
                    </a>
                    <a className='nav-link' onClick={this.changeRegisterRooms}>
                        <i aria-hidden="true" className={`fa fa-file-text-o pr-2 ${classNameRegisterRooms}`}></i>
                    </a>
                    <a className='nav-link' onClick={this.changeRegisterCash}>
                        <i aria-hidden="true" className={`fa fa-file-text-o pr-2 ${classNameRegisterCash}`}></i>
                    </a>
                    <a className="nav-link" onClick={logOut}>
                        <i aria-hidden="true" className="fa fa-sign-out"></i>
                    </a>
                </div>
            </nav>
        );
    }
}

export default SidebarSm;