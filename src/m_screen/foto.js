import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import { connect } from 'react-redux';
import './mobile.css';
import foto from '../common/foto.png';
import { get_data } from './../common/common_modules';
//import Sound from 'react-sound';
import fotoSound from './../common/funk.mp3';

class Screen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.cameraPhoto = null;
        this.videoRef = React.createRef();
    }

    foto_sound_play = () => {
        //this.props.storage_reciept_set_foto_sound(Sound.status.PLAYING);
    }

    foto_sound_stop = () => {
       // this.props.storage_reciept_set_foto_sound(Sound.status.STOPPED);
    }

    componentDidMount() {
        this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    }

    startCamera(idealFacingMode, idealResolution) {

        this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
            .then(() => {
                console.log('camera is started !');
            })
            .catch((error) => {
                console.error('Camera not started!', error);
            });
        
        this.props.camera_active(true);
    }

    takePhoto() {
        const config = {
            sizeFactor: 1
        };
        let dataUri = this.cameraPhoto.getDataUri(config);
        console.log(dataUri);
        this.props.take_foto(dataUri);
        this.foto_sound_play();
        this.stopCamera();
    }

    stopCamera() {
        this.foto_sound_stop();
        this.props.camera_active(false);
        this.cameraPhoto.stopCamera()
            .then(() => {
                console.log('Camera stoped!');
            })
            .catch((error) => {
                console.log('No camera to stop!:', error);
            });
    }

    send() {
        let foto = { 
            img: this.props.store.disp.foto,
        };
        get_data('testimg', foto).then(
            (result) => {
                console.log(result);
            }
        )
    }

    render() {

        return (
            <div className="mobile_container">
                <div className="mobile_button_container">
                    <button className={this.props.store.disp.cameraActive || this.props.store.disp.foto ? 'none' : 'camera_button'} onClick={() => {
                        let facingMode = FACING_MODES.ENVIRONMENT;
                        let idealResolution = { width: 1200, height: 1200 };
                        this.props.camera_active(true);
                        this.startCamera(facingMode, idealResolution);
                    }}>Включить Камеру</button>

                    <button className={this.props.store.disp.cameraActive ? 'camera_button' : 'none'} onClick={() => {
                        this.stopCamera();
                    }}>Выключить Камеру</button>

                    <button className={this.props.store.disp.foto ? 'camera_button' : 'none'} onClick={() => {
                        let facingMode = FACING_MODES.ENVIRONMENT;
                        let idealResolution = { width: 640, height: 640 };
                        this.props.take_foto('');
                        this.props.camera_active(true);
                        this.startCamera(facingMode, idealResolution);
                    }}>Переснять</button>
                </div>

                <div className={this.props.store.disp.cameraActive ? "video_container" : "none"} className="">
                    <video className={this.props.store.disp.cameraActive ? "foto" : "none"} ref={this.videoRef} autoPlay = {true}/>
                    
                    <img className={this.props.store.disp.cameraActive ? "video_button" : "none"} src={foto} onClick={() => {this.takePhoto()}} />
                    {/* <Sound url={fotoSound} playStatus={this.props.store.disp.foto_sound} /> */}
                </div>
                <img
                    className="foto"
                    src={this.props.store.disp.foto}
                />

                <button onClick={this.send.bind(this)}>отправить</button>
            </div>
        );
    }
} 

export default connect(
    (state) => ({ store: state }),
    dispatch => ({
        take_foto: (param) => { dispatch({ type: 'set_disp_foto', payload: param }) },
        camera_active: (param) => { dispatch({ type: 'set_camera_active', payload: param }) },
        storage_reciept_set_foto_sound: (param) => { dispatch({ type: 'set_foto_sound', payload: param }) },
    })
)(Screen);