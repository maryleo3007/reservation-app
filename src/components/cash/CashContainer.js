import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase';
import {ref} from './../../services/firebase';

import SpecialCashOne from './SpecialCashOne.js';

class Cash extends Component {
    state={
        formCashList: [],
        cashList: [],
        userName: ''
    }
        
    dbFormCash = ref.child('FormCaja/');
    dbCashRoom = ref.child('CashRoom/');
    //actualizar hora de atención del form de caja
    updateHrAtCashForm = (key,hourAttention) => {
        ref.child('FormCaja').child('/'+key).update({
            hourAttention: hourAttention
        })
    }
    //actualizar hora final de atención del form de caja
    updateClearCashForm = (key) => {
        ref.child('FormCaja').child('/'+key).update({
            appointment: "",
            date:"",
            fromRoom:"",
            hourInit:"00:00:00",
            hourEnd: "",
            hourAttention:"00:00:00",
            team:"",
            comments:"No hay comentarios"
        })
    }
    //agregar registro de caja
    addRegisterCash = (obj) => {
        const refRegister = ref.child('CashRegister');
        const addRegister = refRegister.push({
            indicator : obj.indicator,
            date: obj.date,
            cash: obj.cash,
            hourInit: obj.hourInit,
            hourAttention: obj.hourAttention,
            hourEnd: obj.hourEnd,
            team:obj.team,
            comment:obj.comment
        })
        const newRegister = addRegister.key;
        refRegister.child(newRegister).update({
            id: newRegister
        })
    }
    //cambia estado de caja
    changeCashState = (key) => {
        ref.child('CashRoom').child('/'+ key).update({
            state: 'Disponible',
            showComponent: false
        });
    }

    componentDidMount(){
        this.dbFormCash.on('value',snap => {
            const arrFormCash = [];
            snap.forEach(data=>{
                let objFormCash = {
                    appointment:  data.val().appointment,
                    caja_id:   data.val().caja_id,
                    date:   data.val().date,
                    fromRoom:  data.val().fromRoom,
                    hourAttention:  data.val().hourAttention,
                    hourEnd: data.val().hourEnd,
                    hourInit:   data.val().hourInit,
                    id:  data.val().id,
                    team: data.val().team,
                    comments: data.val().comments                  
                }
                arrFormCash.push(objFormCash)
                this.setState({formCashList:arrFormCash})
            })
        })

        this.dbCashRoom.on('value', snap => {
            const arrCash = [];
            snap.forEach(data =>{
                let cashObj = {
                id: data.val().id,
                state: data.val().state,
                time: data.val().time,
                title: data.val().title,
                key: data.key,
                showComponent: data.val().showComponent,
                formCash_id: data.val().formCash_id,
                order: data.val().order
            }
            arrCash.push(cashObj)
            this.setState({cashList:arrCash})
            }) 
        })
    }

    render() { 
        return ( 
            <div className="bg-main">
                <SpecialCashOne 
                updateHrAtCashForm = {this.updateHrAtCashForm}
                updateClearCashForm = {this.updateClearCashForm}
                addRegisterCash = {this.addRegisterCash}
                changeCashState = {this.changeCashState}
                formCashList = {this.state.formCashList[0]}
                cashList = {this.state.cashList[1]}
                data = {this.props.data}
                />
                <button
                style={{border: 'none', background: 'transparent'}}
                onClick={() => {
                    logout()
                }}
                className="navbar-brand">Logout</button>
            </div>
         );
    }
}
 
export default Cash;