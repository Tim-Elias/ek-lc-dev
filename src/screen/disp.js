import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Icon } from 'semantic-ui-react'
import { get_data, get_file } from './../common/common_modules'
import ReactToPrint from 'react-to-print'
import Barcode from 'react-barcode'
import logo from './../logo.svg';
import './disp.css';
import ComponentToPrint from './disp_print'
import StickerToPrint from './sticker_print'


class Screen extends React.Component {

    // print = () =>{
    //    get_file(this.props.store.login.userkey,'Накладная',this.props.store.disp.data.Number,this.props.store.disp.data.Number.concat('.pdf'))
    // }

    back = () => {
        this.props.set_active_window(this.props.store.general.last_window);
    }

    sendpod = () => {
        this.props.set_active_window("wait");
        const data = {
            userkey: this.props.store.login.userkey,
            num: this.props.store.disp.data.Number,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            summ: document.getElementById("summ").value,
            comment: document.getElementById("comment").value,
            rec: document.getElementById("recient").value
        }
        get_data('delivered', data).then(
            (result) => {
                const list_data = { userkey: this.props.store.login.userkey };

                get_data('list', list_data).then(
                    (result) => {
                        this.props.set_list_storage(result);
                        this.props.set_active_window("storage");
                    },
                    (err) => { console.log(err) }
                );
            },
            (err) => { 
                this.props.set_active_window("disp");
                console.log(err) 
            }
        );
    };

    reciept = () => {
        this.props.set_active_window("wait");
        const data = {
            userkey: this.props.store.login.userkey,
            num: this.props.store.disp.data.Number,
        }
        get_data('getdispatch', data).then(
            (result) => {
                this.props.set_active_window("reciept");
                this.props.set_search_error(`Накладная ${this.props.store.disp.data.Number} успешно принята на склад`);
               
            },
            (err) => { 
                this.props.set_active_window("disp");
                console.log(err) 
            }
        );

    }

