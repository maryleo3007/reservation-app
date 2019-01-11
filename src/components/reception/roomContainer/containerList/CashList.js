import React,{Component} from 'react';
import Cash from './unityContainer/Cash';

class CashList extends Component {

    render() {
        const arr = this.props.cashs;
        console.log(this.props.cashs.key)
        return (
            <div className="cashList">
                {arr.map(cash => 
                    <Cash
                        onToggleForm={() =>{this.props.onToggleForm(cash.id)}}
                        key = {cash.id}
                        cash = {cash}
                    />
                )}
            </div>
        );
    }
}

export default CashList