
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './../../logo.svg';
import { get_data } from './../../common/common_modules'
import { withCookies } from 'react-cookie';
import { Header, Modal } from 'semantic-ui-react'
import md5 from 'md5'


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
            console.log(this.props.store.login.pass)
            console.log(authdata)
            get_data('autorization', authdata).then(
                (result) => {

                    this.props.login(result);
                    
                    this.get_list(result.userkey);

                    this.props.cookies.set('username',this.props.store.login.username)
                    this.props.cookies.set('userkey',result.userkey)
                    this.props.cookies.set('passkey',md5(this.props.store.login.pass))

                },
                (err) => { 
                    this.props.set_error_show(true)
                    this.props.set_error_text(err)

                    console.log(err) 
                }
            );
        }
        else {
            this.props.set_error('Необходимо ввести Имя пользователя и Пароль.')
        }
    };

    close_error_portal = () => {
        this.props.set_error_show(false)
    }

    render() {
        return (

            <div id="pageHeader" className="topnav">

            <Modal closeIcon
                open={this.props.store.general.error_show}
                onClose={this.close_error_portal.bind(this)}
            >
                <Header>Ошибка</Header>
                <Modal.Content>
                    <p>{this.props.store.general.error_text}</p>
                </Modal.Content>
            </Modal>

                <div>
                    {this.props.store.general.active_window !== "home" ? (
                        <div>
                            <img className="header_logo" src={logo} />
                        </div>) : (null)}
                    {/* <div onClick={this.home.bind(this)} className="topnavel">Создать заявку</div>
                    <div onClick={this.get_disp.bind(this)} className="topnavel">Отследить накладную</div>
                    <div onClick={this.my_disp.bind(this)} className="topnavel">Рассчитать стоимость</div> */}
                    {/* <div onClick ={this.props.set_active_window.bind(this,'profile')} className="topnavel">Профиль</div> */}
                </div>



                {!this.props.store.login.logged ? (<div className="login-container">
                    <div style={{ float: "left" }}>
                        <input onChange={e => this.props.set_login(e.target.value)} value={this.props.store.login.username} type="text" placeholder="Логин" name="username" />

                        <input onChange={e => this.props.set_password(e.target.value)} value={this.props.store.login.pass} type="password" placeholder="Пароль" name="psw" />
                    </div>
                    <div onClick={this.login.bind(this)} className="logout">Вход</div>


                </div>) : (<div className="login-container">
                    <div className="topnavusername">{this.props.store.login.alias} </div>
                    <div onClick={this.logout.bind(this)} className="logout"> Выход </div>
                </div>)}
            </div>
        );
    }
}

export default withCookies(connect(
    (state, ownProps) => ({store: state, cookies: ownProps.cookies}),
    dispatch => ({
        login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
        logout: () => { dispatch({ type: 'LOGOUT' }) },
        set_login: (param) => { dispatch({ type: 'SET_USERNAME', payload: param }); },
        set_password: (param) => { dispatch({ type: 'SET_PASS', payload: param }); },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_list: (param) => { dispatch({ type: 'SET_DISPATCH_LIST', payload: param }) },
        set_error: (param) => { dispatch({ type: 'SET_ERROR', payload: param }) },
        set_error_show: (param) => { dispatch({ type: 'set_error_show', payload: param }) },
        set_error_text: (param) => { dispatch({ type: 'set_error_text', payload: param }) },
    })
)(Screen));