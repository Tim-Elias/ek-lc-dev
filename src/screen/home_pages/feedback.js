import React from "react";
import { connect } from "react-redux";

class Screen extends React.Component {
  render() {
    return <div>Обратная связь</div>;
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
  })
)(Screen);
