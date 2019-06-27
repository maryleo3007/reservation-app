import React,{Component} from 'react';
import logo from './../assets/logo.png';

class SidebarLg extends Component {
    state ={
        reception : true,
        register : false,
        office: ''
    }

    changeSidebar = () =>{
        const change = false;
        this.props.changeSidebar(change);
    }

    changeReception = () =>{
        this.props.changeReception();
    }

    changeRegisterRooms = () =>{
        this.props.changeRegisterRooms();
    }

    changeRegisterCash = () =>{
        this.props.changeRegisterCash();
    }

    componentDidMount(){
        if(this.props.userData.branchOffice === '1'){
            this.setState({
                office: 'Oficina principal Inteligo'
            })
        } else if(this.props.userData.branchOffice === '2'){
            this.setState({
                office: 'Oficina Patio Panorama Surco'
            })
        }
        
    }

    render() {
        const classNameRooms = this.props.classSidebar.activeClassRooms ? 'nav-link active' : 'nav-link'
        const classNameRegisterRooms = this.props.classSidebar.activeClassRegisterRooms ? 'nav-link active' : 'nav-link'
        const classNameRegisterCash = this.props.classSidebar.activeClassRegisterCash ? 'nav-link active' : 'nav-link'
        const userImg = this.props.userImage;
        const userName = this.props.userName;
        const position = this.props.userData.position;
        const office = this.props.userData.branchOffice
        return (
            <nav id="sidebar-lg" className="sidebar">
                <div className="d-flex justify-content-between">
                    <a className="navbar-brand pl-3" href="/">
                    <img alt="inteligo-logo" className="logo" src={logo}/>
                    </a>
                    <i className="fa fa-bars icon-menu pr-4 pt-3" id="menu" onClick={this.changeSidebar}></i>
                </div>
                    
                <div className="">
                    <img alt="" className="img-user img-fluidd-block mt-5 rounded-circle ml-5" src={userImg}/>
                    <div className="text-center user mt-3">
                        <span className="mt-2"><b>{userName}</b></span>
                        <p className="text-capitalize"><small>{position}</small></p>
                        <p>{this.state.office}</p>
                    </div>
                </div>
                <div className="nav flex-column tabs-options border-top">
                    <button className={classNameRooms} onClick={this.changeReception}>
                        <i aria-hidden="true" className="fa fa-pencil pr-2"></i> Atender Cliente 
                        <i aria-hidden="true" className="fa fa-chevron-right"></i>
                    </button>
                    <button className={classNameRegisterRooms} onClick={this.changeRegisterRooms}>
                        <i aria-hidden="true" className="fa fa-file-text-o pr-2"></i> Ver Registro Salas
                        <i aria-hidden="true" className="fa fa-chevron-right"></i>
                    </button>
                    <button className={classNameRegisterCash} onClick={this.changeRegisterCash}>
                        <i aria-hidden="true" className="fa fa-file-text-o pr-2"></i> Ver Registro Cajas
                        <i aria-hidden="true" className="fa fa-chevron-right"></i>
                    </button>
                </div>
                <div className="log-out d-flex align-items-end">
                    <button className="nav-link" onClick={this.props.logOut}><i aria-hidden="true" className="fa fa-sign-out"></i>Salir</button>
                </div>
            </nav>
        );
    }
}
export default SidebarLg;