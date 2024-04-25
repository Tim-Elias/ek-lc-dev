import React from "react";
import { connect } from "react-redux";
import { get_data } from "./../common/common_modules";
import { withCookies } from "react-cookie";
import { Button } from "semantic-ui-react";
import "./disp_map.css";
import "./my_disp.css";

class Screen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.set_search("");
    this.props.set_erroe_mesage("");
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.get_my_disp_data();
    }
  };

  get_my_disp_data = () => {
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      date_from: this.props.store.my_disp.date_from,
      date_to: this.props.store.my_disp.date_to,
      searchNum: this.props.store.my_disp.search,
    };
    get_data("mydisplist", data).then(
      (result) => {
        if (result.length === 1) {
          const data = {
            userkey: this.props.store.login.userkey,
            status: "Накладная",
            num: result[0].Num,
          };

          get_data("dispatch", data).then(
            (result) => {
              this.props.set_data_disp(result);
              this.props.set_active_window("disp");
              this.props.set_last_window("disp_number");
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.props.set_erroe_mesage(
            "Не удалось найти накладную номер " +
              this.props.store.my_disp.search
          );
          this.props.set_active_window("disp_number");
        }
      },
      (err) => {
        console.log(err);
        this.props.set_erroe_mesage(
          "Не удалось найти накладную номер " + this.props.store.my_disp.search
        );

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);

        this.props.set_active_window("disp_number");
      }
    );
  };

  render() {
    return (
      <div>
        <div
          onKeyDown={this.handleKeyDown.bind(this)}
          className="my_disp_control_panel my_disp_control_panel--s"
        >
          <input
            className="pod_input"
            value={this.props.store.my_disp.search}
            onChange={(e) => this.props.set_search(e.target.value)}
          ></input>

          <div>
            <Button
              style={{ marginTop: "-5px" }}
              size="mini"
              onClick={this.get_my_disp_data.bind(this)}
            >
              Открыть накладную
            </Button>
          </div>
        </div>

        {this.props.store.my_disp.error_mesage === "" ? null : (
          <div style={{ margin: "25px 0 0 5px" }}>
            {this.props.store.my_disp.error_mesage}
          </div>
        )}
      </div>
    );
  }
}

export default withCookies(
  connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    (dispatch) => ({
      set_type_search: (param) => {
        dispatch({ type: "set_type_search", payload: param });
      },
      set_search: (param) => {
        dispatch({ type: "set_search", payload: param });
      },
      set_my_disp_data: (param) => {
        dispatch({ type: "set_my_disp_data", payload: param });
      },
      set_my_disp_date_from: (param) => {
        dispatch({ type: "set_my_disp_date_from", payload: param });
      },
      set_my_disp_date_to: (param) => {
        dispatch({ type: "set_my_disp_date_to", payload: param });
      },
      set_my_disp_active_row: (param) => {
        dispatch({ type: "set_my_disp_active_row", payload: param });
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
      filter_common_string: (param) => {
        dispatch({ type: "filter_common_string", payload: param });
      },

      //set_my_disp_date_sort: () => {dispatch({ type: 'set_my_disp_date_sort'})},

      set_my_disp_num_filter: (param) => {
        dispatch({ type: "set_my_disp_num_filter", payload: param });
      },
      set_my_disp_sender_address: (param) => {
        dispatch({ type: "set_my_disp_sender_address", payload: param });
      },
      set_my_disp_rec_address: (param) => {
        dispatch({ type: "set_my_disp_rec_address", payload: param });
      },

      set_my_disp_focus_all_default: () => {
        dispatch({ type: "set_my_disp_focus_all_default" });
      },

      set_my_disp_focus_input_send_city: () => {
        dispatch({ type: "set_my_disp_focus_input_send_city" });
      },
      set_my_disp_send_city_filter_default: (param) => {
        dispatch({
          type: "set_my_disp_send_city_filter_default",
          payload: param,
        });
      },

      set_my_disp_focus_input_rec_city: () => {
        dispatch({ type: "set_my_disp_focus_input_rec_city" });
      },
      set_my_disp_rec_city_filter_default: (param) => {
        dispatch({
          type: "set_my_disp_rec_city_filter_default",
          payload: param,
        });
      },

      set_my_disp_focus_input_del_method: () => {
        dispatch({ type: "set_my_disp_focus_input_del_method" });
      },
      set_my_disp_del_method_filter_default: (param) => {
        dispatch({
          type: "set_my_disp_del_method_filter_default",
          payload: param,
        });
      },

      set_my_disp_focus_input_status: () => {
        dispatch({ type: "set_my_disp_focus_input_status" });
      },
      set_my_disp_status_filter_default: (param) => {
        dispatch({ type: "set_my_disp_status_filter_default", payload: param });
      },

      set_check_my_disp_send_city: (param) => {
        dispatch({ type: "set_check_my_disp_send_city", payload: param });
      },
      set_check_my_disp_rec_city: (param) => {
        dispatch({ type: "set_check_my_disp_rec_city", payload: param });
      },
      set_check_my_disp_del_method: (param) => {
        dispatch({ type: "set_check_my_disp_del_method", payload: param });
      },
      set_check_my_disp_status: (param) => {
        dispatch({ type: "set_check_my_disp_status", payload: param });
      },

      set_erroe_mesage: (param) => {
        dispatch({ type: "set_erroe_mesage", payload: param });
      },
    })
  )(Screen)
);
