import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_data } from './../../common/common_modules'
import { Button, Icon } from 'semantic-ui-react'


class Screen extends Component {


    hide_menu = () => {
        this.props.hidemenu()
    }

    send_manifest = () => {
        this.props.set_active_window("wait");
        
        const list_data = { userkey: this.props.store.login.userkey };
        get_data('list', list_data).then(
            (result) => {
                this.props.set_list_storage(result);
                this.props.set_active_window("send_manifest");
                this.props.set_search_send_manifest("");
            },
            (err) => { console.log(err) }
        );
    }
    
    reciept = () => {

        this.props.set_search_error("");
        this.props.set_search_reciept("");
        this.props.set_active_window("reciept");
    }
    
    storage = () => {
        this.props.set_active_window("wait");
        const list_data = { userkey: this.props.store.login.userkey };

        get_data('list', list_data).then(
            (result) => {
                this.props.set_list_storage(result);
                this.props.set_active_window("storage");
                this.props.set_search_storagre("");
            },
            (err) => { console.log(err) }
        );
    }

    get_manifest = () => {
        this.props.set_active_window("wait");
        const list_data = { userkey: this.props.store.login.userkey };

    get_data('enroute', list_data).then(
      (result) => {
        this.props.set_list_get_manifest(result);
        this.props.set_active_window("get_manifest");
      },
      (err) => { console.log(err) }
    );
    }


    


    button_click = (target) => {
        //console.log(target)

        switch (target){
            case 'create_disp': 
                get_data('citylist').then(
                (result) => {
                    this.props.SetCityList(result);
                    this.props.set_active_window(target);
                },
                (err) => { console.log(err) }
            );
            
            case 'my_disp': 
                get_data('citylist').then(
                (result) => {
                    this.props.SetCityList(result);
                    this.props.set_active_window(target);
                },
                (err) => { console.log(err) }
            );
            case 'upload_manifest': 
        
                const list_data = { userkey: this.props.store.login.userkey }
                
                get_data('importtemplatelist',list_data).then(
                    (result) => {
                        this.props.set_import_template_list(result); 
                    },
                    (err) => { console.log(err) }
                );
                get_data('defaulttemplatelist',list_data).then(
                    (result) => {
                        this.props.set_default_template_list(result); 
                    },
                    (err) => { console.log(err) }
                );
                get_data('disptemplatelist',list_data).then(
                    (result) => {
                        this.props.set_disp_template_list(result); 
                    },
                    (err) => { console.log(err) }
                );
                this.props.upload_manifest_reset_state()
                this.props.set_active_window(target);
            
            default: this.props.set_active_window(target);

        }
        // if(target == "create_disp") {
        //     get_data('citylist').then(
        //         (result) => {
        //             this.props.SetCityList(result);
        //             this.props.set_active_window(target);
                    
        //         },
        //         (err) => { console.log(err) }
        //     ); 
        // } else {
        //     this.props.set_active_window(target);
        // }
        
    };

    
    render() {
        return (
            <div>
                {this.props.store.general.hidemenu?(
                     <div className="leftmenu">

                    <div className="leftmenubutton">
                     <Button  compact icon onClick={this.hide_menu.bind(this)}>
                        <div className='leftmenubuttonicon'><Icon name='arrow right' /></div>
                    </Button>
                    </div>
                    <div className="leftmenubutton">
                    <Button  compact icon onClick={this.button_click.bind(this,"my_disp")}>
                    <div className='leftmenubuttonicon'><Icon name='list' /></div>
                    </Button>
                    </div>
                    <div className="leftmenubutton">
                    <Button  compact icon onClick={this.button_click.bind(this,"create_disp")}>
                    <div className='leftmenubuttonicon'><Icon name='edit outline' /></div>
                    </Button>
                    </div>
                    <div className="leftmenubutton">
                    <Button  compact icon onClick={this.button_click.bind(this,"upload_manifest")}>
                    <div className='leftmenubuttonicon'><Icon name='upload' /></div>
                    </Button> 
                    </div>
                    <div className="leftmenubutton">
                    <Button  compact icon onClick={this.button_click.bind(this,"mutual")}>
                    <div className='leftmenubuttonicon'><Icon name='money' /></div>
                    </Button> 
                    </div>
                    <div className="leftmenubutton">
                    <Button compact icon onClick={this.button_click.bind(this,"setting")}>
                    <div className='leftmenubuttonicon'><Icon name='setting' /></div>
                    </Button> 
                    </div>
                    
                    
             </div>
                    ):(
                <div className="leftmenu">
                   <div className="leftmenubutton">
                     <Button  compact icon onClick={this.hide_menu.bind(this)}>
                     <div className='leftmenubuttonicon'><Icon name='arrow left' /></div>
                    </Button>
                    </div>
                    <div onClick={this.button_click.bind(this,"my_disp")} className="leftmenuel"><Icon name='list' /> Мои накладные</div>
                    <div onClick={this.button_click.bind(this,"create_disp")} className="leftmenuel"><Icon name='edit outline' /> Создать накладную</div>
                    <div onClick={this.button_click.bind(this,"upload_manifest")} className="leftmenuel"><Icon name='upload' /> Загрузить манифест</div>
                    {this.props.store.login.agent ? (<div onClick={this.storage.bind(this)} className="leftmenuel">Доставки и Заявки</div>) : ( null)}
                    {this.props.store.login.agent ? (<div onClick={this.reciept.bind(this)} className="leftmenuel">Принять от отправителя</div>) : ( null)}
                    {this.props.store.login.agent ? (<div onClick={this.send_manifest.bind(this)} className="leftmenuel">Отправка манифеста</div>) : ( null)}
                    {this.props.store.login.agent ? (<div onClick={this.get_manifest.bind(this)} className="leftmenuel">Прием манифеста</div>) : ( null)}
                    <div onClick={this.button_click.bind(this,"mutual")} className="leftmenuel"><Icon name='money' /> Взаиморасчеты</div> 
                    <div onClick={this.button_click.bind(this,"setting")} className="leftmenuel"><Icon name='setting' /> Настройки</div>
            </div>
            )}
            
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state

    }),
    dispatch => ({
        
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
        set_list_get_manifest: (param) => { dispatch({ type: 'set_list_get_manifest', payload: param }) },
        set_search_error: (param) => { dispatch({ type: 'set_search_error', payload: param }) },
        set_search_reciept: (param) => { dispatch({ type: 'set_search_reciept', payload: param }) },
        set_search_storagre: (param) => { dispatch({ type: 'set_search_storagre', payload: param }) },
        set_search_send_manifest: (param) => { dispatch({ type: 'set_search_send_manifest', payload: param }) },
        set_import_template_list: (param) => { dispatch({ type: 'set_import_template_list', payload: param }) },
        upload_manifest_reset_state: () => { dispatch({ type: 'upload_manifest_reset_state' }) },
        set_default_template_list: (param) => { dispatch({ type: 'set_default_template_list', payload: param }) },
        set_disp_template_list: (param) => { dispatch({ type: 'set_disp_template_list', payload: param }) },
        hidemenu: () => { dispatch({ type: 'hidemenu' }) },
        SetCityList: (param) => { dispatch({ type: 'SetCityList', payload: param }) },
        
    })
)(Screen);