import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import './mobile_delivery.css';
import './mobile_disp.css';

class Screen extends React.Component {

    disp_date = (date) => {
        this.props.set_disp_date(date);
    }

    disp_FIO = (fio) => {
        this.props.set_disp_FIO(fio);
    }

    disp_cash = (cash) => {
        this.props.set_disp_cash(cash);
    }

    disp_comment = (comment) => {
        this.props.set_disp_comment(comment);
    }

    render() {

        return (
            <div>
                <div className="mobile_heading">
                    Доставленно
                </div>

                <div className="mobile_disp_button">
                    <button className="mobile_disp_button_item">Доставленно</button>
                    <button className="mobile_disp_button_item--yellow mobile_disp_button_item">Частично доставленно</button>
                </div>

                <div className="mobile_disp_button">
                    <button className="mobile_disp_button_item mobile_disp_button_item--blue">Чек</button>
                </div>

                <div className="mobile_disp_customer_data">
                    <div className="mobile_disp_data_label">Номер накладной:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.Number}</div>
                    <div className="mobile_disp_data_label">Дата доставки</div>
                    <div className="disp_data_input"><input onChange={e => this.props.set_disp_date(e.target.value)} value={this.props.store.disp.delivery_date} className="mobile_disp_input" type="date"></input></div>
                    <div className="mobile_disp_data_label">ФИО получателя</div>
                    <div className="disp_data_input"><input onChange={e => this.props.set_disp_FIO(e.target.value)} value={this.props.store.disp.FIO_Customer} className="mobile_disp_input" type="text"></input></div>
                    <div className="mobile_disp_data_label">Принятая сумма наличных</div>
                    <div className="disp_data_input"><input onChange={e => this.props.set_disp_cash(e.target.value)} value={this.props.store.disp.cash_accepted} className="mobile_disp_input" type="number"></input></div>
                    <div className="mobile_disp_data_label">Комментарий</div>
                    <div className="disp_data_input"><input onChange={e => this.props.set_disp_comment(e.target.value)} value={this.props.store.disp.comment} className="mobile_disp_input" type="text"></input></div>
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
        set_disp_comment: (param) => { dispatch({ type: 'set_disp_comment', payload: param }); },
        set_disp_cash: (param) => { dispatch({ type: 'set_disp_cash', payload: param }); },
        set_disp_FIO: (param) => { dispatch({ type: 'set_disp_FIO', payload: param }); },
        set_disp_date: (param) => { dispatch({ type: 'set_disp_date', payload: param }); },
    })

)(Screen);