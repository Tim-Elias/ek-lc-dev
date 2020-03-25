import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'
import { Card, Table, Button } from 'semantic-ui-react'
import { customStyles } from "./../../common/common_style";
import { get_data } from './../../common/common_modules'

class Screen extends React.Component {

calc = () =>{

  if (true) {
    //this.props.set_disp_history_loading(true)
    const data ={
      SendCity: this.props.store.home.calc_send_city.value,
      RecCity: this.props.store.home.calc_rec_city.value,
      Weight: this.props.store.home.calc_weight
    }
    get_data('calc', data).then(
        (result) => {
            this.props.set_calc_result(result);
            //this.props.set_disp_history_loading(false)
        },
        (err) => { console.log(err) }
    );
}

}

    render() {

        return (
            <div>

            <div className="calc_city_el">
              <div className="disp_data_label"> Город отправления:</div>
              <div className="disp_data_el">

                <Select
                  value={this.props.store.home.calc_send_city}
                  options={this.props.store.create_disp.CityList}
                  styles={customStyles}
                  onChange={(values) => this.props.set_calc_send_city(values)}
                  placeholder="Город отправления" />

              </div>
            </div>
            <div className="calc_city_el">
              <div className="disp_data_label"> Город назначения:</div>
              <div className="disp_data_el">

                <Select
                  value={this.props.store.home.calc_rec_city}
                  options={this.props.store.create_disp.CityList}
                  styles={customStyles}
                  onChange={(values) => this.props.set_calc_rec_city(values)}
                  placeholder="Город назначения" />
              </div>
            </div>
            <div className="calc_city_el">
              <div className="disp_data_label"> Вес груза (кг):</div>
              <div className="disp_data_el">

              <input className="create_disp_data_input" 
              
              onChange={e => this.props.set_calc_weight(e.target.value)} 
              value={this.props.store.home.calc_weight} 
              type="number" />
              </div>
            </div>
            <div className='track_button'><Button onClick={this.calc.bind(this)}> Расчитать </Button></div>

            <div>
            {this.props.store.home.calc_result.length !== 0 ? (
                    <div className='home_history'>
                        
                                <Table celled compact='very'>
                                    <Table.Header className="create_disp_template_list_th">
                                        <Table.Row>
                                            <Table.HeaderCell>Тип доставки</Table.HeaderCell>
                                            <Table.HeaderCell>Вид доставки</Table.HeaderCell>
                                            <Table.HeaderCell>Срок от</Table.HeaderCell>
                                            <Table.HeaderCell>Срок до</Table.HeaderCell>
                                            <Table.HeaderCell>Цена</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {this.props.store.home.calc_result.map((el, index) =>

                                            <Table.Row className="create_disp_template_list_tr" key={index}>
                                                <Table.Cell >{el.del_type}</Table.Cell>
                                                <Table.Cell>{el.del_method}</Table.Cell>
                                                <Table.Cell>{el.min}</Table.Cell>
                                                <Table.Cell>{el.max}</Table.Cell>
                                                <Table.Cell>{el.price}</Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            

                    </div>
                ) : (null)}
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

        set_calc_weight: (param) => { dispatch({ type: 'set_calc_weight', payload: param }) },
        set_calc_rec_city: (param) => { dispatch({ type: 'set_calc_rec_city', payload: param }) },
        set_calc_send_city: (param) => { dispatch({ type: 'set_calc_send_city', payload: param }) },

        set_calc_result: (param) => { dispatch({ type: 'set_calc_result', payload: param }) },


    })
)(Screen);