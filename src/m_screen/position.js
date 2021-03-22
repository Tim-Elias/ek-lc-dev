import React from 'react';
import { connect } from 'react-redux';

const socket = new WebSocket('wss://echo.websocket.org');//EventSource

class Screen extends React.Component {

    componentDidMount() {

        if (Notification.permission === "denied" || "default") {
            Notification.requestPermission();
        }

        socket.addEventListener('message', function (event) {
            console.log('Message from server: ', event.data);
            const notification = new Notification("New message!", {
                body: 'Message from server: ' + event.data,
                requireInteraction: true,
                icon: "../public/1024.png",
            });
        });

    }

    mess = () => {
        socket.send(this.props.store.test.message);
    }

    render() {

        return (
            <div>
                <input type="text" value={this.props.store.test.message} onChange={e => this.props.set_message(e.target.value)} />
                <button onClick={this.mess.bind(this)}>отправить сообщение</button>
            </div>
        )
    }
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_message: (param) => { dispatch({ type: 'set_message', payload: param  }) },
    })
)(Screen);