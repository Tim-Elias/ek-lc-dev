import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import './mobile_delivery.css';
import './mobile_disp.css';
import './popup.css';
import Foto from './foto';
import Wait from "../screen/wait";

import CheckPrint from './m_check_print'

class Screen extends React.Component {

    sendpod = (type) => {
        this.props.set_active_window("wait");
        let barcode = this.props.store.disp.foto.split(',').pop();
        const data = {
            userkey: this.props.store.login.userkey,
            num: this.props.store.disp.data.Number,
            date: this.props.store.disp.delivery_date,
            time: this.props.store.disp.delivery_time,
            summ: this.props.store.disp.cash_accepted,
            comment: this.props.store.disp.comment,
            rec: this.props.store.disp.FIO_Customer,
            terminal: this.props.store.disp.type_cash,
            img: barcode,
            partially: type,
        }
        get_data('delivered', data).then(
            (result) => {

                const list_data = { userkey: this.props.store.login.userkey };

                get_data('list', list_data).then(
                    (result) => {
                        alert("Данные отправлены!")
                        this.props.set_active_window("m_storage");
                    },
                    (err) => { 
                        console.log(err);
                        alert("Ошибка!");
                    }
                );
            },
            (err) => {
                this.props.set_active_window("m_disp");
                alert("Ошибка!");
                console.log(err)
            }
        );
    };

    receipt = () => {
        this.props.set_popup(!(this.props.store.disp.popup));
    }
    
    createcheck = () => {
        this.props.set_popup(false);
        this.props.set_active_loader(true);

        const data =
        {
            userkey: this.props.store.login.userkey,
            summ: this.props.store.disp.cash_accepted,
            terminal: this.props.store.disp.type_cash,
            num: this.props.store.disp.data.Number,
        }
        get_data('createcheck', data).then(
            (result) => {

                const list_data = { userkey: this.props.store.login.userkey };

                get_data('list', list_data).then(
                    (result) => {
                        this.props.set_active_loader(false);
                        if(result == '') {
                            alert('ККМ Сервер недоступен :(')
                        } else {
                            this.props.check_disable();
                            this.props.set_print_check_disabled(false)
                            this.props.set_QR(result)
                            alert("Чек пробит успешно!");
                            // get_data()

                            const check_data = {
                                userkey: this.props.store.login.userkey,
                                num: this.props.store.disp.data.Number,

                            }

                            get_data('getcheck', check_data).then(
                                (result) => {
                                    console.log(result)
                                    this.props.set_check_data(result);
                                },
                                (err) => {

                                    console.log(err)
                                }
                            );
                        }
                        
                    },
                    (err) => {
                        this.props.set_active_loader(false);
                        console.log(err);
                        alert(err);
                    }
                );
            },
            (err) => {
                this.props.set_active_window("m_disp");
                alert(err);
                console.log(err)
            }
        );
    }

    componentDidMount() {
        this.props.set_disp_cash(this.props.store.disp.data.COD);
    }

    componentWillUnmount() {
        this.props.set_disp_FIO('');
        this.props.set_disp_comment('');
    }


    render() {

        return (
            <div>
                

                <div className={this.props.store.disp.popup ? "PopUp_container" : "none"} onClick={this.receipt.bind(this)}></div>
                <div className={this.props.store.disp.popup ? "PopUp_window" : "none"}>
                    <p>Вы точно хотите распечатать чек?</p>
                    <div className="PopUp_date">
                        <div>Номер накладной: {this.props.store.disp.data.Number}</div>
                        <div>Тип оплаты: {this.props.store.disp.type_cash ? "Безналичные" : "Наличные"}</div>
                        <div>Сумма: {this.props.store.disp.cash_accepted} руб.</div>
                    </div>
                    <div className="PopUp_button_container">
                        <button className="PopUp_button" onClick={this.createcheck.bind(this)}>Да</button>
                        <button className="PopUp_button" onClick={this.receipt.bind(this)}>Нет</button>
                    </div>
                </div>

                {this.props.store.general.active_loader ? (<Wait />) : (
                <div>
                    <div className="mobile_disp_button">
                        <button className={+this.props.store.disp.cash_accepted !== +this.props.store.disp.data.COD ? ("none") : ("mobile_disp_button_item")} onClick={this.sendpod.bind(this, false)}>Доставленно</button>
                        <button className={+this.props.store.disp.cash_accepted !== +this.props.store.disp.data.COD ? ("mobile_disp_button_item--nonactive") : ("none")}>Доставленно</button>
                        <button className="mobile_disp_button_item--yellow mobile_disp_button_item" onClick={this.sendpod.bind(this, true)}>Частично доставленно</button>
                    </div>

                    <div className="mobile_disp_button">
                        <button className={+this.props.store.disp.cash_accepted > 0 && this.props.store.login.kkm && this.props.store.disp.data.CheckEnabled ? "mobile_disp_button_item mobile_disp_button_item--blue" : "none"} onClick={this.receipt.bind(this)}>Чек</button>
                           
                    </div>

                        <div className="mobile_disp_button">
                        <CheckPrint /> 
                               {/* <button className="mobile_disp_button_item mobile_disp_button_item--blue" disabled={this.props.store.disp.print_check_disabled}>Печать чека</button> */}
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
                            <option value={false}>Наличные</option>
                            <option value={true}>Безналичный</option>
                        </select>
                        <div className="mobile_del_data_label">Принятая сумма</div>
                        <input value={this.props.store.disp.cash_accepted} onChange={e => this.props.set_disp_cash(e.target.value)} className="mobile_del_input" type="number"></input>
                        <div className="mobile_del_data_label">Комментарий</div>
                        <input onChange={e => this.props.set_disp_comment(e.target.value)} value={this.props.store.disp.comment} className="mobile_del_input" type="text"></input>
                    </div>

                    <Foto />
                </div>
                )}
            </div>
        )
    } 
};


export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        
        set_print_check_disabled: (param) => { dispatch({ type: 'set_print_check_disabled', payload: param }); },
        set_QR: (param) => { dispatch({ type: 'set_QR', payload: param }); },
        set_check_data: (param) => { dispatch({ type: 'set_check_data', payload: param }); },
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }); },
        set_disp_comment: (param) => { dispatch({ type: 'set_disp_comment', payload: param }); },
        check_disable: () => { dispatch({ type: 'check_disable' }); },
        set_disp_cash: (param) => { dispatch({ type: 'set_disp_cash', payload: param }); },
        set_disp_FIO: (param) => { dispatch({ type: 'set_disp_FIO', payload: param }); },
        set_disp_date: (param) => { dispatch({ type: 'set_disp_date', payload: param }); },
        set_disp_time: (param) => { dispatch({ type: 'set_disp_time', payload: param }); },
        set_disp_type_cash: (param) => { dispatch({ type: 'set_disp_type_cash', payload: param }); }, 
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_popup: (param) => { dispatch({ type: 'set_popup', payload: param }); }, 
    })

)(Screen);