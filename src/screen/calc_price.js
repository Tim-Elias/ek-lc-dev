import React from 'react';
import { connect } from 'react-redux';
import { get_data } from './../common/common_modules';
import { Button } from 'semantic-ui-react';
import Select from 'react-select';
import './home_ek.css';
import { calcPriceStyle } from "./../common/calc_price_style";
import Wait from "./wait";

class Screen extends React.Component {

    componentDidMount() {

        get_data('citylist').then(
            (result) => {
                this.props.SetCityList(result);
            },
            (err) => { 
                console.log(err) 
                this.props.modules.set_modal_show(true)
                this.props.modules.set_modal_header('Ошибка')
                this.props.modules.set_modal_text(err)
            }
            
        );
    }

    componentWillUnmount() {
        this.props.clean_calc_priсe();
    }

    SelectSendCity = (value) => {
        this.props.set_calc_price_send_terminal_city(false)
        this.props.set_calc_price_send_terminal(false)
        this.props.set_calc_price_send_city(value)

        const city = value.label

        get_data('terminallist', { city: city, userkey: this.props.store.login.userkey }).then(
            (result) => {

                this.props.set_calc_price_send_terminal_list(result)
                if (result.length === 0) {
                    this.props.set_calc_price_send_terminal_city(false)
                    this.props.set_calc_price_send_terminal(false)
                } else {
                    this.props.set_calc_price_send_terminal_city(true)
                    this.props.set_calc_price_select_send_terminal(result[0])
                }

            },
            (err) => {
                console.log("err", err)
                this.props.modules.set_modal_show(true)
                this.props.modules.set_modal_header('Ошибка')
                this.props.modules.set_modal_text(err)
            }
        );
    }

    SelectRecCity = (value) => {
        this.props.set_calc_price_rec_terminal_city(false)
        this.props.set_calc_price_rec_terminal(false)
        this.props.set_calc_price_rec_city(value)

        const city = value.label

        get_data('terminallist', { city: city, userkey: this.props.store.login.userkey }).then(
            (result) => {

                this.props.set_calc_price_rec_terminal_list(result)
                if (result.length === 0) {
                    this.props.set_calc_price_rec_terminal_city(false)
                    this.props.set_calc_price_rec_terminal(false)
                } else {
                    this.props.set_calc_price_rec_terminal_city(true)
                    this.props.set_calc_price_select_rec_terminal(result[0])
                }

            },
            (err) => {
                console.log("err", err)
                this.props.modules.set_modal_show(true)
                this.props.modules.set_modal_header('Ошибка')
                this.props.modules.set_modal_text(err)
            }
        );
    }

    CalcPrice = () => {

        const calcPriceData = {
            userkey: this.props.store.login.userkey,
            SendCity: this.props.store.calc_price.calc_price_send_city.label,
            SendTerminal: this.props.store.calc_price.calc_price_send_terminal,
            RecCity: this.props.store.calc_price.calc_price_rec_city.label,
            RecTerminal: this.props.store.calc_price.calc_price_rec_terminal,
            Volume: (this.props.store.calc_price.calc_price_l * this.props.store.calc_price.calc_price_w * this.props.store.calc_price.calc_price_h / 5000),
            Weight: this.props.store.calc_price.calc_price_weight === "" ? (0) : (this.props.store.calc_price.calc_price_weight),
        }

        get_data('customercalc', calcPriceData).then(
            (result) => {
                this.props.set_calc_price_result(result);
            },
            (err) => {
                this.props.set_calc_price_result("Не удалось рассчитать");
                this.props.modules.set_modal_show(true)
                this.props.modules.set_modal_header('Ошибка')
                
                console.log(err)
                this.props.modules.set_modal_text(err)
            }
        );
    }

