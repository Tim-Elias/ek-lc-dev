import React from 'react';
import { connect } from 'react-redux';
import './send_manifest.css'
import { Header, Modal, Table, Button } from 'semantic-ui-react'

import { get_data } from './../common/common_modules'


class Screen extends React.Component {

  search = () => {
    this.props.set_search_send_manifest_error("")
    const num = this.props.store.send_manifest.search
    if (this.props.store.storage.list.filter((el) => { if (el.selected && el.Number === num) { return (el) } }).length === 1) {
      this.props.set_search_send_manifest_error(`Накладная ${num} уже добавлена`)
    }

    else if (this.props.store.storage.list.filter((el) => { if (!el.selected && el.Number === num) { return (el) } }).length === 1) {
      this.props.select_disp(num)
    }

    else if (this.props.store.storage.list.filter((el) => { if (!el.selected && el.Number === num) { return (el) } }).length === 0) {
      this.props.set_search_send_manifest_error(`Накладная ${num} не найдена`)
    }

  }

  send_manifest = () => {

    this.props.set_active_window("wait");

    const dispatches = this.props.store.storage.list.filter((el) => { if (el.selected) return el }).map((disp) => { return disp.Number })
    const data = {
      userkey: this.props.store.login.userkey,
      dispatches: dispatches,
      storehouse: this.props.store.send_manifest.storehouse,
    };

    get_data('sendmanifest', data).then(
      (result) => {
        
        get_data('list', { userkey: this.props.store.login.userkey }).then(
          (result) => {
            this.props.set_list_storage(result);
            this.props.set_active_window("storage");
          },

          (err) => {
            this.props.modules.set_modal_show(true)
            this.props.modules.set_modal_header('Ошибка')
            this.props.modules.set_modal_text(err)

            this.props.set_active_window("storage");
            console.log(err)
          }
        );
      },
      (err) => {
        this.props.modules.set_modal_show(true)
        this.props.modules.set_modal_header('Ошибка')
        this.props.modules.set_modal_text(err)

        this.props.set_active_window("send_manifest");
        this.props.set_search_error(err)
      }
    );
  }

  render() {
    document.onkeydown = function (event) {}

    const search = () => {
      this.search();
    };

    document.onkeydown = function (event) {
      try {

        if (event.keyCode === 13) {
          search()
        }

      } catch (e) { }
    };

    return (

      <div>

        <h3>Формирование исходящего манифеста</h3>

        <select value={this.props.store.send_manifest.storehouse} onChange={e => this.props.set_send_manifest_storehouse(e.target.value)}>
          <option value="000000001">Новосибирск, Коммунистическая 7</option>
          <option value="000000006">Красноярск Караульная 4стр1</option>
          <option value="000000002">Кемерово Рукавишникова 26</option>
          <option value="000000009">Барнаул, Молодежная 111</option>
          <option value="000000008">Омск, Потанина 15</option>
          <option value="000000007">Томск, Герцена 13а</option>
        </select>

        <div className="search">
          <div className="search_label">Введите номер</div>
          <div className="search_data"><input value={this.props.store.send_manifest.search} className="search_data_input" onChange={e => this.props.set_search_send_manifest(e.target.value)}></input></div>
          <div className="search_button_area">
            <button id="search_button" onClick={this.search.bind(this)} className="send_pod">Добавить</button>
          </div>
        </div>
        <div className="search_error">{this.props.store.reciept.error}</div>

        {this.props.store.storage.list.filter((el) => { if (el.selected) return el }).length !== 0 ? (
          <div>

            <Table>

              <Table.Header>
                <Table.Row >
                  <Table.HeaderCell>Дата</Table.HeaderCell>
                  <Table.HeaderCell>Тип</Table.HeaderCell>
                  <Table.HeaderCell>Заказчик</Table.HeaderCell>
                  <Table.HeaderCell>Номер накладной</Table.HeaderCell>
                  <Table.HeaderCell>Адрес</Table.HeaderCell>
                  <Table.HeaderCell>Телефон</Table.HeaderCell>
                  <Table.HeaderCell>Контактное лицо</Table.HeaderCell>
                  <Table.HeaderCell>К оплате</Table.HeaderCell>
                  <Table.HeaderCell>Количество мест</Table.HeaderCell>
                  <Table.HeaderCell>Вес</Table.HeaderCell>

                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.store.storage.list.filter((el) => { if (el.selected) return el }).map((disp, index) =>

                  <Table.Row key={index} >
                    <Table.Cell>{disp.Date}</Table.Cell>
                    <Table.Cell>{disp.Type}</Table.Cell>
                    <Table.Cell>{disp.Customer}</Table.Cell>
                    <Table.Cell>{disp.Number}</Table.Cell>
                    <Table.Cell>{disp.Adress}</Table.Cell>
                    <Table.Cell>{disp.Phone}</Table.Cell>
                    <Table.Cell>{disp.Person}</Table.Cell>
                    <Table.Cell>{disp.COD}</Table.Cell>
                    <Table.Cell>{disp.total}</Table.Cell>
                    <Table.Cell>{disp.weight}</Table.Cell>

                  </Table.Row>)}
              </Table.Body>
            </Table>
          </div>) : ('')}

        <div className="disp_data_el">Отправить на склад: накладных: {this.props.store.storage.list.filter((el) => { if (el.selected) return el }).length} (мест: {this.props.store.storage.list.filter((el) => { if (el.selected) return el }).reduce((sum, el) => { return sum + parseInt(el.total) }, 0)})</div>
        <button onClick={this.send_manifest.bind(this)} className="send_manifest">Отправить и закрыть</button>

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
    set_send_manifest_storehouse: (param) => { dispatch({ type: 'set_send_manifest_storehouse', payload: param }) },
    set_search_send_manifest: (param) => { dispatch({ type: 'set_search_send_manifest', payload: param }) },
    set_search_send_manifest_error: (param) => { dispatch({ type: 'set_search_error', payload: param }) },
    select_disp: (param) => { dispatch({ type: 'select_disp', payload: param }) },
    set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
  })
)(Screen);