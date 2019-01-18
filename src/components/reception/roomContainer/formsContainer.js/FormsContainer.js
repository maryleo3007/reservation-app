import React, { Component } from 'react';
import RoomForm from './RoomForm';
import CashOneForm from './cashForms/CashOneForm';
import CashTwoForm from './cashForms/CashTwoForm';
import {ref} from './../../../../services/firebase'


class FormsContainer extends Component {
    
    state = { 
        optionPerson: [],
        optionTeam: []
    }

    dbOptionPerson = ref.child('OptionPerson/');
    dbOptionTeam = ref.child('OptionTeam/');


    componentDidMount() {
        this.dbOptionPerson.on('value', snap => {
            const optionPerson = [];
            snap.forEach(data => {
                let optionObj = {
                    value: data.val().value,
                    label: data.val().label,
                    team: data.val().team
                }
                optionPerson.push(optionObj)
                this.setState({
                    optionPerson
                })
            })            
        })

        this.dbOptionTeam.on('value', snap => {
            const optionTeam = [];
            snap.forEach(data => {
                let optionObj = {
                    value: data.val().value,
                    label: data.val().label,
                }
                optionTeam.push(optionObj)
                this.setState({
                    optionTeam
                })
            })            
        })
    }
    render() { 
        return ( 
            <div>
                {this.props.rooms.map(room => 
                    <RoomForm
                        key = {room.id}
                        room = {room}
                        objRegister = {this.props.objRegister}
                        addRegister = {this.props.addRegister}
                        responsable = {this.props.responsable}
                        showHideFormArr = {this.props.showHideFormArr[room.id].showRoom}
                        showHideForm = {this.props.showHideForm}
                        position = {this.props.position}
                        optionPerson = {this.state.optionPerson}
                        optionTeam = {this.state.optionTeam}
                    />
                )}
                {this.props.shownCashOne ? <CashOneForm
                    cash = {this.props.cashs.id}
                /> : ""}
                {this.props.shownCashTwo ? <CashTwoForm
                    cash = {this.props.cashs.id}
                /> : ""}
            </div>
         );
    }
}

export default FormsContainer;