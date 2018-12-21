import React,{Component} from 'react';
import Cash from './unityContainer/Cash';

class CashList extends Component {

    render() {
        const arr = this.props.cashs;
        return (
            <div className="cashList">
                {arr.map(cash => 
                    <Cash
                        key = {cash.id}
                        cash = {cash}
                    />
                )}
            </div>
        );
    }
}

export default CashList