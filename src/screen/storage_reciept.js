import React from "react";
import { connect } from "react-redux";
import Sound from "react-sound";
import done_sound from "./../common/ping.mp3";
import err_sound from "./../common/err.mp3";
import funk_sound from "./../common/funk.mp3";
import { get_data } from "./../common/common_modules";

class Screen extends React.Component {
  done_sound_play = () => {
    this.props.storage_reciept_set_done_sound(Sound.status.PLAYING);
  };

  err_sound_play = () => {
    this.props.storage_reciept_set_err_sound(Sound.status.PLAYING);
  };

  funk_sound_play = () => {
    this.props.storage_reciept_set_funk_sound(Sound.status.PLAYING);
  };

  send_req = () => {
    if (
      this.props.store.storage_reciept.barcode.substring(0, 9) === "0000-0000"
    ) {
      let zone = this.props.store.storage_reciept.barcode.substring(10);
      let find_zone = this.props.store.storage_reciept.zone_list.find(
        (el) => el === zone,
      );
      if (find_zone === undefined) {
        this.props.storage_reciept_set_barcode("");
        this.props.storage_reciept_set_status_type("err");
        this.props.storage_reciept_set_status_message(
          "Зона хранения не найдена",
        );
        this.err_sound_play();
      } else {
        this.props.storage_reciept_set_selected_zone(zone);
        this.props.storage_reciept_set_barcode("");
        this.props.storage_reciept_set_status_message("");
        this.props.storage_reciept_set_status_type(null);
        this.funk_sound_play();
      }
    } else {
      this.props.modules.set_active_window("wait");

      const data = {
        userkey: this.props.store.login.userkey,
        barcode: this.props.store.storage_reciept.barcode,
        zone: this.props.store.storage_reciept.selected_zone,
        storage: this.props.store.storage_reciept.storage.id,
      };

      get_data("storagereciept", data).then(
        (result) => {
          this.props.modules.set_active_window("storage_reciept");
          this.props.storage_reciept_set_result(result);
          this.props.storage_reciept_set_barcode("");
          if (result.status_type === "ok") {
            this.done_sound_play();
          } else {
            this.err_sound_play();
          }
        },
        (err) => {
          this.props.modules.set_modal_show(true);
          this.props.modules.set_modal_header("Ошибка");
          this.props.modules.set_modal_text(err);

          this.props.modules.set_active_window("storage_reciept");
          this.props.storage_reciept_set_result({
            status_type: "err",
            status_message: err,
          });
          this.err_sound_play();
        },
      );
    }
  };

  render() {
    let done_sound_status;
    if (this.props.store.storage_reciept.done_sound === undefined) {
      done_sound_status = Sound.status.STOPPED;
    } else {
      done_sound_status = this.props.store.storage_reciept.done_sound;
    }

    let funk_sound_status;
    if (this.props.store.storage_reciept.funk_sound === undefined) {
      funk_sound_status = Sound.status.STOPPED;
    } else {
      funk_sound_status = this.props.store.storage_reciept.funk_sound;
    }

    let err_sound_status;
    if (this.props.store.storage_reciept.err_sound === undefined) {
      err_sound_status = Sound.status.STOPPED;
    } else {
      err_sound_status = this.props.store.storage_reciept.err_sound;
    }

    const send_req = this.send_req;
    document.onkeydown = function (event) {
      try {
        if (event.keyCode === 13) {
          send_req();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <div className="disp_map_button">
          <button
            className="ui button mini"
            onClick={() => {
              this.props.set_full_screen();
            }}
          >
            Полноэкранный режим
          </button>
        </div>
        <div>
          Текущий склад: {this.props.store.storage_reciept.storage?.name}
        </div>
        <div>
          Зона хранения: {this.props.store.storage_reciept.selected_zone}
        </div>

        <input
          autoFocus
          value={this.props.store.storage_reciept.barcode}
          onChange={(e) => {
            this.props.storage_reciept_set_barcode(e.target.value);
          }}
        />
        {this.props.store.storage_reciept.status_type === "ok" ? (
          <div>
            <div>Накладная: {this.props.store.storage_reciept.num} </div>
            <div>Задача: {this.props.store.storage_reciept.task_type} </div>
            <div>Дата: {this.props.store.storage_reciept.task_date}</div>
            <div>Курьер: {this.props.store.storage_reciept.task_value}</div>
            <div>Заказчик: {this.props.store.storage_reciept.customer}</div>
            <div>Город: {this.props.store.storage_reciept.rec_city}</div>
            <div>Адрес: {this.props.store.storage_reciept.rec_adress}</div>
            <div>Район: {this.props.store.storage_reciept.rec_district}</div>
            <div>Получатель: {this.props.store.storage_reciept.rec_name}</div>
          </div>
        ) : null}
        {this.props.store.storage_reciept.status_type === "err" ? (
          <div>{this.props.store.storage_reciept.status_message}</div>
        ) : null}
        <Sound url={done_sound} playStatus={done_sound_status} />
        <Sound url={err_sound} playStatus={err_sound_status} />
        <Sound url={funk_sound} playStatus={funk_sound_status} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    storage_reciept_set_barcode: (param) => {
      dispatch({ type: "storage_reciept_set_barcode", payload: param });
    },
    storage_reciept_set_result: (param) => {
      dispatch({ type: "storage_reciept_set_result", payload: param });
    },
    storage_reciept_set_selected_zone: (param) => {
      dispatch({ type: "storage_reciept_set_selected_zone", payload: param });
    },
    set_full_screen: () => {
      dispatch({ type: "set_full_screen" });
    },
    storage_reciept_set_done_sound: (param) => {
      dispatch({ type: "storage_reciept_set_done_sound", payload: param });
    },
    storage_reciept_set_err_sound: (param) => {
      dispatch({ type: "storage_reciept_set_err_sound", payload: param });
    },
    storage_reciept_set_funk_sound: (param) => {
      dispatch({ type: "storage_reciept_set_funk_sound", payload: param });
    },
    storage_reciept_set_status_message: (param) => {
      dispatch({ type: "storage_reciept_set_status_message", payload: param });
    },
    storage_reciept_set_status_type: (param) => {
      dispatch({ type: "storage_reciept_set_status_type", payload: param });
    },
  }),
)(Screen);
