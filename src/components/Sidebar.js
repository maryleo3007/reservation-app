import React,{Component} from 'react';

class Sidebar extends Component {

    render() {
        return (
            <nav className="sidebar">
            <style jsx>{`.sidebar{ width: 250px;}`}</style>
                <div className="d-flex justify-content-between">
                    <a className="navbar-brand ng-star-inserted" href="/">
                    <img alt="inteligo-logo" className="logo img-fluid" src="./../../img/logo.png"/>
                    </a>
                    <i className="fa fa-bars icon-menu pl-3 pb-2" id="menu"></i>
                </div>
                    
                <div className="ng-star-inserted">
                    <img alt="" className="img-user img-fluid mx-auto d-block mt-5 ng-star-inserted" src="./../assets/img/Stephanie Pino.jpg"/>
                    <div className="text-center user ng-star-inserted">
                        <p className="mt-2">Stephanie Pino</p>
                        <p>Recepcionista</p>
                    </div>
                </div>
                <div aria-orientation="vertical" className="nav flex-column tabs-options ng-star-inserted" id="" role="tablist">
                    <a aria-controls="v-pills-home" aria-selected="true" className="nav-link active" data-toggle="pill" href="#v-pills-home" id="tab-client" role="tab">
                    <i aria-hidden="true" className="fa fa-pencil pr-2"></i> Atender Cliente 
                    <i aria-hidden="true" className="fa fa-chevron-right"></i></a>
                    <a aria-controls="v-pills-profile" aria-selected="false" className="nav-link" data-toggle="pill" href="#v-pills-profile" id="tab-register" role="tab">
                    <i aria-hidden="true" className="fa fa-file-text-o pr-2"></i> Ver Registro 
                    <i aria-hidden="true" className="fa fa-chevron-right"></i></a>
                </div>
                <div className="log-out d-flex align-items-end ng-star-inserted">
                    <a className="nav-link" href="/"><i aria-hidden="true" className="fa fa-sign-out"></i>Salir</a>
                </div>
            </nav>
        );
    }
}

export default Sidebar