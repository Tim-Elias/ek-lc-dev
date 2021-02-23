import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import './mobile_disp.css';

class Screen extends React.Component {

    back = () => {
        const last_window = this.props.store.general.last_window[this.props.store.general.last_window.length - 1]
        this.props.pop_last_window();
        this.props.set_active_window(last_window);
    }

    open_history = () => {
        this.props.set_disp_history_loading(true)
        this.props.set_disp_show_history(true)
        get_data('history', { Number: this.props.store.disp.data.Number }).then(
            (result) => {
                this.props.set_disp_history(result);
                this.props.set_disp_history_loading(false)
            },
            (err) => { console.log(err) }
        );
    }

    close_history = () => {
        this.props.set_disp_show_history(false)
        this.props.set_disp_history([])
    }

    remove_disp = () => {
        this.props.set_disp_remove_confirm(false)
        this.props.set_disp_show_remove_modal(true)
    }

    close_remove_modal = () => {
        this.props.set_disp_show_remove_modal(false)
        if (this.props.store.disp.remove_confirm) {
            if (this.props.store.general.last_window == 'my_disp') {
                this.props.set_active_window("wait");

                const data = {
                    userkey: this.props.store.login.userkey,
                    date_from: this.props.store.my_disp.date_from,
                    date_to: this.props.store.my_disp.date_to
                }

                get_data('mydisplist', data).then(
                    (result) => {
                        this.props.set_active_window("my_disp");
                        this.props.set_my_disp_data(result);
                    },
                    (err) => { console.log(err) }
                );
            } else {
                this.back()
            }
        }
    }

    confirm_remove_disp = () => {
        this.props.set_disp_remove_modal_loading(true)
        this.props.set_disp_remove_confirm(true)

        const data = {
            userkey: this.props.store.login.userkey,
            Number: this.props.store.disp.data.Number,
        }
        get_data('removedisp', data).then(
            (result) => {

                if (result == 1) {
                    this.props.set_disp_text_remove_modal("Накладная успешно удалена");
                } else {
                    this.props.set_disp_text_remove_modal("Не удалось удалить накладную");
                }

                this.props.set_disp_remove_modal_loading(false)
            },
            (err) => { console.log(err) }
        );
    }

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    render() {

        return (
            <div>
                <div className="mobile_heading">
                    {this.props.store.disp.data.Type} №{this.props.store.disp.data.Number}
                </div>

                <div className="mobile_disp_button">
                    <button className="mobile_disp_button_item" onClick={this.settings_window.bind(this, 'm_delivered')}>Доставлено</button>
                    <button className="mobile_disp_button_item--not mobile_disp_button_item" onClick={this.settings_window.bind(this, 'm_not_delivered')}>Не доставлено</button>
                </div>

                <div className="disp_customer_data">
                    <div className="mobile_disp_data_label">Заказчик:</div>
                    <div className="mobile_disp_data_el">{this.props.store.disp.data.Customer}</div>
                    <div className="mobile_disp_data_label">Срочность:</div>
                    <div className="mobile_disp_data_el">{this.props.store.disp.data.DelType}</div>
                    <div className="mobile_disp_data_label">Тип оплаты:</div>
                    <div className="mobile_disp_data_el">{this.props.store.disp.data.PayType}</div>
                    <div className="mobile_disp_data_label">Ответственный менеджер:</div>
                    <div className="mobile_disp_data_el">{this.props.store.disp.data.Manager}</div>
                    <div className="mobile_disp_data_label">К оплате:</div>
                    <div className="mobile_disp_data_el">{this.props.store.disp.data.COD}</div>
                </div>

                <div className="mobile_disp_address_data">
                    <div className="disp_address_data_header">Данные отправителя</div>

                    <div className="disp_address_data_el">
                        <div className="mobile_disp_data_label"> Город:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.SebdCity}</div>
                        <div className="mobile_disp_data_label"> Адрес:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.SendAdress}</div>
                        <div className="mobile_disp_data_label"> Компания:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.SendCompany}</div>
                        <div className="mobile_disp_data_label"> Телефон:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.SendPhone}</div>
                        <div className="mobile_disp_data_label"> Контактное лицо:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.SendPerson}</div>
                        <div className="mobile_disp_data_label"> Доп. информация:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.SendAddInfo}</div>
                    </div>
                </div>

                <div className="mobile_disp_address_data">
                    <div className="disp_address_data_header">Данные получателя</div>

                    <div className="disp_address_data_el">
                        <div className="mobile_disp_data_label"> Город:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.RecCity}</div>
                        <div className="mobile_disp_data_label"> Адрес:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.RecAdress}</div>
                        <div className="mobile_disp_data_label"> Компания:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.RecCompany}</div>
                        <div className="mobile_disp_data_label"> Телефон:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.RecPhone}</div>
                        <div className="mobile_disp_data_label"> Контактное лицо:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.RecPerson}</div>
                        <div className="mobile_disp_data_label"> Доп. информация:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.RecAddInfo}</div>
                        {this.props.store.login.disp_map ? (<div className="mobile_disp_data_label"> Широта:</div>) : (null)}
                        {this.props.store.login.disp_map ? (<div className="mobile_disp_data_el">{this.props.store.disp.data.Lat}</div>) : (null)}
                        {this.props.store.login.disp_map ? (<div className="mobile_disp_data_label"> Долгота:</div>) : (null)}
                        {this.props.store.login.disp_map ? (<div className="mobile_disp_data_el">{this.props.store.disp.data.Lng}</div>) : (null)}
                    </div>
                </div>

                <div className="mobile_disp_cargo_table">
                    <div className="disp_address_data_header">Отправление:</div>
                    <div className="mobile_disp_cargo_table_data">
                            
                            <div className="disp_address_data_el">
                                
                                <div className="mobile_disp_data_label">Вес</div>
                                <div className="mobile_disp_data_el">{this.props.store.disp.data.Weight}</div>
                                <div className="mobile_disp_data_label">Вид доставки:</div>
                                <div className="mobile_disp_data_el">{this.props.store.disp.data.DelMethod}</div>
                                <div className="mobile_disp_data_label">Рассчетная дата:</div>
                                <div className="mobile_disp_data_el">{this.props.store.disp.data.PlaneDate}</div>

                                <div className="mobile_disp_data_label">Мест:</div>
                                <div className="mobile_disp_data_el">{this.props.store.disp.data.Total}</div>
                                <div className="mobile_disp_data_label">Сумма наложенного платежа:</div>
                                <div className="mobile_disp_data_el">{this.props.store.disp.data.COD}</div>
                                <div className="mobile_disp_data_label">Температурный режим:</div>
                                <div className="mobile_disp_data_el">{this.props.store.disp.data.TMin} : {this.props.store.disp.data.TMax}</div>
                            </div>
                    </div>            
                </div>

                <div className="mobile_disp_address_data">
                    <div className="disp_address_data_header disp_address_data_header--green">Грузы</div>
                    <div className="disp_address_data_el mobile_disp_address_data_el">
                        {this.props.store.disp.cargo.map((cargo, index) =>

                            <div className="cargo_item">
                                <div className="">{cargo.Weight}кг, (Об. {cargo.Volume}кг), ({cargo.L}X{cargo.W}X{cargo.H}) {cargo.Q}шт.<br /> Итого {cargo.TotalWeight}кг,(Об. {cargo.TotalVolume}кг)</div>
                            </div>
                        )}
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