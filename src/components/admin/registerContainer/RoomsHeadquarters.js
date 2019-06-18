import React, { Component } from 'react';

class RoomsHeadquarters extends Component {
    render() {

        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50';
        const show = this.props.showComponent ===  'rooms' ? 'd-block' : 'd-none'

        return (
            <div className={`room-container container-fluid ${marginLeft} ${show}`}>
                vista de todas las salas
            </div>
        );
    }
}

export default RoomsHeadquarters;