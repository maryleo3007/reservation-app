import React,{Component} from 'react';
import Cash from './Cash';

class CashList extends Component {

    render() {
        return (
            <div className="row">
                {this.props.cashs.map(cash => 
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