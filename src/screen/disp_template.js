import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table } from 'semantic-ui-react'
import Select from 'react-select'
import { customStyles } from "./../common/common_style";
import { get_data } from './../common/common_modules'
import './templates.css'

class Screen extends React.Component {

    remove_disp_template = () =>{

        const data = {
            Key: this.props.store.templates.selected_disp_template.Key,
            userkey: this.props.store.login.userkey,
        }

        get_data('removedisptemplate', data).then(
            (result) => {
            
                get_data('disptemplatelist', { userkey: this.props.store.login.userkey }).then(
                    (result) => {
                        this.props.set_disp_template_list(result);
                        this.props.modules.back()
                    },
                    (err) => { console.log(err) }
                );
              
            },
            (err) => { 
                console.log("err")  
                console.log(err) 
            }
        );
    }

    set_selected_disp_template_Terminal = (value) => {
        this.props.set_selected_disp_template_Terminal(value)
    }

    set_selected_disp_template_City = (value) => {

        this.props.set_selected_disp_template_City(value)

        const city_label = value.label

        get_data('terminallist', {city: city_label}).then(
            (result) => {
              
            this.props.set_disp_template_terminal_list(result)
              if (result.length === 0) {
                this.props.set_selected_disp_template_Terminal(false)
              }
              
            },
            (err) => { 
                console.log("err")  
                console.log(err) 
            }
        );
    }

    save = () =>{

        const data={
            IsNew: this.props.store.templates.selected_disp_template.IsNew,
            Key: this.props.store.templates.selected_disp_template.Key,
            userkey: this.props.store.login.userkey,
            Adress: this.props.store.templates.selected_disp_template.Adress,
            Phone: this.props.store.templates.selected_disp_template.Phone,
            AddInfo: this.props.store.templates.selected_disp_template.AddInfo,
            City: this.props.store.templates.selected_disp_template.City.label,
            Person: this.props.store.templates.selected_disp_template.Person,
            Company: this.props.store.templates.selected_disp_template.Company,
            Terminal: this.props.store.templates.selected_disp_template.Terminal,
            CurrentTerminal: this.props.store.templates.selected_disp_template.CurrentTerminal.label,
            Name: this.props.store.templates.selected_disp_template.label,
            
        }

        get_data('editdisptemplate', data).then(
            (result) => {
                get_data('disptemplatelist', { userkey: this.props.store.login.userkey }).then(
                    (result) => {
                        this.props.set_disp_template_list(result);
                        this.props.modules.back()
                    },
                    (err) => { console.log(err) }
                );
              
            },
            (err) => { 
                console.log("err")  
                console.log(err) 
            }
        );
    }


