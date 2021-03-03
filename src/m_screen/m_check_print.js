import React from 'react';
import { connect } from 'react-redux';
import { get_data } from '../common/common_modules';
import Wait from "../screen/wait";
import ReactToPrint from 'react-to-print'
import QRCode from 'qrcode.react';
import './mobile_check_print.css'


class Screen extends React.Component {


    render() {

        return (
            <div>
                <ReactToPrint
                    trigger={() => <button>Печать чека</button>}
                    content={() => this.componentRef}
                />
                <div style={{ display: "none" }}>
                    <div ref={el => (this.componentRef = el)}>
                        <div className="check_print_qr">
                        <QRCode value={this.props.store.check.check_data.qr} />
                        </div>   
                        
                    </div>
                </div>
                <div>{this.props.store.check.check_data.qr}</div>
                
                <div>{this.props.store.check.check_data.date}</div>
                
                <div>{this.props.store.check.check_data.summ}</div>
                
                <div>{this.props.store.check.check_data.qr}</div>
                
                
            </div>
        )
    }

};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }); },
        set_date_start: (param) => { dispatch({ type: 'set_date_start', payload: param }) },
        set_date_end: (param) => { dispatch({ type: 'set_date_end', payload: param }) },
        set_profit_for_period: (param) => { dispatch({ type: 'set_profit_for_period', payload: param }) }, 
        set_disp_list: (param) => { dispatch({ type: 'set_disp_list', payload: param }) }, 
    })

)(Screen);