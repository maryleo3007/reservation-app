import React,{Component} from 'react';
import Room from './unityContainer/Room';

class RoomList extends Component {

    render() {
        return (
            <div className="room-list">
                <div className='row'>
                    <div className='col-3'>
                        <Room room={this.props.rooms[0]}/>
                    </div>
                    <div className='col-3'>
                    
                    </div>
                    <div className='col-3'>
                    
                    </div>
                    <div className='col-3'>
                    
                    </div>
                </div>
                {/* {this.props.rooms.map(room => 
                    <Room
                        key = {room.id}
                        room = {room}
                        showRoom = {this.props.showRoom}
                    />
                )} */}
                {/* <React.Fragment>
                    <Room data={this.props.rooms[0]}/>
                    <Room data={this.props.rooms[2]}/>
                </React.Fragment> */}

            </div>
        );
    }
}

export default RoomList