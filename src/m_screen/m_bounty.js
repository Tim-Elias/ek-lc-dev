import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import './mobile_disp.css';
import './mobile_finance.css';

class Screen extends React.Component {

    componentDidMount() {
        this.update();
    }

    update = () => {
        // this.props.set_active_window("wait");
        let from = this.props.store.movement.date_start.split("-").reverse().join("-") + "_" + "00:00:00";
        let to = this.props.store.movement.date_end.split("-").reverse().join("-") + "_" + "23:59:59";

        const data = {
            userkey: this.props.store.login.userkey,
            date_from: from,
            date_to: to,
        }
        get_data('profitlist', data).then(
            (result) => {
                this.props.set_profit_for_period(result.total);
                this.props.set_disp_list(result.data);
            },
            (err) => {
                alert("Ошибка!");
                console.log(err)
            }
        );
    };

    render() {

        return (
            <div>
                <div className="mobile_heading">
                    Вознаграждение
                </div>
                <div className="mobile_container">
                    <div className="finance_row">
                        <input className="mobile_movememt_date" onChange={e => this.props.set_date_start(e.target.value)} value={this.props.store.movement.date_start} type="date"></input>
                        -
                        <input className="mobile_movememt_date" onChange={e => this.props.set_date_end(e.target.value)} value={this.props.store.movement.date_end} type="date"></input>
                    </div>
                    <button className="mobile_finance_button--b" onClick={this.update.bind(this)}>Получить данные</button>

                    <div className="finance_row">
                        <div className="finance_item">Начислено за период</div>
                        <div className="finance_item">{this.props.store.movement.profit_for_period} руб.</div>
                    </div>

                    <div className="mobile_disp_address_data">
                        <div className="disp_address_data_header disp_address_data_header">Список</div>
                        <div className="disp_address_data_el mobile_disp_address_data_el">
                        {this.props.store.movement.disp_list.map((item, index) =>
                            <div key={index} className="cargo_item">
                                {item.customer} <br/>
                                {item.doc} <br />
                                {item.date} <br/>
                                {item.city} {item.address}<br/>
                                {item.disp}<br/><br/>
                                Начислено: {item.summ} руб.<br/>
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
        set_date_start: (param) => { dispatch({ type: 'set_date_start', payload: param }) },
        set_date_end: (param) => { dispatch({ type: 'set_date_end', payload: param }) },
        set_profit_for_period: (param) => { dispatch({ type: 'set_profit_for_period', payload: param }) }, 
        set_disp_list: (param) => { dispatch({ type: 'set_disp_list', payload: param }) }, 
    })

)(Screen);