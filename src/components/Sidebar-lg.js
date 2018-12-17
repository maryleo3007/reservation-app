import React,{Component} from 'react';
import logo from './../img/logo.png';

class SidebarLg extends Component {
    changeSidebar(){
        const change = false
        console.log(change)
        this.props.changeSidebar(change);
        console.log(this.props.changeSidebar(change))
    }
    render() {
        
        return (
            <nav id="sidebar-lg" className="sidebar">
                <div className="d-flex justify-content-between">
                    <a className="navbar-brand pl-3" href="/">
                    <img alt="inteligo-logo" className="logo" src={logo}/>
                    </a>
                    <i className="fa fa-bars icon-menu pr-4 pt-3" id="menu" onClick={this.changeSidebar}></i>
                </div>
                    
                <div className="">
                    <img alt="" className="img-user img-fluid mx-auto d-block mt-5 " src="./../assets/img/Stephanie Pino.jpg"/>
                    <div className="text-center user ">
                        <p className="mt-2">Stephanie Pino</p>
                        <p>Recepcionista</p>
                    </div>
                </div>
                <div aria-orientation="vertical" className="nav flex-column tabs-options border-top" id="" role="tablist">
                    <a aria-controls="v-pills-home" aria-selected="true" className="nav-link active" data-toggle="pill" href="#v-pills-home" id="tab-client" role="tab">
                        <i aria-hidden="true" className="fa fa-pencil pr-2"></i> Atender Cliente 
                        <i aria-hidden="true" className="fa fa-chevron-right"></i>
                    </a>
                    <a aria-controls="v-pills-profile" aria-selected="false" className="nav-link border-top border-bottom" data-toggle="pill" href="#v-pills-profile" id="tab-register" role="tab">
                        <i aria-hidden="true" className="fa fa-file-text-o pr-2"></i> Ver Registro 
                        <i aria-hidden="true" className="fa fa-chevron-right"></i>
                    </a>
                </div>
                <div className="log-out d-flex align-items-end">
                    <a className="nav-link" href="/"><i aria-hidden="true" className="fa fa-sign-out"></i>Salir</a>
                </div>
            </nav>
        );
    }
}
export default SidebarLg;