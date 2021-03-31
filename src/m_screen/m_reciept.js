import React from 'react';
import '../screen/reciept.css';
import { connect } from 'react-redux';
import { get_data } from '../common/common_modules';


class Screen extends React.Component {

    search_reciept = () => {
        this.props.set_active_window("wait");

        const data = {
            userkey: this.props.store.login.userkey,
            status: "Ожидается",
            num: this.props.store.reciept.search,
        };

        this.props.set_key(data);
        this.props.set_active_window("m_disp");
    }

    componentWillUnmount() {
        this.props.set_search_reciept("");
    }

    render() {
        document.onkeydown = function (event) { }
        return (
            <div>
                <div className="mobile_heading">
                    Получить от отправителя
                </div>
                <div className="mobile_container">
                    <div className="search_reciept">
                        <div className="search_reciept_label">Поиск по номеру:</div>
                        <div className="search_reciept_data"><input value={this.props.store.reciept.search} className="search_reciept_data_input" onChange={e => this.props.set_search_reciept(e.target.value)}></input></div>
                    </div>
                    <div className="search_reciept_button_area">
                        <button id="search_reciept_button" onClick={this.search_reciept.bind(this)} className="send_pod">Найти</button>
                    </div>
                    <div className="search_reciept_error">{this.props.store.reciept.error}</div>
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
        set_key: (param) => { dispatch({ type: 'set_key', payload: param }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_search_reciept: (param) => { dispatch({ type: 'set_search_reciept', payload: param }) },
        set_search_error: (param) => { dispatch({ type: 'set_search_error', payload: param }) },
        set_action: (param) => { dispatch({ type: 'set_action', payload: param }) },
        set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
        set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
    })
)(Screen);