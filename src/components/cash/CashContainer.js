import React, { Component } from 'react';
import { logout } from './../../components/helpers/authFirebase';
import {ref, storage} from './../../services/firebase';

import SpecialCashOne from './SpecialCashOne.js';

class Cash extends Component {
        //actualizar hora de atención del form de caja
        updateHrAtCashForm = (key,hourAttention) => {
            ref.child('FormCaja').child('/'+key).update({
                hourAttention: hourAttention
            })
        }
        //actualizar hora final de atención del form de caja
        updateHrEndCashForm = (key,hourEnd) => {
            ref.child('FormCaja').child('/'+key).update({
                hourEnd: hourEnd
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
        changeCashState = (key, state) => {
            ref.child('CashRoom').child('/'+ key).update({
                state: state
            });
        }

    render() { 
        return ( 
            <div className="bg-main">
                <SpecialCashOne 
                updateHrAtCashForm = {this.updateHrAtCashForm}
                updateHrEndCashForm = {this.updateHrEndCashForm}
                addRegisterCash = {this.addRegisterCash}
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