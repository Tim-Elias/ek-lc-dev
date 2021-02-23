import React from 'react';
import { connect } from 'react-redux';
import './mobile.css'; 
import './mobil_menu.css';
import { withCookies } from 'react-cookie';
import { get_data } from './../common/common_modules';

class Screen extends React.Component {

    mobile_version = () => {
        this.props.web_active(false);
        this.props.use_width(false);
    }

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    storage = () => {
        this.props.set_active_window("wait");
        const list_data = { userkey: this.props.store.login.userkey };

        get_data('list', list_data).then(
            (result) => {
                this.props.set_list_storage(result);
                this.props.set_active_window("m_storage");
                this.props.set_search_storagre("");
            },
            (err) => { console.log(err) }
        );
    }

    logout = () => {
        this.props.cookies.remove('username')
        this.props.cookies.remove('passkey')
        this.props.set_active_window(null);
        this.props.logout();
    };

    render() {

        return (
            <nav className="mobile_menu">
                <div className="mobile_container">
                    <ul>
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.storage.bind(this, 'm_storage')}>Доставки и Заявки</button></li>
                        <li className="mobile_menu_item"><button className="mobile_menu_button">Получить от отправителя</button></li>
                        <li className="mobile_menu_item"><button className="mobile_menu_button">Входящие манифесты</button></li>
                        <li className="mobile_menu_item"><button className="mobile_menu_button">Отправка манифеста</button></li>
                        <li className="mobile_menu_item"><button className="mobile_menu_button">Приемка на склад</button></li>
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'foto')}>FOTO</button></li>
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'setting')}>Настройки</button></li>
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.mobile_version.bind(this)}>Web Версия</button></li>
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.logout.bind(this)}>Выйти</button></li>
                    </ul>
                </div>
            </nav>
        )
    }
};


export default withCookies(connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    dispatch => ({
        web_active: (param) => { dispatch({ type: 'M_ACTIVE', payload: param }) },
        logout: () => { dispatch({ type: 'LOGOUT' }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        use_width: (param) => { dispatch({ type: 'set_use_width', payload: param }); },
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
        set_search_storagre: (param) => { dispatch({ type: 'set_search_storagre', payload: param }) },
    })
)(Screen));
