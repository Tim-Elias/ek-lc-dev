import React from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import logo from "./../../common/1024.png";

const Marker = ({ size, text, el_key, onClick }) => (
  <div
    className="marker"
    onClick={() => onClick(el_key)}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${logo})`,
      cursor: "pointer",
    }}
    title={text}
  ></div>
);

class Screen extends React.Component {
  marker_onClick = (key) => {
    this.props.set_select_filial(key);
  };

  render() {
    const filial = this.props.store.home.filial.find(
      (el) => el.el_key === this.props.store.home.select_filial
    );
    let callto;
    let mailto;
    if (filial) {
      callto = `callto:${filial.phone}`;
      mailto = `mailto:${filial.email}`;
    }

    return (
      <div>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyD5AmmHNIXXN0yquTsPxoXuvtOp8OYhe2E",
            }}
            defaultCenter={this.props.store.home.map.center}
            defaultZoom={this.props.store.home.map.zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            {this.props.store.home.filial.map((el) => {
              return (
                <Marker
                  key={el.el_key}
                  lat={el.lat}
                  lng={el.lng}
                  text={el.text}
                  size={el.size}
                  el_key={el.el_key}
                  onClick={this.marker_onClick}
                />
              );
            })}
          </GoogleMapReact>
        </div>
        {this.props.store.home.select_filial !== "0" ? (
          <div className="filial_item">
            <div className="filial_header">
              {filial.type} службы доставки Экспресс Кинетика
            </div>
            <div className="filial_text">{filial.text}</div>
            <div className="filial_contact_info">
              Контактный телефон: <a href={callto}>{filial.phone}</a>
            </div>
            <div className="filial_contact_info">
              E-mail: <a href={mailto}>{filial.email}</a>
            </div>
            {filial.type === "Филиал" ? (
              <div className="filial_work_hour">
                <div className="filial_work_hour_header">Режим работы:</div>
                <div className="filial_work_hour_item">
                  Понедельник: {filial.work_hour.mon}
                </div>
                <div className="filial_work_hour_item">
                  Вторник: {filial.work_hour.tue}
                </div>
                <div className="filial_work_hour_item">
                  Среда: {filial.work_hour.wen}
                </div>
                <div className="filial_work_hour_item">
                  Четверг: {filial.work_hour.thu}
                </div>
                <div className="filial_work_hour_item">
                  Пятница: {filial.work_hour.fri}
                </div>
                <div className="filial_work_hour_item">
                  Суббота: {filial.work_hour.sat}
                </div>
                <div className="filial_work_hour_item">
                  Воскресенье: {filial.work_hour.sun}
                </div>
              </div>
            ) : null}
            {filial.type === "Филиал" ? (
              <div className="director">Директор: {filial.director}</div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    set_list_storage: (param) => {
      dispatch({ type: "set_list_storage", payload: param });
    },
    set_directions: (param) => {
      dispatch({ type: "set_directions", payload: param });
    },
    set_select_filial: (param) => {
      dispatch({ type: "set_select_filial", payload: param });
    },
  })
)(Screen);
