import React, { Component } from 'react';
import {ref} from './../../../services/firebase';
import { setDateLocale } from './../../helpers/date';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

class RegisterCash extends Component {
    state = { 
        arrRegisterCash: undefined,
        startDate: new Date(),
        endDate: new Date(),
        branchOffice: 1
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

    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.startDate;
        endDate = endDate || this.state.endDate;
        this.setState({ startDate, endDate });
    };

    handleChangeStart = startDate => this.handleChange({ startDate });

    handleChangeEnd = endDate => {
        this.handleChange({ endDate })
        this.filterDays(this.state.startDate, endDate)
    };

    filterDays = (p_startDate, p_endDate) => {

        let result = this.state.arrRegisterCash.filter( (item) => { 
            return setDateLocale(item.date) >= p_startDate && setDateLocale(item.date) <= p_endDate; 
         })
        
        this.setState({arrRegisterCash: result})
         
    }

    changeBranchOffice = (branchOffice) => this.setState({branchOffice})


    render() { 
        if(this.state.arrRegisterCash === undefined) return null;
        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50';
        const show = this.props.showComponent ===  'registerCash' ? 'd-block' : 'd-none';
        const buttonTabsP = this.state.branchOffice === 1 ? 'selected' : 'not-selected';
        const buttonTabsPP = this.state.branchOffice === 2 ? 'selected' : 'not-selected';

        return ( 
            <div className={`${marginLeft} ${show} table-hover table-striped w-auto p-4`}>
                <div className='d-flex ml-5 w-75 justify-content-around align-items-center pt-3'>
                    <span className={`${buttonTabsP} btn`} onClick={()=>{this.changeBranchOffice(1)}}>Oficina principal</span> 
                    <span className={`${buttonTabsPP} btn`} onClick={()=>{this.changeBranchOffice(2)}} >Oficina Patio Panorama</span>
                </div>
                 
                 <DatePicker
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                />
                <DatePicker
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    minDate={this.state.startDate}
                />
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