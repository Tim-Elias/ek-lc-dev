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
                    Движения ДС
                </div>
                <div className="mobile_container">
                    <div className="finance_row">
                        <input className="mobile_movememt_date" type="date"></input>
                        <input className="mobile_movememt_date" type="date"></input>
                    </div>
                    <button className="mobile_finance_button--b">Получить данные</button>
                    <div className="finance_row">
                        <div className="finance_item">Остаток на начало</div>
                        <div className="finance_item">0.00</div>
                    </div>

                    <div className="mobile_disp_address_data">
                        <div className="disp_address_data_header disp_address_data_header">Список</div>
                        <div className="disp_address_data_el mobile_disp_address_data_el">

                            <div className="">
                                <p>Доставка накладной получателю</p>
                                <p>000370727</p>
                                <p>25.02.2021 14:43:49 123123123123</p>
                            </div>

                        </div>
                    </div>

                    <div className="finance_row">
                        <div className="finance_item">Остаток на конец</div>
                        <div className="finance_item">1000.00</div>
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

    })

)(Screen);