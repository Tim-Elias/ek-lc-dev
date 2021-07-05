import React from 'react';
import { connect } from 'react-redux';
import { get_data } from './../common/common_modules'
import { withCookies } from 'react-cookie';
import { Header, Modal, Table, Button } from 'semantic-ui-react'
import './disp_map.css';
import './my_disp.css';
import Scanner from "../m_screen/scanner";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Screen extends React.Component {

  constructor(props) {
    super(props)
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.get_my_disp_data();
    }
  }

  get_my_disp_data = () => {

    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      date_from: this.props.store.my_disp.date_from,
      date_to: this.props.store.my_disp.date_to,
      searchNum: this.props.store.my_disp.search,
    }
    get_data('mydisplist', data).then(
      (result) => {
        this.props.set_active_window("my_disp");
        this.props.set_my_disp_data(result);
      },
      (err) => { 
        console.log(err) 
      
        this.props.modules.set_modal_show(true)
        this.props.modules.set_modal_header('Ошибка')
        this.props.modules.set_modal_text(err)
      }
    );

  }

  tr_double_click = async (disp) => {
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      status: "Накладная",
      num: disp.Num
    };

    get_data('dispatch', data).then(
      (result) => {

        this.props.set_data_disp(result);
        this.props.set_active_window("disp");
        this.props.set_last_window("my_disp");

      },
      (err) => { 
        console.log(err) 
      
        this.props.modules.set_modal_show(true)
        this.props.modules.set_modal_header('Ошибка')
        this.props.modules.set_modal_text(err)
      }
    );


  };

  tr_click = async (index) => {
    this.props.set_my_disp_active_row(index)
  }

  click_up = () => {
    //console.log("click_up")
    if (this.props.store.my_disp.active_row > 0) {
      this.props.set_my_disp_active_row(this.props.store.my_disp.active_row - 1)
    }

  }

  click_down = () => {
    const max_index = this.props.store.my_disp.data.length - 1
    if (this.props.store.my_disp.active_row < max_index) {
      this.props.set_my_disp_active_row(this.props.store.my_disp.active_row + 1)
    }

  }

  click_enter = () => {
    const disp = this.props.store.my_disp.data.filter((el, index) => index == this.props.store.my_disp.active_row)[0]
    //console.log(disp)
    if (disp) { this.tr_double_click(disp) }
  }

  render() {
    const status_filter_check_lenght = this.props.store.my_disp.status_filter.filter((el) => {if(el.check === true) return el}).length
    const status_filter_length = this.props.store.my_disp.status_filter.length
    const send_city_filter_check_lenght = this.props.store.my_disp.send_city_filter.filter((el) => {if(el.check === true) return el}).length
    const send_city_filter_length = this.props.store.my_disp.send_city_filter.length
    const rec_city_filter_check_lenght = this.props.store.my_disp.rec_city_filter.filter((el) => {if(el.check === true) return el}).length
    const rec_city_filter_length = this.props.store.my_disp.rec_city_filter.length
    const del_method_filter_check_lenght = this.props.store.my_disp.del_method_filter.filter((el) => {if(el.check === true) return el}).length
    const del_method_filter_length = this.props.store.my_disp.del_method_filter.length

    const click_up = () => { this.click_up() }
    const click_down = () => { this.click_down() }
    const click_enter = () => { this.click_enter() }


    document.onkeydown = function (event) {
      try {
        if (event.keyCode === 38) {
          event.preventDefault();
          //console.log("Вверх")
          click_up()

        }
        if (event.keyCode === 40) {
          event.preventDefault();
          //console.log("Вниз")
          click_down()
        }
        if (event.keyCode === 13) {
          click_enter()
          //console.log("Enter")

        }

      } catch (e) { }
    };


    let FilterData = this.props.store.my_disp.data.filter(
        (el) => {
          return (el.Num.indexOf(this.props.store.my_disp.num_filter) > -1 || this.props.store.my_disp.num_filter === "")
        }
      ).filter(
        (el) => {
          const filter_sender_address = this.props.store.my_disp.sender_address.toUpperCase()
          const sender_address = el.SendAdress.toUpperCase()
          return (sender_address.indexOf(filter_sender_address) > -1 || this.props.store.my_disp.sender_address === "")
        }
      ).filter(
        (el) => {
          const filter_rec_address = this.props.store.my_disp.rec_address.toUpperCase()
          const rec_address = el.RecAdress.toUpperCase()
          return (rec_address.indexOf(filter_rec_address) > -1 || this.props.store.my_disp.rec_address === "")
        }
      ).filter(
        (el) => {
          const selectedRecCities = this.props.store.my_disp.rec_city_filter.filter((el1) => { return (el1.check) })
          const FindRecCityRes = selectedRecCities.find(el2 => { return el2.name == el.RecCity })
          return (FindRecCityRes !== undefined)
        }
      ).filter(
        (el) => {
          const selectedSendCities = this.props.store.my_disp.send_city_filter.filter((el1) => { return (el1.check) })
          const FindSendCityRes = selectedSendCities.find(el2 => { return el2.name == el.SendCity })
          return (FindSendCityRes !== undefined)
        }
      ).filter(
        (el) => {
          const selectedDelMethods = this.props.store.my_disp.del_method_filter.filter((el1) => { return (el1.check) })
          const FindDelMethodsRes = selectedDelMethods.find(el2 => { return el2.name == el.DelMethod })
          return (FindDelMethodsRes !== undefined)
        }
      ).filter(
        (el) => {
          const selectedStatus = this.props.store.my_disp.status_filter.filter((el1) => { return (el1.check) })
          const FindStatusRes = selectedStatus.find(el2 => { return el2.name == el.Status })
          return (FindStatusRes !== undefined)
        }
      )


    const TitleStyle = {
      border: {
        top: { style: "thin", color: { rgb: "000" } },
        bottom: { style: "thin", color: { rgb: "000" } },
        left: { style: "thin", color: { rgb: "000" } },
        right: { style: "thin", color: { rgb: "000" } },
      },
      font: {
        bold: true,
      },
      fill: {
        fgColor: { rgb: "FFEFEFEF" }
      }
    }
    const CellStyle = {
      border: {
        top: { style: "thin", color: { rgb: "000" } },
        bottom: { style: "thin", color: { rgb: "000" } },
        left: { style: "thin", color: { rgb: "000" } },
        right: { style: "thin", color: { rgb: "000" } },
      }
    }

    let ExcelData = [];
    let wDate = 0, wNum = 0, wSendCity = 0, wSendAdress = 0, wSendCompany = 0, wRecCity = 0, wRecAdress = 0, wRecCompany = 0, wTotal = 0, wWeight = 0, wVolume = 0, wDelMethod = 0, wPrice = 0, wStatus = 0, wRecient = 0, wRecDate = 0;
    for (let i = 0; i < FilterData.length; i++) {
      let Price = FilterData[i].Price.replace(/\s+/g, '').replace(",", ".");

      wDate = (FilterData[i].Date.length > wDate) ? (FilterData[i].Date.length) : (wDate);
      wNum = (FilterData[i].Num.length > wNum) ? (FilterData[i].Num.length) : (wNum);
      wSendCity = (FilterData[i].SendCity.length > wSendCity) ? (FilterData[i].SendCity.length) : (wSendCity);
      wSendAdress = (FilterData[i].SendAdress.length > wSendAdress) ? (FilterData[i].SendAdress.length) : (wSendAdress);
      wSendCompany = (FilterData[i].SendCompany.length > wSendCompany) ? (FilterData[i].SendCompany.length) : (wSendCompany);
      wRecCity = (FilterData[i].RecCity.length > wRecCity) ? (FilterData[i].RecCity.length) : (wRecCity);
      wRecAdress = (FilterData[i].RecAdress.length > wRecAdress) ? (FilterData[i].RecAdress.length) : (wRecAdress);
      wRecCompany = (FilterData[i].RecCompany.length > wRecCompany) ? (FilterData[i].RecCompany.length) : (wRecCompany);
      wTotal = (FilterData[i].Total.length > wTotal) ? (FilterData[i].Total.length) : (wTotal);
      wWeight = (FilterData[i].Weight.length > wWeight) ? (FilterData[i].Weight.length) : (wWeight);
      wVolume = (FilterData[i].Volume.length > wVolume) ? (FilterData[i].Volume.length) : (wVolume);
      wDelMethod = (FilterData[i].DelMethod.length > wDelMethod) ? (FilterData[i].DelMethod.length) : (wDelMethod);
      wPrice = (FilterData[i].Price.length > wPrice) ? (FilterData[i].Price.length) : (wPrice);
      wStatus = (FilterData[i].Status.length > wStatus) ? (FilterData[i].Status.length) : (wStatus);
      wRecient = (FilterData[i].Recient.length > wRecient) ? (FilterData[i].Recient.length) : (wRecient);
      wRecDate = (FilterData[i].RecDate.length > wRecDate) ? (FilterData[i].RecDate.length) : (wRecDate);
      ExcelData[i] = [
        { value: FilterData[i].Date, style: CellStyle},
        { value: FilterData[i].Num, style: CellStyle},
        { value: FilterData[i].SendCity, style: CellStyle },
        { value: FilterData[i].SendAdress, style: CellStyle },
        { value: FilterData[i].SendCompany, style: CellStyle },
        { value: FilterData[i].RecCity, style: CellStyle },
        { value: FilterData[i].RecAdress, style: CellStyle },
        { value: FilterData[i].RecCompany, style: CellStyle },
        { value: FilterData[i].Total, style: CellStyle },
        { value: FilterData[i].Weight, style: CellStyle },
        { value: FilterData[i].Volume, style: CellStyle },
        { value: FilterData[i].DelMethod, style: CellStyle },
        { value: +Price, style: CellStyle },
        { value: FilterData[i].Status, style: CellStyle },
        { value: FilterData[i].Recient, style: CellStyle },
        { value: FilterData[i].RecDate, style: CellStyle },
      ];
    }

    let ExcelColumn = [
      { title: "Дата", style: TitleStyle, width: { wch: wDate } },
      { title: "Номер", style: TitleStyle, width: { wch: wNum } },
      { title: "Город отправителя", style: TitleStyle, width: { wch: (wSendCity > 18) ? (wSendCity) : (18) } },
      { title: "Адрес отправителя", style: TitleStyle, width: { wch: (wSendAdress > 18) ? (wSendAdress) : (18) } },
      { title: "Компания отправителя", style: TitleStyle, width: { wch: (wSendCompany > 21) ? (wSendCompany) : (21) } },
      { title: "Город получателя", style: TitleStyle, width: { wch: (wRecCity > 17) ? (wRecCity) : (17) } },
      { title: "Адрес получателя", style: TitleStyle, width: { wch: (wRecAdress > 17) ? (wRecAdress) : (17) } },
      { title: "Компания получателя", style: TitleStyle, width: { wch: (wSendCompany > 20) ? (wSendCompany) : (20) } },
      { title: "Мест", style: TitleStyle, width: { wch: (wTotal > 5) ? (wTotal) : (5) } },
      { title: "Вес", style: TitleStyle, width: { wch: (wWeight > 4) ? (wWeight) : (4) } },
      { title: "Вес v", style: TitleStyle, width: { wch: (wVolume > 6) ? (wVolume) : (6) } },
      { title: "Вид доставки", style: TitleStyle, width: { wch: (wDelMethod > 13) ? (wDelMethod) : (13) } },
      { title: "Цена", style: TitleStyle, width: { wch: (wPrice > 5) ? (wPrice) : (5) } },
      { title: "Статус", style: TitleStyle, width: { wch: (wStatus > 7) ? (wStatus) : (7) } },
      { title: "Получатель", style: TitleStyle, width: { wch: (wRecient > 11) ? (wRecient) : (11) } },
      { title: "Вручено", style: TitleStyle, width: { wch: (wRecDate > 8) ? (wRecDate) : (8) } },
    ]

    const styledMultiDataSet = [
      {
        columns: [
          {
            title: "Служба доставки Экспресс Кинетика", style: { font: { bold: false } }
          }
        ], 
        data: [
          [{ value: "Данные за период с " + this.props.store.my_disp.date_from.replace(/-/g, ":").split(":").reverse().join(":") + " по " + this.props.store.my_disp.date_to.replace(/-/g, ":").split(":").reverse().join(":") }]
        ],
      },
      {
        ySteps: 1,
        columns: ExcelColumn,
        data: ExcelData,
      }
    ]
  

    /////////////////////////////////////////////////////////////////
    const TitleStylePP = {
      border: {
        top: { style: "thin", color: { rgb: "000" } },
        bottom: { style: "thin", color: { rgb: "000" } },
        left: { style: "thin", color: { rgb: "000" } },
        right: { style: "thin", color: { rgb: "000" } },
      },
      font: {
        name: "Arial",
        bold: true,
        sz: "8",
      },
      alignment: {
        horizontal: "center",
      }
    }
    const CellStylePP = {
      border: {
        top: { style: "thin", color: { rgb: "000" } },
        bottom: { style: "thin", color: { rgb: "000" } },
        left: { style: "thin", color: { rgb: "000" } },
        right: { style: "thin", color: { rgb: "000" } },
      },
      font: {
        name: "Arial",
        sz: "8",
      },
      alignment: {
        horizontal: "left",
      }
    }
    const CellStyle2PP = {
      border: {
        top: { style: "thin", color: { rgb: "000" } },
        bottom: { style: "thin", color: { rgb: "000" } },
        left: { style: "thin", color: { rgb: "000" } },
        right: { style: "thin", color: { rgb: "000" } },
      },
      font: {
        name: "Arial",
        sz: "8",
      },
      alignment: {
        horizontal: "left",
        wrapText: true,
      }
    }

    const complitedData = FilterData.filter((el) => el.Status === 'Ожидается от отправителя');

    let ExcelDataPP = [];
    let wSendAddInfoPP = 0, wTotalPP = 0, wWeightPP = 0, wVolumePP = 0, wRecAddInfoPP = 0, wSendCompanyPP = 0, wSendAdressPP = 0, wRecCompanyPP = 0, wRecAdressPP = 0, totalPlacePP = 0, totalWeightPP = 0;
    for (let i = 0; i < complitedData.length; i++) {
      wTotalPP = (complitedData[i].Total.length > wTotalPP) ? (complitedData[i].Total.length) : (wTotalPP);
      wWeightPP = (complitedData[i].Weight.length > wWeightPP) ? (complitedData[i].Weight.length) : (wWeightPP);
      wVolumePP = (complitedData[i].Volume.length > wVolumePP) ? (complitedData[i].Volume.length) : (wVolumePP);
      wSendCompanyPP = (complitedData[i].SendCompany.length > wSendCompanyPP) ? (complitedData[i].SendCompany.length) : (wSendCompanyPP);
      wSendAdressPP = ((complitedData[i].SendAdress.length + complitedData[i].SendCity.length) > wSendAdressPP) ? (complitedData[i].SendAdress.length + complitedData[i].SendCity.length) : (wSendAdressPP);
      wRecCompanyPP = (complitedData[i].RecCompany.length > wRecCompanyPP) ? (complitedData[i].RecCompany.length) : (wRecCompanyPP);
      wRecAdressPP = (complitedData[i].RecAdress.length + complitedData[i].RecCity.length > wRecAdressPP) ? (complitedData[i].RecAdress.length + complitedData[i].RecCity.length) : (wRecAdressPP);

      ExcelDataPP[i] = [
        { value: (complitedData[i].Num || ""), style: CellStylePP },
        { value: complitedData[i].Total, style: CellStylePP },
        { value: complitedData[i].Weight, style: CellStylePP },
        { value: complitedData[i].Volume, style: CellStylePP },
        { value: complitedData[i].SendCompany, style: CellStylePP },
        { value: complitedData[i].SendCity + " " + complitedData[i].SendAdress, style: CellStylePP },
        { value: complitedData[i].RecCompany, style: CellStylePP },
        { value: complitedData[i].RecCity + " " + complitedData[i].RecAdress, style: CellStylePP },
      ];

      if (typeof (complitedData[i].Total) === "string") {
        complitedData[i].Total = complitedData[i].Total.replace(",", ".");
        complitedData[i].Total = Number(complitedData[i].Total);
      }

      if (typeof (complitedData[i].Weight) === "string") {
        complitedData[i].Weight = complitedData[i].Weight.replace(",", ".");
        complitedData[i].Weight = Number(complitedData[i].Weight);
      }

      totalPlacePP += complitedData[i].Total;
      totalWeightPP += complitedData[i].Weight;
    }

    let ExcelColumnPP = [
      { title: "Номер накладной", style: TitleStylePP, width: { wch: 16 } },
      { title: "Кол-во мест", style: TitleStylePP, width: { wch: 10 } },
      { title: "Факт. Вес", style: TitleStylePP, width: { wch: 8 } },
      { title: "Объем", style: TitleStylePP, width: { wch: 5 } },
      { title: "Грузоотправитель", style: TitleStylePP, width: { wch: (wSendCompanyPP / 1.5 > 15) ? (wSendCompanyPP / 1.5) : (15) } },
      { title: "Адрес грузоотправителя", style: TitleStylePP, width: { wch: (wSendAdressPP / 1.5 > 20) ? (wSendAdressPP / 1.5) : (20) } },
      { title: "Грузополучатель", style: TitleStylePP, width: { wch: (wRecCompanyPP / 1.5 > 15) ? (wRecCompanyPP / 1.5) : (15) } },
      { title: "Адрес доставки", style: TitleStylePP, width: { wch: (wRecAdressPP / 1.5 > 14) ? (wRecAdressPP / 1.5) : (14) } },
    ]

    ExcelDataPP.push([{ value: " ", style: { font: { name: "Arial", sz: "8" } } }]);
    ExcelDataPP.push([{ value: "Итого накладных: " + complitedData.length, style: { font: { name: "Arial", sz: "8" } } }]);
    ExcelDataPP.push([{ value: "Итого мест: " + totalPlacePP, style: { font: { name: "Arial", sz: "8" } } }]);
    ExcelDataPP.push([{ value: "Общий факт. вес: " + totalWeightPP, style: { font: { name: "Arial", sz: "8" } } }]);

    const currentDate = new Date();

    const styledMultiDataSetPP = [
      {
        columns: [
          { title: "Название Отправителя:", style: { font: { name: "Arial", sz: "8" } } },
          { title: "ИНВИТРО-Сибирь ООО", style: { font: { name: "Arial", sz: "8" } } },
        ],
        data: [
          [
            { value: "Дата забора груза:", style: { font: { name: "Arial", sz: "8" } } },
            { value: currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear(), style: { font: { name: "Arial", sz: "8" } } },
          ],
        ],
      },
      {
        ySteps: 1,
        columns: ExcelColumnPP,
        data: ExcelDataPP,
      },
      {
        columns: [],
        data: [
          [
            { value: "Получатель:", style: { font: { name: "Arial", sz: "8" } } },
            { value: "", style: { border: { bottom: { style: "thin", color: { rgb: "000" } } } } },
            { value: "/", style: { border: { bottom: { style: "thin", color: { rgb: "000" } } } } },
            { value: "", style: { border: { bottom: { style: "thin", color: { rgb: "000" } } } } },
          ]
        ]
      },
      {
        columns: [],
        data: [
          [
            { value: "Курьер:", style: { font: { name: "Arial", sz: "8" } } },
            { value: "", style: { border: { bottom: { style: "thin", color: { rgb: "000" } } } } },
            { value: "/", style: { border: { bottom: { style: "thin", color: { rgb: "000" } } } } },
            { value: "", style: { border: { bottom: { style: "thin", color: { rgb: "000" } } } } },
          ]
        ]
      }
    ]

    return (

      <div>

        <div onKeyDown={this.handleKeyDown.bind(this)} className={this.props.store.my_disp.type_search ? ('my_disp_control_panel') : ('my_disp_control_panel my_disp_control_panel--small')}>
          <select defaultValue={this.props.store.my_disp.type_search} onChange={e => this.props.set_type_search(e.target.value)} className="my_disp_select">
            <option value={true}>Период: </option>
            <option value={false}>По номеру: </option>
          </select>
          {this.props.store.my_disp.type_search ? (
            <div><input onChange={e => this.props.set_my_disp_date_from(e.target.value)} value={this.props.store.my_disp.date_from} className="pod_input" type="date"></input></div>
          ) : (<input className="pod_input" value={this.props.store.my_disp.search} onChange={e => this.props.set_search(e.target.value)}></input>)}
          {this.props.store.my_disp.type_search ? (
            <div>-</div>
          ) : (null)}
          {this.props.store.my_disp.type_search ? (
            <div><input onChange={e => this.props.set_my_disp_date_to(e.target.value)} value={this.props.store.my_disp.date_to} className="pod_input" type="date"></input></div>
          ) : (null)}
          
          <div> 
            <Button style={{ marginTop: '-5px' }} size='mini' onClick={this.get_my_disp_data.bind(this)}>Получить данные</Button>
            
            {/*{<Button style={{ marginTop: '-5px' }} size='mini' onClick={() => this.props.set_my_disp_focus_all_default()}>Сбросить фильтры</Button>*/}
            
            <ExcelFile filename={"Накладные Экспресс Кинетика " + this.props.store.my_disp.date_from.replace(/-/g, ".").split(".").reverse().join(".") + " - " + this.props.store.my_disp.date_from.replace(/-/g, ".").split(".").reverse().join(".")} element={this.props.store.my_disp.data.length > 0 ? (<Button style={{ margin: '-5px 0 0 15px' }} size='mini'>Сохранить в Exсel</Button>) : (<Button disabled style={{ margin: '-5px 0 0 15px' }} size='mini'>Сохранить в Exсel</Button>)}>
              <ExcelSheet dataSet={styledMultiDataSet} name="Список накладных" />
            </ExcelFile>

            {this.props.store.login.upload_manifest ? (
              <ExcelFile filename={"Акт ПП"} element={this.props.store.my_disp.data.some(item => item.Status === "Ожидается от отправителя") ? (<Button style={{ margin: '-5px 0 0 15px' }} size='mini'>Акт ПП</Button>) : (<Button disabled style={{ margin: '-5px 0 0 15px' }} size='mini'>Акт ПП</Button>)}>
                <ExcelSheet dataSet={styledMultiDataSetPP} name="Лист1" />
              </ExcelFile>
            ) : (null)}
          </div>
        </div>

        <div className="my_disp_table">
          {this.props.store.my_disp.data.length === 0 ? (null) : (
            <Table celled size='small' compact='very'>
              <Table.Header>
                <Table.Row>

                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Дата
                    </div>
                  </Table.HeaderCell>

                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Номер
                      <div className="my_disp_div_filter on_bottom">
                      <input className = 'my_disp_div_filter_input' type="text" value={this.props.store.my_disp.num_filter}
                        onChange={(e) => this.props.set_my_disp_num_filter(e.target.value)}>
                      </input>
                      <button className = 'my_disp_button' onClick={() => this.props.set_my_disp_num_filter("")}>
                          Сброс
                      </button>
                      </div>
                      
                    </div>
                  </Table.HeaderCell>


                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Город отправителя
                        <button className = 'my_disp_button' type="text" onClick={() => this.props.set_my_disp_focus_input_send_city()} >
                        Фильтр
                        </button>
                    </div>
                    {(this.props.store.my_disp.focus_input_send_city) ?
                      (<div id="myDropdownSendCity" className="dropdown-content">
                        <div className= 'my_disp_dropdown_head'>
                        <button className= 'margin_right my_disp_button' onClick={() => {
                          this.props.set_my_disp_send_city_filter_default("select")
                        }
                        }>Выбрать все
                        </button>
                        <button className = 'my_disp_button' onClick={() => {
                          this.props.set_my_disp_send_city_filter_default()
                        }
                        }>Отменить все
                        </button>
                        </div>
                        <Table>
                          <Table.Body>
                            {this.props.store.my_disp.send_city_filter.map((el, index) => {

                              return (
                                <Table.Row className = 'dropdown-content-row' key={index} onClick={() => this.props.set_check_my_disp_send_city(el.id)}>
                                  <Table.Cell>
                                    {el.name == "" ? ("(Пустые)") : (el.name)}
                                  </Table.Cell>
                                  <Table.Cell><input type="checkbox" checked={el.check} /></Table.Cell>
                                </Table.Row>)
                            }
                            )}
                          </Table.Body>
                        </Table>
                        <button className = 'my_disp_button' onClick={() =>
                          this.props.set_my_disp_focus_input_send_city()
                        }> Ок
                        </button>
                        <div className= 'my_disp_filter_selected_text'>
                          &nbsp; Выбрано
                          &nbsp;
                          {send_city_filter_check_lenght}
                          &nbsp; из &nbsp;
                          {send_city_filter_length}
                      </div> </div>) : (send_city_filter_check_lenght !== send_city_filter_length) ? (
                        <div className= 'my_disp_filter_selected_text'>
                          &nbsp;
                          {send_city_filter_check_lenght}                          &nbsp; из &nbsp;
                          {send_city_filter_length}
                        </div>):(null)
                    }
                  </Table.HeaderCell>


                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Адрес отправителя
                      <div className = 'my_disp_div_filter'>
                      <input className="my_disp_div_filter_input" value={this.props.store.my_disp.sender_address}
                        onChange={(e) => this.props.set_my_disp_sender_address(e.target.value)}
                      ></input>
                      <button className = 'my_disp_button' onClick={() => {
                        this.props.set_my_disp_sender_address("")
                      }}>
                          Сброс
                      </button>
                      </div>
                    </div>
                  </Table.HeaderCell>


                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Компания отправителя
                    </div>
                  </Table.HeaderCell>

                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Город получателя
                      <button className = 'my_disp_button' type="text" onClick={() => this.props.set_my_disp_focus_input_rec_city()} >
                        Фильтр
                        </button>
                        {(!this.props.store.my_disp.focus_input_rec_city) ? (
                          
                          <div className= 'my_disp_filter_selected_text'>
                            {this.props.store.my_disp.filter_rec_city_string}
                          </div>) : (null)
                        }
                    </div>
                    {(this.props.store.my_disp.focus_input_rec_city) ?
                      (<div id="myDropdownRecCity" className="dropdown-content">
                        <button className = 'my_disp_button' onClick={() => {
                          this.props.set_my_disp_rec_city_filter_default("select")
                        }
                        }>Выбрать все
                        </button>
                        <button className = 'my_disp_button' onClick={() => {
                          this.props.set_my_disp_rec_city_filter_default()
                        }
                        }>Отменить все
                        </button>
                        <Table>
                          <Table.Body>
                            {this.props.store.my_disp.rec_city_filter.map((el, index) => {

                              return (
                                <Table.Row className = 'dropdown-content-row' key={index} onClick={() => this.props.set_check_my_disp_rec_city(el.id)}>
                                  <Table.Cell> {el.name == "" ? ("(Пустые)") : (el.name)}</Table.Cell>
                                  <Table.Cell><input type="checkbox" checked={el.check} /></Table.Cell>
                                </Table.Row>)
                            }
                            )}
                          </Table.Body>
                        </Table>
                        <button className = 'my_disp_button' onClick={() =>{
                          this.props.set_my_disp_focus_input_rec_city()
                          this.props.filter_common_string(this.props.store.my_disp.rec_city_filter)
                        }
                        }>Ок
                        </button>
                        <div className= 'my_disp_filter_selected_text'>
                          &nbsp; Выбрано 
                          &nbsp;
                          {rec_city_filter_check_lenght} 
                          &nbsp; из &nbsp;
                          {rec_city_filter_length}
                      </div> </div>) : (rec_city_filter_check_lenght !== rec_city_filter_length) ? (
                        <div className= 'my_disp_filter_selected_text'>
                          &nbsp;
                          {rec_city_filter_check_lenght}                          
                          &nbsp; из &nbsp;
                          {rec_city_filter_length}
                        </div>):(null)
                    }
                  </Table.HeaderCell>


                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Адрес получателя
                      <div className= 'my_disp_div_filter'>
                      <input className= 'my_disp_div_filter_input' value={this.props.store.my_disp.rec_address}
                        onChange={(e) => this.props.set_my_disp_rec_address(e.target.value)}
                      ></input>
                      <button className = 'my_disp_button' onClick={() => {
                        this.props.set_my_disp_rec_address("")
                      }}>
                        Сброс
                      </button>
                      </div>
                    </div>
                  </Table.HeaderCell>

                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Компания получателя
                    </div>
                  </Table.HeaderCell>

                  <Table.HeaderCell><div className='small_table_data'>Мест</div></Table.HeaderCell>
                  <Table.HeaderCell><div className='small_table_data'>Вес</div></Table.HeaderCell>
                  <Table.HeaderCell><div className='small_table_data'>V Вес</div></Table.HeaderCell>

                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Вид доставки
                      <button className = 'my_disp_button' type="text" onClick={() => this.props.set_my_disp_focus_input_del_method()} >
                        Фильтр
                        </button>
                    </div>
                    {(this.props.store.my_disp.focus_input_del_method) ?
                      (<div id="myDropdownDelMethod" className="dropdown-content">
                        <button className = 'my_disp_button' onClick={() =>
                          this.props.set_my_disp_del_method_filter_default("select")}>
                          Выбрать все
                        </button>
                        <button className = 'my_disp_button' onClick={() => {
                          this.props.set_my_disp_del_method_filter_default()
                        }
                        }>Отменить все
                        </button>
                        <Table>
                          <Table.Body>
                            {this.props.store.my_disp.del_method_filter.map((el, index) => {

                              return (
                                <Table.Row className = 'dropdown-content-row' key={index}  onClick={() => this.props.set_check_my_disp_del_method(el.id)}>
                                  <Table.Cell> {el.name == "" ? ("(Пустые)") : (el.name)}</Table.Cell>
                                  <Table.Cell><input type="checkbox" checked={el.check} /></Table.Cell>
                                </Table.Row>)
                            }
                            )}
                          </Table.Body>
                        </Table>
                        <button className = 'my_disp_button' onClick={() =>
                          this.props.set_my_disp_focus_input_del_method()}>
                          Ок
                        </button>
                        <div className= 'my_disp_filter_selected_text'>
                          &nbsp; Выбрано
                          &nbsp;
                          {del_method_filter_check_lenght} 
                          &nbsp; из &nbsp;
                          {del_method_filter_length}
                      </div></div>) : (del_method_filter_check_lenght !== del_method_filter_length) ? (
                        <div className= 'my_disp_filter_selected_text'>
                          &nbsp;
                          {del_method_filter_check_lenght}                          
                          &nbsp; из &nbsp;
                          {del_method_filter_length}
                        </div>):(null)  
                    }
                  </Table.HeaderCell>

                  <Table.HeaderCell><div className='small_table_data'>Цена </div></Table.HeaderCell>

                  <Table.HeaderCell>
                    <div className='small_table_data'>
                      Статус
                      <button className = 'my_disp_button' type="text" onClick={() => this.props.set_my_disp_focus_input_status()} >
                        Фильтр
                        </button>
                    </div>
                    {(this.props.store.my_disp.focus_input_status) ?
                      (<div id="myDropdownStatus" className="dropdown-content">
                        <button className = 'my_disp_button' onClick={() => {
                          this.props.set_my_disp_status_filter_default("select")
                        }
                        }>Выбрать все
                        </button>
                        <button className = 'my_disp_button' onClick={() => {
                          this.props.set_my_disp_status_filter_default()
                        }
                        }>Отменить все
                        </button>
                        <Table>
                          <Table.Body>
                            {this.props.store.my_disp.status_filter.map((el, index) => {

                              return (
                                <Table.Row style = {{cursor: 'pointer'}} key={index}  onClick={() => this.props.set_check_my_disp_status(el.id)}>
                                  <Table.Cell> {el.name == "" ? ("(Пустые)") : (el.name)}</Table.Cell>
                                  <Table.Cell><input type="checkbox" checked={el.check} /></Table.Cell>
                                </Table.Row>)
                            }
                            )}
                          </Table.Body>
                        </Table>
                        <button className = 'my_disp_button' onClick={() =>
                          this.props.set_my_disp_focus_input_status()
                        }>Ок
                        </button>
                        <div className= 'my_disp_filter_selected_text'>
                          &nbsp; Выбрано
                          &nbsp;
                          {status_filter_check_lenght} 
                          &nbsp; из &nbsp;
                          {status_filter_length}
                      </div></div>) : (status_filter_check_lenght !== status_filter_length) ? (
                        <div className= 'my_disp_filter_selected_text'>
                          &nbsp;
                          {status_filter_check_lenght}                          
                          &nbsp; из &nbsp;
                          {status_filter_length}
                        </div>):(null)
                    }
                  </Table.HeaderCell>

                  <Table.HeaderCell><div className='small_table_data'>Получатель</div></Table.HeaderCell>
                  <Table.HeaderCell><div className='small_table_data'>Вручено</div></Table.HeaderCell>

                </Table.Row>
              </Table.Header>
              <Table.Body>

                {this.props.store.my_disp.data.filter(
                  (el) => {
                    return (el.Num.indexOf(this.props.store.my_disp.num_filter) > -1 || this.props.store.my_disp.num_filter === "")
                  }
                ).filter(
                  (el) => {
                    const filter_sender_address = this.props.store.my_disp.sender_address.toUpperCase()
                    const sender_address = el.SendAdress.toUpperCase()
                    return (sender_address.indexOf(filter_sender_address) > -1 || this.props.store.my_disp.sender_address === "")
                  }
                ).filter(
                  (el) => {
                    const filter_rec_address = this.props.store.my_disp.rec_address.toUpperCase()
                    const rec_address = el.RecAdress.toUpperCase()
                    return (rec_address.indexOf(filter_rec_address) > -1 || this.props.store.my_disp.rec_address === "")
                  }
                ).filter(
                  (el) => {
                    const selectedRecCities = this.props.store.my_disp.rec_city_filter.filter((el1) => { return (el1.check) })
                    const FindRecCityRes = selectedRecCities.find(el2 => { return el2.name == el.RecCity })
                    return (FindRecCityRes !== undefined)
                  }
                ).filter(
                  (el) => {
                    const selectedSendCities = this.props.store.my_disp.send_city_filter.filter((el1) => { return (el1.check) })
                    const FindSendCityRes = selectedSendCities.find(el2 => { return el2.name == el.SendCity })
                    return (FindSendCityRes !== undefined)
                  }
                ).filter(
                  (el) => {
                    const selectedDelMethods = this.props.store.my_disp.del_method_filter.filter((el1) => { return (el1.check) })
                    const FindDelMethodsRes = selectedDelMethods.find(el2 => { return el2.name == el.DelMethod })
                    return (FindDelMethodsRes !== undefined)
                  }
                ).filter(
                  (el) => {
                    const selectedStatus = this.props.store.my_disp.status_filter.filter((el1) => { return (el1.check) })
                    const FindStatusRes = selectedStatus.find(el2 => { return el2.name == el.Status })
                    return (FindStatusRes !== undefined)
                  }
                ).map((el, index) => {
                  let row_className = ''

                  if (index === this.props.store.my_disp.active_row) {
                    row_className = 'active'
                  }
                
                

                  //console.log(row_className)
                  return (
                    <Table.Row
                      className={row_className}
                      key={index}
                      onClick={this.tr_click.bind(this, index)}
                      onDoubleClick={this.tr_double_click.bind(this, el)}
                    >
                      <Table.Cell><div className='small_table_data'>{el.Date}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.Num}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.SendCity}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.SendAdress}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.SendCompany}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.RecCity}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.RecAdress}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.RecCompany}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.Total}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.Weight}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.Volume}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.DelMethod}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.Price}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.Status}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.Recient}</div></Table.Cell>
                      <Table.Cell><div className='small_table_data'>{el.RecDate}</div></Table.Cell>
                    </Table.Row>)
                }
                )}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    );
  }
};

