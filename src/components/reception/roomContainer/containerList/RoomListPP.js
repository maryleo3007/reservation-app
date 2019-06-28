import React, { Component } from 'react';
import RoomPP from './unityContainer/RoomPP';
import CashPP from './unityContainer/CashPP';



class RoomListPP extends Component {

    showRooms = () => {        
        if(this.props.cashs[1] === undefined) return null
        
        else {
        return (
            <div className="room-list">
                <div className='hvh-50'></div>
                <div className='row'>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[3]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[3].key ,this.props.rooms[3].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[4]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[2]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[2].key ,this.props.rooms[2].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[3]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                    <div className='marginl-pp col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[9]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[9].key ,this.props.rooms[9].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[10]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[8]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[8].key ,this.props.rooms[8].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[9]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[1]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[1].key ,this.props.rooms[1].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[2]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[0]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[0].key ,this.props.rooms[0].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[1]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                    <div className='col-pp p-0 min-height-15'>
                        <CashPP
                            //onToggleForm={() =>{this.props.onToggleForm(cash.id,cash.key)}}
                            //changeCashComponent = {()=>{this.props.changeCashComponent(cash.key,!cash.showComponent)}}
                            //changeCashState = {this.props.changeCashState}
                            key = {this.props.cashs[1].key}
                            cash = {this.props.cashs[1]}
                            showHideFormArr = {this.props.showHideFormArr[this.props.cashs[1].order]}
                            showHideForm = {this.props.showHideForm}
                            changeToGreenOrAmberCash = {this.props.changeToGreenOrAmberCash}
                            datauser = {this.props.datauser}
                        />
                    </div>
                    <div className='col-pp p-0 min-height-15'>
                        <CashPP
                            //onToggleForm={() =>{this.props.onToggleForm(cash.id,cash.key)}}
                            //changeCashComponent = {()=>{this.props.changeCashComponent(cash.key,!cash.showComponent)}}
                            //changeCashState = {this.props.changeCashState}
                            key = {this.props.cashs[0].key}
                            cash = {this.props.cashs[0]}
                            showHideFormArr = {this.props.showHideFormArr[this.props.cashs[0].order]}
                            showHideForm = {this.props.showHideForm}
                            changeToGreenOrAmberCash = {this.props.changeToGreenOrAmberCash}
                            datauser = {this.props.datauser}
                        />
                    </div>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[5]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[5].key ,this.props.rooms[5].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[6]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                    <div className='w-4pp p-0 min-height-1 d-flex justify-content-center align-items-center'>
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[4]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[4].key ,this.props.rooms[4].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[5]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[6]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[6].key ,this.props.rooms[6].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[7]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                    <div className='col-pp p-0 min-height-15'>
                        <RoomPP
                            room={this.props.rooms[7]}
                            changeToGreenOrAmber = {() =>{this.props.changeToGreenOrAmber(this.props.rooms[7].key ,this.props.rooms[7].state)}}
                            responsable = {this.props.responsable}
                            showHideFormArr = {this.props.showHideFormArr[8]}
                            showHideForm = {this.props.showHideForm}
                        />
                    </div>
                </div>
            </div>
        )
        }
        
    }

    render() {
        return (
            <React.Fragment>
                {this.showRooms()}
            </React.Fragment>
        );
    }
}

export default RoomListPP;