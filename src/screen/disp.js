import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react'
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
        const last_window = this.props.store.general.last_window[this.props.store.general.last_window.length -1]
        this.props.pop_last_window();
        this.props.set_active_window(last_window);
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
    
    SelectSendCity = (value) =>{
    
        //console.log(value)
    
      this.props.SetSelectedSendCity(value)
    
        const city = value.label
        this.props.SetSendCity(city)
        
        get_data('terminallist', {city}).then(
              (result) => {
                
                this.props.SetSendTerminalList(result)
                if (result.length === 0) {
                  this.SetSendTerminal(false)
                }
                
              },
              (err) => { 
                  console.log("err")  
                  console.log(err) 
              }
          );
      }
    
      SelectRecCity = (value) =>{
    
        this.props.SetSelectedRecCity(value)
    
        const city = value.label
        this.props.SetRecCity(city)
        
        get_data('terminallist', {city}).then(
              (result) => {
                
                this.props.SetRecTerminalList(result)
                if (result.length === 0) {
                  this.SetRecTerminal(false)
                }
              },
              (err) => { 
                  console.log("err")  
                  console.log(err) 
              }
          );
      }

    copy_disp = () =>{
        this.props.set_active_window('wait')
        const current_disp_data = this.props.store.disp.data
        const copy_disp_cargo = this.props.store.disp.cargo
        let CargoInfoType 
        this.props.reset_create_disp_data()
                get_data('citylist').then(
                (result) => {
                    this.props.SetCityList(result);

                    if(this.props.store.disp.cargo.reduce((accum, el) => accum + parseInt(el.Q), 0) === parseInt(this.props.store.disp.data.Total)){
                        CargoInfoType = { label: 'Внести информацию о каждом грузе', value: false }
                    } else {
                        CargoInfoType = {label:"Указать итогвые значения", value: true}
                    }


                    const SelectedSendCity = result.filter((el)=>el.value === current_disp_data.SebdCity)[0]
                    const SelectedRecCity = result.filter((el)=>el.value === current_disp_data.RecCity)[0]
                    
                   

                    let RecTerminal = false
                    let SendTerminal = false
                
                    switch (current_disp_data.DelMethod) {
                        case 'Склад-Дверь': 
                            SendTerminal = true
                           
                            break
                        case 'Склад-Склад': 
                            RecTerminal = true
                            SendTerminal = true
                           
                            break
                        case 'Дверь-Склад': 
                            RecTerminal = true
                          
                            break
                        default: break;
                    } 

                    const copy_disp_data = {
                      
                        RecTerminal: RecTerminal,
                        SendTerminal: SendTerminal,
                        
                        SendAdress: current_disp_data.SendAdress,
                        SendCompany: current_disp_data.SendCompany,
                        SendPhone: current_disp_data.SendPhone,
                        SendPerson: current_disp_data.SendPerson,
                        SendAddInfo: current_disp_data.SendAddInfo,
                        SendEmail: current_disp_data.SendEmail,
                        RecAdress: current_disp_data.RecAdress,
                        RecCompany: current_disp_data.RecCompany,
                        RecPhone: current_disp_data.RecPhone,
                        RecPerson: current_disp_data. RecPerson,
                        RecAddInfo: current_disp_data.RecAddInfo,
                        RecEmail: current_disp_data.RecEmail,
                        

                        CargoInfoType: CargoInfoType,
                        
                        Cargo: copy_disp_cargo,

                        Total: current_disp_data.Total,
                        Weight: current_disp_data.Weight,
                        Volume: current_disp_data.Volume,

                    }

                  


                    this.props.set_copy_disp_data(copy_disp_data)
                    if (SelectedSendCity !== undefined) {this.SelectSendCity(SelectedSendCity)}
                    if (SelectedRecCity !== undefined) {this.SelectRecCity(SelectedRecCity)}
                    

                    this.props.set_active_window('create_disp');


                },
                (err) => { console.log(err) }
            );


            
        



    }
    SetSendTerminal = (param) => {
        let DelMethod
      
        if (this.props.store.create_disp.RecTerminal){
          if(param){
             DelMethod = "Склад - Склад"
          } else {
             DelMethod = "Дверь - Склад"
          }
        } else {
          if(param){
             DelMethod = "Склад - Дверь"
          } else {
             DelMethod = "Дверь - Дверь"
          }
        }
    
        const data = {
          SendTerminal: param,
          DelMethod: DelMethod
        }
    
        this.props.SetSendTerminal(data)
        
      }
    
      SetRecTerminal = (param) => {
        let DelMethod
        if (param){
          if(this.props.store.create_disp.SendTerminal){
             DelMethod = "Склад - Склад"
          } else {
             DelMethod = "Дверь - Склад"
          }
        } else {
          if(this.props.store.create_disp.SendTerminal){
             DelMethod = "Склад - Дверь"
          } else {
             DelMethod = "Дверь - Дверь"
          }
        }
    
        const data = {
          RecTerminal: param,
          DelMethod: DelMethod
        }
        this.props.SetRecTerminal(data)
      }

    render() {

        let CargoInfoType = false
        if (this.props.store.disp.cargo.reduce((accum, el) => accum + parseInt(el.Q), 0) === parseInt(this.props.store.disp.data.Total)){
            CargoInfoType = true
        }
        
        return (

            <div>
                <div className="disp_Number">

                    <div><Button compact icon onClick={this.back.bind(this)}>
                        <Icon name='arrow left' />
                    </Button> {this.props.store.disp.data.Type} <b>{this.props.store.disp.data.Number}   </b>


                        <ReactToPrint
                            trigger={() => <Button><Icon name='print'></Icon> Печать</Button>}
                            content={() => this.componentRef}
                        />
                        <div style={{ display: "none" }}>
                            <ComponentToPrint disp={[this.props.store.disp]} ref={el => (this.componentRef = el)} />
                        </div>

                        {this.props.store.login.print_ticket ? (<ReactToPrint
                            trigger={() => <Button><Icon name='print'></Icon> Печать наклеек</Button>}
                            content={() => this.stickerRef}
                        />) : (null)}
                        <div style={{ display: "none" }}>
                            <StickerToPrint disp={[this.props.store.disp]} ref={el => (this.stickerRef = el)} />
                        </div>

                        <Modal
                            trigger={<Button onClick={this.open_history.bind(this)}>История</Button>}
                            open={this.props.store.disp.show_history}
                            onClose={this.close_history.bind(this)}
                        >
                            <Modal.Header>История накладной {this.props.store.disp.data.Number}</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <div>
                                        {this.props.store.disp.history_loading ? (
                                            <div>
                                                <Dimmer active inverted>
                                                    <Loader inverted content='Loading' />
                                                </Dimmer>
                                            </div>
                                        ) : (
                                                <Table celled compact='very'>
                                                    <Table.Header className="create_disp_template_list_th">
                                                        <Table.Row>
                                                            <Table.HeaderCell>Дата</Table.HeaderCell>
                                                            <Table.HeaderCell>Статус</Table.HeaderCell>
                                                            <Table.HeaderCell>Комментарий</Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>

                                                    <Table.Body>
                                                        {this.props.store.disp.history.map((el, index) =>

                                                            <Table.Row className="create_disp_template_list_tr" key={index}>
                                                                <Table.Cell >{el.Date}</Table.Cell>
                                                                <Table.Cell>{el.Status}</Table.Cell>
                                                                <Table.Cell>{el.Comment}</Table.Cell>
                                                            </Table.Row>
                                                        )}
                                                    </Table.Body>
                                                </Table>
                                            )}

                                    </div>

                                </Modal.Description>
                            </Modal.Content>
                        </Modal>

                        {this.props.store.login.create_disp && (this.props.store.login.total_only || CargoInfoType ) ? (
                            <Button onClick={this.copy_disp.bind(this)}>Скопировать</Button>
                        ) : (null)}

                        {this.props.store.login.edit_disp && this.props.store.disp.data.Status == 'Ожидается от отправителя' ? (<Modal closeIcon
                            trigger={<Button onClick={this.remove_disp.bind(this)}>Удалить</Button>}
                            open={this.props.store.disp.show_remove_modal}
                            onClose={this.close_remove_modal.bind(this)}
                        >
                            <Modal.Header>Удаление накладной {this.props.store.disp.data.Number}</Modal.Header>
                            <Modal.Content>
                                {this.props.store.disp.remove_confirm ? (
                                    <Modal.Description>
                                        {this.props.store.disp.history_loading ? (
                                            <div>
                                                <Dimmer active inverted>
                                                    <Loader inverted content='Loading' />
                                                </Dimmer>
                                            </div>
                                        ) : (
                                                <div>
                                                    {this.props.store.disp.text_remove_modal}
                                                </div>
                                            )}

                                    </Modal.Description>
                                ) : (<Modal.Description>
                                    Действительно хотите удалить накладную {this.props.store.disp.data.Number} ?
                            </Modal.Description>)}
                            </Modal.Content>
                            {this.props.store.disp.remove_confirm ? (null) : (
                                <Modal.Actions>
                                    <Button color='red' onClick={this.close_remove_modal.bind(this)}>
                                        <Icon name='remove' /> Нет
                            </Button>
                                    <Button color='green' onClick={this.confirm_remove_disp.bind(this)}>
                                        <Icon name='checkmark' /> Да
                            </Button>
                                </Modal.Actions>
                            )}


                        </Modal>) : (null)}

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
                        {CargoInfoType ? (
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
                            </Table>) : (null)}
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
                <div className="disp_cargo_data">
                    <div className="disp_data_label">Страховая стоимость:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.InsureValue}</div>
                    <div className="disp_data_label">Наложенный платеж:</div>
                    <div className="disp_data_el">{this.props.store.disp.data.COD}</div>
                    
                </div>
                {this.props.store.disp.action === "deliver" && this.props.store.disp.data.Type === "Доставка" ? (<div>
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
                </div>) : (null)}

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
                </div>) : (null)}

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
        set_disp_history_loading: (param) => { dispatch({ type: 'set_disp_history_loading', payload: param }) },
        set_disp_history: (param) => { dispatch({ type: 'set_disp_history', payload: param }) },
        set_disp_show_history: (param) => { dispatch({ type: 'set_disp_show_history', payload: param }) },
        set_my_disp_data: (param) => { dispatch({ type: 'set_my_disp_data', payload: param }) },

        set_disp_remove_modal_loading: (param) => { dispatch({ type: 'set_disp_remove_modal_loading', payload: param }) },
        set_disp_text_remove_modal: (param) => { dispatch({ type: 'set_disp_text_remove_modal', payload: param }) },
        set_disp_show_remove_modal: (param) => { dispatch({ type: 'set_disp_show_remove_modal', payload: param }) },
        reset_create_disp_data: () => { dispatch({ type: 'reset_create_disp_data'}) },
        SetCityList: (param) => { dispatch({ type: 'SetCityList', payload: param }) },
        set_disp_remove_confirm: (param) => { dispatch({ type: 'set_disp_remove_confirm', payload: param }) },
        set_copy_disp_data: (param) => { dispatch({ type: 'set_copy_disp_data', payload: param }) },

        SetSelectedSendCity: (param) => { dispatch({ type: 'SetSelectedSendCity', payload: param }) },
        SetSelectedRecCity: (param) => { dispatch({ type: 'SetSelectedRecCity', payload: param }) },
        SetRecSelectTerminal: (param) => { dispatch({ type: 'SetRecSelectTerminal', payload: param }) },
        SetRecTerminalList: (param) => { dispatch({ type: 'SetRecTerminalList', payload: param }) },
        SetSendSelectTerminal: (param) => { dispatch({ type: 'SetSendSelectTerminal', payload: param }) },
        SetSendTerminalList: (param) => { dispatch({ type: 'SetSendTerminalList', payload: param }) },
        SetRecCity: (param) => { dispatch({ type: 'SetRecCity', payload: param }) },
        SetSendCity: (param) => { dispatch({ type: 'SetSendCity', payload: param }) },
        SetSendTerminal: (param) => { dispatch({ type: 'SetSendTerminal', payload: param }) },
        SetRecTerminal: (param) => { dispatch({ type: 'SetRecTerminal', payload: param }) },
        pop_last_window: () => { dispatch({ type: 'pop_last_window'}) },
    })
)(Screen);