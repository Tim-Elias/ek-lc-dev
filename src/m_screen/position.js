import React, { Component } from 'react';
import { connect } from 'react-redux';
import foto from '../common/foto.png';
import { browserHistory } from 'react-router';

class Screen extends Component {
    constructor(props, context) {
        super(props, context);

    }

    // onDragEnd = (result: any) => {
    //     console.log("Элемент отпущен!");
    // }

    // pos = () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             alert('Последний раз вас засекали здесь: ' +
    //                 position.coords.latitude + ", " + position.coords.longitude);
    //         }
    //     );
    // }

    componentDidMount() {
        this._isMounted = true;
        window.onpopstate = () => {
            if (this._isMounted) {
                const { hash } = this.location;
                if (hash.indexOf('home') > -1 && this.state.value !== 0)
                    alert("it's worked!!!")
                if (hash.indexOf('users') > -1 && this.state.value !== 1)
                    alert("it's worked!!!")
                if (hash.indexOf('data') > -1 && this.state.value !== 2)
                    alert("it's worked!!!")
            }
        }
    }

    render() {

        return (
            <div>
                {/* <button onClick={this.pos.bind(this)}>Где я?</button> */}
                <button>back</button>
            </div>
        )
    }
}


export default connect(
    (state) => ({ store: state }),
    dispatch => ({

    })
)(Screen);