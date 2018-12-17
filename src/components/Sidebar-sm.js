import React,{Component} from 'react';

class SidebarSm extends Component {
    changeSidebar(){
        const change = true
        console.log(change)
        this.props.changeSidebar();
        console.log()
    }
    
    render() {
        return (
            <nav id="sidebar-sm" className="sidebar">
                <div class="d-flex justify-content-between"> 
                    <i class="fa fa-bars icon-menu pl-3 pb-2" id="menu" onClick={this.changeSidebar}></i>
                </div>
                <div aria-orientation="vertical" class="nav flex-column ng-star-inserted" id="" role="tablist">
                    <a aria-controls="v-pills-home" aria-selected="true" class="nav-link active" data-toggle="pill" href="#v-pills-home" id="tab-client" role="tab">
                        <i aria-hidden="true" class="fa fa-pencil pr-2"></i>
                    </a>
                    <a aria-controls="v-pills-profile" aria-selected="false" class="nav-link" data-toggle="pill" href="#v-pills-profile" id="tab-register" role="tab">
                        <i aria-hidden="true" class="fa fa-file-text-o pr-2"></i>
                    </a>
                    <a class="nav-link" href="">
                        <i aria-hidden="true" class="fa fa-sign-out"></i>
                    </a>
                </div>
            </nav>
        );
    }
}

export default SidebarSm;