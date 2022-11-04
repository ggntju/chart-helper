# Welcome to Chart Helper

## Getting Started

### Overview

*Chart Helper* is a statistical tool for creating charts with user defined data. It reads data from a specified location and then render it into a chart based on all of the options we select. It is powered by [Apache Echarts](https://echarts.apache.org/en/index.html), an open source JavaScript visualization library, therefore, this tool can be seen as a GUI wrapper for part of [Apache Echarts](https://echarts.apache.org/en/index.html).

### How to use

*Chart Helper* uses [JSON](https://www.json.org/json-en.html) as data exchanging format. It only has 3 fields for user to deal with `xAxis`, `yAxis`, `series`: 
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
### Dependencies

- Data Visualization: [Apache Echarts](https://echarts.apache.org/en/index.html)

- Front-End: [React](https://reactjs.org/), [Electron](https://www.electronjs.org/), [Semantic-UI](https://react.semantic-ui.com/)

- Language: [Typescript](https://www.typescriptlang.org/)

- Boilerplate: [Electron React Boilerplate](https://electron-react-boilerplate.js.org/)

### Status

This project is still under active development and any form of support and suggestions are welcomed




