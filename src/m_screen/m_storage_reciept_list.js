import React from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import done_sound from './../common/ping.mp3';
import err_sound from './../common/err.mp3';
import funk_sound from './../common/funk.mp3';
import { get_data } from './../common/common_modules';
import QrReader from 'react-qr-reader';
import './mobile.css';
import './mobile_storage_reciept.css';

class Screen extends React.Component {

    componentDidMount() {
        this.props.storage_reciept_clear_list();
        this.props.storage_reciept_set_barcode("");
        this.props.storage_reciept_sound(false);
        this.props.storage_reciept_qr(false);
    }

    componentWillUnmount() {
        this.props.storage_reciept_set_done_sound(Sound.status.STOPPED);
        this.props.storage_reciept_set_err_sound(Sound.status.STOPPED);
        this.props.storage_reciept_set_funk_sound(Sound.status.STOPPED);
    }

    add_disp = (disp) => {
        get_data('storage_chek', {userkey: this.props.store.login.userkey, disp: disp}).then(
            (result) => {
                if(this.props.store.storage_reciept.disp_list.find(item => item.num === result.num) === undefined) {
                    this.props.storage_reciept_add_disp_list(result);
                    this.props.storage_reciept_set_barcode('');
                    if(this.props.store.storage_reciept.sound) {
                        this.props.storage_reciept_set_done_sound(Sound.status.PLAYING);
                    }
                } else {
                    if (this.props.store.storage_reciept.sound) {
                        this.props.storage_reciept_set_err_sound(Sound.status.PLAYING);
                    }
                    this.props.set_popup_message('Накладная уже добавлена!');
                }
            },
            (err) => {
                this.props.set_popup_message('Накладной не существует!');
                console.log(err);
                this.err_sound_play();
            }
        );
        document.getElementById("storage_reciept_input").focus();
    }

    send_req = () => {

    }

    handleScan = data => {
        if (data) {
            this.props.storage_reciept_set_barcode(data);
            this.add_disp(data);
        }
    }

    handleError = err => {
        console.error(err);
    }

    render() {

        let done_sound_status
        if (this.props.store.storage_reciept.done_sound === undefined) {
            done_sound_status = Sound.status.STOPPED
        } else {
            done_sound_status = this.props.store.storage_reciept.done_sound
        }

        let funk_sound_status
        if (this.props.store.storage_reciept.funk_sound === undefined) {
            funk_sound_status = Sound.status.STOPPED
        } else {
            funk_sound_status = this.props.store.storage_reciept.funk_sound
        }

        let err_sound_status
        if (this.props.store.storage_reciept.err_sound === undefined) {
            err_sound_status = Sound.status.STOPPED
        } else {
            err_sound_status = this.props.store.storage_reciept.err_sound
        }

        return (
            <div>
                <div className="mobile_heading">
                    Приемка на склад несколько
                </div>
                <div className="storage_reciept_container">
                    <div className="storage_reciept_item">
                        Текущий склад: {this.props.store.storage_reciept.storage.name}
                    </div>
                    <div className="storage_reciept_item">
                        Зона хранения: {this.props.store.storage_reciept.selected_zone}
                    </div>
                    <div className="storage_reciept_item" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex" }}>
                            Звук:
                            <label className="switch">
                                <input type="checkbox" value={this.props.store.storage_reciept.Sound} onChange={() => this.props.storage_reciept_sound(!this.props.store.storage_reciept.sound)} />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <div style={{ display: "flex" }}>
                            QR:
                            <label className="switch">
                                <input type="checkbox" value={this.props.store.storage_reciept.qr} onChange={() => this.props.storage_reciept_qr(!this.props.store.storage_reciept.qr)} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <input className="storage_reciept_input" id="storage_reciept_input" autoFocus value={this.props.store.storage_reciept.barcode} onChange={(e) => { this.props.storage_reciept_set_barcode(e.target.value) }} />
                    <button className="storage_reciept_button_m" onClick={() => this.add_disp(this.props.store.storage_reciept.barcode)}>Добавить</button>
                    {this.props.store.storage_reciept.qr ? (
                        <QrReader
                            delay={100}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: '100%', margin: " 10px 0 0 0" }}
                        />
                    ) : (null)}
                    <button className="storage_reciept_button_m storage_reciept_button_m--fw">Получить</button>
                    
