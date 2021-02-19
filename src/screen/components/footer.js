
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_data } from './../../common/common_modules';


class Screen extends Component {

    home = () => {
        this.props.set_active_window("home");
    };


    get_disp = () => {
        this.props.set_active_window("get_disp");
    };

    my_disp = () => {
        this.props.set_active_window("mydisp");
    };

    get_list = (userkey) => {

        get_data('list', { userkey: userkey }).then(
            (result) => { this.props.set_list(result) },
            (err) => { console.log(err) }
        );
    };

    logout = () => {
        this.props.logout();
    };

    login = () => {

        if (this.props.store.login.username !== '' || this.props.store.login.pass !== '') {
            const authdata = {
                username: this.props.store.login.username,
                pass: this.props.store.login.pass
            };

            get_data('autorization', authdata).then(
                (result) => {

                    this.props.login(result);

                    this.get_list(result.userkey);

                },
                (err) => { console.log(err) }
            );
        }
        else {
            this.props.set_error('Необходимо ввести Имя пользователя и Пароль.')
        }
    };

    mobile_version = () => {
        this.props.m_active(true);
        this.props.use_width(false);
    }

    render() {
        return (

            <div id="pageFooter" className="footer">
                <div className="footerleftel">© 2006-2020 ООО "Экспресс Кинетика"</div> 
                <div className="footercenterel">г. Новосибирск, ул Коммунистическая 7, склад 1</div> 
                <div className="footerrightel">
                    Разработка сайта: ООО "Экспресс Кинетика"
                    <button onClick={ this.mobile_version.bind(this) } className="mobile_version">Мобильная Версия</button>
                </div>  
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        m_active: (param) => { dispatch({ type: 'M_ACTIVE', payload: param }) },
        login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
        logout: () => { dispatch({ type: 'LOGOUT' }) },
        set_login: (param) => { dispatch({ type: 'SET_USERNAME', payload: param }); },
        set_password: (param) => { dispatch({ type: 'SET_PASS', payload: param }); },
        set_active_window: (param) => { dispatch({ type: 'SET_ACTIVE_WINDOW', payload: param }); },
        set_list: (param) => { dispatch({ type: 'SET_DISPATCH_LIST', payload: param }) },
        use_width: (param) => { dispatch({ type: 'set_use_width', payload: param }); },
    })
)(Screen);