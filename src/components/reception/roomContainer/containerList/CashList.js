import React,{Component} from 'react';
import Cash from './unityContainer/Cash';

class CashList extends Component {

    render() {
        
        return (
            <div className="cashList">
                {this.props.cashs.map(cash => 
                    <Cash
                        //onToggleForm={() =>{this.props.onToggleForm(cash.id,cash.key)}}
                        //changeCashComponent = {()=>{this.props.changeCashComponent(cash.key,!cash.showComponent)}}
                        //changeCashState = {this.props.changeCashState}
                        key = {cash.key}
                        cash = {cash}
                        showHideFormArr = {this.props.showHideFormArr[cash.order]}
                        showHideForm = {this.props.showHideForm}
                        changeToGreenOrAmberCash = {this.props.changeToGreenOrAmberCash}
                        datauser = {this.props.datauser}
                    />
                )}
            </div>
        );
    }
}

export default CashList