                    <div className="storage_reciept_list">
                        {this.props.store.storage_reciept.disp_list.map((item, index) => (
                            <div className="storage_reciept_list_item" key={index}>
                                <div className="storage_reciept_list_row">
                                    <div className="storage_reciept_list_label">Накладная:</div>
                                    <div className="storage_reciept_list_value">{item.num}</div>
                                </div>
                                <div className="storage_reciept_list_row">
                                    <div className="storage_reciept_list_label">Вид доставки:</div>
                                    <div className="storage_reciept_list_value">{item.del_method}</div>
                                </div>
                                <div className="storage_reciept_list_row">
                                    <div className="storage_reciept_list_label">Дата:</div>
                                    <div className="storage_reciept_list_value">{item.task_date}</div>
                                </div>
                                <div className="storage_reciept_list_row">
                                    <div className="storage_reciept_list_label">Курьер:</div>
                                    <div className="storage_reciept_list_value">{item.task_value}</div>
                                </div>
                                <div className="storage_reciept_list_row">
                                    <div className="storage_reciept_list_label">Город:</div>
                                    <div className="storage_reciept_list_value">{item.rec_city}</div>
                                </div>
                                <div className="storage_reciept_list_row">
                                    <div className="storage_reciept_list_label">Адрес:</div>
                                    <div className="storage_reciept_list_value">{item.rec_adress}</div>
                                </div>
                                <button className="storage_reciept_button_delete" onClick={() => this.props.storage_reciept_delete_list_item(index)}>Удалить</button>
                            </div>
                        ))}
                    </div>

                    {this.props.store.storage_reciept.status_type === "err" ? (
                        <div>
                            {this.props.store.storage_reciept.status_message}
                        </div>
                    ) : (null)}

                    <Sound volume={100} url={done_sound} playStatus={done_sound_status} />
                    <Sound volume={100} url={err_sound} playStatus={err_sound_status} />
                    <Sound volume={100} url={funk_sound} playStatus={funk_sound_status} />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        store: state
    }), 
    dispatch => ({
        storage_reciept_add_disp_list: (param) => { dispatch({ type: 'storage_reciept_add_disp_list', payload: param }) },

        storage_reciept_qr: (param) => { dispatch({ type: 'storage_reciept_qr', payload: param }) },
        storage_reciept_sound: (param) => { dispatch({ type: 'storage_reciept_sound', payload: param }) },
        storage_reciept_clear_list: (param) => { dispatch({ type: 'storage_reciept_clear_list', payload: param }) },

        storage_reciept_delete_list_item: (param) => { dispatch({ type: 'storage_reciept_delete_list_item', payload: param }) },

        storage_reciept_set_barcode: (param) => { dispatch({ type: 'storage_reciept_set_barcode', payload: param }) },
        storage_reciept_set_result: (param) => { dispatch({ type: 'storage_reciept_set_result', payload: param }) },
        storage_reciept_set_selected_zone: (param) => { dispatch({ type: 'storage_reciept_set_selected_zone', payload: param }) },

        storage_reciept_set_done_sound: (param) => { dispatch({ type: 'storage_reciept_set_done_sound', payload: param }) },
        storage_reciept_set_err_sound: (param) => { dispatch({ type: 'storage_reciept_set_err_sound', payload: param }) },
        storage_reciept_set_funk_sound: (param) => { dispatch({ type: 'storage_reciept_set_funk_sound', payload: param }) },
        storage_reciept_set_status_message: (param) => { dispatch({ type: 'storage_reciept_set_status_message', payload: param }) },
        storage_reciept_set_status_type: (param) => { dispatch({ type: 'storage_reciept_set_status_type', payload: param }) },

        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_popup_message: (param) => { dispatch({ type: 'set_popup_message', payload: param }) },
    })
)(Screen)

