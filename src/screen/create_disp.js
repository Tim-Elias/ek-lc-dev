import React from "react";
import { connect } from "react-redux";
import "./create_disp.css";
import { get_data } from "./../common/common_modules";
import Select from "react-select";
import { customStyles } from "./../common/common_style";
import Modal from "../ui-components/modal/modal";

const CargoInfoTypeList = [
  { label: "Указать итогвые значения", value: true },
  { label: "Внести информацию о каждом грузе", value: false },
];

const CargoTypeList = [
  { label: "Сейф-пакет", value: "СейфПакет" },
  { label: "Коробка", value: "Коробка" },
  { label: "Контейнер", value: "Контейнер" },
  { label: "Мешок под пломбой", value: "МешокПодПломбой" },
  { label: "Прочее", value: "Прочее" },
];

class Screen extends React.Component {
  CalcPrice = (total_weight, total_volume) => {
    let weight;
    let volume;

    if (this.props.store.create_disp.CargoInfoType.value) {
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
    };

    get_data("customercalc", create_disp_data).then(
      (result) => {
        let sum = this.props.store.create_disp.Termo ? result * 1.3 : result;
        this.props.SetPrice(
          this.props.store.create_disp.Fragile ? (sum += result * 0.5) : sum,
        );
      },
      (err) => {
        console.log(err);
        this.props.set_last_window("create_disp");
        this.props.set_active_window("");

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      },
    );
  };

  TotalQ = () => {
    return 1;
  };

  AddCargo = () => {
    this.props.AddCargo();
  };

  RemoveCargo = (index) => {
    this.props.RemoveCargo(index);
  };

