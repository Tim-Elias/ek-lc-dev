import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { Card, Input, Button,Popup } from 'semantic-ui-react'
import logo from './../common/1024.png'
import './disp_map.css';


const Marker = ({ text }) =>
<div className="marker" 
    style={{ width: `10px`, height: `10px`, backgroundColor: `red`, cursor: 'pointer' }}
    title={text}
></div> 

class Screen extends React.Component {

    marker_onClick = (key) => {
        this.props.set_select_filial(key)
    }

    render() {

        return (
            <div>
              Карта с Накладными  
              <div className='disp_map'>
              <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD5AmmHNIXXN0yquTsPxoXuvtOp8OYhe2E' }}
                    defaultCenter={this.props.store.home.map.center}
                    defaultZoom={8}
                    yesIWantToUseGoogleMapApiInternals 
                >
                 <Marker lat={54.764684} lng={83.091796} text={'RUS11332754 г Бердск ул Ленина, 17'} onClick = {this.marker_onClick} />
<Marker lat={54.953097} lng={82.893619} text={'RUS11364541 Сибиряков-Гвардейев 54'} onClick = {this.marker_onClick} />
<Marker lat={54.995766} lng={82.896372} text={'FLZ87424685 Горский мкр 41 47'} onClick = {this.marker_onClick} />
<Marker lat={54.983325} lng={82.878607} text={'RUS11353914 ул Титова, 18'} onClick = {this.marker_onClick} />
<Marker lat={55.112548} lng={82.949004} text={'FLZ87518577 ул. Родники, д. 6/1, кв. 23'} onClick = {this.marker_onClick} />
<Marker lat={55.047981} lng={82.942788} text={'RUS11383164 г Новосибирск ул Ипподромская, 34'} onClick = {this.marker_onClick} />
<Marker lat={54.987846} lng={82.842387} text={'RUS11417280 ул Новосибирская, 22'} onClick = {this.marker_onClick} />
<Marker lat={55.028008} lng={82.855027} text={'RUS11399121 г Новосибирск ул Полярная, 68'} onClick = {this.marker_onClick} />
<Marker lat={54.766216} lng={83.07746} text={'RUS11422580 ул. Ленина, д. 6, кв. 75'} onClick = {this.marker_onClick} />
<Marker lat={55.048697} lng={82.99189} text={'FLZ87627725 НОВОСИБИРСК Р-Н ДЗЕРЖИНСКИЙ, НАЦИОНАЛЬНАЯ, УЛ, Д. 13, 12'} onClick = {this.marker_onClick} />
<Marker lat={55.013742} lng={82.965739} text={'FLZ87631917 ул. Грибоедова, д. 75, кв. 36'} onClick = {this.marker_onClick} />
<Marker lat={54.749031} lng={83.057258} text={'FLZ87628764 ул. Лунная, д. 10, кв. 21'} onClick = {this.marker_onClick} />
<Marker lat={55.029585} lng={82.96399} text={'FLZ87628293 ул. Бориса Богаткова, д. 165/3, кв.  150'} onClick = {this.marker_onClick} />
<Marker lat={54.763075} lng={83.0896659} text={'FLZ87602470 БЕРДСК К.МАРКСА, УЛ, 13, 65'} onClick = {this.marker_onClick} />
<Marker lat={55.032646} lng={83.009965} text={'FLZ87602447 НОВОСИБИРСК Р-Н ОКТЯБРЬСКИЙ, ЛАЗУРНАЯ, УЛ, Д. 10, 112'} onClick = {this.marker_onClick} />
<Marker lat={55.043723} lng={82.920427} text={'240045903226 г Новосибирск ул Мичурина, 27, 24, г Новосибирск, обл Новосибирская, 630091'} onClick = {this.marker_onClick} />
<Marker lat={54.991948} lng={82.706729} text={'FLZ87667010 ОБЬ СТРОИТЕЛЬНАЯ, УЛ, Д. 11, 5'} onClick = {this.marker_onClick} />
<Marker lat={55.089326} lng={82.653967} text={'FLZ87672010 ул. Садовая,  д. 17 А, 25'} onClick = {this.marker_onClick} />
<Marker lat={54.932871} lng={82.91821} text={'RUS11408145 г Новосибирск ул Зорге, 193'} onClick = {this.marker_onClick} />
<Marker lat={55.102591} lng={83.051533} text={'RUS11417909 с Каменка ал. 10-я, 285'} onClick = {this.marker_onClick} />
<Marker lat={54.84994} lng={83.103563} text={'RUS11423567 г Новосибирск пр-кт Академика Лаврентьева, 8/2'} onClick = {this.marker_onClick} />
<Marker lat={54.964889} lng={83.054188} text={'RUS11426466 г Новосибирск ул 1-я Механическая, 7'} onClick = {this.marker_onClick} />
<Marker lat={55.067837} lng={82.934238} text={'FLZ87640082 Новосибирск ул Серебряные ключи 4 119'} onClick = {this.marker_onClick} />
<Marker lat={54.966792} lng={82.846319} text={'FLZ87639746 ул 9-й Гвардейской Дивизии 15 263'} onClick = {this.marker_onClick} />
<Marker lat={54.997501} lng={82.689403} text={'FLZ87727624 ОБЬ ЖКО АЭРОПОРТА, УЛ, Д. 23, 12'} onClick = {this.marker_onClick} />
<Marker lat={54.912974} lng={82.83801} text={'FLZ87705059 ТУЛИНСКИЙ П ТУЛИНСКИЙ, ЦЕНТРАЛЬНАЯ, УЛ, Д. 2, 1 ИНДЕКС 633521'} onClick = {this.marker_onClick} />
<Marker lat={54.99498} lng={82.698395} text={'FLZ87705844 ул. ЖКО Аэропорта, д. 28, кв. 132.'} onClick = {this.marker_onClick} />
<Marker lat={54.987134} lng={82.84084} text={'FLZ87709390 НОВОСИБИРСК Р-Н ЛЕНИНСКИЙ, ПАРХОМЕНКО, УЛ, Д. 114, 51'} onClick = {this.marker_onClick} />
<Marker lat={54.746071} lng={83.050618} text={'FLZ87734851 ул. Микрорайон, д. 22,  кв. 59'} onClick = {this.marker_onClick} />
<Marker lat={55.027937} lng={82.912709} text={'RUS11331796 г Новосибирск ул Урицкого, 19'} onClick = {this.marker_onClick} />
<Marker lat={55.02667} lng={82.935622} text={'RUS11433393 г Новосибирск ул Семьи Шамшиных, 4'} onClick = {this.marker_onClick} />
<Marker lat={54.956681} lng={82.96806} text={'RUS11436825 г Новосибирск ул Комсомольская, 8'} onClick = {this.marker_onClick} />
<Marker lat={55.031907} lng={82.914799} text={'RUS11450805 г Новосибирск ул Вокзальная магистраль, 19'} onClick = {this.marker_onClick} />
<Marker lat={55.017763} lng={82.929101} text={'1150656720000 СЕРЕБРЕННИКОВСКАЯ  2/2 30'} onClick = {this.marker_onClick} />
<Marker lat={54.99557} lng={82.958601} text={'1150666550000 НОВОСИБИРСК 2 АЯ ОБСКАЯ  154 215'} onClick = {this.marker_onClick} />
<Marker lat={54.932564} lng={82.899229} text={'1150669090000 НОВОСИБИРСК ЗОРГЕ  40 31'} onClick = {this.marker_onClick} />
<Marker lat={54.974521} lng={82.902876} text={'1150670790000 НОВОСИБИРСК НЕМИРОВИЧА-ДАНЧЕНКО  139 66'} onClick = {this.marker_onClick} />
<Marker lat={55.061301} lng={82.897529} text={'1150678400000 НОВОСИБИРСК ТИМИРЯЗЕВА  93 156'} onClick = {this.marker_onClick} />
<Marker lat={54.99498} lng={82.698395} text={'FLZ87414488 ул. ЖКО Аэропорта, д. 28, кв. 132.'} onClick = {this.marker_onClick} />
<Marker lat={54.995899} lng={82.690238} text={'FLZ87453544 ОБЬ ЖКО АЭРОПОРТА, УЛ, Д. 18, 31'} onClick = {this.marker_onClick} />
<Marker lat={55.035977} lng={82.956148} text={'FLZ87464046 Новосибирск ул. микрорайон Закаменский, д. 15, кв. 200'} onClick = {this.marker_onClick} />
<Marker lat={54.871491} lng={83.081915} text={'FLZ87471793 НОВОСИБИРСК ул Шатурская, д 10, кв 64'} onClick = {this.marker_onClick} />
<Marker lat={55.110087} lng={82.942026} text={'FLZ87474342 НОВОСИБИРСК ул Тюленина, д 20, кв 49'} onClick = {this.marker_onClick} />
<Marker lat={55.071899} lng={82.935908} text={'1150651900000 НОВОСИБИРСК КУЗЬМЫ МИНИНА  9 103'} onClick = {this.marker_onClick} />
<Marker lat={54.999122} lng={82.895195} text={'1150685650000 ул. Большая, д. 636, кв. 43'} onClick = {this.marker_onClick} />
<Marker lat={54.99606} lng={82.895035} text={'FLZ87397378 НОВОСИБИРСК Горский мкр 76 кв 145'} onClick = {this.marker_onClick} />
<Marker lat={54.770546} lng={83.0786} text={'FLZ87474854 БЕРДСК ПОПОВА, УЛ, Д. 3, 16'} onClick = {this.marker_onClick} />
<Marker lat={54.990449} lng={82.683466} text={'FLZ87479309 ОБЬ ГЕОДЕЗИЧЕСКАЯ, УЛ, Д. 6А, 42'} onClick = {this.marker_onClick} />
<Marker lat={54.92195} lng={82.992076} text={'FLZ87484531 КРАСНООБСК РП КРАСНООБСК, ,, Д. 8, 160'} onClick = {this.marker_onClick} />
<Marker lat={55.04457} lng={82.95585} text={'RUS11311022 г Новосибирск ул Гоголя, 184/1'} onClick = {this.marker_onClick} />
<Marker lat={54.9378243} lng={83.1781999} text={'RUS11321364 п Березовка ул Гагарина, 13'} onClick = {this.marker_onClick} />
<Marker lat={55.043723} lng={82.920427} text={'RUS11323099 г Новосибирск ул Мичурина, 27'} onClick = {this.marker_onClick} />
<Marker lat={54.986673} lng={82.846421} text={'RUS11333594 г Новосибирск ул Пархоменко, 104'} onClick = {this.marker_onClick} />
<Marker lat={54.861629} lng={83.079041} text={'RUS11334538 г Новосибирск ул Героев Труда, 9'} onClick = {this.marker_onClick} />
<Marker lat={55.031247} lng={82.911902} text={'RUS11362233 г Новосибирск ул Урицкого, 37'} onClick = {this.marker_onClick} />
<Marker lat={55.027157} lng={82.97226} text={'RUS11378701 г Новосибирск ул Бориса Богаткова, 192/5'} onClick = {this.marker_onClick} />
<Marker lat={54.973517} lng={82.846553} text={'FLZ87486775 НОВОСИБИРСК Р-Н ЛЕНИНСКИЙ, ПОЛТАВСКАЯ, УЛ, Д. 29, 14'} onClick = {this.marker_onClick} />
<Marker lat={54.792507} lng={83.049145} text={'1150663260000 БЕРДСК ТЕРРИТОРИЯ САНАТОРИЯ БЕРДСКИЙ  36 100'} onClick = {this.marker_onClick} />
<Marker lat={55.096711} lng={82.958314} text={'1150686960000 ул. Макаренко, д. 4, кв. 11'} onClick = {this.marker_onClick} />
<Marker lat={54.990094} lng={82.876957} text={'FLZ87440939 Новосибирск Индекс 630078, город Новосибирск, улица Дружбы 5, кв 121'} onClick = {this.marker_onClick} />
<Marker lat={55.009417} lng={82.986138} text={'FLZ87478434 Новосибирск 630039 Г.Новосибирск, ул. Днепровская 8'} onClick = {this.marker_onClick} />
<Marker lat={55.021231} lng={83.014612} text={'FLZ87706800 Татьяны Снежиной, д.  31/1,  кв. 254.'} onClick = {this.marker_onClick} />
<Marker lat={55.014459} lng={82.96562} text={'FLZ87699765 ул Белинского 202 72'} onClick = {this.marker_onClick} />
<Marker lat={55.059985} lng={82.931014} text={'FLZ87700340 ул Танковая 32 297'} onClick = {this.marker_onClick} />
<Marker lat={54.941446} lng={83.127354} text={'FLZ87700464 ул Ученическая 1 12'} onClick = {this.marker_onClick} />
<Marker lat={54.871688} lng={83.081304} text={'FLZ87706610 ул Шатурская 12 12'} onClick = {this.marker_onClick} />
<Marker lat={55.035491} lng={82.907949} text={'FLZ87723896 НОВОСИБИРСК Р-Н ЖЕЛЕЗНОДОРОЖНЫЙ, СИБИРСКАЯ, УЛ, Д. 32, 10'} onClick = {this.marker_onClick} />
<Marker lat={54.937767} lng={83.127356} text={'FLZ87703609 ул. Твардовского, д. 10, кв. 111.'} onClick = {this.marker_onClick} />
<Marker lat={55.088722} lng={82.970077} text={'FLZ87703195 ул Овчукова 93'} onClick = {this.marker_onClick} />
<Marker lat={55.038058} lng={83.000817} text={'FLZ87737037 НОВОСИБИРСК ДОВАТОРА, УЛ, 35, 84'} onClick = {this.marker_onClick} />
<Marker lat={54.808618} lng={83.095771} text={'FLZ87741401 ул Солнечногорская 1 16'} onClick = {this.marker_onClick} />
<Marker lat={54.870222} lng={83.090926} text={'FLZ87752929 НОВОСИБИРСК Р-Н СОВЕТСКИЙ, РОССИЙСКАЯ, УЛ, Д. 10, 241'} onClick = {this.marker_onClick} />
<Marker lat={54.930962} lng={82.905156} text={'FLZ87737672 г Новосибирск ул Зорге 74 117'} onClick = {this.marker_onClick} />
<Marker lat={55.037449} lng={82.933815} text={'FLZ87740973 ул. Фрунзе, д. 86'} onClick = {this.marker_onClick} />
<Marker lat={54.936877} lng={83.122752} text={'FLZ87742102 г Новосибирск ул Березовая 3 86'} onClick = {this.marker_onClick} />
<Marker lat={55.009547} lng={82.962905} text={'FLZ87739249 ул Московская 194А'} onClick = {this.marker_onClick} />
<Marker lat={55.073874} lng={82.948119} text={'FLZ87752978 НОВОСИБИРСК Р-Н КАЛИНИНСКИЙ, БОГДАНА ХМЕЛЬНИЦКОГО, УЛ, Д. 33/1, 32'} onClick = {this.marker_onClick} />
<Marker lat={54.943892} lng={82.965161} text={'FLZ87739223 ул Александра Чистякова 18 117'} onClick = {this.marker_onClick} />
<Marker lat={54.983926} lng={82.895889} text={'FLZ87617338 Новосибирск Индекс 630073, город Новосибирск, улица Ватутина, 27 — 18'} onClick = {this.marker_onClick} />
<Marker lat={55.05868} lng={82.933391} text={'FLZ87741773 ул. Кропоткина, д. 269/1, кв. 399'} onClick = {this.marker_onClick} />
<Marker lat={55.10588} lng={82.969292} text={'FLZ87753133 ул. Курчатова. д. 11, кв. 21'} onClick = {this.marker_onClick} />
<Marker lat={54.93729} lng={83.126391} text={'FLZ87744488 ул Твардовского 16 32'} onClick = {this.marker_onClick} />
<Marker lat={54.97862} lng={83.049358} text={'FLZ87741732 Новосибирск ул Заречная 8 188'} onClick = {this.marker_onClick} />
<Marker lat={54.973707} lng={83.078781} text={'FLZ87741799 ул Шмидта 1 155'} onClick = {this.marker_onClick} />
<Marker lat={55.048593} lng={82.867836} text={'FLZ87741096 Новосибирск ул Сухарная 78 пристройка'} onClick = {this.marker_onClick} />
<Marker lat={55.05657} lng={82.904094} text={'FLZ87769303 ул. Дуси Ковальчук, д. 91, кв. 35'} onClick = {this.marker_onClick} />
<Marker lat={54.99947} lng={82.699848} text={'FLZ87771812 ОБЬ ЖКО АЭРОПОРТА, УЛ, Д. 26, 61'} onClick = {this.marker_onClick} />
<Marker lat={54.969647} lng={83.100847} text={'FLZ87768180 ул. Первомайская, д. 150, кв. 40'} onClick = {this.marker_onClick} />
<Marker lat={54.860717} lng={82.98662} text={'FLZ87770996 НОВОСИБИРСК Р-Н СОВЕТСКИЙ, ДИНАМОВЦЕВ, УЛ, Д. 10, 74'} onClick = {this.marker_onClick} />
<Marker lat={55.072777} lng={82.947406} text={'RUS11428202 г Новосибирск ул Богдана Хмельницкого, 29'} onClick = {this.marker_onClick} />
<Marker lat={55.033399} lng={82.928935} text={'RUS11446453 г Новосибирск ул Ядринцевская, 48'} onClick = {this.marker_onClick} />
<Marker lat={55.01066} lng={82.962095} text={'RUS11452361 г Новосибирск ул Московская, 163'} onClick = {this.marker_onClick} />
<Marker lat={55.107049} lng={82.936399} text={'FLZ87741864 ул Гребенщикова 1 265'} onClick = {this.marker_onClick} />
<Marker lat={55.052438} lng={82.972878} text={'FLZ87731352 НОВОСИБИРСК Р-Н ДЗЕРЖИНСКИЙ, ГОГОЛЯ, УЛ, Д. 225/2, 71'} onClick = {this.marker_onClick} />
<Marker lat={55.086885} lng={82.64361} text={'FLZ87732400 КРИВОДАНОВКА С КРИВОДАНОВКА, МИКРОРАЙОН, ТЕР, Д. 8Б, 36'} onClick = {this.marker_onClick} />
<Marker lat={54.927527} lng={82.995929} text={'FLZ87734125 2-й Мкр., д. 233, кв. 244'} onClick = {this.marker_onClick} />
<Marker lat={55.098601} lng={82.941385} text={'FLZ87740825 ул Фадеева 66/8 350'} onClick = {this.marker_onClick} />
<Marker lat={54.863011} lng={82.990485} text={'FLZ87741021 Новосибирск ул Приморская 24 189'} onClick = {this.marker_onClick} />
<Marker lat={54.854287} lng={83.039047} text={'FLZ87741278 ул 2-я Миргородская 9'} onClick = {this.marker_onClick} />
<Marker lat={54.991948} lng={82.706729} text={'FLZ87760187 ОБЬ СТРОИТЕЛЬНАЯ, УЛ, Д. 11, 5'} onClick = {this.marker_onClick} />
<Marker lat={54.973735} lng={83.097774} text={'FLZ87768214 ул. Героев Революции, д. 12/1, кв. 17'} onClick = {this.marker_onClick} />
<Marker lat={54.995615} lng={82.893434} text={'FLZ87774113 НОВОСИБИРСК ГОРСКИЙ, МКР, 63, 115'} onClick = {this.marker_onClick} />
<Marker lat={55.110087} lng={82.942026} text={'RUS11424148 г Новосибирск ул Тюленина, 20'} onClick = {this.marker_onClick} />
<Marker lat={55.041682} lng={82.956907} text={'RUS11447306 г Новосибирск ул Кошурникова, 18'} onClick = {this.marker_onClick} />
<Marker lat={55.127637} lng={82.893593} text={'RUS11450466 г Новосибирск ул Кубовая, 105/1'} onClick = {this.marker_onClick} />
<Marker lat={55.074821} lng={82.949254} text={'RUS11457372 г Новосибирск пер 2-й Краснодонский, 7'} onClick = {this.marker_onClick} />
<Marker lat={55.019264} lng={82.950406} text={'FLZ87744702 ул Восход 46 39'} onClick = {this.marker_onClick} />
<Marker lat={55.048593} lng={82.867836} text={'FLZ87789095 ул. Сухарная, д. 78'} onClick = {this.marker_onClick} />
<Marker lat={54.979526} lng={82.808351} text={'FLZ87793246 ул Титова 240/ 51'} onClick = {this.marker_onClick} />
<Marker lat={54.938324} lng={83.126128} text={'FLZ87795357 г Новосибирск ул Твардовского 12 15'} onClick = {this.marker_onClick} />
<Marker lat={54.937078} lng={83.10312} text={'FLZ87785986 ул. Одоевского, д. 1/10, кв. 68'} onClick = {this.marker_onClick} />
<Marker lat={54.944181} lng={82.955374} text={'FLZ87741849 ул. Петухова, д. 103/3, кв. 77'} onClick = {this.marker_onClick} />
<Marker lat={55.05181} lng={82.907549} text={'FLZ87790879 ул. Линейная, д. 33/3, кв. 24'} onClick = {this.marker_onClick} />
<Marker lat={55.029386} lng={82.932531} text={'FLZ87792602 НОВОСИБИРСК Р-Н ЦЕНТРАЛЬНЫЙ, ДЕПУТАТСКАЯ, УЛ, Д. 60, 120'} onClick = {this.marker_onClick} />
<Marker lat={55.046302} lng={82.961674} text={'FLZ87827705 ул. Красина, д. 60, кв.172'} onClick = {this.marker_onClick} />
<Marker lat={54.92793} lng={82.922722} text={'FLZ87840138 НОВОСИБИРСК Р-Н КИРОВСКИЙ, ЗОРГЕ, УЛ, Д. 229, 38'} onClick = {this.marker_onClick} />
<Marker lat={54.839896} lng={83.109808} text={'FLZ87848248 НОВОСИБИРСК Р-Н СОВЕТСКИЙ, МОРСКОЙ, ПР-КТ, Д. 7, 5'} onClick = {this.marker_onClick} />
<Marker lat={54.98144} lng={82.88529} text={'FLZ87837845 НОВОСИБИРСК Р-Н ЛЕНИНСКИЙ, РИМСКОГО-КОРСАКОВА, УЛ, Д. 7/1, 7'} onClick = {this.marker_onClick} />
<Marker lat={54.747493} lng={83.066085} text={'FLZ87835005 ул. Рогачева, д. 22, кв. 58'} onClick = {this.marker_onClick} />
<Marker lat={54.992159} lng={82.806592} text={'FLZ87859567 ул Невельского 73 160'} onClick = {this.marker_onClick} />
<Marker lat={55.05462} lng={82.96533} text={'240045955083 г Новосибирск ул Промышленная, 3, 24, г Новосибирск, обл Новосибирская, 630015'} onClick = {this.marker_onClick} />
<Marker lat={55.002148} lng={83.013545} text={'FLZ87871547 ул. Выборная, д. 129, кв. 72'} onClick = {this.marker_onClick} />
<Marker lat={55.024286} lng={82.952324} text={'FLZ87884193 НОВОСИБИРСК Р-Н ОКТЯБРЬСКИЙ, ЛЕСКОВА, УЛ, Д. 31, 222'} onClick = {this.marker_onClick} />
<Marker lat={54.932592} lng={82.90497} text={'RUS11470427 г Новосибирск ул Зорге, 48'} onClick = {this.marker_onClick} />
<Marker lat={55.109781} lng={82.937569} text={'FLZ87873188 НОВОСИБИРСК Р-Н КАЛИНИНСКИЙ, ГРЕБЕНЩИКОВА, УЛ, Д. 7/1, 178'} onClick = {this.marker_onClick} />
<Marker lat={54.936667} lng={83.126886} text={'FLZ87891552 ул Твардовского 22/5 248'} onClick = {this.marker_onClick} />
<Marker lat={55.073758} lng={82.964112} text={'FLZ87915690 НОВОСИБИРСК Р-Н КАЛИНИНСКИЙ, 25 ЛЕТ ОКТЯБРЯ, УЛ, Д. 14, 21'} onClick = {this.marker_onClick} />
<Marker lat={54.981552} lng={82.791904} text={'RUS11475050 г Новосибирск ул Спортивная, 25'} onClick = {this.marker_onClick} />


                

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

    })
)(Screen);