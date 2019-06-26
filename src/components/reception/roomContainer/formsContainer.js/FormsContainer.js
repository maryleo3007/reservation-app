import React, { Component } from 'react';
import {ref} from './../../../../services/firebase'
import CashForm from './CashForm';
import RoomForm from './RoomForm';

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
        if(this.props.formCashList === undefined) return null;
        if(this.props.cashs === undefined) return null;
        console.log(this.state.divsObj);
        

        let countCashAvailable = this.props.cashs.filter(x => x.state === 'Disponible').length
        
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
                        countCashAvailable = {countCashAvailable}
                        cashList = {this.props.cashs}
                        changeCashState = {this.props.changeCashState}
                        updateDtHrInitCashForm = {this.props.updateDtHrInitCashForm}
                        updateIndicatorCash = {this.props.updateIndicatorCash}
                        updateNumOfClients = {this.props.updateNumOfClients}
                        datauser = {this.props.datauser}
                    />
                )}
                {
                    this.props.cashs.map( cash =>
                        <CashForm
                            key = {cash.id}
                            cash = {cash}
                            formCash = {this.props.formCashList.find( formCash => formCash.id === cash.id)}
                            showHideFormArr = {this.props.showHideFormArr}
                            showHideForm = {this.props.showHideForm}
                            changeCashState = {this.props.changeCashState}
                            changeCashComponent = {this.props.changeCashComponent}
                            updateDtHrInitCashForm = {this.props.updateDtHrInitCashForm}
                            updateTeamCash = {this.props.updateTeamCash}
                            updateCommentsCash = {this.props.updateCommentsCash}
                            updateIndicatorCash = {this.props.updateIndicatorCash}
                            optionTeam = {this.state.optionTeam}
                        />
                    )
                }
            </div>
         );
    }
}

export default FormsContainer;