import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Select from 'react-select'
import { customStyles } from "./../common/common_style";
import { Card, Input, Button,Popup, Dropdown, List, Icon } from 'semantic-ui-react'
import logo from './../common/1024.png'
import './disp_map.css';
import { get_data } from './../common/common_modules'


let bermudaTriangle
let g_map
let g_maps
let markers = []
let shift = false


class Screen extends React.Component {


    set_courier_filter = async (value) => {
        await  this.props.set_courier_filter(value)
        this.render_markers(this.props.store.disp_map.disp_for_del,true) 
    }

    render_markers = (arr,hard) => {

        console.log(hard)
        arr.filter((disp_el)=>{return disp_el.modify || hard}).map(el=>{
            
            markers.filter((marker_el)=>{return marker_el.title === el.Num}).forEach((el_1)=>{
                el_1.setMap(null)
            })
            
            if (this.props.store.disp_map.courier_filter === '' || this.props.store.disp_map.courier_filter === el.TaskValue){

            

            const lat = parseFloat(el.RecLat.replace(/,/, '.'))
            const lng = parseFloat(el.RecLng.replace(/,/, '.'))
            const Num = el.Num
            const marker_onClick = this.marker_onClick
            let path
            let scale

            if (el.Weight > 5 || el.Volume > 5){
                path = 'M -3,2 -2,3 2,3 3,2 3,-2 2,-3 -2,-3 -3,-2 z'
                scale = 3
            } else {
                path = g_maps.SymbolPath.CIRCLE
                scale = 10
            }

            if (lat > 0 && lng > 0 ) {
               
                var marker = new g_maps.Marker({
                    position: {lat:lat, lng:lng},
                    map: g_map,
                    title: Num,
                    selected: el.selected,
                    icon: {
                        path: path,
                        fillColor: el.Color,
                        fillOpacity: 1,
                        strokeColor: 'black',
                        strokeWeight: .5,
                        scale: scale,
                      }
                  });

                  
                  var infowindow = new g_maps.InfoWindow({
                    content: `<div><div>${el.Num} </div><div>Заказчик: ${el.Customer}</div></div><div>Город: ${el.RecCity}</div><div>Адрес: <b>${el.RecAddress}</b></div><div>Получатель: ${el.RecPerson}</div><div>Телефон: ${el.RecPhone}</div><div>Время доставки: ${el.RecTime}</div><div>Вес: ${el.Weight} (${Math.round(el.Volume*5)/1000})</div><div>Статус: ${el.StatusType}: ${el.StatusValue} ${el.StoreZone===""?(""):("</div><div>Зона хранения:"+el.StoreZone)}</div></div>`
                    
                  });

                  if (el.selected){

                    if(!this.props.store.disp_map.assignment_mode && !shift){
                        infowindow.open(g_map, marker);
                    }
                    

                    setInterval(function() { toggleMarker() }, 300);

                    function toggleMarker() {
                    if (marker.getVisible()) {
                        marker.setVisible(false);
                    } else {
                        marker.setVisible(true);
                    }
                    }
                }

                markers.push(marker)
                //console.log('push '+ Num)
                
                  marker.addListener('click', function() {
                    marker_onClick(el.Num) 
                    
                  });

            }

            this.props.modify_disp_map({num:Num,modify:false})
        }
        }
        )
    }

    reset = async () => {

        
        await this.props.disp_map_reset_select()
        
        try {
            await bermudaTriangle.setPaths(this.props.store.disp_map.polygon)
            await bermudaTriangle.setMap(null);  
        } catch{

        } 
        await this.render_markers(this.props.store.disp_map.disp_for_del)
    }


    marker_onClick = async (key) => {
       await this.props.select_disp_map_disp_for_del({num:key, shift:shift})
        this.render_markers(this.props.store.disp_map.disp_for_del)
    }

