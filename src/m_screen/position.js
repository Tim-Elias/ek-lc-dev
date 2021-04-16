import React from 'react';
import { connect } from 'react-redux';

// const socket = new WebSocket('wss://echo.websocket.org');//EventSource

class Screen extends React.Component {

    componentDidMount() {

        // if (Notification.permission === "denied" || "default") {
        //     Notification.requestPermission();
        // }

        // socket.addEventListener('message', function (event) {
        //     console.log('Message from server: ', event.data);
        //     const notification = new Notification("New message!", {
        //         body: 'Message from server: ' + event.data,
        //         requireInteraction: true,
        //         icon: "../public/1024.png",
        //     });
        // });

    }

    mess = () => {
        // socket.send(this.props.store.test.message);
    }

    render() {
        return (
            <div className="check_print_qr">

                <div className="check_print_row check_print_row--center">{this.props.store.disp.data.Number}</div><br />

                <div className="check_print_row check_print_row--center">Данные отправителя</div>
                <div className="check_print_row">Город: {this.props.store.disp.data.SendCity}</div>
                <div className="check_print_row">Адрес: {this.props.store.disp.data.SendAdress}</div>
                <div className="check_print_row">Компания: {this.props.store.disp.data.SendCompany}</div>
                <div className="check_print_row">Телефон: {this.props.store.disp.data.SendPhone}</div>
                <div className="check_print_row">Контактное лицо: {this.props.store.disp.data.SendPerson}</div>
                <div className="check_print_row">Доп. информация: {this.props.store.disp.data.SendAddInfo}</div><br />

                <div className="check_print_row check_print_row--center">Данные получателя</div>
                <div className="check_print_row">Город: {this.props.store.disp.data.RecCity}</div>
                <div className="check_print_row">Адрес: {this.props.store.disp.data.RecAdress}</div>
                <div className="check_print_row">Компания: {this.props.store.disp.data.RecCompany}</div>
                <div className="check_print_row">Телефон: {this.props.store.disp.data.RecPhone}</div>
                <div className="check_print_row">Контактное лицо: {this.props.store.disp.data.RecPerson}</div>
                <div className="check_print_row">Доп. информация: {this.props.store.disp.data.RecAddInfo}</div>
                <div className="check_print_row">Время: {this.props.store.disp.data.Time}</div><br />

                <div className="check_print_row check_print_row--center">Данные об отправлении</div>
                <div className="check_print_row">Мест: {this.props.store.disp.data.Total}</div>
                <div className="check_print_row">Вес: {this.props.store.disp.data.Weight} кг.</div>
                <div className="check_print_row">V вес: {this.props.store.disp.data.Volume} кг.</div>
                <div className="check_print_row">Вид доставки: {this.props.store.disp.data.DelMethod}</div>

                <div className="check_print_row">К оплате: {this.props.store.disp.data.COD} руб.</div>
                {this.props.store.disp.data.TMin !== "0" && this.props.store.disp.data.TMax !== "0" ? <div>
                    <div className="check_print_row">Температурный режим:</div>
                    <div className="check_print_row">{this.props.store.disp.data.TMin} : {this.props.store.disp.data.TMax}</div>
                </div> : (null)}

                {this.props.store.disp.data.Type === 'Доставка' ? (
                    <div>
                        <div className="check_print_row">Тип оплаты: {this.props.store.disp.data.PayType}</div>
                        <div className="check_print_row">Тип доставки: {this.props.store.disp.data.DelType}</div>
                    </div>
                ) : (null)}

                <br />
                <div className="check_print_row">Информация о вручении</div>
                <br />
                <br />

                <div className="check_print_line_container">
                    <div className="check_print_line check_print_line--full"></div>
                </div>
                <div className="check_print_line_container">
                    <div className="check_print_row check_print_row--center">Дата</div>
                    <div className="check_print_row check_print_row--center">Время</div>
                </div>
                <br />

                <div className="check_print_line_container">
                    <div className="check_print_line">klkl </div>
                    <div className="check_print_row">/</div>
                    <div className="check_print_line"> </div>
                </div>
                <div className="check_print_line_container">
                    <div className="check_print_row">Получатель</div>
                    <div className="check_print_row">Подпись</div>
                </div>
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