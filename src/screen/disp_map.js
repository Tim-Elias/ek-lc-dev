import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Select from 'react-select'
import { customStyles } from "./../common/common_style";
import { Card, Input, Button,Popup, Dropdown } from 'semantic-ui-react'
import logo from './../common/1024.png'
import './disp_map.css';
import { get_data } from './../common/common_modules'


const Marker = ({ text, color, onClick, el_key, opacity, borderColor, blink }) =>
<div className="map_marker" onClick={()=>onClick(el_key)}
    style={{ borderColor:borderColor, opacity: opacity, backgroundColor: color, cursor: 'pointer', animation: `blinkingBackground ${blink}s infinite` }}
    title={text}
></div> 

let bermudaTriangle
let g_map
let g_maps

class Screen extends React.Component {


    reset  = () => {
        this.props.disp_map_reset_select()
        try {
        bermudaTriangle.setPaths(this.props.store.disp_map.polygon)
        bermudaTriangle.setMap(null);
        
        } catch{}
    }


    marker_onClick = (key) => {
        this.props.select_disp_map_disp_for_del(key)
    //    console.log(key)
    }

    set_courier = () => {
        const set_courier_data = {
            userkey: this.props.store.login.userkey,
            courier: this.props.store.disp_map.selected_courier,
            dispatch: this.props.store.disp_map.disp_for_del.filter(el=>el.selected).map(el=>{return(el.Num)})  
        }
        console.log(set_courier_data)
        get_data('setcourier', set_courier_data).then(
            (result) => {
                console.log(result);
                this.get_map_data();
            },
            (err) => { console.log(err) }
        );
        this.reset()
    }

    get_map_data = () =>{
        console.log("get data")

        const data = {
            userkey: this.props.store.login.userkey,
            terminal: "000000001",
            date: this.props.store.disp_map.date
        }

        get_data('dispfordel', data).then(
            (result) => {
                console.log(result)
                this.props.set_disp_map_disp_for_del(result)
            },
            (err) => { console.log(err) }
        );


    }

    set_disp_map_assignment_mode = (checked) =>{
        this.reset()
        this.props.set_disp_map_assignment_mode(checked)
    }
    

