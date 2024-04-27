import React from "react";
import { connect } from "react-redux";
import "./send_manifest.css";

import { get_data } from "./../common/common_modules";

class Screen extends React.Component {
  search = () => {
    this.props.set_search_send_manifest_error("");
    const num = this.props.store.send_manifest.search;
    if (
      this.props.store.storage.list.filter(
        (el) => el.selected && el.Number === num,
      ).length === 1
    ) {
      this.props.set_search_send_manifest_error(
        `Накладная ${num} уже добавлена`,
      );
    } else if (
      this.props.store.storage.list.filter(
        (el) => !el.selected && el.Number === num,
      ).length === 1
    ) {
      this.props.select_disp(num);
    } else if (
      this.props.store.storage.list.filter(
        (el) => !el.selected && el.Number === num,
      ).length === 0
    ) {
      this.props.set_search_send_manifest_error(`Накладная ${num} не найдена`);
    }
  };

  send_manifest = () => {
    this.props.set_active_window("wait");

    const dispatches = this.props.store.storage.list
      .filter((el) => el.selected)
      .map((disp) => {
        return disp.Number;
      });
    const data = {
      userkey: this.props.store.login.userkey,
      dispatches: dispatches,
      storehouse: this.props.store.send_manifest.storehouse,
    };

    get_data("sendmanifest", data).then(
      () => {
        get_data("list", { userkey: this.props.store.login.userkey }).then(
          (result) => {
            this.props.set_list_storage(result);
            this.props.set_active_window("storage");
          },

          (err) => {
            this.props.modules.set_modal_show(true);
            this.props.modules.set_modal_header("Ошибка");
            this.props.modules.set_modal_text(err);

            this.props.set_active_window("storage");
            console.log(err);
          },
        );
      },
      (err) => {
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);

        this.props.set_active_window("send_manifest");
        this.props.set_search_error(err);
      },
    );
  };

  render() {
    const search = () => {
      this.search();
    };

    document.onkeydown = function (event) {
      try {
        if (event.keyCode === 13) {
          search();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <h3>Формирование исходящего манифеста</h3>

        <select
          value={this.props.store.send_manifest.storehouse}
          onChange={(e) =>
            this.props.set_send_manifest_storehouse(e.target.value)
          }
        >
          <option value="000000001">Новосибирск, Коммунистическая 7</option>
          <option value="000000006">Красноярск Караульная 4стр1</option>
          <option value="000000002">Кемерово Рукавишникова 26</option>
          <option value="000000009">Барнаул, Молодежная 111</option>
          <option value="000000008">Омск, Потанина 15</option>
          <option value="000000007">Томск, Герцена 13а</option>
        </select>

        <div className="search">
          <div className="search_label">Введите номер</div>
          <div className="search_data">
            <input
              value={this.props.store.send_manifest.search}
              className="search_data_input"
              onChange={(e) =>
                this.props.set_search_send_manifest(e.target.value)
              }
            ></input>
          </div>
          <div className="search_button_area">
            <button
              id="search_button"
              onClick={this.search.bind(this)}
              className="send_pod"
            >
              Добавить
            </button>
          </div>
        </div>
        <div className="search_error">{this.props.store.reciept.error}</div>

        {this.props.store.storage.list.filter((el) => el.selected).length !==
        0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Тип</th>
                  <th>Заказчик</th>
                  <th>Номер накладной</th>
                  <th>Адрес</th>
                  <th>Телефон</th>
                  <th>Контактное лицо</th>
                  <th>К оплате</th>
                  <th>Количество мест</th>
                  <th>Вес</th>
                </tr>
              </thead>
              <tbody>
                {this.props.store.storage.list
                  .filter((el) => el.selected)
                  .map((disp, index) => (
                    <tr key={index}>
                      <td>{disp.Date}</td>
                      <td>{disp.Type}</td>
                      <td>{disp.Customer}</td>
                      <td>{disp.Number}</td>
                      <td>{disp.Adress}</td>
                      <td>{disp.Phone}</td>
                      <td>{disp.Person}</td>
                      <td>{disp.COD}</td>
                      <td>{disp.total}</td>
                      <td>{disp.weight}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}

        <div className="disp_data_el">
          Отправить на склад: накладных:{" "}
          {this.props.store.storage.list.filter((el) => el.selected).length}{" "}
          (мест:{" "}
          {this.props.store.storage.list
            .filter((el) => el.selected)
            .reduce((sum, el) => {
              return sum + parseInt(el.total);
            }, 0)}
          )
        </div>
        <button
          onClick={this.send_manifest.bind(this)}
          className="send_manifest"
        >
          Отправить и закрыть
        </button>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    set_active_window: (param) => {
      dispatch({ type: "set_active_window", payload: param });
    },
    set_send_manifest_storehouse: (param) => {
      dispatch({ type: "set_send_manifest_storehouse", payload: param });
    },
    set_search_send_manifest: (param) => {
      dispatch({ type: "set_search_send_manifest", payload: param });
    },
    set_search_send_manifest_error: (param) => {
      dispatch({ type: "set_search_error", payload: param });
    },
    select_disp: (param) => {
      dispatch({ type: "select_disp", payload: param });
    },
    set_list_storage: (param) => {
      dispatch({ type: "set_list_storage", payload: param });
    },
  }),
)(Screen);
