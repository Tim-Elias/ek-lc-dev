import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table} from 'semantic-ui-react'

class Screen extends React.Component {

    render() {
        return (
            <div>
                <div className="disp_Number">
                    <div><Button compact icon onClick={this.props.modules.back}>
                        <Icon name='arrow left' />
                    </Button>
                        <b className='page_header'>Шаблон значений по умолчанию</b>
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

    })
)(Screen);