import React from "react";

class Screen extends React.Component {
  render() {
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

export default Screen;
