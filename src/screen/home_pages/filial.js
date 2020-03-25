import React from 'react';
import { connect } from 'react-redux';

import { Card, Input, Button } from 'semantic-ui-react'

class Screen extends React.Component {
    render() {

        return (
            <div>
             Филиалы ЭК
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

    })
)(Screen);