import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import { connect } from 'react-redux';
import './mobile.css';
import foto from '../common/foto.png';

class Screen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.cameraPhoto = null;
        this.videoRef = React.createRef();
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

        let cameraSettigs = this.cameraPhoto.getCameraSettings();

        if (cameraSettigs) {
            let { aspectRatio, frameRate, height, width } = cameraSettigs;
            let settingsStr =
                `aspectRatio:${aspectRatio} ` +
                `frameRate: ${frameRate} ` +
                `height: ${height} ` +
                `width: ${width}`;
            console.log(settingsStr);
        }




        const config = {
            sizeFactor: 1
        };
        let dataUri = this.cameraPhoto.getDataUri(config);
        this.props.take_foto(dataUri);
    }

    stopCamera() {
        this.props.camera_active(false);
        this.cameraPhoto.stopCamera()
            .then(() => {
                console.log('Camera stoped!');
            })
            .catch((error) => {
                console.log('No camera to stop!:', error);
            });
    }


    render() {
        return (
            <div className="mobile_container">
                <div className="mobile_button_container">
                    <button className={this.props.store.disp.cameraActive ? 'none' : 'camera_button'} onClick={() => {
                        let facingMode = FACING_MODES.ENVIRONMENT;
                        let idealResolution = { width: 640, height: 640 };
                        this.props.camera_active(true);
                        this.startCamera(facingMode, idealResolution);
                    }}>Включить Камеру</button>

                    <button className={this.props.store.disp.cameraActive ? 'camera_button' : 'none'} onClick={() => {
                        this.stopCamera();
                    }}>Выключить Камеру</button>
                </div>

                <div className="video_container">
                    <video className="video" ref={this.videoRef} autoPlay = {true}/>

                    <img className={(this.props.store.disp.cameraActive === true) ? "video_button" : "none"} src={foto} onClick={() => {this.takePhoto()}} />
                </div>
                
                <img
                    className="foto"
                    src={this.props.store.disp.foto}
                />
            </div>
        );
    }
} 

export default connect(
    (state) => ({ store: state }),
    dispatch => ({
        take_foto: (param) => { dispatch({ type: 'set_disp_foto', payload: param }) },
        camera_active: (param) => { dispatch({ type: 'set_camera_active', payload: param }) },
    })
)(Screen);