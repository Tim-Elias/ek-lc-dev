import React from "react";
import QRCode from "qrcode.react";
import "./disp.css";

const StikerToPrint = ({ disp }) => {
  const create_table = (disp) => {
    let table = [];

    for (let i = 0; i < disp.data.Total; i++) {
      table.push(
        <div className="sticker" key={i}>
          <div className="sticker_info">Из: {disp.data.SendCity}</div>
          <div className="sticker_rec_city"> {disp.data.RecCity}</div>
          <div className="sticker_info">{disp.data.RecAdress}</div>
          <div className="sticker_info">{disp.data.DelMethod}</div>
          <div className="sticker_info">{disp.data.Customer}</div>
          <div className="sticker_code_wrapper">
            <div className="sticker_cargo_wrapper">
              <div className="sticker_cargo">
                {i + 1} из {disp.data.Total}
              </div>
              <div className="sticker_number">{disp.data.Number}</div>
              <div className="sticker_site">express-kinetika.ru</div>
            </div>
            <div className="sticker_barcode">
              <QRCode size={96} value={`${disp.data.Number}%${i + 1}`} />
            </div>
          </div>
        </div>,
      );
    }
    return table;
  };

  return (
    <div>
      {disp.map((el, index) => (
        <div key={index} className="sticker_list">
          {create_table(el)}
        </div>
      ))}
    </div>
  );
};

export default StikerToPrint;
