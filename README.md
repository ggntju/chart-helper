# Welcome to Chart Helper

[![CodeQL](https://github.com/ggntju/chart-helper/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/ggntju/chart-helper/actions/workflows/codeql.yml)

## Getting Started

### Overview

_Chart Helper_ is a statistical tool for creating charts with user defined data. It reads data from a specified location and then render it into a chart based on all of the options we select. It is powered by [Apache ECharts](https://echarts.apache.org/en/index.html), an open source JavaScript visualization library, therefore, this tool can be seen as a GUI wrapper for part of [Apache ECharts](https://echarts.apache.org/en/index.html).

### How to use

_Chart Helper_ uses [JSON](https://www.json.org/json-en.html) as data exchanging format. It only has 3 fields for user to deal with `xAxis`, `yAxis`, `series`:

```
{
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
}
```

### Development

Pull requests and suggestions are welcome.

To run latest version, simply run:

```bash
cd chart-helper
npm install
npm run start
```

To build package:

```bash
npm run package
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

### Dependencies

- Data Visualization: [Apache ECharts](https://echarts.apache.org/en/index.html)

- Front-End: [React](https://reactjs.org/), [Electron](https://www.electronjs.org/), [Semantic-UI](https://react.semantic-ui.com/)

- Language: [Typescript](https://www.typescriptlang.org/)

- Boilerplate: [Electron React Boilerplate](https://electron-react-boilerplate.js.org/)

### Download

Version 0.1.0

Mac OS:

- [ChartHelper-0.1.0.dmg](https://github.com/ggntju/chart-helper/releases/download/v0.1.0/ChartHelper-0.1.0.dmg)

- [ChartHelper-0.1.0-arm64.dmg](https://github.com/ggntju/chart-helper/releases/download/v0.1.0/ChartHelper-0.1.0-arm64.dmg)

Windows:

- [ChartHelper-0.1.0-win-unpacked.zip](https://github.com/ggntju/chart-helper/releases/download/v0.1.0/ChartHelper-0.1.0-win-unpacked.zip)

### Status

This project is still under active development and in a very early stage

## Help Project

Your donations (any form of support is welcome, even cryptos which have not had any value yet) will help to publish to app stores, more frequent releases, faster feature requests implementation.

<img src="./assets/venmo.jpg" height="300">

<img src="./assets/paypal.jpg" height="300">

<img src="./assets/alipay.jpg" height="300">

<img src="./assets/wechatpay.jpg" height="300">

MetaMask Wallet Address

`0x95a867909c7307C33FDB2A96a690a87A6aa57350`
