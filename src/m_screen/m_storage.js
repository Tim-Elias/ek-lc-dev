import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import './mobile_storage.css';
import { get_data } from '../common/common_modules';

class Screen extends React.Component {

    tr_click = async (disp) => {
        this.props.set_active_window("wait");

        const data = {
            userkey: this.props.store.login.userkey,
            status: disp.Type,
            num: disp.Number,
        };

        get_data('dispatch', data).then(
            (result) => {
                console.log(result)
                this.props.set_data_disp(result);
                this.props.set_active_window("m_disp");
                this.props.set_last_window("storage");
                this.props.set_action("deliver");
            },
            (err) => { console.log(err) }
        );
    };

    render() {

        return (
            <div>
                <div className="mobile_heading">
                    Доставки и Заявки
                </div>
                <div className="mobile_storage">
                    <div className="mobile_container">
                        {this.props.store.storage.list.filter((el) => this.props.store.storage.search === "" || el.Number.indexOf(this.props.store.storage.search) !== -1).map((disp, index) =>

                            <div className={disp.Status === 'Отменена' ? "mobile_storage_item mobile_storage_item--canceling" : "mobile_storage_item"} onClick={this.tr_click.bind(this, disp)}>
                                <div>
                                    <div className="mobile_storage_field">{disp.Customer}</div>
                                    <div className="mobile_storage_field">{disp.Date}</div>
                                    <div className="mobile_storage_field">{disp.Type} {disp.Number}</div>
                                    <div className="mobile_storage_field">{disp.reccity} {disp.Adress}</div>
                                    <div className="mobile_storage_field">{disp.Phone} {disp.Person}</div>
                                </div>
                                <div className="mobile_storage_item_row">
                                    <div className="mobile_storage_field">{disp.Status}</div>
                                    <div className="mobile_storage_field"><b>{disp.COD} руб.</b></div>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        )
    }
};


export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
        set_last_window: () => { dispatch({ type: 'set_last_window', payload: "storage" }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_action: (param) => { dispatch({ type: 'set_action', payload: param }) },
    })

)(Screen);