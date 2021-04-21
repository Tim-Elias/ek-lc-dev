import React from 'react';
import { connect } from 'react-redux';
import './mobile_disp.css';
import '../screen/home_ek.css';
import './mobile_table.css';
import Select from 'react-select';
import { customStyles } from "./m_common_style";
import { get_data } from './../common/common_modules';
import Wait from "../screen/wait";
import Foto from "./foto";

class Screen extends React.Component {

    componentDidMount() {
        get_data('citylist').then(
            (result) => {
                this.props.SetCityList(result);
            },
            (err) => { console.log(err) }
        );

        get_data('disptemplatelist', { userkey: this.props.store.login.userkey }).then(
            (result) => {
                this.props.set_disp_template_list(result);
            },
            (err) => { console.log(err) }
        );
        
        get_data('cargo', { userkey: this.props.store.login.userkey }).then(
            (result) => {
                this.props.set_Cargo_list(result);
            },
            (err) => { console.log(err) }
        );
    }

    componentWillUnmount() {
        this.props.DischargeData();
    }

    CalcPrice = (total_weight, total_volume) => {

        let weight;
        let volume;

        if (this.props.store.m_create_disp.CargoInfoType) {
            weight = this.props.store.m_create_disp.Weight;
            volume = this.props.store.m_create_disp.Volume;
        } else {
            weight = total_weight;
            volume = total_volume;
        }

        const create_disp_data = {
            userkey: this.props.store.login.userkey,
            SendCity: this.props.store.m_create_disp.SendCity.value,
            SendTerminal: this.props.store.m_create_disp.SendTerminal,
            RecCity: this.props.store.m_create_disp.RecCity.value,
            RecTerminal: this.props.store.m_create_disp.RecTerminal,
            Volume: volume,
            Weight: weight,
        }

        get_data('customercalc', create_disp_data).then(
            (result) => {
                this.props.SetPrice(result);
            },
            (err) => { 
              console.log("err")  
              console.log(err) 
          }
        );
    }

    SendCity = (value, terminal) => {
        this.props.SetSendCity(value);
        let city = value.label;

        get_data('terminallist', { city }).then(
            (result) => {
                let sel_terminal;
                if(terminal) {
                    sel_terminal = result.filter((item) => item.label === terminal);
                } else {
                    sel_terminal = false;
                }
                
                const data = {
                    result : result,
                    terminal: sel_terminal,
                }

                this.props.SetSendTerminalList(data);
                if (result.length === 0) {
                    this.SendTerminal(false);
                }
            },
            (err) => {
                console.log("err");
                console.log(err);
            }
        );
    }

    SendTerminal = (param) => {
        let DelMethod;
        let ST;

        if(param === "true" || param === true) {
            ST = true;
        } else {
            ST = false;
        }

        if (this.props.store.m_create_disp.RecTerminal) {
            if (ST) {
                DelMethod = "Склад - Склад";
            } else {
                DelMethod = "Дверь - Склад";
            }
        } else {
            if (ST) {
                DelMethod = "Склад - Дверь";
            } else {
                DelMethod = "Дверь - Дверь";
            }
        }

        const data = {
            SendTerminal: ST,
            DelMethod: DelMethod,
        }

        this.props.SetSendTerminal(data);
    }

    RecCity = (value, terminal) => {
        this.props.SetRecCity(value);
        let city = value.label;

        get_data('terminallist', { city }).then(
            (result) => {
                
                let sel_terminal;
                if (terminal) {
                    sel_terminal = result.filter((item) => item.label === terminal);
                } else {
                    sel_terminal = false;
                }

                const data = {
                    result: result,
                    terminal: sel_terminal,
                }

                this.props.SetRecTerminalList(data);
                if (result.length === 0) {
                    this.RecTerminal(false);
                }

            },
            (err) => {
                console.log("err");
                console.log(err);
            }
        );
    }

    RecTerminal = (param) => {
        let DelMethod;
        let RT;
        if (param == "true" || param === true) {
            RT = true;
        } else {
            RT = false;
        }

        if (RT) {
            if (this.props.store.m_create_disp.SendTerminal) {
                DelMethod = "Склад - Склад";
            } else {
                DelMethod = "Дверь - Склад";
            }
        } else {
            if (this.props.store.m_create_disp.SendTerminal) {
                DelMethod = "Склад - Дверь";
            } else {
                DelMethod = "Дверь - Дверь";
            }
        }

        const data = {
            RecTerminal: RT,
            DelMethod: DelMethod,
        }
        this.props.SetRecTerminal(data);
    }

