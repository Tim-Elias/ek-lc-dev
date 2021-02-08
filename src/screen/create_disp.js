import React from 'react'
import { connect } from 'react-redux'
import './create_disp.css'
import { get_data } from './../common/common_modules'
import Select from 'react-select'

import { customStyles } from "./../common/common_style";
import { Table, Modal, Button, Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'



// Tim 48


const PayTypeList = [
  {label:"Безналичная оплата", value:"БезналичнаяОплата"},
  {label:"Оплата наличными при отправлении", value:"ОплатаНаличнымиПриОтправлении"},
  {label:"Оплата наличными при получении", value:"ОплатаНаличнымиПриПолучении"}
]

const CargoInfoTypeList = [
  {label:"Указать итогвые значения", value: true},
  {label:"Внести информацию о каждом грузе", value: false}
]

const CargoTypeList = [
  {label:"Сейф-пакет", value: "СейфПакет"},
  {label:"Коробка", value: "Коробка"},
  {label:"Контейнер", value: "Контейнер"},
  {label:"Мешок под пломбой", value: "МешокПодПломбой"},
  {label:"Прочее", value: "Прочее"}
]

class Screen extends React.Component {

CalcPrice = (total_weight, total_volume) => {
  
  let weight;
  let volume ;


  if(this.props.store.create_disp.CargoInfoType.value) {
    weight = this.props.store.create_disp.Weight;
    volume = this.props.store.create_disp.Volume;
  } else {
    weight = total_weight;
    volume = total_volume;
  }
  
  const create_disp_data = {
    userkey: this.props.store.login.userkey, 
    SendCity: this.props.store.create_disp.SendCity, 
    SendTerminal: this.props.store.create_disp.SendTerminal, 
    RecCity: this.props.store.create_disp.RecCity, 
    RecTerminal: this.props.store.create_disp.RecTerminal, 
    Volume: volume, 
    Weight: weight, 
  }

  get_data('customercalc', create_disp_data).then(
    (result) => {
      this.props.SetPrice(result);
    }
  );
}

TotalQ = () => {
  return 1
  // this.props.store.create_disp.Cargo.reduce((accumulator,currentValue)=>
  //                   {
  //                     return accumulator + [currentValue.Q]
  //                   })
}

AddCargo = () => {
  this.props.AddCargo()
}

RemoveCargo = (index) => {
  this.props.RemoveCargo(index)
}

  SetCargoWeight = (value,index) =>{
    const data = {
      value: value,
      index: index
    }
    this.props.SetCargoWeight(data)
  }

  SetCargoW = (value,index) =>{
    const data = {
      value: value,
      index: index
    }
    this.props.SetCargoW(data)
  }

  SetCargoL = (value,index) =>{
    const data = {
      value: value,
      index: index
    }
    this.props.SetCargoL(data)
  }

  SetCargoH = (value,index) =>{
    const data = {
      value: value,
      index: index
    }
    this.props.SetCargoH(data)
  }

  SetCargoQ = (value,index) =>{
    const data = {
      value: value,
      index: index
    }
    this.props.SetCargoQ(data)
  }

  SetCargoComment = (value,index) =>{
    const data = {
      value: value,
      index: index
    }
    this.props.SetCargoComment(data)
  }

  SetCargoType = (value,index) =>{
    const data = {
      value: value,
      index: index
    }
    this.props.SetCargoType(data)
  }

  handleKeyPress = (e) =>{
    if(e.keyCode === 13){
      e.target.blur(); 
    }
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

  SelectRecCity = (value) => {

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

  sent_disp = () => {

    const create_disp_data = {
      userkey: this.props.store.login.userkey, 
      Number: this.props.store.create_disp.Number,
      PayType: this.props.store.create_disp.PayType.value,
      DispDate: this.props.store.create_disp.DispDate,
      SendCity: this.props.store.create_disp.SendCity, 
      SendAdress: this.props.store.create_disp.SendAdress,
      SendCompany: this.props.store.create_disp.SendCompany,
      SendPhone: this.props.store.create_disp.SendPhone,
      SendPerson: this.props.store.create_disp.SendPerson,
      SendAddInfo: this.props.store.create_disp.SendAddInfo,
      SendEmail: this.props.store.create_disp.SendEmail,
      SendTerminal: this.props.store.create_disp.SendTerminal, 
      SendSelectTerminal: this.props.store.create_disp.SendSelectTerminal.value,
      SendEmailInformer: this.props.store.create_disp.SendEmailInformer,

      RecCity: this.props.store.create_disp.RecCity, 
      RecAdress: this.props.store.create_disp.RecAdress,
      RecCompany: this.props.store.create_disp.RecCompany,
      RecPhone: this.props.store.create_disp.RecPhone,
      RecPerson: this.props.store.create_disp.RecPerson,
      RecAddInfo: this.props.store.create_disp.RecAddInfo,
      RecEmail: this.props.store.create_disp.RecEmail,
      RecTerminal: this.props.store.create_disp.RecTerminal, 
      RecSelectTerminal: this.props.store.create_disp.RecSelectTerminal,
      RecEmailInformer: this.props.store.create_disp.RecEmailInformer,

      Cargo: this.props.store.create_disp.Cargo,
      Total: this.props.store.create_disp.Total,
      Volume: this.props.store.create_disp.Volume, 
      Weight: this.props.store.create_disp.Weight, 

      InsureValue: this.props.store.create_disp.InsureValue,
      COD: this.props.store.create_disp.COD,
      CargoInfoType: this.props.store.create_disp.CargoInfoType.value

    }

    
      this.props.set_active_window("wait");
  
      get_data('createcustomerdisp', create_disp_data).then(
        (result) => {

              const data = {
                userkey: this.props.store.login.userkey,
                status: "Накладная",
                num: result.Number
              };
          
              get_data('dispatch', data).then(
                (result) => {
                 
                  this.props.set_data_disp(result);
                  this.props.set_active_window("disp");
                  this.props.set_last_window("create_disp");
                  
                },
                (err) => { console.log(err) }
              );
        },
        (err) => { console.log(err) }
      );
  }

  SelectSendTemplate = (value) => {
    if(value!==null){
      const city = this.props.store.create_disp.CityList.filter((el)=>el.value === value.City)[0]
    
      this.SelectSendCity(city)
      this.props.SetSendAdress(value.Adress)
      this.props.SetSendAdress(value.Adress)
      this.props.SetSendPhone(value.Phone)
      this.props.SetSendPerson(value.Person)
      this.props.SetSendCompany(value.Company)
      this.props.SetSendAddInfo(value.AddInfo)

      this.SetSendTerminal(value.Terminal)
      
    }
    this.props.SetOpenModalSendTemplate(false)
  }

  SelectRecTemplate = (value) => {
    if(value!==null){
      const city = this.props.store.create_disp.CityList.filter((el)=>el.value === value.City)[0]
      //console.log(value)
      this.SelectRecCity(city)
      this.props.SetRecAdress(value.Adress)
      this.props.SetRecAdress(value.Adress)
      this.props.SetRecPhone(value.Phone)
      this.props.SetRecPerson(value.Person)
      this.props.SetRecCompany(value.Company)
      this.props.SetRecAddInfo(value.AddInfo)

      this.SetRecTerminal(value.Terminal)
      
    }
    this.props.SetOpenModalRecTemplate(false)
  }

OpenSendTemplateModal = () => {
  this.props.SetOpenModalSendTemplate(true)
}

OpenRecTemplateModal = () => {
  this.props.SetOpenModalRecTemplate(true)
}

SetTotal = (value) =>{
  this.props.SetTotal(value)
  if (this.props.store.login.Q_only){
    const Weight = value * parseInt(this.props.store.login.default_cargo)
    this.props.SetWeight(Weight)
    this.props.SetVolume(Weight)
  }


}
  


  render() {
    const Q_only = this.props.store.login.Q_only
    document.onkeydown = function (event) {}

    let disabled = false
    let total_weight = Math.ceil(this.props.store.create_disp.Cargo.reduce((accumulator, Cargo) => accumulator + Math.ceil(Cargo.Weight * Cargo.Q*1000)/1000, 0)*1000)/1000
    let total_volume = Math.ceil(this.props.store.create_disp.Cargo.reduce((accumulator, Cargo) => accumulator + Math.ceil(Cargo.L * Cargo.W * Cargo.H * Cargo.Q / 5) / 1000, 0) * 1000) / 1000

    if(this.props.store.create_disp.SelectedSendCity===null 
      || this.props.store.create_disp.SelectedRecCity===null 
      || (this.props.store.create_disp.Total==0 && this.props.store.create_disp.CargoInfoType.value)
      || (this.props.store.create_disp.Weight==0 && this.props.store.create_disp.CargoInfoType.value)
      || (total_weight==0 && ! this.props.store.create_disp.CargoInfoType.value)
      ){
      disabled = true
    }    

    return (
      
      <div>
                <div className="disp_Number">
                <Button compact icon onClick={this.props.modules.back}>
                        <Icon name='arrow left' />
                    </Button>
    {this.props.store.create_disp.Number === 0 ? (<b>Создание новой накладной</b>):(<b>Редактирование накладной {this.props.store.create_disp.Number}</b>)}
                </div>
                <div className="disp_customer_data">
                    <div className="disp_data_label">Заказчик:</div>
                    <div className="disp_data_el">{this.props.store.login.alias}</div>
                    <div className="disp_data_label">Вид доставки:</div>
                    <div className="disp_data_el">{this.props.store.create_disp.DelMethod}</div>
                    <div className="disp_data_label">Дата заявки:</div>
                    <div className="disp_data_el"><input onChange={e => this.props.SetDispDate(e.target.value)} value={this.props.store.create_disp.DispDate} className="DispDate" type="date"></input></div>
                    <div className="disp_data_label">Тип оплаты:</div>
                     <div className="disp_data_el">
                     <Select
                          options={PayTypeList}
                          styles={customStyles}
                          value={this.props.store.create_disp.PayType}
                          onChange={(values) => this.props.SetPayType(values)}
                      /> 

                       
        </div>

                </div>

                <div className="disp_address_data">
                    <div className="create_disp_address_data_header">
                        <div></div>
                        <div>Данные отправителя</div>
                        <div className='create_disp_template_button_container'>
                        <Modal 
                        trigger={<button onClick={this.OpenSendTemplateModal.bind(this)} className='create_disp_template_button'>Из шаблона</button>}
                        open={this.props.store.create_disp.OpenModalSendTemplate}
                        onClose={this.SelectSendTemplate.bind(this,null)}
                        >
                          <Modal.Header>Заполнить отправителя из шаблона</Modal.Header>
                          <Modal.Content>
                          
                          <Modal.Description>
                          <div className="disp_data_el"><input className="create_disp_data_input"  onChange={e => this.props.SetFilterModalSendTemplate(e.target.value)} value={this.props.store.create_disp.FilterModalSendTemplate} type="text" placeholder="Поиск по наименованию" /></div>
                          
                          <div >
                          <Table celled compact='very'>
                          <Table.Header className = "create_disp_template_list_th">
                            <Table.Row>
                              <Table.HeaderCell>Имя</Table.HeaderCell>
                              <Table.HeaderCell>Город</Table.HeaderCell>
                              <Table.HeaderCell>Адрес</Table.HeaderCell>
                              <Table.HeaderCell>Телефон</Table.HeaderCell>
                              <Table.HeaderCell>Конт. лицо</Table.HeaderCell>
                              <Table.HeaderCell>Компания</Table.HeaderCell>
                              <Table.HeaderCell>Доп. инфо</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                          {this.props.store.upload_manifest.disp_template_list.filter((el)=>this.props.store.create_disp.FilterModalSendTemplate === "" || el.label.indexOf(this.props.store.create_disp.FilterModalSendTemplate) !== -1).map((el,index)=>
                            
                              <Table.Row 
                              className = "create_disp_template_list_tr"
                              key={index}
                              onDoubleClick={this.SelectSendTemplate.bind(this,el)}
                              >
                                <Table.Cell >{el.label}</Table.Cell>
                                <Table.Cell>{el.City}</Table.Cell>
                                <Table.Cell>{el.Terminal ? (el.CurrentTerminal + " (Cклад)"):(el.Adress)}</Table.Cell>
                                <Table.Cell>{el.Phone}</Table.Cell>
                                <Table.Cell>{el.Person}</Table.Cell>
                                <Table.Cell>{el.Company}</Table.Cell>
                                <Table.Cell>{el.AddInfo}</Table.Cell>
                              </Table.Row>
                          )}
                          </Table.Body>
                          </Table>
                          </div>
                            
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                          </div>
                      </div>
                    <div className="create_disp_address_data_header">
                      <div></div>
                      <div>Данные получателя</div>
                      <div className='create_disp_template_button_container'>
                      <Modal 
                        trigger={<button onClick={this.OpenRecTemplateModal.bind(this)} className='create_disp_template_button'>Из шаблона</button>}
                        open={this.props.store.create_disp.OpenModalRecTemplate}
                        onClose={this.SelectRecTemplate.bind(this,null)}
                        >
                          <Modal.Header>Заполнить получателя из шаблона</Modal.Header>
                          <Modal.Content>
                          <Modal.Description>
                          <div className="disp_data_el"><input className="create_disp_data_input"  onChange={e => this.props.SetFilterModalRecTemplate(e.target.value)} value={this.props.store.create_disp.FilterModalRecTemplate} type="text" placeholder="Поиск по наименованию" /></div>
                          <div >
                          <Table celled compact='very'>
                          <Table.Header className = "create_disp_template_list_th">
                            <Table.Row>
                              <Table.HeaderCell>Имя</Table.HeaderCell>
                              <Table.HeaderCell>Город</Table.HeaderCell>
                              <Table.HeaderCell>Адрес</Table.HeaderCell>
                              <Table.HeaderCell>Телефон</Table.HeaderCell>
                              <Table.HeaderCell>Конт. лицо</Table.HeaderCell>
                              <Table.HeaderCell>Компания</Table.HeaderCell>
                              <Table.HeaderCell>Доп. инфо</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                          {this.props.store.upload_manifest.disp_template_list.filter((el)=>this.props.store.create_disp.FilterModalRecTemplate === "" || el.label.indexOf(this.props.store.create_disp.FilterModalRecTemplate) !== -1).map((el,index)=>
                            
                              <Table.Row 
                              className = "create_disp_template_list_tr"
                              key={index}
                              onDoubleClick={this.SelectRecTemplate.bind(this,el)}
                              >
                                <Table.Cell >{el.label}</Table.Cell>
                                <Table.Cell>{el.City}</Table.Cell>
                                <Table.Cell>{el.Terminal ? (el.CurrentTerminal + " (Cклад)"):(el.Adress)}</Table.Cell>
                                <Table.Cell>{el.Phone}</Table.Cell>
                                <Table.Cell>{el.Person}</Table.Cell>
                                <Table.Cell>{el.Company}</Table.Cell>
                                <Table.Cell>{el.AddInfo}</Table.Cell>
                              </Table.Row>
                          )}
                          </Table.Body>
                          </Table>
                          </div>
                            
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                        </div>
                      
                      </div>
                    <div className="disp_address_data_el">

                        <div className="disp_data_label"> Город:</div>
                        <div className="disp_data_el">
                        
                           <Select 
                          value={this.props.store.create_disp.SelectedSendCity}
                          options={this.props.store.create_disp.CityList}
                          styles={customStyles}
                          onChange={(values) => this.SelectSendCity(values)}
                          placeholder="Город отправителя" /> 
                 
                        </div>
                        
                        {this.props.store.create_disp.SendTerminalList.length === 0 ? (null):(<div className="disp_data_label">Отправка на складе</div>)}
                        {this.props.store.create_disp.SendTerminalList.length === 0 ? (null):(<div><input name="send_type" type="radio"  onChange={this.SetSendTerminal.bind(this,true)} disabled={this.props.store.create_disp.SendTerminalList.length === 0} checked={this.props.store.create_disp.SendTerminal}></input></div>)}
                        {this.props.store.create_disp.SendTerminalList.length === 0 ? (null):(<div className="disp_data_label">Забор с адреса</div>)}
                        {this.props.store.create_disp.SendTerminalList.length === 0 ? (null):(<div><input name="send_type" type="radio" onChange={this.SetSendTerminal.bind(this,false)} checked={!this.props.store.create_disp.SendTerminal}></input></div>)}
                        
                        {this.props.store.create_disp.SendTerminal? (<div className="disp_data_label"> Терминал:</div>):(<div className="disp_data_label"> Адрес:</div>)}
                        
                        {this.props.store.create_disp.SendTerminal? (
                          <div className="disp_data_el">
                          <Select
                            
                            options={this.props.store.create_disp.SendTerminalList}
                            styles={customStyles}
                            value={this.props.store.create_disp.SendSelectTerminal}
                            onChange={(values) => this.props.SetSendSelectTerminal(values)}
                          /> 
                          </div>
                        ):(<div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetSendAdress(e.target.value)} value={this.props.store.create_disp.SendAdress} type="text" placeholder="Адрес отправителя" /></div>)}
                        
                        
                        <div className="disp_data_label"> Компания:</div>
                        <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetSendCompany(e.target.value)} value={this.props.store.create_disp.SendCompany} type="text" placeholder="Компания отправителя" /></div>
                        <div className="disp_data_label"> Телефон:</div>
                        <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetSendPhone(e.target.value)} value={this.props.store.create_disp.SendPhone} type="text" placeholder="Телефон отправителя" /></div>
                        <div className="disp_data_label"> Контактное лицо:</div>
                        <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetSendPerson(e.target.value)} value={this.props.store.create_disp.SendPerson} type="text" placeholder="Контактное лицо отправителя" /></div>
                        <div className="disp_data_label"> Доп. информация:</div>
                        <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetSendAddInfo(e.target.value)} value={this.props.store.create_disp.SendAddInfo} type="text" placeholder="Доп. информация отправителя" /></div>
                    </div>

                    <div className="disp_address_data_el">

                    <div className="disp_data_label"> Город:</div>
                        <div className="disp_data_el">
                        
                           <Select 
                           value={this.props.store.create_disp.SelectedRecCity}
                          options={this.props.store.create_disp.CityList}
                          styles={customStyles}
                          onChange={(values) => this.SelectRecCity(values)}
                          placeholder="Город получателя" /> 
                 
                        </div>
                        
                        {this.props.store.create_disp.RecTerminalList.length === 0 ? (null):(<div className="disp_data_label">Получение на складе</div>)}
                        {this.props.store.create_disp.RecTerminalList.length === 0 ? (null):(<div><input name="rec_type" type="radio"  onChange={this.SetRecTerminal.bind(this,true)} disabled={this.props.store.create_disp.RecTerminalList.length === 0} checked={this.props.store.create_disp.RecTerminal}></input></div>)}
                        {this.props.store.create_disp.RecTerminalList.length === 0 ? (null):(<div className="disp_data_label">Доставка до адреса</div>)}
                        {this.props.store.create_disp.RecTerminalList.length === 0 ? (null):(<div><input name="rec_type" type="radio" onChange={this.SetRecTerminal.bind(this,false)} checked={!this.props.store.create_disp.RecTerminal}></input></div>)}
                        
                        {this.props.store.create_disp.RecTerminal? (<div className="disp_data_label"> Терминал:</div>):(<div className="disp_data_label"> Адрес:</div>)}
                        
                        {this.props.store.create_disp.RecTerminal? (
                          <div className="disp_data_el">
                          <Select
                            options={this.props.store.create_disp.RecTerminalList}
                            styles={customStyles}
                            value={this.props.store.create_disp.RecSelectTerminal}
                            onChange={(values) => this.props.SetRecSelectTerminal(values)}
                          /> 
                          </div>
                        ):(<div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetRecAdress(e.target.value)} value={this.props.store.create_disp.RecAdress} type="text" placeholder="Адрес получателя" /></div>)}
                        
                        
                        <div className="disp_data_label"> Компания:</div>
                        <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetRecCompany(e.target.value)} value={this.props.store.create_disp.RecCompany} type="text" placeholder="Компания получателя" /></div>
                        <div className="disp_data_label"> Телефон:</div>
                        <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetRecPhone(e.target.value)} value={this.props.store.create_disp.RecPhone} type="text" placeholder="Телефон получателя" /></div>
                        <div className="disp_data_label"> Контактное лицо:</div>
                        <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetRecPerson(e.target.value)} value={this.props.store.create_disp.RecPerson} type="text" placeholder="Контактное лицо получателя" /></div>
                        <div className="disp_data_label"> Доп. информация:</div>
                        <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetRecAddInfo(e.target.value)} value={this.props.store.create_disp.RecAddInfo} type="text" placeholder="Доп. информация получателя" /></div>
                    </div>

                </div>

                <div className="disp_cargo_table">
                <div className="disp_cargo_table_header">Данные о грузах:</div>
                    {this.props.store.login.total_only ? (<div className="disp_cargo_info">
                    <div className="disp_data_label">Метод внесения информации:</div>
                     <div className="disp_data_el">
                      <Select
                          options={CargoInfoTypeList}
                          styles={customStyles}
                          value={this.props.store.create_disp.CargoInfoType}
                          onChange={(values) => this.props.SetCargoInfoType(values)}
                      /> 
                      </div>
                      </div>):(null)}
                    {!this.props.store.create_disp.CargoInfoType.value ? (<div>
                    
                    <div className="disp_cargo_table_data">
                    <Table compact celled size='small'>

                    <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Вес (кг)</Table.HeaderCell>
                    <Table.HeaderCell>Длина (см)</Table.HeaderCell>
                    <Table.HeaderCell>Ширина (см)</Table.HeaderCell>
                    <Table.HeaderCell>Высота (см)</Table.HeaderCell>
                    <Table.HeaderCell>Об. вес</Table.HeaderCell>
                    <Table.HeaderCell>Количество</Table.HeaderCell>
                    <Table.HeaderCell>Итоговый вес</Table.HeaderCell>
                    <Table.HeaderCell>Итог. об. вес</Table.HeaderCell>
                    <Table.HeaderCell>Тип груза</Table.HeaderCell>
                    <Table.HeaderCell colSpan='2'>Комментарий</Table.HeaderCell>
                    
                    

                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                                {this.props.store.create_disp.Cargo.map((Cargo, index) =>
                                    <Table.Row key={index}>
                                        <Table.Cell><input className="create_disp_td_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.SetCargoWeight(e.target.value,index)} value={Cargo.Weight} type="number" /></Table.Cell>
                                        <Table.Cell><input className="create_disp_td_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.SetCargoL(e.target.value,index)} value={Cargo.L} type="number" /></Table.Cell>
                                        <Table.Cell><input className="create_disp_td_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.SetCargoW(e.target.value,index)} value={Cargo.W} type="number" /></Table.Cell>
                                        <Table.Cell><input className="create_disp_td_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.SetCargoH(e.target.value,index)} value={Cargo.H} type="number" /></Table.Cell>
                                        <Table.Cell>{Math.ceil(Cargo.L * Cargo.W * Cargo.H /5)/1000}</Table.Cell>
                                        <Table.Cell><input className="create_disp_td_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.SetCargoQ(e.target.value,index)} value={Cargo.Q} type="number" /></Table.Cell>
                                        <Table.Cell>{Math.ceil(Cargo.Weight * Cargo.Q*1000)/1000}</Table.Cell>
                                        <Table.Cell>{Math.ceil(Cargo.L * Cargo.W * Cargo.H * Cargo.Q /5)/1000}</Table.Cell>
                                        <Table.Cell>
                                        <Select
                                            options={CargoTypeList}
                                            styles={customStyles}
                                            value={Cargo.Type}
                                            onChange={(values) => this.SetCargoType(values,index)}
                                        /> 
                                        </Table.Cell>
                                        <Table.Cell ><input className="create_disp_td_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.SetCargoComment(e.target.value,index)} value={Cargo.Comment} type="text" /></Table.Cell>
                                        {this.props.store.create_disp.Cargo.length === 1 ? (null):(<Table.Cell collapsing> <button onClick={this.RemoveCargo.bind(this,index)} className="IconButton"><Icon type="indicator" name="delete" width={15} height={15}/></button></Table.Cell>)}
                                        
                                        </Table.Row>)}
                                        </Table.Body>
                                        </Table>
                        
                    </div>
                    <button onClick={this.AddCargo.bind(this)}>Добавить место</button>
                    <div className="disp_cargo_data">
                    <div className="disp_data_label">Общее количество мест:</div>
                    <div className="disp_data_el">{this.props.store.create_disp.Cargo.reduce((accumulator, Cargo) => accumulator + Number(Cargo.Q), 0)}</div>
                    <div className="disp_data_label">Общий фактический вес (кг):</div> 
                    <div className="disp_data_el">{total_weight}</div>
                    <div className="disp_data_label">Общий объемный вес (кг):</div>
                    <div className="disp_data_el">{total_volume}</div> 
                </div>
                    </div>):(<div className="disp_cargo_data">
                    <div className="disp_data_label">Общее количество мест:</div>
                    <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.SetTotal(e.target.value)} value={this.props.store.create_disp.Total} type="number" placeholder="Общее количество мест" /></div>
                    <div className="disp_data_label">Общий фактический вес (кг):</div>
                    <div className="disp_data_el"><input readOnly={Q_only} className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetWeight(e.target.value)} value={this.props.store.create_disp.Weight} type="number" placeholder="Итоговый фактический вес" /></div>
                    <div className="disp_data_label">Общий объемный вес (кг):</div>
                    <div className="disp_data_el"><input readOnly={Q_only}  className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetVolume(e.target.value)} value={this.props.store.create_disp.Volume} type="number" placeholder="Итоговый объемный вес" /></div> 
                </div>)}
                {Q_only ? (null):(
                  <div className="disp_cargo_data">
                  <div className="disp_data_label">Страховая стоимость (руб.):</div>
                  <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetInsureValue(e.target.value)} value={this.props.store.create_disp.InsureValue} type="number"  /></div>
                  <div className="disp_data_label">Наложенный платеж (руб.):</div>
                  <div className="disp_data_el"><input className="create_disp_data_input" onKeyDown={(e) => this.handleKeyPress(e)} onChange={e => this.props.SetCOD(e.target.value)} value={this.props.store.create_disp.COD} type="number"  /></div> 
              <div className="disp_data_label">Расчетная стоимость перевозки:</div>
              <div className="disp_data_el"><input className="create_disp_data_input" readOnly value={this.props.store.create_disp.Price} /></div>

                  </div>
                )}

                {/* <div className="disp_cargo_table_data">
                  <input value={this.props.store.create_disp.Price} />
                  
                </div> */}
                <div className="disp_cargo_table_data">
                  <button onClick={this.CalcPrice.bind(this, total_weight, total_volume)}>Рассчитать стоимость</button>
                </div>
                {this.props.store.create_disp.Number === 0 ? ( <Button disabled={disabled} onClick={this.sent_disp.bind(this)}>Создать накладную</Button>):( <Button disabled={disabled} onClick={this.sent_disp.bind(this)}>Сохранить изменения</Button>)}

                </div>
                
                
                {/* {this.props.store.disp.action === "deliver"  && this.props.store.disp.data.Type === "Доставка" ? (<div>
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
                </div>):(null)} */}

                {/* {this.props.store.disp.action === "reciept" ? (<div> */}
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
                {/* <button onClick={this.reciept.bind(this)} className="send_pod">Принять на склад и закрыть</button>
                </div>):(null)} */}
                
            </div>
      
    );
  }
};

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({

    SetPrice: (param) => { dispatch({ type:'SetPrice', payload: param }) },

    SetSendCity: (param) => { dispatch({ type: 'SetSendCity', payload: param }) },
    SetSendTerminal: (param) => { dispatch({ type: 'SetSendTerminal', payload: param }) },
    SetSendAdress: (param) => { dispatch({ type: 'SetSendAdress', payload: param }) },

    SetSendCompany: (param) => { dispatch({ type: 'SetSendCompany', payload: param }) },
    SetSendPhone: (param) => { dispatch({ type: 'SetSendPhone', payload: param }) },
    SetSendPerson: (param) => { dispatch({ type: 'SetSendPerson', payload: param }) },
    SetSendAddInfo: (param) => { dispatch({ type: 'SetSendAddInfo', payload: param }) },

    SetSendSelectTerminal: (param) => { dispatch({ type: 'SetSendSelectTerminal', payload: param }) },
    SetSendTerminalList: (param) => { dispatch({ type: 'SetSendTerminalList', payload: param }) },

    SetRecCity: (param) => { dispatch({ type: 'SetRecCity', payload: param }) },
    SetRecTerminal: (param) => { dispatch({ type: 'SetRecTerminal', payload: param }) },
    SetRecAdress: (param) => { dispatch({ type: 'SetRecAdress', payload: param }) },

    SetRecCompany: (param) => { dispatch({ type: 'SetRecCompany', payload: param }) },
    SetRecPhone: (param) => { dispatch({ type: 'SetRecPhone', payload: param }) },
    SetRecPerson: (param) => { dispatch({ type: 'SetRecPerson', payload: param }) },
    SetRecAddInfo: (param) => { dispatch({ type: 'SetRecAddInfo', payload: param }) },

    SetRecSelectTerminal: (param) => { dispatch({ type: 'SetRecSelectTerminal', payload: param }) },
    SetRecTerminalList: (param) => { dispatch({ type: 'SetRecTerminalList', payload: param }) },
    
    SetPayType: (param) => { dispatch({ type: 'SetPayType', payload: param }) },

    RemoveCargo: (param) => { dispatch({ type: 'RemoveCargo', payload: param }) },
    
    AddCargo: () => { dispatch({ type: 'AddCargo'}) },

    SetCargoWeight: (param) => { dispatch({ type: 'SetCargoWeight', payload: param }) },
    SetCargoW: (param) => { dispatch({ type: 'SetCargoW', payload: param }) },
    SetCargoL: (param) => { dispatch({ type: 'SetCargoL', payload: param }) },
    SetCargoH: (param) => { dispatch({ type: 'SetCargoH', payload: param }) },
    SetCargoQ: (param) => { dispatch({ type: 'SetCargoQ', payload: param }) },
    SetCargoType: (param) => { dispatch({ type: 'SetCargoType', payload: param }) },
    SetCargoInfoType: (param) => { dispatch({ type: 'SetCargoInfoType', payload: param }) },
    SetCargoComment: (param) => { dispatch({ type: 'SetCargoComment', payload: param }) },
    SetTotal: (param) => { dispatch({ type: 'SetTotal', payload: param }) },
    SetWeight: (param) => { dispatch({ type: 'SetWeight', payload: param }) },
    SetVolume: (param) => { dispatch({ type: 'SetVolume', payload: param }) },

    SetSelectedSendCity: (param) => { dispatch({ type: 'SetSelectedSendCity', payload: param }) },
    SetSelectedRecCity: (param) => { dispatch({ type: 'SetSelectedRecCity', payload: param }) },

    set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
    set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
    set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },

    SetOpenModalSendTemplate: (param) => { dispatch({ type: 'SetOpenModalSendTemplate', payload: param }) },
    SetOpenModalRecTemplate: (param) => { dispatch({ type: 'SetOpenModalRecTemplate', payload: param }) },

    SetFilterModalSendTemplate: (param) => { dispatch({ type: 'SetFilterModalSendTemplate', payload: param }) },
    SetFilterModalRecTemplate: (param) => { dispatch({ type: 'SetFilterModalRecTemplate', payload: param }) },
    
    SetDispDate: (param) => { dispatch({ type: 'SetDispDate', payload: param }) },

    SetCOD: (param) => { dispatch({ type: 'SetCOD', payload: param }) },
    SetInsureValue: (param) => { dispatch({ type: 'SetInsureValue', payload: param }) },
   
  })
)(Screen);