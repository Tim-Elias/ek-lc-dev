import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { customStyles } from "./../../common/common_style";
import { Button } from "semantic-ui-react";

const oop_list = [
  { label: "ООО", value: "ООО" },
  { label: "ПАО", value: "ПАО" },
  { label: "Другое", value: "Другое" },
];

class Screen extends React.Component {
  render() {
    return (
      <div>
        <div className="disp_Number">
          Предоставление данных для заключения договора оказания транспортных
          услуг
        </div>
        <div className="contract_data">
          <Button onClick={() => this.props.set_org_type(true)}>
            Организация
          </Button>

          <Button onClick={() => this.props.set_org_type(false)}>
            Индивидуальный предпрениматель
          </Button>

          {/* <div className="disp_data_label">Организация</div>
                    <div>
                        <input
                            name="send_type"
                            type="radio"
                            onChange={() => this.props.set_org_type(true)}
                            checked={this.props.store.home.org_type}>
                        </input>
                    </div>
                    <div className="disp_data_label">Индивидуальный предпрениматель</div>
                    <div>
                        <input
                            name="send_type"
                            type="radio"
                            onChange={() => this.props.set_org_type(false)}
                            checked={!this.props.store.home.org_type}>
                        </input>
                    </div> */}
        </div>
        {this.props.store.home.org_type ? (
          <div className="contract_data">
            <div className="disp_data_label">
              {" "}
              Организационно-правовая форма:
            </div>
            <div className="disp_data_el">
              <Select
                options={oop_list}
                styles={customStyles}
                value={this.props.store.home.oop}
                onChange={(values) => this.props.set_oop(values)}
              />
            </div>
            <div className="disp_data_label"> Наименование Организации:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_Number"> Подписант договора</div> <div></div>
            <div className="disp_data_label">Ф.И.О.:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">Должность:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label"> действующий на основании:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_Number">Реквизиты организации</div> <div></div>
            <div className="disp_data_label">Юридический адрес</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">ИНН Организации</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">КПП Организации</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_Number">Банковские реквизиты</div> <div></div>
            <div className="disp_data_label">Номер расчетного счета</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">Наименование банка</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">БИК Банка</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">Номер корр. счета Банка</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_Number">Контактные данные</div> <div></div>
            <div className="disp_data_label">Контактное лицо (Ф.И.О.):</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">Контактное лицо (Должность):</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">Контактный телефон:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
            <div className="disp_data_label">Адрес электронной почты:</div>
            <div className="disp_data_el">
              <input
                className="create_disp_data_input"
                //onChange={e => this.props.SetSendCompany(e.target.value)}
                //value={this.props.store.create_disp.SendCompany}
                type="text"
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
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
    set_org_type: (param) => {
      dispatch({ type: "set_org_type", payload: param });
    },
    set_oop: (param) => {
      dispatch({ type: "set_oop", payload: param });
    },
  })
)(Screen);