    AddCargoTemplate = (item) => {
        // let data = {
        //     name: item.name,
        //     quantity: ++item.quantity,
        // };
        // this.props.set_Cargo_list_quantity(data);
        this.AddCargo(item.weight.replace(",", "."), item.l.replace(",", "."), item.w.replace(",", "."), item.h.replace(",", "."), item.name);
    }
    
    RemoveCargoTemplate = (Template) => {
        
        const CargoSelectTemplate = this.props.store.m_create_disp.Cargo.findIndex((item) => (item.Template == Template.name));
        
        this.props.RemoveCargo(CargoSelectTemplate);
    }

    //<--cargo
    CargoWeight = (value, index) => {
        if(value < 0) {
            return false
        }
        const data = {
            value: value,
            index: index,
        }
        this.props.SetCargoWeight(data);
    }

    CargoW = (value, index) => {
        if (value < 0) {
            return false
        }
        const data = {
            value: value,
            index: index,
        }
        this.props.SetCargoW(data);
    }

    CargoL = (value, index) => {
        if (value < 0) {
            return false
        }
        const data = {
            value: value,
            index: index,
        }
        this.props.SetCargoL(data);
    }

    CargoH = (value, index) => {
        if (value < 0) {
            return false
        }
        const data = {
            value: value,
            index: index,
        }
        this.props.SetCargoH(data);
    }

    CargoType = (value, index) => {
        const data = {
            value: value,
            index: index,
        }
        console.log(data)
        this.props.SetCargoType(data);
    }
    CargoComm = (value, index) => {
        const data = {
            value: value,
            index: index,
        }
        this.props.SetCargoComm(data);
    }
    AddCargo = (Weight = 0, L = "", W = "", H = "", Template = "", Type = "", Comment = "") => {
        let data = {
            Weight: Weight,
            L: L,
            W: W,
            H: H,
            Type: Type,
            Comment: Comment,
            Template: Template,
        }
        this.props.AddCargo(data);
    }

    RemoveCargo = (index, item) => {
        if (item.Template !== "") {
            let template = this.props.store.m_create_disp.Cargo_list.filter(el => (
                el.name == item.Template
            ))[0];
            let data = {
                name: template.name,
                quantity: --template.quantity,
            };
            this.props.set_Cargo_list_quantity(data);
            this.props.RemoveCargo(index);
        } else {
            this.props.RemoveCargo(index);
        }
    }
    //Cargo-->

    SelectSendTemplate = (value) => {
        const city = this.props.store.m_create_disp.CityList.filter((el) => el.value === value.City)[0];

        this.SendCity(city, value.CurrentTerminal);
        this.props.SetSendAdress(value.Adress);
        this.props.SetSendPhone(value.Phone);
        this.props.SetSendPerson(value.Person);
        this.props.SetSendCompany(value.Company);
        this.props.SetSendAddInfo(value.AddInfo);
        this.SendTerminal(value.Terminal);
        
        const terminal = this.props.store.m_create_disp.SendTerminalList.filter((item) => item.label === value.CurrentTerminal);
        this.props.SetSendSelectTerminal(terminal[0])
        this.receipt();
    }

    SelectRecTemplate = (value) => {
        const city = this.props.store.m_create_disp.CityList.filter((el) => el.value === value.City)[0];

        this.RecCity(city, value.CurrentTerminal);
        this.props.SetRecAdress(value.Adress);
        this.props.SetRecPhone(value.Phone);
        this.props.SetRecPerson(value.Person);
        this.props.SetRecCompany(value.Company);
        this.props.SetRecAddInfo(value.AddInfo);
        this.RecTerminal(value.Terminal);

        const terminal = this.props.store.m_create_disp.RecTerminalList.filter((item) => item.label === value.CurrentTerminal);
        this.props.SetRecSelectTerminal(terminal[0])
        this.receipt();
    }

