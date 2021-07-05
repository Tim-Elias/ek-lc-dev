import React from 'react';
import './reciept.css';
import { connect } from 'react-redux';

import { get_data } from '../common/common_modules'


class Screen extends React.Component {

  search_reciept = () => {
    this.props.set_active_window("wait");
  
      const search_reciept_data = { 
        userkey: this.props.store.login.userkey, 
        order: "",
        num: this.props.store.reciept.search,
      };

      get_data('getdispatchdata', search_reciept_data).then(
        (result) => {
          this.props.set_data_disp(result);
          this.props.set_active_window("disp");
          this.props.set_last_window("reciept");
          this.props.set_action("reciept");
        },
        (err) => { 
          this.props.modules.set_modal_show(true)
          this.props.modules.set_modal_header('Ошибка')
          this.props.modules.set_modal_text(err)

          this.props.set_active_window("reciept");
          this.props.set_search_error(err) 
        }
      );
  
  }

  render() {
    document.onkeydown = function (event) {}
    return (
      
      <div>
        
        <div className="search_reciept">
          <div className="search_reciept_label">Поиск по номеру</div>
          <div className="search_reciept_data"><input value={this.props.store.reciept.search} className="search_reciept_data_input" onChange={e => this.props.set_search_reciept(e.target.value)}></input></div>
          <div className="search_reciept_button_area">
          <button id="search_reciept_button" onClick={this.search_reciept.bind(this)} className="send_pod">Найти</button>
          </div>
          </div>
          <div className="search_reciept_error">{this.props.store.reciept.error}</div>   
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
    set_search_reciept: (param) => { dispatch({ type: 'set_search_reciept', payload: param }) },
    set_search_error: (param) => { dispatch({ type: 'set_search_error', payload: param }) },
    set_action: (param) => { dispatch({ type: 'set_action', payload: param }) },
    set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
    set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
  })
)(Screen);