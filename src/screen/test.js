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

    add_item = () => {
        this.props.test_list_add_item(this.props.store.test.barcode)
        this.props.set_test_barcode('')
    }

   
    // start = () =>{
    //     recognition.start()
    // }

    // end = () => {
    //     recognition.end()

    // }
    
    
      render() {
        
        const add_item = this.add_item
        document.onkeydown = function (event) {
            //console.log(event.keyCode)
            
            try {
              if (event.keyCode === 13) {
                  console.log()
                  add_item()
                
                
              }
            } catch (e) { 
                console.log(e)
            }
          };

        return (
          <div>
            {/* <button onClick={this.start.bind(this)}>start</button>
            <button onClick={this.end.bind(this)}>end</button> */}
            <input value={this.props.store.test.barcode} onChange={(e)=>{this.props.set_test_barcode(e.target.value)}} />
            {this.props.store.test.list.map((el,index)=>{
                return(
                    <div key={index}>{el}</div>
                )
            })}
            {/* <button className="search_box" onClick={this.sound_test.bind(this)}>Тест звука</button> */}
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
        test_list_add_item: (param) => { dispatch({ type: 'test_list_add_item', payload: param }) },
        set_test_barcode: (param) => { dispatch({ type: 'set_test_barcode', payload: param }) },
    })
)(Screen)

