import React, { createRef } from 'react'
import { connect } from 'react-redux'
import map from './../map.svg';
import { get_data } from './../common/common_modules'
import { Menu, Segment, Input, Button, Image, Card, Icon } from 'semantic-ui-react'


import Main from './home_pages/main'
import Track from './home_pages/track'
import Calc from './home_pages/calc'
import Filial from './home_pages/filial'
import Contract from './home_pages/contract'
import Feedback from './home_pages/feedback'



import './home.css';

// import { get_data } from './../common/common_modules'

class Screen extends React.Component {

  calc = () => {
    this.props.set_active_menu_item('calc')
    if (this.props.store.create_disp.CityList.length === 0){
      get_data('citylist').then(
        (result) => {
            this.props.SetCityList(result);
          },
          (err) => { console.log(err) }
      );
    }
    
  }


  render() {

    return (

      <div >

        <Menu widths={3}  attached='top' tabular>
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
            onClick={this.calc.bind(this)}
          />
          {/* <Menu.Item
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
          /> */}

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
          {this.props.store.home.active_menu_item === 'main' ? (<Main />) : (null)}
          {this.props.store.home.active_menu_item === 'track' ? (<Track />) : (null)}
          {this.props.store.home.active_menu_item === 'calc' ? (<Calc />) : (null)}
          {this.props.store.home.active_menu_item === 'filial' ? (<Filial />) : (null)}
          {this.props.store.home.active_menu_item === 'contract' ? (<Contract />) : (null)}
          {this.props.store.home.active_menu_item === 'feedback' ? (<Feedback />) : (null)}
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
    set_active_menu_item: (param) => { dispatch({ type: 'set_active_menu_item', payload: param }) },
    SetCityList: (param) => { dispatch({ type: 'SetCityList', payload: param }) },
  })
)(Screen)
