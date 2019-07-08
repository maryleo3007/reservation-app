import React, { Component } from 'react';
import {ref} from './../../../services/firebase';
import { getDateFull, getDateFormat } from './../../helpers/date';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import axios from "axios";
registerLocale('es', es)

class RegisterRooms extends Component {
    state = { 
        arrRegisterRooms: [],
        startDate: new Date(),
        endDate: new Date()
     }

    componentDidMount() {
        let todayini = getDateFull();
        let url = `https://us-central1-recepcion-prod.cloudfunctions.net/register_room?fechaini=${todayini}&&fechafin=${todayini}`;
        
        axios.get(url)
        .then(res => {
            const arrRegisterRooms = res.data;
            this.setState({ arrRegisterRooms });
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
        
        let startDate = getDateFormat(p_startDate);
        let endDate = getDateFormat(p_endDate)
        let url = `https://us-central1-recepcion-prod.cloudfunctions.net/register_room?fechaini=${startDate}&&fechafin=${endDate}`;
        
        axios.get(url)
        .then(res => {
            const arrRegisterRooms = res.data;
            this.setState({ arrRegisterRooms });
        }) 
         
    }

    
    render() { 
        if(this.state.arrRegisterRooms === undefined) return null;

        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50'
        const show = this.props.showComponent ===  'registerRooms' ? 'd-block' : 'd-none'
        
        
        return ( 
            <div className={`${marginLeft} ${show} table-hover table-striped w-auto p-4`}>
                <div className="f-date p-3 mb-4">
                     <div className="row">
                         <div className="col-4">
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
                         <div className="col-4">
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
                     </div>
                 </div>
                 
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className='title-table'>Sala</th>
                            <th scope="col" className='title-table'>Responsable</th>
                            <th scope="col" className='title-table'>Fecha</th>
                            <th scope="col" className='title-table'>Hora de Ingreso del cliente</th>
                            <th scope="col" className='title-table'>Hora de ingreso del AF</th>
                            <th scope="col" className='title-table'>Hora de Salida del Cliente</th>
                            <th scope="col" className='title-table'>Equipo</th>
                            <th scope="col" className='title-table'>Persona</th>
                            <th scope="col" className='title-table'>Uso de caja y sala</th>
                            <th scope="col" className='title-table'>Cita</th>
                            <th scope="col" className='title-table'>Oficina</th>
                            <th scope="col" className='title-table'>Comentario</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.arrRegisterRooms.map(register => 
                        <tr key = {register.id}>
                            <td className='title-table'>{register.room}</td>
                            <td className='title-table'>{register.responsableRegistry}</td>
                            <td className='title-table'>{register.date}</td>
                            <td className='title-table'>{register.startTime}</td>
                            <td className='title-table'>{register.executiveHour}</td>
                            <td className='title-table'>{register.finalHour}</td>
                            <td className='title-table'>{register.team}</td>
                            <td className='title-table'>{register.person}</td>
                            <td className='title-table'>{register.box}</td>
                            <td className='title-table'>{register.appointment}</td>
                            <td className='title-table'>{register.branchOffice}</td>
                            <td className='title-table'>{register.commentary}</td>
                        </tr>
                    )}
                        
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default RegisterRooms;