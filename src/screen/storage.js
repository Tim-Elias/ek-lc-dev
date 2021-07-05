import React from 'react';
import { connect } from 'react-redux';
import { Header, Modal, Table, Button } from 'semantic-ui-react'
import { get_data } from './../common/common_modules'


class Screen extends React.Component {

  constructor(props) {
    super(props);
    this.datefrom = React.createRef();
    this.dateto = React.createRef();
  }

  handleButtonPress () {
    this.buttonPressTimer = setTimeout(() => alert('long press activated'), 1500);
  }

  handleButtonRelease () {
    clearTimeout(this.buttonPressTimer);
  }

  update = () => {
    this.props.set_active_window("wait");
    const list_data = { userkey: this.props.store.login.userkey };

    get_data('list', list_data).then(
      (result) => {
        this.props.set_list_storage(result);
        this.props.set_active_window("storage");
      },
      (err) => { 
        console.log(err) 
      
        this.props.modules.set_modal_show(true)
        this.props.modules.set_modal_header('Ошибка')
        this.props.modules.set_modal_text(err)
      }
    );

  };

  tr_click(num) {
    console.log('num is ', num);
    this.props.set_active_storage(num);
  };

  tr_double_click = async (disp) => {
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      status: disp.Type,
      num: disp.Number
    };

    get_data('dispatch', data).then(
      (result) => {
        console.log(result)
        this.props.set_data_disp(result);
        this.props.set_active_window("disp");
        this.props.set_last_window("storage");
        this.props.set_action("deliver");
      },
      (err) => { 
        console.log(err) 
      
        this.props.modules.set_modal_show(true)
        this.props.modules.set_modal_header('Ошибка')
        this.props.modules.set_modal_text(err)
      }
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
        if (event.keyCode === 13) {
          const num = document.getElementsByClassName('active')[0].getAttribute("name");
          const status = document.getElementsByClassName('active')[0].getAttribute("status");
          console.log("Enter")
          tr_double_click({ Number: num, Type: status });
        }

      } catch (e) { }
    };

    return (
      <div>
        <div>

          <h3>Накладные на складе</h3>

        </div>
        <div>
          {this.props.store.storage.active !== null ? (<div>
            <button onClick={this.update.bind(this)} >Обновить данные</button>
            {/* <button >Скопировать</button>
                      <button >Печать</button> */}
          </div>) : (<div>
            <button onClick={this.update.bind(this)} >Обновить данные</button>
            {/* <button disabled >Скопировать</button>
                      <button disabled >Печать</button> */}
          </div>)}
          <div className="search_storage">
          <div className="disp_data_label">Поиск по номеру</div>
          <div className="disp_data_input"><input className="pod_input" value={this.props.store.storage.search} onChange={e => this.props.set_search_storagre(e.target.value)}></input></div>
          </div>
          {this.props.store.storage.list.length !== 0 ? (
            <div>

<Table celled size='small' compact='very'>

<Table.Header>
<Table.Row>
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

                {this.props.store.storage.list.filter((el)=>this.props.store.storage.search === "" || el.Number.indexOf(this.props.store.storage.search) !== -1).map((disp, index) =>
                  <Table.Body key={index}>

                    {disp.Number === this.props.store.storage.active ? (
                      <Table.Row className='active' id={index} name={disp.Number} status={disp.Type} onKeyDown={console.log('Key down')} 
                      onClick={this.tr_click.bind(this, disp.Number)} 
                      onTouchStart={this.handleButtonPress.bind(this)} 
                      onTouchEnd={this.handleButtonRelease.bind(this)} 
                      onDoubleClick={this.tr_double_click.bind(this, disp)} key={index} >

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


                      </Table.Row>) : (<Table.Row onClick={this.tr_click.bind(this, disp.Number)} id={index} name={disp.Number} key={index} >
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

                )}

              </Table>
            </div>) : ('')}
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
    set_search_storagre: (param) => { dispatch({ type: 'set_search_storagre', payload: param }) },
    set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
    set_last_window: () => { dispatch({ type: 'set_last_window', payload: "storage" }) },
    set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
    set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
    set_active_storage: (param) => { dispatch({ type: 'set_active_storage', payload: param }) },
    set_action: (param) => { dispatch({ type: 'set_action', payload: param }) },
  })
)(Screen);
