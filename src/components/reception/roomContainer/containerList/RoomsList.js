import React,{Component} from 'react';
import Room from './unityContainer/Room';

class RoomList extends Component {

    render() {
        return (
            <div className="room-list">
                <div className='row'>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[3]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[2]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[1]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[0]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[4]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[5]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[6]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[7]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[8]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[9]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[10]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                    <div className='col-3 p-0 min-height-15'>
                        <Room
                            room={this.props.rooms[11]}
                            responsable = {this.props.responsable}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomList