import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'
import { customStyles } from "./../common/common_style";
import { Header, Modal, Table, Button, Icon, Checkbox } from 'semantic-ui-react'
import ReactToPrint from 'react-to-print'
import { get_data } from './../common/common_modules'
import 'semantic-ui-css/semantic.min.css'
import './upload_manifest.css'
import ComponentToPrint from './disp_print'
import StickerToPrint from './sticker_print'
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

// import { get_data } from './../common/common_modules'

const UploadInOneList = [
  { label: "Загрузка каждой накладной", value: false },
  { label: "Загрузка консолидации", value: true }
]

const translate = {
  label: "Наименование",
  Num: "Номер накладной",
  SendCity: "Город отправителя",
  SendAdress: "Адрес отправителя",
  SendPerson: "Контактное лицо отправителя",
  SendEmail: "Контактный электронный адрес отправителя",
  SendAddInfo: "Дополнительная контактная информация отправителя",
  RecCity: "Город получателя",
  RecAdress: "Адрес получателя",
  RecPerson: "Контактное лицо получателя",
  RecPhone: "Основной контактный телефон получателя",
  RecEmail: "Контактный электронный адрес получателя",
  RecAddInfo: "Дополнительная контактная информация получателя",
  InsureValue: "Страховая стоимость",
  COD: "Сумма наложенного платежа",
  Total: "Количество мест",
  Weight: "Общий фактический вес",
  Volume: "Общий объемный вес",
  SendCompany: "Компания отправителя",
  RecCompany: "Компания получателя",
  SendPhone: "Основной контактный телефон отправителя"
}


class Screen extends React.Component {

  convert_data = () => {
    this.props.reset_disp_data()
    const it = this.props.store.upload_manifest.import_template
    const dt = this.props.store.upload_manifest.default_template
    let consolidate_data = []
    let data = []
    let sourse_data
    // if (this.props.store.upload_manifest.upload_in_one.value && this.props.store.upload_manifest.consolidate_checkbox_index !== 0) {
    //   consolidate_data = this.props.store.upload_manifest.data.filter((el)=>el[this.props.store.upload_manifest.consolidate_checkbox_index])

    //   sourse_data = this.props.store.upload_manifest.data.filter((el)=>!el[this.props.store.upload_manifest.consolidate_checkbox_index])

    //   const ConsolidateImportTemplate = this.props.store.upload_manifest.import_template.ConsolidateImportTemplate
    //   if (ConsolidateImportTemplate !== 0 && consolidate_data.length !== 0) {
    //     const consolidate_dt = this.props.store.upload_manifest.default_template_list.find(el=>{return el.Key === this.props.store.upload_manifest.import_template.ConsolidateImportTemplate})
    //     console.log(consolidate_dt)




    //     let SendCity = consolidate_dt.SendCity
    //     let SendAdress = consolidate_dt.SendAdress
    //     let SendCompany = consolidate_dt.SendCompany
    //     let SendPerson = consolidate_dt.SendPerson
    //     let SendPhone = consolidate_dt.SendPhone
    //     let SendAddInfo = consolidate_dt.SendAddInfo
    //     let RecCity = consolidate_dt.RecCity
    //     let RecAdress = consolidate_dt.RecAdress
    //     let RecCompany = consolidate_dt.RecCompany
    //     let RecPerson = consolidate_dt.RecPerson
    //     let RecPhone = consolidate_dt.RecPhone
    //     let RecAddInfo = consolidate_dt.RecAddInfo

    //     let ConsolidateInsureValue = 0
    //     let ConsolidateTotal = 0
    //     let ConsolidateWeight = 0
    //     let ConsolidateVolume = 0

    //     consolidate_data.forEach(el=>{
    //       if(it.Volume !== "0")  {ConsolidateVolume = ConsolidateVolume + parseInt(el[it.Volume-1])}
    //       if(it.InsureValue !== "0")  {ConsolidateInsureValue = ConsolidateVolume + parseInt(el[it.InsureValue-1])}
    //       if(it.Total !== "0")  {ConsolidateTotal = ConsolidateTotal + parseInt(el[it.Total-1])}
    //       if(it.Weight !== "0")  {ConsolidateWeight = ConsolidateWeight + parseInt(el[it.Weight-1])}
    //     })

    //     let disp = {Num: "",
    //       SendCity: SendCity,
    //       SendAdress: SendAdress,
    //       SendCompany: SendCompany,
    //       SendPerson: SendPerson,
    //       SendPhone: SendPhone,
    //       SendAddInfo: SendAddInfo, 
    //       RecCity: RecCity,
    //       RecAdress: RecAdress,
    //       RecCompany: RecCompany,
    //       RecPerson: RecPerson,
    //       RecPhone: RecPhone,
    //       RecAddInfo: RecAddInfo,
    //       InsureValue: ConsolidateInsureValue,
    //       COD: 0,
    //       Total: ConsolidateTotal,
    //       Weight: ConsolidateWeight,
    //       Volume: ConsolidateVolume,
    //       Status: 'Не загружено',
    //       Comment: 'Консолидация',
    //       Key: 0
    //     }
    //    console.log(disp)
    //     data.push(disp)

    //   }



    // } else {
    //   sourse_data = this.props.store.upload_manifest.data
    // }



    sourse_data = this.props.store.upload_manifest.data
    sourse_data.forEach((el, index, arr) => {
      
      let push_it = true
      if (el.length == 1) {
        push_it = false
      }
      let CurIndex

      if (this.props.store.upload_manifest.upload_in_one.value && this.props.store.upload_manifest.consolidate_checkbox_index !== 0 && this.props.store.upload_manifest.import_template.ConsolidateImportTemplate !== 0 && consolidate_data.length !== 0) {
        CurIndex = index + 1
      } else {
        CurIndex = index
      }
      // console.log(el)
      let Num = ""
      let SendCity = ""
      let SendAdress = ""
      let SendCompany = ""
      let SendPerson = ""
      let SendPhone = ""
      let SendAddInfo = ""
      let RecCity = ""
      let RecAdress = ""
      let RecCompany = ""
      let RecPerson = ""
      let RecPhone = ""
      let RecAddInfo = ""

      let InsureValue = 0
      let COD = 0
      let Total = 0
      let Weight = 0
      let Volume = 0



      //console.log(dt)

      if (it.Num !== 0) { Num = el[it.Num - 1] }
      // console.log(it.SendCity)
      // console.log(dt.SendCity)
      if (it.SendCity !== "0") { SendCity = el[it.SendCity - 1] } else { SendCity = dt.SendCity }
      if (it.SendAdress !== "0") { SendAdress = el[it.SendAdress - 1] } else { SendAdress = dt.SendAdress }
      if (it.SendCompany !== "0") { SendCompany = el[it.SendCompany - 1] } else { SendCompany = dt.SendCompany }
      if (it.SendPerson !== "0") { SendPerson = el[it.SendPerson - 1] } else { SendPerson = dt.SendPerson }
      if (it.SendPhone !== "0") { SendPhone = el[it.SendPhone - 1] } else { SendPhone = dt.SendPhone }


      if (it.RecCity !== "0") { RecCity = el[it.RecCity - 1] } else { RecCity = dt.RecCity }
      if (it.RecAdress !== "0") { RecAdress = el[it.RecAdress - 1] } else { RecAdress = dt.RecAdress }
      if (it.RecCompany !== "0") { RecCompany = el[it.RecCompany - 1] } else { RecCompany = dt.RecCompany }
      if (it.RecPerson !== "0") { RecPerson = el[it.RecPerson - 1] } else { RecPerson = dt.RecPerson }
      if (it.RecPhone !== "0") { RecPhone = el[it.RecPhone - 1] } else { RecPhone = dt.RecPhone }
      if (it.RecAddInfo !== "0") { RecAddInfo = el[it.RecAddInfo - 1] } else { RecAddInfo = dt.RecAddInfo }


      if (this.props.store.upload_manifest.upload_in_one.value) {
        if (arr.filter((cur_el, cur_index) => cur_el[it.RecAdress - 1] == el[it.RecAdress - 1] && cur_index < index).length > 0) {
          push_it = false
        } else if (arr.filter((cur_el, cur_index) => cur_el[it.RecAdress - 1] == el[it.RecAdress - 1] && cur_index > index).length > 0) {

          let cons_arr = arr.filter((cur_el) => cur_el[it.RecAdress - 1] == el[it.RecAdress - 1])

          if (it.Total !== "0") {
            cons_arr.forEach(total_el => Total = Total + parseFloat(total_el[it.Total - 1]))

          }
          if (it.Weight !== "0") {
            cons_arr.forEach(total_el => Weight = Weight + parseFloat(total_el[it.Weight - 1]))
          }
          if (it.Volume !== "0") {
            cons_arr.forEach(total_el => Volume = Volume + parseFloat(total_el[it.Volume - 1]))
          }
          if (it.SendAddInfo !== "0") {
            cons_arr.forEach(total_el => SendAddInfo = SendAddInfo + total_el[it.SendAddInfo - 1] + String.fromCharCode(10))

          }

        } else {
          if (it.Total !== "0") { Total = el[it.Total - 1] }
          if (it.Weight !== "0") { Weight = el[it.Weight - 1] }
          if (it.Volume !== "0") { Volume = el[it.Volume - 1] }
          if (it.SendAddInfo !== "0") { SendAddInfo = el[it.SendAddInfo - 1] } else { SendAddInfo = dt.SendAddInfo }
        }

      } else {
        if (it.Total !== "0") { Total = el[it.Total - 1] }
        if (it.Weight !== "0") { Weight = el[it.Weight - 1] }
        if (it.Volume !== "0") { Volume = el[it.Volume - 1] }
        if (it.SendAddInfo !== "0") { SendAddInfo = el[it.SendAddInfo - 1] } else { SendAddInfo = dt.SendAddInfo }
      }////

      if (it.InsureValue !== "0") { InsureValue = el[it.InsureValue - 1] }
      if (it.COD !== "0") { COD = el[it.COD - 1] }
      // if(it.Total !== "0") {Total = el[it.Total-1]} 
      // if(it.Weight !== "0") {Weight = el[it.Weight-1]} 
      // if(it.Volume !== "0") {Volume = el[it.Volume-1]} 


      if (RecCity == "") {
        const Recdispt = this.props.store.upload_manifest.disp_template_list.find(el => {
          return el.label === RecAdress
        })
        if (Recdispt !== undefined) {
          RecCity = Recdispt.City
          RecAdress = Recdispt.Adress
          if (RecPhone == "") { RecPhone = Recdispt.Phone }
          if (RecPerson == "") { RecPerson = Recdispt.Person }
          if (RecCompany == "") { RecCompany = Recdispt.Company }
          if (RecAddInfo == "") { RecAddInfo = Recdispt.AddInfo }
        }
      }

      if (SendCity == "") {
        const Senddispt = this.props.store.upload_manifest.disp_template_list.find(el => {
          return el.label === SendAdress
        })
        if (Senddispt !== undefined) {
          SendCity = Senddispt.City
          SendAdress = Senddispt.Adress
          if (SendPhone == "") { SendPhone = Senddispt.Phone }
          if (SendPerson == "") { SendPerson = Senddispt.Person }
          if (SendCompany == "") { SendCompany = Senddispt.Company }
          if (SendAddInfo == "") { SendAddInfo = Senddispt.AddInfo }
        }
      }

      let disp = {
        Num: Num,
        SendCity: SendCity,
        SendAdress: SendAdress,
        SendCompany: SendCompany,
        SendPerson: SendPerson,
        SendPhone: SendPhone,
        SendAddInfo: SendAddInfo,
        RecCity: RecCity,
        RecAdress: RecAdress,
        RecCompany: RecCompany,
        RecPerson: RecPerson,
        RecPhone: RecPhone,
        RecAddInfo: RecAddInfo,
        InsureValue: InsureValue,
        COD: COD,
        Total: Total,
        Weight: Weight,
        Volume: Volume,
        Status: 'Не загружено',
        Key: CurIndex,
        Comment: ''
      }
      if (push_it) {
        data.push(disp)
      } 



    })



    this.props.set_disp_data(data)

  }

