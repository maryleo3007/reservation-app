import React, { Component } from 'react';
import {ref} from './../../../services/firebase';
// import DatePicker from 'react-bootstrap-date-picker';

class RegisterCash extends Component {
    state = { 
        arrRegisterCash: undefined
     }

    dbRegisterCash = ref.child('CashRegister/');

    componentDidMount() {
        this.dbRegisterCash.on('value', snap => {
            const arrRegisterCash = [];
            snap.forEach(data => {
                let roomObj = {
                    cash: data.val().cash,
                    comment: data.val().comment,
                    date: data.val().date,
                    hourAttention: data.val().hourAttention,
                    hourEnd: data.val().hourEnd,
                    hourInit: data.val().hourInit,
                    id: data.val().id,
                    indicator: data.val().indicator,
                    team: data.val().team,
                }
                arrRegisterCash.push(roomObj);
                this.setState({
                    arrRegisterCash
                })
            })
        })
    }

    render() { 
        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50'
        const show = this.props.showComponent ===  'registerCash' ? 'd-block' : 'd-none'
        if(this.state.arrRegisterCash === undefined) return null;

        
        return ( 
            <div className={`${marginLeft} ${show} table-hover table-striped w-auto p-4`}>
                {/* <DatePicker id="example-datepicker" value={this.state.value}/> */}
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className='title-table'>Caja</th>
                            {/* <th scope="col" className='title-table'>Responsable</th> */}
                            <th scope="col" className='title-table'>Fecha</th>
                            <th scope="col" className='title-table'>Hora de Ingreso del cliente</th>
                            <th scope="col" className='title-table'>Hora de Atención</th>
                            <th scope="col" className='title-table'>Hora de Finalización</th>
                            <th scope="col" className='title-table'>Equipo</th>
                            <th scope="col" className='title-table'>Uso de caja</th>
                            <th scope="col" className='title-table'>Comentario</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.arrRegisterCash.map(register => 
                        <tr>
                            <td className='title-table'>{register.cash}</td>
                            <td className='title-table'>{register.date}</td>
                            <td className='title-table'>{register.hourInit}</td>
                            <td className='title-table'>{register.hourAttention}</td>
                            <td className='title-table'>{register.hourEnd}</td>
                            <td className='title-table'>{register.team}</td>
                            <td className='title-table'>{register.indicator}</td>
                            <td className='title-table'>{register.comment}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default RegisterCash;