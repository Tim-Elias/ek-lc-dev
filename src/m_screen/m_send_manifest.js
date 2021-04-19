import React from 'react';
import { connect } from 'react-redux';
import '../screen/send_manifest.css';
import '../App.css';
import { get_data } from './../common/common_modules';
import Wait from "../screen/wait";
import { Item } from 'semantic-ui-react';

class Screen extends React.Component {


    componentDidMount() {

        this.props.set_active_loader(true);

        const list_data = { userkey: this.props.store.login.userkey };

        get_data('list', list_data).then(
            (result) => {
                this.props.set_list_storage(result);
                this.props.set_active_loader(false);
            },
            (err) => { 
                console.log(err);
                this.props.set_active_loader(false);
            }
        );
    }

    send_manifest = () => {

        this.props.set_active_window("wait");

        const dispatches = this.props.store.storage.list.filter((el) => { if (el.selected) return el }).map((disp) => { return disp.Number })
        const data = {
            userkey: this.props.store.login.userkey,
            dispatches: dispatches,
            storehouse: this.props.store.send_manifest.storehouse,
        };

        get_data('sendmanifest', data).then(
            (result) => {

                get_data('list', { userkey: this.props.store.login.userkey }).then(
                    (result) => {
                        this.props.set_list_storage(result);
                        this.props.set_active_window("storage");
                    },

                    (err) => {
                        this.props.set_active_window("storage");
                        console.log(err)
                    }
                );
            },
            (err) => {
                this.props.set_active_window("send_manifest");
                this.props.set_search_error(err)
            }
        );
    }


    render() {

        const search = () => {
            this.search();
        };

        return (
            <div>
                <div className="mobile_heading">Формирование исходящего манифеста</div>
                {this.props.store.general.active_loader ? (<Wait />) : (
                    <div className="mobile_container">
                        <select value={this.props.store.send_manifest.storehouse} onChange={e => this.props.set_send_manifest_storehouse(e.target.value)}>
                            <option value="000000001">Новосибирск, Коммунистическая 7</option>
                            <option value="000000006">Красноярск Караульная 4стр1</option>
                            <option value="000000002">Кемерово Рукавишникова 26</option>
                            <option value="000000009">Барнаул, Молодежная 111</option>
                            <option value="000000008">Омск, Потанина 15</option>
                            <option value="000000007">Томск, Герцена 13а</option>
                        </select>

                        {this.props.store.storage.list.filter((el) => {
                            const filter_num = el.Number.toUpperCase()
                            const filter_adress = el.Adress.toUpperCase()
                            const text = this.props.store.storage.search.toUpperCase()
                            return text === "" || filter_num.indexOf(text) > -1 || filter_adress.indexOf(text) > -1
                        }).filter((item) => (item.Type === "Доставка")).map((disp, index) =>
                            <div onClick={e => this.props.select_m_disp(disp.Number)} key={index} 
                                className="mobile_storage_item">
                                <input type="checkbox" className="mobile_storage_checkbox" checked={disp.selected} />
                                <div style={{width: "100%"}}>
                                    <div className="mobile_storage_field">{disp.Customer}</div>
                                    <div className="mobile_storage_field">{disp.Date}</div>
                                    <div className="mobile_storage_field">{disp.Type} {disp.Number}</div>
                                    <div className="mobile_storage_field">{disp.reccity} {disp.Adress}</div>
                                    <div className="mobile_storage_field">{disp.Phone} {disp.Person}</div>
                                    <div className="mobile_storage_field">{disp.AddInfo}</div>
                                </div>
                                <div className="mobile_storage_item_row">
                                    <div className="mobile_storage_field">{disp.Status}<br />{disp.Time}</div>

                                    <div className="mobile_storage_field"><b>{disp.COD} руб.</b></div>
                                </div>
                            </div>

                        )}

                        <div className="disp_data_el">Отправить на склад: накладных: {this.props.store.storage.list.filter((el) => { if (el.selected) return el }).length} (мест: {this.props.store.storage.list.filter((el) => { if (el.selected) return el }).reduce((sum, el) => { return sum + parseInt(el.total) }, 0)})</div>
                        <button onClick={this.send_manifest.bind(this)} className="send_manifest">Отправить и закрыть</button>

                    </div>
                )}
                
            </div>
        );
    }
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        select_m_disp: (param) => { dispatch({ type: 'select_m_disp', payload: param }) },
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_send_manifest_storehouse: (param) => { dispatch({ type: 'set_send_manifest_storehouse', payload: param }) },
        set_search_send_manifest: (param) => { dispatch({ type: 'set_search_send_manifest', payload: param }) },
        set_search_send_manifest_error: (param) => { dispatch({ type: 'set_search_error', payload: param }) },
        select_disp: (param) => { dispatch({ type: 'select_disp', payload: param }) },
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
    })
)(Screen);