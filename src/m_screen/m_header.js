import React from 'react';
import { connect } from 'react-redux';
import Footer from '../screen/components/footer';
import logo from './../logo.svg';
import './mobile_header.css';
import menu from '../common/burger_menu.png';
import { withCookies } from 'react-cookie';
import arrow from '../common/blue-arrow.png';

class Screen extends React.Component {

    menu_active = () => {
        this.props.set_mobile_menu('Mmenu');
    }

    menu_active_arrow = () => {
        this.props.set_mobile_menu('m_storage');
    }


    render() {

        return (
            <header className="header_mobile">
                <div className="mobile_container">
                    <img className={(this.props.store.general.active_window === 'm_disp') ? "blue_arrow" : "none"} src={ arrow } onClick={this.menu_active_arrow.bind(this)} />
                    <img className={(this.props.store.general.active_window === 'Mmenu' || this.props.store.general.active_window === 'm_disp') ? "none" : "burger_menu"} src={ menu } onClick={ this.menu_active.bind(this) } />
                    <img className="header_mobile_logo" src={logo} />
                </div>
            </header>
        )
    }
};


export default withCookies(connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    dispatch => ({
        set_mobile_menu: (param) => { dispatch({ type: 'set_mobile_menu', payload: param }) },
    })
)(Screen));