    create_disp = () => {

        const create_disp_data = {
            userkey: this.props.store.login.userkey,
            Num: this.props.store.m_create_disp.Number,
            Order: this.props.store.disp.key.num,
            PayType: this.props.store.m_create_disp.PayType,
            DelType: this.props.store.disp.data.DelType,
            DelMethod: this.props.store.m_create_disp.DelMethod,
            // DispDate: this.props.store.m_create_disp.DispDate,
            SendCity: this.props.store.m_create_disp.SendCity.value,
            SendAdress: this.props.store.m_create_disp.SendAdress,
            SendCompany: this.props.store.m_create_disp.SendCompany,
            SendPhone: this.props.store.m_create_disp.SendPhone,
            SendPerson: this.props.store.m_create_disp.SendPerson,
            SendAddInfo: this.props.store.m_create_disp.SendAddInfo,
            // SendEmail: this.props.store.cc.SendEmail,
            SendTerminal: this.props.store.m_create_disp.SendTerminal,
            SendSelectTerminal: this.props.store.m_create_disp.SendSelectTerminal.value,
            // SendEmailInformer: this.props.store.m_create_disp.SendEmailInformer,bool

            RecCity: this.props.store.m_create_disp.RecCity.value,
            RecAdress: this.props.store.m_create_disp.RecAdress,
            RecCompany: this.props.store.m_create_disp.RecCompany,
            RecPhone: this.props.store.m_create_disp.RecPhone,
            RecPerson: this.props.store.m_create_disp.RecPerson,
            RecAddInfo: this.props.store.m_create_disp.RecAddInfo,
            // RecEmail: this.props.store.m_create_disp.RecEmail,
            RecTerminal: this.props.store.m_create_disp.RecTerminal,
            RecSelectTerminal: this.props.store.m_create_disp.RecSelectTerminal.value,
            // RecEmailInformer: this.props.store.m_create_disp.RecEmailInformer,bool

            Cargo: this.props.store.m_create_disp.Cargo,
            Total: this.props.store.m_create_disp.Total,
            Volume: this.props.store.m_create_disp.Volume,
            Weight: this.props.store.m_create_disp.Weight,

            InsureValue: this.props.store.m_create_disp.InsureValue,
            COD: this.props.store.m_create_disp.COD,
            CargoInfoType: this.props.store.m_create_disp.CargoInfoType,

            Foto: this.props.store.disp.foto,

            Customer: this.props.store.m_create_disp.Customer,
        }


        this.props.active_window("wait");

        get_data('createdisp', create_disp_data).then(
            (result) => {

                console.log(result)
                const data = {
                    num: result,
                    status: "Ожидается",
                };

                this.props.set_key(data);
                this.props.active_window("m_disp");
            },
            (err) => { 
                alert(err);
                console.log(err);
            }
        );
    }

    ShowPopUp = (type) => {
        this.props.set_popup_type(type);
        this.receipt();
    }

    receipt = () => {

        if (!this.props.store.m_create_disp.popup) {
            document.body.classList.add('overflow');
        } else {
            document.body.classList.remove('overflow');
        }

        this.props.set_popup(!(this.props.store.m_create_disp.popup));
    }

    render() {
        let disabled = false;
        let total_weight = Math.ceil(this.props.store.m_create_disp.Cargo.reduce((accumulator, Cargo) => accumulator + Math.ceil(Cargo.Weight * Cargo.Q * 1000) / 1000, 0) * 1000) / 1000;
        let total_volume = Math.ceil(this.props.store.m_create_disp.Cargo.reduce((accumulator, Cargo) => accumulator + Math.ceil(Cargo.L * Cargo.W * Cargo.H * Cargo.Q / 5) / 1000, 0) * 1000) / 1000;

        if (this.props.store.m_create_disp.SendCity.value === ""
            || this.props.store.m_create_disp.RecCity.value === ""
            || ((this.props.store.m_create_disp.Total == "0" && this.props.store.m_create_disp.CargoInfoType) && !this.props.store.login.original_data.nullablex)
            || ((this.props.store.m_create_disp.Weight == "0" && this.props.store.m_create_disp.CargoInfoType) && !this.props.store.login.original_data.nullable)
            || ((total_weight == 0 && !this.props.store.m_create_disp.CargoInfoType) && !this.props.store.login.original_data.nullable)
            || this.props.store.m_create_disp.Customer == ""
            || this.props.store.m_create_disp.Number == ""
        ) {
            disabled = true;
        }

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            if(this.props.store.m_create_disp.popup) {
                this.receipt();
            } else {
                this.props.active_window(this.props.store.general.last_window[this.props.store.general.last_window.length - 1]);
                window.history.pushState(null, "", window.location.href);
            }
        }.bind(this);

