import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';

class Screen extends React.Component {

    _handleImageChange(e) {
        e.preventDefault();
        
        const fileName = e.target.files[0].name;

        const reader = new FileReader();

        if (e.target.files[0].size > 2000000) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = event => {
                const img = new Image();

                img.src = event.target.result;
                img.onload = () => {
                    const elem = document.createElement('canvas');
                    elem.width = img.width;
                    elem.height = img.height;
                    const ctx = elem.getContext('2d');

                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    const data = ctx.canvas.toDataURL('image/jpeg', 0.2);

                    this.props.take_foto(data);
                };
                reader.onerror = error => console.log(error);
            };
        } else {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                this.props.take_foto(reader.result);
            }
            reader.readAsDataURL(file);
        }

    }

    componentWillUnmount() {
        this.props.take_foto("");
    }

    render() {

        return (
            <div className="mobile_container">
                <label className="camera_button">
                    <span>Добавить фото</span>
                    <input className="file" type="file" accept="image/jpeg" onChange={e => this._handleImageChange(e)} />
                </label>
                <img
                    className="foto"
                    src={this.props.store.disp.foto}
                    alt=""
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({ store: state }),
    dispatch => ({
        take_foto: (param) => { dispatch({ type: 'set_disp_foto', payload: param }) },
    })
)(Screen);