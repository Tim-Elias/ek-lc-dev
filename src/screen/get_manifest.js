import React from 'react';
import { connect } from 'react-redux';

import { get_data } from './../common/common_modules'


class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  update = () => {
    this.props.set_active_window("wait");
    const list_data = { userkey: this.props.store.login.userkey };

    get_data('enroute', list_data).then(
      (result) => {
        this.props.set_list_get_manifest(result);
      },
      (err) => { console.log(err) }
    );

  };



  tr_click(num) {
    this.props.set_active_get_manifest(num);
  };

  tr_double_click = (num) => {
    this.props.set_active_window("wait");
    const data = {
      userkey: this.props.store.login.userkey,
      num: num
    };

    get_data('manifestenroute', data).then(
      (result) => {
        console.log(result)
        this.props.set_data_manifest(result);
        this.props.set_active_window("manifest");
        this.props.set_action_manifest("get");
      },
      (err) => { console.log(err) }
    );

  };

  render() {

    document.onkeydown = function (event) {}
    
    const tr_click = (name) => {
      this.tr_click(name);
    };

    const tr_double_click = (disp) => {
      this.tr_double_click(disp);
    };

    document.onkeydown = function (event) {
      try {
        if (event.keyCode === 38) {
          event.preventDefault();
          console.log("Вверх")
          let currentId = parseInt(document.getElementsByClassName('active')[0].getAttribute("id"));
          let updisp = document.getElementById((currentId - 1).toString());
          if (updisp !== null) { tr_click(updisp.getAttribute("name")); }
        }
        if (event.keyCode === 40) {
          event.preventDefault();
          console.log("Вниз")
          let currentId = parseInt(document.getElementsByClassName('active')[0].getAttribute("id"));
          let updisp = document.getElementById((currentId + 1).toString());
          if (updisp !== null) { tr_click(updisp.getAttribute("name")); }
        }
        if (event.keyCode === 13) {tr_double_click(document.getElementsByClassName('active')[0].getAttribute("name"))}

      } catch (e) { }
    };

    return (
      <div>
        <div>

          <h3>Входящие манифесты</h3>

        </div>
        <div>
          <button onClick={this.update.bind(this)} >Обновить данные</button>

          {this.props.store.get_manifest.list.length !== 0 ? (
            <div>
              <table>
                <thead>
                  <tr >
                    <th>Дата отправления</th>
                    <th>Номер менифеста</th>
                    <th>Склад отправления</th>
                    <th>Перевозчик</th>
                    <th>Количество накладных</th>
                    <th>Общее количество мест</th>
                    <th>Общий вес</th>
                  </tr>
                </thead>

                {this.props.store.get_manifest.list.map((disp, index) =>
                  <tbody key={index}>

                    {disp.num === this.props.store.get_manifest.active ? (
                      <tr className='active' id={index} name={disp.num} onClick={this.tr_click.bind(this, disp.num)} onDoubleClick={this.tr_double_click.bind(this, disp.num)} key={index} >

                        <td>{disp.date}</td>
                        <td>{disp.num}</td>
                        <td>{disp.sender}</td>
                        <td>{disp.carrier}</td>
                        <td>{disp.totaldisp}</td>
                        <td>{disp.total}</td>
                        <td>{disp.totalweight}</td>
                      </tr>) : (<tr onClick={this.tr_click.bind(this, disp.num)} id={index} name={disp.num} key={index} >

                        <td>{disp.date}</td>
                        <td>{disp.num}</td>
                        <td>{disp.sender}</td>
                        <td>{disp.carrier}</td>
                        <td>{disp.totaldisp}</td>
                        <td>{disp.total}</td>
                        <td>{disp.totalweight}</td>

                      </tr>)}
                  </tbody>

                )}

              </table>
            </div>) : ("Нет ожидаемых входящих манифестов")}
        </div>
      </div>
    );
  }
};

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
    set_list_get_manifest: (param) => { dispatch({ type: 'set_list_get_manifest', payload: param }) },
    set_active_get_manifest: (param) => { dispatch({ type: 'set_active_get_manifest', payload: param }) },

    set_action_manifest: (param) => { dispatch({ type: 'set_action_manifest', payload: param }) },
    set_data_manifest: (param) => { dispatch({ type: 'set_data_manifest', payload: param }) },
  })
)(Screen);