import React  from 'react';
import { connect } from 'react-redux';
import { get_data } from './../common/common_modules'
import Sound from 'react-sound';
import test_sound from './../common/Sound_11084.wav'
import ReactToPrint from 'react-to-print'
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode'
import { Table, Button, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react'

//import voxImplant from 'voximplant-websdk'

// import SpeechRecognition from "react-speech-recognition";

// const recognition = new SpeechRecognition()

// recognition.continous = true
// recognition.interimResults = true
// recognition.lang = 'en-US'
// recognition.onresult = event => {
//     console.log(event)
//   }


let voximplant

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

    call = () =>{
      const call = voximplant.call("102");
    }


     voximplant = async ()  => {

      

      // const fetchJsFromCDN = (src, externals = []) => {
      //   new Promise((resolve, reject) => {
      //     const script = document.createElement('script')
      //     script.setAttribute('src', src)
      //     script.addEventListener('load', () => {
      //       resolve(externals.map(key => {
      //         const ext = window[key]
      //         typeof ext === 'undefined' && console.warn(`No external named '${key}' in window`)
      //         return ext
      //       }))
      //     })
      //     script.addEventListener('error', reject)
      //     document.body.appendChild(script)
      //   })
      // }
      
      // fetchJsFromCDN('//cdn.voximplant.com/edge/voximplant.min.js', ['VoxImplant']).then(([voximplant]) => voximplant.init())

      //console.log(VoxImplant)
      voximplant = window.VoxImplant.getInstance();
      try {
        await voximplant.init();
        console.log('SDK initialized')
        // voximplant.addEventListener(voximplant.Events.ConnectionClosed, () => {
        //   console.log('Connection was closed')
        // });
        try {
          await voximplant.connect();
          console.log('Connection was established successfully')
        } catch (e) {
          console.log('Connection failed')
        }
       } catch (e) {
        console.log('SDK init failure')
       }

       try {
        // Change "appname" and "accname" to names of your application and account,
        // "username" and "password" to name and password of user created via
        // the control panel.
        await voximplant.login("101@express-kinetika.timelias.voximplant.com",
          "Explorer48");
          console.log('Authorization success')
        // Authorization success
       } catch (e) {
        // Authorization failure
       }
    }
    

    check = () =>{
      
        this.props.set_active_window("wait");
        const data = {
            userkey: this.props.store.login.userkey,
           
        }
        get_data('createcheck', data).then(
            (result) => {
              this.props.set_active_window("test");  
              console.log(result)
            },
            (err) => {
                this.props.set_active_window("test");
                console.log(err)
            }
        );

    
    }
    
    
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
            <button onClick={this.voximplant.bind(this)}>Voximplant</button>
            <button onClick={this.check.bind(this)}>Chek</button>
            <button onClick={this.call.bind(this)}>Call</button>
           {/*  <button onClick={this.end.bind(this)}>end</button> */}

           <ReactToPrint
                            trigger={() => <Button><Icon name='print'></Icon> Печать</Button>}
                            content={() => this.componentRef}
                        />
                        <div style={{ display: "none" }}>
                            <div ref={el => (this.componentRef = el)}>
                              1234123123
                              <div className="barcode_container"><Barcode value={"12341234"} format='CODE39' width={1} height={30} /></div>
                              <div>AAAAAA</div>
                              <QRCode value={"12341234"} />
                            </div>
                        </div>

                        
            <input  value={this.props.store.test.barcode} onChange={(e)=>{this.props.set_test_barcode(e.target.value)}} />
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
      set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_test_sound: (param) => { dispatch({ type: 'set_test_sound', payload: param }) },
        test_list_add_item: (param) => { dispatch({ type: 'test_list_add_item', payload: param }) },
        set_test_barcode: (param) => { dispatch({ type: 'set_test_barcode', payload: param }) },
    })
)(Screen)

