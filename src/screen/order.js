import React from "react";
import { connect } from "react-redux";
import { get_data, get_file } from "./../common/common_modules";

class Screen extends React.Component {
  tr_double_click = async (disp) => {
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      status: "Накладная",
      num: disp.Num,
    };

    get_data("dispatch", data).then(
      (result) => {
        this.props.set_data_disp(result);
        this.props.set_active_window("disp");
        this.props.set_last_window("order");
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  back = () => {
    const last_window =
      this.props.store.general.last_window[
        this.props.store.general.last_window.length - 1
      ];
    this.props.pop_last_window();
    this.props.set_active_window(last_window);
  };

  get_order = () => {
    get_file(
      this.props.store.login.userkey,
      "order",
      this.props.store.order.data.Key,
      "Счёт " + this.props.store.order.data.Number + ".pdf"
    );
  };

  get_act = () => {
    get_file(
      this.props.store.login.userkey,
      "act",
      this.props.store.order.data.Key,
      "Акт " + this.props.store.order.data.Number + ".pdf"
    );
  };

  get_cf = () => {
    get_file(
      this.props.store.login.userkey,
      "cf",
      this.props.store.order.data.Key,
      "СФ " + this.props.store.order.data.Number + ".pdf"
    );
  };

  render() {
    document.onkeydown = function (event) {};
    return (
      <div>
        <div className="disp_Number">
          <div>
            <button onClick={this.back.bind(this)}>
              <i className="ek-arrow-left" />
            </button>
            <b className="page_header">
              Реализация № {this.props.store.order.data.Number} от{" "}
              {this.props.store.order.data.Date}
            </b>
            <button onClick={this.get_order.bind(this)}>Счёт</button>
            <button onClick={this.get_act.bind(this)}>Акт</button>
            {this.props.store.order.data.VAT === 0 ? null : (
              <button onClick={this.get_cf.bind(this)}>Счёт-фактура</button>
            )}
          </div>
        </div>
        <div className="disp_customer_data">
          <div className="disp_data_label">Заказчик:</div>
          <div className="disp_data_el">
            {this.props.store.order.data.Customer}
          </div>
          <div className="disp_data_label">Исполнитель:</div>
          <div className="disp_data_el">
            {this.props.store.order.data.Executor}
          </div>
        </div>
        {this.props.store.order.data.UseNomenclature ? (
          <table>
            <thead>
              <th>
                <div className="small_table_data">Наименование</div>
              </th>
              <th>
                <div className="small_table_data">Сумма</div>
              </th>
            </thead>
            <tbody>
              {this.props.store.order.nomenclature.map((el, index) => {
                let row_className = "";

                return (
                  <tr className={row_className} key={index}>
                    <td>
                      <div className="small_table_data">{el.Name}</div>
                    </td>
                    <td>
                      <div className="small_table_data">{el.Summ}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <th>
                <div className="small_table_data">Дата</div>
              </th>
              <th>
                <div className="small_table_data">Накладная</div>
              </th>
              <th>
                <div className="small_table_data">Город отправителя</div>
              </th>
              <th>
                <div className="small_table_data">Город получателя</div>
              </th>
              <th>
                <div className="small_table_data">Мест</div>
              </th>
              <th>
                <div className="small_table_data">Вес</div>
              </th>
              <th>
                <div className="small_table_data">Вид доставки</div>
              </th>
              <th>
                <div className="small_table_data">Сумма</div>
              </th>
            </thead>
            <tbody>
              {this.props.store.order.dispatches.map((el, index) => {
                let row_className = "";

                return (
                  <tr
                    className={row_className}
                    key={index}
                    onDoubleClick={this.tr_double_click.bind(this, el)}
                  >
                    <td>
                      <div className="small_table_data">{el.Date}</div>
                    </td>
                    <td>
                      <div className="small_table_data">{el.Num}</div>
                    </td>
                    <td>
                      <div className="small_table_data">{el.SendCity}</div>
                    </td>
                    <td>
                      <div className="small_table_data">{el.RecCity}</div>
                    </td>

                    <td>
                      <div className="small_table_data">{el.Total}</div>
                    </td>
                    <td>
                      <div className="small_table_data">{el.Weight}</div>
                    </td>

                    <td>
                      <div className="small_table_data">{el.DelMethod}</div>
                    </td>
                    <td>
                      <div className="small_table_data">{el.Summ}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="disp_customer_data">
          <div className="disp_data_label">Итого:</div>
          <div className="disp_data_el">{this.props.store.order.data.Summ}</div>
          {this.props.store.order.data.SummVAT === "" ? null : (
            <div className="disp_data_label">В том числе НДС:</div>
          )}
          {this.props.store.order.data.SummVAT === "" ? null : (
            <div className="disp_data_el">
              {this.props.store.order.data.SummVAT}
            </div>
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
    set_list_storage: (param) => {
      dispatch({ type: "set_list_storage", payload: param });
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
    pop_last_window: () => {
      dispatch({ type: "pop_last_window" });
    },
  })
)(Screen);
