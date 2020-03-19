import React from 'react';
import { connect } from 'react-redux';
import { get_data } from './../common/common_modules'

import { Button } from 'semantic-ui-react'



class Screen extends React.Component {

  save_changes_user_data = () =>{
    const data = {
      userkey: this.props.store.login.userkey,
      phone: this.props.store.login.phone,
      email: this.props.store.login.email,
      name: this.props.store.login.alias,
    }

    get_data('edituserdata', data).then(
      (result) => {
        this.props.save_changes_user_data(result)
        this.props.modules.set_modal_show(true)
        this.props.modules.set_modal_text("Данные успешно сохранены")
        this.props.modules.set_modal_header('Успешно')
      },
      (err) => { 
          console.log("err")  
          console.log(err) 
      }
  );

  }

  click_import_template_list = () => {
    this.props.modules.set_active_window('import_template_list')
    this.props.modules.set_last_window('setting')
  }

  click_disp_template_list = () => {
    this.props.modules.set_active_window('disp_template_list')
    this.props.modules.set_last_window('setting')
  }

  click_default_template_list = () => {
    this.props.modules.set_active_window('default_template_list')
    this.props.modules.set_last_window('setting')
  }

  render() {


    return (

      <div>
                <div className="disp_Number">
                    <div>Основные настройки {this.props.store.login.email !== this.props.store.login.original_data.email 
        || this.props.store.login.alias !== this.props.store.login.original_data.username
        || this.props.store.login.phone !== this.props.store.login.original_data.phone ? (
          <Button style={{margin: '0 5px', padding: '8px'}} size='mini' onClick={this.save_changes_user_data.bind(this)}>Сохранить изменения</Button>
        ):(
          <Button style={{margin: '0 5px', padding: '8px'}} size='mini' disabled>Сохранить изменения</Button>
        )}</div>
                    
                </div>
        <div className="setting_general_data">
          <div className="disp_data_label">Код пользователя:</div>
          <div className="disp_data_el">{this.props.store.login.userkey}</div>
          <div className="disp_data_label">Имя пользователя:</div>
          <div className="disp_data_el"><input maxLength="100" className="create_disp_data_input" onChange={e => this.props.set_user_name(e.target.value)} value={this.props.store.login.alias} type="text" placeholder="введите имя пользователя..." /></div>
          <div className="disp_data_label">E-mail:</div>
          <div className="disp_data_el"><input maxLength="100" className="create_disp_data_input" onChange={e => this.props.set_user_email(e.target.value)} value={this.props.store.login.email} type="text" placeholder="введите e-mail..." /></div>
          <div className="disp_data_label">Телефон</div>
          <div className="disp_data_el"><input maxLength="11" className="create_disp_data_input" onChange={e => this.props.set_user_phone(e.target.value)} value={this.props.store.login.phone} type="text"  placeholder="введите номер телефона..." /></div>
          
        </div>
        <div className="disp_Number">
                    <div>Настройки шаблонов</div>
                </div>
        <div className="setting_template_data">
        <div className="disp_data_label">Шаблоны отправителей и получателей:</div>
        <div className="disp_data_el">{this.props.store.upload_manifest.disp_template_list.length}</div>
        <div><Button onClick={this.click_disp_template_list.bind(this)} style={{margin: '0 5px', padding: '6px'}} size='mini'>Редактировать</Button></div>
        {/* <div className="disp_data_label">Шаблоны импорта:</div>
        <div className="disp_data_el">{this.props.store.upload_manifest.import_template_list.length}</div>
        <div><Button onClick={this.click_import_template_list.bind(this)} style={{margin: '0 5px', padding: '6px'}} size='mini'>Редактировать</Button></div>
        <div className="disp_data_label">Шаблоны значений по умолчанию:</div>
        <div className="disp_data_el">{this.props.store.upload_manifest.default_template_list.length}</div>
        <div><Button onClick={this.click_default_template_list.bind(this)} style={{margin: '0 5px', padding: '6px'}} size='mini'>Редактировать</Button></div> */}
          </div>
        
        

       
      </div>



    );
  }
};

export default connect(
  (state) => ({ store: state }),
  dispatch => ({
    
    set_user_email: (param) => { dispatch({ type: 'set_user_email', payload: param }) },
    set_user_phone: (param) => { dispatch({ type: 'set_user_phone', payload: param }) },
    set_user_name: (param) => { dispatch({ type: 'set_user_name', payload: param }) },
    save_changes_user_data: (param) => { dispatch({ type: 'save_changes_user_data', payload: param }) },
    
  })
)(Screen);