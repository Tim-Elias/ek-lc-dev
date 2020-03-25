import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table} from 'semantic-ui-react'
import { get_data } from './../common/common_modules'

class Screen extends React.Component {

    create_disp_template = () =>{
        this.props.reset_selected_disp_template()
        this.props.modules.set_active_window('disp_template')
        this.props.modules.set_last_window('disp_template_list')
    }


    tr_double_click = (el) =>{
        
        
        const city = this.props.store.create_disp.CityList.filter((list_el)=>list_el.value === el.City)[0]

        
        
        //console.log(city)
        
        const city_label = city.label
        this.props.modules.set_active_window('wait')
        get_data('terminallist', {city: city_label}).then(
            (result) => {
              
              let crrent_terminal = {}
              this.props.set_disp_template_terminal_list(result)
              if (result.length === 0) {
                this.props.set_selected_disp_template_Terminal(false)
              } else {
                  if (el.Terminal) {
                    crrent_terminal = result.filter((list_el)=>list_el.value === el.CurrentTerminal)[0]
                    //this.props.set_selected_disp_template_CurrentTerminal(crrent_terminal)
                  }
              }
              this.props.set_selected_disp_template({...el, City: city, CurrentTerminal: crrent_terminal})
              this.props.modules.set_active_window('disp_template')
                this.props.modules.set_last_window('disp_template_list')
            },
            (err) => { 
                console.log("err")  
                console.log(err) 
            }
        );
        
    }

    render() {
        document.onkeydown = function (event) {}
        return (
            <div>
                <div className="disp_Number">
                    <div><Button compact icon onClick={this.props.modules.back}>
                        <Icon name='arrow left' />
                    </Button>
                        <b className='page_header'>Шаблоны отправителей и получателей</b>
                    </div>
                </div>

                <Table celled size='small' compact='very'>
              <Table.Header>
            <Table.Row>
            <Table.HeaderCell><div className='small_table_data'>Имя</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Город</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Адрес</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Телефон</div></Table.HeaderCell>
            <Table.HeaderCell><div className='small_table_data'>Контактное лицо</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Компания</div></Table.HeaderCell>
              <Table.HeaderCell><div className='small_table_data'>Доп.инфо</div></Table.HeaderCell>
              

              
            </Table.Row>
          </Table.Header>
          <Table.Body>
                {
                    this.props.store.upload_manifest.disp_template_list.map((el, index) => {
                        return (
                            <Table.Row 
                //className={row_className} 
                key={el.Key} 
                //onClick={this.tr_click.bind(this,index)}  
                onDoubleClick={this.tr_double_click.bind(this, el)}
              >
              <Table.Cell><div className='small_table_data'>{el.label}</div></Table.Cell>
              <Table.Cell><div className='small_table_data'>{el.City}</div></Table.Cell>
              <Table.Cell><div className='small_table_data'>{el.Terminal ? (el.CurrentTerminal + " (Cклад)"):(el.Adress)}</div></Table.Cell>
              <Table.Cell><div className='small_table_data'>{el.Phone}</div></Table.Cell>
              <Table.Cell><div className='small_table_data'>{el.Person}</div></Table.Cell>
              <Table.Cell><div className='small_table_data'>{el.Company}</div></Table.Cell>
              <Table.Cell><div className='small_table_data'>{el.AddInfo}</div></Table.Cell>

              </Table.Row>
                        )
                    })
                }
                 </Table.Body>
            </Table>
            <Button onClick={this.create_disp_template.bind(this)}>Создать шаблон</Button>
            </div>
        )
    }
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_selected_disp_template: (param) => { dispatch({ type: 'set_selected_disp_template', payload: param }) },
        set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
        set_selected_disp_template_Terminal: (param) => { dispatch({ type: 'set_selected_disp_template_Terminal', payload: param }) },
        set_disp_template_terminal_list: (param) => { dispatch({ type: 'set_disp_template_terminal_list', payload: param }) },
        set_selected_disp_template_CurrentTerminal: (param) => { dispatch({ type: 'set_selected_disp_template_CurrentTerminal', payload: param }) },
        reset_selected_disp_template: (param) => { dispatch({ type: 'reset_selected_disp_template', payload: param }) },
    })
)(Screen);