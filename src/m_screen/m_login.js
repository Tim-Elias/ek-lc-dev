import React from 'react';
import { connect } from 'react-redux';
import './mobile_login.css';
import './mobile.css';
import { get_data } from '../common/common_modules';
import md5 from 'md5';
import { withCookies } from 'react-cookie';
import logo from './../logo.svg';
import { Header, Modal } from 'semantic-ui-react';

const today = new Date()
let mm = today.getMonth() + 1; // getMonth() is zero-based
let dd = today.getDate();

const y = today.getFullYear();

if (mm < 10) { mm = '0' + mm }
if (dd < 10) { dd = '0' + dd }

const date = y + '-' + mm + '-' + dd;

let H = today.getHours();
let M = today.getMinutes();

if (H < 10) { H = '0' + H }
if (M < 10) { M = '0' + M }

const time = H + ':' + M;

class Screen extends React.Component {

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    close_modal_portal = () => {
        this.props.set_modal_show(false)
    }

    login = () => {

        if (this.props.store.login.username !== '' || this.props.store.login.pass !== '') {
            const authdata = {
                username: this.props.store.login.username,
                pass: md5(this.props.store.login.pass)
            };

            get_data('autorization', authdata).then(
                (result) => {

                    this.props.login(result);

                    //this.get_list(result.userkey);

                    try {
                        // localStorage.setItem('username', this.props.store.login.username);
                        // localStorage.setItem('userkey', result.userkey);
                        // localStorage.setItem('passkey', md5(this.props.store.login.pass));
                        this.props.cookies.set('username', this.props.store.login.username, { maxAge: 1000000000000 })
                        this.props.cookies.set('userkey', result.userkey, { maxAge: 1000000000000 })
                        this.props.cookies.set('passkey', md5(this.props.store.login.pass), { maxAge: 1000000000000 })
                    } catch (error) {
                        
                    }

                },
                (err) => {
                    this.props.set_modal_show(true)
                    this.props.set_modal_text(err)
                    this.props.set_modal_header('Ошибка')

                    console.log(err)
                }
            );
        }
        else {
            this.props.set_error('Необходимо ввести Имя пользователя и Пароль.')
        }
    };


    render() {

        return (
            <div className="mobile_container">

                <Modal closeIcon
                    open={this.props.store.general.modal_show}
                    onClose={this.close_modal_portal.bind(this)}
                >
                    <Header>{this.props.store.general.modal_header}</Header>
                    <Modal.Content>
                        <p>{this.props.store.general.modal_text}</p>
                    </Modal.Content>
                </Modal>


                <div className="mobile_login_container">
                    <img className="header_mobile_logo login_logo" src={logo} alt="" />
                    

                    {(date >= "2021-12-04" && time >= "00:00") ? (
                        [
                            <input className="mobile_login_item" onKeyDown={this.handleKeyDown} onChange={e => this.props.set_login(e.target.value)} value={this.props.store.login.username} type="text" placeholder="Логин" name="username" />,
                            <input className="mobile_login_item" onKeyDown={this.handleKeyDown} onChange={e => this.props.set_password(e.target.value)} value={this.props.store.login.pass} type="password" placeholder="Пароль" name="psw" />,
                            <button onClick={this.login.bind(this)} className="mobile_logout mobile_login_item">
                                Вход
                            </button>,
                        ]
                    ) : (
                        <div className="">
                            <p className="login__label">В данный момент личный кабинет не работает, мы знаем о проблеме и пытаемся её устранить, приносим извинения за неудобства.</p>
                        </div>
                    )}

                </div>
            </div>
        )
    }
};


export default withCookies(connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    dispatch => ({
        login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
        set_login: (param) => { dispatch({ type: 'SET_USERNAME', payload: param }); },
        set_password: (param) => { dispatch({ type: 'SET_PASS', payload: param }); },
        set_error: (param) => { dispatch({ type: 'SET_ERROR', payload: param }) },
        set_modal_show: (param) => { dispatch({ type: 'set_modal_show', payload: param }) },
        set_modal_text: (param) => { dispatch({ type: 'set_modal_text', payload: param }) },
        set_modal_header: (param) => { dispatch({ type: 'set_modal_header', payload: param }) },
    })
)(Screen));