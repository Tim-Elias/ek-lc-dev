import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';

class Screen extends React.Component {

    

    render() {

        return (
            <div>
                send manifest
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