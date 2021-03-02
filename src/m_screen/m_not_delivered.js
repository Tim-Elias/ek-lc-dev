import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import './mobile_disp.css';
import Foto from './foto';

class Screen extends React.Component {


    render() {

        return (
            <div>

                <div className="mobile_disp_customer_data">
                    <div className="mobile_del_data_label">Номер накладной:</div>
                    <div className="mobile_del_input">{this.props.store.disp.data.Number}</div>
                    <div className="mobile_del_data_label">Комментарий</div>
                    <input onChange={e => this.props.set_disp_comment(e.target.value)} value={this.props.store.disp.comment} className="mobile_del_input" type="text"></input>
                </div>

                <div className="mobile_container">
                <button className="mobile_disp_button_item--full mobile_disp_button_item--not">Отказ при доставке</button>
                <button className="mobile_disp_button_item--full mobile_disp_button_item--yellow">Отмена заказа</button>
                <button className="mobile_disp_button_item--full mobile_disp_button_item--blue">Недозвон</button>
                <button className="mobile_disp_button_item--full mobile_disp_button_item">Перенос</button>
                <button className="mobile_disp_button_item--full mobile_disp_button_item--not">Нет получателя/Неверный адрес</button>
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
    })

)(Screen);