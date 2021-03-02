import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import './mobile_delivery.css';
import './mobile_disp.css';
import Foto from './foto';

class Screen extends React.Component {

    render() {

        return (
            <div>

                <div className="mobile_disp_button">
                    <button className="mobile_disp_button_item">Доставленно</button>
                    <button className="mobile_disp_button_item--yellow mobile_disp_button_item">Частично доставленно</button>
                </div>

                <div className="mobile_disp_button">
                    <button className="mobile_disp_button_item mobile_disp_button_item--blue">Чек</button>
                </div>

                <div className="mobile_disp_customer_data">
                    <div className="mobile_del_data_label">Номер накладной:</div>
                    <div className="mobile_del_input">{this.props.store.disp.data.Number}</div>
                    <div className="mobile_del_data_label">Дата доставки</div>
                    <input onChange={e => this.props.set_disp_date(e.target.value)} value={this.props.store.disp.delivery_date} className="mobile_del_input" type="date"></input>
                    <div className="mobile_del_data_label">Время доставки</div>
                    <input onChange={e => this.props.set_disp_time(e.target.value)} value={this.props.store.disp.delivery_time} className="mobile_del_input" type="time"></input>
                    <div className="mobile_del_data_label">ФИО получателя</div>
                    <input onChange={e => this.props.set_disp_FIO(e.target.value)} value={this.props.store.disp.FIO_Customer} className="mobile_del_input" type="text"></input>
                    <div className="mobile_del_data_label">Тип оплаты</div>
                    <select onChange={e => { this.props.set_disp_type_cash(e.target.value)}}>
                        <option value="cash">Наличные</option>
                        <option value="cashless">Безналичный</option>
                    </select>
                    <div className="mobile_del_data_label">Принятая сумма</div>
                    <input onChange={e => this.props.set_disp_cash(e.target.value)} value={this.props.store.disp.cash_accepted} className="mobile_del_input" type="number"></input>
                    <div className="mobile_del_data_label">Комментарий</div>
                    <input onChange={e => this.props.set_disp_comment(e.target.value)} value={this.props.store.disp.comment} className="mobile_del_input" type="text"></input>
                </div>

                <Foto />

            </div>
        )
    } 
};


export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_disp_comment: (param) => { dispatch({ type: 'set_disp_comment', payload: param }); },
        set_disp_cash: (param) => { dispatch({ type: 'set_disp_cash', payload: param }); },
        set_disp_FIO: (param) => { dispatch({ type: 'set_disp_FIO', payload: param }); },
        set_disp_date: (param) => { dispatch({ type: 'set_disp_date', payload: param }); },
        set_disp_time: (param) => { dispatch({ type: 'set_disp_time', payload: param }); },
        set_disp_type_cash: (param) => { dispatch({ type: 'set_disp_type_cash', payload: param }); }, 
    })

)(Screen);