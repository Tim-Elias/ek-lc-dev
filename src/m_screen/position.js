import React, { Component } from 'react';
import { connect } from 'react-redux';
import foto from '../common/foto.png';
import './mobile.css';

class Screen extends Component {

    // pos = () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             alert('Последний раз вас засекали здесь: ' +
    //                 position.coords.latitude + ", " + position.coords.longitude);
    //         }
    //     );
    // }

    render() {
        
        // window.onbeforeunload = function () { 
        //     return ( 
        //         "Your work will be lost."
        //     )
        // };

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        }; 

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