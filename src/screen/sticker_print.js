import React from "react";
import Barcode from "react-barcode";
import "./disp.css";

class StikerToPrint extends React.Component {
  create_table = (disp) => {
    let table = [];

    for (let i = 0; i < disp.data.Total; i++) {
      table.push(
        <div className="sticker" key={i}>
          <div className="sticker_info">Из: {disp.data.SendCity}</div>
          <div className="sticker_rec_city"> {disp.data.RecCity}</div>
          <div className="sticker_info">{disp.data.RecAdress}</div>
          <div className="sticker_info">{disp.data.DelMethod}</div>
          <div className="sticker_info">{disp.data.Customer}</div>
          <div className="sticker_cargo">
            {i + 1} из {disp.data.Total}
          </div>
          <div className="sticker_barcode">
            <Barcode
              value={disp.data.Number}
              format="CODE39"
              width={1}
              height={30}
            />
          </div>
          <div className="sticker_site">
            {" "}
            <p className="page_break">www.express-kinetika.ru</p>
          </div>
        </div>,
      );
    }
    return table;
  };

  render() {
    return (
      <div>
        {this.props.disp.map((el, index) => {
          return (
            <div key={index} className="sticker_list">
              {this.create_table(el)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default StikerToPrint;