    render() {
        
        

        
        //var polygon_point = this.props.store.disp_map.polygon

        const testfun = (target) => {
            
            if (this.props.store.disp_map.assignment_mode){
                
            this.props.disp_map_add_polygon_point(target) 
            
            bermudaTriangle.setPaths(this.props.store.disp_map.polygon)
            bermudaTriangle.setMap(g_map);

            let arr = []

            this.props.store.disp_map.disp_for_del.forEach(el => {
                
                const lat = parseFloat(el.RecLat.replace(/,/, '.'))
                const lng = parseFloat(el.RecLng.replace(/,/, '.'))
                if (lat > 0 && lng > 0 ) {
               
                var latLng = new g_maps.LatLng({lat: lat, lng: lng}); 
                var inside = g_maps.geometry.poly.containsLocation(latLng, bermudaTriangle)
                //console.log(latLng.lat() + " " + latLng.lng())

                //console.log(el.Num + inside)

                if(inside) {
                    arr.push(el.Num)
                    }
                }

            });
            
            this.props.select_arr_disp_for_del(arr)
        } else {
            bermudaTriangle.setMap(null);
        }

        }

        const onGoogleApiLoaded = (map, maps) => {
            g_map = map
            g_maps = maps  

            bermudaTriangle = new g_maps.Polygon({
           
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
              });
              g_maps.event.addListener(g_map, 'click', function(e) {
               
                testfun(e.latLng)
                
            })
        }

        return (
            <div>
              Карта с Накладными 
              <div><input onChange={e => this.props.set_disp_map_date(e.target.value)} value={this.props.store.disp_map.date} className="pod_input" type="date"></input></div> 
              <div>Режим назначения на курьера<input onChange={e => this.set_disp_map_assignment_mode(e.target.checked)} checked={this.props.store.disp_map.assignment_mode} className="pod_input" type="checkbox"></input></div> 
              <div>Курьер
                <Dropdown
                        placeholder='Выберете курьера'
                        options={this.props.store.disp_map.courier_list}
                        fluid
                        
                        selection
                        value={this.props.store.disp_map.selected_courier}
                        onChange={(sel_value) => this.props.select_disp_map_courier(sel_value._targetInst.return.key)}
                      /> 
                </div> 
             
              <button onClick={this.get_map_data.bind(this)}>Получить данные</button>
              <button onClick={this.reset.bind(this)}>Сброс</button>
              <button onClick={this.set_courier.bind(this)}>Назначить</button>
             {this.props.store.disp_map.assignment_mode ? (
                <div>
                  <div>Количество: {this.props.store.disp_map.disp_for_del.filter(el=>el.selected).length}</div> 
                  <div>Вес: {this.props.store.disp_map.disp_for_del.filter(el=>el.selected).reduce((acc,cur)=>{return acc+cur.Weight},0)}</div> 
                  <div>Объем: {this.props.store.disp_map.disp_for_del.filter(el=>el.selected).reduce((acc,cur)=>{return acc+cur.Volume},0)}</div>  
                </div>
             ):(<div>
              {this.props.store.disp_map.disp_for_del.filter(el=>el.selected).map((el,index) => {
                  
                  
                  return(
                      <div key={index}>
                  <div>{el.Num}</div>
                  <div>Заказчик: {el.Customer}</div>
                  <div>Город: {el.RecCity}</div>
                  <div>Адрес: {el.RecAddress}</div>
                  
                  <div>Получатель: {el.RecPerson}</div>
                  <div>Телефон: {el.RecPhone}</div>
                  <div>Время доставки: {el.RecTime}</div>
                  <div>Вес: {el.Weight} ({el.Volume})</div>
                  </div>
                  )
              })
                }
                </div>)} 
              

              <div className='disp_map'>
              
            
              <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD5AmmHNIXXN0yquTsPxoXuvtOp8OYhe2E' }}
                    defaultCenter={this.props.store.home.map.center}
                    defaultZoom={8}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
                >

           
        
                 {this.props.store.disp_map.disp_for_del.map(el=>{
                        let opacity = 0.9
                        let blink = 0
                        let borderColor = '#888'
                       if (el.selected) {
                        opacity = 1
                        borderColor = '#000'
                        blink = 0.2
                       }
                        const lat = parseFloat(el.RecLat.replace(/,/, '.'))
                        const lng = parseFloat(el.RecLng.replace(/,/, '.'))

                        if (lat > 0 && lng > 0 ) {
                           
                        return(
                            <Marker 
                            key={el.Num}
                            lat={lat}
                            lng={lng}
                            text={el.Num} 
                            size={5}
                            el_key={el.Num}
                            color={el.Color}
                            opacity={opacity}
                            borderColor={borderColor}
                            onClick = {this.marker_onClick}
                            blink = {blink}
                            
                            />
                            )

                        }
                        }
                    )
                        }

                </GoogleMapReact>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
        set_disp_map_date: (param) => { dispatch({ type: 'set_disp_map_date', payload: param }) },
        disp_map_reset_select: () => { dispatch({ type: 'disp_map_reset_select' }) },
        set_disp_map_disp_for_del: (param) => { dispatch({ type: 'set_disp_map_disp_for_del', payload: param }) },
        select_disp_map_disp_for_del: (param) => { dispatch({ type: 'select_disp_map_disp_for_del', payload: param }) },
        set_disp_map_assignment_mode: (param) => { dispatch({ type: 'set_disp_map_assignment_mode', payload: param }) },
        select_disp_map_courier: (param) => { dispatch({ type: 'select_disp_map_courier', payload: param }) },
        disp_map_add_polygon_point: (param) => { dispatch({ type: 'disp_map_add_polygon_point', payload: param }) },
        select_arr_disp_for_del: (param) => { dispatch({ type: 'select_arr_disp_for_del', payload: param }) },
    })
)(Screen);