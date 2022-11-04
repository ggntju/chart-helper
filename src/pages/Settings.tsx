import React, { useState } from 'react';
import { Header, Icon, Grid, Dropdown, Input, Button} from 'semantic-ui-react';

export interface IUserSetting {
    'theme': string,
    'color_set': string,
    'xAxis_type': string, 
    'xAxis_name': string,
    'yAxis_type': string,
    'yAxis_name': string,
    'legend_orient': string, 
    'font_size': number,
}

interface GeneralSettingsProps {
    onUserSettingChange: (userSetting : IUserSetting) => any;
}

const GeneralSettings = ({onUserSettingChange} : GeneralSettingsProps) => {
    let defaultUserSetting: IUserSetting = {
        'theme': 'default',
        'color_set': 'set_1',
        'xAxis_type': 'value', 
        'xAxis_name': '',
        'yAxis_type': 'value',
        'yAxis_name': '',
        'legend_orient': 'horizontal', 
        'font_size': 20,
    };

    const [userSetting, setUserSetting] = useState(defaultUserSetting);
    const [themeText, setThemeText] = useState('Default');
    const [colorSetText, setColorSetText] = useState('Set 1');
    const [xTypeText, setXTypeText] = useState('Value');
    const [yTypeText, setYTypeText] = useState('Value');
    const [legendTypeText, setLegendTypeText] = useState('Horizontal');

    return(
        <div>
            <Grid>
                {/* <Grid.Row>
                <Header as='h4' icon>
                    <Icon name='settings' />
                    General Settings
                    <Header.Subheader>
                    Customize Your Chart
                    </Header.Subheader>
                </Header>
                </Grid.Row> */}
                <Grid.Row>
                    <Grid columns={2}>
                        <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='theme' />
                            Theme
                        </Header>
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <Dropdown placeholder = 'Theme' button compact text={themeText}>
                            <Dropdown.Menu>
                            <Dropdown.Item text='Default' onClick={() => {
                                userSetting['theme'] = 'default';
                                setUserSetting(userSetting);
                                setThemeText('Default');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Dark' onClick={() => {
                                userSetting['theme'] = 'dark';
                                setUserSetting(userSetting);
                                setThemeText('Dark');
                                onUserSettingChange(userSetting);
                            }}/>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Grid.Row>
                    <Grid columns={2}>
                        <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='font' />
                            Font Size
                        </Header>
                        </Grid.Column>
                        
                        <Grid.Column width={8}>
                            <Input focus placeholder='Size' fluid onChange={(evt, data) => {
                                if(parseInt(data.value) > 30) {
                                    window.electronAPI.showInvalidInputErrorBox();
                                    userSetting['font_size'] = 30;
                                    onUserSettingChange(userSetting);
                                } else {
                                    userSetting['font_size'] = parseInt(data.value);
                                    onUserSettingChange(userSetting);
                                }
                            }}/>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Grid.Row>
                    <Grid columns={2}>
                        <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='paint brush' />
                            Color Set
                        </Header>
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <Dropdown placeholder = 'Color' button compact text={colorSetText}>
                            <Dropdown.Menu>
                            <Dropdown.Item text='Set 1' onClick={() => {
                                userSetting['color_set'] = 'set_1';
                                setUserSetting(userSetting);
                                setColorSetText('Set 1');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Set 2' onClick={() => {
                                userSetting['color_set'] = 'set_2';
                                setUserSetting(userSetting);
                                setColorSetText('Set 2');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Set 3' onClick={() => {
                                userSetting['color_set'] = 'set_3';
                                setUserSetting(userSetting);
                                setColorSetText('Set 3');
                                onUserSettingChange(userSetting);
                            }}/>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Grid.Row>
                    <Grid columns={3}>
                        <Grid.Column width={4}>
                        <Header as='h4' icon>
                            <Icon name='chart line' />
                            X Axis
                        </Header>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        <Dropdown placeholder = 'Type' button compact text={xTypeText}>
                            <Dropdown.Menu>
                            <Dropdown.Item text='Value' onClick={() => {
                                userSetting['xAxis_type'] = 'value';
                                setUserSetting(userSetting);
                                setXTypeText('Value');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Category' onClick={() => {
                                userSetting['xAxis_type'] = 'category';
                                setUserSetting(userSetting);
                                setXTypeText('Category');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Time' onClick={() => {
                                userSetting['xAxis_type'] = 'time';
                                setUserSetting(userSetting);
                                setXTypeText('Time');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Log' onClick={() => {
                                userSetting['xAxis_type'] = 'log';
                                setUserSetting(userSetting);
                                setXTypeText('Log');
                                onUserSettingChange(userSetting);
                            }}/>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Input focus placeholder='Name' fluid onChange={(evt) => {
                                userSetting['xAxis_name'] = evt.target.value;
                                onUserSettingChange(userSetting);
                            }}/>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Grid.Row>
                    <Grid columns={3}>
                        <Grid.Column width={4}>
                        <Header as='h4' icon>
                            <Icon name='chart line' />
                            Y Axis
                        </Header>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        <Dropdown placeholder = 'Type' button compact text={yTypeText}>
                            <Dropdown.Menu>
                            <Dropdown.Item text='Value' onClick={() => {
                                userSetting['yAxis_type'] = 'value';
                                setUserSetting(userSetting);
                                setYTypeText('Value');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Category' onClick={() => {
                                userSetting['yAxis_type'] = 'category';
                                setUserSetting(userSetting);
                                setYTypeText('Category');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Time' onClick={() => {
                                userSetting['yAxis_type'] = 'time';
                                setUserSetting(userSetting);
                                setYTypeText('Time');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Log' onClick={() => {
                                userSetting['yAxis_type'] = 'log';
                                setUserSetting(userSetting);
                                setYTypeText('Log');
                                onUserSettingChange(userSetting);
                            }}/>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Input focus placeholder='Name' fluid onChange={(evt) => {
                                userSetting['yAxis_name'] = evt.target.value;
                                onUserSettingChange(userSetting);
                            }}/>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Grid.Row>
                    <Grid columns={2}>
                        <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='tag' />
                            Legend
                        </Header>
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <Dropdown placeholder = 'Orientation' button compact text={legendTypeText}>
                            <Dropdown.Menu>
                            <Dropdown.Item text='Horizontal' onClick={() => {
                                userSetting['legend_orient'] = 'horizontal';
                                setUserSetting(userSetting);
                                setLegendTypeText('Horizontal');
                                onUserSettingChange(userSetting);
                            }}/>
                            <Dropdown.Item text='Vertical' onClick={() => {
                                userSetting['legend_orient'] = 'vertical';
                                setUserSetting(userSetting);
                                setLegendTypeText('Vertical');
                                onUserSettingChange(userSetting);
                            }}/>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default GeneralSettings;
