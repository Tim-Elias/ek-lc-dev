import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

export const CreateDisp = ({ modules }) => {
  const dispatch = useDispatch();

  const create_disp = useSelector((state) => state.create_disp);
  const login = useSelector((state) => state.login);
  console.log(login);

  const disp_template_list = useSelector(
    (state) => state.upload_manifest.disp_template_list,
  );

  const SetCyrillic = (param) => {
    dispatch({ type: "SetCyrillic", payload: param });
  };

  const SetDelType = (param) => {
    dispatch({ type: "SetDelType", payload: param });
  };

  const SetPayerSelect = (param) => {
    dispatch({ type: "SetPayerSelect", payload: param });
  };

  const SetPrice = (param) => {
    dispatch({ type: "SetPrice", payload: param });
  };

  const SetNumber = (param) => {
    dispatch({ type: "SetNumber", payload: param });
  };
  const SetCustomNumber = (param) => {
    dispatch({ type: "SetCustomNumber", payload: param });
  };
  const SetAvailableNumber = (param) => {
    dispatch({ type: "SetAvailableNumber", payload: param });
  };
  const SetCustomNumberLoader = (param) => {
    dispatch({ type: "SetCustomNumberLoader", payload: param });
  };

  const SetSendCity = (param) => {
    dispatch({ type: "SetSendCity", payload: param });
  };
  const SetSendTerminal = (param) => {
    dispatch({ type: "SetSendTerminal", payload: param });
  };
  const SetSendAdress = (param) => {
    dispatch({ type: "SetSendAdress", payload: param });
  };

  const SetSendCompany = (param) => {
    dispatch({ type: "SetSendCompany", payload: param });
  };
  const SetSendPhone = (param) => {
    dispatch({ type: "SetSendPhone", payload: param });
  };
  const SetSendPerson = (param) => {
    dispatch({ type: "SetSendPerson", payload: param });
  };
  const SetSendAddInfo = (param) => {
    dispatch({ type: "SetSendAddInfo", payload: param });
  };

  const SetSendSelectTerminal = (param) => {
    dispatch({ type: "SetSendSelectTerminal", payload: param });
  };
  const SetSendTerminalList = (param) => {
    dispatch({ type: "SetSendTerminalList", payload: param });
  };

  const SetRecCity = (param) => {
    dispatch({ type: "SetRecCity", payload: param });
  };
  const SetRecTerminal = (param) => {
    dispatch({ type: "SetRecTerminal", payload: param });
  };
  const SetRecAdress = (param) => {
    dispatch({ type: "SetRecAdress", payload: param });
  };

  const SetRecCompany = (param) => {
    dispatch({ type: "SetRecCompany", payload: param });
  };
  const SetRecPhone = (param) => {
    dispatch({ type: "SetRecPhone", payload: param });
  };
  const SetRecPerson = (param) => {
    dispatch({ type: "SetRecPerson", payload: param });
  };
  const SetRecAddInfo = (param) => {
    dispatch({ type: "SetRecAddInfo", payload: param });
  };

  const SetRecSelectTerminal = (param) => {
    dispatch({ type: "SetRecSelectTerminal", payload: param });
  };
  const SetRecTerminalList = (param) => {
    dispatch({ type: "SetRecTerminalList", payload: param });
  };

  const SetPayType = (param) => {
    dispatch({ type: "SetPayType", payload: param });
  };

  const RemoveCargo = (param) => {
    dispatch({ type: "RemoveCargo", payload: param });
  };

  const AddCargo = () => {
    dispatch({ type: "AddCargo" });
  };

  const SetCargoWeight = (param) => {
    dispatch({ type: "SetCargoWeight", payload: param });
  };
  const SetCargoW = (param) => {
    dispatch({ type: "SetCargoW", payload: param });
  };
  const SetCargoL = (param) => {
    dispatch({ type: "SetCargoL", payload: param });
  };
  const SetCargoInfoType = (param) => {
    dispatch({ type: "SetCargoInfoType", payload: param });
  };

  const SetTotal = (param) => {
    dispatch({ type: "SetTotal", payload: param });
  };
  const SetWeight = (param) => {
    dispatch({ type: "SetWeight", payload: param });
  };
  const SetVolume = (param) => {
    dispatch({ type: "SetVolume", payload: param });
  };

  const SetSelectedSendCity = (param) => {
    dispatch({ type: "SetSelectedSendCity", payload: param });
  };
  const SetSelectedRecCity = (param) => {
    dispatch({ type: "SetSelectedRecCity", payload: param });
  };

  const set_active_window = (param) => {
    dispatch({ type: "set_active_window", payload: param });
  };
  const set_data_disp = (param) => {
    dispatch({ type: "set_data_disp", payload: param });
  };
  const set_last_window = (param) => {
    dispatch({ type: "set_last_window", payload: param });
  };

  const SetOpenModalSendTemplate = (param) => {
    dispatch({ type: "SetOpenModalSendTemplate", payload: param });
  };
  const SetOpenModalRecTemplate = (param) => {
    dispatch({ type: "SetOpenModalRecTemplate", payload: param });
  };

  const SetFilterModalSendTemplate = (param) => {
    dispatch({ type: "SetFilterModalSendTemplate", payload: param });
  };
  const SetFilterModalRecTemplate = (param) => {
    dispatch({ type: "SetFilterModalRecTemplate", payload: param });
  };

  const SetDispDate = (param) => {
    dispatch({ type: "SetDispDate", payload: param });
  };

  const SetCOD = (param) => {
    dispatch({ type: "SetCOD", payload: param });
  };
  const SetInsureValue = (param) => {
    dispatch({ type: "SetInsureValue", payload: param });
  };

  const set_disp_template_list = (param) => {
    dispatch({ type: "set_disp_template_list", payload: param });
  };
  const SetFragile = (param) => {
    dispatch({ type: "SetFragile", payload: param });
  };
  const SetTMax = (param) => {
    dispatch({ type: "SetTMax", payload: param });
  };
  const SetTMin = (param) => {
    dispatch({ type: "SetTMin", payload: param });
  };
  const SetTermo = (param) => {
    dispatch({ type: "SetTermo", payload: param });
  };

  const SetCurrentDate = (param) => {
    dispatch({ type: "SetCurrentDate", payload: param });
  };
  const SetCurrentTime = (param) => {
    dispatch({ type: "SetCurrentTime", payload: param });
  };

  const CalcPrice = (total_weight, total_volume) => {
    let weight;
    let volume;

    if (create_disp.CargoInfoType?.value) {
      weight = create_disp.Weight;
      volume = create_disp.Volume;
    } else {
      weight = total_weight;
      volume = total_volume;
    }

    const create_disp_data = {
      userkey: login.userkey,
      SendCity: create_disp.SendCity,
      SendTerminal: create_disp.SendTerminal,
      RecCity: create_disp.RecCity,
      RecTerminal: create_disp.RecTerminal,
      Volume: volume,
      Weight: weight,
    };

    get_data("customercalc", create_disp_data).then(
      (result) => {
        let sum = create_disp.Termo ? result * 1.3 : result;
        SetPrice(create_disp.Fragile ? (sum += result * 0.5) : sum);
      },
      (err) => {
        console.log(err);
        set_last_window("create_disp");
        set_active_window("");

        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const SetCargoH = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    dispatch({ type: "SetCargoH", payload: data });
  };

  const SetCargoQ = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    dispatch({ type: "SetCargoQ", payload: data });
  };

  const SetCargoType = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    dispatch({ type: "SetCargoType", payload: data });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  const SelectSendCity = (value) => {
    SetSelectedSendCity(value);

    const city = value.label;
    SetSendCity(city);

    get_data("terminallist", {
      city: city,
      userkey: login.userkey,
    }).then(
      (result) => {
        SetSendTerminalList(result);
        if (result.length === 0) {
          SetSendTerminal(false);
        }
      },
      (err) => {
        console.log(err);
        set_last_window("create_disp");
        set_active_window("");
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const SelectRecCity = (value) => {
    SetSelectedRecCity(value);

    const city = value.label;
    SetRecCity(city);

    get_data("terminallist", {
      city: city,
      userkey: login.userkey,
    }).then(
      (result) => {
        SetRecTerminalList(result);
        if (result.length === 0) {
          SetRecTerminal(false);
        }
      },
      (err) => {
        console.log(err);
        set_last_window("create_disp");
        set_active_window("");

        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const handleSetSendTerminal = (param) => {
    let DelMethod;

    if (create_disp.RecTerminal) {
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

    SetSendTerminal(data);
  };

  const handleSetRecTerminal = (param, force) => {
    if (
      create_disp.PayType?.value === "БезналичнаяОплатаПолучателем" &&
      force !== true
    ) {
      return false;
    }

    let DelMethod;
    if (param) {
      if (create_disp.SendTerminal) {
        DelMethod = "Склад - Склад";
      } else {
        DelMethod = "Дверь - Склад";
      }
    } else {
      if (create_disp.SendTerminal) {
        DelMethod = "Склад - Дверь";
      } else {
        DelMethod = "Дверь - Дверь";
      }
    }

    const data = {
      RecTerminal: param,
      DelMethod: DelMethod,
    };
    SetRecTerminal(data);
  };

  const dataChecking = () => {
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

    SetCurrentDate(currentDate);
    SetCurrentTime(currentHours);
    if (create_disp.DispDate < currentDate) {
      SetDispDate(currentDate);
    } else {
      SetDispDate(create_disp.DispDate);
    }
    sent_disp();
  };

  const sent_disp = () => {
    let dateClaim;
    if (
      create_disp.DelMethod === "Дверь - Дверь" ||
      create_disp.DelMethod === "Дверь - Склад"
    ) {
      dateClaim = create_disp.DispDate;
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
      create_disp.Fragile &&
      create_disp.SendAddInfo.toLowerCase().indexOf("хрупкий груз", 0) === -1
    ) {
      SendAddInfo = "Хрупкий груз " + create_disp.SendAddInfo;
    } else {
      SendAddInfo = create_disp.SendAddInfo;
    }

    const create_disp_data = {
      userkey: login.userkey,
      Number: create_disp.Number,
      isNew: create_disp.isNew,
      PayType: create_disp.PayType?.value,
      DispDate: dateClaim,
      DelType: create_disp.DelType,
      SendCity: create_disp.SendCity,
      SendAdress: create_disp.SendAdress,
      SendCompany: create_disp.SendCompany,
      SendPhone: create_disp.SendPhone,
      SendPerson: create_disp.SendPerson,
      SendAddInfo: SendAddInfo,
      SendEmail: create_disp.SendEmail,
      SendTerminal: create_disp.SendTerminal,
      SendSelectTerminal: create_disp.SendSelectTerminal?.value,
      SendEmailInformer: create_disp.SendEmailInformer,
      RecCity: create_disp.RecCity,
      RecAdress: create_disp.RecAdress,
      RecCompany: create_disp.RecCompany,
      RecPhone: create_disp.RecPhone,
      RecPerson: create_disp.RecPerson,
      RecAddInfo: create_disp.RecAddInfo,
      RecEmail: create_disp.RecEmail,
      RecTerminal: create_disp.RecTerminal,
      RecSelectTerminal: create_disp.RecSelectTerminal?.value,
      RecEmailInformer: create_disp.RecEmailInformer,
      Cargo: create_disp.Cargo,
      Total: create_disp.Total,
      Volume: create_disp.Volume,
      Weight: create_disp.Weight,
      InsureValue: create_disp.InsureValue,
      COD: create_disp.COD,
      CargoInfoType: create_disp.CargoInfoType?.value,
      Fragile: create_disp.Fragile,
      TMax: create_disp.Termo ? +create_disp.TMax : 0,
      TMin: create_disp.Termo ? +create_disp.TMin : 0,
      Customer: create_disp.PayerSelect?.value,
    };

    set_active_window("wait");
    get_data("createcustomerdisp", create_disp_data).then(
      (result) => {
        const data = {
          userkey: login.userkey,
          status: "Накладная",
          num: result.Number,
        };

        get_data("dispatch", data).then(
          (result) => {
            set_data_disp(result);
            set_active_window("disp");
            set_last_window("create_disp");
          },
          (err) => {
            console.log(err);
            set_last_window("create_disp");
            set_active_window("");

            modules.set_modal_show(true);
            modules.set_modal_header("Ошибка");
            modules.set_modal_text(err);
          },
        );
      },
      (err) => {
        console.log(err);
        set_last_window("create_disp");
        set_active_window("");

        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const SelectSendTemplate = (value) => {
    if (value !== null) {
      const city = create_disp.CityList.filter(
        (el) => el?.value === value.City,
      )[0];

      SelectSendCity(city);
      SetSendAdress(value.Adress);
      SetSendAdress(value.Adress);
      SetSendPhone(value.Phone);
      SetSendPerson(value.Person);
      SetSendCompany(value.Company);
      SetSendAddInfo(value.AddInfo);

      handleSetSendTerminal(value.Terminal);
    }
    SetOpenModalSendTemplate(false);
  };

  const SelectRecTemplate = (value) => {
    if (value !== null && value !== undefined) {
      const city = create_disp.CityList.filter(
        (el) => el?.value === value.City,
      )[0];

      SelectRecCity(city);
      SetRecAdress(value.Adress);
      SetRecAdress(value.Adress);
      SetRecPhone(value.Phone);
      SetRecPerson(value.Person);
      SetRecCompany(value.Company);
      SetRecAddInfo(value.AddInfo);

      handleSetRecTerminal(value.Terminal, true);
    }
    SetOpenModalRecTemplate(false);
  };

  const OpenSendTemplateModal = () => {
    SetOpenModalSendTemplate(true);
  };

  const OpenRecTemplateModal = () => {
    SetOpenModalRecTemplate(true);
  };

  const handleSetTotal = (value) => {
    SetTotal(value);
    if (login.Q_only) {
      const Weight = value * parseInt(login.default_cargo);
      SetWeight(Weight);
      SetVolume(Weight);
    }
  };

  const PayerSelect = (value) => {
    SetPayerSelect(value);
    let template = disp_template_list.filter((e) => e.Key === value.template);

    SelectRecTemplate(template[0]);
  };

  const PayType = (values) => {
    if (values?.value === "БезналичнаяОплатаПолучателем") {
      SetPayerSelect({});
      SetSelectedRecCity(null);
      SetRecCity("");
      SetRecAdress("");
      SetRecAdress("");
      SetRecPhone("");
      SetRecPerson("");
      SetRecCompany("");
      SetRecAddInfo("");
      SetRecTerminal(false, true);
      SetRecTerminalList([]);
    }

    SetPayType(values);
  };

  React.useEffect(() => {
    get_data("disptemplatelist", {
      userkey: login.userkey,
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

        set_disp_template_list(result);
        SetCustomNumber(false);
        SetAvailableNumber(null);
        SetCyrillic(false);

        SetCurrentDate(date);
        SetCurrentTime(hours);
        SetDispDate(date);

        SetDelType({ label: "Стандарт", value: "Стандарт" });
      },
      (err) => {
        console.log(err);
        set_last_window("create_disp");
        set_active_window("");

        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
    PayType(PayTypeList[0]);
  }, []);

  const checkNumber = () => {
    SetCustomNumberLoader(true);
    SetAvailableNumber(true);
    SetCyrillic(false);

    if (/[а-яА-ЯЁё]/.test(create_disp.Number)) {
      SetCustomNumberLoader(false);
      SetCyrillic(true);
    } else {
      SetCyrillic(false);
      get_data("history", { Number: create_disp.Number }).then(
        () => {
          SetAvailableNumber(false);
          SetCustomNumberLoader(false);
        },
        (err) => {
          if (err === "disp not found") {
            SetAvailableNumber(true);
          } else {
            console.log(err);
            modules.set_modal_show(true);
            modules.set_modal_header("Ошибка");
            modules.set_modal_text(err);
          }
          SetCustomNumberLoader(false);
        },
      );
    }
  };

  const Q_only = login.Q_only;

  let disabled = false;
  let total_weight =
    Math.ceil(
      create_disp.Cargo.reduce(
        (accumulator, Cargo) =>
          accumulator + Math.ceil(Cargo.Weight * Cargo.Q * 1000) / 1000,
        0,
      ) * 1000,
    ) / 1000;
  let total_volume =
    Math.ceil(
      create_disp.Cargo.reduce(
        (accumulator, Cargo) =>
          accumulator +
          Math.ceil((Cargo.L * Cargo.W * Cargo.H * Cargo.Q) / 5) / 1000,
        0,
      ) * 1000,
    ) / 1000;

  if (
    create_disp.SelectedSendCity === null ||
    create_disp.SelectedRecCity === null ||
    (create_disp.Total === 0 && create_disp.CargoInfoType?.value) ||
    (create_disp.Weight === 0 && create_disp.CargoInfoType?.value) ||
    (total_weight === 0 && !create_disp.CargoInfoType?.value) ||
    (create_disp.customNumber === true
      ? create_disp.availableNumber === true
      : true) === false ||
    create_disp.cyrillic === true
  ) {
    disabled = true;
  }

  const PayTypeList = [
    {
      label: "Оплата наличными при отправлении",
      value: "ОплатаНаличнымиПриОтправлении",
    },
    {
      label: "Оплата наличными при получении",
      value: "ОплатаНаличнымиПриПолучении",
    },
  ];

  if (login.customers.length > 0) {
    PayTypeList.push({
      label: "Оплата получателем по договору",
      value: "БезналичнаяОплатаПолучателем",
    });
  }

  if (!login.cashOnly) {
    PayTypeList.unshift({
      label: "Безналичная оплата",
      value: "БезналичнаяОплата",
    });
  }

  return (
    <div>
      <div className="disp_Number">
        <button className="margin-right-8" onClick={modules.back}>
          <i className="ek-arrow-left" />
        </button>
        {create_disp.isNew ? (
          <b>Создание новой накладной</b>
        ) : (
          <b>Редактирование накладной {create_disp.Number}</b>
        )}
      </div>
      <div className="disp_customer_data">
        <div className="disp_data_label">Заказчик:</div>
        <div className="disp_data_el">{login.alias}</div>
        {create_disp.isNew ? (
          <div className="disp_data_label">Номер накладной:</div>
        ) : null}
        {create_disp.isNew ? (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              height: "23px",
            }}
          >
            {create_disp.customNumber ? null : (
              <button
                onClick={() => SetCustomNumber(true)}
                style={{
                  height: "22px",
                  fontSize: "12px",
                  padding: "5px 8px",
                }}
              >
                Ввести номер
              </button>
            )}
            {create_disp.customNumber ? (
              <div
                className="disp_data_el"
                style={{ margin: "0 0 0 5px", width: "200px" }}
              >
                <input
                  autoFocus
                  className="create_disp_data_input"
                  style={
                    create_disp.availableNumber === true &&
                    create_disp.cyrillic === false
                      ? { backgroundColor: "#e0ffe0" }
                      : create_disp.availableNumber === false ||
                          create_disp.cyrillic === true
                        ? { backgroundColor: "#ffe0e0" }
                        : { backgroundColor: "#fff" }
                  }
                  value={create_disp.Number}
                  onChange={(e) => SetNumber(e.target.value)}
                  onBlur={() => checkNumber()}
                />
              </div>
            ) : null}
            {create_disp.customNumberLoader ? (
              <div className="loader_custom"></div>
            ) : null}
            {create_disp.cyrillic === true ? (
              <div style={{ fontSize: "11px", margin: "0 0 0 5px" }}>
                В номере накладной недопустима кириллица!
              </div>
            ) : null}
            {create_disp.availableNumber === false ? (
              <div style={{ fontSize: "11px", margin: "0 0 0 5px" }}>
                Накладная с таким номером уже существует!
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="disp_data_label">Вид доставки:</div>
        <div className="disp_data_el">{create_disp.DelMethod}</div>
        {create_disp.DelMethod === "Дверь - Дверь" ||
        create_disp.DelMethod === "Дверь - Склад" ? (
          <div className="disp_data_label">Дата заявки:</div>
        ) : null}
        {create_disp.DelMethod === "Дверь - Дверь" ||
        create_disp.DelMethod === "Дверь - Склад" ? (
          <div className="disp_data_el">
            <input
              onChange={(e) =>
                e.target.value < create_disp.currentDate
                  ? null
                  : SetDispDate(e.target.value)
              }
              value={create_disp.DispDate}
              className="DispDate"
              type="date"
            ></input>
          </div>
        ) : null}
        <div className="disp_data_label">Тип оплаты:</div>
        <div className="disp_data_el ">
          <Select
            options={PayTypeList}
            styles={customStyles}
            value={create_disp.PayType}
            onChange={(values) => PayType(values)}
          />
        </div>
        {create_disp.PayType?.value === "БезналичнаяОплатаПолучателем" ? (
          <div className="disp_data_label">Плательщик:</div>
        ) : null}
        {create_disp.PayType?.value === "БезналичнаяОплатаПолучателем" ? (
          <div className="disp_data_el">
            <Select
              options={login.customers.map((item) => {
                return {
                  label: item.customer,
                  value: item.customerKey,
                  template: item.template,
                };
              })}
              styles={customStyles}
              value={create_disp.PayerSelect}
              onChange={(value) => PayerSelect(value)}
            />
          </div>
        ) : null}

        {login.userkey === "000000187" ||
        login.userkey === "000000198" ||
        login.userkey === "000000035" ? (
          <div className="disp_data_label">Срочность:</div>
        ) : null}

        {login.userkey === "000000187" ||
        login.userkey === "000000198" ||
        login.userkey === "000000035" ? (
          <div className="disp_data_el ">
            <Select
              options={[
                { label: "Стандарт", value: "Стандарт" },
                { label: "Экспресс", value: "Экспресс" },
                { label: "СуперЭкспресс", value: "СуперЭкспресс" },
              ]}
              styles={customStyles}
              value={{
                label: create_disp.DelType,
                value: create_disp.DelType,
              }}
              onChange={(value) => SetDelType(value)}
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
                  onClick={() => OpenSendTemplateModal()}
                  className="create_disp_template_button"
                >
                  Из шаблона
                </button>
              }
              open={create_disp.OpenModalSendTemplate}
              onClose={() => SelectSendTemplate(null)}
              header="Заполнить отправителя из шаблона"
              height="90%"
              width="90%"
            >
              <div className="disp_data_el">
                <input
                  className="create_disp_data_input"
                  onChange={(e) => SetFilterModalSendTemplate(e.target.value)}
                  value={create_disp.FilterModalSendTemplate}
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
                    {disp_template_list
                      .filter(
                        (el) =>
                          create_disp.FilterModalSendTemplate === "" ||
                          el.label
                            .toUpperCase()
                            .indexOf(
                              create_disp.FilterModalSendTemplate.toUpperCase(),
                            ) !== -1 ||
                          el.Adress.toUpperCase().indexOf(
                            create_disp.FilterModalSendTemplate.toUpperCase(),
                          ) !== -1 ||
                          el.City.toUpperCase().indexOf(
                            create_disp.FilterModalSendTemplate.toUpperCase(),
                          ) !== -1 ||
                          el.Company.toUpperCase().indexOf(
                            create_disp.FilterModalSendTemplate.toUpperCase(),
                          ) !== -1 ||
                          el.Person.toUpperCase().indexOf(
                            create_disp.FilterModalSendTemplate.toUpperCase(),
                          ) !== -1,
                      )
                      .map((el, index) => (
                        <tr
                          className="create_disp_template_list_tr"
                          key={index}
                          onClick={() => SelectSendTemplate(el)}
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
                create_disp.PayType?.value !==
                "БезналичнаяОплатаПолучателем" ? (
                  <button
                    onClick={() => OpenRecTemplateModal()}
                    className="create_disp_template_button"
                  >
                    Из шаблона
                  </button>
                ) : null
              }
              open={create_disp.OpenModalRecTemplate}
              onClose={() => SelectRecTemplate(null)}
              header="Заполнить получателя из шаблона"
              height="90%"
              width="90%"
            >
              <div className="disp_data_el">
                <input
                  className="create_disp_data_input"
                  onChange={(e) => SetFilterModalRecTemplate(e.target.value)}
                  value={create_disp.FilterModalRecTemplate}
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
                    {disp_template_list
                      .filter(
                        (el) =>
                          create_disp.FilterModalRecTemplate === "" ||
                          el.label.indexOf(
                            create_disp.FilterModalRecTemplate,
                          ) !== -1,
                      )
                      .map((el, index) => (
                        <tr
                          className="create_disp_template_list_tr"
                          key={index}
                          onClick={() => SelectRecTemplate(el)}
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
              value={create_disp.SelectedSendCity}
              options={create_disp.CityList}
              styles={customStyles}
              onChange={(values) => SelectSendCity(values)}
              placeholder="Город отправителя"
            />
          </div>

          {create_disp.SendTerminalList.length === 0 ? null : (
            <div className="disp_data_label">Отправка на складе</div>
          )}
          {create_disp.SendTerminalList.length === 0 ? null : (
            <div className="disp_data_radio">
              <input
                name="send_type"
                type="radio"
                onChange={() => handleSetSendTerminal(true)}
                disabled={create_disp.SendTerminalList.length === 0}
                checked={create_disp.SendTerminal}
              ></input>
            </div>
          )}
          {create_disp.SendTerminalList.length === 0 ? null : (
            <div className="disp_data_label">Забор с адреса</div>
          )}
          {create_disp.SendTerminalList.length === 0 ? null : (
            <div className="disp_data_radio">
              <input
                name="send_type"
                type="radio"
                onChange={() => handleSetSendTerminal(false)}
                checked={!create_disp.SendTerminal}
              ></input>
            </div>
          )}

          {create_disp.SendTerminal ? (
            <div className="disp_data_label"> Терминал:</div>
          ) : (
            <div className="disp_data_label"> Адрес:</div>
          )}

          {create_disp.SendTerminal ? (
            <div className="disp_data_el">
              <Select
                options={create_disp.SendTerminalList}
                styles={customStyles}
                value={create_disp.SendSelectTerminal}
                onChange={(values) => SetSendSelectTerminal(values)}
              />
            </div>
          ) : (
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => SetSendAdress(e.target.value)}
                value={create_disp.SendAdress}
                type="text"
                placeholder="Адрес отправителя"
              />
            </div>
          )}

          <div className="disp_data_label"> Компания:</div>
          <div className="disp_data_el">
            <input
              className="create_disp_data_input"
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => SetSendCompany(e.target.value)}
              value={create_disp.SendCompany}
              type="text"
              placeholder="Компания отправителя"
            />
          </div>
          <div className="disp_data_label"> Телефон:</div>
          <div className="disp_data_el">
            <input
              className="create_disp_data_input"
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => SetSendPhone(e.target.value)}
              value={create_disp.SendPhone}
              type="text"
              placeholder="Телефон отправителя (формат 8-9xx-xxx-xxxx)"
            />
          </div>
          <div className="disp_data_label"> Контактное лицо:</div>
          <div className="disp_data_el">
            <input
              className="create_disp_data_input"
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => SetSendPerson(e.target.value)}
              value={create_disp.SendPerson}
              type="text"
              placeholder="Контактное лицо отправителя"
            />
          </div>
          <div className="disp_data_label"> Доп. информация:</div>
          <div className="disp_data_el">
            <input
              className="create_disp_data_input"
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => SetSendAddInfo(e.target.value)}
              value={create_disp.SendAddInfo}
              type="text"
              placeholder="Доп. информация отправителя"
            />
          </div>
        </div>

        <div className="disp_address_data_el">
          <div className="disp_data_label"> Город:</div>
          <div className="disp_data_el">
            {create_disp.PayType?.value !== "БезналичнаяОплатаПолучателем" ? (
              <Select
                value={create_disp.SelectedRecCity}
                options={create_disp.CityList}
                styles={customStyles}
                onChange={(values) => {
                  if (
                    create_disp.PayType?.value !==
                    "БезналичнаяОплатаПолучателем"
                  ) {
                    SelectRecCity(values);
                  }
                }}
                placeholder="Город получателя"
              />
            ) : (
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => {
                  if (
                    create_disp.PayType?.value !==
                    "БезналичнаяОплатаПолучателем"
                  ) {
                    SelectRecCity(e.target.value);
                  }
                }}
                value={create_disp.RecCity}
                type="text"
                placeholder="Город получателя"
              />
            )}
          </div>

          {create_disp.RecTerminalList.length === 0 ? null : (
            <div className="disp_data_label">Получение на складе</div>
          )}

          {create_disp.RecTerminalList.length === 0 ? null : (
            <div className="disp_data_radio">
              <input
                name="rec_type"
                type="radio"
                onChange={() => handleSetRecTerminal(true)}
                disabled={create_disp.RecTerminalList.length === 0}
                checked={create_disp.RecTerminal}
              ></input>
            </div>
          )}

          {create_disp.RecTerminalList.length === 0 ? null : (
            <div className="disp_data_label">Доставка до адреса</div>
          )}

          {create_disp.RecTerminalList.length === 0 ? null : (
            <div className="disp_data_radio">
              <input
                name="rec_type"
                type="radio"
                onChange={() => handleSetRecTerminal(false)}
                checked={!create_disp.RecTerminal}
              ></input>
            </div>
          )}

          {create_disp.RecTerminal ? (
            <div className="disp_data_label"> Терминал:</div>
          ) : (
            <div className="disp_data_label"> Адрес:</div>
          )}

          {create_disp.RecTerminal ? (
            <div className="disp_data_el">
              <Select
                disabled={
                  create_disp.PayType?.value === "БезналичнаяОплатаПолучателем"
                }
                options={create_disp.RecTerminalList}
                styles={customStyles}
                value={create_disp.RecSelectTerminal}
                onChange={(values) => {
                  if (
                    create_disp.PayType?.value !==
                    "БезналичнаяОплатаПолучателем"
                  ) {
                    SetRecSelectTerminal(values);
                  }
                }}
              />
            </div>
          ) : (
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => {
                  if (
                    create_disp.PayType.value !== "БезналичнаяОплатаПолучателем"
                  ) {
                    SetRecAdress(e.target.value);
                  }
                }}
                value={create_disp.RecAdress}
                type="text"
                placeholder="Адрес получателя"
              />
            </div>
          )}

          <div className="disp_data_label"> Компания:</div>
          <div className="disp_data_el">
            <input
              className="create_disp_data_input"
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => {
                if (
                  create_disp.PayType.value !== "БезналичнаяОплатаПолучателем"
                ) {
                  SetRecCompany(e.target.value);
                }
              }}
              value={create_disp.RecCompany}
              type="text"
              placeholder="Компания получателя"
            />
          </div>
          <div className="disp_data_label"> Телефон:</div>
          <div className="disp_data_el">
            <input
              className="create_disp_data_input"
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => {
                if (
                  create_disp.PayType.value !== "БезналичнаяОплатаПолучателем"
                ) {
                  SetRecPhone(e.target.value);
                }
              }}
              value={create_disp.RecPhone}
              type="text"
              placeholder="Телефон получателя (формат 8-9xx-xxx-xxxx)"
            />
          </div>
          <div className="disp_data_label"> Контактное лицо:</div>
          <div className="disp_data_el">
            <input
              className="create_disp_data_input"
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => {
                if (
                  create_disp.PayType.value !== "БезналичнаяОплатаПолучателем"
                ) {
                  SetRecPerson(e.target.value);
                }
              }}
              value={create_disp.RecPerson}
              type="text"
              placeholder="Контактное лицо получателя"
            />
          </div>
          <div className="disp_data_label"> Доп. информация:</div>
          <div className="disp_data_el">
            <input
              className="create_disp_data_input"
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => SetRecAddInfo(e.target.value)}
              value={create_disp.RecAddInfo}
              type="text"
              placeholder="Доп. информация получателя"
            />
          </div>
        </div>
      </div>

      <div className="disp_cargo_table">
        <div className="disp_cargo_table_header">Данные о грузах:</div>
        {login.total_only ? (
          <div className="disp_cargo_info">
            <div className="disp_data_label">Метод внесения информации:</div>
            <div className="disp_data_el ">
              <Select
                options={CargoInfoTypeList}
                styles={customStyles}
                value={create_disp.CargoInfoType}
                onChange={(values) => SetCargoInfoType(values)}
              />
            </div>
          </div>
        ) : null}
        {!create_disp.CargoInfoType.value ? (
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
                  {create_disp.Cargo.map((Cargo, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="create_disp_td_input"
                          onKeyDown={(e) => handleKeyPress(e)}
                          onChange={(e) =>
                            SetCargoWeight({
                              value: e.target.value,
                              index,
                            })
                          }
                          value={Cargo.Weight}
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          className="create_disp_td_input"
                          onKeyDown={(e) => handleKeyPress(e)}
                          onChange={(e) =>
                            SetCargoL({ value: e.target.value, index })
                          }
                          value={Cargo.L}
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          className="create_disp_td_input"
                          onKeyDown={(e) => handleKeyPress(e)}
                          onChange={(e) =>
                            SetCargoW({ value: e.target.value, index })
                          }
                          value={Cargo.W}
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          className="create_disp_td_input"
                          onKeyDown={(e) => handleKeyPress(e)}
                          onChange={(e) => SetCargoH(e.target.value, index)}
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
                          onKeyDown={(e) => handleKeyPress(e)}
                          onChange={(e) => SetCargoQ(e.target.value, index)}
                          value={Cargo.Q}
                          type="number"
                        />
                      </td>
                      <td>{Math.ceil(Cargo.Weight * Cargo.Q * 1000) / 1000}</td>
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
                          onChange={(values) => SetCargoType(values, index)}
                        />
                      </td>
                      {create_disp.Cargo.length === 1 ? null : (
                        <td>
                          {" "}
                          <button
                            onClick={() => RemoveCargo(index)}
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
            <button onClick={() => AddCargo()}>Добавить место</button>

            <div className="disp_cargo_data_fragile">
              <div className="disp_data_label">Хрупкий груз:</div>
              <input
                type="checkbox"
                className="input-checkbox"
                onChange={() => SetFragile(!create_disp.Fragile)}
                checked={create_disp.Fragile}
              />
              {login.probably_termo
                ? [
                    <div key={1} className="disp_data_label">
                      Терморежим:
                    </div>,
                    <input
                      type="checkbox"
                      className="input-checkbox"
                      key={2}
                      onChange={() => SetTermo(!create_disp.Termo)}
                      checked={create_disp.Termo}
                    />,
                  ]
                : null}

              {create_disp.Termo
                ? [
                    <div key={1} className="disp_data_label">
                      Терморежим минимум:
                    </div>,
                    <div key={2} className="disp_data_el">
                      <input
                        className="create_disp_data_input"
                        onChange={(e) => SetTMin(e.target.value)}
                        value={create_disp.TMin}
                        type="number"
                      />
                    </div>,
                    <div key={3} className="disp_data_label">
                      Терморежим максимум:
                    </div>,
                    <div key={4} className="disp_data_el">
                      <input
                        className="create_disp_data_input"
                        onChange={(e) => SetTMax(e.target.value)}
                        value={create_disp.TMax}
                        type="number"
                      />
                    </div>,
                  ]
                : null}
            </div>

            <div className="disp_cargo_data">
              <div className="disp_data_label">Общее количество мест:</div>
              <div className="disp_data_el">
                {create_disp.Cargo.reduce(
                  (accumulator, Cargo) => accumulator + Number(Cargo.Q),
                  0,
                )}
              </div>
              <div className="disp_data_label">Общий фактический вес (кг):</div>
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
                onChange={() => SetFragile(!create_disp.Fragile)}
                checked={create_disp.Fragile}
              />
              {login.probably_termo
                ? [
                    <div key={1} className="disp_data_label">
                      Терморежим:
                    </div>,
                    <input
                      type="checkbox"
                      className="input-checkbox"
                      key={2}
                      onChange={() => SetTermo(!create_disp.Termo)}
                      checked={create_disp.Termo}
                    />,
                  ]
                : null}

              {create_disp.Termo
                ? [
                    <div key={1} className="disp_data_label">
                      Терморежим минимум:
                    </div>,
                    <div key={2} className="disp_data_el">
                      <input
                        className="create_disp_data_input"
                        onChange={(e) => SetTMin(e.target.value)}
                        value={create_disp.TMin}
                        type="number"
                      />
                    </div>,
                    <div key={3} className="disp_data_label">
                      Терморежим максимум:
                    </div>,
                    <div key={4} className="disp_data_el">
                      <input
                        className="create_disp_data_input"
                        onChange={(e) => SetTMax(e.target.value)}
                        value={create_disp.TMax}
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
                  onKeyDown={(e) => handleKeyPress(e)}
                  onChange={(e) => handleSetTotal(e.target.value)}
                  value={create_disp.Total}
                  type="number"
                  placeholder="Общее количество мест"
                />
              </div>
              <div className="disp_data_label">Общий фактический вес (кг):</div>
              <div className="disp_data_el">
                <input
                  readOnly={Q_only}
                  className="create_disp_data_input"
                  onKeyDown={(e) => handleKeyPress(e)}
                  onChange={(e) => SetWeight(e.target.value)}
                  value={create_disp.Weight}
                  type="number"
                  placeholder="Итоговый фактический вес"
                />
              </div>
              <div className="disp_data_label">Общий объемный вес (кг):</div>
              <div className="disp_data_el">
                <input
                  readOnly={Q_only}
                  className="create_disp_data_input"
                  onKeyDown={(e) => handleKeyPress(e)}
                  onChange={(e) => SetVolume(e.target.value)}
                  value={create_disp.Volume}
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
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => SetInsureValue(e.target.value)}
                value={create_disp.InsureValue}
                type="number"
              />
            </div>
            <div className="disp_data_label">Наложенный платеж (руб.):</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => SetCOD(e.target.value)}
                value={create_disp.COD}
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
                value={create_disp.Price}
              />
            </div>
          </div>
        )}

        <div className="disp_cargo_table_data">
          <button onClick={() => CalcPrice(total_weight, total_volume)}>
            Рассчитать стоимость
          </button>
        </div>

        {create_disp.isNew ? (
          <button disabled={disabled} onClick={() => dataChecking()}>
            Создать накладную
          </button>
        ) : (
          <button disabled={disabled} onClick={() => dataChecking()}>
            Сохранить изменения
          </button>
        )}
      </div>
    </div>
  );
};