        return (
            <div>
            {this.props.store.general.active_loader ? (<Wait />) : (
                    <div>
                        <div className={this.props.store.m_create_disp.popup ? "PopUp_container" : "none"} onClick={this.receipt.bind(this)}></div>
                        <div className={this.props.store.m_create_disp.popup ? "PopUp_window_template" : "none"}>
                            {this.props.store.m_create_disp.popupType === "send" ? (<p>Заполнить отправителя из шаблона</p>) : (<p>Заполнить получателя из шаблона</p>)}
                            {this.props.store.upload_manifest.disp_template_list.map((el, index) =>
                                <div key={index} className="PopUp_table">
                                    <div className="PopUp_table_header">
                                        {el.label}
                                    </div>

                                    <div className="PopUp_table_row">
                                        <div className="PopUp_table_label">Город:</div>
                                        <div className="PopUp_table_el">{el.City}</div>
                                    </div>

                                    <div className="PopUp_table_row">
                                        <div className="PopUp_table_label">Адрес:</div>
                                        <div className="PopUp_table_el">{el.Adress}</div>
                                    </div>

                                    <div className="PopUp_table_row">
                                        <div className="PopUp_table_label">Телефон:</div>
                                        <div className="PopUp_table_el">{el.Phone}</div>
                                    </div>

                                    <div className="PopUp_table_row">
                                        <div className="PopUp_table_label">Конт.лицо:</div>
                                        <div className="PopUp_table_el">{el.Person}</div>
                                    </div>

                                    <div className="PopUp_table_row">
                                        <div className="PopUp_table_label">Компания:</div>
                                        <div className="PopUp_table_el">{el.Company}</div>
                                    </div>

                                    <div className="PopUp_table_row">
                                        <div className="PopUp_table_label">Доп.инфо:</div>
                                        <div className="PopUp_table_el">{el.AddInfo}</div>
                                    </div>

                                    <button className="mobile_disp_button_item mobile_disp_button_item--blue" onClick={this.props.store.m_create_disp.popupType === "send" ? (this.SelectSendTemplate.bind(this, el)) : (this.SelectRecTemplate.bind(this, el))}>Выбрать</button>
                                </div>
                            )}
                        </div>

                        <div className="mobile_heading">
                            Создать накладную
                        </div>

                        <div className="mobile_container">

                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Номер накладной:</div>
                                <input className="mobile_del_input" type="text" value={this.props.store.m_create_disp.Number} onChange={e => this.props.set_Number(e.target.value)}></input>
                            </div>

                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Заказчик:</div>
                                
                                {this.props.store.m_create_disp.Customer != "" ? (
                                    <div className="mobile_del_input">{this.props.store.m_create_disp.Customer}</div>
                                ) : (
                                    <select defaultValue = "" className = "mobile_del_input" onChange = { (e) => this.props.set_Customer(e.target.value)}>
                                        <option value="" disabled>Выбрать заказчика</option>
                                        {this.props.store.login.customers.map((item, index) =>
                                        <option value={item.customer} key={index}>{item.customer}</option>
                                    )}
                                    </select>
                                )}

                            </div>

                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Вид доставки:</div>
                                <input className="mobile_del_input" type="text" value={this.props.store.m_create_disp.DelMethod} readOnly></input>
                            </div>

                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Тип оплаты:</div>
                                <select defaultValue={this.props.store.m_create_disp.PayType} className="mobile_del_input" onChange={(e) => this.props.SetPayType(e.target.value)}>
                                    <option value="БезналичнаяОплата">Безналичная оплата</option>
                                    <option value="ОплатаНаличнымиПриОтправлении">Оплата наличными при отправлении</option>
                                    <option value="ОплатаНаличнымиПриПолучении">Оплата наличными при получении</option>
                                </select>
                            </div>

                            <div className="mobile_table">
                                <div className="mobile_table_header">
                                    Данные отправителя
                                    <button className="mobile_table_header_button" onClick={this.ShowPopUp.bind(this, "send")}>Из шаблона</button>
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Город:</div>
                                    <Select
                                        value={this.props.store.m_create_disp.SendCity}
                                        options={this.props.store.m_create_disp.CityList}
                                        styles={customStyles}
                                        onChange={(values) => this.SendCity(values, false)}
                                        placeholder=""
                                    />
                                </div>

                                {this.props.store.m_create_disp.SendTerminalList.length === 0 ? (null) : (<div className="mobile_table_row">
                                    <div className="mobile_table_label">Вид забора:</div>
                                    <select defaultValue={this.props.store.m_create_disp.SendTerminal} className="mobile_table_el" onChange={(e) => this.SendTerminal(e.target.value)}>
                                        <option value={true}>От склада</option>
                                        <option value={false}>От двери</option>
                                    </select>
                                </div>)}

                                <div className="mobile_table_row">
                                    {this.props.store.m_create_disp.SendTerminal ? (<div className="mobile_table_label"> Терминал:</div>) : (<div className="mobile_table_label" value={this.props.store.m_create_disp.SendAdress} onChange={e => this.props.SetSendAdress(e.target.value)}> Адрес:</div>)}

                                    {this.props.store.m_create_disp.SendTerminal ? (
                                        <Select
                                            options={this.props.store.m_create_disp.SendTerminalList}
                                            styles={customStyles}
                                            value={this.props.store.m_create_disp.SendSelectTerminal}
                                            onChange={(values) => this.props.SetSendSelectTerminal(values)}
                                        />
                                        // <select className="mobile_table_el" onChange={(e) => this.props.SetSendSelectTerminal(e.target.value)}>
                                        //     {this.props.store.m_create_disp.SendTerminalList.foreach((item) => {<options value={item.value}>{item.value}</options>})}
                                        // </select>
                                    ) : (<input className="mobile_table_el" onChange={e => this.props.SetSendAdress(e.target.value)} value={this.props.store.m_create_disp.SendAdress} type="text" />)}
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Компания:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.SendCompany} onChange={e => this.props.SetSendCompany(e.target.value)} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Телефон:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.SendPhone} onChange={e => this.props.SetSendPhone(e.target.value)} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Контактное лицо:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.SendPerson} onChange={e => this.props.SetSendPerson(e.target.value)} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Доп.информация:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.SendAddInfo} onChange={e => this.props.SetSendAddInfo(e.target.value)} />
                                </div>
                            </div>

                            <div className="mobile_table">
                                <div className="mobile_table_header">
                                    Данные получателя
                                    <button className="mobile_table_header_button" onClick={this.ShowPopUp.bind(this, "Rec")}>Из шаблона</button>
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Город:</div>
                                    <Select
                                        value={this.props.store.m_create_disp.RecCity}
                                        options={this.props.store.m_create_disp.CityList}
                                        styles={customStyles}
                                        onChange={(values) => this.RecCity(values, false)}
                                        placeholder=""
                                    />
                                </div>

                                {this.props.store.m_create_disp.RecTerminalList.length === 0 ? (null) : (<div className="mobile_table_row">
                                    <div className="mobile_table_label">Вид доставки:</div>
                                    <select defaultValue={this.props.store.m_create_disp.RecTerminal} className="mobile_table_el" onChange={(e) => this.RecTerminal(e.target.value)}>
                                        <option value={true}>До склада</option>
                                        <option value={false}>До двери</option>
                                    </select>
                                </div>)}

                                <div className="mobile_table_row">
                                    {this.props.store.m_create_disp.RecTerminal ? (<div className="mobile_table_label"> Терминал:</div>) : (<div className="mobile_table_label" value={this.props.store.m_create_disp.RecAdress} onChange={e => this.props.SetRecAdress(e.target.value)}>Адрес:</div>)}

                                    {this.props.store.m_create_disp.RecTerminal ? (
                                        <Select
                                            options={this.props.store.m_create_disp.RecTerminalList}
                                            styles={customStyles}
                                            value={this.props.store.m_create_disp.RecSelectTerminal}
                                            onChange={(values) => this.props.SetRecSelectTerminal(values)}
                                        />
                                    ) : (<input className="mobile_table_el" onChange={e => this.props.SetRecAdress(e.target.value)} value={this.props.store.m_create_disp.RecAdress} type="text" />)}
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Компания:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.RecCompany} onChange={e => this.props.SetRecCompany(e.target.value)} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Телефон:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.RecPhone} onChange={e => this.props.SetRecPhone(e.target.value)} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Контактное лицо:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.RecPerson} onChange={e => this.props.SetRecPerson(e.target.value)} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Доп.информация:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.RecAddInfo} onChange={e => this.props.SetRecAddInfo(e.target.value)} />
                                </div>
                            </div>
                            <div className="mobile_heading">Данные о грузах:</div>
                            <div className="mobile_del_row">
                                <div className="mobile_del_data_label">Метод внесения информации:</div>
                                <select defaultValue={this.props.store.m_create_disp.CargoInfoType} className="mobile_del_input" onChange={(e) => this.props.SetCargoInfoType(e.target.value)}>
                                    <option value={false}>Внести информацию о каждом грузе</option>
                                    <option value={true}>Указать итоговые значения</option>
                                </select>
                            </div>

                            {this.props.store.m_create_disp.CargoInfoType == false && this.props.store.m_create_disp.Cargo_list.length > 0 ? (
                                <div className="mobile_table">

                                    <div className="mobile_table_header">
                                        Шаблоны грузов
                                    </div>

                                    {this.props.store.m_create_disp.Cargo_list.map((item, index) => (
                                        <div key={index} className="mobile_table_row">
                                            <div className="mobile_table_label">{item.name}</div>
                                            <button className="mobile_table_cargo_button" onClick={() => this.RemoveCargoTemplate(item)}>-</button>
                                            <input className="mobile_table_cargo_button" readOnly value={this.props.store.m_create_disp.Cargo.filter((el) => (el.Template == item.name)).length}></input>
                                            <button className="mobile_table_cargo_button" onClick={() => this.AddCargoTemplate(item)}>+</button>
                                        </div>
                                    ))}

                                </div>
                            ) : (null)}

                            {this.props.store.m_create_disp.CargoInfoType == false ? (
                                <div>
                                    {this.props.store.m_create_disp.Cargo.map((item, index) =>
                                        <div className="mobile_table" key={index}>

                                            <div className="mobile_table_row">
                                                <div className="mobile_table_label">Вес (кг):</div>
                                                <input className="mobile_table_el" value={item.Weight} onChange={e => this.CargoWeight(e.target.value, index)} type="number" />
                                            </div>

                                            <div className="mobile_table_row">
                                                <div className="mobile_table_label">Габариты:</div>
                                                <input className="mobile_table_el mobile_table_el--part" value={item.L} onChange={e => this.CargoL(e.target.value, index)} type="number" placeholder="Длина" />
                                                <input className="mobile_table_el mobile_table_el--part" value={item.W} onChange={e => this.CargoW(e.target.value, index)} type="number" placeholder="Ширина" />
                                                <input className="mobile_table_el mobile_table_el--part" value={item.H} onChange={e => this.CargoH(e.target.value, index)} type="number" placeholder="Высота" />
                                            </div>

                                            <div className="mobile_table_row">
                                                <div className="mobile_table_label">Об. вес (кг):</div>
                                                <div className="mobile_table_el">{(item.L * item.W * item.H / 5000).toFixed(3)}</div>
                                            </div>

                                            <div className="mobile_table_row">
                                                <div className="mobile_table_label">Тип груза:</div>
                                                <select defaultValue="" className="mobile_table_el" value={item.Type} onChange={e => this.CargoType(e.target.value, index)}>
                                                    <option value="" disabled>Выберите тип груза</option>
                                                    <option value="СейфПакет">Сейф-пакет</option>
                                                    <option value="Коробка">Коробка</option>
                                                    <option value="Контейнер">Контейнер</option>
                                                    <option value="МешокПодПломбой">Мешок под пломбой</option>
                                                    <option value="Прочее">Прочее</option>
                                                </select>
                                            </div>

                                            <div className="mobile_table_row">
                                                <div className="mobile_table_label">Комментарий:</div>
                                                <input className="mobile_table_el" value={item.Comment} onChange={e => this.CargoComm(e.target.value, index)} />
                                            </div>
                                            <br />
                                            <button onClick={this.RemoveCargo.bind(this, index, item)} className="mobile_disp_button_item mobile_disp_button_item--full mobile_disp_button_item--yellow">Удалить место</button>
                                        </div>
                                    )}
                                </div>
                            ) : (null)}
                            {this.props.store.m_create_disp.CargoInfoType == false ? (<button className="mobile_disp_button_item mobile_disp_button_item--blue" onClick={() => this.AddCargo()}>Добавить место</button>) : (null)}

                            <br />

                            {this.props.store.m_create_disp.CargoInfoType == false ? (<div className="mobile_table">
                                <div className="mobile_table_header">
                                    Общая информация о грузах
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Общее количество мест:</div>
                                    <input className="mobile_table_el" value={this.props.store.m_create_disp.Cargo.reduce((accumulator, Cargo) => accumulator + Number(Cargo.Q), 0)} readOnly />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Общий фактический вес (кг):</div>
                                    <input className="mobile_table_el" readOnly value={total_weight} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Общий объемный вес (кг):</div>
                                    <input className="mobile_table_el" readOnly value={total_volume} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Страховая стоимость (руб.):</div>
                                    <input className="mobile_table_el" type="number" onChange={e => this.props.SetInsureValue(e.target.value)} value={this.props.store.m_create_disp.InsureValue} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Наложенный платеж (руб.):</div>
                                    <input className="mobile_table_el" type="number" onChange={e => this.props.SetCOD(e.target.value)} value={this.props.store.m_create_disp.COD} />
                                </div>

                                <div className="mobile_table_row">
                                    <div className="mobile_table_label">Расчетная стоимость перевозки (руб.):</div>
                                    <input className="mobile_table_el" readOnly value={this.props.store.m_create_disp.Price} type="number" />
                                </div>

                            </div>) : (
                                <div className="mobile_table">
                                    <div className="mobile_table_header">
                                        Общая информация о грузах
                                    </div>

                                    <div className="mobile_table_row">
                                        <div className="mobile_table_label">Общее количество мест:</div>
                                        <input className="mobile_table_el" type="number" value={this.props.store.m_create_disp.Total} onChange={e => this.props.SetTotal(e.target.value)} />
                                    </div>

                                    <div className="mobile_table_row">
                                        <div className="mobile_table_label">Общий фактический вес (кг):</div>
                                        <input className="mobile_table_el" type="number" value={this.props.store.m_create_disp.Weight} onChange={e => this.props.SetWeight(e.target.value)} />
                                    </div>

                                    <div className="mobile_table_row">
                                        <div className="mobile_table_label">Общий объемный вес (кг):</div>
                                        <input className="mobile_table_el" type="number" value={this.props.store.m_create_disp.Volume} onChange={e => this.props.SetVolume(e.target.value)} />
                                    </div>

                                    <div className="mobile_table_row">
                                        <div className="mobile_table_label">Страховая стоимость (руб.):</div>
                                        <input className="mobile_table_el" type="number" onChange={e => this.props.SetInsureValue(e.target.value)} value={this.props.store.m_create_disp.InsureValue} />
                                    </div>

                                    <div className="mobile_table_row">
                                        <div className="mobile_table_label">Наложенный платеж (руб.):</div>
                                        <input className="mobile_table_el" type="number" onChange={e => this.props.SetCOD(e.target.value)} value={this.props.store.m_create_disp.COD} />
                                    </div>

                                    <div className="mobile_table_row">
                                        <div className="mobile_table_label">Расчетная стоимость перевозки (руб.):</div>
                                        <input className="mobile_table_el" readOnly value={this.props.store.m_create_disp.Price} type="number" />
                                    </div>

                                </div>
                            )}

                            {/* <Foto /> */}
                            <button className="mobile_disp_button_item--full mobile_disp_button_item--blue" onClick={this.CalcPrice.bind(this, total_weight, total_volume)}>Рассчитать стоимость</button>

                            {disabled ? (<button onClick={this.create_disp.bind(this)} className="mobile_disp_button_item--full mobile_disp_button_item--blue_nonactive" disabled={disabled}>Создать накладную</button>)
                                : (<button onClick={this.create_disp.bind(this)} className="mobile_disp_button_item--full mobile_disp_button_item--blue" disabled={disabled}>Создать накладную</button>)}

                        </div>
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

        set_Customer: (param) => { dispatch({ type: 'set_Customer', payload: param }) },

        set_Cargo_list_quantity: (param) => { dispatch({ type: 'set_Cargo_list_quantity', payload: param }) },
        set_Number: (param) => { dispatch({ type: 'set_Number', payload: param }) },

        set_Cargo_list: (param) => { dispatch({ type: 'set_Cargo_list', payload: param }) },

        set_popup: (param) => { dispatch({ type: 'set_popup', payload: param }) },
        set_popup_type: (param) => { dispatch({ type: 'set_popup_type', payload: param }) },

        SetPrice: (param) => { dispatch({ type: 'SetPriceMobile', payload: param }) },

        SetCargoWeight: (param) => { dispatch({ type: 'SetCargoWeightMobile', payload: param }) },
        SetCargoL: (param) => { dispatch({ type: 'SetCargoLMobile', payload: param }) },
        SetCargoW: (param) => { dispatch({ type: 'SetCargoWMobile', payload: param }) },
        SetCargoH: (param) => { dispatch({ type: 'SetCargoHMobile', payload: param }) },
        SetCargoQ: (param) => { dispatch({ type: 'SetCargoQMobile', payload: param }) },
        SetCargoType: (param) => { dispatch({ type: 'SetCargoTypeMobile', payload: param }) },
        SetCargoComm: (param) => { dispatch({ type: 'SetCargoCommMobile', payload: param }) },
        AddCargo: (param) => { dispatch({ type: 'AddCargoMobile', payload: param }) },
        RemoveCargo: (param) => { dispatch({ type: 'RemoveCargoMobile', payload: param }) },

        SetVolume: (param) => { dispatch({ type: 'SetVolumeMobile', payload: param }) }, 
        SetWeight: (param) => { dispatch({ type: 'SetWeightMobile', payload: param }) },
        SetTotal: (param) => { dispatch({ type: 'SetTotalMobile', payload: param }) },
        SetCOD: (param) => { dispatch({ type: 'SetCODMobile', payload: param }) },
        SetInsureValue: (param) => { dispatch({ type: 'SetInsureValueMobile', payload: param }) },

        SetCityList: (param) => { dispatch({ type: 'SetCityListMobile', payload: param }) },
        SetCargoInfoType: (param) => { dispatch({ type: 'SetCargoInfoTypeMobile', payload: param }) },
        SetPayType: (param) => { dispatch({ type: 'SetPayTypeMobile', payload: param }) },

        SetSendCity: (param) => { dispatch({ type: 'SetSendCityMobile', payload: param }) },
        SetSendAdress: (param) => { dispatch({ type: 'SetSendAdressMobile', payload: param }) },
        SetSendCompany: (param) => { dispatch({ type: 'SetSendCompanyMobile', payload: param }) },
        SetSendPhone: (param) => { dispatch({ type: 'SetSendPhoneMobile', payload: param }) },
        SetSendPerson: (param) => { dispatch({ type: 'SetSendPersonMobile', payload: param }) },
        SetSendAddInfo: (param) => { dispatch({ type: 'SetSendAddInfoMobile', payload: param }) },
        SetSendTerminalList: (param) => { dispatch({ type: 'SetSendTerminalListMobile', payload: param }) },
        SetSendTerminal: (param) => { dispatch({ type: 'SetSendTerminalMobile', payload: param }) },
        SetSendSelectTerminal: (param) => { dispatch({ type: 'SetSendSelectTerminalMobile', payload: param }) },

        SetRecCity: (param) => { dispatch({ type: 'SetRecCityMobile', payload: param }) },
        SetRecAdress: (param) => { dispatch({ type: 'SetRecAdressMobile', payload: param }) },
        SetRecCompany: (param) => { dispatch({ type: 'SetRecCompanyMobile', payload: param }) },
        SetRecPhone: (param) => { dispatch({ type: 'SetRecPhoneMobile', payload: param }) },
        SetRecPerson: (param) => { dispatch({ type: 'SetRecPersonMobile', payload: param }) },
        SetRecAddInfo: (param) => { dispatch({ type: 'SetRecAddInfoMobile', payload: param }) },
        SetRecTerminalList: (param) => { dispatch({ type: 'SetRecTerminalListMobile', payload: param }) },
        SetRecTerminal: (param) => { dispatch({ type: 'SetRecTerminalMobile', payload: param }) },
        SetRecSelectTerminal: (param) => { dispatch({ type: 'SetRecSelectTerminalMobile', payload: param }) },

        set_disp_template_list: (param) => { dispatch({ type: 'set_disp_template_list', payload: param }) },

        set_key: (param) => { dispatch({ type: 'set_key', payload: param }) },
        active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },

        DischargeData: (param) => { dispatch({ type: 'DischargeData', payload: param }) },
    })
)(Screen);