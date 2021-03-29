import React from 'react';
import { connect } from 'react-redux';
import { get_data } from './../common/common_modules';
import '../screen/home_ek.css';
import './mobile_table.css';
import Wait from "../screen/wait";

class Screen extends React.Component {

    componentDidMount () {
        if (this.props.store.create_disp.CityList.length === 0) {

            get_data('citylist').then(
                (result) => {
                    this.props.SetCityList(result);
                },
                (err) => { console.log(err) }
            );
        }
    }

    componentWillUnmount() {
        this.props.set_calc_result([]);
        this.props.set_calc_send_city("");
        this.props.set_calc_rec_city("");
        this.props.set_calc_weight("");
        this.props.set_home_error_mesage("");
        this.props.set_focus_calc_input_send_city(false);
        this.props.set_focus_calc_input_rec_city(false);
    }

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    calc = () => {

        this.props.set_focus_calc_input_send_city(false)
        this.props.set_focus_calc_input_rec_city(false)
        this.props.set_active_loader(true)
        let W;
        if (this.props.store.home_ek.l * this.props.store.home_ek.w * this.props.store.home_ek.h / 5000 > this.props.store.home_ek.calc_weight) {
            W = this.props.store.home_ek.l * this.props.store.home_ek.w * this.props.store.home_ek.h / 5000;
        } else {
            W = this.props.store.home_ek.calc_weight;
        }
        
        const data = {
            SendCity: this.props.store.home_ek.calc_send_city,
            RecCity: this.props.store.home_ek.calc_rec_city,
            Weight: W,
        }

        get_data('calc', data).then(
            (result) => {
                this.props.set_active_loader(false);
                
                if (result.length === 0) {
                    this.props.set_home_error_mesage("Нам очень жаль, но по маршруту " + this.props.store.home_ek.calc_send_city + " - " + this.props.store.home_ek.calc_rec_city + " не удалось рассчитать тариф")
                    this.props.set_calc_result([]);
                } else {
                    this.props.set_calc_result(result);
                    this.props.set_home_error_mesage("")
                }
            },
            (err) => {
                this.props.set_active_loader(false);
                this.props.set_home_error_mesage("Не удалось рассчитать тариф")
                this.props.set_calc_result([]);
                console.log(err)
            }
        );
    }

    render() {

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            this.settings_window('Mmenu')
            window.history.pushState(null, "", window.location.href);
        }.bind(this);

