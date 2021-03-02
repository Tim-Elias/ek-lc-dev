import React, { Component } from 'react';
import { connect } from 'react-redux';

class Screen extends Component {

    pos = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                alert('Последний раз вас засекали здесь: ' +
                    position.coords.latitude + ", " + position.coords.longitude);
            }
        );
    }

    render() {
        
        return (
            <div>
                <button onClick={this.pos.bind(this)}>Где я?</button>
            </div>
        )
    }
}


export default connect(
    (state) => ({ store: state }),
    dispatch => ({

    })
)(Screen);