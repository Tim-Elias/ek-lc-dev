import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

class Screen extends React.Component {
  render() {
    document.onkeydown = function (event) {};
    return (
      <div>
        <div className="disp_Number">
          <div>
            <button onClick={this.props.modules.back}>
              <Icon name="arrow left" />
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
  (dispatch) => ({})
)(Screen);
