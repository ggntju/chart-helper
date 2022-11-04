import React, { useState } from 'react';
import { Header, Icon, Grid, Dropdown} from 'semantic-ui-react';

export interface IBarSetting {
    'type': string,
}

interface BarSettingsProps {
    onBarSettingChange?: (barSetting : IBarSetting) => any;
}

const Bar = ({onBarSettingChange} : BarSettingsProps) => {
    let defaultUserSetting: IBarSetting = {
        'type': 'basic'
    };
    let userSetting: IBarSetting = defaultUserSetting;
    const [barSettingText, setBarSettingText] = useState('Basic');

    return(
        <div>
        <Grid>
            <Grid.Row centered>
                <Header as='h4' icon >
                    <Icon name='settings' />
                    Bar Settings
                    <Header.Subheader>
                    Customize Your Bar
                    </Header.Subheader>
                </Header>
            </Grid.Row>
            <Grid.Row centered>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='chart bar outline' />
                            Bar
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Dropdown placeholder = 'Type' button compact text={barSettingText}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Basic' onClick={() => {
                                    userSetting['type'] = 'basic';
                                    setBarSettingText('Basic');
                                    if(onBarSettingChange) {
                                        onBarSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Stack' onClick={() => {
                                    userSetting['type'] = 'stack';
                                    setBarSettingText('Stack');
                                    if(onBarSettingChange) {
                                        onBarSettingChange(userSetting);
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

export default Bar;
