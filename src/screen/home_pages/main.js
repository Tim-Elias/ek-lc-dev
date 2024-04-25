import React from "react";
import { connect } from "react-redux";
import transit from "./../../common/transit-2.png";

class Screen extends React.Component {
  render() {
    return (
      <div className="home_main">
        <div className="models" style={{ backgroundImage: `url(${transit})` }}>
          <div className="home_main">
            <div className="image_row">
              <div className="image_header">Срочная доставка</div>
              <div className="image_header">документов и грузов</div>
              <div className="image_text">по городам Сибири</div>
            </div>
          </div>
        </div>

        <div className="home_2_row">
          <div className="row_2_header">92 слова о тебе</div>
          <div className="row_2_text">
            <p className="dline">Приветствую тебя, любимый наш Клиент. </p>
            <p className="dline">
              Самое драгоценное, что у нас есть, это твое доверие.{" "}
            </p>
            <p className="dline">
              И будь уверен, каждый день мы работаем так, чтобы заслужить его
              снова и снова.{" "}
            </p>
            <p className="dline">
              Каждый день мы принимаем, перевозим и доставляем твои грузы.{" "}
            </p>
            <p className="dline">Делаем это бережно и вовремя. </p>
            <p className="dline">
              В любое время, что бы ни случилось, ты можешь положиться на нас.{" "}
            </p>
            <p className="dline">
              Все твои задачи по перевозке и экспедированию грузов будут решены.{" "}
            </p>
            <p className="dline">
              Сроки, терморежим, и любые другие индивидуальные условия работы не
              являются проблемой.{" "}
            </p>
            <p className="dline">Просто скажи, что нужно, и мы всё сделаем. </p>
            <p className="dline">
              Мы ценим тебя, и очень надеемся, что это взаимно.
            </p>
          </div>
        </div>

        <div className="home_3_row"></div>
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
    rotate: () => {
      dispatch({ type: "rotate" });
    },
  })
)(Screen);