  SetCargoWeight = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.SetCargoWeight(data);
  };

  SetCargoW = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.SetCargoW(data);
  };

  SetCargoL = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.SetCargoL(data);
  };

  SetCargoH = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.SetCargoH(data);
  };

  SetCargoQ = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.SetCargoQ(data);
  };

  SetCargoComment = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.SetCargoComment(data);
  };

  SetCargoType = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.SetCargoType(data);
  };

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  SelectSendCity = (value) => {
    this.props.SetSelectedSendCity(value);

    const city = value.label;
    this.props.SetSendCity(city);

    get_data("terminallist", {
      city: city,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        this.props.SetSendTerminalList(result);
        if (result.length === 0) {
          this.SetSendTerminal(false);
        }
      },
      (err) => {
        console.log(err);
        this.props.set_last_window("create_disp");
        this.props.set_active_window("");
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      },
    );
  };

  SelectRecCity = (value) => {
    this.props.SetSelectedRecCity(value);

    const city = value.label;
    this.props.SetRecCity(city);

    get_data("terminallist", {
      city: city,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        this.props.SetRecTerminalList(result);
        if (result.length === 0) {
          this.SetRecTerminal(false);
        }
      },
      (err) => {
        console.log(err);
        this.props.set_last_window("create_disp");
        this.props.set_active_window("");

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      },
    );
  };

  SetSendTerminal = (param) => {
    let DelMethod;

    if (this.props.store.create_disp.RecTerminal) {
      if (param) {
        DelMethod = "Склад - Склад";
      } else {
        DelMethod = "Дверь - Склад";
      }
    } else {
      if (param) {
        DelMethod = "Склад - Дверь";
      } else {
        DelMethod = "Дверь - Дверь";
      }
    }

    const data = {
      SendTerminal: param,
      DelMethod: DelMethod,
    };

    this.props.SetSendTerminal(data);
  };

  SetRecTerminal = (param, force) => {
    if (
      this.props.store.create_disp.PayType.value ===
        "БезналичнаяОплатаПолучателем" &&
      force !== true
    ) {
      return false;
    }

    let DelMethod;
    if (param) {
      if (this.props.store.create_disp.SendTerminal) {
        DelMethod = "Склад - Склад";
      } else {
        DelMethod = "Дверь - Склад";
      }
    } else {
      if (this.props.store.create_disp.SendTerminal) {
        DelMethod = "Склад - Дверь";
      } else {
        DelMethod = "Дверь - Дверь";
      }
    }

    const data = {
      RecTerminal: param,
      DelMethod: DelMethod,
    };
    this.props.SetRecTerminal(data);
  };

  dataChecking = () => {
    const currentToday = new Date();
    let mm = currentToday.getMonth() + 1;
    let dd = currentToday.getDate();

    const y = currentToday.getFullYear();

    if (mm < 10) {
      mm = "0" + mm;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }

    const currentDate = y + "-" + mm + "-" + dd;
    const currentHours = currentToday.getUTCHours() + 7;

    this.props.SetCurrentDate(currentDate);
    this.props.SetCurrentTime(currentHours);
    if (this.props.store.create_disp.DispDate < currentDate) {
      this.props.SetDispDate(currentDate);
    } else {
      this.props.SetDispDate(this.props.store.create_disp.DispDate);
    }
    this.sent_disp();
  };

  sent_disp = () => {
    let dateClaim;
    if (
      this.props.store.create_disp.DelMethod === "Дверь - Дверь" ||
      this.props.store.create_disp.DelMethod === "Дверь - Склад"
    ) {
      dateClaim = this.props.store.create_disp.DispDate;
    } else {
      const today = new Date();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();

      const y = today.getFullYear();

      if (mm < 10) {
        mm = "0" + mm;
      }
      if (dd < 10) {
        dd = "0" + dd;
      }

      const dateDisp = y + "-" + mm + "-" + dd;
      dateClaim = dateDisp;
    }
    let SendAddInfo = "";
    if (
      this.props.store.create_disp.Fragile &&
      this.props.store.create_disp.SendAddInfo.toLowerCase().indexOf(
        "хрупкий груз",
        0,
      ) === -1
    ) {
      SendAddInfo = "Хрупкий груз " + this.props.store.create_disp.SendAddInfo;
    } else {
      SendAddInfo = this.props.store.create_disp.SendAddInfo;
    }

    const create_disp_data = {
      userkey: this.props.store.login.userkey,
      Number: this.props.store.create_disp.Number,
      isNew: this.props.store.create_disp.isNew,
      PayType: this.props.store.create_disp.PayType.value,
      DispDate: dateClaim,
      DelType: this.props.store.create_disp.DelType,
      SendCity: this.props.store.create_disp.SendCity,
      SendAdress: this.props.store.create_disp.SendAdress,
      SendCompany: this.props.store.create_disp.SendCompany,
      SendPhone: this.props.store.create_disp.SendPhone,
      SendPerson: this.props.store.create_disp.SendPerson,
      SendAddInfo: SendAddInfo,
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
      RecSelectTerminal: this.props.store.create_disp.RecSelectTerminal.value,
      RecEmailInformer: this.props.store.create_disp.RecEmailInformer,
      Cargo: this.props.store.create_disp.Cargo,
      Total: this.props.store.create_disp.Total,
      Volume: this.props.store.create_disp.Volume,
      Weight: this.props.store.create_disp.Weight,
      InsureValue: this.props.store.create_disp.InsureValue,
      COD: this.props.store.create_disp.COD,
      CargoInfoType: this.props.store.create_disp.CargoInfoType.value,
      Fragile: this.props.store.create_disp.Fragile,
      TMax: this.props.store.create_disp.Termo
        ? +this.props.store.create_disp.TMax
        : 0,
      TMin: this.props.store.create_disp.Termo
        ? +this.props.store.create_disp.TMin
        : 0,
      Customer: this.props.store.create_disp.PayerSelect.value,
    };

    this.props.set_active_window("wait");

    get_data("createcustomerdisp", create_disp_data).then(
      (result) => {
        const data = {
          userkey: this.props.store.login.userkey,
          status: "Накладная",
          num: result.Number,
        };

        get_data("dispatch", data).then(
          (result) => {
            this.props.set_data_disp(result);
            this.props.set_active_window("disp");
            this.props.set_last_window("create_disp");
          },
          (err) => {
            console.log(err);
            this.props.set_last_window("create_disp");
            this.props.set_active_window("");

            this.props.modules.set_modal_show(true);
            this.props.modules.set_modal_header("Ошибка");
            this.props.modules.set_modal_text(err);
          },
        );
      },
      (err) => {
        console.log(err);
        this.props.set_last_window("create_disp");
        this.props.set_active_window("");

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      },
    );
  };

  SelectSendTemplate = (value) => {
    if (value !== null) {
      const city = this.props.store.create_disp.CityList.filter(
        (el) => el.value === value.City,
      )[0];

      this.SelectSendCity(city);
      this.props.SetSendAdress(value.Adress);
      this.props.SetSendAdress(value.Adress);
      this.props.SetSendPhone(value.Phone);
      this.props.SetSendPerson(value.Person);
      this.props.SetSendCompany(value.Company);
      this.props.SetSendAddInfo(value.AddInfo);

      this.SetSendTerminal(value.Terminal);
    }
    this.props.SetOpenModalSendTemplate(false);
  };

  SelectRecTemplate = (value) => {
    if (value !== null && value !== undefined) {
      const city = this.props.store.create_disp.CityList.filter(
        (el) => el.value === value.City,
      )[0];

      this.SelectRecCity(city);
      this.props.SetRecAdress(value.Adress);
      this.props.SetRecAdress(value.Adress);
      this.props.SetRecPhone(value.Phone);
      this.props.SetRecPerson(value.Person);
      this.props.SetRecCompany(value.Company);
      this.props.SetRecAddInfo(value.AddInfo);

      this.SetRecTerminal(value.Terminal, true);
    }
    this.props.SetOpenModalRecTemplate(false);
  };

  OpenSendTemplateModal = () => {
    this.props.SetOpenModalSendTemplate(true);
  };

  OpenRecTemplateModal = () => {
    this.props.SetOpenModalRecTemplate(true);
  };

  SetTotal = (value) => {
    this.props.SetTotal(value);
    if (this.props.store.login.Q_only) {
      const Weight = value * parseInt(this.props.store.login.default_cargo);
      this.props.SetWeight(Weight);
      this.props.SetVolume(Weight);
    }
  };

  PayerSelect = (value) => {
    this.props.SetPayerSelect(value);
    let template = this.props.store.upload_manifest.disp_template_list.filter(
      (e) => e.Key === value.template,
    );

    this.SelectRecTemplate(template[0]);
  };

  PayType = (values) => {
    if (values.value === "БезналичнаяОплатаПолучателем") {
      this.props.SetPayerSelect({});
      this.props.SetSelectedRecCity(null);
      this.props.SetRecCity("");
      this.props.SetRecAdress("");
      this.props.SetRecAdress("");
      this.props.SetRecPhone("");
      this.props.SetRecPerson("");
      this.props.SetRecCompany("");
      this.props.SetRecAddInfo("");
      this.SetRecTerminal(false, true);
      this.props.SetRecTerminalList([]);
    }

    this.props.SetPayType(values);
  };

  componentDidMount() {
    get_data("disptemplatelist", {
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        const today = new Date();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        const y = today.getFullYear();

        if (mm < 10) {
          mm = "0" + mm;
        }
        if (dd < 10) {
          dd = "0" + dd;
        }

        const date = y + "-" + mm + "-" + dd;
        const hours = today.getUTCHours() + 7;

        this.props.set_disp_template_list(result);
        this.props.SetCustomNumber(false);
        this.props.SetAvailableNumber(null);
        this.props.SetCyrillic(false);

        this.props.SetCurrentDate(date);
        this.props.SetCurrentTime(hours);
        this.props.SetDispDate(date);

        this.props.SetDelType({ label: "Стандарт", value: "Стандарт" });
      },
      (err) => {
        console.log(err);
        this.props.set_last_window("create_disp");
        this.props.set_active_window("");

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      },
    );
  }

  checkNumber = () => {
    this.props.SetCustomNumberLoader(true);
    this.props.SetAvailableNumber(true);
    this.props.SetCyrillic(false);

    if (/[а-яА-ЯЁё]/.test(this.props.store.create_disp.Number)) {
      this.props.SetCustomNumberLoader(false);
      this.props.SetCyrillic(true);
    } else {
      this.props.SetCyrillic(false);
      get_data("history", { Number: this.props.store.create_disp.Number }).then(
        () => {
          this.props.SetAvailableNumber(false);
          this.props.SetCustomNumberLoader(false);
        },
        (err) => {
          if (err === "disp not found") {
            this.props.SetAvailableNumber(true);
          } else {
            console.log(err);
            this.props.modules.set_modal_show(true);
            this.props.modules.set_modal_header("Ошибка");
            this.props.modules.set_modal_text(err);
          }
          this.props.SetCustomNumberLoader(false);
        },
      );
    }
  };

  render() {
    const Q_only = this.props.store.login.Q_only;

    let disabled = false;
    let total_weight =
      Math.ceil(
        this.props.store.create_disp.Cargo.reduce(
          (accumulator, Cargo) =>
            accumulator + Math.ceil(Cargo.Weight * Cargo.Q * 1000) / 1000,
          0,
        ) * 1000,
      ) / 1000;
    let total_volume =
      Math.ceil(
        this.props.store.create_disp.Cargo.reduce(
          (accumulator, Cargo) =>
            accumulator +
            Math.ceil((Cargo.L * Cargo.W * Cargo.H * Cargo.Q) / 5) / 1000,
          0,
        ) * 1000,
      ) / 1000;

    if (
      this.props.store.create_disp.SelectedSendCity === null ||
      this.props.store.create_disp.SelectedRecCity === null ||
      (this.props.store.create_disp.Total === 0 &&
        this.props.store.create_disp.CargoInfoType.value) ||
      (this.props.store.create_disp.Weight === 0 &&
        this.props.store.create_disp.CargoInfoType.value) ||
      (total_weight === 0 &&
        !this.props.store.create_disp.CargoInfoType.value) ||
      (this.props.store.create_disp.customNumber === true
        ? this.props.store.create_disp.availableNumber === true
        : true) === false ||
      this.props.store.create_disp.cyrillic === true
    ) {
      disabled = true;
    }

    return (
      <div>
        <div className="disp_Number">
          <button className="margin-right-8" onClick={this.props.modules.back}>
            <i className="ek-arrow-left" />
          </button>
          {this.props.store.create_disp.isNew ? (
            <b>Создание новой накладной</b>
          ) : (
            <b>
              Редактирование накладной {this.props.store.create_disp.Number}
            </b>
          )}
        </div>
        <div className="disp_customer_data">
          <div className="disp_data_label">Заказчик:</div>
          <div className="disp_data_el">{this.props.store.login.alias}</div>
          {this.props.store.create_disp.isNew ? (
            <div className="disp_data_label">Номер накладной:</div>
          ) : null}
          {this.props.store.create_disp.isNew ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                height: "23px",
              }}
            >
              {this.props.store.create_disp.customNumber ? null : (
                <button
                  onClick={() => this.props.SetCustomNumber(true)}
                  style={{
                    height: "22px",
                    fontSize: "12px",
                    padding: "5px 8px",
                  }}
                >
                  Ввести номер
                </button>
              )}
              {this.props.store.create_disp.customNumber ? (
                <div
                  className="disp_data_el"
                  style={{ margin: "0 0 0 5px", width: "200px" }}
                >
                  <input
                    autoFocus
                    className="create_disp_data_input"
                    style={
                      this.props.store.create_disp.availableNumber === true &&
                      this.props.store.create_disp.cyrillic === false
                        ? { backgroundColor: "#e0ffe0" }
                        : this.props.store.create_disp.availableNumber ===
                              false ||
                            this.props.store.create_disp.cyrillic === true
                          ? { backgroundColor: "#ffe0e0" }
                          : { backgroundColor: "#fff" }
                    }
                    value={this.props.store.create_disp.Number}
                    onChange={(e) => this.props.SetNumber(e.target.value)}
                    onBlur={() => this.checkNumber()}
                  />
                </div>
              ) : null}
              {this.props.store.create_disp.customNumberLoader ? (
                <div className="loader_custom"></div>
              ) : null}
              {this.props.store.create_disp.cyrillic === true ? (
                <div style={{ fontSize: "11px", margin: "0 0 0 5px" }}>
                  В номере накладной недопустима кириллица!
                </div>
              ) : null}
              {this.props.store.create_disp.availableNumber === false ? (
                <div style={{ fontSize: "11px", margin: "0 0 0 5px" }}>
                  Накладная с таким номером уже существует!
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="disp_data_label">Вид доставки:</div>
          <div className="disp_data_el">
            {this.props.store.create_disp.DelMethod}
          </div>
          {this.props.store.create_disp.DelMethod === "Дверь - Дверь" ||
          this.props.store.create_disp.DelMethod === "Дверь - Склад" ? (
            <div className="disp_data_label">Дата заявки:</div>
          ) : null}
          {this.props.store.create_disp.DelMethod === "Дверь - Дверь" ||
          this.props.store.create_disp.DelMethod === "Дверь - Склад" ? (
            <div className="disp_data_el">
              <input
                onChange={(e) =>
                  e.target.value < this.props.store.create_disp.currentDate
                    ? null
                    : this.props.SetDispDate(e.target.value)
                }
                value={this.props.store.create_disp.DispDate}
                className="DispDate"
                type="date"
              ></input>
            </div>
          ) : null}
          <div className="disp_data_label">Тип оплаты:</div>
          <div className="disp_data_el ">
            <Select
              options={
                this.props.store.login.customers.length > 0
                  ? [
                      {
                        label: "Безналичная оплата",
                        value: "БезналичнаяОплата",
                      },
                      {
                        label: "Оплата наличными при отправлении",
                        value: "ОплатаНаличнымиПриОтправлении",
                      },
                      {
                        label: "Оплата наличными при получении",
                        value: "ОплатаНаличнымиПриПолучении",
                      },
                      {
                        label: "Оплата получателем по договору",
                        value: "БезналичнаяОплатаПолучателем",
                      },
                    ]
                  : [
                      {
                        label: "Безналичная оплата",
                        value: "БезналичнаяОплата",
                      },
                      {
                        label: "Оплата наличными при отправлении",
                        value: "ОплатаНаличнымиПриОтправлении",
                      },
                      {
                        label: "Оплата наличными при получении",
                        value: "ОплатаНаличнымиПриПолучении",
                      },
                    ]
              }
              styles={customStyles}
              value={this.props.store.create_disp.PayType}
              onChange={(values) => this.PayType(values)}
            />
          </div>
          {this.props.store.create_disp.PayType.value ===
          "БезналичнаяОплатаПолучателем" ? (
            <div className="disp_data_label">Плательщик:</div>
          ) : null}
          {this.props.store.create_disp.PayType.value ===
          "БезналичнаяОплатаПолучателем" ? (
            <div className="disp_data_el">
              <Select
                options={this.props.store.login.customers.map((item) => {
                  return {
                    label: item.customer,
                    value: item.customerKey,
                    template: item.template,
                  };
                })}
                styles={customStyles}
                value={this.props.store.create_disp.PayerSelect}
                onChange={(value) => this.PayerSelect(value)}
              />
            </div>
          ) : null}

          {this.props.store.login.userkey === "000000187" ||
          this.props.store.login.userkey === "000000198" ||
          this.props.store.login.userkey === "000000035" ? (
            <div className="disp_data_label">Срочность:</div>
          ) : null}

          {this.props.store.login.userkey === "000000187" ||
          this.props.store.login.userkey === "000000198" ||
          this.props.store.login.userkey === "000000035" ? (
            <div className="disp_data_el ">
              <Select
                options={[
                  { label: "Стандарт", value: "Стандарт" },
                  { label: "Экспресс", value: "Экспресс" },
                  { label: "СуперЭкспресс", value: "СуперЭкспресс" },
                ]}
                styles={customStyles}
                value={{
                  label: this.props.store.create_disp.DelType,
                  value: this.props.store.create_disp.DelType,
                }}
                onChange={(value) => this.props.SetDelType(value)}
              />
            </div>
          ) : null}
        </div>

        <div className="disp_address_data">
          <div className="create_disp_address_data_header">
            <div></div>
            <div>Данные отправителя</div>
            <div className="create_disp_template_button_container">
              <Modal
                trigger={
                  <button
                    onClick={this.OpenSendTemplateModal.bind(this)}
                    className="create_disp_template_button"
                  >
                    Из шаблона
                  </button>
                }
                open={this.props.store.create_disp.OpenModalSendTemplate}
                onClose={this.SelectSendTemplate.bind(this, null)}
                header="Заполнить отправителя из шаблона"
                height="90%"
                width="90%"
              >
                <div className="disp_data_el">
                  <input
                    className="create_disp_data_input"
                    onChange={(e) =>
                      this.props.SetFilterModalSendTemplate(e.target.value)
                    }
                    value={this.props.store.create_disp.FilterModalSendTemplate}
                    type="text"
                    placeholder="Поиск по наименованию"
                  />
                </div>

                <div className="table-wrapper">
                  <table className="bordered">
                    <thead className="create_disp_template_list_th">
                      <tr>
                        <th>Имя</th>
                        <th>Город</th>
                        <th>Адрес</th>
                        <th>Телефон</th>
                        <th>Конт. лицо</th>
                        <th>Компания</th>
                        <th>Доп. инфо</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.store.upload_manifest.disp_template_list
                        .filter(
                          (el) =>
                            this.props.store.create_disp
                              .FilterModalSendTemplate === "" ||
                            el.label.indexOf(
                              this.props.store.create_disp
                                .FilterModalSendTemplate,
                            ) !== -1,
                        )
                        .map((el, index) => (
                          <tr
                            className="create_disp_template_list_tr"
                            key={index}
                            onClick={this.SelectSendTemplate.bind(this, el)}
                          >
                            <td>{el.label}</td>
                            <td>{el.City}</td>
                            <td>
                              {el.Terminal
                                ? el.CurrentTerminal + " (Cклад)"
                                : el.Adress}
                            </td>
                            <td>{el.Phone}</td>
                            <td>{el.Person}</td>
                            <td>{el.Company}</td>
                            <td>{el.AddInfo}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Modal>
            </div>
          </div>
          <div className="create_disp_address_data_header">
            <div></div>
            <div>Данные получателя</div>
            <div className="create_disp_template_button_container">
              <Modal
                trigger={
                  this.props.store.create_disp.PayType.value !==
                  "БезналичнаяОплатаПолучателем" ? (
                    <button
                      onClick={this.OpenRecTemplateModal.bind(this)}
                      className="create_disp_template_button"
                    >
                      Из шаблона
                    </button>
                  ) : null
                }
                open={this.props.store.create_disp.OpenModalRecTemplate}
                onClose={this.SelectRecTemplate.bind(this, null)}
                header="Заполнить получателя из шаблона"
                height="90%"
                width="90%"
              >
                <div className="disp_data_el">
                  <input
                    className="create_disp_data_input"
                    onChange={(e) =>
                      this.props.SetFilterModalRecTemplate(e.target.value)
                    }
                    value={this.props.store.create_disp.FilterModalRecTemplate}
                    type="text"
                    placeholder="Поиск по наименованию"
                  />
                </div>
                <div className="table-wrapper">
                  <table className="bordered">
                    <thead className="create_disp_template_list_th">
                      <tr>
                        <th>Имя</th>
                        <th>Город</th>
                        <th>Адрес</th>
                        <th>Телефон</th>
                        <th>Конт. лицо</th>
                        <th>Компания</th>
                        <th>Доп. инфо</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.store.upload_manifest.disp_template_list
                        .filter(
                          (el) =>
                            this.props.store.create_disp
                              .FilterModalRecTemplate === "" ||
                            el.label.indexOf(
                              this.props.store.create_disp
                                .FilterModalRecTemplate,
                            ) !== -1,
                        )
                        .map((el, index) => (
                          <tr
                            className="create_disp_template_list_tr"
                            key={index}
                            onClick={this.SelectRecTemplate.bind(this, el)}
                          >
                            <td>{el.label}</td>
                            <td>{el.City}</td>
                            <td>
                              {el.Terminal
                                ? el.CurrentTerminal + " (Cклад)"
                                : el.Adress}
                            </td>
                            <td>{el.Phone}</td>
                            <td>{el.Person}</td>
                            <td>{el.Company}</td>
                            <td>{el.AddInfo}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
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
                placeholder="Город отправителя"
              />
            </div>

            {this.props.store.create_disp.SendTerminalList.length ===
            0 ? null : (
              <div className="disp_data_label">Отправка на складе</div>
            )}
            {this.props.store.create_disp.SendTerminalList.length ===
            0 ? null : (
              <div className="disp_data_radio">
                <input
                  name="send_type"
                  type="radio"
                  onChange={this.SetSendTerminal.bind(this, true)}
                  disabled={
                    this.props.store.create_disp.SendTerminalList.length === 0
                  }
                  checked={this.props.store.create_disp.SendTerminal}
                ></input>
              </div>
            )}
            {this.props.store.create_disp.SendTerminalList.length ===
            0 ? null : (
              <div className="disp_data_label">Забор с адреса</div>
            )}
            {this.props.store.create_disp.SendTerminalList.length ===
            0 ? null : (
              <div className="disp_data_radio">
                <input
                  name="send_type"
                  type="radio"
                  onChange={this.SetSendTerminal.bind(this, false)}
                  checked={!this.props.store.create_disp.SendTerminal}
                ></input>
              </div>
            )}

            {this.props.store.create_disp.SendTerminal ? (
              <div className="disp_data_label"> Терминал:</div>
            ) : (
              <div className="disp_data_label"> Адрес:</div>
            )}

            {this.props.store.create_disp.SendTerminal ? (
              <div className="disp_data_el">
                <Select
                  options={this.props.store.create_disp.SendTerminalList}
                  styles={customStyles}
                  value={this.props.store.create_disp.SendSelectTerminal}
                  onChange={(values) =>
                    this.props.SetSendSelectTerminal(values)
                  }
                />
              </div>
            ) : (
              <div className="disp_data_el">
                <input
                  className="create_disp_data_input"
                  onKeyDown={(e) => this.handleKeyPress(e)}
                  onChange={(e) => this.props.SetSendAdress(e.target.value)}
                  value={this.props.store.create_disp.SendAdress}
                  type="text"
                  placeholder="Адрес отправителя"
                />
              </div>
            )}

            <div className="disp_data_label"> Компания:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.props.SetSendCompany(e.target.value)}
                value={this.props.store.create_disp.SendCompany}
                type="text"
                placeholder="Компания отправителя"
              />
            </div>
            <div className="disp_data_label"> Телефон:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.props.SetSendPhone(e.target.value)}
                value={this.props.store.create_disp.SendPhone}
                type="text"
                placeholder="Телефон отправителя (формат 8-9xx-xxx-xxxx)"
              />
            </div>
            <div className="disp_data_label"> Контактное лицо:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.props.SetSendPerson(e.target.value)}
                value={this.props.store.create_disp.SendPerson}
                type="text"
                placeholder="Контактное лицо отправителя"
              />
            </div>
            <div className="disp_data_label"> Доп. информация:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.props.SetSendAddInfo(e.target.value)}
                value={this.props.store.create_disp.SendAddInfo}
                type="text"
                placeholder="Доп. информация отправителя"
              />
            </div>
          </div>

          <div className="disp_address_data_el">
            <div className="disp_data_label"> Город:</div>
            <div className="disp_data_el">
              {this.props.store.create_disp.PayType.value !==
              "БезналичнаяОплатаПолучателем" ? (
                <Select
                  value={this.props.store.create_disp.SelectedRecCity}
                  options={this.props.store.create_disp.CityList}
                  styles={customStyles}
                  onChange={(values) => {
                    if (
                      this.props.store.create_disp.PayType.value !==
                      "БезналичнаяОплатаПолучателем"
                    ) {
                      this.SelectRecCity(values);
                    }
                  }}
                  placeholder="Город получателя"
                />
              ) : (
                <input
                  className="create_disp_data_input"
                  onKeyDown={(e) => this.handleKeyPress(e)}
                  onChange={(e) => {
                    if (
                      this.props.store.create_disp.PayType.value !==
                      "БезналичнаяОплатаПолучателем"
                    ) {
                      this.props.SelectRecCity(e.target.value);
                    }
                  }}
                  value={this.props.store.create_disp.RecCity}
                  type="text"
                  placeholder="Город получателя"
                />
              )}
            </div>

            {this.props.store.create_disp.RecTerminalList.length ===
            0 ? null : (
              <div className="disp_data_label">Получение на складе</div>
            )}

            {this.props.store.create_disp.RecTerminalList.length ===
            0 ? null : (
              <div className="disp_data_radio">
                <input
                  name="rec_type"
                  type="radio"
                  onChange={this.SetRecTerminal.bind(this, true)}
                  disabled={
                    this.props.store.create_disp.RecTerminalList.length === 0
                  }
                  checked={this.props.store.create_disp.RecTerminal}
                ></input>
              </div>
            )}

            {this.props.store.create_disp.RecTerminalList.length ===
            0 ? null : (
              <div className="disp_data_label">Доставка до адреса</div>
            )}

            {this.props.store.create_disp.RecTerminalList.length ===
            0 ? null : (
              <div className="disp_data_radio">
                <input
                  name="rec_type"
                  type="radio"
                  onChange={this.SetRecTerminal.bind(this, false)}
                  checked={!this.props.store.create_disp.RecTerminal}
                ></input>
              </div>
            )}

            {this.props.store.create_disp.RecTerminal ? (
              <div className="disp_data_label"> Терминал:</div>
            ) : (
              <div className="disp_data_label"> Адрес:</div>
            )}

            {this.props.store.create_disp.RecTerminal ? (
              <div className="disp_data_el">
                <Select
                  disabled={
                    this.props.store.create_disp.PayType.value ===
                    "БезналичнаяОплатаПолучателем"
                  }
                  options={this.props.store.create_disp.RecTerminalList}
                  styles={customStyles}
                  value={this.props.store.create_disp.RecSelectTerminal}
                  onChange={(values) => {
                    if (
                      this.props.store.create_disp.PayType.value !==
                      "БезналичнаяОплатаПолучателем"
                    ) {
                      this.props.SetRecSelectTerminal(values);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="disp_data_el">
                <input
                  className="create_disp_data_input"
                  onKeyDown={(e) => this.handleKeyPress(e)}
                  onChange={(e) => {
                    if (
                      this.props.store.create_disp.PayType.value !==
                      "БезналичнаяОплатаПолучателем"
                    ) {
                      this.props.SetRecAdress(e.target.value);
                    }
                  }}
                  value={this.props.store.create_disp.RecAdress}
                  type="text"
                  placeholder="Адрес получателя"
                />
              </div>
            )}

            <div className="disp_data_label"> Компания:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => {
                  if (
                    this.props.store.create_disp.PayType.value !==
                    "БезналичнаяОплатаПолучателем"
                  ) {
                    this.props.SetRecCompany(e.target.value);
                  }
                }}
                value={this.props.store.create_disp.RecCompany}
                type="text"
                placeholder="Компания получателя"
              />
            </div>
            <div className="disp_data_label"> Телефон:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => {
                  if (
                    this.props.store.create_disp.PayType.value !==
                    "БезналичнаяОплатаПолучателем"
                  ) {
                    this.props.SetRecPhone(e.target.value);
                  }
                }}
                value={this.props.store.create_disp.RecPhone}
                type="text"
                placeholder="Телефон получателя (формат 8-9xx-xxx-xxxx)"
              />
            </div>
            <div className="disp_data_label"> Контактное лицо:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => {
                  if (
                    this.props.store.create_disp.PayType.value !==
                    "БезналичнаяОплатаПолучателем"
                  ) {
                    this.props.SetRecPerson(e.target.value);
                  }
                }}
                value={this.props.store.create_disp.RecPerson}
                type="text"
                placeholder="Контактное лицо получателя"
              />
            </div>
            <div className="disp_data_label"> Доп. информация:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.props.SetRecAddInfo(e.target.value)}
                value={this.props.store.create_disp.RecAddInfo}
                type="text"
                placeholder="Доп. информация получателя"
              />
            </div>
          </div>
        </div>

        <div className="disp_cargo_table">
          <div className="disp_cargo_table_header">Данные о грузах:</div>
          {this.props.store.login.total_only ? (
            <div className="disp_cargo_info">
              <div className="disp_data_label">Метод внесения информации:</div>
              <div className="disp_data_el ">
                <Select
                  options={CargoInfoTypeList}
                  styles={customStyles}
                  value={this.props.store.create_disp.CargoInfoType}
                  onChange={(values) => this.props.SetCargoInfoType(values)}
                />
              </div>
            </div>
          ) : null}
          {!this.props.store.create_disp.CargoInfoType.value ? (
            <div>
              <div className="disp_cargo_table_data">
                <table className="bordered">
                  <thead>
                    <tr>
                      <th>Вес (кг)</th>
                      <th>Длина (см)</th>
                      <th>Ширина (см)</th>
                      <th>Высота (см)</th>
                      <th>Об. вес</th>
                      <th>Количество</th>
                      <th>Итоговый вес</th>
                      <th>Итог. об. вес</th>
                      <th>Тип груза</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.store.create_disp.Cargo.map((Cargo, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            className="create_disp_td_input"
                            onKeyDown={(e) => this.handleKeyPress(e)}
                            onChange={(e) =>
                              this.SetCargoWeight(e.target.value, index)
                            }
                            value={Cargo.Weight}
                            type="number"
                          />
                        </td>
                        <td>
                          <input
                            className="create_disp_td_input"
                            onKeyDown={(e) => this.handleKeyPress(e)}
                            onChange={(e) =>
                              this.SetCargoL(e.target.value, index)
                            }
                            value={Cargo.L}
                            type="number"
                          />
                        </td>
                        <td>
                          <input
                            className="create_disp_td_input"
                            onKeyDown={(e) => this.handleKeyPress(e)}
                            onChange={(e) =>
                              this.SetCargoW(e.target.value, index)
                            }
                            value={Cargo.W}
                            type="number"
                          />
                        </td>
                        <td>
                          <input
                            className="create_disp_td_input"
                            onKeyDown={(e) => this.handleKeyPress(e)}
                            onChange={(e) =>
                              this.SetCargoH(e.target.value, index)
                            }
                            value={Cargo.H}
                            type="number"
                          />
                        </td>
                        <td>
                          {Math.ceil((Cargo.L * Cargo.W * Cargo.H) / 5) / 1000}
                        </td>
                        <td>
                          <input
                            className="create_disp_td_input"
                            onKeyDown={(e) => this.handleKeyPress(e)}
                            onChange={(e) =>
                              this.SetCargoQ(e.target.value, index)
                            }
                            value={Cargo.Q}
                            type="number"
                          />
                        </td>
                        <td>
                          {Math.ceil(Cargo.Weight * Cargo.Q * 1000) / 1000}
                        </td>
                        <td>
                          {Math.ceil(
                            (Cargo.L * Cargo.W * Cargo.H * Cargo.Q) / 5,
                          ) / 1000}
                        </td>
                        <td>
                          <Select
                            options={CargoTypeList}
                            styles={customStyles}
                            value={Cargo.Type}
                            onChange={(values) =>
                              this.SetCargoType(values, index)
                            }
                          />
                        </td>
                        {this.props.store.create_disp.Cargo.length ===
                        1 ? null : (
                          <td>
                            {" "}
                            <button
                              onClick={this.RemoveCargo.bind(this, index)}
                              className="IconButton"
                            >
                              <i className="ek-bin" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={this.AddCargo.bind(this)}>Добавить место</button>

              <div className="disp_cargo_data_fragile">
                <div className="disp_data_label">Хрупкий груз:</div>
                <input
                  type="checkbox"
                  className="input-checkbox"
                  onChange={() =>
                    this.props.SetFragile(!this.props.store.create_disp.Fragile)
                  }
                  checked={this.props.store.create_disp.Fragile}
                />
                {this.props.store.login.probably_termo
                  ? [
                      <div key={1} className="disp_data_label">
                        Терморежим:
                      </div>,
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        key={2}
                        onChange={() =>
                          this.props.SetTermo(
                            !this.props.store.create_disp.Termo,
                          )
                        }
                        checked={this.props.store.create_disp.Termo}
                      />,
                    ]
                  : null}

                {this.props.store.create_disp.Termo
                  ? [
                      <div key={1} className="disp_data_label">
                        Терморежим минимум:
                      </div>,
                      <div key={2} className="disp_data_el">
                        <input
                          className="create_disp_data_input"
                          onChange={(e) => this.props.SetTMin(e.target.value)}
                          value={this.props.store.create_disp.TMin}
                          type="number"
                        />
                      </div>,
                      <div key={3} className="disp_data_label">
                        Терморежим максимум:
                      </div>,
                      <div key={4} className="disp_data_el">
                        <input
                          className="create_disp_data_input"
                          onChange={(e) => this.props.SetTMax(e.target.value)}
                          value={this.props.store.create_disp.TMax}
                          type="number"
                        />
                      </div>,
                    ]
                  : null}
              </div>

              <div className="disp_cargo_data">
                <div className="disp_data_label">Общее количество мест:</div>
                <div className="disp_data_el">
                  {this.props.store.create_disp.Cargo.reduce(
                    (accumulator, Cargo) => accumulator + Number(Cargo.Q),
                    0,
                  )}
                </div>
                <div className="disp_data_label">
                  Общий фактический вес (кг):
                </div>
                <div className="disp_data_el">{total_weight}</div>
                <div className="disp_data_label">Общий объемный вес (кг):</div>
                <div className="disp_data_el">{total_volume}</div>
              </div>
            </div>
          ) : (
            [
              <div key={1} className="disp_cargo_data_fragile">
                <div className="disp_data_label">Хрупкий груз:</div>
                <input
                  type="checkbox"
                  className="input-checkbox"
                  onChange={() =>
                    this.props.SetFragile(!this.props.store.create_disp.Fragile)
                  }
                  checked={this.props.store.create_disp.Fragile}
                />
                {this.props.store.login.probably_termo
                  ? [
                      <div key={1} className="disp_data_label">
                        Терморежим:
                      </div>,
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        key={2}
                        onChange={() =>
                          this.props.SetTermo(
                            !this.props.store.create_disp.Termo,
                          )
                        }
                        checked={this.props.store.create_disp.Termo}
                      />,
                    ]
                  : null}

                {this.props.store.create_disp.Termo
                  ? [
                      <div key={1} className="disp_data_label">
                        Терморежим минимум:
                      </div>,
                      <div key={2} className="disp_data_el">
                        <input
                          className="create_disp_data_input"
                          onChange={(e) => this.props.SetTMin(e.target.value)}
                          value={this.props.store.create_disp.TMin}
                          type="number"
                        />
                      </div>,
                      <div key={3} className="disp_data_label">
                        Терморежим максимум:
                      </div>,
                      <div key={4} className="disp_data_el">
                        <input
                          className="create_disp_data_input"
                          onChange={(e) => this.props.SetTMax(e.target.value)}
                          value={this.props.store.create_disp.TMax}
                          type="number"
                        />
                      </div>,
                    ]
                  : null}
              </div>,

              <div key={2} className="disp_cargo_data">
                <div className="disp_data_label">Общее количество мест:</div>
                <div className="disp_data_el">
                  <input
                    className="create_disp_data_input"
                    onKeyDown={(e) => this.handleKeyPress(e)}
                    onChange={(e) => this.SetTotal(e.target.value)}
                    value={this.props.store.create_disp.Total}
                    type="number"
                    placeholder="Общее количество мест"
                  />
                </div>
                <div className="disp_data_label">
                  Общий фактический вес (кг):
                </div>
                <div className="disp_data_el">
                  <input
                    readOnly={Q_only}
                    className="create_disp_data_input"
                    onKeyDown={(e) => this.handleKeyPress(e)}
                    onChange={(e) => this.props.SetWeight(e.target.value)}
                    value={this.props.store.create_disp.Weight}
                    type="number"
                    placeholder="Итоговый фактический вес"
                  />
                </div>
                <div className="disp_data_label">Общий объемный вес (кг):</div>
                <div className="disp_data_el">
                  <input
                    readOnly={Q_only}
                    className="create_disp_data_input"
                    onKeyDown={(e) => this.handleKeyPress(e)}
                    onChange={(e) => this.props.SetVolume(e.target.value)}
                    value={this.props.store.create_disp.Volume}
                    type="number"
                    placeholder="Итоговый объемный вес"
                  />
                </div>
              </div>,
            ]
          )}

          {Q_only ? null : (
            <div className="disp_cargo_data">
              <div className="disp_data_label">Страховая стоимость (руб.):</div>
              <div className="disp_data_el">
                <input
                  className="create_disp_data_input"
                  onKeyDown={(e) => this.handleKeyPress(e)}
                  onChange={(e) => this.props.SetInsureValue(e.target.value)}
                  value={this.props.store.create_disp.InsureValue}
                  type="number"
                />
              </div>
              <div className="disp_data_label">Наложенный платеж (руб.):</div>
              <div className="disp_data_el">
                <input
                  className="create_disp_data_input"
                  onKeyDown={(e) => this.handleKeyPress(e)}
                  onChange={(e) => this.props.SetCOD(e.target.value)}
                  value={this.props.store.create_disp.COD}
                  type="number"
                />
              </div>
              <div className="disp_data_label">
                Расчетная стоимость перевозки:
              </div>
              <div className="disp_data_el">
                <input
                  className="create_disp_data_input"
                  readOnly
                  value={this.props.store.create_disp.Price}
                />
              </div>
            </div>
          )}

          <div className="disp_cargo_table_data">
            <button
              onClick={this.CalcPrice.bind(this, total_weight, total_volume)}
            >
              Рассчитать стоимость
            </button>
          </div>

          {this.props.store.create_disp.isNew ? (
            <button disabled={disabled} onClick={this.dataChecking.bind(this)}>
              Создать накладную
            </button>
          ) : (
            <button disabled={disabled} onClick={this.dataChecking.bind(this)}>
              Сохранить изменения
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    SetCyrillic: (param) => {
      dispatch({ type: "SetCyrillic", payload: param });
    },

    SetDelType: (param) => {
      dispatch({ type: "SetDelType", payload: param });
    },

    SetWarningAlert: (param) => {
      dispatch({ type: "SetWarningAlert", payload: param });
    },
    SetWarningMessage: (param) => {
      dispatch({ type: "SetWarningMessage", payload: param });
    },

    SetPayerSelect: (param) => {
      dispatch({ type: "SetPayerSelect", payload: param });
    },

    SetPrice: (param) => {
      dispatch({ type: "SetPrice", payload: param });
    },

    SetNumber: (param) => {
      dispatch({ type: "SetNumber", payload: param });
    },
    SetCustomNumber: (param) => {
      dispatch({ type: "SetCustomNumber", payload: param });
    },
    SetAvailableNumber: (param) => {
      dispatch({ type: "SetAvailableNumber", payload: param });
    },
    SetCustomNumberLoader: (param) => {
      dispatch({ type: "SetCustomNumberLoader", payload: param });
    },

    SetSendCity: (param) => {
      dispatch({ type: "SetSendCity", payload: param });
    },
    SetSendTerminal: (param) => {
      dispatch({ type: "SetSendTerminal", payload: param });
    },
    SetSendAdress: (param) => {
      dispatch({ type: "SetSendAdress", payload: param });
    },

    SetSendCompany: (param) => {
      dispatch({ type: "SetSendCompany", payload: param });
    },
    SetSendPhone: (param) => {
      dispatch({ type: "SetSendPhone", payload: param });
    },
    SetSendPerson: (param) => {
      dispatch({ type: "SetSendPerson", payload: param });
    },
    SetSendAddInfo: (param) => {
      dispatch({ type: "SetSendAddInfo", payload: param });
    },

    SetSendSelectTerminal: (param) => {
      dispatch({ type: "SetSendSelectTerminal", payload: param });
    },
    SetSendTerminalList: (param) => {
      dispatch({ type: "SetSendTerminalList", payload: param });
    },

    SetRecCity: (param) => {
      dispatch({ type: "SetRecCity", payload: param });
    },
    SetRecTerminal: (param) => {
      dispatch({ type: "SetRecTerminal", payload: param });
    },
    SetRecAdress: (param) => {
      dispatch({ type: "SetRecAdress", payload: param });
    },

    SetRecCompany: (param) => {
      dispatch({ type: "SetRecCompany", payload: param });
    },
    SetRecPhone: (param) => {
      dispatch({ type: "SetRecPhone", payload: param });
    },
    SetRecPerson: (param) => {
      dispatch({ type: "SetRecPerson", payload: param });
    },
    SetRecAddInfo: (param) => {
      dispatch({ type: "SetRecAddInfo", payload: param });
    },

    SetRecSelectTerminal: (param) => {
      dispatch({ type: "SetRecSelectTerminal", payload: param });
    },
    SetRecTerminalList: (param) => {
      dispatch({ type: "SetRecTerminalList", payload: param });
    },

    SetPayType: (param) => {
      dispatch({ type: "SetPayType", payload: param });
    },

    RemoveCargo: (param) => {
      dispatch({ type: "RemoveCargo", payload: param });
    },

    AddCargo: () => {
      dispatch({ type: "AddCargo" });
    },

    SetCargoWeight: (param) => {
      dispatch({ type: "SetCargoWeight", payload: param });
    },
    SetCargoW: (param) => {
      dispatch({ type: "SetCargoW", payload: param });
    },
    SetCargoL: (param) => {
      dispatch({ type: "SetCargoL", payload: param });
    },
    SetCargoH: (param) => {
      dispatch({ type: "SetCargoH", payload: param });
    },
    SetCargoQ: (param) => {
      dispatch({ type: "SetCargoQ", payload: param });
    },
    SetCargoType: (param) => {
      dispatch({ type: "SetCargoType", payload: param });
    },
    SetCargoInfoType: (param) => {
      dispatch({ type: "SetCargoInfoType", payload: param });
    },
    SetCargoComment: (param) => {
      dispatch({ type: "SetCargoComment", payload: param });
    },
    SetTotal: (param) => {
      dispatch({ type: "SetTotal", payload: param });
    },
    SetWeight: (param) => {
      dispatch({ type: "SetWeight", payload: param });
    },
    SetVolume: (param) => {
      dispatch({ type: "SetVolume", payload: param });
    },

    SetSelectedSendCity: (param) => {
      dispatch({ type: "SetSelectedSendCity", payload: param });
    },
    SetSelectedRecCity: (param) => {
      dispatch({ type: "SetSelectedRecCity", payload: param });
    },

    set_active_window: (param) => {
      dispatch({ type: "set_active_window", payload: param });
    },
    set_data_disp: (param) => {
      dispatch({ type: "set_data_disp", payload: param });
    },
    set_last_window: (param) => {
      dispatch({ type: "set_last_window", payload: param });
    },

    SetOpenModalSendTemplate: (param) => {
      dispatch({ type: "SetOpenModalSendTemplate", payload: param });
    },
    SetOpenModalRecTemplate: (param) => {
      dispatch({ type: "SetOpenModalRecTemplate", payload: param });
    },

    SetFilterModalSendTemplate: (param) => {
      dispatch({ type: "SetFilterModalSendTemplate", payload: param });
    },
    SetFilterModalRecTemplate: (param) => {
      dispatch({ type: "SetFilterModalRecTemplate", payload: param });
    },

    SetDispDate: (param) => {
      dispatch({ type: "SetDispDate", payload: param });
    },

    SetCOD: (param) => {
      dispatch({ type: "SetCOD", payload: param });
    },
    SetInsureValue: (param) => {
      dispatch({ type: "SetInsureValue", payload: param });
    },

    set_disp_template_list: (param) => {
      dispatch({ type: "set_disp_template_list", payload: param });
    },
    SetFragile: (param) => {
      dispatch({ type: "SetFragile", payload: param });
    },
    SetTMax: (param) => {
      dispatch({ type: "SetTMax", payload: param });
    },
    SetTMin: (param) => {
      dispatch({ type: "SetTMin", payload: param });
    },
    SetTermo: (param) => {
      dispatch({ type: "SetTermo", payload: param });
    },

    SetCurrentDate: (param) => {
      dispatch({ type: "SetCurrentDate", payload: param });
    },
    SetCurrentTime: (param) => {
      dispatch({ type: "SetCurrentTime", payload: param });
    },
    SetTimeError: (param) => {
      dispatch({ type: "SetTimeError", payload: param });
    },
  }),
)(Screen);
