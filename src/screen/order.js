import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react'
import { get_data, get_file } from './../common/common_modules'

class Screen extends React.Component {

    tr_double_click = async (disp) => {
        this.props.set_active_window("wait");
    
        const data = {
          userkey: this.props.store.login.userkey,
          status: "Накладная",
          num: disp.Num
        };
    
        get_data('dispatch', data).then(
          (result) => {
            
            this.props.set_data_disp(result);
            this.props.set_active_window("disp");
            this.props.set_last_window("order");
            
          },
          (err) => { console.log(err) }
        );
    
    
      };

    back = () => {

        const last_window = this.props.store.general.last_window[this.props.store.general.last_window.length -1]
        this.props.pop_last_window();
        this.props.set_active_window(last_window);
    }

    get_order = () => {       
        get_file(this.props.store.login.userkey,'order',this.props.store.order.data.Key,'Счёт '+this.props.store.order.data.Number+'.pdf')
    }

    get_act = () => {
        get_file(this.props.store.login.userkey,'act',this.props.store.order.data.Key,'Акт '+this.props.store.order.data.Number+'.pdf')
    }

    get_cf = () => {
        get_file(this.props.store.login.userkey,'cf',this.props.store.order.data.Key,'СФ '+this.props.store.order.data.Number+'.pdf')
    }

    render() {
        return (
        <div>
           <div className="disp_Number">
                <div><Button compact icon onClick={this.back.bind(this)}>
                        <Icon name='arrow left' />
                    </Button>  
                    <b className='page_header'>Реализация № {this.props.store.order.data.Number} от {this.props.store.order.data.Date}</b>
                    <Button onClick={this.get_order.bind(this)} >Счёт</Button>
                    <Button onClick={this.get_act.bind(this)} >Акт</Button>
                    {this.props.store.order.data.VAT === 0 ? (null):(<Button onClick={this.get_cf.bind(this)} >Счёт-фактура</Button>)}
                </div>
            </div>
            <div className="disp_customer_data">
                    <div className="disp_data_label">Заказчик:</div>
                    <div className="disp_data_el">{this.props.store.order.data.Customer}</div>
                    <div className="disp_data_label">Исполнитель:</div>
                    <div className="disp_data_el">{this.props.store.order.data.Executor}</div>
            </div>
            {this.props.store.order.data.UseNomenclature ? (
                <Table celled size='small' compact='very'>
                <Table.Header>
              <Table.Row>
              <Table.HeaderCell><div className='small_table_data'>Наименование</div></Table.HeaderCell>
                <Table.HeaderCell><div className='small_table_data'>Сумма</div></Table.HeaderCell>
           </Table.Row>
            </Table.Header>
            <Table.Body>
            {this.props.store.order.nomenclature.map((el,index)=>
              {
                let row_className = ''
                
              //   if (index === this.props.store.my_disp.active_row){
              //     row_className = 'active'
              //   } 
  
                //console.log(row_className)
                return (
                <Table.Row 
                  className={row_className} 
                  key={index} 
                  //onClick={this.tr_click.bind(this,index)}  
                  //onDoubleClick={this.tr_double_click.bind(this, el)}
                >
                  <Table.Cell><div className='small_table_data'>{el.Name}</div></Table.Cell>
                  <Table.Cell><div className='small_table_data'>{el.Summ}</div></Table.Cell>
  
                </Table.Row>)}
            )}
            </Table.Body>
              </Table>
            ):(
            <Table celled size='small' compact='very'>
              <Table.Header>
            <Table.Row>
            <Table.HeaderCell><div className='small_table_data'>Дата</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Накладная</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Город отправителя</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Город получателя</div></Table.HeaderCell>
            <Table.HeaderCell><div className='small_table_data'>Мест</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Вес</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Вид доставки</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Сумма</div></Table.HeaderCell>

              
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.props.store.order.dispatches.map((el,index)=>
            {
              let row_className = ''
              
            //   if (index === this.props.store.my_disp.active_row){
            //     row_className = 'active'
            //   } 

              //console.log(row_className)
              return (
              <Table.Row 
                className={row_className} 
                key={index} 
                //onClick={this.tr_click.bind(this,index)}  
                onDoubleClick={this.tr_double_click.bind(this, el)}
              >
                <Table.Cell><div className='small_table_data'>{el.Date}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Num}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.SendCity}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.RecCity}</div></Table.Cell>

                <Table.Cell><div className='small_table_data'>{el.Total}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Weight}</div></Table.Cell>

                <Table.Cell><div className='small_table_data'>{el.DelMethod}</div></Table.Cell>
                <Table.Cell><div className='small_table_data'>{el.Summ}</div></Table.Cell>

              </Table.Row>)}
          )}
          </Table.Body>
            </Table>)}
            
            <div className="disp_customer_data">
                    <div className="disp_data_label">Итого:</div>
                    <div className="disp_data_el">{this.props.store.order.data.Summ}</div>
                    {this.props.store.order.data.SummVAT === '' ? (null):(
                        <div className="disp_data_label">В том числе НДС:</div>
                    )}
                    {this.props.store.order.data.SummVAT === '' ? (null):(
                        <div className="disp_data_el">{this.props.store.order.data.SummVAT}</div>  
                    )}
                    
                    
            </div>

            
        </div>)
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
        set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
        pop_last_window: () => { dispatch({ type: 'pop_last_window'}) },
    })
)(Screen);