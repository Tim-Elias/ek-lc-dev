import React from 'react';
import { connect } from 'react-redux';
import transit from './../../common/transit.png'
import { Card } from 'semantic-ui-react'

class Screen extends React.Component {
    render() {

        return (
            <div className='home_main'>
                <div className='image_row' >
                    <div className='image_header'>Срочная доставка документов и грузов</div>
                    <div className='image_text'>по городам Сибири</div>
                </div>

                {/* <div className='home_1a_row'>
                    <h4>Филиалы Экспресс Кинетика</h4>
                </div>
                <div className='home_1_row'>
                    <div className='home_card'>
                        <Card style={{ width: '100%' }}>
                         
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
                                   
                                    Подробнее...
                  </a>
                            </Card.Content>
                        </Card>
                    </div>

                    <div className='home_card'>
                        <Card style={{ width: '100%' }}>
                           
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
                                  
                                    Подробнее...
                  </a>
                            </Card.Content>
                        </Card>
                    </div>

                    <div className='home_card'>
                        <Card style={{ width: '100%' }}>
                            
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
                                   
                                    Подробнее...
                  </a>
                            </Card.Content>
                        </Card>
                    </div>

                    <div className='home_card'>
                        <Card style={{ width: '100%' }}>
                            
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
                                    
                                    Подробнее...
                  </a>
                            </Card.Content>
                        </Card>
                    </div>

                    <div className='home_card'>
                        <Card style={{ width: '100%' }}>
                           
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
                                    
                                    Подробнее...
                  </a>
                            </Card.Content>
                        </Card>
                    </div>

                    <div className='home_card'>
                        <Card style={{ width: '100%' }}>
                            
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
                                   
                                    Подробнее...
                  </a>
                            </Card.Content>
                        </Card>
                    </div>

                    <div className='home_card'>
                        <Card style={{ width: '100%' }}>
                          
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
                                   
                                    Подробнее...
                  </a>
                            </Card.Content>
                        </Card>
                    </div>

                    <div className='home_card'>
                        <Card style={{ width: '100%' }}>
                            
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
                                   
                                    Подробнее...
                  </a>
                            </Card.Content>
                        </Card>

                    </div>

                </div>

                

                <div className='home_2_row'>

                </div> */}
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