export default withCookies(connect(
  (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
  dispatch => ({

    set_type_search: (param) => { dispatch({ type: 'set_type_search', payload: param }) },
    set_search: (param) => { dispatch({ type: 'set_search', payload: param }) },
    set_my_disp_data: (param) => { dispatch({ type: 'set_my_disp_data', payload: param }) },
    set_my_disp_date_from: (param) => { dispatch({ type: 'set_my_disp_date_from', payload: param }) },
    set_my_disp_date_to: (param) => { dispatch({ type: 'set_my_disp_date_to', payload: param }) },
    set_my_disp_active_row: (param) => { dispatch({ type: 'set_my_disp_active_row', payload: param }) },

    set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
    set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
    set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
    filter_common_string: (param) => { dispatch({ type: 'filter_common_string', payload: param})},

    //set_my_disp_date_sort: () => {dispatch({ type: 'set_my_disp_date_sort'})},

    set_my_disp_num_filter: (param) => { dispatch({ type: 'set_my_disp_num_filter', payload: param }) },
    set_my_disp_sender_address: (param) => { dispatch({ type: 'set_my_disp_sender_address', payload: param }) },
    set_my_disp_rec_address: (param) => { dispatch({ type: 'set_my_disp_rec_address', payload: param }) },

    set_my_disp_focus_all_default: () => { dispatch({ type: 'set_my_disp_focus_all_default'}) },

    set_my_disp_focus_input_send_city: () => { dispatch({ type: 'set_my_disp_focus_input_send_city' }) },
    set_my_disp_send_city_filter_default: (param) => { dispatch({ type: 'set_my_disp_send_city_filter_default', payload: param }) },

    set_my_disp_focus_input_rec_city: () => { dispatch({ type: 'set_my_disp_focus_input_rec_city' }) },
    set_my_disp_rec_city_filter_default: (param) => { dispatch({ type: 'set_my_disp_rec_city_filter_default', payload: param }) },

    set_my_disp_focus_input_del_method: () => { dispatch({ type: 'set_my_disp_focus_input_del_method' }) },
    set_my_disp_del_method_filter_default: (param) => { dispatch({ type: 'set_my_disp_del_method_filter_default', payload: param }) },

    set_my_disp_focus_input_status: () => { dispatch({ type: 'set_my_disp_focus_input_status' }) },
    set_my_disp_status_filter_default: (param) => { dispatch({ type: 'set_my_disp_status_filter_default', payload: param }) },

    set_check_my_disp_send_city: (param) => { dispatch({ type: 'set_check_my_disp_send_city', payload: param }) },
    set_check_my_disp_rec_city: (param) => { dispatch({ type: 'set_check_my_disp_rec_city', payload: param }) },
    set_check_my_disp_del_method: (param) => { dispatch({ type: 'set_check_my_disp_del_method', payload: param }) },
    set_check_my_disp_status: (param) => { dispatch({ type: 'set_check_my_disp_status', payload: param }) },

  })
)(Screen));