import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import './mobile_disp.css';
import Wait from "../screen/wait";
import { withCookies } from 'react-cookie';

class Screen extends React.Component {

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    componentDidMount() {

        this.props.cookies.set('window', 'm_disp', { maxAge: 1000000000000 })
        this.props.cookies.set('num', this.props.store.disp.key.num, { maxAge: 1000000000000 })
        this.props.cookies.set('status', this.props.store.disp.key.status, { maxAge: 1000000000000 })

        this.props.set_active_loader(true);

        const data = {
            userkey: this.props.store.login.userkey,
            status: this.props.store.disp.key.status,
            num: this.props.store.disp.key.num,
        };

        get_data('dispatch', data).then(
            (result) => {
                this.props.set_data_disp(result);
                this.props.set_last_window("storage");
                this.props.set_action("deliver");
                this.props.set_active_loader(false);
            },
            (err) => { console.log(err) }
        );
    }

    render() {

        let SendPhoneList = this.props.store.disp.data.SendPhone.split(',');// для нескольких телефонов
        let RecPhoneList = this.props.store.disp.data.RecPhone.split(',');// для нескольких телефонов

        return (
            <div>
                <div className="mobile_heading">
                    {this.props.store.disp.data.Type} №{this.props.store.disp.data.Number}
                </div>

                {this.props.store.general.active_loader ? (<Wait />) : (
                <div>

                    {this.props.store.disp.data.Type === 'Заявка' && this.props.store.disp.data.Status === 'Подтверждено' ? 
                        (<div className="mobile_disp_button">
                            <button className="mobile_disp_button_item mobile_disp_button_item--full">Выполнено</button>
                        </div>)
                    : (null)}

                    {this.props.store.disp.data.Type === 'Заявка' && this.props.store.disp.data.Status === 'Новая' ? 
                        (<div className="mobile_disp_button">
                            {/* <button className="mobile_disp_button_item mobile_disp_button_item--full">Подтвердить</button> */}
                        </div>)
                    : (null)}

                    {this.props.store.disp.data.Type === 'Доставка' ?
                        (<div className="mobile_disp_button">
                            <button className="mobile_disp_button_item" onClick={this.settings_window.bind(this, 'm_delivered')}>Доставлено</button>
                            <button className="mobile_disp_button_item--not mobile_disp_button_item" onClick={this.settings_window.bind(this, 'm_not_delivered')}>Не доставлено</button>
                        </div>)
                    : (null)}

                    

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
                            <div className="mobile_disp_data_el">
                                {SendPhoneList.map((item, index) => 
                                    <div key={index}><a href={"tel:" + item}>{item}</a>{index != SendPhoneList.length - 1 ? (', ') : (null)}</div>
                                )}
                            </div>
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
                            <div className="mobile_disp_data_el">
                                {RecPhoneList.map((item, index) =>
                                    <div key={index}><a href={"tel:" + item}>{item}</a>{index != RecPhoneList.length - 1 ? (', ') : (null)}</div>
                                )}
                            </div>
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
                                    {this.props.store.disp.data.TMin !== "0" && this.props.store.disp.data.TMax !== "0" ? <div>
                                        <div className="mobile_disp_data_label">Температурный режим:</div>
                                        <div className="mobile_disp_data_el">{this.props.store.disp.data.TMin} : {this.props.store.disp.data.TMax}</div>
                                    </div>:(null)}
                                    
                                </div>
                        </div>            
                    </div>

                    <div className="mobile_disp_address_data">
                        <div className="disp_address_data_header disp_address_data_header--green">Грузы</div>
                        <div className="disp_address_data_el mobile_disp_address_data_el">
                            {this.props.store.disp.cargo.map((cargo, index) =>

                                <div key={index} className="cargo_item">
                                    <div className="">{cargo.Weight}кг, (Об. {cargo.Volume}кг), ({cargo.L}X{cargo.W}X{cargo.H}) {cargo.Q}шт.<br /> Итого {cargo.TotalWeight}кг,(Об. {cargo.TotalVolume}кг)</div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>)}

            </div>
        )
    }
};


export default withCookies(connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
        set_last_window: () => { dispatch({ type: 'set_last_window', payload: "storage" }) },
        set_action: (param) => { dispatch({ type: 'set_action', payload: param }) }, 
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }); },
    })

)(Screen));