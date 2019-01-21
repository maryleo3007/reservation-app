import React, { Component } from 'react';
import RoomForm from './RoomForm';
import CashOneForm from './cashForms/CashOneForm';
import CashTwoForm from './cashForms/CashTwoForm';
import {ref} from './../../../../services/firebase'


class FormsContainer extends Component {
    
    state = { 
        optionPerson: [],
        optionTeam: [],
        divsObj: []
    }

    dbOptionPerson = ref.child('OptionPerson/');
    dbOptionTeam = ref.child('OptionTeam/');
    dbFormSala = ref.child('FormSala/');


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

        this.dbFormSala.on('value', snap => {
            let divsObj = snap.val()
            this.setState({
                divsObj
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
                        changeState = {this.props.changeState}
                        divs = {this.state.divsObj[room.id].divs}
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