  read_text = () => {
    this.props.set_data_upload_manifest()
  }

  check_checkbox = (cell_index, element_index) => {
    // console.log(cell_index)
    // console.log(element_index)

    this.props.upload_manifest_check_checkbox({ cell_index: cell_index, element_index: element_index })
  }

  create_table = () => {
    let upload_in_one_data = 0
    let upload_in_one = false

    if (this.props.store.upload_manifest.upload_in_one.value) {
      upload_in_one = true
      upload_in_one_data = 1

    }
    const { Key, ConsolidateImportTemplate, ...newData } = this.props.store.upload_manifest.import_template;

    //console.log(newData)
    const ObjVal = Object.values(newData)

    if (ObjVal.length > 0) {

      const Parseint = ObjVal.map((el) => { return parseInt(el) })
      const filteObj = Parseint.filter((fel) => fel > 0)
      //const max = filteObj.reduce(function(a, b) {return Math.max(a, b)}) + upload_in_one_data;
      const max = filteObj.reduce(function (a, b) { return Math.max(a, b) });

      // if (upload_in_one) {
      //   this.props.set_consolidate_checkbox_index(max)
      // }
      const import_keys = Object.keys(this.props.store.upload_manifest.import_template)

      let header = []

      for (let i = 0; i < max; i++) {

        var results = [];
        var toSearch = i + 1;
        let import_template_length = import_keys.length;
        for (var s = 0; s < import_template_length; s++) {
          if (Parseint[s] === toSearch) { results.push(translate[import_keys[s]]) }
        }

        if (results.length > 0) {
          header.push(<Table.HeaderCell key={i}>{results[0]}</Table.HeaderCell>)
        } else {
          header.push(<Table.HeaderCell key={i}> </Table.HeaderCell>)
        }
      }
      // if (upload_in_one) {
      //   header.push(<Table.HeaderCell  key={max}>Консолидировать</Table.HeaderCell>)
      // }

      let body = []
      this.props.store.upload_manifest.data.forEach((element, element_index) => {

        let children = []
        // console.log(this.props.store.upload_manifest.data)
        // console.log(element)
        element.forEach((cell, cell_index) => {
          if (cell === true || cell === false) {
            children.push(<Table.Cell key={cell_index}>
              <Checkbox
                onChange={this.check_checkbox.bind(this, cell_index, element_index)}
                checked={cell}
              />
            </Table.Cell>)
          } else {
            children.push(<Table.Cell key={cell_index}>{cell}</Table.Cell>)
          }


        })

        body.push(<Table.Row key={element_index}>{children}</Table.Row>)

      })
      let table = []
      table.push(<Table.Header key='h1'><Table.Row key='hr1'>{header}</Table.Row></Table.Header>)
      table.push(<Table.Body key='b1'>{body}</Table.Body>)

      return table
    }
  }

  upload_data = () => {
    if (this.props.store.upload_manifest.disp_data.filter(el => el.Status === 'Не загружено' && el.Total > 0).length > 0) {
      this.upload_disp(this.props.store.upload_manifest.disp_data.filter(el => el.Status === 'Не загружено' && el.Total > 0)[0])
    }
  }

  upload_disp = (disp) => {

    const create_disp_data = {
      userkey: this.props.store.login.userkey,
      Number: 0,
      PayType: "Безналичная Оплата",

      SendCity: disp.SendCity,
      SendAdress: disp.SendAdress,
      SendCompany: disp.SendCompany,
      SendPhone: disp.SendPhone,
      SendPerson: disp.SendPerson,
      SendAddInfo: disp.SendAddInfo,
      SendEmail: "",
      SendTerminal: false,
      SendSelectTerminal: null,
      SendEmailInformer: false,

      RecCity: disp.RecCity,
      RecAdress: disp.RecAdress,
      RecCompany: disp.RecCompany,
      RecPhone: disp.RecPhone,
      RecPerson: disp.RecPerson,
      RecAddInfo: disp.RecAddInfo,
      RecEmail: "",
      RecTerminal: false,
      RecSelectTerminal: null,
      RecEmailInformer: false,

      Cargo: [],
      Total: disp.Total,
      Volume: disp.Volume,
      Weight: disp.Weight,

      CargoInfoType: true

    }

    new Promise((resolve, reject) => {
      //resolve(this.props.set_disp_status({Key:disp.Key, Status:"Загружено"}))
      get_data('createcustomerdisp', create_disp_data).then(
        (result) => {

          const data = {
            userkey: this.props.store.login.userkey,
            status: "Накладная",
            num: result.Number
          };

          get_data('dispatch', data).then(
            (result_print_data) => {

              resolve(this.props.set_disp_status({ Key: disp.Key, Status: "Загружено", Num: result.Number, print_data: result_print_data }))
            },
            (err) => { console.log(err) }
          );

        },
        (err) => { console.log(err) }
      );

    }).then((result) => {
      this.upload_data()
    }
    ).catch((err) => {
    })

    //
  }

