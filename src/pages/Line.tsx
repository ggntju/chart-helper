import React, { useState }from 'react';
import { Header, Icon, Grid, Dropdown} from 'semantic-ui-react';

export interface ILineSetting {
    'type': string,
}

interface LineSettingsProps {
    onLineSettingChange?: (lineSetting : ILineSetting) => any;
}

const Line = ({onLineSettingChange} : LineSettingsProps) => {
    let defaultUserSetting: ILineSetting = {
        'type': 'basic'
    };
    let userSetting: ILineSetting = defaultUserSetting;
    const [lineSettingText, setLineSettingText] = useState('Basic');
    return(
        <div>
        <Grid>
            <Grid.Row centered>
                <Header as='h4' icon >
                    <Icon name='settings' />
                    Line Settings
                    <Header.Subheader>
                    Customize Your Line
                    </Header.Subheader>
                </Header>
            </Grid.Row>
            <Grid.Row centered>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='line graph' />
                            Line
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Dropdown placeholder = 'Type' button compact text={lineSettingText}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Basic' onClick={() => {
                                    userSetting['type'] = 'basic';
                                    setLineSettingText('Basic');
                                    if(onLineSettingChange) {
                                        onLineSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Stack' onClick={() => {
                                    userSetting['type'] = 'stack';
                                    setLineSettingText('Stack');
                                    if(onLineSettingChange) {
                                        onLineSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Smooth' onClick={() => {
                                    userSetting['type'] = 'smooth';
                                    setLineSettingText('Smooth');
                                    if(onLineSettingChange) {
                                        onLineSettingChange(userSetting);
                                    }
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

export default Line;
