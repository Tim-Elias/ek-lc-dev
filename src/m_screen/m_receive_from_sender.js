import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import './mobile_delivery.css';
import './mobile_disp.css';
import './popup.css';
import Foto from './foto';
import Wait from "../screen/wait";
import { withCookies } from 'react-cookie';
import CheckPrint from './m_check_print';
import DispPrint from './m_disp_print_signature';

class Screen extends React.Component {

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    componentDidMount() {
        this.props.set_disp_cash(this.props.store.disp.data.COD);
        this.props.reset_check_data();

        const today = new Date()
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        const y = today.getFullYear();

        if (mm < 10) { mm = '0' + mm }
        if (dd < 10) { dd = '0' + dd }

        const date = y + '-' + mm + '-' + dd;
        this.props.set_disp_date(date);

        let H = today.getHours();
        let M = today.getMinutes();

        if (H < 10) { H = '0' + H }
        if (M < 10) { M = '0' + M }

        const time = H + ':' + M;
        this.props.set_disp_time(time);
    }

    componentWillUnmount() {
        this.props.reset_data();
    }

    reciept = () => {
        this.props.set_active_window("wait");
        let barcode = this.props.store.disp.foto.split(',').pop();
        const data = {
            userkey: this.props.store.login.userkey,
            num: this.props.store.disp.data.Number,
            date: this.props.store.disp.delivery_date,
            time: this.props.store.disp.delivery_time,
            terminal: this.props.store.disp.type_cash,
            summ: this.props.store.disp.cash_accepted,
            img: barcode,
        }
        get_data('getdispatch', data).then(
            (result) => {
                this.props.set_popup_message(`Накладная ${this.props.store.disp.data.Number} успешно принята от отправителя`);
                this.props.set_active_window("reciept");
            },
            (err) => {
                this.props.set_popup_message("Не удалось принять накладную");
                this.props.set_active_window("m_disp");
                console.log(err)
            }
        );

    }

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
                        if (result == '') {
                            this.props.set_popup_message('ККМ Сервер недоступен :(');
                        } else {
                            this.props.check_disable();
                            this.props.set_print_check_disabled(false);
                            this.props.set_QR(result);
                            this.props.set_popup_message("Чек пробит успешно!");

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

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file);
        reader.onloadend = () => {
            this.props.take_foto(reader.result);
        }
        reader.readAsDataURL(file);
    }

    render() {

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            this.settings_window('m_disp')
            window.history.pushState(null, "", window.location.href);
        }.bind(this);

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
                            <button className="mobile_disp_button_item mobile_disp_button_item--full" onClick={this.reciept.bind(this)}>Получить от отправителя</button>
                        </div>

                        {+this.props.store.disp.cash_accepted > 0 && this.props.store.login.kkm && this.props.store.disp.data.CheckEnabled && this.props.store.disp.data.ChangeSumm == false ? (
                            <div className="mobile_disp_button">
                                <button className="mobile_disp_button_item mobile_disp_button_item--blue" onClick={this.receipt.bind(this)}>
                                    Чек
                                </button>
                            </div>
                        ) : (null)}

                        {this.props.store.disp.data.ChangeSumm === false ? (<CheckPrint />) : (null)}
                        {this.props.store.login.original_data.print_ticket ? (<DispPrint />) : (null)}

                        <div className="mobile_container">
                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Номер накладной:</div>
                                <div className="mobile_del_input">{this.props.store.disp.data.Number}</div>
                            </div>

                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Дата доставки</div>
                                <input onChange={e => this.props.set_disp_date(e.target.value)} value={this.props.store.disp.delivery_date} className="mobile_del_input" type="date"></input>
                            </div>

                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Время доставки</div>
                                <input onChange={e => this.props.set_disp_time(e.target.value)} value={this.props.store.disp.delivery_time} className="mobile_del_input" type="time"></input>
                            </div>

                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Тип оплаты</div>
                                <select onChange={e => { this.props.set_disp_type_cash(e.target.value) }}>
                                    <option value={false}>Наличные</option>
                                    <option value={true}>Безналичный</option>
                                </select>
                            </div>

                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Принятая сумма</div>
                                <input className="mobile_del_input" value={this.props.store.disp.cash_accepted} onChange={e => this.props.set_disp_cash(e.target.value)} type="number"></input>
                            </div>

                        </div>
                        <div className="mobile_container">
                            <label className="camera_button">
                                <span>Добавить фото</span>
                                <input className="file" type="file" accept="image/jpeg" onChange={e => this._handleImageChange(e)} />
                            </label>
                            <img
                                className="foto"
                                src={this.props.store.disp.foto}
                            />
                        </div>
                        {/* <Foto /> */}
                    </div>
                )}
            </div>
        )
    }
};


export default withCookies(connect(
    state => ({
        store: state
    }),
    dispatch => ({
        take_foto: (param) => { dispatch({ type: 'set_disp_foto', payload: param }) },
        reset_data: (param) => { dispatch({ type: 'reset_data', payload: param }); },
        set_print_check_disabled: (param) => { dispatch({ type: 'set_print_check_disabled', payload: param }); },
        set_QR: (param) => { dispatch({ type: 'set_QR', payload: param }); },
        set_check_data: (param) => { dispatch({ type: 'set_check_data', payload: param }); },
        reset_check_data: (param) => { dispatch({ type: 'reset_check_data', payload: param }); },
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
        set_popup_message: (param) => { dispatch({ type: 'set_popup_message', payload: param }); },
    })

)(Screen));