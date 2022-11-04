import React, { useState } from 'react';
import { Header, Icon, Grid, Dropdown} from 'semantic-ui-react';

export interface IPieSetting {
    'type': string,
}

interface PieSettingsProps {
    onPieSettingChange?: (pieSetting : IPieSetting) => any;
}

const Pie = ({onPieSettingChange} : PieSettingsProps) => {
    let defaultUserSetting: IPieSetting = {
        'type': 'basic'
    };
    let userSetting: IPieSetting = defaultUserSetting;
    const [pieSettingText, setPieSettingText] = useState('Basic');
    return(
        <div>
        <Grid>
            <Grid.Row centered>
                <Header as='h4' icon >
                    <Icon name='settings' />
                    Pie Settings
                    <Header.Subheader>
                    Customize Your Pie
                    </Header.Subheader>
                </Header>
            </Grid.Row>
            <Grid.Row centered>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Header as='h4' icon>
                            <Icon name='chart pie' />
                            Pie
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Dropdown placeholder = 'Type' button compact text={pieSettingText}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Basic' onClick={() => {
                                    userSetting['type'] = 'basic';
                                    setPieSettingText('Basic');
                                    if(onPieSettingChange) {
                                        onPieSettingChange(userSetting);
                                    }
                                }}/>
                                <Dropdown.Item text='Ring' onClick={() => {
                                    userSetting['type'] = 'ring';
                                    setPieSettingText('Ring');
                                    if(onPieSettingChange) {
                                        onPieSettingChange(userSetting);
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

export default Pie;
