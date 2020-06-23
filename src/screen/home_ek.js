import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { get_data } from './../common/common_modules'
import transit from './../common/transit-2.png'
import transit_card from './../common/transit_card.png'
import courier_card from './../common/courier.png'
import im_card from './../common/im_2.png'
import logo from './../common/1024.png'
import GoogleMapReact from 'google-map-react';
import map from './../common/map.png'
import { Modal, Dimmer, Loader, Table, Image, Card, Icon } from 'semantic-ui-react'
import './home_ek.css';
import client_1 from './../common/clients/client_1.png'
import client_2 from './../common/clients/client_2.png'
import client_3 from './../common/clients/client_3.png'
import client_4 from './../common/clients/client_4.png'

import review_1 from './../common/review_1.png'
import director from './../common/director.png'

let g_map
let g_maps
let markers = []

// const Marker = ({ size, text, el_key, onClick }) =>
// <div className="marker"
//     style={{ width: `${size}px`, height: `${size}px`, backgroundImage: `url(${logo})`, cursor: 'pointer' }}
//     title={text}
// ></div> 

class Screen extends React.Component {

    render_markers = () => {

        const arr = this.props.store.home.filial
        // {this.props.store.home.filial.map(el=>{
        //     return(
        //         <Marker 
        //         key={el.el_key}
        //         lat={el.lat}
        //         lng={el.lng}
        //         text={el.text} 
        //         size={el.size}
        //         el_key={el.el_key}
        //         onClick = {this.marker_onClick}
                
        //         />
        //         )}
        // )
        //     }


        
        arr.map(el=>{
            
            
            
            // const marker_onClick = this.marker_onClick
            
            const lat = el.lat
            const lng = el.lng
            // const size = new g_maps.Size(30, 30)

            // var image = { 
            //     // url: process.env.PUBLIC_URL + '/static/media/1024.149b5f09.png',
            //     // This marker is 20 pixels wide by 32 pixels high.
            //     size: new g_maps.Size(20, 32),
            //     // The origin for this image is (0, 0).
            //     origin: new g_maps.Point(0, 0),
            //     // The anchor for this image is the base of the flagpole at (0, 32).
            //     anchor: new g_maps.Point(0, 32)
            //   };
              // Shapes define the clickable region of the icon. The type defines an HTML
              // <area> element 'poly' which traces out a polygon as a series of X,Y points.
              // The final coordinate closes the poly by connecting to the first coordinate.
            //   var shape = {
            //     coords: [1, 1, 1, 20, 18, 20, 18, 1],
            //     type: 'poly'
            //   };


            // const path = 
               
                const marker = new g_maps.Marker({

                    position: {lat:lat, lng:lng},
                    map: g_map,
                    title: el.text,
                    // selected: el.selected,
                    // icon: {
                    //     url: logo,
                    //     fillOpacity: 1,
                        
                        
                    //   }
                    // icon: image,
                    // shape: shape,
                  });

                  
                  var infowindow = new g_maps.InfoWindow({
                    
                    content: `<div><div>${el.text} </div><div>Заказчик: ${el.phone}</div></div><div>Город: ${el.email}</div><div>Адрес: <b>${el.work_hour}</b></div></div>`
                    
                  });

                //   if (el.selected){

                //     if(!this.props.store.disp_map.assignment_mode && !shift){
                //         infowindow.open(g_map, marker);
                //     }
                    
                // }

                markers.push(marker)
                //console.log('push '+ Num)
                
                  marker.addListener('click', function() {
                    //marker_onClick(el.Num) 
                    
                  });

            

            
            }
        )
    }

    find = () => {
        if (this.props.store.home.track_number !== '') {
            this.props.set_disp_history_loading(true)
            get_data('history', { Number: this.props.store.home.track_number }).then(
                (result) => {
                    this.props.set_disp_history(result);
                    this.props.set_disp_history_loading(false)
                },
                (err) => { console.log(err) }
            );
        }

    }