    render() {

        return (
            <div>

                <div className="calc_price_container">

                    <div className="calc_price_row">
                        <div className="calc_price_label">Город отправления:</div>
                        
                        <Select
                            value={this.props.store.calc_price.calc_price_send_city}
                            options={this.props.store.create_disp.CityList}
                            styles={calcPriceStyle}
                            onChange={(values) => this.SelectSendCity(values)}
                            placeholder=" "
                        />
                    </div>

                    <div className="calc_price_row">
                        <div className="calc_price_label">Отправка со склада:</div>

                        <input type="radio" className="calc_price_input calc_price_input--checkbox" checked={this.props.store.calc_price.calc_price_send_terminal} onChange={() => this.props.set_calc_price_send_terminal(true)} disabled={!this.props.store.calc_price.calc_price_send_terminal_city} />
                    </div>

                    <div className="calc_price_row">
                        <div className="calc_price_label">Отправка с адреса:</div>

                        <input type="radio" className="calc_price_input calc_price_input--checkbox" checked={!this.props.store.calc_price.calc_price_send_terminal} onChange={() => this.props.set_calc_price_send_terminal(false)} disabled={!this.props.store.calc_price.calc_price_send_terminal_city} />
                    </div>

                    {this.props.store.calc_price.calc_price_send_terminal ? (
                        <div className="calc_price_row">
                            <div className="calc_price_label">Адрес склада:</div>

                            <input type="text" className="calc_price_input calc_price_input" value={this.props.store.calc_price.calc_price_send_terminal_list[0].label} disabled />
                        </div>
                    ) : (null)}

                    <div className="calc_price_row">
                        <div className="calc_price_label">Город назначения:</div>

                        <Select
                            value={this.props.store.calc_price.calc_price_rec_city}
                            options={this.props.store.create_disp.CityList}
                            styles={calcPriceStyle}
                            onChange={(values) => this.SelectRecCity(values)}
                            placeholder=" "
                        />
                    </div>

                    <div className="calc_price_row">
                        <div className="calc_price_label">Получение на складе:</div>

                        <input type="radio" className="calc_price_input calc_price_input--checkbox" checked={this.props.store.calc_price.calc_price_rec_terminal} onChange={() => this.props.set_calc_price_rec_terminal(true)} disabled={!this.props.store.calc_price.calc_price_rec_terminal_city} />
                    </div>

                    <div className="calc_price_row">
                        <div className="calc_price_label">Получение с адреса:</div>

                        <input type="radio" className="calc_price_input calc_price_input--checkbox" checked={!this.props.store.calc_price.calc_price_rec_terminal} onChange={() => this.props.set_calc_price_rec_terminal(false)} disabled={!this.props.store.calc_price.calc_price_rec_terminal_city} />
                    </div>

                    {this.props.store.calc_price.calc_price_rec_terminal ? (
                        <div className="calc_price_row">
                            <div className="calc_price_label">Адрес склада:</div>

                            <input type="text" className="calc_price_input calc_price_input" value={this.props.store.calc_price.calc_price_rec_terminal_list[0].label} disabled />
                        </div>
                    ) : (null)}

                    <div className="calc_price_row">
                        <div className="calc_price_label">Вес:</div>

                        <input type="number" placeholder="кг" className="calc_price_input" value={this.props.store.calc_price.calc_price_weight} onChange={(e) => { this.props.set_calc_price_weight(e.target.value) }} />
                    </div>

                    <div className="calc_price_row">
                        <div className="calc_price_label">Габариты:</div>

                        <input type="number" placeholder="Длина" className="calc_price_dimensions" value={this.props.store.calc_price.calc_price_l} onChange={(e) => { this.props.set_calc_price_length(e.target.value) }} />
                        <input type="number" placeholder="Ширина" className="calc_price_dimensions" value={this.props.store.calc_price.calc_price_w} onChange={(e) => { this.props.set_calc_price_width(e.target.value) }} />
                        <input type="number" placeholder="Высота" className="calc_price_dimensions" value={this.props.store.calc_price.calc_price_h} onChange={(e) => { this.props.set_calc_price_height(e.target.value) }} />
                    </div>

                </div>

                <div className="calc_price_row">
                    <div className="calc_price_label">Объемный вес:</div>

                    <div className="calc_price_input">{this.props.store.calc_price.calc_price_l * this.props.store.calc_price.calc_price_w * this.props.store.calc_price.calc_price_h / 5000} кг.</div>
                </div>

                <div className="calc_price_row" style={{marginTop: "10px"}}>
                    <button onClick={this.CalcPrice.bind(this)} className="calc_price_button">Рассчитать</button>

                    {this.props.store.calc_price.calc_price_result === "" ? (
                        <input type="text" className="calc_price_input" value={"Результат"} disabled />
                    ) : (
                        <input type="text" className="calc_price_input" value={this.props.store.calc_price.calc_price_result > -1 ? (this.props.store.calc_price.calc_price_result + " руб.") : (this.props.store.calc_price.calc_price_result)} disabled />
                    )}
                </div>

                {this.props.store.calc_price.error_mesage !== "" ? (
                    <div className="service_info_window_wrapper shadow font_16">
                        {this.props.store.calc_price.error_mesage}
                    </div>
                ) : (null)}
            </div>
        )

    }
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_calc_price_send_city: (param) => { dispatch({ type: 'set_calc_price_send_city', payload: param }) },
        set_calc_price_rec_city: (param) => { dispatch({ type: 'set_calc_price_rec_city', payload: param }) },

        set_calc_price_height: (param) => { dispatch({ type: 'set_calc_price_height', payload: param }) },
        set_calc_price_width: (param) => { dispatch({ type: 'set_calc_price_width', payload: param }) },
        set_calc_price_length: (param) => { dispatch({ type: 'set_calc_price_length', payload: param }) },
        set_calc_price_weight: (param) => { dispatch({ type: 'set_calc_price_weight', payload: param }) },
        set_calc_price_send_terminal: (param) => { dispatch({ type: 'set_calc_price_send_terminal', payload: param }) },
        set_calc_price_rec_terminal: (param) => { dispatch({ type: 'set_calc_price_rec_terminal', payload: param }) },
        set_calc_price_send_terminal_city: (param) => { dispatch({ type: 'set_calc_price_send_terminal_city', payload: param }) },
        set_calc_price_rec_terminal_city: (param) => { dispatch({ type: 'set_calc_price_rec_terminal_city', payload: param }) },

        set_calc_price_result: (param) => { dispatch({ type: 'set_calc_price_result', payload: param }) },
        set_calc_price_error_mesage: (param) => { dispatch({ type: 'set_calc_price_error_mesage', payload: param }) },
        clean_calc_priсe: (param) => { dispatch({ type: 'clean_calc_priсe', payload: param }) },
        
        set_calc_price_send_terminal_list: (param) => { dispatch({ type: 'set_calc_price_send_terminal_list', payload: param }) },
        set_calc_price_rec_terminal_list: (param) => { dispatch({ type: 'set_calc_price_rec_terminal_list', payload: param }) },

        set_calc_price_select_send_terminal: (param) => { dispatch({ type: 'set_calc_price_select_send_terminal', payload: param }) },
        set_calc_price_select_rec_terminal: (param) => { dispatch({ type: 'set_calc_price_select_rec_terminal', payload: param }) },

        SetCityList: (param) => { dispatch({ type: 'SetCityList', payload: param }) },
    })
)(Screen)