    set_courier = () => {

        const set_courier_data = {
            userkey: this.props.store.login.userkey,
            courier: this.props.store.disp_map.input_courier,
            dispatch: this.props.store.disp_map.disp_for_del.filter(el=>el.selected).map(el=>{return(el.Num)}),  
        }

        //console.log(set_courier_data)
        get_data('setcourier', set_courier_data).then(
            (result) => {
                //console.log(result);
                this.get_map_data(this.props.store.disp_map.disp_for_del.filter(el=>!el.selected).map(el=>{return(el.Num)}) );
                this.reset()
            },
            (err) => { console.log(err) }
        );
        
    }

    get_map_data = (not_modify) =>{
        
        console.log(not_modify)

        markers.forEach((el_1)=>{
            const search = not_modify.indexOf(el_1.title)
            if (search === -1){
            el_1.setMap(null)
            }
        })

        const data = {
            userkey: this.props.store.login.userkey,
            terminal: "000000001",
            date: this.props.store.disp_map.date,
            not_modify: not_modify
        }

        get_data('dispfordel', data).then(
            (result) => {
                console.log(result)
                this.props.set_disp_map_disp_for_del(result)
                this.render_markers(result)
                
            },
            (err) => { 
                this.props.set_disp_map_disp_for_del([])
                console.log(err)
                 
            }
        );


    }

    set_disp_map_assignment_mode = (checked) =>{
        
        this.props.set_disp_map_assignment_mode(checked)
        this.reset()
    }

    geocode = (Num,Address) =>{

        console.log(Address)
        let geocoder = new g_maps.Geocoder();
        let position
        const userkey = this.props.store.login.userkey
        const get_map_data = this.get_map_data
        const reset = this.reset
        const not_modify = this.props.store.disp_map.disp_for_del.filter(el=>el.Num!==Num).map(el=>{return(el.Num)})
        geocoder.geocode( { 'address': Address}, function(results, status) {
            console.log(results)
            console.log(status)
            if (status == 'OK') {
                position = results[0].geometry.location

                const lat_lng_data = {
                    userkey: userkey,
                    dispatch: Num,
                    lat: position.lat(),
                    lng: position.lng()
                }

                get_data('setreclatlng', lat_lng_data).then(
                    (result) => {
                        console.log(result);
                        get_map_data(not_modify);
                        reset()
                    },
                    (err) => { console.log(err) }
                );
                
            }
        })
    }

    geocode_all = async () =>{

        let geocoder = new g_maps.Geocoder();
        const userkey = this.props.store.login.userkey
        const array = this.props.store.disp_map.disp_for_del.filter(el=>el.RecLat==="" || el.RecLng==="")
        const not_modify = this.props.store.disp_map.disp_for_del.filter(el=>el.RecLat!=="" && el.RecLng!=="").map(el=>{return(el.Num)})
        for(const el of array){
            
            if(el.RecAddress !== ""){
                await geocoder.geocode( { 'address': el.RecCity + el.RecAddress}, function(results, status) {
                
                if (status == 'OK') {
                    const position = results[0].geometry.location
    
                    const lat_lng_data = {
                        userkey: userkey,
                        dispatch: el.Num,
                        lat: position.lat(),
                        lng: position.lng()
                    }
    
                    get_data('setreclatlng', lat_lng_data).then(
                        (result) => {
                            console.log(result);
                        },
                        (err) => { console.log(err) }
                    );
                    
                }
            })
        }
        }

        this.get_map_data (not_modify)
        this.reset ()

        
    }
    
    open_disp = async (Num) => {
        this.props.set_active_window("wait");
    
        const data = {
          userkey: this.props.store.login.userkey,
          status: "Накладная",
          num: Num
        };
    
        get_data('dispatch', data).then(
          (result) => {
    
            this.props.set_data_disp(result);
            this.props.set_active_window("disp");
            this.props.set_last_window("disp_map");
    
          },
          (err) => { console.log(err) }
        );
    
    
      };

    render() {
        
        

        
        //var polygon_point = this.props.store.disp_map.polygon

        const map_clck = (target) => {
            
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
            this.render_markers(this.props.store.disp_map.disp_for_del)
        } else {
            bermudaTriangle.setMap(null);

        }

        }
        const render_markers = this.render_markers
        const arr = this.props.store.disp_map.disp_for_del
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
              g_maps.event.addListenerOnce(g_map, 'tilesloaded', ()=>{
                render_markers(arr,true)
              });

                

