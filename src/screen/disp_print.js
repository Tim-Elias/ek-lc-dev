import React from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Icon } from 'semantic-ui-react'
// import { get_data, get_file } from './../common/common_modules'
// import ReactToPrint from 'react-to-print'
import Barcode from 'react-barcode'
import logo from './../logo.svg';
import './disp.css';

class ComponentToPrint extends React.Component {

    
  render() {
    console.log(this.props.disp)
  let initialValue = 0  
    return (
        <div className='disp_print_list'>
        
        <div className='disp_print'>

            <div className='disp_print_header'>
            <div className="logo_container"><img className="header_logo" src={logo} /></div>
            <div className="city_container">{this.props.disp.data.RecCity}</div>
            <div><Barcode value={this.props.disp.data.Number} format='CODE39' width={1} height={30}/></div>
          </div>
          <div className="disp_print_address_data">
                  <div className="disp_print_address_data_header">Данные отправителя</div>
                  <div className="disp_print_address_data_header">Данные получателя</div>
                  <div className="disp_print_address_data_el">

                      <div className="disp_print_data_label"> Город:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SebdCity}</div>
                      <div className="disp_print_data_label"> Адрес:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendAdress}</div>
                      <div className="disp_print_data_label"> Компания:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendCompany}</div>
                      <div className="disp_print_data_label"> Телефон:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendPhone}</div>
                      <div className="disp_print_data_label"> Контактное лицо:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendPerson}</div>
                      <div className="disp_print_data_label"> Доп. информация:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendAddInfo}</div>
                  </div>

                  <div className="disp_print_address_data_el">

                      <div className="disp_print_data_label"> Город:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecCity}</div>
                      <div className="disp_print_data_label"> Адрес:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecAdress}</div>
                      <div className="disp_print_data_label"> Компания:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecCompany}</div>
                      <div className="disp_print_data_label"> Телефон:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecPhone}</div>
                      <div className="disp_print_data_label"> Контактное лицо:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecPerson}</div>
                      <div className="disp_print_data_label"> Доп. информация:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecAddInfo}</div>
                  </div>

              </div>
              <div className='disp_print_data'>

                  
                  <div>
                      <div className="disp_print_address_data_header">Данные об оплате</div>
                      <div className='disp_print_customer_data'>
                      <div className="disp_print_data_label"> Плательщик:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.Customer}</div>
                      <div className="disp_print_data_label"> Срочность:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.DelType}</div>
                      <div className="disp_print_data_label"> Вид доставки:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.DelMethod}</div>
                      <div className="disp_print_data_label"> Оплата:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.PayType}</div>
                      <div className="disp_print_data_label"> Страховая стоимость:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.InsureValue}</div>
                      <div className="disp_print_data_label"> Наложенный платеж:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.COD}</div>
                     
                  </div>
                  </div>
                  <div className='disp_print_cargo_data'>
                  {this.props.disp.cargo.reduce((accum, el) =>  accum + parseInt(el.Q), initialValue ) === parseInt(this.props.disp.data.Total) ? (
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
                              {this.props.disp.cargo.map((cargo, index) =>
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
                  ):(null)}
                  <div className="disp_print_cargo_footer">
                  <div className="disp_print_data_label">Итого мест (шт.):</div>
                  <div className="disp_print_data_el center">{this.props.disp.data.Total}</div>
                  <div></div>
                  <div className="disp_print_data_label">Итого вес (кг):</div>
                  <div className="disp_print_data_el center">{this.props.disp.data.Weight}</div>
                  <div></div>
                  <div className="disp_print_data_label">Итого V вес (кг):</div>
                  <div className="disp_print_data_el center">{this.props.disp.data.Volume}</div> 
              </div>
              </div>
              </div>

              <div className='disp_print_pod_container'>
              <table className='disp_print_pod_table'>
        <tbody>
          <tr>
            <td className='disp_print_pod_td'>Дата отправки</td>
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

      <div className='disp_print'>

            <div className='disp_print_header'>
            <div className="logo_container"><img className="header_logo" src={logo} /></div>
            <div className="city_container">{this.props.disp.data.RecCity}</div>
            <div><Barcode value={this.props.disp.data.Number} format='CODE39'  width={1} height={30}/></div>
          </div>
          <div className="disp_print_address_data">
                  <div className="disp_print_address_data_header">Данные отправителя</div>
                  <div className="disp_print_address_data_header">Данные получателя</div>
                  <div className="disp_print_address_data_el">

                      <div className="disp_print_data_label"> Город:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SebdCity}</div>
                      <div className="disp_print_data_label"> Адрес:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendAdress}</div>
                      <div className="disp_print_data_label"> Компания:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendCompany}</div>
                      <div className="disp_print_data_label"> Телефон:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendPhone}</div>
                      <div className="disp_print_data_label"> Контактное лицо:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendPerson}</div>
                      <div className="disp_print_data_label"> Доп. информация:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.SendAddInfo}</div>
                  </div>

                  <div className="disp_print_address_data_el">

                      <div className="disp_print_data_label"> Город:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecCity}</div>
                      <div className="disp_print_data_label"> Адрес:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecAdress}</div>
                      <div className="disp_print_data_label"> Компания:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecCompany}</div>
                      <div className="disp_print_data_label"> Телефон:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecPhone}</div>
                      <div className="disp_print_data_label"> Контактное лицо:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecPerson}</div>
                      <div className="disp_print_data_label"> Доп. информация:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.RecAddInfo}</div>
                  </div>

              </div>
              <div className='disp_print_data'>

                  
                  <div>
                      <div className="disp_print_address_data_header">Данные об оплате</div>
                      <div className='disp_print_customer_data'>
                      <div className="disp_print_data_label"> Плательщик:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.Customer}</div>
                      <div className="disp_print_data_label"> Срочность:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.DelType}</div>
                      <div className="disp_print_data_label"> Вид доставки:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.DelMethod}</div>
                      <div className="disp_print_data_label"> Оплата:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.PayType}</div>
                      <div className="disp_print_data_label"> Страховая стоимость:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.InsureValue}</div>
                      <div className="disp_print_data_label"> Наложенный платеж:</div>
                      <div className="disp_print_data_el">{this.props.disp.data.COD}</div>
                     
                  </div>
                  </div>
                  <div className='disp_print_cargo_data'>
                  {this.props.disp.cargo.reduce((accum, el) =>  accum + parseInt(el.Q), initialValue ) === parseInt(this.props.disp.data.Total) ? (
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
                              {this.props.disp.cargo.map((cargo, index) =>
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
                  ):(null)}
                  
                  <div className="disp_print_cargo_footer">
                  <div className="disp_print_data_label">Итого мест (шт.):</div>
                  <div className="disp_print_data_el center">{this.props.disp.data.Total}</div>
                  <div></div>
                  <div className="disp_print_data_label">Итого вес (кг):</div>
                  <div className="disp_print_data_el center">{this.props.disp.data.Weight}</div>
                  <div></div>
                  <div className="disp_print_data_label">Итого V вес (кг):</div>
                  <div className="disp_print_data_el center">{this.props.disp.data.Volume}</div> 
              </div>
              </div>
              </div>

              <div className='disp_print_pod_container'>
              <table className='disp_print_pod_table'>
        <tbody>
          <tr>
            <td className='disp_print_pod_td'><div>Дата отправки</div></td>
            <td className='disp_print_pod_td'><div>Время</div></td>
            <td className='disp_print_pod_td'><div>Отправитель (Ф.И.О.)</div></td>
                          <td className='disp_print_pod_td'><div>Подпись</div></td>
            <td className='disp_print_pod_td'><div>Курьер (Ф.И.О.)</div></td>
            <td className='disp_print_pod_td'><div>Подпись</div></td>
          </tr>
          <tr>
              <td className='disp_print_pod_td'><div>Дата доставки</div></td>
            <td className='disp_print_pod_td'><div>Время</div></td>
            <td className='disp_print_pod_td'><div>Получатель (Ф.И.О.)</div></td>
                          <td className='disp_print_pod_td'><div>Подпись</div></td>
            <td className='disp_print_pod_td'><div>Курьер (Ф.И.О.)</div></td>
            <td className='disp_print_pod_td'><div>Подпись</div></td></tr>
        </tbody>
      </table>

              </div>
         
      </div>

      </div>
    );
  }
}



export default ComponentToPrint;