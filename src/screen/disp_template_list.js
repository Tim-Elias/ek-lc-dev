import React from "react";
import { connect } from "react-redux";
import { get_data } from "./../common/common_modules";

class Screen extends React.Component {
  create_disp_template = () => {
    this.props.reset_selected_disp_template();
    this.props.modules.set_active_window("disp_template");
    this.props.modules.set_last_window("disp_template_list");
  };

  tr_double_click = (el) => {
    const city = this.props.store.create_disp.CityList.filter(
      (list_el) => list_el.value === el.City,
    )[0];

    const city_label = city.label;
    this.props.modules.set_active_window("wait");
    get_data("terminallist", {
      city: city_label,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        let crrent_terminal = {};
        this.props.set_disp_template_terminal_list(result);
        if (result.length === 0) {
          this.props.set_selected_disp_template_Terminal(false);
        } else {
          if (el.Terminal) {
            crrent_terminal = result.filter(
              (list_el) => list_el.value === el.CurrentTerminal,
            )[0];
            //this.props.set_selected_disp_template_CurrentTerminal(crrent_terminal)
          }
        }
        this.props.set_selected_disp_template({
          ...el,
          City: city,
          CurrentTerminal: crrent_terminal,
        });
        this.props.modules.set_active_window("disp_template");
        this.props.modules.set_last_window("disp_template_list");
      },
      (err) => {
        console.log("err", err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      },
    );
  };

  render() {
    return (
      <div>
        <div className="disp_Number">
          <div>
            <button onClick={this.props.modules.back}>
              <i className="ek-arrow-left" />
            </button>
            <b className="page_header">Шаблоны отправителей и получателей</b>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <div className="small_table_data">Имя</div>
              </th>
              <th>
                <div className="small_table_data">Город</div>
              </th>
              <th>
                <div className="small_table_data">Адрес</div>
              </th>
              <th>
                <div className="small_table_data">Телефон</div>
              </th>
              <th>
                <div className="small_table_data">Контактное лицо</div>
              </th>
              <th>
                <div className="small_table_data">Компания</div>
              </th>
              <th>
                <div className="small_table_data">Доп.инфо</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.upload_manifest.disp_template_list.map((el) => {
              return (
                <tr
                  key={el.Key}
                  onDoubleClick={this.tr_double_click.bind(this, el)}
                >
                  <td>
                    <div className="small_table_data">{el.label}</div>
                  </td>
                  <td>
                    <div className="small_table_data">{el.City}</div>
                  </td>
                  <td>
                    <div className="small_table_data">
                      {el.Terminal
                        ? el.CurrentTerminal + " (Cклад)"
                        : el.Adress}
                    </div>
                  </td>
                  <td>
                    <div className="small_table_data">{el.Phone}</div>
                  </td>
                  <td>
                    <div className="small_table_data">{el.Person}</div>
                  </td>
                  <td>
                    <div className="small_table_data">{el.Company}</div>
                  </td>
                  <td>
                    <div className="small_table_data">{el.AddInfo}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={this.create_disp_template.bind(this)}>
          Создать шаблон
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
    set_selected_disp_template: (param) => {
      dispatch({ type: "set_selected_disp_template", payload: param });
    },
    set_last_window: (param) => {
      dispatch({ type: "set_last_window", payload: param });
    },
    set_selected_disp_template_Terminal: (param) => {
      dispatch({ type: "set_selected_disp_template_Terminal", payload: param });
    },
    set_disp_template_terminal_list: (param) => {
      dispatch({ type: "set_disp_template_terminal_list", payload: param });
    },
    set_selected_disp_template_CurrentTerminal: (param) => {
      dispatch({
        type: "set_selected_disp_template_CurrentTerminal",
        payload: param,
      });
    },
    reset_selected_disp_template: (param) => {
      dispatch({ type: "reset_selected_disp_template", payload: param });
    },
  }),
)(Screen);
