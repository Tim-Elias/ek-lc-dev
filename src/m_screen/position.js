import React from "react";
import { connect } from "react-redux";

class Screen extends React.Component {
  mess = () => {
    // socket.send(this.props.store.test.message);
  };

  render() {
    return (
      <div>
        <div ref={(el) => (this.componentRef = el)}>
          <div className="check_print_qr">
            <br />

            <div
              className="check_print_row check_print_row--center"
              style={{ fontSize: "26px" }}
            >
              {this.props.store.disp.data.Number}
            </div>
            <br />

            <div className="check_print_row check_print_row--center">
              Данные отправителя
            </div>
            <div className="check_print_row">
              Город: {this.props.store.disp.data.SendCity}
            </div>
            <div className="check_print_row">
              Адрес: {this.props.store.disp.data.SendAdress}
            </div>
            <div className="check_print_row">
              Компания: {this.props.store.disp.data.SendCompany}
            </div>
            <div className="check_print_row">
              Телефон: {this.props.store.disp.data.SendPhone}
            </div>
            <div className="check_print_row">
              Контактное лицо: {this.props.store.disp.data.SendPerson}
            </div>
            <div className="check_print_row">
              Доп. информация: {this.props.store.disp.data.SendAddInfo}
            </div>
            <br />

            <div className="check_print_row check_print_row--center">
              Данные получателя
            </div>
            <div className="check_print_row">
              Город: {this.props.store.disp.data.RecCity}
            </div>
            <div className="check_print_row">
              Адрес: {this.props.store.disp.data.RecAdress}
            </div>
            <div className="check_print_row">
              Компания: {this.props.store.disp.data.RecCompany}
            </div>
            <div className="check_print_row">
              Телефон: {this.props.store.disp.data.RecPhone}
            </div>
            <div className="check_print_row">
              Контактное лицо: {this.props.store.disp.data.RecPerson}
            </div>
            <div className="check_print_row">
              Доп. информация: {this.props.store.disp.data.RecAddInfo}
            </div>
            <div className="check_print_row">
              Время: {this.props.store.disp.data.Time}
            </div>
            <br />

            <div className="check_print_row check_print_row--center">
              Данные об отправлении
            </div>
            <div className="check_print_row">
              Мест: {this.props.store.disp.data.Total}
            </div>
            <div className="check_print_row">
              Вес: {this.props.store.disp.data.Weight} кг.
            </div>
            <div className="check_print_row">
              V вес: {this.props.store.disp.data.Volume} кг.
            </div>

            {this.props.store.disp.data.TMin !== "0" &&
            this.props.store.disp.data.TMax !== "0" ? (
              <div>
                <div className="check_print_row">Температурный режим:</div>
                <div className="check_print_row">
                  {this.props.store.disp.data.TMin} :{" "}
                  {this.props.store.disp.data.TMax}
                </div>
              </div>
            ) : null}

            {this.props.store.disp.data.Type === "Доставка" ? (
              <div>
                <div className="check_print_row">
                  Тип оплаты: {this.props.store.disp.data.PayType}
                </div>
                <div className="check_print_row">
                  Тип доставки: {this.props.store.disp.data.DelType}
                </div>
              </div>
            ) : null}

            <br />

            <div className="check_print_row check_print_row--center">
              Данные об оплате
            </div>
            <div className="check_print_row">
              Плательщик: {this.props.store.disp.data.Customer}
            </div>
            <div className="check_print_row">
              Срочность: {this.props.store.disp.data.DelType}
            </div>
            <div className="check_print_row">
              Вид доставки: {this.props.store.disp.data.DelMethod}
            </div>
            <div className="check_print_row">
              Оплата: {this.props.store.disp.data.PayType}
            </div>
            <div className="check_print_row">
              Наложенный платеж: {this.props.store.disp.data.COD} руб.
            </div>
            <br />

            <div className="check_print_row">Информация о вручении:</div>
            <br />

            <div className="check_print_line check_print_line"></div>
            <div className="check_print_line_container">
              <div className="check_print_row check_print_row--center">
                Дата
              </div>
              <div className="check_print_row check_print_row--center">
                Время
              </div>
            </div>
            <br />

            <div className="check_print_line"></div>
            <div className="check_print_line_container">
              <div className="check_print_row">Получатель</div>
            </div>
            <br />

            <div className="check_print_line"></div>
            <div className="check_print_line_container">
              <div className="check_print_row">Подпись</div>
            </div>

            <div className="check_print_line"></div>
            <div className="check_print_line_container">
              <div className="check_print_row">Курьер</div>
            </div>
            <br />

            <div className="check_print_line"></div>
            <div className="check_print_line_container">
              <div className="check_print_row">Подпись</div>
            </div>
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
  (dispatch) => ({
    set_message: (param) => {
      dispatch({ type: "set_message", payload: param });
    },
  }),
)(Screen);
