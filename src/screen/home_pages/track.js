import React from 'react';
import { connect } from 'react-redux';
import { get_data } from './../../common/common_modules'

import { Dimmer, Input, Button, Loader, Table } from 'semantic-ui-react'

class Screen extends React.Component {

    find = () => {
        if (this.props.store.home.track_number !== '') {
            this.props.set_disp_history_loading(true)
            get_data('history', { Number: this.props.store.home.track_number }).then(
                (result) => {
                    this.props.set_disp_history(result);
                    this.props.set_disp_history_loading(false)
                },
                (err) => { console.log(err) }
            );
        }

    }

    render() {

        return (
            <div >
                <div className='track_data'>
                    <Input size='small'
                        value={this.props.store.home.track_number}
                        onChange={(e) => this.props.set_track_number(e.target.value)}
                        placeholder='Введите номер накладной...' />

                    <div className='track_button'><Button onClick={this.find.bind(this)}> Найти </Button></div>
                </div>
                {this.props.store.disp.history.length !== 0 ? (
                    <div className='home_history'>
                        {this.props.store.disp.history_loading ? (
                            <div>
                                <Dimmer active inverted>
                                    <Loader inverted content='Loading' />
                                </Dimmer>
                            </div>
                        ) : (
                                <Table celled compact='very'>
                                    <Table.Header className="create_disp_template_list_th">
                                        <Table.Row>
                                            <Table.HeaderCell>Дата</Table.HeaderCell>
                                            <Table.HeaderCell>Статус</Table.HeaderCell>
                                            <Table.HeaderCell>Комментарий</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {this.props.store.disp.history.map((el, index) =>

                                            <Table.Row className="create_disp_template_list_tr" key={index}>
                                                <Table.Cell >{el.Date}</Table.Cell>
                                                <Table.Cell>{el.Status}</Table.Cell>
                                                <Table.Cell>{el.Comment}</Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            )}

                    </div>
                ) : (null)}


            </div>

        )
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_track_number: (param) => { dispatch({ type: 'set_track_number', payload: param }) },
        set_disp_history_loading: (param) => { dispatch({ type: 'set_disp_history_loading', payload: param }) },
        set_disp_history: (param) => { dispatch({ type: 'set_disp_history', payload: param }) },

    })
)(Screen);