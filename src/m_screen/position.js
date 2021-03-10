import React, { Component } from 'react';
import { connect } from 'react-redux';
// import foto from '../common/foto.png';
// import './mobile.css';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

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
            // <div>
            //     {/* <button onClick={this.pos.bind(this)}>Где я?</button> */}
            // </div>
            
            <div>
                <div>
                    <div className="mobile_storage_field">qweqwe</div>
                    <div className="mobile_storage_field">12.01.2020</div>
                    <div className="mobile_storage_field">dlfskdlf 123123</div>
                    <div className="mobile_storage_field">adress asdasdqweqwe</div>
                    <div className="mobile_storage_field">89123123</div>
                    <div className="mobile_storage_field">yfkbxysq hfcxtn</div>
                </div> 

                <div>
                    <div className="mobile_storage_field">qweqwe</div>
                    <div className="mobile_storage_field">12.01.2020</div>
                    <div className="mobile_storage_field">dlfskdlf 123123</div>
                    <div className="mobile_storage_field">adress asdasdqweqwe</div>
                    <div className="mobile_storage_field">89123123</div>
                    <div className="mobile_storage_field">yfkbxysq hfcxtn</div>
                </div>
            </div>    
        )
    }
}


export default connect(
    (state) => ({ store: state }),
    dispatch => ({

    })
)(Screen);