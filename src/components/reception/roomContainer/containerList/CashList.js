import React,{Component} from 'react';
import Cash from './unityContainer/Cash';

class CashList extends Component {

    render() {
        const arr = this.props.cashs;
        return (
            <div className="cashList">
                {arr.map(cash => 
                    <Cash
                        onToggleForm={() =>{this.props.onToggleForm(cash.id)}}
                        key = {cash.id}
                        cash = {cash}
                        showRoom = {this.props.showRoom}
                    />
                )}
            </div>
        );
    }
}

export default CashList