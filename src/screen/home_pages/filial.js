import React from 'react';
// import ymaps from 'ymaps';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import logo from './../../common/1024.png'

// import { Card, Input, Button } from 'semantic-ui-react'

    

    const Marker = ({ size, text, el_key, onClick }) =>
    <div className="marker" onClick={()=>onClick(el_key)}
        style={{ width: `${size}px`, height: `${size}px`, backgroundImage: `url(${logo})`, cursor: 'pointer' }}
        title={text}
    ></div> 



class Screen extends React.Component {

    
//     test = () => {
//         var myGeocoder = ymaps.geocode("Moscow");
//     myGeocoder.then(
//     function (res) {
       
//         // Выведем в консоль данные, полученные в результате геокодирования объекта.
//         console.log(res.geoObjects.get(0).properties.get('metaDataProperty').getAll());
//     },
//     function (err) {
//         // Обработка ошибки.
//     }
// );
//     }

    marker_onClick = (key) => {
        this.props.set_select_filial(key)
    }
    
    render() {

        const filial = this.props.store.home.filial.find(el=>el.el_key === this.props.store.home.select_filial)
        let callto
        let mailto
        if (filial) {
            callto = `callto:${filial.phone}`
            mailto = `mailto:${filial.email}`
        }
        
        // const handleApiLoaded = (map, maps) => {
           
        //     let nsk = { lat: 55.022919, lng: 82.912667 };
        //     let kem = { lat: 55.345578, lng: 86.066783 };
        //     let tom = { lat: 56.471509, lng: 84.959046 };

        //     let request_1 = {
        //         origin: nsk,
        //         destination: kem,
        //         travelMode: "DRIVING"
        //       };

        //       let request_2 = {
        //         origin: nsk,
        //         destination: tom,
        //         travelMode: "DRIVING"
        //       };


        //       let directionsRenderer = new maps.DirectionsRenderer({
        //         path: { nsk, kem },
        //         path: { nsk, tom },
        //         //draggable: true,
        //         suppressMarkers: true
        //       });
          
        //       let directionsService = new maps.DirectionsService();

        //       directionsService.route(request_1, function(result, status) {
        //         if (status === "OK") {
        //           directionsRenderer.setDirections(result);
        //         }
        //       });

        //       directionsService.route(request_2, function(result, status) {
        //         if (status === "OK") {
        //           directionsRenderer.setDirections(result);
        //         }
        //       });

        //       directionsRenderer.setMap(map);
        // }
        

        return (
            <div>
                <div className='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD5AmmHNIXXN0yquTsPxoXuvtOp8OYhe2E' }}
                    defaultCenter={this.props.store.home.map.center}
                    defaultZoom={this.props.store.home.map.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    //onGoogleApiLoaded={({ map, maps }) => handleApiLoaded( map, maps)}
                >
                     {/* {this.props.store.home.directions &&
                     <DirectionsRenderer directions={this.props.store.home.directions} />
                     } */}

                    {/* <AnyReactComponent lat={55.022919} lng={82.912667} text="Новосибирск, ул. Коммунистическая д.7 Склад 1" />
                    <AnyReactComponent lat={55.345578} lng={86.066783} text="Кемерово, ул. Рукавишникова 26" />
                    <AnyReactComponent lat={56.471509} lng={84.959046} text="Томск, ул. Герцена 13/1 оф. 101" />
                    <AnyReactComponent lat={56.039091} lng={92.856798} text="Красноярск, ул. Караульная 4 стр 1" />
                    <AnyReactComponent lat={54.968471} lng={73.388790} text="Омск, ул. Потанина 15" />
                    <AnyReactComponent lat={53.332397} lng={83.786013} text="Барнаул, ул. Короленко 75а" />
                    <AnyReactComponent lat={53.745939} lng={87.128185} text="Новокузнецк, ул. Циолковского 13 оф 11" />

                    <Agent lat={55.350787} lng={78.358753} text="Барабинск" />
                    <Agent lat={54.663651} lng={86.162096} text="Ленинск-Кузнецкий" />
                    <Agent lat={56.204605} lng={87.735284} text="Мариинск" />
                    <Agent lat={56.258516} lng={90.501988} text="Ачинск, м-н Юго-Западный 50" />
                    <Agent lat={52.540283} lng={85.222301} text="Бийск" />
                    <Agent lat={51.532461} lng={81.204952} text="Рубцовск" />
                    <Agent lat={51.958752} lng={85.951904} text="Горно-Алтайск" />
                    <Agent lat={53.715559} lng={91.426133} text="Абакан" />
                    <Agent lat={55.720854} lng={84.932176} text="Юрга" /> */}

                    {this.props.store.home.filial.map(el=>{
                        return(
                            <Marker 
                            key={el.el_key}
                            lat={el.lat}
                            lng={el.lng}
                            text={el.text} 
                            size={el.size}
                            el_key={el.el_key}
                            onClick = {this.marker_onClick}
                            
                            />
                            )}
                    )
                        }


                </GoogleMapReact>
                </div>
                {this.props.store.home.select_filial !=='0' ? (
                <div className='filial_item'>
                    <div className='filial_header'>{filial.type} службы доставки Экспресс Кинетика</div>
                    <div className='filial_text'>{filial.text}</div>
                    <div className='filial_contact_info'>Контактный телефон: <a href={callto}>{filial.phone}</a></div>
                    <div className='filial_contact_info'>E-mail: <a href={mailto}>{filial.email}</a></div>
                    {filial.type === 'Филиал' ? (
                        <div className='filial_work_hour'>
                            <div className='filial_work_hour_header'>Режим работы:</div>
                            <div className='filial_work_hour_item'>Понедельник: {filial.work_hour.mon}</div>
                            <div className='filial_work_hour_item'>Вторник: {filial.work_hour.tue}</div>
                            <div className='filial_work_hour_item'>Среда: {filial.work_hour.wen}</div>
                            <div className='filial_work_hour_item'>Четверг: {filial.work_hour.thu}</div>
                            <div className='filial_work_hour_item'>Пятница: {filial.work_hour.fri}</div>
                            <div className='filial_work_hour_item'>Суббота: {filial.work_hour.sat}</div>
                            <div className='filial_work_hour_item'>Воскресенье: {filial.work_hour.sun}</div>
                        </div>
                    ):(null)}
                    {filial.type === 'Филиал' ? (
                        <div className='director'>
                           Директор: {filial.director} 
                        </div>
                    ):(null)}
                </div>):(null)}
                {/* <button onClick={this.test.bind(this)}>test</button> */}
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
        set_directions: (param) => { dispatch({ type: 'set_directions', payload: param }) },
        set_select_filial: (param) => { dispatch({ type: 'set_select_filial', payload: param }) },

    })
)(Screen);