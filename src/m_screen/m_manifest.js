import React from 'react';
import { connect } from 'react-redux';
import { Header, Modal, Table, Button } from 'semantic-ui-react';
import { get_data } from './../common/common_modules';
import './mobile_disp.css';

class Screen extends React.Component {

    get_selected = () => {

        const getmanifest_data = {
            userkey: this.props.store.login.userkey,
            num: this.props.store.manifest.data.num,
            dispatches: this.props.store.manifest.data.dispatches.filter((el) => { return el.selected }).map((el) => { return el.num })
        };

        console.log(getmanifest_data)

        get_data('getmanifest', getmanifest_data).then(
            (result) => {

                const data = {
                    userkey: this.props.store.login.userkey,
                    num: this.props.store.manifest.data.num
                };

                get_data('manifestenroute', data).then(
                    (result) => {
                        console.log(result)
                        this.props.set_data_manifest(result);
                        this.props.set_action_manifest("get");
                    },
                    (err) => { console.log(err) }
                );

                // this.props.set_list_storage(result);
                // this.props.set_active_window("storage");
            },
            (err) => { console.log(err) }
        );
    }

    check = (num) => {
        this.props.check_manifest_disp(num)
    }
    render() {

        document.onkeydown = function (event) { }
        return (
            <div>
                <div className="mobile_heading">Манифест входящий {this.props.store.manifest.data.num}</div>

                <div className="disp_customer_data">
                    <div className="disp_data_label">Склад отправления:</div>
                    <div className="disp_data_el">{this.props.store.manifest.data.sender}</div>
                    <div className="disp_data_label">Дата отправления:</div>
                    <div className="disp_data_el">{this.props.store.manifest.data.date}</div>
                    <div className="disp_data_label">Перевозчик:</div>
                    <div className="disp_data_el">{this.props.store.manifest.data.carrier}</div>
                </div>

                {this.props.store.manifest.data.dispatches.length !== 0 ? (<div className="disp_cargo_table">
                    <div className="disp_cargo_table_data">

                    {this.props.store.manifest.data.dispatches.map((disp, index) =>
                    <div>
                        <div className="disp_address_data_header">Накладные по манифесту</div>
                        <div className="disp_address_data_el">
                            <div className="mobile_disp_data_label">Приниято:</div>
                            <div className="mobile_disp_data_el"><input type="checkbox" checked={disp.selected} onChange={this.check.bind(this, disp.num)} /></div>
                            <div className="mobile_disp_data_label">Номер:</div>
                            <div className="mobile_disp_data_el">{disp.num}</div>
                            <div className="mobile_disp_data_label">Заказчик:</div>
                            <div className="mobile_disp_data_el">{disp.customer}</div>
                            <div className="mobile_disp_data_label">Количество мест:</div>
                            <div className="mobile_disp_data_el">{disp.total}</div>
                            <div className="mobile_disp_data_label">Вес:</div>
                            <div className="mobile_disp_data_el">{disp.weight}</div>
                        </div>
                    </div>)}

                        <div className="disp_cargo_table_header">Принято по манифесту:</div>
                        <div className="disp_data_el">Накладных: {this.props.store.manifest.data.dispatches.filter((el) => { return el.selected }).length} из {this.props.store.manifest.data.dispatches.length} (мест: {this.props.store.manifest.data.dispatches.filter((el) => { return el.selected }).reduce((sum, el) => { return sum + parseInt(el.total) }, 0)} из {this.props.store.manifest.data.dispatches.reduce((sum, el) => { return sum + parseInt(el.total) }, 0)})</div>
                        <button onClick={this.get_selected.bind(this)} className="send_pod">Принять на склад и закрыть</button>

                    </div>
                </div>) : (<div className="manifest_complited">Манифест принят полностью</div>)}




            </div>
        )
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        check_manifest_disp: (param) => { dispatch({ type: 'check_manifest_disp', payload: param }) },
        set_data_manifest: (param) => { dispatch({ type: 'set_data_manifest', payload: param }) },
        set_action_manifest: (param) => { dispatch({ type: 'set_action_manifest', payload: param }) },
    })
)(Screen);