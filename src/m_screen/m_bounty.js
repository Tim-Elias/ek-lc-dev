import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import './mobile_disp.css';
import './mobile_finance.css';

class Screen extends React.Component {


    render() {

        return (
            <div>
                <div className="mobile_heading">
                    Вознаграждение
                </div>
                <div className="mobile_container">
                    <div className="finance_row">
                        <input className="mobile_movememt_date" type="date"></input>
                        <input className="mobile_movememt_date" type="date"></input>
                    </div>
                    <button className="mobile_finance_button--b">Получить данные</button>

                    <div className="mobile_disp_address_data">
                        <div className="disp_address_data_header disp_address_data_header">Список</div>
                        <div className="disp_address_data_el mobile_disp_address_data_el">

                            <div className="cargo_item">
                                Доставка накладной получателю<br/>
                                000370727<br />
                                25.02.2021 14:43:49 123123123123<br />
                            </div>

                        </div>
                    </div>

                    <div className="finance_row">
                        <div className="finance_item">Начислено за период</div>
                        <div className="finance_item">{this.props.store.movement.cash_for_period}</div>
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
    })

)(Screen);