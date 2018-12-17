import React,{Component} from 'react';

class SidebarSm extends Component {
    changeSidebar = () =>{
        const change = true
        this.props.changeSidebar(change);
    }
    changeReception = () =>{
        this.props.changeReception();
    }
    changeRegister = () =>{
        this.props.changeRegister();
    }
    render() {
        return (
            <nav id="sidebar-sm" className="sidebar">
                <div className="d-flex justify-content-between"> 
                    <i className="fa fa-bars icon-menu pl-3 pb-2" id="menu" onClick={this.changeSidebar}></i>
                </div>
                <div aria-orientation="vertical" className="nav flex-column ng-star-inserted">
                    <a className="nav-link active" href="/" onClick={this.changeReception}>
                        <i aria-hidden="true" className="fa fa-pencil pr-2"></i>
                    </a>
                    <a className="nav-link" href="/"onClick={this.changeRegister}>
                        <i aria-hidden="true" className="fa fa-file-text-o pr-2"></i>
                    </a>
                    <a className="nav-link" href="/">
                        <i aria-hidden="true" className="fa fa-sign-out"></i>
                    </a>
                </div>
            </nav>
        );
    }
}

export default SidebarSm;