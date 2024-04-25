import React from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import { get_data } from "./../common/common_modules";

class Screen extends React.Component {
  update = () => {
    this.props.set_active_window("wait");
    const list_data = { userkey: this.props.store.login.userkey };

    get_data("enroute", list_data).then(
      (result) => {
        this.props.set_list_get_manifest(result);
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  tr_click(num) {
    this.props.set_active_get_manifest(num);
  }

  tr_double_click = (num) => {
    this.props.set_active_window("wait");
    const data = {
      userkey: this.props.store.login.userkey,
      num: num,
    };

    get_data("manifestenroute", data).then(
      (result) => {
        console.log(result);
        this.props.set_data_manifest(result);
        this.props.set_active_window("manifest");
        this.props.set_action_manifest("get");
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  render() {
    document.onkeydown = function (event) {};

    const tr_click = (name) => {
      this.tr_click(name);
    };

    const tr_double_click = (disp) => {
      this.tr_double_click(disp);
    };

    document.onkeydown = function (event) {
      try {
        if (event.keyCode === 38) {
          event.preventDefault();
          console.log("Вверх");
          let currentId = parseInt(
            document.getElementsByClassName("active")[0].getAttribute("id")
          );
          let updisp = document.getElementById((currentId - 1).toString());
          if (updisp !== null) {
            tr_click(updisp.getAttribute("name"));
          }
        }
        if (event.keyCode === 40) {
          event.preventDefault();
          console.log("Вниз");
          let currentId = parseInt(
            document.getElementsByClassName("active")[0].getAttribute("id")
          );
          let updisp = document.getElementById((currentId + 1).toString());
          if (updisp !== null) {
            tr_click(updisp.getAttribute("name"));
          }
        }
        if (event.keyCode === 13) {
          tr_double_click(
            document.getElementsByClassName("active")[0].getAttribute("name")
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <div>
          <h3>Входящие манифесты</h3>
        </div>
        <div>
          <button onClick={this.update.bind(this)}>Обновить данные</button>

          {this.props.store.get_manifest.list.length !== 0 ? (
            <div>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Дата отправления</Table.HeaderCell>
                    <Table.HeaderCell>Номер менифеста</Table.HeaderCell>
                    <Table.HeaderCell>Склад отправления</Table.HeaderCell>
                    <Table.HeaderCell>Перевозчик</Table.HeaderCell>
                    <Table.HeaderCell>Количество накладных</Table.HeaderCell>
                    <Table.HeaderCell>Общее количество мест</Table.HeaderCell>
                    <Table.HeaderCell>Общий вес</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                {this.props.store.get_manifest.list.map((disp, index) => (
                  <Table.Body key={index}>
                    {disp.num === this.props.store.get_manifest.active ? (
                      <Table.Row
                        className="active"
                        id={index}
                        name={disp.num}
                        onClick={this.tr_click.bind(this, disp.num)}
                        onDoubleClick={this.tr_double_click.bind(
                          this,
                          disp.num
                        )}
                        key={index}
                      >
                        <Table.Cell>{disp.date}</Table.Cell>
                        <Table.Cell>{disp.num}</Table.Cell>
                        <Table.Cell>{disp.sender}</Table.Cell>
                        <Table.Cell>{disp.carrier}</Table.Cell>
                        <Table.Cell>{disp.totaldisp}</Table.Cell>
                        <Table.Cell>{disp.total}</Table.Cell>
                        <Table.Cell>{disp.totalweight}</Table.Cell>
                      </Table.Row>
                    ) : (
                      <Table.Row
                        onClick={this.tr_click.bind(this, disp.num)}
                        id={index}
                        name={disp.num}
                        key={index}
                      >
                        <Table.Cell>{disp.date}</Table.Cell>
                        <Table.Cell>{disp.num}</Table.Cell>
                        <Table.Cell>{disp.sender}</Table.Cell>
                        <Table.Cell>{disp.carrier}</Table.Cell>
                        <Table.Cell>{disp.totaldisp}</Table.Cell>
                        <Table.Cell>{disp.total}</Table.Cell>
                        <Table.Cell>{disp.totalweight}</Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                ))}
              </Table>
            </div>
          ) : (
            "Нет ожидаемых входящих манифестов"
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
    set_active_window: (param) => {
      dispatch({ type: "set_active_window", payload: param });
    },
    set_list_get_manifest: (param) => {
      dispatch({ type: "set_list_get_manifest", payload: param });
    },
    set_active_get_manifest: (param) => {
      dispatch({ type: "set_active_get_manifest", payload: param });
    },

    set_action_manifest: (param) => {
      dispatch({ type: "set_action_manifest", payload: param });
    },
    set_data_manifest: (param) => {
      dispatch({ type: "set_data_manifest", payload: param });
    },
  })
)(Screen);