    render() {
        const render_markers = this.render_markers
        const onGoogleApiLoaded = (map, maps) => {
            g_map = map
            g_maps = maps  

            
            g_maps.event.addListenerOnce(g_map, 'tilesloaded', ()=>{
                render_markers()
              });

                

            g_maps.event.addListener(g_map, 'click', function(e) {
               
                // map_clck(e.latLng)
                
            })

            
                

            
        }

        document.onkeydown = function (event) {}
    
        return (
            <div className="home_content">
                <div className="home_menu home_content_element">
                    <div className="home_menu_element">Услуги</div>
                    <div className="home_menu_element">Отслеживание</div>
                    <div className="home_menu_element">Тарифы</div>
                    <div className="home_menu_element">Междугородние перевозки</div>
                    <div className="home_menu_element">Экспресс доставка</div>
                    <div className="home_menu_element">Интренет-магазинам</div>
                    
                </div>
                <div className="home_main_offer home_content_element"  style={{ backgroundImage: `url(${transit})` }}>
                 
                   <h1 className="home_main_offer_label"> 
                       Срочная доставка
                    <br />
                       грузов и документов
                    </h1>
                    
                    <div className="home_main_offer_list">
                    <div className="home_main_offer_list_element">
                    <i aria-hidden="true" className="circle icon" style={{color:"#E87B1A"}}></i><div>Перевозки за 1 ночь по направлениям НСО, Алтай, Кузбасс, <br />Красноярский край и Омская область</div>
                    </div>
                    <div className="home_main_offer_list_element">
                    <i aria-hidden="true" className="circle icon" style={{color:"#E87B1A"}}></i><div>Экспресс доставка документов и грузов от двери до двери</div>
                    </div>
                    <div className="home_main_offer_list_element">
                    <i aria-hidden="true" className="circle icon" style={{color:"#E87B1A"}}></i><div>Доставка товаров интернет магазинов с приемом оплаты</div>
                    </div>
                   </div>
                   <button className="home_main_offer_button">Оставить заявку</button>
                   

                   
                </div>

                <div className="home_service_selector home_content_element">
                    <div className="home_service_content">
                   <div className="home_service_selector_menu">
                       
                   {this.props.store.home_ek.home_service_selector === 1?(
                       <div onClick={()=>this.props.set_home_service_selector(1)}  className="home_service_selector_menu_element_selected" >
                       Рассчитать стоимость
                       </div>
                   ):(
                        <div onClick={()=>this.props.set_home_service_selector(1)} style={{borderRight:"1px solid #2444B5"}} className="home_service_selector_menu_element" >
                       Рассчитать стоимость
                       </div>)}

                       {this.props.store.home_ek.home_service_selector === 2?(
                       <div onClick={()=>this.props.set_home_service_selector(2)}  className="home_service_selector_menu_element_selected" >
                       Отследить накладную
                       </div>
                   ):(
                        <div onClick={()=>this.props.set_home_service_selector(2)} style={{borderRight:"1px solid #2444B5"}} className="home_service_selector_menu_element" >
                       Отследить накладную
                       </div>)}

                       {this.props.store.home_ek.home_service_selector === 3?(
                       <div onClick={()=>this.props.set_home_service_selector(3)}  className="home_service_selector_menu_element_selected" >
                       Вызвать курьера
                       </div>
                   ):(
                        <div onClick={()=>this.props.set_home_service_selector(3)}  className="home_service_selector_menu_element" >
                       Вызвать курьера
                       </div>)}
                   </div>
                   {this.props.store.home_ek.home_service_selector === 1?(<div className="home_service_selector_content">
                        <div className="home_service_selector_content_calc">
                            <input placeholder='Город отправления' className="home_service_selector_content_input"></input>
                            <input placeholder='Город назначения' className="home_service_selector_content_input"></input>
                            <input placeholder='Вес (кг)' className="home_service_selector_content_input"></input>
                            <button className="home_service_selector_content_button">Рассчитать</button>

                        </div>
                    </div>
                    ):(null)}
                    {this.props.store.home_ek.home_service_selector === 2?(<div className="home_service_selector_content">
                    <div className="home_service_selector_content_track">
                            <input 
                            placeholder='Номер накладной' 
                            className="home_service_selector_content_input"
                            onChange={(e) => this.props.set_track_number(e.target.value)}
                            value={this.props.store.home.track_number}
                            ></input>
                            <button onClick={this.find.bind(this)} className="home_service_selector_content_button">Отследить</button>
                            <Modal
                            // trigger={}
                            open={this.props.store.disp.history.length !== 0}
                            onClose={()=>this.props.set_disp_history([])}
                            basic
                            size='small'
                        >
                        
                            {this.props.store.disp.history_loading ? (
                            <div>
                                <Dimmer active inverted>
                                    <Loader inverted content='Loading' />
                                </Dimmer>
                            </div>
                        ) : (
                            <div style={{margin:"20px"}}>
                                <Table celled>
                                    <Table.Header className="create_disp_template_list_th">
                                        <Table.Row>
                                            <Table.HeaderCell>Дата</Table.HeaderCell>
                                            <Table.HeaderCell>Статус</Table.HeaderCell>
                                            <Table.HeaderCell>Комментарий</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {this.props.store.disp.history.map((el, index) =>

                                            <Table.Row className="create_disp_template_list_tr" key={index}>
                                                <Table.Cell >{el.Date}</Table.Cell>
                                                <Table.Cell>{el.Status}</Table.Cell>
                                                <Table.Cell>{el.Comment}</Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                                </div>
                             )} 
                             
                            </Modal>
                  
                  </div>
                    </div>
                    ):(null)}
                    {this.props.store.home_ek.home_service_selector === 3?(<div className="home_service_selector_content">
                    <div className="home_service_selector_content_order">
                            <input placeholder='Город отправления' className="home_service_selector_content_input"></input>
                            <input placeholder='Адрес отправления' className="home_service_selector_content_input"></input>
                            <input placeholder='Имя отправителя' className="home_service_selector_content_input"></input>
                            <input placeholder='Телефон отправителя' className="home_service_selector_content_input"></input>
                            <button className="home_service_selector_content_button">Вызвать курьера</button>

                        </div>
                    </div>
                    ):(null)}
                   </div>
                </div>

                

                <div className="home_service_cards home_content_element">
                    <div className="home_service_card shadow" > 
                        <h3 className="home_service_card_label">Междугородние перевозки</h3>
                       
                       <div className="home_service_card_content" style={{ backgroundImage: `url(${transit_card})` }}>
                            Перевозка за 1 ночь <br /> От конверта до паллета <br /> Прием до 19:00 <br /> Выдача с 09:00
                        </div>
                        <div>
                        <i aria-hidden="true" style={{color:"#E87B1A", cursor:"pointer"}} className="big long arrow alternate right icon"></i>
                        </div>
                    </div>
              
                    <div className="home_service_card shadow">
                    <h3 className="home_service_card_label">Экспресс доставка от двери до двери</h3>
                       
                       <div className="home_service_card_content" style={{ backgroundImage: `url(${courier_card})` }}>
                            По всей России <br /> Прием заявок до 14:00 <br /> Доставка лично в руки
                        </div>
                        <div>
                        <i aria-hidden="true" style={{color:"#E87B1A", cursor:"pointer"}} className="big long arrow alternate right icon"></i>
                        </div>
                    </div>
            
                    <div className="home_service_card shadow">
                    <h3 className="home_service_card_label">Доставка заказов Интренет-магазинов</h3>
                       
                       <div className="home_service_card_content" style={{ backgroundImage: `url(${im_card})` }}>
                            Доставка день в день <br /> Заказы до 30 кг <br /> Прием оплаты от клиента <br /> Доставка 7 дней в неделю
                        </div>
                        <div>
                        <i aria-hidden="true" style={{color:"#E87B1A", cursor:"pointer"}} className="big long arrow alternate right icon"></i>
                        </div>
                    </div>
                </div>

                <div className="filials home_content_element shadow">
                   <h2 className="text_align_center font_36 filials_header">География</h2>
                    <div className="text_align_center filials_text">Экспресс Кинетика доставляет грузы и документы по всей России
                        <br /> 
                        Мы ежедневно выполняем перевозки собственными авто между филиалами за 1 ночь по направлениям НСО, Кузбасс 
                        <br /> 
                        Алтайский край, Красноярский край и Омская область</div>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD5AmmHNIXXN0yquTsPxoXuvtOp8OYhe2E' }}
                    defaultCenter={this.props.store.home.map.center}
                    defaultZoom={6}
                    onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
                    yesIWantToUseGoogleMapApiInternals
                    >
                    
                   


                </GoogleMapReact>
                    {/* <div className="filials_map" style={{ backgroundImage: `url(${map})` }}></div> */}
                    
                </div>

                <div style={{backgroundColor: "#E87B1A"}} className="callbacker home_content_element ">
                    <div className="callbacker_wrapper">
                    <h2 className="text_align_center font_36">Необходимо индивидуальное предложение?</h2>
                    <div className="text_align_center filials_text">
                        Мы разработаем для вас индивидуальный маршрут.
                        <br />
                        Можем сделать его как разовым, так и регулярным.
                    </div>
                    <div className="callbacker_content">
                            <input placeholder='Имя' className="callbacker_input"></input>
                            <input placeholder='Телефон' className="callbacker_input"></input>
                            <input placeholder='e-mail' className="callbacker_input"></input>
                            <button className="callbacker_button_1">Рассчитать</button>

                        </div>
                        </div>
                </div> 

                <div className="about home_content_element">
                    <div className="about_left">
                        <div  className="about_container" >
                            <img className="about_photo" src={director}/>
                            {/* <div style={{ backgroundSize:  "300px auto", backgroundImage: `url(${director})` }} className="about_photo"> */}

                            {/* </div> */}
                        </div>
                        
                    </div>
                    <div className="about_right">
                        <h2></h2>
                        <div className="about_text">
                       Любимый наш клиент, <br />
                   Самое драгоценное, что у нас есть, это твое доверие. И будь уверен, каждый день мы работаем так, чтобы заслужить его снова и снова.
                    Каждый день мы принимаем, перевозим и доставляем твои грузы.
                    Делаем это бережно и вовремя.
                    В любое время, что бы ни случилось, ты можешь положиться на нас.
                   Все твои задачи по перевозке и экспедированию грузов будут решены.
                   Сроки, терморежим, и любые другие индивидуальные условия работы не являются проблемой.
                    Просто скажи, что нужно, и мы всё сделаем.
                   Мы ценим тебя, и очень надеемся, что это взаимно.
                   <br />
                   <br />
                   <b>Ярослав Адамович<br />Директор Экспресс Кинетика</b>
                       </div>
                    </div>
                    
                </div>      
     
                <div className="advantage home_content_element">
                <h2 className="text_align_center">Преимущества</h2>
                    
                    <div className="advantages_cards">
                        <div className="advantages_card shadow">
                            <div className="text_align_center advantages_card_number">1</div>
                            <div className="text_align_center advantages_card_label">Доставка за 1 день</div>
                            <div className="text_align_center advantages_card_text">Гарантируем доставку <br />по магистральным направлениям <br />за 1 день</div>
                        
                        </div>
                        <div className="advantages_card shadow">
                        <div className="text_align_center advantages_card_number">2</div>
                            <div className="text_align_center advantages_card_label">Прием груза до 19:00</div>
                            <div className="text_align_center advantages_card_text">Вы успеете отправить свой груз <br />вовремя, чтобы уже завтра он был <br />в пункте назначения</div>
                        
                        
                        </div>
                        <div className="advantages_card shadow">
                        <div className="text_align_center advantages_card_number">3</div>
                            <div className="text_align_center advantages_card_label">Выдача груза с 09:00</div>
                            <div className="text_align_center advantages_card_text">Груз, который вы отправили вчера,<br /> будет доступен к выдаче утром <br />уже с 9:00</div>
                        
                        
                        </div>
                        <div className="advantages_card shadow">
                        <div className="text_align_center advantages_card_number">4</div>
                            <div className="text_align_center advantages_card_label">Работаем 7 дней в неделю</div>
                            <div className="text_align_center advantages_card_text">Вы можете отправить и забрать <br />Ваш груз даже в выходные и праздничные дни</div>
                        
                        
                        </div>
                        <div className="advantages_card shadow">
                        <div className="text_align_center advantages_card_number">5</div>
                            <div className="text_align_center advantages_card_label">Температурный режим</div>
                            <div className="text_align_center advantages_card_text">Мы перевозим грузы при положительной <br />температуре</div>
                        
                        
                        
                        </div>
                        <div className="advantages_card shadow">
                        <div className="text_align_center advantages_card_number">6</div>
                            <div className="text_align_center advantages_card_label">Решаем задачи любой сложности</div>
                            <div className="text_align_center advantages_card_text">Для Вас мы готовы разработать <br />индивидуальный логистический проект,<br />и сделать его регулярным</div>
                        
                        
                        </div>
                    </div>
                </div>   

                <div className="clients home_content_element">
                    
                    <div className="clients_label">
                    <h2 className="">Наши клиенты</h2>
                    <div className="">Нас выбирают как надежных <br />исполнителей и партнеров <br /><br />За то, что мы не боимся <br />сложных задач</div>

                    </div>
                    <div className="clients_button_navi">
                    <i aria-hidden="true" style={{ color:"#2444B5", cursor:"pointer"}} className="chevron large left icon"></i>
                    </div>
                    <div className="clients_cards">
                        <div style={{ backgroundSize:  "200px auto", backgroundImage: `url(${client_1})` }} className="clients_card shadow"></div>
                        <div style={{ backgroundSize:  "170px auto", backgroundImage: `url(${client_2})` }} className="clients_card shadow"></div>
                        <div style={{ backgroundSize:  "170px auto", backgroundImage: `url(${client_3})` }} className="clients_card shadow"></div>
                        <div style={{ backgroundSize:  "210px auto", backgroundImage: `url(${client_4})` }} className="clients_card shadow"></div>
                        
                    </div>
                    <div className="clients_button_navi">
                    <i aria-hidden="true" style={{ color:"#2444B5", cursor:"pointer"}} className="chevron large right icon"></i>
                    </div>
                </div>  

                {/* <div className="review home_content_element"> 
                    <h2 className="text_align_center">Отзывы</h2>
                    
                    <div className="review_cards">
                    <div className="review_button_navi">
                    <i aria-hidden="true" style={{ color:"#2444B5", cursor:"pointer"}} className="chevron large left icon"></i>
                    </div>
                    <div className="review_card shadow">
                        <div style={{ backgroundSize:  "auto 160px", backgroundImage: `url(${review_1})` }} className="review_card_photo"></div>
                        <div className="review_card_content">
                            <h3>Дмитрий Кузнецов</h3>
                            <h5>Технический директор ООО "ПССБ"</h5>
                            <div style={{wordWrap: "break-word"}}> Возим уже месяц ежедневно. Отправляем Красноярск  и Томск. За месяц ни одной задержки.  Очень рекомендую! Надеюсь дальше будет так же.</div>

                        </div>
                    </div>
                    <div className="review_card shadow">
                    <div style={{ backgroundSize:  "auto 160px", backgroundImage: `url(${review_1})` }} className="review_card_photo"></div>
                        <div className="review_card_content">
                            <h3>Александр Ким</h3>
                            <h5>Директор по Логистике ООО "Лайт-НСК"</h5>
                            <div style={{wordWrap: "break-word"}}> Огромная благодарность Экспресс Кинетике за работу. Очень рад, что сотрудничаем. Менеджеры - молодцы, по всем вопросам оперативно отвечают. Доставляется всё вовремя. </div>

                        </div>
                    </div>
                    <div className="review_button_navi">
                    <i aria-hidden="true" style={{ color:"#2444B5", cursor:"pointer"}} className="chevron large right icon"></i>
                    </div>
                    </div>
                    
                   
                </div> */}

                {/* <div className="auto home_content_element">
                    Автопарк
                </div>    */}

                <div style={{backgroundColor: "#2444B5"}} className="callbacker home_content_element">
                <div className="callbacker_wrapper">
                    <h2 className="text_align_center font_36">Есть вопросы или нужна помощь?</h2>
                    <div className="text_align_center filials_text">
                    Наши менеджеры свяжуться с вами в течении 15 минут 
                        <br />
                        и найдут решение по любому вашему вопросу
                    </div>
                    <div className="callbacker_content">
                            <input placeholder='Имя' className="callbacker_input"></input>
                            <input placeholder='Телефон' className="callbacker_input"></input>
                            <input placeholder='e-mail' className="callbacker_input"></input>
                            <button className="callbacker_button_2">Нужна помощь</button>

                        </div>
                </div> 
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
    set_active_menu_item: (param) => { dispatch({ type: 'set_active_menu_item', payload: param }) },
    SetCityList: (param) => { dispatch({ type: 'SetCityList', payload: param }) },
    set_home_service_selector: (param) => { dispatch({ type: 'set_home_service_selector', payload: param }) },
    set_track_number: (param) => { dispatch({ type: 'set_track_number', payload: param }) },
    set_disp_history_loading: (param) => { dispatch({ type: 'set_disp_history_loading', payload: param }) },
    set_disp_history: (param) => { dispatch({ type: 'set_disp_history', payload: param }) },
  })
)(Screen)
