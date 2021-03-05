import React, { Component } from 'react';
import { connect } from 'react-redux';
import foto from '../common/foto.png';

class Screen extends Component {
    constructor(props, context) {
        super(props, context);

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd = (result: any) => {
        console.log("Элемент отпущен!");
    }

    // pos = () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             alert('Последний раз вас засекали здесь: ' +
    //                 position.coords.latitude + ", " + position.coords.longitude);
    //         }
    //     );
    // }

    render() {

        const numbers = this.state.column.numberIds.map((numberId: string) => this.state.numbers[numberId]);

        return (
            <div>
                {/* <button onClick={this.pos.bind(this)}>Где я?</button> */}

            </div>
        )
    }
}


export default connect(
    (state) => ({ store: state }),
    dispatch => ({

    })
)(Screen);