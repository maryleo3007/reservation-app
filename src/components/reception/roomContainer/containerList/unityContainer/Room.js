import React, { Component } from 'react';

class Room extends Component {
    state = { 
        room: {}
     }

    componentWillReceiveProps() {
        this.setState({
            room: this.props.room
        })
        this.showRooms()
        
    }


    showRooms = () => {
        console.log(this.state.room);
        return (
            <div>
                desde funcion
            </div>
        )
    }
    render() { 
        console.log('no aún');
        // console.log(this.state.room);
        return ( 
            <div className="">
        <span><b>sala</b></span>
        
        </div>
         );
    }
}


export default Room