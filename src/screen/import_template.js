import React from "react";
import { connect } from "react-redux";

class Screen extends React.Component {
  render() {
    document.onkeydown = function (event) {};
    return (
      <div>
        <div className="disp_Number">
          <div>
            <button onClick={this.props.modules.back}>
              <i className="ek-arrow-left" />
            </button>
            <b className="page_header">Шаблон импорта</b>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({}),
)(Screen);
