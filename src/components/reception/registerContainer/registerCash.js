import React, { Component } from 'react';
import {ref} from './../../../services/firebase';
import { setDateLocaleStart, setDateLocaleEnd } from './../../helpers/date';
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
        cashRegister: 1,
        arrRegisterSC: undefined
     }

    dbRegisterCash = ref.child('CashRegister/');
    dbSpecialCash = ref.child('CashSpecialRegister/');

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
                    branchOffice: data.val().branchOffice
                }
                arrRegisterCash.push(roomObj);
                this.setState({
                    arrRegisterCash
                })
            })
        })

        this.dbSpecialCash.on('value', snap => {
            const arrRegisterSCash = [];
            snap.forEach(data => {
                let scObj = {
                    name: data.val().name,
                    state: data.val().state,
                    hourEnd: data.val().hourEnd,
                    hourInit: data.val().hourInit,
                    id: data.val().id,
                    branchOffice: data.val().branchOffice
                }
                arrRegisterSCash.push(scObj);
                this.setState({
                    arrRegisterSC: arrRegisterSCash
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
        const arrRegisterCash = [];
        this.dbRegisterCash.on('value', snap => {
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
                    branchOffice: data.val().branchOffice
                }
                arrRegisterCash.push(roomObj);
            })
        })
        let result = arrRegisterCash.filter( (item) => { 
            return setDateLocaleStart(item.date) >= p_startDate && setDateLocaleEnd(item.date) <= p_endDate; 
        })
        
        this.setState({arrRegisterCash: result})
         
    }

    changeCashReg =(cashRegister)=>this.setState({cashRegister})
    
    render() { 
        if(this.state.arrRegisterCash === undefined || this.state.arrRegisterSC === undefined) return null;
        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50';
        const show = this.props.showComponent ===  'registerCash' ? 'd-block' : 'd-none';

        const buttonCS = this.state.cashRegister === 0 ? 'selected' : 'not-selected'
        const buttonCash = this.state.cashRegister === 1 ? 'selected' : 'not-selected'
        const showCS = this.state.cashRegister === 0 ? 'd-flex' : 'd-none'
        const showCash = this.state.cashRegister === 1 ? 'd-flex' : 'd-none'

        return ( 
            <div className={`${marginLeft} ${show} w-auto p-4 mh-100 table-hover table-striped`}>
                <div className="f-date p-3 mb-4 container">
                    <div className="row">
                        <div className="col-3">
                            <label className="pr-3"> Fecha Inicio</label>
                            <DatePicker
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.startDate}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChangeStart}
                                calendarClassName="date-stripes"
                            />
                         </div>
                        <div className="col-3">
                            <label className="pr-3"> Fecha Fin</label>
                            <DatePicker
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.endDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChangeEnd}
                                minDate={this.state.startDate}
                                calendarClassName="date-stripes"
                            />
                         </div>
                        <div className="col-3">
                            <span className={`${buttonCash} btn`} onClick={()=>{this.changeCashReg(1)}}>Caja</span>
                        </div>
                        <div className="col-3">
                            <span onClick={()=>{this.changeCashReg(0)}} className={`${buttonCS} btn`}>Caja especial</span>
                        </div>
                    </div> 
                </div>
                <div className="container">
                    
                    <div className={`${showCash} row mt-3`}> 
                        <table className="table table-bordered">
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
                                    <th scope="col" className='title-table'>Oficina</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.arrRegisterCash.map(register => 
                                <tr key={register.id}>
                                    <td className='title-table'>{register.cash}</td>
                                    <td className='title-table'>{register.date}</td>
                                    <td className='title-table'>{register.hourInit}</td>
                                    <td className='title-table'>{register.hourAttention}</td>
                                    <td className='title-table'>{register.hourEnd}</td>
                                    <td className='title-table'>{register.team}</td>
                                    <td className='title-table'>{register.indicator}</td>
                                    <td className='title-table'>{register.comment}</td>
                                    <td className='title-table'>{register.branchOffice}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className={`${showCS} row mt-3`}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" className='title-table'>Caja</th>
                                <th scope="col" className='title-table'>Estado</th>
                                <th scope="col" className='title-table'>Hora de Inicio</th>
                                <th scope="col" className='title-table'>Hora de Finalización</th>
                                <th scope="col" className='title-table'>Oficina</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.arrRegisterSC.map(register => 
                            <tr key={register.id}>
                                <td className='title-table'>{register.name}</td>
                                <td className='title-table'>{register.state}</td>
                                <td className='title-table'>{register.hourInit}</td>
                                <td className='title-table'>{register.hourEnd}</td>
                                <td className='title-table'>{register.branchOffice}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>       
                </div>     
            
                </div>
            </div>
         );
    }
}
 
export default RegisterCash;