import React,{Component} from 'react';
import logo from './../assets/logo.png';

class SidebarLg extends Component {
    state ={
        reception : true,
        register : false,
        activeClassR: true,
        activeClassRe : false,
    }
    changeSidebar = () =>{
        const change = false;
        this.props.changeSidebar(change);
    }
    changeReception = () =>{
        this.props.changeReception();
        this.setState({activeClassR:true,activeClassRe:false})
    }
    changeRegister = () =>{
        this.props.changeRegister();
        this.setState({activeClassR:false,activeClassRe:true})
    }
    render() {
        const classNameR = this.state.activeClassR ? 'nav-link active' : 'nav-link'
        const classNameRe = this.state.activeClassRe ? 'nav-link active' : 'nav-link'
        const userImg = this.props.userImage;
        const userName = this.props.userName;
        const position = this.props.userData.position;
        return (
            <nav id="sidebar-lg" className="sidebar">
                <div className="d-flex justify-content-between">
                    <a className="navbar-brand pl-3" href="/">
                    <img alt="inteligo-logo" className="logo" src={logo}/>
                    </a>
                    <i className="fa fa-bars icon-menu pr-4 pt-3" id="menu" onClick={this.changeSidebar}></i>
                </div>
                    
                <div className="">
                    <img alt="" className="img-user img-fluid mx-auto d-block mt-5 rounded-circle pr-5 pl-5" src={userImg}/>
                    <div className="text-center user ">
                        <p className="mt-2">{userName}</p>
                        <p className="text-capitalize">{position}</p>
                    </div>
                </div>
                <div className="nav flex-column tabs-options border-top">
                    <a className={classNameR} onClick={this.changeReception}>
                        <i aria-hidden="true" className="fa fa-pencil pr-2"></i> Atender Cliente 
                        <i aria-hidden="true" className="fa fa-chevron-right"></i>
                    </a>
                    <a className={classNameRe} onClick={this.changeRegister}>
                        <i aria-hidden="true" className="fa fa-file-text-o pr-2"></i> Ver Registro 
                        <i aria-hidden="true" className="fa fa-chevron-right"></i>
                    </a>
                </div>
                <div className="log-out d-flex align-items-end">
                    <a className="nav-link" onClick={this.props.logOut}><i aria-hidden="true" className="fa fa-sign-out"></i>Salir</a>
                </div>
            </nav>
        );
    }
}
export default SidebarLg;