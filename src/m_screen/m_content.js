import React from 'react';
import { connect } from 'react-redux';
import MHeader from './m_header';
import MMenu from './m_menu';
import './mobile.css';
import { get_data } from '../common/common_modules';
import MStorage from './m_storage';
import Wait from '../screen/wait';
import MSetting from './m_setting';
import MDisp from './m_disp';
import MDelivered from './m_delivered';
import MNotDelivered from './m_not_delivered';
import Foto from './foto';

class Screen extends React.Component {


    render() {

        return (

            <div>
                <MHeader />
                {this.props.store.general.active_window === 'm_storage' ? (<MStorage />) : (null)}
                {this.props.store.general.active_window === 'Mmenu' ? (<MMenu />) : (null)}
                {this.props.store.general.active_window === 'm_disp' ? (<MDisp />) : (null)}
                {this.props.store.general.active_window === 'm_delivered' ? (<MDelivered />) : (null)}
                {this.props.store.general.active_window === 'm_not_delivered' ? (<MNotDelivered />) : (null)}
                {this.props.store.general.active_window === 'setting' ? (<MSetting />) : (null)}
                {this.props.store.general.active_window === 'wait' ? (<Wait />) : (null)}

                {this.props.store.general.active_window === 'foto' ? (<Foto />) : (null)}
            </div>
        )
    }
};


export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
    })

)(Screen);