    render() {

        // const close = () =>  {
        //     if(this.props.store.general.active_window === 'disp'){
        //         console.log(this.props.store.general.active_window)
        //         console.log('this')
        //         this.back();
        //     }
        // };

        // document.onkeydown = function (event) {
        //     if (event.keyCode === 8) {
        //         close();
        //     }
        // }
        let initialValue = 0 
        return (

            <div>
                <div className="disp_Number">
                
                    <div><Button  compact icon onClick={this.back.bind(this)}>
                     <Icon name='arrow left' />
                    </Button> {this.props.store.disp.data.Type} <b>{this.props.store.disp.data.Number}   </b> 
                    
                    
                    <ReactToPrint
                    trigger={() => <Button><Icon name='print'></Icon> Печать</Button>}
                    content={() => this.componentRef}
                    />
                    <div style={{ display: "none" }}>
                        <ComponentToPrint disp={this.props.store.disp} ref={el => (this.componentRef = el)} />
                    </div>

                    <ReactToPrint
                    trigger={() => <Button><Icon name='print'></Icon> Печать наклеек</Button>}
                    content={() => this.stickerRef}
                    />
                    <div style={{ display: "none" }}>
                        <StickerToPrint disp={this.props.store.disp} ref={el => (this.stickerRef = el)} />
                    </div>

                </div>
                    {/* ////////////////////// */}
                    
                </div>
                <div className="disp_customer_data">
                    <div className="disp_data_label">Заказчик:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.Customer}</div>
                    <div className="disp_data_label">Вид доставки:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.DelMethod}</div>
                    <div className="disp_data_label">Тип оплаты:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.PayType}</div>

                </div>

                <div className="disp_address_data">
                    <div className="disp_address_data_header">Данные отправителя</div>
                    <div className="disp_address_data_header">Данные получателя</div>
                    <div className="disp_address_data_el">

                        <div className="disp_data_label"> Город:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.SebdCity}</div>
                        <div className="disp_data_label"> Адрес:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.SendAdress}</div>
                        <div className="disp_data_label"> Компания:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.SendCompany}</div>
                        <div className="disp_data_label"> Телефон:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.SendPhone}</div>
                        <div className="disp_data_label"> Контактное лицо:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.SendPerson}</div>
                        <div className="disp_data_label"> Доп. информация:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.SendAddInfo}</div>
                    </div>

                    <div className="disp_address_data_el">

                        <div className="disp_data_label"> Город:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.RecCity}</div>
                        <div className="disp_data_label"> Адрес:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.RecAdress}</div>
                        <div className="disp_data_label"> Компания:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.RecCompany}</div>
                        <div className="disp_data_label"> Телефон:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.RecPhone}</div>
                        <div className="disp_data_label"> Контактное лицо:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.RecPerson}</div>
                        <div className="disp_data_label"> Доп. информация:</div>
                        <div className="disp_data_el">{this.props.store.disp.data.RecAddInfo}</div>
                    </div>

                </div>
                <div className="disp_cargo_table">
                    <div className="disp_cargo_table_header">Данные о грузах:</div>
                    <div className="disp_cargo_table_data">
                    {this.props.store.disp.cargo.reduce((accum, el) =>  accum + parseInt(el.Q), initialValue ) === parseInt(this.props.store.disp.data.Total) ? (
                    <Table compact celled size='small'>

                        <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Вес</Table.HeaderCell>
                        <Table.HeaderCell>Длина</Table.HeaderCell>
                        <Table.HeaderCell>Ширина</Table.HeaderCell>
                        <Table.HeaderCell>Высота</Table.HeaderCell>
                        <Table.HeaderCell>Об. вес</Table.HeaderCell>
                        <Table.HeaderCell>Количество</Table.HeaderCell>
                        <Table.HeaderCell>Итоговый вес</Table.HeaderCell>
                        <Table.HeaderCell>Итог. об. вес</Table.HeaderCell>
                        <Table.HeaderCell>Тип груза</Table.HeaderCell>
                        <Table.HeaderCell colSpan='2'>Комментарий</Table.HeaderCell>



                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                                {this.props.store.disp.cargo.map((cargo, index) =>
                                    <Table.Row key={index} >
                                       <Table.Cell>{cargo.Weight}</Table.Cell>
                                        <Table.Cell>{cargo.L}</Table.Cell>
                                        <Table.Cell>{cargo.W}</Table.Cell>
                                        <Table.Cell>{cargo.H}</Table.Cell>
                                        <Table.Cell>{cargo.Volume}</Table.Cell>
                                        <Table.Cell>{cargo.Q}</Table.Cell>
                                        <Table.Cell>{cargo.TotalWeight}</Table.Cell>
                                        <Table.Cell>{cargo.TotalVolume}</Table.Cell>
                                        <Table.Cell>{cargo.Type}</Table.Cell>
                                        <Table.Cell>{cargo.Comment}</Table.Cell>
                                    </Table.Row>)}
                                    </Table.Body>
                                        </Table>):(null)}
                    </div>
                </div>
                <div className="disp_cargo_data">
                    <div className="disp_data_label">Общее количество мест:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.Total}</div>
                    <div className="disp_data_label">Общий фактический вес:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.Weight}</div>
                    <div className="disp_data_label">Общий объемный вес:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.Volume}</div> 
                </div>
                {this.props.store.disp.action === "deliver"  && this.props.store.disp.data.Type === "Доставка" ? (<div>
                <div className="pod_header">Внести данные о доставке:</div>
                <div className="pod_data">
                    <div className="disp_data_label">Дата доставки</div>
                    <div className="disp_data_input"><input id="date" className="pod_input" type="date"></input></div>
                    <div className="disp_data_label">Время доставки</div>
                    <div className="disp_data_input"><input id="time" className="pod_input" type="time"></input></div>
                    <div className="disp_data_label">ФИО получателя</div>
                    <div className="disp_data_input"><input id="recient" className="pod_input" type="text"></input></div>
                    <div className="disp_data_label">Принятая сумма наличных</div>
                    <div className="disp_data_input"><input id="summ" className="pod_input" type="number"></input></div>
                    <div className="disp_data_label">Комментарий</div>
                    <div className="disp_data_input"><input id="comment" className="pod_input" type="text"></input></div>
                </div>
                <button onClick={this.sendpod.bind(this)} className="send_pod">Отметить доставленным и закрыть</button>
                </div>):(null)}

                {this.props.store.disp.action === "reciept" ? (<div>
                {/* <div className="pod_header">Принять накладную на склад:</div> */}
                {/* <div className="pod_data">
                    <div className="disp_data_label">Дата доставки</div>
                    <div className="disp_data_input"><input id="date" className="pod_input" type="date"></input></div>
                    <div className="disp_data_label">Время доставки</div>
                    <div className="disp_data_input"><input id="time" className="pod_input" type="time"></input></div>
                    <div className="disp_data_label">ФИО получателя</div>
                    <div className="disp_data_input"><input id="recient" className="pod_input" type="text"></input></div>
                    <div className="disp_data_label">Принятая сумма наличных</div>
                    <div className="disp_data_input"><input id="summ" className="pod_input" type="number"></input></div>
                    <div className="disp_data_label">Комментарий</div>
                    <div className="disp_data_input"><input id="comment" className="pod_input" type="text"></input></div>
                </div> */}
                <button onClick={this.reciept.bind(this)} className="send_pod">Принять на склад и закрыть</button>
                </div>):(null)}
                
            </div>

        );
    }
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_search_error: (param) => { dispatch({ type: 'set_search_error', payload: param }) },
    })
)(Screen);