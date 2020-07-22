import React  from 'react';
import { connect } from 'react-redux';

import Sound from 'react-sound';
import test_sound from './../common/Sound_11084.wav'

import { get_data } from './../common/common_modules'




class Screen extends React.Component {

    sound_play = () =>{
        this.props.set_test_sound(Sound.status.PLAYING) 
    }

    send_req = () => {
        console.log(this.props.store.test.barcode)
        this.props.modules.set_active_window("wait");
        
        const data = {
          userkey: this.props.store.login.userkey,
          barcode: this.props.store.storage_reciept.barcode,
          zone: this.props.store.storage_reciept.selected_zone,
          storage: this.props.store.storage_reciept.storage.id
        }
        
        get_data('storagereciept', data).then(
          (result) => {
            this.props.modules.set_active_window("storage_reciept");
            this.props.storage_reciept_set_result(result);
            this.props.storage_reciept_set_barcode('')
          },
          (err) => { 
            this.props.modules.set_active_window("storage_reciept");
            this.props.storage_reciept_set_result({
              status_type: 'err',
              status_message: err
            });
           }
        );
    
        
    }

   
    
    
    
      render() {
        
        const send_req = this.send_req
        document.onkeydown = function (event) {
            //console.log(event.keyCode)
            
            try {
              if (event.keyCode === 13) {
           
                send_req()
                
                
              }
            } catch (e) { 
                console.log(e)
            }
          };

        return (
          <div>
            <div className='disp_map_button'><button className='ui button mini' onClick={()=>{
                    this.props.set_full_screen()
                }}>Полноэкранный режим</button></div>
           <div>
             Текущий склад: {this.props.store.storage_reciept.storage.name}
           </div>
            <input autoFocus value={this.props.store.storage_reciept.barcode} onChange={(e)=>{this.props.storage_reciept_set_barcode(e.target.value)}} />
           {this.props.store.storage_reciept.status_type === "ok" ? (
             <div>
                <div>Накладная: {this.props.store.storage_reciept.num} </div>
                <div>Задача: {this.props.store.storage_reciept.task_type} </div>
                <div>Дата: {this.props.store.storage_reciept.task_date}</div>
                <div>Курьер: {this.props.store.storage_reciept.task_value}</div>
                <div>Заказчик: {this.props.store.storage_reciept.customer}</div>
                <div>Город: {this.props.store.storage_reciept.rec_city}</div>
                <div>Адрес: {this.props.store.storage_reciept.rec_adress}</div>
                <div>Район: {this.props.store.storage_reciept.rec_district}</div>
                <div>Получатель: {this.props.store.storage_reciept.rec_name}</div>
                
             </div>
           ):(null)}
           {this.props.store.storage_reciept.status_type === "err" ? (
             <div>
               {this.props.store.storage_reciept.storage.status_message}
             </div>
           ):(null)}
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
      storage_reciept_set_barcode: (param) => { dispatch({ type: 'storage_reciept_set_barcode', payload: param }) },
      storage_reciept_set_result: (param) => { dispatch({ type: 'storage_reciept_set_result', payload: param }) },
      set_full_screen: () => { dispatch({ type: 'set_full_screen'}) },
     // set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
       
    })
)(Screen)

