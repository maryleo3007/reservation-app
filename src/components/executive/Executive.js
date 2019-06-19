import React, { Component } from 'react';
import {ref} from './../../services/firebase';

import './executive.css'

class ExecutiveCapital extends Component {

    dbRoom = ref.child('Room/');

    state = {
        roomList: [],
    };

    componentDidMount(){
        this.dbRoom.on('value', snap => {
            const arrRooms = [];
            snap.forEach(data => {
                let roomObj = {
                    id: data.val().id,
                    state: data.val().state,
                    time: data.val().time,
                    title: data.val().title,
                    floor: data.val().floor,
                    executive: data.val().executive,
                    responsable: data.val().responsable,
                    key: data.key,
                }
                arrRooms.push(roomObj);
                this.setState({
                    roomList: arrRooms
                })
            })
        }) 
    }

    render() { 
        return ( 
            <div className='container-fluid bg-light h-100 p-3'>
                <div className='bg-white main'>
                    <div>
                        Logo y hora
                    </div>
                    <div className='container-fluid px-5'>
                        <div className='row mt-5'>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border border-top border-blue height-18 d-flex align-items-center justify-content-center text-center">
                                <p>holi</p>
                            </div>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-top border-bottom border-right border-blue height-18 d-flex align-items-center justify-content-center text-center">
                                <p>holi</p>
                            </div>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-top border-bottom border-right border-blue height-18 d-flex align-items-center justify-content-center text-center unavailable text-light border-selected intermediate">
                                <p>holi</p>
                            </div>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-top border-bottom border-right border-blue height-18 d-flex align-items-center justify-content-center text-center unavailable text-light border-selected intermediate">
                                <p>holi</p>
                            </div>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-top border-bottom border-right border-blue height-18 d-flex align-items-center justify-content-center text-center">
                                <p>holi</p>
                            </div>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-top border-bottom border-right border-blue height-18 d-flex align-items-center justify-content-center text-center">
                                <p>holi</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-left border-lr-blue border-right border-bottom border-blue height-18 d-flex align-items-center justify-content-center text-center">
                                <p>holi</p>
                            </div>
                            <div class="col-lg-2 bg-light col-xl-2 col-xs-2 col-sm-2 col-md-2 border  border-bottom-0 border-right-0 border-blue height-18 offset-md-left-medium mt-medium d-flex align-items-center d-flex justify-content-center text-center">
                            </div>
                            <div class="col-lg-2 bg-light col-xl-2 col-xs-2 col-sm-2 col-md-2 border-top border-bottom-0 border-right border-blue height-18 mt-medium">
                            </div>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-top border-bottom border-right border-blue height-18 offset-md-right-medium mt-medium d-flex align-items-center justify-content-center text-center">
                                <p>holis</p>
                            </div>
                            <div class="col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-left border-lr-blue border-bottom border-right border-blue height-18 d-flex align-items-center justify-content-center text-center unavailable text-light border-selected">
                                <p>holis</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div class="col-lg-2 bg-light col-xl-2 col-xs-2 col-sm-2 col-md-2 border-left border-right border-bottom-0 border-blue height-18 mt-medium-negative d-flex align-items-center d-flex justify-content-center text-center">
                            </div>
                            <div class="col-lg-2 bg-light col-xl-2 col-xs-2 col-sm-2 col-md-2 border-left border-bottom border-right-0 border-blue height-18 offset-md-left-medium d-flex align-items-center d-flex justify-content-center text-center">
                            </div>
                            <div class="col-lg-2 bg-light col-xl-2 col-xs-2 col-sm-2 col-md-2 border-right border-bottom border-blue height-18 d-flex align-items-center d-flex justify-content-center text-center">
                            </div>
                            <div className='col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-right border-bottom border-blue height-18 offset-md-right-medium d-flex align-items-center justify-content-center text-center'>
                                <p>holiss</p>
                            </div>
                            <div className='col-lg-2 available col-xl-2 col-xs-2 col-sm-2 col-md-2 p-1 border-left border-bottom border-right border-blue border-lr-blue height-18 mt-medium-negative d-flex align-items-center justify-content-center text-center'>
                                <p>holiss</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-2 bg-light col-xl-2 col-xs-2 col-sm-2 col-md-2 border-bottom border-left border-right border-top-0 border-blue height-18 mt-medium-negative'>
                            </div>
                            <div className='offset-lg-8 offset-xl-8 offset-xs-8 offset-sm-8 offset-md-8 col-lg-2 bg-light col-xl-2 col-xs-2 col-sm-2 col-md-2 border-bottom border-top-0 border-left border-right border-blue height-18 mt-medium-negative d-flex align-items-center d-flex justify-content-center text-center'>
                                <p>holiiiss</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='offset-lg-7 offset-xl-7 offset-xs-7 offset-sm-7 offset-md-7 col-lg-2 bg-white col-xl-2 col-xs-2 col-sm-2 col-md-2 border border-top-0 border-left-0 bg-gray height-2 mt-5 mb-2 bw'>
                            </div>
                            <div className='col-lg-1 bg-white col-xl-1 col-xs-1 col-sm-1 col-md-1 border-0  height-2 mt-3 mb-2 text-center bg-gray'>
                                <i _ngcontent-c2="" aria-hidden="true" class="fa fa-caret-up fa-4x"></i>
                            </div>
                            <div className='col-lg-2 bg-white col-xl-2 col-xs-2 col-sm-2 col-md-2 border border-top-0 border-right-0 bg-gray height-2 mt-5 mb-2 bw'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ExecutiveCapital;