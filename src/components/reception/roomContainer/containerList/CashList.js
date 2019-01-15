import React,{Component} from 'react';
import Cash from './unityContainer/Cash';

class CashList extends Component {
    

    render() {
        return (
            <div className="cashList">
                {this.props.cashs.map(cash => 
                    <Cash
                        onToggleForm={() =>{this.props.onToggleForm(cash.id,cash.key)}}
                        // changeCashState = {()=>{this.props.changeCashState(cash.key,2)}}
                        key = {cash.id}
                        cash = {cash}
                    />
                )}
            </div>
        );
    }
}

export default CashList