  sent_disp = () => {

    // console.log("start")
    // console.log(this.props.store.create_disp.Number)


  }

  disp_print_data = (el) => {
    const data = {
      disp: {
        data: el
      }
    }
    return data

  }

  upload_manifest_click_template_row = (el) => {

    //console.log(el)
  }

  create_disp_from_temlate = () => {

    let data = []
    const dt = this.props.store.upload_manifest.default_template

    this.props.store.upload_manifest.disp_template_list.filter(el => el.selected).forEach((el, index) => {
      const max = this.props.store.upload_manifest.disp_data.reduce((prev, cur) => {
        if (prev.Key > cur.Key) {
          return prev.Key
        }
        return cur.Key
      }, 0)

      console.log(max)

      let CurIndex = index + max + 1

      // if (this.props.store.upload_manifest.upload_in_one.value && this.props.store.upload_manifest.consolidate_checkbox_index !== 0 && this.props.store.upload_manifest.import_template.ConsolidateImportTemplate !==0 && consolidate_data.length !== 0){
      //   CurIndex = index+1
      // } else {
      //   CurIndex = index
      // }
      // console.log(el)
      let Num = ""
      let SendCity = ""
      let SendAdress = ""
      let SendCompany = ""
      let SendPerson = ""
      let SendPhone = ""
      let SendAddInfo = ""
      let RecCity = ""
      let RecAdress = ""
      let RecCompany = ""
      let RecPerson = ""
      let RecPhone = ""
      let RecAddInfo = ""

      let InsureValue = 0
      let COD = 0
      let Total = ""
      let Weight = ""
      let Volume = ""



      //console.log(dt)

      // if(it.Num !== 0) {Num = el[it.Num-1]}
      // console.log(it.SendCity)
      // console.log(dt.SendCity)
      SendCity = dt.SendCity
      SendAdress = dt.SendAdress
      SendCompany = dt.SendCompany
      SendPerson = dt.SendPerson
      SendPhone = dt.SendPhone
      SendAddInfo = dt.SendAddInfo

      RecCity = el.City
      RecAdress = el.Adress
      RecCompany = el.Company
      RecPerson = el.Person
      RecPhone = el.Phone
      RecAddInfo = el.AddInfo

      // if(it.InsureValue !== "0") {InsureValue = el[it.InsureValue-1]} 
      // if(it.COD !== "0") {COD = el[it.COD-1]} 
      // if(it.Total !== "0") {Total = el[it.Total-1]} 
      // if(it.Weight !== "0") {Weight = el[it.Weight-1]} 
      // if(it.Volume !== "0") {Volume = el[it.Volume-1]} 


      // if(RecCity == ""){
      //   const Recdispt = this.props.store.upload_manifest.disp_template_list.find(el=>{
      //     return el.label === RecAdress
      //   })
      //   if (Recdispt !== undefined){
      //     RecCity = Recdispt.City
      //     RecAdress = Recdispt.Adress
      //     if (RecPhone == "") {RecPhone = Recdispt.Phone}
      //     if (RecPerson == "") {RecPerson = Recdispt.Person}
      //     if (RecCompany == "") {RecCompany = Recdispt.Company}
      //     if (RecAddInfo == "") {RecAddInfo = Recdispt.AddInfo}
      //   }
      // }

      // if(SendCity == ""){
      //   const Senddispt = this.props.store.upload_manifest.disp_template_list.find(el=>{
      //     return el.label === SendAdress
      //   })
      //   if (Senddispt !== undefined){
      //     SendCity = Senddispt.City
      //     SendAdress = Senddispt.Adress
      //     if (SendPhone == "") {SendPhone = Senddispt.Phone}
      //     if (SendPerson == "") {SendPerson = Senddispt.Person}
      //     if (SendCompany == "") {SendCompany = Senddispt.Company}
      //     if (SendAddInfo == "") {SendAddInfo = Senddispt.AddInfo}
      //   }
      // }

      let disp = {
        Num: Num,
        SendCity: SendCity,
        SendAdress: SendAdress,
        SendCompany: SendCompany,
        SendPerson: SendPerson,
        SendPhone: SendPhone,
        SendAddInfo: SendAddInfo,
        RecCity: RecCity,
        RecAdress: RecAdress,
        RecCompany: RecCompany,
        RecPerson: RecPerson,
        RecPhone: RecPhone,
        RecAddInfo: RecAddInfo,
        InsureValue: InsureValue,
        COD: COD,
        Total: Total,
        Weight: Weight,
        Volume: Volume,
        Status: 'Не загружено',
        Key: CurIndex,
        Comment: ''
      }

      data.push(disp)


    })
    this.props.set_disp_data(data)
    this.props.set_upload_manifest_open_modal_dt(false)
    this.props.upload_manifest_reset_template_checkbox()




  }

