
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './../../logo.svg';
import { get_data } from './../../common/common_modules'
import { withCookies } from 'react-cookie';
import { Header, Modal, Button } from 'semantic-ui-react'
import md5 from 'md5'


class Screen extends Component {

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.login();
        }
    }

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
        // localStorage.removeItem('username')
        // localStorage.removeItem('passkey')
        this.props.cookies.remove('username')
        this.props.cookies.remove('passkey')
        this.props.logout();
        this.props.set_active_window("home");
    };

    login = () => {

        if (this.props.store.login.username !== '' || this.props.store.login.pass !== '') {
            const authdata = {
                username: this.props.store.login.username,
                pass: md5(this.props.store.login.pass)
            };
            
            get_data('autorization', authdata).then(
                (result) => {

                    this.props.login(result);
                    
                    this.get_list(result.userkey); 

                    // localStorage.setItem('username', this.props.store.login.username)
                    // localStorage.setItem('userkey', result.userkey)
                    // localStorage.setItem('passkey', md5(this.props.store.login.pass))
                    this.props.cookies.set('username', this.props.store.login.username)
                    this.props.cookies.set('userkey', result.userkey)
                    this.props.cookies.set('passkey', md5(this.props.store.login.pass))

                },
                (err) => {
                    if (err === undefined || err === '') {
                        this.props.set_modal_text('Ошибка авторизации!')
                    } else {
                        this.props.set_modal_text(err)
                    }
                    this.props.set_modal_show(true)
                    this.props.set_modal_header('Ошибка')

                    console.log(err)
                }
            );
        }
        else {
            this.props.set_modal_text('Необходимо ввести Имя пользователя и Пароль.')
        }
    };



    close_modal_portal = () => {
        this.props.set_modal_show(false)
    }

    logo_click = () => {
        this.props.set_active_window("home")
    }

    render() {

        return (

            <div id="pageHeader" className="topnav">

                    <Modal closeIcon
                        open={this.props.store.general.modal_show}
                        onClose={this.close_modal_portal.bind(this)}
                    >
                        <Header>{this.props.store.general.modal_header}</Header>
                        <Modal.Content>
                            <p>{this.props.store.general.modal_text}</p>
                        </Modal.Content>
                    </Modal>

                <div onClick={this.logo_click.bind(this)}> 
                    
                    <img className="header_logo" src={logo} />
                    
                </div>
                <div className='mainmenu'>
                {/* <div className="old"><a href='http://old.express-kinetika.ru'>Старая версия</a></div> */}
                {/* <div className="main_menu_button">Расчет стоимости</div>
                <div className="main_menu_button">Адреса и телефоны</div> */}
                </div>



                {!this.props.store.login.logged ? (<div className="login-container">
                    <div className="login-pass-input">
                        <input onKeyDown={this.handleKeyDown} onChange={e => this.props.set_login(e.target.value)} value={this.props.store.login.username} type="text" placeholder="Логин" name="username" />

                        <input onKeyDown={this.handleKeyDown} onChange={e => this.props.set_password(e.target.value)} value={this.props.store.login.pass} type="password" placeholder="Пароль" name="psw" />
                    </div>
                    <div onClick={this.login.bind(this)} className="logout">Вход</div>


                </div>) : (<div className="login-container">
                    <div className="topnavusername">{this.props.store.login.original_data.username} </div>
                    <div onClick={this.logout.bind(this)} className="logout"> Выход </div>
                </div>)}
            </div>
        );
    }
}

export default withCookies(connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    dispatch => ({
        login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
        logout: () => { dispatch({ type: 'LOGOUT' }) },
        set_login: (param) => { dispatch({ type: 'SET_USERNAME', payload: param }); },
        set_password: (param) => { dispatch({ type: 'SET_PASS', payload: param }); },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_list: (param) => { dispatch({ type: 'SET_DISPATCH_LIST', payload: param }) },
        set_error: (param) => { dispatch({ type: 'SET_ERROR', payload: param }) },
        set_modal_show: (param) => { dispatch({ type: 'set_modal_show', payload: param }) },
        set_modal_text: (param) => { dispatch({ type: 'set_modal_text', payload: param }) },
        set_modal_header: (param) => { dispatch({ type: 'set_modal_header', payload: param }) },
    })
)(Screen));