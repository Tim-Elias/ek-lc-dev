import React, { createRef } from 'react'
import { connect } from 'react-redux'
import map from './../map.svg';
import { Menu, Segment, Input, Button, Image, Card, Icon } from 'semantic-ui-react'
import Select from 'react-select'
import transit from './../common/transit.png'

import { customStyles } from "./../common/common_style";
import './home.css';

// import { get_data } from './../common/common_modules'

class Screen extends React.Component {
  render() {

    return (

      <div >

        <Menu widths={6}  attached='top' tabular>
          <Menu.Item
            name='О компании'
            active={this.props.store.home.active_menu_item === 'main'}
            onClick={() => this.props.set_active_menu_item('main')}
          />
          <Menu.Item
            name='Отследить накладную'
            active={this.props.store.home.active_menu_item === 'track'}
            onClick={() => this.props.set_active_menu_item('track')}
          />
          <Menu.Item
            name='Расчитать тариф'
            active={this.props.store.home.active_menu_item === 'calc'}
            onClick={() => this.props.set_active_menu_item('calc')}
          />
          <Menu.Item
            name='Филиалы'
            active={this.props.store.home.active_menu_item === 'filial'}
            onClick={() => this.props.set_active_menu_item('filial')}
          />
          <Menu.Item
            name='Заключить договор'
            active={this.props.store.home.active_menu_item === 'contract'}
            onClick={() => this.props.set_active_menu_item('contract')}
          />
          <Menu.Item
            name='Обратная связь'
            active={this.props.store.home.active_menu_item === 'feedback'}
            onClick={() => this.props.set_active_menu_item('feedback')}
          />

          {/* <Menu.Menu position='right'>
            <Menu.Item>
              <Input
                transparent
                icon={{ name: 'search', link: true }}
                placeholder='Search users...'
              />
            </Menu.Item>
          </Menu.Menu> */}
        </Menu>

        <Segment className='home_segment' attached='bottom'>
          {this.props.store.home.active_menu_item === 'main' ? (
            <div className='home_main'>
<div className='image_row' style={{ backgroundImage: `url(${transit})` }}>
<div className='image_header'>Ваш груз будет доставлен</div>
<div className='image_text'>Быстро, Просто, Удобно</div>
 
</div>
              
              <div className='home_1a_row'>
                <h4>Филиалы Экспресс Кинетика</h4>
              </div>
              <div className='home_1_row'>
<div className='home_card'>
<Card style={{width: '100%'}}>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>Новосибирск</Card.Header>
      <Card.Meta>
        Коммунистическая 7, склад 1
      </Card.Meta>
      <Card.Description>
        +7 (383) 210-22-43
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        {/* <Icon name='mail' /> */}
        Подробнее...
      </a>
    </Card.Content>
  </Card>
</div>

<div className='home_card'>
<Card style={{width: '100%'}}>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>Красноярск</Card.Header>
      <Card.Meta>
        Караульная 4, стр1
      </Card.Meta>
      <Card.Description>
        Текст
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
      {/* <Icon name='mail' /> */}
      Подробнее...
      </a>
    </Card.Content>
  </Card>
</div>

<div className='home_card'>
<Card style={{width: '100%'}}>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>Кемерово</Card.Header>
      <Card.Meta>
        Рукавишникова 26
      </Card.Meta>
      <Card.Description>
        текст
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
      {/* <Icon name='mail' /> */}
      Подробнее...
      </a>
    </Card.Content>
  </Card>
</div>

<div className='home_card'>
<Card style={{width: '100%'}}>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>Томск</Card.Header>
      <Card.Meta>
        Герцена 13, оф 101
      </Card.Meta>
      <Card.Description>
        текст
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
      {/* <Icon name='mail' /> */}
      Подробнее...
      </a>
    </Card.Content>
  </Card>
  </div>

  <div className='home_card'>
  <Card style={{width: '100%'}}>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>Барнаул</Card.Header>
      <Card.Meta>
        Молодежная 111
      </Card.Meta>
      <Card.Description>
        Текст
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        {/* <Icon name='mail' /> */}
        Подробнее...
      </a>
    </Card.Content>
  </Card>
</div>

<div className='home_card'>
<Card style={{width: '100%'}}>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>Омск</Card.Header>
      <Card.Meta>
        Потанина 15
      </Card.Meta>
      <Card.Description>
        Текст
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
      {/* <Icon name='mail' /> */}
      Подробнее...
      </a>
    </Card.Content>
  </Card>
</div>

<div className='home_card'>
<Card style={{width: '100%'}}>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>Новокузнецк</Card.Header>
      <Card.Meta>
            Циолковского 13
      </Card.Meta>
      <Card.Description>
        текст
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
      {/* <Icon name='mail' /> */}
      Подробнее...
      </a>
    </Card.Content>
  </Card>
</div>

<div className='home_card'>
<Card style={{width: '100%'}}>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>Ачинск</Card.Header>
      <Card.Meta>
        Юго-восточнй мкр.10
      </Card.Meta>
      <Card.Description>
        текст
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
      {/* <Icon name='mail' /> */}
      Подробнее...
      </a>
    </Card.Content>
  </Card>

</div>

              </div>

              {/* <div className='home_map_row'>
                <div></div>
                <div className='home_map_container'>
                  <div><h2>Схема магистральных перевозок</h2></div>
                  <img src={map} />
                </div>
                <div></div>


              </div> */}

              <div className='home_2_row'>

              </div>
            </div>
          ) : (null)}

          {this.props.store.home.active_menu_item === 'track' ? (
            <div className='track_data'>
              <Input size='small' placeholder='Введите номер накладной...' />
              <div className='track_button'><Button> Найти </Button></div>
            </div>
          ) : (null)}

          {this.props.store.home.active_menu_item === 'calc' ? (

            <div>

              <div className="calc_city_el">
                <div className="disp_data_label"> Город отправления:</div>
                <div className="disp_data_el">

                  <Select
                    value={this.props.store.create_disp.SelectedSendCity}
                    options={this.props.store.create_disp.CityList}
                    styles={customStyles}
                    onChange={(values) => this.SelectSendCity(values)}
                    placeholder="Город отправителя" />

                </div>
              </div>
              <div className="calc_city_el">
                <div className="disp_data_label"> Город назначения:</div>
                <div className="disp_data_el">

                  <Select
                    value={this.props.store.create_disp.SelectedSendCity}
                    options={this.props.store.create_disp.CityList}
                    styles={customStyles}
                    onChange={(values) => this.SelectSendCity(values)}
                    placeholder="Город отправителя" />
                </div>
              </div>
            </div>


          ) : (null)}
        </Segment>


      </div>

    )
  }
};

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    set_active_menu_item: (param) => { dispatch({ type: 'set_active_menu_item', payload: param }) }
  })
)(Screen)