    render() {
        document.onkeydown = function (event) {}
        let changed = false
        if (JSON.stringify(this.props.store.templates.selected_disp_template)!==JSON.stringify(this.props.store.templates.original_data_disp_template)){
            changed = true
        }
        return (
            <div>
                <div className="disp_Number">
                    <div><Button compact icon onClick={this.props.modules.back}>
                        <Icon name='arrow left' />
                    </Button>
                        <b className='page_header'>Шаблон отправителей и получателей </b>
                        {this.props.store.templates.selected_disp_template.IsNew ? (<b className='page_header'>(Создание нового)</b>):(<b className='page_header'>(Код: {this.props.store.templates.selected_disp_template.Key})</b>)}
                        
                        {this.props.store.templates.selected_disp_template.IsNew ? (null):(<Button onClick={this.remove_disp_template.bind(this)} size='mini'>Удалить</Button>)}
                    </div>
                </div>
                <div className="templates_general_data">

                    <div className="disp_data_label">Наименование:</div>
                    <div className="disp_data_el"><input maxLength="100" className="create_disp_data_input" 
                    onChange={e => this.props.set_selected_disp_template_label(e.target.value)} 
                    value={this.props.store.templates.selected_disp_template.label} 
                    type="text" /></div>
                    <div className="disp_data_label">Город:</div>
                    <div className="disp_data_el">
                        <Select 
                          value={this.props.store.templates.selected_disp_template.City}
                          options={this.props.store.create_disp.CityList}
                          styles={customStyles}
                          onChange={(values) => this.set_selected_disp_template_City(values)}
                          /> 
                    </div>
                    
                    {this.props.store.templates.disp_template_terminal_list.length === 0 ? (null):(<div className="disp_data_label">Отправка/Выдача на складе</div>)}
                    {this.props.store.templates.disp_template_terminal_list.length === 0 ? (null):(<div><input name="send_type" type="radio"  onChange={this.set_selected_disp_template_Terminal.bind(this,true)} disabled={this.props.store.templates.disp_template_terminal_list.length === 0} checked={this.props.store.templates.selected_disp_template.Terminal}></input></div>)}
                    {this.props.store.templates.disp_template_terminal_list.length === 0 ? (null):(<div className="disp_data_label">Забор/Доставка по адресу</div>)}
                    {this.props.store.templates.disp_template_terminal_list.length === 0 ? (null):(<div><input name="send_type" type="radio" onChange={this.set_selected_disp_template_Terminal.bind(this,false)} checked={!this.props.store.templates.selected_disp_template.Terminal}></input></div>)}
                        

                    {this.props.store.templates.selected_disp_template.Terminal ? (<div className="disp_data_label"> Терминал:</div>):(<div className="disp_data_label"> Адрес:</div>)}
                        
                    {this.props.store.templates.selected_disp_template.Terminal ? (
                    <div className="disp_data_el">
                    <Select
                      options={this.props.store.templates.disp_template_terminal_list}
                      styles={customStyles}
                      value={this.props.store.templates.selected_disp_template.CurrentTerminal}
                      onChange={(values) => this.props.set_selected_disp_template_CurrentTerminal(values)}
                    /> 
                    </div>
                    ):(<div className="disp_data_el"><input maxLength="100" className="create_disp_data_input" 
                    onChange={e => this.props.set_selected_disp_template_Adress(e.target.value)} 
                    value={this.props.store.templates.selected_disp_template.Adress} 
                    type="text" /></div>)}

                    <div className="disp_data_label">Телефон:</div>
                    <div className="disp_data_el"><input maxLength="100" className="create_disp_data_input" 
                    onChange={e => this.props.set_selected_disp_template_Phone(e.target.value)} 
                    value={this.props.store.templates.selected_disp_template.Phone} 
                    type="text" /></div>
                    
                    <div className="disp_data_label">Контактное лицо:</div>
                    <div className="disp_data_el"><input maxLength="100" className="create_disp_data_input" 
                    onChange={e => this.props.set_selected_disp_template_Person(e.target.value)} 
                    value={this.props.store.templates.selected_disp_template.Person} 
                    type="text" /></div>
                    
                    <div className="disp_data_label">Компания:</div>
                    <div className="disp_data_el"><input maxLength="100" className="create_disp_data_input" 
                    onChange={e => this.props.set_selected_disp_template_Company(e.target.value)} 
                    value={this.props.store.templates.selected_disp_template.Company} 
                    type="text" /></div>
                    
                    <div className="disp_data_label">Дополнительная информация:</div>
                    <div className="disp_data_el"><input maxLength="100" className="create_disp_data_input" 
                    onChange={e => this.props.set_selected_disp_template_AddInfo(e.target.value)} 
                    value={this.props.store.templates.selected_disp_template.AddInfo} 
                    type="text" /></div>
                    
                   

                </div>
                <div className='templates_button_panel'>
                    <Button onClick={this.save.bind(this)} disabled={!changed}>Записать и закрыть</Button>
                </div>
                
            </div>
        )
    }
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_selected_disp_template_label: (param) => { dispatch({ type: 'set_selected_disp_template_label', payload: param }) },
        set_selected_disp_template_City: (param) => { dispatch({ type: 'set_selected_disp_template_City', payload: param }) },
        set_selected_disp_template_Adress: (param) => { dispatch({ type: 'set_selected_disp_template_Adress', payload: param }) },
        set_selected_disp_template_Phone: (param) => { dispatch({ type: 'set_selected_disp_template_Phone', payload: param }) },
        set_selected_disp_template_Person: (param) => { dispatch({ type: 'set_selected_disp_template_Person', payload: param }) },
        set_selected_disp_template_Company: (param) => { dispatch({ type: 'set_selected_disp_template_Company', payload: param }) },
        set_selected_disp_template_AddInfo: (param) => { dispatch({ type: 'set_selected_disp_template_AddInfo', payload: param }) },
        set_selected_disp_template_Terminal: (param) => { dispatch({ type: 'set_selected_disp_template_Terminal', payload: param }) },
        set_selected_disp_template_CurrentTerminal: (param) => { dispatch({ type: 'set_selected_disp_template_CurrentTerminal', payload: param }) },
        set_disp_template_list: (param) => { dispatch({ type: 'set_disp_template_list', payload: param }) },
        set_disp_template_terminal_list: (param) => { dispatch({ type: 'set_disp_template_terminal_list', payload: param }) },
    })
)(Screen);