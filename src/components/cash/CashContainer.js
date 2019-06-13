import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase';
import {ref} from './../../services/firebase';

import SpecialCashOne from './SpecialCashOne.js';

class Cash extends Component {
    state={
        formCashList: [],
        cashList: [],
        userName: '',
        specialCashList: []
    }
        
    dbFormCash = ref.child('FormCaja/');
    dbCashRoom = ref.child('CashRoom/');
    dbSpecialCash = ref.child('SpecialCash/');
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
            userId_open: '',
            showComponent: true
        });
    }
    //cambia a estado de caja a ausente
    changeStateSpecialCash = (key, state) => {
        ref.child('CashRoom').child('/'+ key).update({
            state
        });
    }

    componentDidMount(){
        this.dbFormCash.on('value',snap => {
            const arrFormCash = [];
            snap.forEach(data=>{
                let objFormCash = {
                    appointment:  data.val().appointment,
                    date:   data.val().date,
                    fromRoom:  data.val().fromRoom,
                    hourAttention:  data.val().hourAttention,
                    hourEnd: data.val().hourEnd,
                    hourInit:   data.val().hourInit,
                    id:  data.val().id,
                    team: data.val().team,
                    comments: data.val().comments,
                    key: data.key                  
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
                order: data.val().order
            }
            arrCash.push(cashObj)
            this.setState({cashList:arrCash})
            }) 
        })

        this.dbSpecialCash.on('value', snap => {
            const arrSpecialCash = [];
            snap.forEach(data => {
                let specialCashObj = {
                    clientIn: data.val().clientIn,
                    clientOut: data.val().clientOut,
                    id: data.val().id,
                    name: data.val().name,
                    numberOfClients: data.val().id,
                    state: data.val().state,
                    userId: data.val().userId,
                    cashRoom_Id: data.val().cashRoom_Id,
                    formCash_Id: data.val().formCash_Id,
                    key: data.key 
                }
                arrSpecialCash.push(specialCashObj);
                this.setState({specialCashList: arrSpecialCash})
            })
        })
    }

    render() { 

        //validaciones si las listas devuelven indefinido
        if(this.state.cashList === undefined || this.state.formCashList === undefined || this.state.specialCashList === undefined) return null;

        //declaracion de variables 
        let arrcashList = []; let arrformCashList = []; let arrspecialCashList = [];
        let currentObjSpecialCash = {}; let currentObjCashRoom = {}; let currentObjFormCash = {};

        //validacion para obtener la caja especial del usuario q inicio sesión
        if( this.state.cashList.length !== 0  && 
            this.state.formCashList.length !== 0  && 
            this.state.specialCashList.length !== 0 ){
            
            arrcashList = this.state.cashList;
            arrformCashList = this.state.formCashList;
            arrspecialCashList = this.state.specialCashList;

            currentObjSpecialCash = arrspecialCashList.find((e) => e.userId === this.props.data.uid)
            
            if (currentObjSpecialCash !== undefined) {
                currentObjCashRoom = arrcashList.find((e) => e.id === currentObjSpecialCash.cashRoom_Id); 
                currentObjFormCash = arrformCashList.find((e) => e.id === currentObjSpecialCash.formCash_Id); 
            }
        }

        return ( 
            <div className="bg-main">
                <SpecialCashOne 
                    updateHrAtCashForm = {this.updateHrAtCashForm}
                    updateClearCashForm = {this.updateClearCashForm}
                    addRegisterCash = {this.addRegisterCash}
                    changeCashState = {this.changeCashState}
                    changeStateSpecialCash = {this.changeStateSpecialCash}
                    currentObjFormCash = {currentObjFormCash}
                    currentObjCashRoom = {currentObjCashRoom}
                    currentObjSpecialCash = {currentObjSpecialCash}
                    data = {this.props.data}
                />
                <button
                style={{border: 'none', background: 'transparent'}}
                onClick={() => {
                    logout()
                }}
                className="navbar-brand">Cerrar sesión</button>
            </div>
         );
    }
}
 
export default Cash;