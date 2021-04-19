import React from 'react';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print'
import QRCode from 'qrcode.react';
import './mobile_check_print.css';


class Screen extends React.Component {

    componentWillUnmount() {
        this.props.set_select_print_disp("");
    }
    
    render() {
    let print_button
        if (this.props.store.check.check_data.num == this.props.store.disp.data.Number || this.props.store.check.check_data.num == this.props.store.movement.select_print_disp){
            print_button = false;
        } else {
            print_button = true;
        }

        return (
            <div className="mobile_disp_button">
                <ReactToPrint

                    trigger={() => <button className={(this.props.store.check.check_data.num == this.props.store.disp.data.Number || this.props.store.check.check_data.num == this.props.store.movement.select_print_disp) ? ("mobile_disp_button_item mobile_disp_button_item--blue") : ("none")} disabled={print_button}>Печать чека</button>}
                    content={() => this.componentRef}
                />

                <div style={{ display: "none" }}>
                    <div ref={el => (this.componentRef = el)}>
                        
                        <div className="check_print_qr">
                            <div className="check_print_row check_print_row--center">{this.props.store.check.check_data.organization}</div>
                            <div className="check_print_row check_print_row--center">Кассовый чек</div>
                            <div className="check_print_row">Приход</div>
                            <div className="check_print_row">Оплата по накладной {this.props.store.check.check_data.num}</div>
                            <div className="check_print_row check_print_row--right">1.000 * {this.props.store.check.check_data.summ}&equiv; {this.props.store.check.check_data.summ}</div>
                            <div className="check_print_row">Товар</div>
                            <div className="check_print_row">Полный расчет</div>
                            <div className="check_print_row">
                                <h2>ИТОГ</h2>
                                <h2>&equiv;{this.props.store.check.check_data.summ}</h2>
                            </div>
                            <div className="check_print_row">
                                <div>Сумма без НДС</div>
                                <div>&equiv;{this.props.store.check.check_data.summ}</div>
                            </div>
                            <div className="check_print_row">
                                <div>{this.props.store.check.check_data.type == 0 ? ("Наличными") : ("Безналичными")}</div>
                                <div>&equiv;{this.props.store.check.check_data.summ}</div>
                            </div>
                            <div className="check_print_row">
                                <div>Получено</div>
                                <div>&equiv;{this.props.store.check.check_data.summ}</div>
                            </div>
                            <div className="check_print_row">
                                <div>СНО:</div>
                                <div>УСН доход-расход</div>
                            </div>
                            <div className="check_print_row">
                                Пользователь: {this.props.store.check.check_data.organization}
                            </div>
                            <div className="check_print_row">
                                Адрес: {this.props.store.check.check_data.adress}
                            </div>
                            <div className="check_print_row">
                                <div>Место расчетов: </div>
                                <div>Склад 5</div>
                            </div>
                            <div className="check_print_row">
                                <div>Кассир: </div>
                                <div>Системный администратор</div>
                            </div>
                            <div className="check_print_row">
                                <div>Сайт ФНС: </div>
                                <div>www.nalog.ru</div>
                            </div>
                            <div className="check_print_row">
                                <div>ЗН ККТ: </div>
                                <div>{this.props.store.check.check_data.zn}</div>
                            </div>
                            <div className="check_print_row">
                                <div>Смена №</div>
                                <div>{this.props.store.check.check_data.smena}</div>
                            </div>
                            <div className="check_print_row">
                                <div>Чек №</div>
                                <div>{this.props.store.check.check_data.check_number}</div>
                            </div>
                            <div className="check_print_row">
                                <div>Дата Время: </div>
                                <div>{this.props.store.check.check_data.date}</div>
                            </div>
                            <div className="check_print_row">
                                ОФД: ООО "ПЕТЕР-СЕРВИС Спецтехнологии"
                            </div>
                            <div className="check_print_row">
                                <div>ИНН: </div>
                                <div>{this.props.store.check.check_data.inn}</div>
                            </div>
                            <div className="check_print_row">
                                <div>РН ККТ : </div>
                                <div>{this.props.store.check.check_data.rn}</div>
                            </div>
                            <div className="check_print_row">
                                <div>ФН №</div>
                                <div>{this.props.store.check.check_data.fn}</div>
                            </div>
                            <div className="check_print_row">
                                <div>ФД №</div>
                                <div>{this.props.store.check.check_data.fd}</div>
                            </div>
                            <div className="check_print_row">
                                <div>ФП:</div>
                                <div>{this.props.store.check.check_data.fpd}</div>
                            </div>
                            <br />
                            <QRCode className="qr" value={this.props.store.check.check_data.qr} />
                            <br />
                            <div className="check_print_row check_print_row--center">
                                <h4>СПАСИБО ЗА ПОКУПКУ!</h4>
                            </div>
                        </div>   
                        
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
        set_select_print_disp: (param) => { dispatch({ type: 'set_select_print_disp', payload: param }); },
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }); },
        set_date_start: (param) => { dispatch({ type: 'set_date_start', payload: param }) },
        set_date_end: (param) => { dispatch({ type: 'set_date_end', payload: param }) },
        set_profit_for_period: (param) => { dispatch({ type: 'set_profit_for_period', payload: param }) }, 
        set_disp_list: (param) => { dispatch({ type: 'set_disp_list', payload: param }) }, 
    })

)(Screen);