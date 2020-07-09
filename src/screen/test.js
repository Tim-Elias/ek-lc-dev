import React  from 'react';
import { connect } from 'react-redux';

import Sound from 'react-sound';
import test_sound from './../common/Sound_11084.wav'


// import SpeechRecognition from "react-speech-recognition";

// const recognition = new SpeechRecognition()

// recognition.continous = true
// recognition.interimResults = true
// recognition.lang = 'en-US'
// recognition.onresult = event => {
//     console.log(event)
//   }

class Screen extends React.Component {

    sound_test = () =>{
        this.props.set_test_sound(Sound.status.PLAYING) 
    }

    // start = () =>{
    //     recognition.start()
    // }

    // end = () => {
    //     recognition.end()

    // }
    
    
      render() {
        return (
          <div>
            {/* <button onClick={this.start.bind(this)}>start</button>
            <button onClick={this.end.bind(this)}>end</button> */}
            <button className="search_box" onClick={this.sound_test.bind(this)}>Тест звука</button>
           {this.props.store.general.test_sound !== undefined ? (
                <Sound
                url={test_sound}
                playStatus={this.props.store.general.test_sound}
                
                onLoading={console.log('1')}
                onPlaying={console.log('2')}
                onFinishedPlaying={console.log('3')}
              />
           ):(null)}
           
          </div>
        )
      }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_test_sound: (param) => { dispatch({ type: 'set_test_sound', payload: param }) },
    })
)(Screen)

