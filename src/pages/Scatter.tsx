import React, { useState } from 'react';
import { Header, Icon, Grid, Dropdown, Radio, Input} from 'semantic-ui-react';

export interface IScatterSetting {
    'symbol_type': string,
    'symbol_size': string, 
    'stat_switch': boolean,
    'stat_type': string,
    'stat_props': number[],
}

interface ScatterSettingsProps {
    onScatterSettingChange?: (lineSetting : IScatterSetting) => any;
}

const Scatter = ({onScatterSettingChange} : ScatterSettingsProps) => {
    let defaultUserSetting: IScatterSetting = {
        'symbol_type': 'circle',
        'symbol_size': 'small', 
        'stat_switch': false,
        'stat_type': 'linear',
        'stat_props': [0],
    };
    let symbolTypeText:string = 'Circle';
    let symbolSizeText:string = 'Small';
    let regressionTypeText:string = 'Linear';
    const [userSetting, setUserSetting] = useState(defaultUserSetting);
    const [typeText, setTypeText] = useState(symbolTypeText);
    const [sizeText, setSizeText] = useState(symbolSizeText);
    const [regressionType, setRegressionType] = useState(regressionTypeText);

    const ScatterRegressionSettingComponent: JSX.Element = 
        <div>
        <Grid centered columns={3}>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
            <Grid.Row centered>
            <Radio toggle label='Regression' onChange={(evt, data)=> {
                if(data.checked != null) {
                    userSetting['stat_switch'] = data.checked;
                }
                setUserSetting(userSetting);
                if(onScatterSettingChange) {
                    onScatterSettingChange(userSetting);
                }
            }}/>
            </Grid.Row>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
        </Grid>
        {(userSetting['stat_switch'] == true) ? 
        <div>
        <Grid centered columns={3}>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
            <Grid.Row centered>
            <Dropdown placeholder = 'Regression Type' compact button text={regressionType}>
                <Dropdown.Menu>
                    <Dropdown.Item text='Linear' onClick={() => {
                        userSetting['stat_type'] = 'linear';
                        setUserSetting(userSetting);
                        setRegressionType('Linear');
                        if(onScatterSettingChange) {
                            onScatterSettingChange(userSetting);
                        }
                    }}/>
                    <Dropdown.Item text='Exponential' onClick={() => {
                        userSetting['stat_type'] = 'exponential';
                        setUserSetting(userSetting);
                        setRegressionType('Exponential');
                        if(onScatterSettingChange) {
                            onScatterSettingChange(userSetting);
                        }
                    }}/>
                    <Dropdown.Item text='Polynomial' onClick={() => {
                        userSetting['stat_type'] = 'polynomial';
                        setUserSetting(userSetting);
                        setRegressionType('Polynomial');
                        if(onScatterSettingChange) {
                            onScatterSettingChange(userSetting);
                        }
                    }}/>
                </Dropdown.Menu>
            </Dropdown>
            </Grid.Row> 
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
        </Grid>
        <Grid centered columns={3}>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
            <Grid.Row centered>
                {userSetting['stat_type'] == 'polynomial' ? <Input focus placeholder='Polynomial Order' onChange={(evt, data) => {
                    if(data.value != null && data.value != "") {
                        userSetting['stat_props'] = [parseInt(data.value)];
                        setUserSetting(userSetting);
                        if(onScatterSettingChange) {
                            onScatterSettingChange(userSetting);
                        }
                    }
                    
                }}/> : <div></div>}
            </Grid.Row>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
        </Grid>
        </div>
            : <div></div>}
        </div>

    return(
        <div>
        <Grid>
            <Grid.Row centered>
                <Header as='h4' icon >
                    <Icon name='settings' />
                    Scatter Settings
                    <Header.Subheader>
                    Customize Your Scatter
                    </Header.Subheader>
                </Header>
            </Grid.Row>
            <Grid.Row centered>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='braille' />
                            Scatter
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Dropdown placeholder = 'Type' compact button text={typeText}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Circle' onClick={() => {
                                    userSetting['symbol_type'] = 'circle';
                                    setUserSetting(userSetting);
                                    setTypeText('Circle');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Rect' onClick={() => {
                                    userSetting['symbol_type'] = 'rect';
                                    setUserSetting(userSetting);
                                    setTypeText('Rect');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='RoundRect' onClick={() => {
                                    userSetting['symbol_type'] = 'roundRect';
                                    setUserSetting(userSetting);
                                    setTypeText('RoundRect');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Triangle' onClick={() => {
                                    userSetting['symbol_type'] = 'triangle';
                                    setUserSetting(userSetting);
                                    setTypeText('Triangle');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Diamond' onClick={() => {
                                    userSetting['symbol_type'] = 'diamond';
                                    setUserSetting(userSetting);
                                    setTypeText('Diamond');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Pin' onClick={() => {
                                    userSetting['symbol_type'] = 'pin';
                                    setUserSetting(userSetting);
                                    setTypeText('Pin');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Arrow' onClick={() => {
                                    userSetting['symbol_type'] = 'arrow';
                                    setUserSetting(userSetting);
                                    setTypeText('Arrow');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>
                </Grid>
            </Grid.Row>
            <Grid.Row centered>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='text height' />
                            Size
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Dropdown placeholder = 'Type' button compact text={sizeText}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Small' onClick={() => {
                                    userSetting['symbol_size'] = 'small';
                                    setUserSetting(userSetting);
                                    setSizeText('Small');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Big' onClick={() => {
                                    userSetting['symbol_size'] = 'big';
                                    setUserSetting(userSetting);
                                    setSizeText('Big');
                                    if(onScatterSettingChange) {
                                        onScatterSettingChange(userSetting);
                                    }
                                }}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>
                </Grid>
            </Grid.Row>
            <Grid.Row centered>
                {ScatterRegressionSettingComponent}
            </Grid.Row>
        </Grid>
        </div>
    )
}

export default Scatter;