        return (
            <div className="home_content">

                <div className="home_service_selector_content_calc">
                
                    <input onBlur={() => setTimeout(()=>{this.props.set_focus_calc_input_send_city(false)},100)} type="text" autoComplete="nope" placeholder='Город отправления' className="calc_city_input" value={this.props.store.home_ek.calc_send_city} onChange={(e) => { this.props.set_calc_send_city(e.target.value) }}
                        onFocus={() => this.props.set_focus_calc_input_send_city(true)} />

                    {this.props.store.home_ek.focus_calc_input_send_city ? (
                        <div className="dropdown_rec_city_list">

                            {this.props.store.create_disp.CityList.filter((el) => {
                                const filter = el.value.toUpperCase();
                                const text = this.props.store.home_ek.calc_send_city.toUpperCase()
                                return filter.indexOf(text) > -1
                            }).slice(0, 10).map((el, index) => {
                                return (<p className="dropdown_rec_city_element" onClick={() => {

                                    this.props.set_calc_send_city(el.value)
                                    this.props.set_focus_calc_input_send_city(false)
                                }} key={index}>

                                    {el.value}
                                </p>)
                            })}
                        </div>
                    ) : (null)}

                    <input onBlur={() => setTimeout(() => { this.props.set_focus_calc_input_rec_city(false) }, 100)} autoComplete="nope" type="text" placeholder='Город назначения' className="calc_city_input" value={this.props.store.home_ek.calc_rec_city} onChange={(e) => { this.props.set_calc_rec_city(e.target.value) }}
                        onFocus={() => this.props.set_focus_calc_input_rec_city(true)} />
                    {this.props.store.home_ek.focus_calc_input_rec_city ? (
                        <div className="dropdown_rec_city_list dropdown_rec_city_list--bottom">

                            {this.props.store.create_disp.CityList.filter((el) => {
                                const filter = el.value.toUpperCase();
                                const text = this.props.store.home_ek.calc_rec_city.toUpperCase()
                                return filter.indexOf(text) > -1
                            }).slice(0, 10).map((el, index) => {
                                return (<p className="dropdown_rec_city_element" onClick={() => {

                                    this.props.set_calc_rec_city(el.value)
                                    this.props.set_focus_calc_input_rec_city(false)
                                }} key={index}>

                                    {el.value}
                                </p>)
                            })}
                        </div>
                    ) : (null)}

                    <input type="number" placeholder='Вес (кг)' className="calc_city_input" value={this.props.store.home_ek.calc_weight} onChange={(e) => { this.props.set_calc_weight(e.target.value) }} />

                    <input type="number" placeholder='Длина (см)' className="calc_city_input" value={this.props.store.home_ek.l} onChange={(e) => { this.props.set_length(e.target.value) }} />
                    <input type="number" placeholder='Ширина (см)' className="calc_city_input" value={this.props.store.home_ek.w} onChange={(e) => { this.props.set_width(e.target.value) }}  />
                    <input type="number" placeholder='Высота (см)' className="calc_city_input" value={this.props.store.home_ek.h} onChange={(e) => { this.props.set_height(e.target.value) }}  />
                    <div className="mobile_del_row">
                        <div className="mobile_del_data_label">Объемный вес: </div>
                        <div className="mobile_del_input">{this.props.store.home_ek.l * this.props.store.home_ek.w * this.props.store.home_ek.h / 5000} кг.</div>
                    </div>
                    <button onClick={this.calc.bind(this)} className="home_service_selector_content_button">Рассчитать</button>

                </div>

                {this.props.store.home_ek.error_mesage !== "" ? (
                    <div className="service_info_window_wrapper shadow font_16">
                        {this.props.store.home_ek.error_mesage}
                    </div>
                ) : (null)}

                {this.props.store.home.calc_result.length !== 0 && this.props.store.home_ek.home_service_selector === 1 ? (

                        <div className="mobile_container">

                        {this.props.store.general.active_loader ? (<Wait />) : (
                            
                            <div>

                                {this.props.store.home.calc_result.map((el, index) =>
                                    <div key={index} className="mobile_table">

                                        <div className="mobile_table_row">
                                            <div className="mobile_table_el mobile_table_el--full_row">{el.del_method} {el.del_type}</div>
                                        </div>

                                        <div className="mobile_table_row">
                                            <div className="mobile_table_label">Срок: </div>
                                            <div className="mobile_table_el">{el.min} - {el.max}</div>
                                        </div>

                                        <div className="mobile_table_row">
                                            <div className="mobile_table_label">Цена: </div>
                                            <div className="mobile_table_el">{el.price}</div>
                                        </div>

                                    </div>
                                )}

                                <button className="service_info_window_button" onClick={() => this.props.set_calc_result([])}>Закрыть</button>
                            </div>

                        )}

                    </div>) : (null)}
            </div>
        )

    }
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_height: (param) => { dispatch({ type: 'set_height', payload: param }); },
        set_width: (param) => { dispatch({ type: 'set_width', payload: param }); },
        set_length: (param) => { dispatch({ type: 'set_length', payload: param }); },
        set_volume_weight: (param) => { dispatch({ type: 'set_volume_weight', payload: param }); },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }); },
        SetCityList: (param) => { dispatch({ type: 'SetCityList', payload: param }) },
        set_home_error_mesage: (param) => { dispatch({ type: 'set_home_error_mesage', payload: param }) },
        set_calc_weight: (param) => { dispatch({ type: 'set_calc_weight', payload: param }) },
        set_calc_rec_city: (param) => { dispatch({ type: 'set_calc_rec_city', payload: param }) },
        set_calc_send_city: (param) => { dispatch({ type: 'set_calc_send_city', payload: param }) },
        set_focus_calc_input_send_city: (param) => { dispatch({ type: 'set_focus_calc_input_send_city', payload: param }) },
        set_focus_calc_input_rec_city: (param) => { dispatch({ type: 'set_focus_calc_input_rec_city', payload: param }) },
        set_calc_result: (param) => { dispatch({ type: 'set_calc_result', payload: param }) },
    })
)(Screen)
