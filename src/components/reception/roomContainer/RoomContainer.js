import React,{Component} from 'react';
import CashList from './containerList/CashList';
import RoomList from './containerList/RoomsList';
import FormsContainer from './formsContainer.js/FormsContainer';
import PropTypes from 'prop-types';

class RoomContainer extends Component {

    state = {
        shownCashOne:false,
        shownCashTwo:false
    }

    onToggleForm = (id) => {
        if (id === 1) {
            this.setState({shownCashOne: !this.state.shownCashOne})
        }
        if (id === 2) {
            this.setState({shownCashTwo: !this.state.shownCashTwo})
        }
    }

    render() {
        const cashArr = this.props.cashs.sort(function(a, b) {
            return a.id - b.id;
        });

        const marginLeft = this.props.sidebarState ? 'margin-250' : 'margin-50'
        return (
            
            <div className={`room-container container ${marginLeft}`}>
                <div className="row mt-5">
                    <div className="col-7">
                        <div className="roomsList-container bg-white">
                            <div className="roomlist-container container-fluid">
                                <RoomList
                                    rooms = {this.props.rooms}  
                                />
                            </div>
                            <div className="cashRoomlist-container col-lg-3 col-md-3">
                                <CashList
                                    cashs = {cashArr}
                                    onToggleForm = {this.onToggleForm}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="bg-white">
                            <FormsContainer 
                                rooms = {this.props.rooms}
                                objRegister = {this.props.objRegister} 
                                changeState = {this.props.changeState}
                                addRegister = {this.props.addRegister}
                                responsable = {this.props.responsable}
                                cashs = {cashArr}
                                shownCashOne = {this.state.shownCashOne}
                                shownCashTwo = {this.state.shownCashTwo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RoomContainer.propTypes = {
    changeState: PropTypes.func,
    addRegister: PropTypes.func,
    showRoom: PropTypes.bool,
    responsable: PropTypes.shape({
        authed: PropTypes.boolean,
        loading: PropTypes.boolean,
        uid: PropTypes.string,
        user: PropTypes.string
    }),
    rooms: PropTypes.array
};


export default RoomContainer