              g_maps.event.addListener(g_map, 'click', function(e) {
               
                map_clck(e.latLng)
                
            })

            
                

            
        }
       
        document.onkeydown = function (event) {
            //console.log(event.keyCode)
            try {
              if (event.keyCode === 16) {
                //set_hold_shift_true()
                //console.log("Нажал")
                shift = true
              }
            } catch (e) { }
          };
      
          document.onkeyup = function (event) {
            try {
              if (event.keyCode === 16) {
                //set_hold_shift_false()
                //console.log("Отпустил")
                shift = false
              }
            } catch (e) { }
          };
          
        let calc_height = "155px"
        if(this.props.store.general.full_screen){
            calc_height = "15px"
        }

        return (
            <div className="disp_map_window">
                <div className="disp_map_left_menu overflow_y">
                <div className='disp_map_button'><button className='ui button mini' onClick={()=>{
                    this.props.set_full_screen()
                    this.render_markers.bind(this,this.props.store.disp_map.disp_for_del,true)
                }}>Полноэкранный режим</button></div>
                <div className='disp_map_button'><button className='ui button mini'  onClick={this.geocode_all.bind(this)}>Получить все координаты ({this.props.store.disp_map.disp_for_del.filter(el=>el.RecLat==="" || el.RecLng==="").filter(el=>el.RecAddress!=="").length})</button></div>
            {this.props.store.disp_map.courier_filter !== ''?( <div>
                <a style={{margin:"0 5px"}}>{this.props.store.disp_map.courier_filter} </a>
                <button onClick={this.set_courier_filter.bind(this,'')}>x</button>
            </div>):(null)}
           
                <List divided relaxed>
                  
                  {this.props.store.disp_map.courier_list.map((courier,index)=>{
                      const courier_disp = this.props.store.disp_map.disp_for_del.filter(el=>el.TaskValue === courier.text)
                      const courier_disp_work = courier_disp.filter(el=>el.StatusType === 'У сотрудника').length
                      const courier_disp_not_work = courier_disp.filter(el=>el.StatusType !== 'У сотрудника').length
                      const q = courier_disp.length
                    if(q>0){
                      return( <List.Item key={index}>
                          {/* <List.Icon name='circle' verticalAlign='middle' /> */}
                          <i onClick={this.set_courier_filter.bind(this,courier.text)} aria-hidden="true" className="circle icon" style={{color:courier.color}}></i>
                          <List.Content>
                              {courier.text===''?(<List.Description as='a' onClick={()=>this.props.check_courier_disp_map(courier.key)}>
                          {"Не распределено"} <b>({q})</b>
                          </List.Description>):(<List.Description as='a' onClick={()=>this.props.check_courier_disp_map(courier.key)}>
                          {courier.text} 
                          {courier_disp_work !== 0 ? (<b>({courier_disp_work})</b>):(null)}
                          {courier_disp_not_work !== 0 ? (<b style={{color:'red'}}>({courier_disp_not_work})</b>):(null)}
                          </List.Description>)}
                          
                          {courier.checked?(
                              <List.List>
                                  {courier_disp.map((disp,index)=>{
                                        let color_row
                                        if(disp.selected){
                                            color_row = "#DDD"
                                        } else {
                                            color_row = "#FFF"
                                        }
                                      return(<List.Item  key={index}>

                                          <List.Content style={{backgroundColor:color_row}} onClick={this.marker_onClick.bind(this,disp.Num)}>
                                          <List.Header as='a'>{disp.Num} 
                                          <Icon name='expand' onClick={this.open_disp.bind(this,disp.Num)}></Icon>
                                          {disp.StatusType === 'У сотрудника'?(<Icon name='truck'></Icon>):(<Icon color='red' name='pallet'></Icon>)}
                                          </List.Header>
                                          <List.Description as='a'>{disp.RecCity}</List.Description>
                                            <List.Description as='a'>{disp.RecAddress}</List.Description>
                                            <List.Description as='a'>{"Вес:" + disp.Weight +" ("+ Math.round(disp.Volume*5)/1000+")"}</List.Description>
                                            {disp.RecLat === "" || disp.RecLng === "" ?(
                                                <Icon name='search' color='red' onClick={this.geocode.bind(this,disp.Num,disp.RecCity+disp.RecAddress)}></Icon>
                                            ):(null)}
                                            </List.Content>
                                      </List.Item >)
                                  }
                                  )}
                              </List.List>
                          ):(null)}
                          </List.Content>
                          </List.Item>)
                    }
                    
                  })}  
                    </List>



                </div>
                <div>
                <div className="disp_map_panel">
              
              <div className='disp_map_panel_element'><input onChange={e => this.props.set_disp_map_date(e.target.value)} value={this.props.store.disp_map.date}  type="date"></input></div> 
              <div id='rnk_div'><div>РНК</div><div><input onChange={e => this.set_disp_map_assignment_mode(e.target.checked)} checked={this.props.store.disp_map.assignment_mode}  type="checkbox"></input></div></div> 
              <div className='disp_map_panel_input_element'><div>Курьер </div>
                {/* <Dropdown
                        placeholder='Выберете курьера'
                        options={this.props.store.disp_map.courier_list}
                        
                        
                        selection
                        value={this.props.store.disp_map.selected_courier}
                        onChange={(sel_value) => this.props.select_disp_map_courier(sel_value._targetInst.return.key)}
                      />  */}

                    <div id="myDropdown" className="dropdown-content">
                        <i aria-hidden="true" className="circle icon" style={{color:this.props.store.disp_map.input_courier_color}}></i>
                        <input type="text" value={this.props.store.disp_map.input_courier} onChange={(e)=>{this.props.set_input_courier(e.target.value)}} id="disp_map_courier_input" onFocus={()=>this.props.set_focus_input_courier(true)} />
                        <button onClick={()=>{
                            this.props.set_input_courier({courier:'',color:'#000'})
                            this.props.set_focus_input_courier(false)
                            }
                            }>x</button>
                        {this.props.store.disp_map.courier_list.map((el,index)=>{
                            if (this.props.store.disp_map.focus_input_courier){
                                const filter = el.text.toUpperCase();
                                const text = this.props.store.disp_map.input_courier.toUpperCase()
                                if (filter.indexOf(text) > -1) {
                                    return (<p onClick={()=>{
                                        
                                        this.props.set_input_courier({courier:el.text, color:el.color})
                                        this.props.set_focus_input_courier(false)
                                    }} key={index}>
                                        <i aria-hidden="true" className="circle icon" style={{color:el.color}}></i>
                                        {el.text}
                                        </p>)
                                }
                        }
                        })}
                        
                    </div>
                </div> 
             
                <div className='disp_map_button'><button className='ui button mini' onClick={this.get_map_data.bind(this,[])}>Получить данные</button></div>
                <div className='disp_map_button'><button className='ui button mini' onClick={this.reset.bind(this)}>Сброс</button></div>
                <div className='disp_map_button'><button className='ui button mini' onClick={this.set_courier.bind(this)}>Назначить</button></div>
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
                  
                  </div>
                  )
              })
                }
                </div>)} 
              
                </div>
              <div className='disp_map'>
              
            
              <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD5AmmHNIXXN0yquTsPxoXuvtOp8OYhe2E' }}
                    defaultCenter={this.props.store.home.map.center}
                    defaultZoom={8}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
                >

           
        
                 {/* {this.props.store.disp_map.disp_for_del.map(el=>{
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
                        } */}

                </GoogleMapReact>
                </div>
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
        modify_disp_map: (param) => { dispatch({ type: 'modify_disp_map', payload: param }) },
        set_full_screen: () => { dispatch({ type: 'set_full_screen'}) },
        check_courier_disp_map: (param) => { dispatch({ type: 'check_courier_disp_map', payload: param }) },

        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
        set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
        set_focus_input_courier: (param) => { dispatch({ type: 'set_focus_input_courier', payload: param }) },
        set_input_courier: (param) => { dispatch({ type: 'set_input_courier', payload: param }) },
        set_courier_filter: (param) => { dispatch({ type: 'set_courier_filter', payload: param }) },
        
    })
)(Screen);