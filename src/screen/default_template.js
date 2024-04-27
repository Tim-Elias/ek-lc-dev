import React from "react";
import { connect } from "react-redux";

class Screen extends React.Component {
  render() {
    return (
      <div>
        <div className="disp_Number">
          <div>
            <button onClick={this.props.modules.back}>
              <i className="ek-arrow-left" />
            </button>
            <b className="page_header">Шаблон значений по умолчанию</b>
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
