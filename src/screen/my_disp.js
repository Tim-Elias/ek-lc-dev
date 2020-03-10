import React from 'react';
import { connect } from 'react-redux';
import { get_data } from './../common/common_modules'
import { withCookies } from 'react-cookie';
import { Header, Modal, Table } from 'semantic-ui-react'



class Screen extends React.Component {

  constructor(props) {
    super(props)
  }

  get_my_disp_data = () => {
    
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      date_from: this.props.store.my_disp.date_from,
      date_to: this.props.store.my_disp.date_to
    }

    //document.getElementById("date").value
    get_data('mydisplist',data).then(
      (result) => {
          this.props.set_active_window("my_disp");
          this.props.set_my_disp_data(result); 
      },
      (err) => { console.log(err) }
  );

  }

  tr_double_click = async (disp) => {
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      status: "Накладная",
      num: disp.Num
    };

    get_data('dispatch', data).then(
      (result) => {
        console.log(result)
        this.props.set_data_disp(result);
        this.props.set_active_window("disp");
        this.props.set_last_window("my_disp");
        
      },
      (err) => { console.log(err) }
    );


  };

  tr_click = async (index) => {
    this.props.set_my_disp_active_row(index)
  }

  click_up = () => {
    //console.log("click_up")
    if(this.props.store.my_disp.active_row > 0){
      this.props.set_my_disp_active_row(this.props.store.my_disp.active_row - 1)
    }
    
  }

  click_down = () => {
    const max_index = this.props.store.my_disp.data.length -1
    if(this.props.store.my_disp.active_row < max_index){
      this.props.set_my_disp_active_row(this.props.store.my_disp.active_row + 1)
    }
    
  }

  click_enter = () => {
    const disp = this.props.store.my_disp.data.filter((el,index)=>index==this.props.store.my_disp.active_row)[0]
    //console.log(disp)
    if (disp) { this.tr_double_click(disp)}
  }



  render() {

    const click_up = () => {this.click_up()}
    const click_down = () => {this.click_down()}
    const click_enter = () => {this.click_enter()}

    document.onkeydown = function (event) {
      try {
        if (event.keyCode === 38) {
          event.preventDefault();
          //console.log("Вверх")
          click_up()
          
        }
        if (event.keyCode === 40) {
          event.preventDefault();
          //console.log("Вниз")
          click_down()
        }
        if (event.keyCode === 13) {
          click_enter()
          //console.log("Enter")
         
        }

      } catch (e) { }
    };

    return (
      
      <div>
       
       <div className='my_disp_control_panel'>
         <div>Период:</div>
         <div><input onChange={e => this.props.set_my_disp_date_from(e.target.value)} value={this.props.store.my_disp.date_from} className="pod_input" type="date"></input></div>
         <div>-</div>
         <div><input onChange={e => this.props.set_my_disp_date_to(e.target.value)} value={this.props.store.my_disp.date_to}  className="pod_input" type="date"></input></div>
         <div><button onClick={this.get_my_disp_data.bind(this)}>Получить данные</button></div>
       
       
       </div>

       
      
        <div>
          {this.props.store.my_disp.data.length===0?(null):(
            <Table celled size='small' compact='very'>
              <Table.Header>
            <Table.Row>
              <Table.HeaderCell><div className='small_table_data'>Дата</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Номер</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Город отправителя</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Адрес отправителя</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Компания отправителя</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Город получателя</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Адрес получателя</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Компания получателя</div></Table.HeaderCell>

              <Table.HeaderCell><div className='small_table_data'>Мест</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Вес</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>V Вес</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Вид доставки</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Цена</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Статус</div></Table.HeaderCell>

              <Table.HeaderCell><div className='small_table_data'>Получатель</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Вручено</div></Table.HeaderCell>
              
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.props.store.my_disp.data.map((el,index)=>
            {
              let row_className = ''
              
              if (index === this.props.store.my_disp.active_row){
                row_className = 'active'
              } 

              //console.log(row_className)
              return (
              <Table.Row 
                className={row_className} 
                key={index} 
                onClick={this.tr_click.bind(this,index)}  
                onDoubleClick={this.tr_double_click.bind(this, el)}
              >
                <Table.Cell><div className='small_table_data'>{el.Date}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Num}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.SendCity}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.SendAdress}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.SendCompany}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.RecCity}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.RecAdress}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.RecCompany}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Total}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Weight}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Volume}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.DelMethod}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Price}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Status}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Recient}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.RecDate}</div></Table.Cell>
              </Table.Row>)}
          )}
          </Table.Body>
            </Table>
          )}
        </div>
      </div>


      
    );
  }
};

export default withCookies(connect(
  (state, ownProps) => ({store: state, cookies: ownProps.cookies}),
  dispatch => ({
    set_my_disp_date_from: (param) => { dispatch({ type: 'set_my_disp_date_from', payload: param }) },
    set_my_disp_date_to: (param) => { dispatch({ type: 'set_my_disp_date_to', payload: param }) },
    set_my_disp_data: (param) => { dispatch({ type: 'set_my_disp_data', payload: param }) },
    set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
    set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
    set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
    set_my_disp_active_row: (param) => { dispatch({ type: 'set_my_disp_active_row', payload: param }) },
  })
)(Screen));