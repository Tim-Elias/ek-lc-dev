import React from 'react';
import Barcode from 'react-barcode'
import logo from './../logo.svg';
import QRCode from 'qrcode.react';
import './disp.css';

class ComponentToPrint extends React.Component {


    render() {
        const imageSettings ={
            height: 10,
            width: 10
        }

        //console.log(this.props.disp)
        let initialValue = 0
        const today = new Date()
  let mm = today.getMonth() + 1; // getMonth() is zero-based
  let dd = today.getDate();

  const year = today.getFullYear()

  if (mm<10) { mm = '0' + mm }
  if (dd<10) {dd = '0' + dd}
        
  const curDate = dd+'.'+mm+'.'+year
        return (
            <div>
                {this.props.disp.map((disp, index) => {
                    let disp_print_data = []
                    for (let ff = 0; ff < 4; ff++) {
                        disp_print_data.push(<div key={index.toString() + ff.toString()}>

                            <div className='disp_print'>

                                <div className='disp_print_header'>
                                    <div className="logo_container"><img className="header_logo" src={logo} /></div>
                                    <div className="city_container">{disp.data.RecCity}</div>
                                    <div className="qrcode_container">
                                        <QRCode value={disp.data.Number} />
                                    </div>
                                    <div className="barcode_container"><Barcode value={disp.data.Number} format='CODE39' width={1} height={30} /></div>
                                </div>
                                <div className="disp_print_address_data">
                                    <div className="disp_print_address_data_header">Данные отправителя</div>
                                    <div className="disp_print_address_data_header">Данные получателя</div>
                                    <div className="disp_print_address_data_el">

                                        <div className="disp_print_data_label"> Город:</div>
                                        <div className="disp_print_data_el">{disp.data.SebdCity}</div>
                                        <div className="disp_print_data_label"> Адрес:</div>
                                        <div className="disp_print_data_el">{disp.data.SendAdress}</div>
                                        <div className="disp_print_data_label"> Компания:</div>
                                        <div className="disp_print_data_el">{disp.data.SendCompany}</div>
                                        <div className="disp_print_data_label"> Телефон:</div>
                                        <div className="disp_print_data_el">{disp.data.SendPhone}</div>
                                        <div className="disp_print_data_label"> Контактное лицо:</div>
                                        <div className="disp_print_data_el">{disp.data.SendPerson}</div>
                                        <div className="disp_print_data_label"> Доп. информация:</div>
                                        <div className="disp_print_data_el">{disp.data.SendAddInfo}</div>
                                    </div>

                                    <div className="disp_print_address_data_el">

                                        <div className="disp_print_data_label"> Город:</div>
                                        <div className="disp_print_data_el">{disp.data.RecCity}</div>
                                        <div className="disp_print_data_label"> Адрес:</div>
                                        <div className="disp_print_data_el">{disp.data.RecAdress}</div>
                                        <div className="disp_print_data_label"> Компания:</div>
                                        <div className="disp_print_data_el">{disp.data.RecCompany}</div>
                                        <div className="disp_print_data_label"> Телефон:</div>
                                        <div className="disp_print_data_el">{disp.data.RecPhone}</div>
                                        <div className="disp_print_data_label"> Контактное лицо:</div>
                                        <div className="disp_print_data_el">{disp.data.RecPerson}</div>
                                        <div className="disp_print_data_label"> Доп. информация:</div>
                                        <div className="disp_print_data_el">{disp.data.RecAddInfo}</div>
                                    </div>

                                </div>
                                <div className='disp_print_data'>


                                    <div>
                                        <div className="disp_print_address_data_header">Данные об оплате</div>
                                        <div className='disp_print_customer_data'>
                                            <div className="disp_print_data_label"> Плательщик:</div>
                                            <div className="disp_print_data_el">{disp.data.Customer}</div>
                                            <div className="disp_print_data_label"> Срочность:</div>
                                            <div className="disp_print_data_el">{disp.data.DelType}</div>
                                            <div className="disp_print_data_label"> Вид доставки:</div>
                                            <div className="disp_print_data_el">{disp.data.DelMethod}</div>
                                            <div className="disp_print_data_label"> Оплата:</div>
                                            <div className="disp_print_data_el">{disp.data.PayType}</div>
                                            { disp.data.InsureValue !== 0 ? (
                                                 <div className="disp_print_data_label"> Страховая стоимость:</div>
                                            ):(null)}
                                            { disp.data.InsureValue !== 0 ? (
                                                  <div className="disp_print_data_el">{disp.data.InsureValue}</div>
                                            ):(null)}
                                            
                                            <div className="disp_print_data_label"> Наложенный платеж:</div>
                                            <div className="disp_print_data_el">{disp.data.COD}</div>

                                        </div>
                                    </div>
                                    <div className='disp_print_cargo_data'>
                                        {disp.cargo.reduce((accum, el) => accum + parseInt(el.Q), initialValue) === parseInt(disp.data.Total) ? (
                                            <table className='disp_print_cargo_table'>
                                                <thead>
                                                    <tr>
                                                        <th className='disp_print_cargo_th top_left_border_radius'>Вес</th>
                                                        <th className='disp_print_cargo_th'>Длина</th>
                                                        <th className='disp_print_cargo_th'>Ширина</th>
                                                        <th className='disp_print_cargo_th'>Высота</th>
                                                        <th className='disp_print_cargo_th'>V вес</th>
                                                        <th className='disp_print_cargo_th'>Кол-во</th>
                                                        <th className='disp_print_cargo_th'>Σ вес</th>
                                                        <th className='disp_print_cargo_th'>Σ V вес</th>
                                                        <th className='disp_print_cargo_th'>Тип груза</th>
                                                        <th className='disp_print_cargo_th top_right_border_radius'>Коммент.</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {disp.cargo.map((cargo, index) =>
                                                        <tr key={index} >
                                                            <td className='disp_print_cargo_td'>{cargo.Weight}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.L}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.W}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.H}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.Volume}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.Q}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.TotalWeight}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.TotalVolume}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.Type}</td>
                                                            <td className='disp_print_cargo_td'>{cargo.Comment}</td>
                                                        </tr>)}
                                                </tbody>
                                            </table>
                                        ) : (null)}
                                        <div className="disp_print_cargo_footer">
                                            <div className="disp_print_data_label">Итого мест (шт.):</div>
                                            <div className="disp_print_data_el center">{disp.data.Total}</div>
                                            <div></div>
                                            <div className="disp_print_data_label">Итого вес (кг):</div>
                                            <div className="disp_print_data_el center">{disp.data.Weight}</div>
                                            <div></div>
                                            <div className="disp_print_data_label">Итого V вес (кг):</div>
                                            <div className="disp_print_data_el center">{disp.data.Volume}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='disp_print_pod_container'>
                                    <table className='disp_print_pod_table'>
                                        <tbody>
                                            <tr>
                                                <td className='disp_print_pod_td'>{this.props.userkey === "000000001" ? (<div className="send_date">{curDate}</div>):(null)}<br></br>Дата отправки</td>
                                                <td className='disp_print_pod_td'>Время</td>
                                                <td className='disp_print_pod_td'>Отправитель (Ф.И.О.)</td>
                                                <td className='disp_print_pod_td'>Подпись</td>
                                                <td className='disp_print_pod_td'>Курьер (Ф.И.О.)</td>
                                                <td className='disp_print_pod_td'>Подпись</td>
                                            </tr>
                                            <tr>
                                                <td className='disp_print_pod_td'>Дата доставки</td>
                                                <td className='disp_print_pod_td'>Время</td>
                                                <td className='disp_print_pod_td'>Получатель (Ф.И.О.)</td>
                                                <td className='disp_print_pod_td'>Подпись</td>
                                                <td className='disp_print_pod_td'>Курьер (Ф.И.О.)</td>
                                                <td className='disp_print_pod_td'>Подпись</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>)
                    }
                    return disp_print_data

                })}

            </div>
        );
    }
}



export default ComponentToPrint;