import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { connect } from 'react-redux';

class Screen extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            result: 'No result'
        }
    }
    
    handleScan = data => {
        console.log(data);
        if (data) {
            this.setState({
                result: data
            })
        }
    }
    
    handleError = err => {
        console.error(err)
    }

    render() {
        
        return (
            <div>

                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}


export default connect(
    (state) => ({ store: state }),
    dispatch => ({
        
    })
)(Screen);