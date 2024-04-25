import React from "react";
import { connect } from "react-redux";
import { Button, Icon, Table } from "semantic-ui-react";

class Screen extends React.Component {
  tr_double_click = (el) => {
    this.props.modules.set_active_window("import_template");
    this.props.modules.set_last_window("import_template_list");
  };

  render() {
    document.onkeydown = function (event) {};
    return (
      <div>
        <div className="disp_Number">
          <div>
            <Button compact icon onClick={this.props.modules.back}>
              <Icon name="arrow left" />
            </Button>
            <b className="page_header">Шаблоны импорта</b>
          </div>
        </div>

        <Table celled size="small" compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <div className="small_table_data">Наименование шаблона</div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.store.upload_manifest.import_template_list.map(
              (el, index) => {
                return (
                  <Table.Row
                    //className={row_className}
                    key={el.Key}
                    //onClick={this.tr_click.bind(this,index)}
                    onDoubleClick={this.tr_double_click.bind(this, el)}
                  >
                    <Table.Cell>
                      <div className="small_table_data">{el.label}</div>
                    </Table.Cell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
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
  })
)(Screen);
