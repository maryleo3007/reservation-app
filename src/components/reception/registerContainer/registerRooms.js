import React, { Component } from 'react';
import {ref} from './../../../services/firebase';

class RegisterRooms extends Component {
    state = { 
        arrRegisterRooms: undefined
     }

    dbRegisterRoom = ref.child('roomRegister/');

    componentDidMount() {
        this.dbRegisterRoom.on('value', snap => {
            const arrRegisterRooms = [];
            snap.forEach(data => {
                let roomObj = {
                    appointment: data.val().appointment,
                    area: data.val().area,
                    box: data.val().box,
                    commentary: data.val().commentary,
                    date: data.val().date,
                    executiveHour: data.val().executiveHour,
                    finalHour: data.val().finalHour,
                    floor: data.floor,
                    id: data.val().id,
                    idRegRoom: data.val().idRegRoom,
                    person: data.val().person,
                    responsableRegistry: data.val().responsableRegistry,
                    room: data.val().room,
                    startTime: data.val().startTime,
                    team: data.val().team,
                    branchOffice: data.val().branchOffice
                }
                arrRegisterRooms.push(roomObj);
                this.setState({
                    arrRegisterRooms
                })
            })
        })
    }
    
    render() { 
        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50'
        const show = this.props.showComponent ===  'registerRooms' ? 'd-block' : 'd-none'
        if(this.state.arrRegisterRooms === undefined) return null;
        
        return ( 
            <div className={`${marginLeft} ${show} table-hover table-striped w-auto p-4`}>
                <table class="table table-bordered">
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
                        <tr>
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