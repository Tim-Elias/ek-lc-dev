import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import './mobile_disp.css';

class Screen extends React.Component {


    render() {

        return (
            <div>
                not delivery
            </div>
        )
    }
};


export default connect(
    state => ({
        store: state
    }),
    dispatch => ({

    })

)(Screen);