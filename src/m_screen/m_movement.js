import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import './mobile_disp.css';
import './mobile_finance.css';
import check from '../common/check.png';

class Screen extends React.Component {

    componentDidMount() {
        this.update();
    }

    update = () => {
        
        let from = this.props.store.movement.date_start.split("-").reverse().join("-") + "_" + "00:00:00";
        let to = this.props.store.movement.date_end.split("-").reverse().join("-") + "_" + "23:59:59";

        const data = {
            userkey: this.props.store.login.userkey,
            date_from: from,
            date_to: to,
        }
        get_data('cashlist', data).then(
            (result) => {
                this.props.set_balance_start(result.from);
                this.props.set_balance_end(result.to);
                this.props.set_disp_list(result.data);
            },
            (err) => {
                alert("Ошибка!");
                console.log(err);
            }
        );
        
    };

    render() {

        return (
            <div>
                <div className="mobile_heading">
                    Движения ДС
                </div>
                <div className="mobile_container">
                    <div className="finance_row">
                        <input className="mobile_movememt_date" onChange={e => this.props.set_date_start(e.target.value)} value={this.props.store.movement.date_start} type="date" />
                        -
                        <input className="mobile_movememt_date" onChange={e => this.props.set_date_end(e.target.value)} value={this.props.store.movement.date_end} type="date" />
                    </div>
                    <button className="mobile_finance_button--b" onClick={this.update.bind(this)}>Получить данные</button>

                    <div className="finance_row">
                        <div className="finance_item">Остаток на начало</div>
                        <div className="finance_item">{this.props.store.movement.balance_start} руб.</div>
                    </div>

                    <div className="finance_row">
                        <div className="finance_item">Остаток на конец</div>
                        <div className="finance_item">{this.props.store.movement.balance_end} руб.</div>
                    </div>

                    <div className="mobile_disp_address_data">
                        <div className="disp_address_data_header disp_address_data_header">Список</div>
                        <div className="disp_address_data_el mobile_disp_address_data_el">
                        {this.props.store.movement.disp_list.map((item, index) =>
                            <div key={index} className="cargo_item">
                                {item.type} {item.summ} руб.<br />
                                {item.num}<br/>
                                {item.doc}<br />
                                {item.date}<br />
                                {/* <img src={check} className="check" /> */}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_date_start: (param) => { dispatch({ type: 'set_date_start', payload: param }) }, 
        set_date_end: (param) => { dispatch({ type: 'set_date_end', payload: param }) },
        set_balance_start: (param) => { dispatch({ type: 'set_balance_start', payload: param }) },
        set_balance_end: (param) => { dispatch({ type: 'set_balance_end', payload: param }) },
        set_disp_list: (param) => { dispatch({ type: 'set_disp_list', payload: param }) }, 
    })
)(Screen);