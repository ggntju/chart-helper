import React, {useState, useContext, createContext, useEffect} from 'react';
import { Header, Icon, Grid, Container, Button, Dropdown, Image} from 'semantic-ui-react';
import ReactEcharts from "echarts-for-react"; 
import { transform } from 'echarts-stat';
import * as ecStat from 'echarts-stat';
const fs = window.electronFS;
import Bar, { IBarSetting } from './Bar';
import Line, { ILineSetting } from './Line';
import Pie, { IPieSetting } from './Pie';
import Scatter, { IScatterSetting } from './Scatter';
import GeneralSettings, { IUserSetting } from './Settings';
import leleImage from "../../assets/lele.jpg";

// @ts-ignore
const UserContext = createContext();

const Home = () => {
    const defaultOption = {
        dataset: [
            {
              // 序号为 0 的 dataset。
              source: [[10, 120], [20, 132], [30, 101], [40, 134], [50, 90], [60, 230], [70, 210]],
            },
            {
              // 序号为 1 的 dataset。
              source: [[10, 220], [20, 282], [30, 201], [40, 234], [50, 290], [60, 430], [70, 410]]
            },
            {
              // 序号为 2 的 dataset。
              source: [[10, 450], [20, 432], [30, 401], [40, 454], [50, 590], [60, 530], [70, 510]]
            },
        ],
        xAxis: {
          type: 'value',
          data: ['10', '20', '30', '40', '50', '60', '70'], 
          axisLabel: {
            fontSize: 20
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 20
          },
        },
        series: [
            {
                type: 'bar',
                name: 'Data Set 1',
                // 使用序号为 0 的 dataset。
                datasetIndex: 0,
            },
            {
                type: 'bar',
                name: 'Data Set 2',
                // 使用序号为 1 的 dataset。
                datasetIndex: 1,
            },
            {
                type: 'bar',
                name: 'Data Set 3',
                // 使用序号为 2 的 dataset。
                datasetIndex: 2,
            },
        ],
    }; 

    const defaultUserSetting: IUserSetting = {
        'theme': 'default',
        'color_set': 'set_1',
        'xAxis_type': 'value', 
        'xAxis_name': '',
        'yAxis_type': 'value',
        'yAxis_name': '',
        'legend_orient': 'horizontal', 
        'font_size': 20,
    };

    const defaultBarSetting: IBarSetting = {
        'type': 'basic'
    };

    const defaultLineSetting: ILineSetting = {
        'type': 'basic'
    };

    const defaultPieSetting: IPieSetting = {
        'type': 'basic'
    }

    const defaultScatterSetting: IScatterSetting = {
        'symbol_type': 'circle',
        'symbol_size': 'small', 
        'stat_switch': false,
        'stat_type': 'linear',
        'stat_props': [],
    };

    const colorSet_1: string[] = [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3'
    ];

    const colorSet_2: string[] = [
        '#dd6b66',
        '#759aa0',
        '#e69d87',
        '#8dc1a9',
        '#ea7e53',
        '#eedd78',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42'
    ];

    const colorSet_3: string[] = [
        '#37A2DA',
        '#32C5E9',
        '#67E0E3',
        '#9FE6B8',
        '#FFDB5C',
        '#ff9f7f',
        '#fb7293',
        '#E062AE',
        '#E690D1',
        '#e7bcf3',
        '#9d96f5',
        '#8378EA',
        '#96BFFF'
    ];

    let chartRef: any = null;
    const [fileLocation, setFileLocation] = useState('/');
    const [exportLocation, setExportLocation] = useState('/');
    const [plotType, setPlotType] = useState('bar');
    const [plotTypeText, setPlotTypeText] = useState('Bar');
    const [theme, setTheme] = useState('default');
    const [userData, setUserData] = useState({
        "xAxis": {
            "data": []
        },
        "yAxis": {
            "data": []
        },
        "series": [
            {
              "name": "Data Set 1",
              "data": [[10, 120], [20, 132], [30, 101], [40, 134], [50, 90], [60, 230], [70, 210]]
            },
            {
              "name": "Data Set 2",
              "data": [[10, 220], [20, 282], [30, 201], [40, 234], [50, 290], [60, 430], [70, 410]]
            },
            {
              "name": "Data Set 3",
              "data": [[10, 450], [20, 432], [30, 401], [40, 454], [50, 590], [60, 530], [70, 510]]
            }
        ]
    });
    const [style, setStyle] = useState({ height: '700px', width: '100%' });
    const [lastColorSet, setLastColorSet] = useState('set_1');
    const [userOption, setUserOption] = useState(defaultOption);
    const [userSetting, setUserSetting] = useState(defaultUserSetting);
    const [barSetting, setBarSetting] = useState(defaultBarSetting);
    const [lineSetting, setLineSetting] = useState(defaultLineSetting);
    const [pieSetting, setPieSetting] = useState(defaultPieSetting);
    const [scatterSetting, setScatterSetting] = useState(defaultScatterSetting);

    useEffect(() => {
        if(chartRef != null) {
            chartRef.echarts.registerTransform(ecStat.transform.regression);
        }
    }, []);

    const handleUserSetting = (userSetting_input: IUserSetting) => {
        setUserSetting(userSetting_input);
        setTheme(userSetting_input['theme']);
        switch (plotType) {
            case 'bar':
                generateOption(userData, userSetting_input, plotType, barSetting);
                break;
            case 'line':
                generateOption(userData, userSetting_input, plotType, lineSetting);
                break;  
            case 'pie':
                generateOption(userData, userSetting_input, plotType, pieSetting);
                break;   
            case 'scatter':
                generateOption(userData, userSetting_input, plotType, scatterSetting);
                break;
            default:
                break;
        }
        // console.log(JSON.stringify(userSetting));
    }

    const handleBarSetting = (barSetting_input: IBarSetting) => {
        setBarSetting(barSetting_input);
        generateOption(userData, userSetting, plotType, barSetting_input);
        // console.log(JSON.stringify(barSetting));
    }

    const handleLineSetting = (lineSetting_input: ILineSetting) => {
        setLineSetting(lineSetting_input);
        generateOption(userData, userSetting, plotType, lineSetting_input);
        // console.log(JSON.stringify(lineSetting));
    }

    const handlePieSetting = (pieSetting_input: IPieSetting) => {
        setPieSetting(pieSetting_input);
        generateOption(userData, userSetting, plotType, pieSetting_input);
        // console.log(JSON.stringify(pieSetting));
    }

    const handleScatterSetting = (scatterSetting_input: IScatterSetting) => {
        setScatterSetting(scatterSetting_input);
        generateOption(userData, userSetting, plotType, scatterSetting_input);
        // console.log(JSON.stringify(scatterSetting));
    }

    const sanityCheck = () => {
        // if(fileLocation == null || fileLocation == undefined || fileLocation == '/') {
        //     console.log('Missing Data Location');
        //     window.electronAPI.showFileMissingErrorBox();
        //     return false;
        // } else {
        //     return true;
        // }
        return true;
    }

    const generateOption = (userData:any, userSetting: IUserSetting, plotType: string, figureSetting: any) => {        
        let option: any = {};
        let colorSet: string[] = [];
        switch (lastColorSet) {
            case 'set_1':
                colorSet = colorSet_2;
                setLastColorSet('set_2');
                break;
            case 'set_2':
                colorSet = colorSet_3;
                setLastColorSet('set_3');
                break;   
            case 'set_3':
                colorSet = colorSet_1;
                setLastColorSet('set_1');
                break;  
            default:
                break;
        }
        option = {};
        option['toolbox'] = {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                // magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            },
            left: 'left'
        }
        option['dataset'] = [];
        option['series'] = [];
        option['tooltip'] = {
            'trigger': 'axis',
            'axisPointer': {
                'type': 'cross'
            }
        }
        const legend_left = userSetting['legend_orient'] == 'horizontal'? 'center' : 'right';
        switch (plotType) {
            case 'bar': 
                option['color'] = colorSet;
                option['legend'] = {'data':[], 'orient': userSetting['legend_orient'], 'left': legend_left, 'textStyle': {'fontSize': userSetting['font_size']}};

                option['xAxis'] = {
                    'type': userSetting['xAxis_type'],
                    'name': userSetting['xAxis_name'],
                    'nameLocation': 'center',
                    'nameTextStyle': {
                        'fontSize': userSetting['font_size']
                    },
                    'nameGap': userSetting['font_size'] + 10,
                    'data': userData['xAxis']['data'],
                    'axisLabel': {
                        'fontSize': userSetting['font_size'],
                    },
                };
                option['yAxis'] = {
                    'type': userSetting['yAxis_type'],
                    'name': userSetting['yAxis_name'],
                    'nameLocation': 'center',
                    'nameTextStyle': {
                        'fontSize': userSetting['font_size']
                    },
                    'nameGap': userSetting['font_size'] + 50,
                    'data': userData['yAxis']['data'],
                    'axisLabel': {
                        'fontSize': userSetting['font_size'],
                    },
                }
                if(figureSetting['type'] == 'basic') {
                    for(var i = 0; i < userData['series'].length; i++) {
                        option['dataset'].push({'source': userData['series'][i]['data']});
                        option['series'].push({
                            'type': 'bar',
                            'stack': '',
                            'datasetIndex': i,
                            'name': userData['series'][i]['name']
                        });
                        option['legend']['data'].push(userData['series'][i]['name']);
                    }
                }
                if(figureSetting['type'] == 'stack') {
                    for(var i = 0; i < userData['series'].length; i++) {
                        option['dataset'].push({'source': userData['series'][i]['data']});
                        option['series'].push({
                            'type': 'bar',
                            'stack': 'x',
                            'datasetIndex': i,
                            'name': userData['series'][i]['name']
                        });
                        option['legend']['data'].push(userData['series'][i]['name']);
                    }
                }
                break;
            case 'line':
                option['color'] = colorSet;
                option['legend'] = {'data':[], 'orient': userSetting['legend_orient'], 'left': legend_left, 'textStyle': {'fontSize': userSetting['font_size']}};

                option['xAxis'] = {
                    'type': userSetting['xAxis_type'],
                    'name': userSetting['xAxis_name'],
                    'nameLocation': 'center',
                    'nameTextStyle': {
                        'fontSize': userSetting['font_size']
                    },
                    'nameGap': userSetting['font_size'] + 10,
                    'data': userData['xAxis']['data'],
                    'axisLabel': {
                        'fontSize': userSetting['font_size'],
                    },
                };
                option['yAxis'] = {
                    'type': userSetting['yAxis_type'],
                    'name': userSetting['yAxis_name'],
                    'nameLocation': 'center',
                    'nameTextStyle': {
                        'fontSize': userSetting['font_size']
                    },
                    'nameGap': userSetting['font_size'] + 50,
                    'data': userData['yAxis']['data'],
                    'axisLabel': {
                        'fontSize': userSetting['font_size'],
                    },
                }
                if(figureSetting['type'] == 'basic') {
                    for(var i = 0; i < userData['series'].length; i++) {
                        option['dataset'].push({'source': userData['series'][i]['data']});
                        option['series'].push({
                            'type': 'line',
                            'stack': '',
                            'datasetIndex': i,
                            'name': userData['series'][i]['name']
                        });
                        option['legend']['data'].push(userData['series'][i]['name']);
                    }
                }
                if(figureSetting['type'] == 'stack') {
                    for(var i = 0; i < userData['series'].length; i++) {
                        option['dataset'].push({'source': userData['series'][i]['data']});
                        option['series'].push({
                            'type': 'line',
                            'stack': 'x',
                            'datasetIndex': i,
                            'name': userData['series'][i]['name']
                        });
                        option['legend']['data'].push(userData['series'][i]['name']);
                    }
                }
                if(figureSetting['type'] == 'smooth') {
                    for(var i = 0; i < userData['series'].length; i++) {
                        option['dataset'].push({'source': userData['series'][i]['data']});
                        option['series'].push({
                            'type': 'line',
                            'stack': '',
                            'datasetIndex': i,
                            'name': userData['series'][i]['name'],
                            'smooth': true
                        });
                        option['legend']['data'].push(userData['series'][i]['name']);
                    }
                }
                break;  
            case 'pie':
                option['color'] = colorSet;
                option['legend'] = {'orient': userSetting['legend_orient'], 'left': legend_left, 'textStyle': {'fontSize': userSetting['font_size']}};

                let series_data = [];
                for(var i = 0; i < userData['series'][0]['data'].length; i++) {
                    series_data.push({'value': userData['series'][0]['data'][i][1], 'name': userData['series'][0]['data'][i][0]});
                }
                if(figureSetting['type'] == 'basic') {
                    option['series'] = [
                        {
                            'data': series_data,
                            'type': 'pie',
                            radius: ['50%'],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                if(figureSetting['type'] == 'ring') {
                    option['series'] = [
                        {
                            'data': series_data,
                            'type': 'pie',
                            radius: ['40%', '70%'],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                break;   
            case 'scatter':
                option['color'] = colorSet;
                option['legend'] = {'data':[], 'orient': userSetting['legend_orient'], 'left': legend_left, 'textStyle': {'fontSize': userSetting['font_size']}};

                option['xAxis'] = {
                    'type': userSetting['xAxis_type'],
                    'name': userSetting['xAxis_name'],
                    'nameLocation': 'center',
                    'nameTextStyle': {
                        'fontSize': userSetting['font_size']
                    },
                    'nameGap': userSetting['font_size'] + 10,
                    'data': userData['xAxis']['data'],
                    'axisLabel': {
                        'fontSize': userSetting['font_size'],
                    },
                };
                option['yAxis'] = {
                    'type': userSetting['yAxis_type'],
                    'name': userSetting['yAxis_name'],
                    'nameLocation': 'center',
                    'nameTextStyle': {
                        'fontSize': userSetting['font_size']
                    },
                    'nameGap': userSetting['font_size'] + 50,
                    'data': userData['yAxis']['data'],
                    'axisLabel': {
                        'fontSize': userSetting['font_size'],
                    },
                };
                
                if(figureSetting['symbol_size'] == 'small') {
                    for(var i = 0; i < userData['series'].length; i++) {
                        option['dataset'].push({'source': userData['series'][i]['data']});
                        option['series'].push({
                            'type': 'scatter',
                            'name': userData['series'][i]['name'],
                            'symbolSize': 20,
                            'symbol': figureSetting['symbol_type'],
                            'datasetIndex': i
                        });
                        option['legend']['data'].push(userData['series'][i]['name']);
                    }
                    if(figureSetting['stat_switch'] == true) {
                        option['dataset'].push({
                            'transform': {
                                'type': 'ecStat:regression',
                                'config': { 'method': figureSetting['stat_type'], 'formulaOn': 'end', 'order': figureSetting['stat_props'][0]}
                            }
                        })
                    }
                    if(figureSetting['stat_switch'] == true) {
                        option['series'].push({
                            "name": "line",
                            "type": "line",
                            "datasetIndex": userData['series'].length,
                            "symbolSize": 0.1,
                            "symbol": "circle",
                            "label": { "show": true, "fontSize": 16 },
                            "labelLayout": { "dx": -20 },
                            "encode": { "label": 2, "tooltip": 1 }
                        });
                    }
                }
                if(figureSetting['symbol_size'] == 'big') {
                    for(var i = 0; i < userData['series'].length; i++) {
                        option['dataset'].push({'source': userData['series'][i]['data']});
                        option['series'].push({
                            'type': 'scatter',
                            'name': userData['series'][i]['name'],
                            'symbolSize': 30,
                            'symbol': figureSetting['symbol_type'],
                            'datasetIndex': i
                        });
                        option['legend']['data'].push(userData['series'][i]['name']);
                    }
                    if(figureSetting['stat_switch'] == true) {
                        option['dataset'].push({
                            'transform': {
                                'type': 'ecStat:regression',
                                'config': { 'method': figureSetting['stat_type'], 'formulaOn': 'end', 'order': figureSetting['stat_props'][0]}
                            }
                        })
                    }
                    if(figureSetting['stat_switch'] == true) {
                        option['series'].push({
                            "name": "line",
                            "type": "line",
                            "datasetIndex": userData['series'].length,
                            "symbolSize": 0.1,
                            "symbol": "circle",
                            "label": { "show": true, "fontSize": 16 },
                            "labelLayout": { "dx": -20 },
                            "encode": { "label": 2, "tooltip": 1 }
                        });
                    }
                }
                break;
            default:
                break;
        }
        // console.log(JSON.stringify(option));
        setUserOption(option);
    }

    const handlePlotAction = () => {
        switch (plotType) {
            case 'bar':
                generateOption(userData, userSetting, plotType, barSetting);
                break;
            case 'line':
                generateOption(userData, userSetting, plotType, lineSetting);
                break;  
            case 'pie':
                generateOption(userData, userSetting, plotType, pieSetting);
                break;   
            case 'scatter':
                generateOption(userData, userSetting, plotType, scatterSetting);
                break;
            default:
                break;
        }
    }

    let plotSetting: JSX.Element | null | undefined = null;
    let generalSetting: JSX.Element = <GeneralSettings onUserSettingChange = {handleUserSetting}/>

    if(plotType == 'bar') {
        plotSetting = <Bar onBarSettingChange={handleBarSetting}/>
    }
    if(plotType == 'line') {
        plotSetting = <Line onLineSettingChange={handleLineSetting}/>
    }
    if(plotType == 'pie') {
        plotSetting = <Pie onPieSettingChange={handlePieSetting}/>
    }
    if(plotType == 'scatter') {
        plotSetting = <Scatter onScatterSettingChange={handleScatterSetting}/>
    }

    return(
        <UserContext.Provider value={fileLocation}>
        <div>
        {/* title part */}
        <Grid columns={3}>
            <Grid.Column width={2} stretched></Grid.Column>
            <Grid.Column width={12} stretched>
                <Header as='h2' icon>
                <Image src={leleImage} size='massive' circular />
                Meow! I Can Help
                </Header>
            </Grid.Column>
            <Grid.Column width={2} stretched></Grid.Column>
        </Grid>

        <Grid columns={3}>
            <Grid.Column width={2} >
                {/* file selector */}
                <Grid.Row centered>
                    <Grid columns={3}>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Button color='black' onClick={async () => {
                                const filePath = await window.electronAPI.openFile();
                                if(filePath != '/' && filePath != undefined) {
                                    setFileLocation(filePath);
                                    let m_data: any = [];
                                    const file_data = fs.readFileSync(filePath);
                                    // console.log(JSON.stringify(JSON.parse(file_data)));
                                    setUserData(JSON.parse(file_data));
                                }
                            }} fluid circular>Import Data</Button>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid columns={3}>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Button color='black' fluid circular onClick={() => {
                                if(sanityCheck()) {
                                    handlePlotAction();
                                }
                            }}>Plot</Button>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                {/* plot type selector */}
                <Grid.Row centered>
                    <Grid columns={3}>
                        <Grid.Column width={2}>

                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Dropdown placeholder='Plot' button fluid text={plotTypeText}>
                                <Dropdown.Menu>
                                    <Dropdown.Item text='Bar' onClick={() => {
                                        setPlotType('bar');
                                        setPlotTypeText('Bar');
                                    }}/>
                                    <Dropdown.Item text='Line' onClick={() => {
                                        setPlotType('line');
                                        setPlotTypeText('Line');
                                        }}/>
                                    <Dropdown.Item text='Pie' onClick={() => {
                                        setPlotType('pie');
                                        setPlotTypeText('Pie');
                                    }}/>
                                    <Dropdown.Item text='Scatter' onClick={() => {
                                        setPlotType('scatter');
                                        setPlotTypeText('Scatter');
                                    }}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Grid.Column>
                        <Grid.Column width={2}>

                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                {/* plot settings */}
                <Grid.Row centered>
                    {plotSetting}
                </Grid.Row>

            </Grid.Column>
            <Grid.Column width={11} stretched>
                <Container fluid>
                    <div id='echarts'>
                        <ReactEcharts ref={(e) => { chartRef = e; }} option={userOption} theme={theme} style={style} notMerge={true} opts={{renderer: 'canvas'} } />
                    </div>
                </Container>
            </Grid.Column>
            <Grid.Column width={3} stretched>
                {generalSetting}
            </Grid.Column>
        </Grid>
        </div>
        </UserContext.Provider>
    )
}

export default Home;
