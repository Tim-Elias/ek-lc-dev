import React, { useRef } from "react";
import Select from "react-select";
import { customStyles } from "./../common/common_style";
import { useReactToPrint } from "react-to-print";
import { get_data } from "./../common/common_modules";
import "./upload_manifest.css";
import ComponentToPrint from "./disp_print";
import StickerToPrint from "./sticker_print";
import Modal from "../ui-components/modal/modal.tsx";
import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";
import { Readable } from "stream";
import { useDispatch, useSelector } from "react-redux";

XLSX.set_fs(fs);
XLSX.stream.set_readable(Readable);

const UploadInOneList = [
  { label: "Загрузка каждой накладной", value: false },
  { label: "Загрузка консолидации", value: true },
];

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
  SendPhone: "Основной контактный телефон отправителя",
};

export const UploadManifest = () => {
  const dispatch = useDispatch();
  const all_disp_print = useRef();
  const all_ticket_print = useRef();

  const handleDispPrint = useReactToPrint({
    content: () => all_disp_print.current,
  });

  const handleStickerPrint = useReactToPrint({
    content: () => all_ticket_print.current,
  });

  const set_text_area = (param) => {
    dispatch({ type: "set_text_area", payload: param });
  };
  const set_data_upload_manifest = () => {
    dispatch({ type: "set_data_upload_manifest" });
  };
  const set_default_template = (param) => {
    dispatch({ type: "set_default_template", payload: param });
  };
  const set_import_template = (param) => {
    dispatch({ type: "set_import_template", payload: param });
  };
  const set_disp_data = (param) => {
    dispatch({ type: "set_disp_data", payload: param });
  };
  const reset_disp_data = () => {
    dispatch({ type: "reset_disp_data" });
  };
  const set_disp_status = (param) => {
    dispatch({ type: "set_disp_status", payload: param });
  };
  const set_upload_in_one = (param) => {
    dispatch({ type: "set_upload_in_one", payload: param });
  };
  const set_upload_manifest_open_modal_dt = (param) => {
    dispatch({ type: "set_upload_manifest_open_modal_dt", payload: param });
  };
  const upload_manifest_check_template_checkbox = (param) => {
    dispatch({
      type: "upload_manifest_check_template_checkbox",
      payload: param,
    });
  };
  const upload_manifest_check_checkbox = (param) => {
    dispatch({ type: "upload_manifest_check_checkbox", payload: param });
  };
  const upload_manifest_reset_template_checkbox = () => {
    dispatch({ type: "upload_manifest_reset_template_checkbox" });
  };
  const set_upload_manifest_disp_data_total = (key, value) => {
    dispatch({
      type: "set_upload_manifest_disp_data_total",
      payload: { key: key, value: value },
    });
  };
  const set_upload_manifest_disp_data_weight = (key, value) => {
    dispatch({
      type: "set_upload_manifest_disp_data_weight",
      payload: { key: key, value: value },
    });
  };
  const set_upload_manifest_disp_data_volume = (key, value) => {
    dispatch({
      type: "set_upload_manifest_disp_data_volume",
      payload: { key: key, value: value },
    });
  };
  const upload_manifest_remove_disp = (param) => {
    dispatch({ type: "upload_manifest_remove_disp", payload: param });
  };

  const login = useSelector((state) => state.login);
  const upload_manifest = useSelector((state) => state.upload_manifest);
  const hadleSaveXLSX = () => {
    const workbook = XLSX.utils.book_new();

    const workbookHeader = [
      ["Отправитель:", login.alias],
      ["Дата отгрузки:", "___________________________"],
      [
        "Номер накладной",
        "Доп.информация",
        "Кол-во мест",
        "Факт. вес",
        "Грузополучатель",
        "Адрес доставки",
      ],
    ];

    const workbookFooter = [
      [],
      ["Итого накладных:", upload_manifest.disp_data.length],
      [
        "Итого мест",
        upload_manifest.disp_data.reduce(
          (summ, el) => summ + parseInt(el.Total),
          0,
        ),
      ],
      [
        "Общий факт. вес",
        upload_manifest.disp_data.reduce(
          (summ, el) => summ + parseInt(el.Weight),
          0,
        ),
      ],
      [],
      ["Получатель", "___________________________"],
      [],
      ["Курьер", "___________________________"],
    ];

    const convertedData = upload_manifest.disp_data.map((el) => [
      el.Num,
      el.SendAddInfo,
      el.Total,
      el.Weight,
      el.RecCompany,
      `${el.RecCity}, ${el.RecAdress}`,
    ]);

    const workbookData = workbookHeader.concat(convertedData, workbookFooter);

    const worksheet = XLSX.utils.aoa_to_sheet(workbookData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Manifest");
    XLSX.writeFile(workbook, "Manifest.xlsx");
  };

  const convert_data = () => {
    reset_disp_data();
    const it = upload_manifest.import_template;
    const dt = upload_manifest.default_template;
    let consolidate_data = [];
    let data = [];
    let sourse_data;

    sourse_data = upload_manifest.data;
    sourse_data.forEach((el, index, arr) => {
      let push_it = true;
      if (el.length === 1) {
        push_it = false;
      }
      let CurIndex;

      if (
        upload_manifest.upload_in_one.value &&
        upload_manifest.consolidate_checkbox_index !== 0 &&
        upload_manifest.import_template.ConsolidateImportTemplate !== 0 &&
        consolidate_data.length !== 0
      ) {
        CurIndex = index + 1;
      } else {
        CurIndex = index;
      }
      let Num = "";
      let SendCity = "";
      let SendAdress = "";
      let SendCompany = "";
      let SendPerson = "";
      let SendPhone = "";
      let SendAddInfo = "";
      let RecCity = "";
      let RecAdress = "";
      let RecCompany = "";
      let RecPerson = "";
      let RecPhone = "";
      let RecAddInfo = "";

      let InsureValue = 0;
      let COD = 0;
      let Total = 0;
      let Weight = 0;
      let Volume = 0;

      if (it.Num !== 0) {
        Num = el[it.Num - 1];
      }
      if (it.SendCity !== "0") {
        SendCity = el[it.SendCity - 1];
      } else {
        SendCity = dt.SendCity;
      }
      if (it.SendAdress !== "0") {
        SendAdress = el[it.SendAdress - 1];
      } else {
        SendAdress = dt.SendAdress;
      }
      if (it.SendCompany !== "0") {
        SendCompany = el[it.SendCompany - 1];
      } else {
        SendCompany = dt.SendCompany;
      }
      if (it.SendPerson !== "0") {
        SendPerson = el[it.SendPerson - 1];
      } else {
        SendPerson = dt.SendPerson;
      }
      if (it.SendPhone !== "0") {
        SendPhone = el[it.SendPhone - 1];
      } else {
        SendPhone = dt.SendPhone;
      }

      if (it.RecCity !== "0") {
        RecCity = el[it.RecCity - 1];
      } else {
        RecCity = dt.RecCity;
      }
      if (it.RecAdress !== "0") {
        RecAdress = el[it.RecAdress - 1];
      } else {
        RecAdress = dt.RecAdress;
      }
      if (it.RecCompany !== "0") {
        RecCompany = el[it.RecCompany - 1];
      } else {
        RecCompany = dt.RecCompany;
      }
      if (it.RecPerson !== "0") {
        RecPerson = el[it.RecPerson - 1];
      } else {
        RecPerson = dt.RecPerson;
      }
      if (it.RecPhone !== "0") {
        RecPhone = el[it.RecPhone - 1];
      } else {
        RecPhone = dt.RecPhone;
      }
      if (it.RecAddInfo !== "0") {
        RecAddInfo = el[it.RecAddInfo - 1];
      } else {
        RecAddInfo = dt.RecAddInfo;
      }

      if (upload_manifest.upload_in_one.value) {
        if (
          arr.filter(
            (cur_el, cur_index) =>
              cur_el[it.RecAdress - 1] === el[it.RecAdress - 1] &&
              cur_index < index,
          ).length > 0
        ) {
          push_it = false;
        } else if (
          arr.filter(
            (cur_el, cur_index) =>
              cur_el[it.RecAdress - 1] === el[it.RecAdress - 1] &&
              cur_index > index,
          ).length > 0
        ) {
          let cons_arr = arr.filter(
            (cur_el) => cur_el[it.RecAdress - 1] === el[it.RecAdress - 1],
          );

          if (it.Total !== "0") {
            cons_arr.forEach(
              (total_el) =>
                (Total = Total + parseFloat(total_el[it.Total - 1])),
            );
          }
          if (it.Weight !== "0") {
            cons_arr.forEach(
              (total_el) =>
                (Weight = Weight + parseFloat(total_el[it.Weight - 1])),
            );
          }
          if (it.Volume !== "0") {
            cons_arr.forEach(
              (total_el) =>
                (Volume = Volume + parseFloat(total_el[it.Volume - 1])),
            );
          }
          if (it.SendAddInfo !== "0") {
            cons_arr.forEach(
              (total_el) =>
                (SendAddInfo =
                  SendAddInfo +
                  total_el[it.SendAddInfo - 1] +
                  String.fromCharCode(10)),
            );
          }
        } else {
          if (it.Total !== "0") {
            Total = el[it.Total - 1];
          }
          if (it.Weight !== "0") {
            Weight = el[it.Weight - 1];
          }
          if (it.Volume !== "0") {
            Volume = el[it.Volume - 1];
          }
          if (it.SendAddInfo !== "0") {
            SendAddInfo = el[it.SendAddInfo - 1];
          } else {
            SendAddInfo = dt.SendAddInfo;
          }
        }
      } else {
        if (it.Total !== "0") {
          Total = el[it.Total - 1];
        }
        if (it.Weight !== "0") {
          Weight = el[it.Weight - 1];
        }
        if (it.Volume !== "0") {
          Volume = el[it.Volume - 1];
        }
        if (it.SendAddInfo !== "0") {
          SendAddInfo = el[it.SendAddInfo - 1];
        } else {
          SendAddInfo = dt.SendAddInfo;
        }
      }

      if (it.InsureValue !== "0") {
        InsureValue = el[it.InsureValue - 1];
      }
      if (it.COD !== "0") {
        COD = el[it.COD - 1];
      }

      if (RecCity === "") {
        const Recdispt = upload_manifest.disp_template_list.find((el) => {
          return el.label === RecAdress;
        });
        if (Recdispt !== undefined) {
          RecCity = Recdispt.City;
          RecAdress = Recdispt.Adress;
          if (RecPhone === "") {
            RecPhone = Recdispt.Phone;
          }
          if (RecPerson === "") {
            RecPerson = Recdispt.Person;
          }
          if (RecCompany === "") {
            RecCompany = Recdispt.Company;
          }
          if (RecAddInfo === "") {
            RecAddInfo = Recdispt.AddInfo;
          }
        }
      }

      if (SendCity === "") {
        const Senddispt = upload_manifest.disp_template_list.find((el) => {
          return el.label === SendAdress;
        });
        if (Senddispt !== undefined) {
          SendCity = Senddispt.City;
          SendAdress = Senddispt.Adress;
          if (SendPhone === "") {
            SendPhone = Senddispt.Phone;
          }
          if (SendPerson === "") {
            SendPerson = Senddispt.Person;
          }
          if (SendCompany === "") {
            SendCompany = Senddispt.Company;
          }
          if (SendAddInfo === "") {
            SendAddInfo = Senddispt.AddInfo;
          }
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
        Status: "Не загружено",
        Key: CurIndex,
        Comment: "",
      };
      if (push_it) {
        data.push(disp);
      }
    });

    set_disp_data(data);
  };

  const read_text = () => {
    set_data_upload_manifest();
  };

  const check_checkbox = (cell_index, element_index) => {
    upload_manifest_check_checkbox({
      cell_index: cell_index,
      element_index: element_index,
    });
  };

  const create_table = () => {
    const import_template = upload_manifest.import_template;
    const ObjKeys = Object.keys(import_template);

    const excludedKeys = ["ConsolidateImportTemplate", "Key"];

    if (ObjKeys.length > 0) {
      const Parseint = ObjKeys.filter((key) => !excludedKeys.includes(key)).map(
        (key) => {
          return parseInt(import_template[key]);
        },
      );
      const filteObj = Parseint.filter((fel) => fel > 0);
      const max = filteObj.reduce(function (a, b) {
        return Math.max(a, b);
      });
      const import_keys = Object.keys(upload_manifest.import_template);

      let header = [];

      for (let i = 0; i < max; i++) {
        var results = [];
        var toSearch = i + 1;
        let import_template_length = import_keys.length;
        for (var s = 0; s < import_template_length; s++) {
          if (Parseint[s] === toSearch) {
            results.push(translate[import_keys[s]]);
          }
        }

        if (results.length > 0) {
          header.push(<th key={i}>{results[0]}</th>);
        } else {
          header.push(<th key={i}> </th>);
        }
      }

      let body = [];
      upload_manifest.data.forEach((element, element_index) => {
        let children = [];
        element.forEach((cell, cell_index) => {
          if (cell === true || cell === false) {
            children.push(
              <td key={cell_index}>
                <input
                  type="checkbox"
                  className="input-checkbox"
                  onChange={check_checkbox(cell_index, element_index)}
                  checked={cell}
                />
              </td>,
            );
          } else {
            children.push(<td key={cell_index}>{cell}</td>);
          }
        });

        body.push(<tr key={element_index}>{children}</tr>);
      });
      let table = [];
      table.push(
        <thead key="hr1">
          <tr>{header}</tr>
        </thead>,
      );
      table.push(<tbody key="b1">{body}</tbody>);

      return table;
    }
  };

  const upload_data = async () => {
    const dispForUpload = upload_manifest.disp_data.filter(
      (el) => el.Status === "Не загружено" && el.Total > 0,
    );

    for (const disp of dispForUpload) {
      await upload_disp(disp);
    }
  };

  const upload_disp = async (disp) => {
    const create_disp_data = {
      userkey: login.userkey,
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

      CargoInfoType: true,
    };

    const result = await get_data("createcustomerdisp", create_disp_data);
    const data = {
      userkey: login.userkey,
      status: "Накладная",
      num: result.Number,
    };

    const result_print_data = await get_data("dispatch", data);
    set_disp_status({
      Key: disp.Key,
      Status: "Загружено",
      Num: result.Number,
      print_data: result_print_data,
    });
  };

  const create_disp_from_temlate = () => {
    let data = [];
    const dt = upload_manifest.default_template;

    upload_manifest.disp_template_list
      .filter((el) => el.selected)
      .forEach((el, index) => {
        const max = upload_manifest.disp_data.reduce((prev, cur) => {
          if (prev.Key > cur.Key) {
            return prev.Key;
          }
          return cur.Key;
        }, 0);

        console.log(max);

        let CurIndex = index + max + 1;

        let Num = "";
        let SendCity = "";
        let SendAdress = "";
        let SendCompany = "";
        let SendPerson = "";
        let SendPhone = "";
        let SendAddInfo = "";
        let RecCity = "";
        let RecAdress = "";
        let RecCompany = "";
        let RecPerson = "";
        let RecPhone = "";
        let RecAddInfo = "";

        let InsureValue = 0;
        let COD = 0;
        let Total = "";
        let Weight = "";
        let Volume = "";

        SendCity = dt.SendCity;
        SendAdress = dt.SendAdress;
        SendCompany = dt.SendCompany;
        SendPerson = dt.SendPerson;
        SendPhone = dt.SendPhone;
        SendAddInfo = dt.SendAddInfo;

        RecCity = el.City;
        RecAdress = el.Adress;
        RecCompany = el.Company;
        RecPerson = el.Person;
        RecPhone = el.Phone;
        RecAddInfo = el.AddInfo;

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
          Status: "Не загружено",
          Key: CurIndex,
          Comment: "",
        };

        data.push(disp);
      });
    set_disp_data(data);
    set_upload_manifest_open_modal_dt(false);
    upload_manifest_reset_template_checkbox();
  };

  const complited = upload_manifest.disp_data.filter(
    (el) => el.Status === "Загружено",
  );

  const control_panel = (
    <div className="control_panel">
      <button className="ui button mini" onClick={read_text}>
        Прочитать
      </button>
      <button
        className="ui button mini"
        disabled={upload_manifest.data.length === 0}
        onClick={convert_data}
      >
        Преобразовать
      </button>
      <button
        className="ui button mini"
        disabled={
          upload_manifest.disp_data.length === 0 ||
          upload_manifest.disp_data.filter((el) => el.RecCity === "").length !==
            0
        }
        onClick={upload_data}
      >
        Загрузить данные
      </button>

      <button
        className="ui button mini"
        disabled={
          upload_manifest.disp_data.length === 0 ||
          upload_manifest.disp_data.filter((el) => el.RecCity === "").length !==
            0
        }
        onClick={hadleSaveXLSX}
      >
        Сохранить в Excel
      </button>

      {complited.length !== 0 ? (
        <button className="ui button mini" onClick={handleDispPrint}>
          <i className="ek-printer" /> Печать всех накладных
        </button>
      ) : null}

      {complited.length !== 0 ? (
        <div style={{ display: "none" }}>
          <ComponentToPrint
            userkey={login.userkey}
            disp={complited.map((el) => {
              return el.print_data;
            })}
            ref={all_disp_print}
          />
        </div>
      ) : null}

      {complited.length !== 0 && login.print_ticket ? (
        <button className="ui button mini" onClick={handleStickerPrint}>
          <i className="ek-printer" /> Печать всех наклеек
        </button>
      ) : null}

      {complited.length !== 0 && login.print_ticket ? (
        <div ref={all_ticket_print} className="sticker_component">
          <StickerToPrint
            disp={complited.map((el) => {
              return el.print_data;
            })}
          />
        </div>
      ) : null}
    </div>
  );

  const templates = (
    <div className="upload_manifest_control_panel">
      <div className="disp_data_label">Шаблон импорта:</div>
      <div className="disp_data_el">
        <Select
          options={upload_manifest.import_template_list}
          styles={customStyles}
          value={upload_manifest.import_template}
          onChange={(values) => set_import_template(values)}
        />
      </div>
      <div>
        <Modal
          trigger={
            <button className="ui icon button mini">
              <i className="ek-eye"></i>
            </button>
          }
          header="Шаблон импорта"
          height="90%"
          width="700px"
        >
          {upload_manifest.import_template.label}

          <div className="upload_mainfest_modal_info">
            <div className="disp_data_label">Номер накладной: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.Num}
            </div>
            <div className="disp_data_label">Город отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.SendCity}
            </div>
            <div className="disp_data_label">Адрес отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.SendAdress}
            </div>
            <div className="disp_data_label">Компания отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.SendCompany}
            </div>
            <div className="disp_data_label">Контактное лицо отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.SendPerson}
            </div>
            <div className="disp_data_label">
              Контактный телефон отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.SendPhone}
            </div>
            <div className="disp_data_label">
              Электронный адрес отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.SendEmail}
            </div>
            <div className="disp_data_label">
              Дополнительная информация отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.SendAddInfo}
            </div>
            <div className="disp_data_label">Город получателя: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.RecCity}
            </div>
            <div className="disp_data_label">Адрес отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.RecAdress}
            </div>
            <div className="disp_data_label">Компания получателя: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.RecCompany}
            </div>
            <div className="disp_data_label">Контактное лицо отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.RecPerson}
            </div>
            <div className="disp_data_label">
              Контактный телефон отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.RecPhone}
            </div>
            <div className="disp_data_label">
              Электронный адрес отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.RecEmail}
            </div>
            <div className="disp_data_label">
              Дополнительная информация отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.RecAddInfo}
            </div>
            <div className="disp_data_label">Страховая стоимость: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.InsureValue}
            </div>
            <div className="disp_data_label">Сумма наложенного платежа: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.COD}
            </div>
            <div className="disp_data_label">Количество мест: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.Total}
            </div>
            <div className="disp_data_label">Общий фактический вес: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.Weight}
            </div>
            <div className="disp_data_label">Общий объемный вес: </div>
            <div className="disp_data_el">
              {upload_manifest.import_template.Volume}
            </div>
          </div>
        </Modal>
      </div>

      <div className="disp_data_label">Значения по умолчанию:</div>
      <div className="disp_data_el">
        <Select
          options={upload_manifest.default_template_list}
          styles={customStyles}
          value={upload_manifest.default_template}
          onChange={(values) => set_default_template(values)}
        />
      </div>
      <div>
        <Modal
          trigger={
            <button className="ui icon button mini">
              <i className="ek-eye"></i>
            </button>
          }
          header="Шаблон значений по умалчанию"
          height="90%"
          width="700px"
        >
          {upload_manifest.default_template.label}
          <div className="upload_mainfest_modal_info">
            <div className="disp_data_label">Город отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.SendCity}
            </div>
            <div className="disp_data_label">Адрес отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.SendAdress}
            </div>
            <div className="disp_data_label">Компания отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.SendCompany}
            </div>
            <div className="disp_data_label">Контактное лицо отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.SendPerson}
            </div>
            <div className="disp_data_label">
              Контактный телефон отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.SendPhone}
            </div>
            <div className="disp_data_label">
              Электронный адрес отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.SendEmail}
            </div>
            <div className="disp_data_label">
              Дополнительная информация отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.SendAddInfo}
            </div>
            <div className="disp_data_label">Город получателя: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.RecCity}
            </div>
            <div className="disp_data_label">Адрес отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.RecAdress}
            </div>
            <div className="disp_data_label">Компания получателя: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.RecCompany}
            </div>
            <div className="disp_data_label">Контактное лицо отправителя: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.RecPerson}
            </div>
            <div className="disp_data_label">
              Контактный телефон отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.RecPhone}
            </div>
            <div className="disp_data_label">
              Электронный адрес отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.RecEmail}
            </div>
            <div className="disp_data_label">
              Дополнительная информация отправителя:{" "}
            </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.RecAddInfo}
            </div>
            <div className="disp_data_label">Страховая стоимость: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.InsureValue}
            </div>
            <div className="disp_data_label">Сумма наложенного платежа: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.COD}
            </div>
            <div className="disp_data_label">Срочность доставки: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.DelType}
            </div>
            <div className="disp_data_label">Тип оплаты: </div>
            <div className="disp_data_el">
              {upload_manifest.default_template.PayType}
            </div>
          </div>
        </Modal>
      </div>
      <div className="disp_data_label">Шаблоны адресов:</div>
      <div className="disp_data_el">
        {upload_manifest.disp_template_list.length}
      </div>
      <div>
        <button
          onClick={() => {
            set_upload_manifest_open_modal_dt(true);
          }}
          className="ui icon button mini"
        >
          <i className="ek-eye"></i>
        </button>
        <Modal
          onClose={() => set_upload_manifest_open_modal_dt(false)}
          open={upload_manifest.open_modal_dt}
          header="Шаблоны адресов"
          height="90%"
          width="90%"
        >
          <div className="table-wrapper">
            <table className="bordered">
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Город</th>
                  <th>Адрес</th>
                  <th>Телефон</th>
                  <th>Конт. лицо</th>
                  <th>Компания</th>
                  <th>Доп. инфо</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {upload_manifest.disp_template_list.map((el, index) => (
                  <tr key={index}>
                    <td>{el.label}</td>
                    <td>{el.City}</td>
                    <td>{el.Adress}</td>
                    <td>{el.Phone}</td>
                    <td>{el.Person}</td>
                    <td>{el.Company}</td>
                    <td>{el.AddInfo}</td>
                    <td>
                      <input
                        onChange={() =>
                          upload_manifest_check_template_checkbox(el.Key)
                        }
                        type="checkbox"
                        className="input-checkbox"
                        checked={el.selected}
                      ></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {upload_manifest.disp_template_list.filter((el) => {
            return el.selected;
          }).length > 0 ? (
            <button
              className="upload_manifest_create_button"
              onClick={create_disp_from_temlate()}
            >
              Cоздать (
              {
                upload_manifest.disp_template_list.filter((el) => {
                  return el.selected;
                }).length
              }
              )
            </button>
          ) : (
            <button disabled>Cоздать</button>
          )}
        </Modal>
      </div>
      {login.consolidate_upload_manifest ? (
        <div className="disp_data_label">Тип загрузки:</div>
      ) : null}
      {login.consolidate_upload_manifest ? (
        <div className="disp_data_el">
          <Select
            options={UploadInOneList}
            styles={customStyles}
            value={upload_manifest.upload_in_one}
            onChange={(values) => set_upload_in_one(values)}
          />
        </div>
      ) : null}
    </div>
  );

  const tableData = create_table();

  const result = (
    <div>
      {upload_manifest.disp_data.length > 0 ? (
        <div className="upload_manifest_disp_data">
          <div className="upload_manifest_disp_data_header">
            <div className="upload_manifest_data_label_header">
              Данные по грузу:
            </div>
            <div></div>
            <div className="upload_manifest_data_label_header">
              Данные отправителя:
            </div>
            <div></div>
            <div className="upload_manifest_data_label_header">
              Данные получателя:
            </div>
            <div></div>
            <div className="upload_manifest_data_label_header">
              Состояние загрузки:
            </div>
          </div>

          {upload_manifest.disp_data.map((el, index) => {
            let RowClassName = "upload_manifest_disp_data_body";
            if (el.Comment === "Консолидация") {
              RowClassName = "upload_manifest_disp_data_body consolidate_row";
            }

            return (
              <div className={RowClassName} key={index}>
                <div className="upload_manifest_cargo_data upload_manifest_disp_data_body_item">
                  <div className="upload_manifest_data_label">
                    Номер накладной:
                  </div>
                  <div className="upload_manifest_data_el">{el.Num}</div>
                  <div className="upload_manifest_data_label">Итого мест:</div>
                  <div className="upload_manifest_data_el">
                    <input
                      value={el.Total}
                      onChange={(e) => {
                        set_upload_manifest_disp_data_total(
                          el.Key,
                          e.target.value,
                        );
                      }}
                    ></input>
                  </div>
                  <div className="upload_manifest_data_label">
                    Фактический вес:
                  </div>
                  <div className="upload_manifest_data_el">
                    <input
                      value={el.Weight}
                      onChange={(e) => {
                        set_upload_manifest_disp_data_weight(
                          el.Key,
                          e.target.value,
                        );
                      }}
                    ></input>
                  </div>
                  <div className="upload_manifest_data_label">
                    Объемный вес:
                  </div>
                  <div className="upload_manifest_data_el">
                    <input
                      value={el.Volume}
                      onChange={(e) => {
                        set_upload_manifest_disp_data_volume(
                          el.Key,
                          e.target.value,
                        );
                      }}
                    ></input>
                  </div>
                  <div className="upload_manifest_data_label">
                    Страховая стоимость:
                  </div>
                  <div className="upload_manifest_data_el">
                    {el.InsureValue}
                  </div>
                  <div className="upload_manifest_data_label">
                    Налож. платеж:
                  </div>
                  <div className="upload_manifest_data_el">{el.COD}</div>
                </div>
                <div></div>
                <div className="upload_manifest_rec_send_data upload_manifest_disp_data_body_item">
                  <div className="upload_manifest_data_label">Город:</div>
                  <div className="upload_manifest_data_el">{el.SendCity}</div>
                  <div className="upload_manifest_data_label">Адрес:</div>
                  <div className="upload_manifest_data_el">{el.SendAdress}</div>
                  <div className="upload_manifest_data_label">Компания:</div>
                  <div className="upload_manifest_data_el">
                    {el.SendCompany}
                  </div>
                  <div className="upload_manifest_data_label">Конт.лицо:</div>
                  <div className="upload_manifest_data_el">{el.SendPerson}</div>
                  <div className="upload_manifest_data_label">Телефон:</div>
                  <div className="upload_manifest_data_el">{el.SendPhone}</div>
                  <div className="upload_manifest_data_label">Доп.инфо:</div>
                  <div className="upload_manifest_data_el">
                    {el.SendAddInfo}
                  </div>
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
                <div className="upload_manifest_disp_data_body_item">
                  <div className="upload_manifest_data_el">
                    Статус: {el.Status}
                  </div>
                  {el.Comment === "" ? null : (
                    <div className="upload_manifest_data_el">{el.Comment}</div>
                  )}

                  {el.Status === "Загружено" ? null : (
                    <button
                      size="mini"
                      onClick={() => upload_manifest_remove_disp(el.Key)}
                    >
                      <i className="ek-bin" /> Удалить
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => set_text_area(e.target.value)}
          value={upload_manifest.text_area}
          type="text"
        ></textarea>
      </div>
      {control_panel}
      {templates}

      <div>
        <table className="bordered">{tableData}</table>
      </div>

      {result}
    </div>
  );
};
