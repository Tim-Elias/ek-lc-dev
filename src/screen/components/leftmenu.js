import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_data } from './../../common/common_modules'
import { Button, Icon } from 'semantic-ui-react'
//import CreateDispModules from '../create_disp_modules'


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

    SetSendTerminal = (param) => {
        let DelMethod

        if (this.props.store.create_disp.RecTerminal) {
            if (param) {
                DelMethod = "Склад - Склад"
            } else {
                DelMethod = "Дверь - Склад"
            }
        } else {
            if (param) {
                DelMethod = "Склад - Дверь"
            } else {
                DelMethod = "Дверь - Дверь"
            }
        }

        const data = {
            SendTerminal: param,
            DelMethod: DelMethod
        }

        this.props.SetSendTerminal(data)

    }

    SetRecTerminal = (param) => {
        let DelMethod
        if (param) {
            if (this.props.store.create_disp.SendTerminal) {
                DelMethod = "Склад - Склад"
            } else {
                DelMethod = "Дверь - Склад"
            }
        } else {
            if (this.props.store.create_disp.SendTerminal) {
                DelMethod = "Склад - Дверь"
            } else {
                DelMethod = "Дверь - Дверь"
            }
        }

        const data = {
            RecTerminal: param,
            DelMethod: DelMethod
        }
        this.props.SetRecTerminal(data)
    }


    SelectSendCity = (value) => {

        //console.log(value)

        this.props.SetSelectedSendCity(value)

        const city = value.label
        this.props.SetSendCity(city)

        get_data('terminallist', { city }).then(
            (result) => {

                this.props.SetSendTerminalList(result)
                if (result.length === 0) {
                    this.SetSendTerminal(false)
                }

            },
            (err) => {
                console.log("err")
                console.log(err)
            }
        );
    }

    SelectRecCity = (value) => {

        this.props.SetSelectedRecCity(value)

        const city = value.label
        this.props.SetRecCity(city)

        get_data('terminallist', { city }).then(
            (result) => {

                this.props.SetRecTerminalList(result)
                if (result.length === 0) {
                    this.SetRecTerminal(false)
                }
            },
            (err) => {
                console.log("err")
                console.log(err)
            }
        );
    }

    button_click = (target) => {
        const list_data = { userkey: this.props.store.login.userkey }
        // this.clickChild()

        switch (target) {
            case 'create_disp':
                this.props.set_active_window('wait');
                this.props.reset_create_disp_data()
                if(this.props.store.login.Q_only){
                   this.props.SetCargoInfoType({label:"Указать итогвые значения", value: true}) 
                }
                get_data('citylist').then(
                    (result) => {
                        this.props.SetCityList(result);
                        this.props.set_active_window(target);
                        get_data('disptemplatelist', { userkey: this.props.store.login.userkey }).then(
                            (result) => {
                                this.props.set_disp_template_list(result);
                                if (this.props.store.login.default_send !== '0') {
                                    const default_send = this.props.store.upload_manifest.disp_template_list.find(el => el.Key === this.props.store.login.default_send)

                                    const city = this.props.store.create_disp.CityList.filter((el) => el.value === default_send.City)[0]
                                    this.SelectSendCity(city)
                                    this.props.SetSendAdress(default_send.Adress)
                                    this.props.SetSendAdress(default_send.Adress)
                                    this.props.SetSendPhone(default_send.Phone)
                                    this.props.SetSendPerson(default_send.Person)
                                    this.props.SetSendCompany(default_send.Company)
                                    this.props.SetSendAddInfo(default_send.AddInfo)

                                    this.SetSendTerminal(default_send.Terminal)


                                }
                                if (this.props.store.login.default_rec !== '0') {
                                    const default_rec = this.props.store.upload_manifest.disp_template_list.find(el => el.Key === this.props.store.login.default_rec)

                                    const city = this.props.store.create_disp.CityList.filter((el) => el.value === default_rec.City)[0]
                                    this.SelectRecCity(city)
                                    this.props.SetRecAdress(default_rec.Adress)
                                    this.props.SetRecAdress(default_rec.Adress)
                                    this.props.SetRecPhone(default_rec.Phone)
                                    this.props.SetRecPerson(default_rec.Person)
                                    this.props.SetRecCompany(default_rec.Company)
                                    this.props.SetRecAddInfo(default_rec.AddInfo)

                                    this.SetRecTerminal(default_rec.Terminal)
                                }

                            },
                            (err) => { console.log(err) }
                        );

                    },
                    (err) => { console.log(err) }
                );


                break

            case 'my_disp':
                this.props.set_active_window(target);
                this.props.set_my_disp_data([]);
                break

            case 'disp_map':

            console.log ('map')
            get_data('courierlist', { userkey: this.props.store.login.userkey }).then(
                (result) => {
                    this.props.set_courier_list(result);
                },
                (err) => { console.log(err) }
            );
                
                this.props.set_active_window(target);
            
            break


            case 'upload_manifest':

                this.props.reset_upload_manifest_data()
                

                if (this.props.store.login.consolidate_upload_manifest) {
                    const set_upload_in_one = { label: "Загрузка консолидации", value: true }
                    this.props.set_upload_in_one(set_upload_in_one)

                }

                get_data('importtemplatelist', list_data).then(
                    (result) => {
                        this.props.set_import_template_list(result);
                    },
                    (err) => { console.log(err) }
                );
                get_data('defaulttemplatelist', list_data).then(
                    (result) => {
                        this.props.set_default_template_list(result);
                    },
                    (err) => { console.log(err) }
                );
                get_data('disptemplatelist', list_data).then(
                    (result) => {
                        this.props.set_disp_template_list(result);
                    },
                    (err) => { console.log(err) }
                );

                this.props.set_active_window(target);
                break

            case 'setting':
                this.props.set_active_window(target);

                
                // get_data('importtemplatelist', list_data).then(
                //     (result) => {
                //         this.props.set_import_template_list(result);
                //     },
                //     (err) => { console.log(err) }
                // );
                // get_data('defaulttemplatelist', list_data).then(
                //     (result) => {
                //         this.props.set_default_template_list(result);
                //     },
                //     (err) => { console.log(err) }
                // );
                get_data('disptemplatelist', list_data).then(
                    (result) => {
                        this.props.set_disp_template_list(result);
                    },
                    (err) => { console.log(err) }
                );
                get_data('citylist').then(
                    (result) => {
                        this.props.SetCityList(result);
                    },
                    (err) => { console.log(err) }
                );

                break

            default:
                this.props.set_active_window(target);
                break

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
                {/* <CreateDispModules  setClick={click => this.clickChild = click}/> */}

                {this.props.store.general.hidemenu ? (
                    <div className="leftmenu">

                        <div className="leftmenubutton">
                            <Button compact icon onClick={this.hide_menu.bind(this)}>
                                <div className='leftmenubuttonicon'><Icon name='arrow right' /></div>
                            </Button>
                        </div>
                        <div className="leftmenubutton">
                            <Button compact icon onClick={this.button_click.bind(this, "my_disp")}>
                                <div className='leftmenubuttonicon'><Icon name='list' /></div>
                            </Button>
                        </div>
                        {this.props.store.login.create_disp ? (<div className="leftmenubutton">
                            <Button compact icon onClick={this.button_click.bind(this, "create_disp")}>
                                <div className='leftmenubuttonicon'><Icon name='edit outline' /></div>
                            </Button>
                        </div>) : (null)}
                        {this.props.store.login.upload_manifest ? (
                            <div className="leftmenubutton">
                                <Button compact icon onClick={this.button_click.bind(this, "upload_manifest")}>
                                    <div className='leftmenubuttonicon'><Icon name='upload' /></div>
                                </Button>
                            </div>) : (null)}
                        {this.props.store.login.mutual ? (
                            <div className="leftmenubutton">
                                <Button compact icon onClick={this.button_click.bind(this, "mutual")}>
                                    <div className='leftmenubuttonicon'><Icon name='money' /></div>
                                </Button>
                            </div>) : (null)}
                        {this.props.store.login.setting ? (
                            <div className="leftmenubutton">
                                <Button compact icon onClick={this.button_click.bind(this, "setting")}>
                                    <div className='leftmenubuttonicon'><Icon name='setting' /></div>
                                </Button>
                            </div>) : (null)}
                        


                    </div>
                ) : (
                        <div className="leftmenu">
                            <div className="leftmenubutton">
                                <Button compact icon onClick={this.hide_menu.bind(this)}>
                                    <div className='leftmenubuttonicon'><Icon name='arrow left' /></div>
                                </Button>
                            </div>
                            <div onClick={this.button_click.bind(this, "my_disp")} className="leftmenuel"><Icon name='list' /> Мои накладные</div>
                            {this.props.store.login.create_disp ? (<div onClick={this.button_click.bind(this, "create_disp")} className="leftmenuel"><Icon name='edit outline' /> Создать накладную</div>) : (null)}
                            {this.props.store.login.upload_manifest ? (<div onClick={this.button_click.bind(this, "upload_manifest")} className="leftmenuel"><Icon name='upload' /> Загрузить манифест</div>) : (null)}
                            {/* {this.props.store.login.agent ? (<div onClick={this.storage.bind(this)} className="leftmenuel">Доставки и Заявки</div>) : ( null)}
                    {this.props.store.login.agent ? (<div onClick={this.reciept.bind(this)} className="leftmenuel">Принять от отправителя</div>) : ( null)}
                    {this.props.store.login.agent ? (<div onClick={this.send_manifest.bind(this)} className="leftmenuel">Отправка манифеста</div>) : ( null)}
                    {this.props.store.login.agent ? (<div onClick={this.get_manifest.bind(this)} className="leftmenuel">Прием манифеста</div>) : ( null)} */}
                            {this.props.store.login.mutual ? (<div onClick={this.button_click.bind(this, "mutual")} className="leftmenuel"><Icon name='money' /> Взаиморасчеты</div>) : (null)}

                            {this.props.store.login.setting ? (
                                <div onClick={this.button_click.bind(this, "setting")} className="leftmenuel"><Icon name='setting' /> Настройки</div>
                            ) : (null)}
                            {this.props.store.login.disp_map ? (<div onClick={this.button_click.bind(this, "disp_map")} className="leftmenuel"><Icon name='edit outline' /> Накладные на карте</div>) : (null)}
                           
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
        set_my_disp_data: (param) => { dispatch({ type: 'set_my_disp_data', payload: param }) },
        reset_create_disp_data: () => { dispatch({ type: 'reset_create_disp_data' }) },
        reset_upload_manifest_data: () => { dispatch({ type: 'reset_upload_manifest_data' }) },
        set_upload_in_one: (param) => { dispatch({ type: 'set_upload_in_one', payload: param }) },


        SetSendCity: (param) => { dispatch({ type: 'SetSendCity', payload: param }) },
        SetSendTerminal: (param) => { dispatch({ type: 'SetSendTerminal', payload: param }) },
        SetSendAdress: (param) => { dispatch({ type: 'SetSendAdress', payload: param }) },

        SetSendCompany: (param) => { dispatch({ type: 'SetSendCompany', payload: param }) },
        SetSendPhone: (param) => { dispatch({ type: 'SetSendPhone', payload: param }) },
        SetSendPerson: (param) => { dispatch({ type: 'SetSendPerson', payload: param }) },
        SetSendAddInfo: (param) => { dispatch({ type: 'SetSendAddInfo', payload: param }) },

        SetSendSelectTerminal: (param) => { dispatch({ type: 'SetSendSelectTerminal', payload: param }) },
        SetSendTerminalList: (param) => { dispatch({ type: 'SetSendTerminalList', payload: param }) },

        SetRecCity: (param) => { dispatch({ type: 'SetRecCity', payload: param }) },
        SetRecTerminal: (param) => { dispatch({ type: 'SetRecTerminal', payload: param }) },
        SetRecAdress: (param) => { dispatch({ type: 'SetRecAdress', payload: param }) },

        SetRecCompany: (param) => { dispatch({ type: 'SetRecCompany', payload: param }) },
        SetRecPhone: (param) => { dispatch({ type: 'SetRecPhone', payload: param }) },
        SetRecPerson: (param) => { dispatch({ type: 'SetRecPerson', payload: param }) },
        SetRecAddInfo: (param) => { dispatch({ type: 'SetRecAddInfo', payload: param }) },

        SetRecSelectTerminal: (param) => { dispatch({ type: 'SetRecSelectTerminal', payload: param }) },
        SetRecTerminalList: (param) => { dispatch({ type: 'SetRecTerminalList', payload: param }) },
        SetSelectedSendCity: (param) => { dispatch({ type: 'SetSelectedSendCity', payload: param }) },
        SetSelectedRecCity: (param) => { dispatch({ type: 'SetSelectedRecCity', payload: param }) },

        SetCargoInfoType: (param) => { dispatch({ type: 'SetCargoInfoType', payload: param }) },
        set_courier_list: (param) => { dispatch({ type: 'set_courier_list', payload: param }) },

    })
)(Screen);