  render() {
    document.onkeydown = function (event) { }

    const TitleStyle = {
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
    const CellStyle = {
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
    const CellStyle2 = {
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

    this.componentRef = []
    this.stickerRef = []

    const complited = this.props.store.upload_manifest.disp_data.filter((el) => el.Status === 'Загружено');
    const complitedData = this.props.store.upload_manifest.disp_data.filter((el) => el.Status === 'Загружено');

    let ExcelData = [];
    let wSendAddInfo = 0, wTotal = 0, wWeight = 0, wVolume = 0, wRecAddInfo = 0, wSendCompany = 0, wSendAdress = 0, wRecCompany = 0, wRecAdress = 0;
    for (let i = 0; i < complitedData.length; i++) {
      wSendAddInfo = (complitedData[i].SendAddInfo.length > wSendAddInfo) ? (complitedData[i].SendAddInfo.length) : (wSendAddInfo);
      wTotal = (complitedData[i].Total.length > wTotal) ? (complitedData[i].Total.length) : (wTotal);
      wWeight = (complitedData[i].Weight.length > wWeight) ? (complitedData[i].Weight.length) : (wWeight);
      wVolume = (complitedData[i].Volume.length > wVolume) ? (complitedData[i].Volume.length) : (wVolume);
      wRecAddInfo = (complitedData[i].RecAddInfo.length > wRecAddInfo) ? (complitedData[i].RecAddInfo.length) : (wRecAddInfo);
      wSendCompany = (complitedData[i].SendCompany.length > wSendCompany) ? (complitedData[i].SendCompany.length) : (wSendCompany);
      wSendAdress = ((complitedData[i].SendAdress.length + complitedData[i].SendCity.length) > wSendAdress) ? (complitedData[i].SendAdress.length + complitedData[i].SendCity.length) : (wSendAdress);
      wRecCompany = (complitedData[i].RecCompany.length > wRecCompany) ? (complitedData[i].RecCompany.length) : (wRecCompany);
      wRecAdress = (complitedData[i].RecAdress.length + complitedData[i].RecCity.length > wRecAdress) ? (complitedData[i].RecAdress.length + complitedData[i].RecCity.length) : (wRecAdress);

      let sendAddInfo = complitedData[i].SendAddInfo.replace(/\/s/g, '').replace(/\r?\n/g, " ");

      ExcelData[i] = [
        { value: (complitedData[i].Num || ""), style: CellStyle },
        { value: sendAddInfo, style: CellStyle2 },
        { value: complitedData[i].Total, style: CellStyle },
        { value: complitedData[i].Weight, style: CellStyle },
        { value: complitedData[i].Volume, style: CellStyle },
        { value: complitedData[i].RecAddInfo, style: CellStyle },
        { value: complitedData[i].SendCompany, style: CellStyle },
        { value: complitedData[i].SendCity + " " + complitedData[i].SendAdress, style: CellStyle },
        { value: complitedData[i].RecCompany, style: CellStyle },
        { value: complitedData[i].RecCity + " " + complitedData[i].RecAdress, style: CellStyle },
      ];
    }

    let ExcelColumn = [
      { title: "Номер накладной", style: TitleStyle, width: { wch: 16 } },
      { title: "Доп. информация", style: TitleStyle, width: { wch: 15 } },
      { title: "Кол-во мест", style: TitleStyle, width: { wch: 10 } },
      { title: "Факт. Вес", style: TitleStyle, width: { wch: 8 } },
      { title: "Объем", style: TitleStyle, width: { wch: 5 } },
      { title: "Температурный режим", style: TitleStyle, width: { wch: 18 } },
      { title: "Грузоотправитель", style: TitleStyle, width: { wch: (wSendCompany / 1.5 > 15) ? (wSendCompany/1.5) : (15) } },
      { title: "Адрес грузоотправителя", style: TitleStyle, width: { wch: (wSendAdress / 1.5 > 20) ? (wSendAdress/1.5) : (20) } },
      { title: "Грузополучатель", style: TitleStyle, width: { wch: (wRecCompany / 1.5 > 15) ? (wRecCompany/1.5) : (15) } },
      { title: "Адрес доставки", style: TitleStyle, width: { wch: (wRecAdress / 1.5 > 14) ? (wRecAdress/1.5) : (14) } },
    ]

    const currentDate = new Date();

    const styledMultiDataSet = [
      {
        columns: [
          { title: "Название Отправителя:", style: CellStyle },
          { title: "ИНВИТРО-Сибирь ООО", style: CellStyle },
        ],
        data: [
          [
            { value: "Дата забора груза:", style: CellStyle },
            { value: currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear(), style: CellStyle },
          ],
        ],
      },
      {
        ySteps: 1,
        columns: ExcelColumn,
        data: ExcelData,
      }
    ]

    return (

      <div>
        {/* Загрузить манифест */}
        <div>
          <textarea onChange={e => this.props.set_text_area(e.target.value)} value={this.props.store.upload_manifest.text_area} type="text"></textarea>
        </div>
        <div>
          <button className="ui button mini" onClick={this.read_text.bind(this)}>Прочитать</button>
          <button className="ui button mini" disabled={this.props.store.upload_manifest.data.length == 0} onClick={this.convert_data.bind(this)}>Преобразовать</button>
          <button className="ui button mini" disabled={this.props.store.upload_manifest.disp_data.length == 0 || this.props.store.upload_manifest.disp_data.filter(el => el.RecCity == "").length !== 0} onClick={this.upload_data.bind(this)}>Загрузить данные</button>

          <ExcelFile filename={"Акт ПП"} element={this.props.store.upload_manifest.disp_data.some(item => item.Status === "Загружено") ? (<Button style={{ margin: '-5px 0 0 15px' }} size='mini'>Сохранить в Exсel</Button>) : (<Button disabled style={{ margin: '-5px 0 0 15px' }} size='mini'>Сохранить в Exсel</Button>)}>
            <ExcelSheet dataSet={styledMultiDataSet} name="Лист1" />
          </ExcelFile>

          {complited.length !== 0 ? (<ReactToPrint
            trigger={() => <button className="ui button mini"><Icon name='print'></Icon> Печать всех накладных</button>}
            content={() => this.all_disp_print}
          />) : (null)}

          {complited.length !== 0 ? (<div style={{ display: "none" }} >
            <ComponentToPrint userkey={this.props.store.login.userkey} disp={complited.map((el) => { return el.print_data })} ref={cur_el => (this.all_disp_print = cur_el)} />
          </div>) : (null)}

          {complited.length !== 0 && this.props.store.login.print_ticket ? (<ReactToPrint
            trigger={() => <button className="ui button mini"><Icon name='print'></Icon> Печать всех наклеек</button>}
            content={() => this.all_ticket_print}
          />) : (null)}

          {complited.length !== 0 && this.props.store.login.print_ticket ? (<div style={{ display: "none" }} >
            <StickerToPrint disp={complited.map((el) => { return el.print_data })} ref={cur_el => (this.all_ticket_print = cur_el)} />
          </div>) : (null)}

        </div>
        <div className='upload_manifest_control_panel'>
          <div className="disp_data_label">Шаблон импорта:</div>
          <div className="disp_data_el">
            <Select
              options={this.props.store.upload_manifest.import_template_list}
              styles={customStyles}
              value={this.props.store.upload_manifest.import_template}
              onChange={(values) => this.props.set_import_template(values)}
            />
          </div>
          <div>


            <Modal trigger={<button className="ui icon button mini"><i className="eye icon"></i></button>} >
              <Modal.Header>Шаблон импорта</Modal.Header>

              <Modal.Content>

                <Modal.Description>
                  <Header>{this.props.store.upload_manifest.import_template.label}</Header>
                  <div className='upload_mainfest_modal_info'>

                    <div className="disp_data_label">Номер накладной: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.Num}</div>
                    <div className="disp_data_label">Город отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.SendCity}</div>
                    <div className="disp_data_label">Адрес отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.SendAdress}</div>
                    <div className="disp_data_label">Компания отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.SendCompany}</div>
                    <div className="disp_data_label">Контактное лицо отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.SendPerson}</div>
                    <div className="disp_data_label">Контактный телефон отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.SendPhone}</div>
                    <div className="disp_data_label">Электронный адрес отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.SendEmail}</div>
                    <div className="disp_data_label">Дополнительная информация отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.SendAddInfo}</div>
                    <div className="disp_data_label">Город получателя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.RecCity}</div>
                    <div className="disp_data_label">Адрес отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.RecAdress}</div>
                    <div className="disp_data_label">Компания получателя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.RecCompany}</div>
                    <div className="disp_data_label">Контактное лицо отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.RecPerson}</div>
                    <div className="disp_data_label">Контактный телефон отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.RecPhone}</div>
                    <div className="disp_data_label">Электронный адрес отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.RecEmail}</div>
                    <div className="disp_data_label">Дополнительная информация отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.RecAddInfo}</div>
                    <div className="disp_data_label">Страховая стоимость: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.InsureValue}</div>
                    <div className="disp_data_label">Сумма наложенного платежа: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.COD}</div>
                    <div className="disp_data_label">Количество мест: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.Total}</div>
                    <div className="disp_data_label">Общий фактический вес: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.Weight}</div>
                    <div className="disp_data_label">Общий объемный вес: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.import_template.Volume}</div>
                  </div>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>

          <div className="disp_data_label">Значения по умолчанию:</div>
          <div className="disp_data_el">
            <Select
              options={this.props.store.upload_manifest.default_template_list}
              styles={customStyles}
              value={this.props.store.upload_manifest.default_template}
              onChange={(values) => this.props.set_default_template(values)}
            />

          </div>
          <div>
            <Modal trigger={<button className="ui icon button mini"><i className="eye icon"></i></button>}>
              <Modal.Header>Шаблон значений по умалчанию</Modal.Header>
              <Modal.Content>

                <Modal.Description>
                  <Header>{this.props.store.upload_manifest.default_template.label}</Header>
                  <div className='upload_mainfest_modal_info'>
                    <div className="disp_data_label">Город отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.SendCity}</div>
                    <div className="disp_data_label">Адрес отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.SendAdress}</div>
                    <div className="disp_data_label">Компания отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.SendCompany}</div>
                    <div className="disp_data_label">Контактное лицо отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.SendPerson}</div>
                    <div className="disp_data_label">Контактный телефон отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.SendPhone}</div>
                    <div className="disp_data_label">Электронный адрес отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.SendEmail}</div>
                    <div className="disp_data_label">Дополнительная информация отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.SendAddInfo}</div>
                    <div className="disp_data_label">Город получателя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.RecCity}</div>
                    <div className="disp_data_label">Адрес отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.RecAdress}</div>
                    <div className="disp_data_label">Компания получателя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.RecCompany}</div>
                    <div className="disp_data_label">Контактное лицо отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.RecPerson}</div>
                    <div className="disp_data_label">Контактный телефон отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.RecPhone}</div>
                    <div className="disp_data_label">Электронный адрес отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.RecEmail}</div>
                    <div className="disp_data_label">Дополнительная информация отправителя: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.RecAddInfo}</div>
                    <div className="disp_data_label">Страховая стоимость: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.InsureValue}</div>
                    <div className="disp_data_label">Сумма наложенного платежа: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.COD}</div>
                    <div className="disp_data_label">Срочность доставки: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.DelType}</div>
                    <div className="disp_data_label">Тип оплаты: </div>
                    <div className="disp_data_el">{this.props.store.upload_manifest.default_template.PayType}</div>
                  </div>

                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
          <div className="disp_data_label">Шаблоны адресов:</div>
          <div className="disp_data_el">{this.props.store.upload_manifest.disp_template_list.length}</div>
          <div>
            <button onClick={() => { this.props.set_upload_manifest_open_modal_dt(true) }} className="ui icon button mini"><i className="eye icon"></i></button>
            <Modal onClose={() => this.props.set_upload_manifest_open_modal_dt(false)} open={this.props.store.upload_manifest.open_modal_dt} >
              <Modal.Header>Шаблоны адресов</Modal.Header>
              <Modal.Content>

                <Modal.Description>

                  <div >
                    <Table celled compact='very'>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Имя</Table.HeaderCell>
                          <Table.HeaderCell>Город</Table.HeaderCell>
                          <Table.HeaderCell>Адрес</Table.HeaderCell>
                          <Table.HeaderCell>Телефон</Table.HeaderCell>
                          <Table.HeaderCell>Конт. лицо</Table.HeaderCell>
                          <Table.HeaderCell>Компания</Table.HeaderCell>
                          <Table.HeaderCell>Доп. инфо</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {this.props.store.upload_manifest.disp_template_list.map((el, index) =>

                          <Table.Row key={index} onDoubleClick={this.upload_manifest_click_template_row.bind(this, el)}>
                            <Table.Cell>{el.label}</Table.Cell>
                            <Table.Cell>{el.City}</Table.Cell>
                            <Table.Cell>{el.Adress}</Table.Cell>
                            <Table.Cell>{el.Phone}</Table.Cell>
                            <Table.Cell>{el.Person}</Table.Cell>
                            <Table.Cell>{el.Company}</Table.Cell>
                            <Table.Cell>{el.AddInfo}</Table.Cell>
                            <Table.Cell><input onChange={() => this.props.upload_manifest_check_template_checkbox(el.Key)} type='checkbox' checked={el.selected}></input></Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>

                    {this.props.store.upload_manifest.disp_template_list.filter((el) => { return (el.selected) }).length > 0 ? (<button onClick={this.create_disp_from_temlate.bind(this)}>Cоздать ({this.props.store.upload_manifest.disp_template_list.filter((el) => { return (el.selected) }).length})</button>) : <button disabled>Cоздать</button>}
                  </div>

                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
          {this.props.store.login.consolidate_upload_manifest ? (<div className="disp_data_label">Тип загрузки:</div>) : (null)}
          {this.props.store.login.consolidate_upload_manifest ? (
            <div className="disp_data_el">
              <Select
                options={UploadInOneList}
                styles={customStyles}
                value={this.props.store.upload_manifest.upload_in_one}
                onChange={(values) => this.props.set_upload_in_one(values)}
              />


            </div>
          ) : (null)}


        </div>

        <div>
          <Table celled compact='very' size='small'>

            {this.create_table()}


            {/* <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>3 People</Table.HeaderCell>
        <Table.HeaderCell>2 Approved</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Footer> */}
          </Table>
        </div>

        <div>
          {this.props.store.upload_manifest.disp_data.length > 0 ? (
            <div className="upload_manifest_disp_data">
              <div className="upload_manifest_disp_data_header">
                <div className="upload_manifest_data_label_header">Данные по грузу:</div>
                <div></div>
                <div className="upload_manifest_data_label_header">Данные отправителя:</div>
                <div></div>
                <div className="upload_manifest_data_label_header">Данные получателя:</div>
                <div></div>
                <div className="upload_manifest_data_label_header">Состояние загрузки:</div>
              </div>

              {this.props.store.upload_manifest.disp_data.map((el, index) => {

                let RowClassName = 'upload_manifest_disp_data_body'
                if (el.Comment === 'Консолидация') {
                  RowClassName = 'upload_manifest_disp_data_body consolidate_row'
                }

                return (<div className={RowClassName} key={index}>
                  <div className="upload_manifest_cargo_data upload_manifest_disp_data_body_item">
                    <div className="upload_manifest_data_label">Номер накладной:</div>
                    <div className="upload_manifest_data_el">{el.Num}</div>
                    <div className="upload_manifest_data_label">Итого мест:</div>
                    <div className="upload_manifest_data_el"><input value={el.Total} onChange={(e) => { this.props.set_upload_manifest_disp_data_total(el.Key, e.target.value) }}></input></div>
                    <div className="upload_manifest_data_label">Фактический вес:</div>
                    <div className="upload_manifest_data_el"><input value={el.Weight} onChange={(e) => { this.props.set_upload_manifest_disp_data_weight(el.Key, e.target.value) }}></input></div>
                    <div className="upload_manifest_data_label">Объемный вес:</div>
                    <div className="upload_manifest_data_el"><input value={el.Volume} onChange={(e) => { this.props.set_upload_manifest_disp_data_volume(el.Key, e.target.value) }}></input></div>
                    <div className="upload_manifest_data_label">Страховая стоимость:</div>
                    <div className="upload_manifest_data_el">{el.InsureValue}</div>
                    <div className="upload_manifest_data_label">Налож. платеж:</div>
                    <div className="upload_manifest_data_el">{el.COD}</div>
                  </div>
                  <div></div>
                  <div className="upload_manifest_rec_send_data upload_manifest_disp_data_body_item">
                    <div className="upload_manifest_data_label">Город:</div>
                    <div className="upload_manifest_data_el">{el.SendCity}</div>
                    <div className="upload_manifest_data_label">Адрес:</div>
                    <div className="upload_manifest_data_el">{el.SendAdress}</div>
                    <div className="upload_manifest_data_label">Компания:</div>
                    <div className="upload_manifest_data_el">{el.SendCompany}</div>
                    <div className="upload_manifest_data_label">Конт.лицо:</div>
                    <div className="upload_manifest_data_el">{el.SendPerson}</div>
                    <div className="upload_manifest_data_label">Телефон:</div>
                    <div className="upload_manifest_data_el">{el.SendPhone}</div>
                    <div className="upload_manifest_data_label">Доп.инфо:</div>
                    <div className="upload_manifest_data_el">{el.SendAddInfo}</div>
                  </div>
                  <div></div>
                  <div className="upload_manifest_rec_send_data upload_manifest_disp_data_body_item">
                    <div className="upload_manifest_data_label">Город:</div>
                    <div className="upload_manifest_data_el">{el.RecCity}</div>
                    <div className="upload_manifest_data_label">Адрес:</div>
                    <div className="upload_manifest_data_el">{el.RecAdress}</div>
                    <div className="upload_manifest_data_label">Компания:</div>
                    <div className="upload_manifest_data_el">{el.RecCompany}</div>
                    <div className="upload_manifest_data_label">Конт.лицо:</div>
                    <div className="upload_manifest_data_el">{el.RecPerson}</div>
                    <div className="upload_manifest_data_label">Телефон:</div>
                    <div className="upload_manifest_data_el">{el.RecPhone}</div>
                    <div className="upload_manifest_data_label">Доп.инфо:</div>
                    <div className="upload_manifest_data_el">{el.RecAddInfo}</div>
                  </div>
                  <div></div>
                  <div className='upload_manifest_disp_data_body_item'>
                    <div className="upload_manifest_data_el">Статус: {el.Status}</div>
                    {el.Comment === "" ? (null) : (
                      <div className="upload_manifest_data_el">{el.Comment}</div>
                    )}


                    {el.Status === 'Загружено' ? (<ReactToPrint
                      trigger={() => <div className='upload_manifest_button_container'><Button size='mini'><Icon name='print'></Icon> Печать</Button></div>}
                      content={() => this.componentRef[el.Key]}
                    />) : (<Button size='mini' onClick={() => this.props.upload_manifest_remove_disp(el.Key)}><Icon name='remove'></Icon> Удалить</Button>)}

                    {el.Status === 'Загружено' ? (<div style={{ display: "none" }} >
                      <ComponentToPrint disp={[el.print_data]} ref={cur_el => (this.componentRef[el.Key] = cur_el)} />
                    </div>) : (null)}

                    {el.Status === 'Загружено' ? (<ReactToPrint
                      trigger={() => <div className='upload_manifest_button_container'><Button size='mini'><Icon name='print'></Icon> Печать наклеек</Button></div>}
                      content={() => this.stickerRef[el.Key]}
                    />) : (null)}

                    {el.Status === 'Загружено' ? (<div style={{ display: "none" }} >
                      <StickerToPrint disp={[el.print_data]} ref={cur_el => (this.stickerRef[el.Key] = cur_el)} />
                    </div>) : (null)}

                  </div>
                </div>)
              }

              )}
            </div>
          ) : (null)}

        </div>


      </div>

    );
  }
};

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    set_text_area: (param) => { dispatch({ type: 'set_text_area', payload: param }) },
    set_data_upload_manifest: () => { dispatch({ type: 'set_data_upload_manifest' }) },
    set_default_template: (param) => { dispatch({ type: 'set_default_template', payload: param }) },
    set_import_template: (param) => { dispatch({ type: 'set_import_template', payload: param }) },
    set_disp_data: (param) => { dispatch({ type: 'set_disp_data', payload: param }) },
    reset_disp_data: () => { dispatch({ type: 'reset_disp_data' }) },
    set_disp_status: (param) => { dispatch({ type: 'set_disp_status', payload: param }) },
    set_upload_in_one: (param) => { dispatch({ type: 'set_upload_in_one', payload: param }) },
    set_upload_manifest_open_modal_dt: (param) => { dispatch({ type: 'set_upload_manifest_open_modal_dt', payload: param }) },
    upload_manifest_check_template_checkbox: (param) => { dispatch({ type: 'upload_manifest_check_template_checkbox', payload: param }) },
    upload_manifest_check_checkbox: (param) => { dispatch({ type: 'upload_manifest_check_checkbox', payload: param }) },
    set_consolidate_checkbox_index: (param) => { dispatch({ type: 'set_consolidate_checkbox_index', payload: param }) },
    upload_manifest_reset_template_checkbox: () => { dispatch({ type: 'upload_manifest_reset_template_checkbox' }) },
    set_upload_manifest_disp_data_total: (key, value) => { dispatch({ type: 'set_upload_manifest_disp_data_total', payload: { key: key, value: value } }) },
    set_upload_manifest_disp_data_weight: (key, value) => { dispatch({ type: 'set_upload_manifest_disp_data_weight', payload: { key: key, value: value } }) },
    set_upload_manifest_disp_data_volume: (key, value) => { dispatch({ type: 'set_upload_manifest_disp_data_volume', payload: { key: key, value: value } }) },
    upload_manifest_remove_disp: (param) => { dispatch({ type: 'upload_manifest_remove_disp', payload: param }) },
    //add_data_upload_manifest: (param) => { dispatch({ type: 'add_data_upload_manifest', payload: param }) },
  })
)(Screen);