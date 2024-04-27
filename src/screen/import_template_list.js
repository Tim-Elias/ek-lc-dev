import React from "react";
import { connect } from "react-redux";

class Screen extends React.Component {
  tr_double_click = () => {
    this.props.modules.set_active_window("import_template");
    this.props.modules.set_last_window("import_template_list");
  };

  render() {
    return (
      <div>
        <div className="disp_Number">
          <div>
            <button onClick={this.props.modules.back}>
              <i className="ek-arrow-left" />
            </button>
            <b className="page_header">Шаблоны импорта</b>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <div className="small_table_data">Наименование шаблона</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.upload_manifest.import_template_list.map((el) => {
              return (
                <tr
                  key={el.Key}
                  onDoubleClick={this.tr_double_click.bind(this, el)}
                >
                  <td>
                    <div className="small_table_data">{el.label}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    set_last_window: (param) => {
      dispatch({ type: "set_last_window", payload: param });
    },
  }),
)(Screen);
