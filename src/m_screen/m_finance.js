import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import './mobile_disp.css';
import './mobile_finance.css';

class Screen extends React.Component {

    active_window = (window) => {
        this.props.set_active_window(window);
    }

    render() {

        return (
            <div>
                <div className="mobile_heading">
                    Финансы
                </div>
                <div className="mobile_container">
                    <div className="finance_row">
                        <div className="finance_item">Баланс:</div>
                        <div className="finance_item">1000</div>
                    </div>
                    <div className="finance_row">
                        <button className="mobile_finance_button" onClick={this.active_window.bind(this, 'm_movement')}>Движения</button>
                        <button className="mobile_finance_button">Обновить</button>
                    </div>

                    <div className="finance_row">
                        <div className="finance_item">Начислено:</div>
                        <div className="finance_item">100.00</div>
                    </div>
                    <div className="finance_row">
                        <button className="mobile_finance_button" onClick={this.active_window.bind(this, 'm_bounty')}>Движения</button>
                        <button className="mobile_finance_button">Обновить</button>
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
    })

)(Screen);