import React, {Component} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

class SimpleLineChart extends Component {
    constructor() {
        super();
    }
  
    render () {
        const {data, width, height} = this.props
        return (
            <LineChart
                width={width}
                height={height}
                data={data}
                margin={{top: 15, right: 30, left: 20, bottom: 5}}
                style={{background: '#B17EBF',borderRadius: '10px', padding: '10px', color: '#A33BBF', textAlign: 'center'}}
            >
                <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='#F8F8F8'
                />
                <Tooltip
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    itemStyle={{color: '#A33BBF', fontWeight: 'bold'}}
                />
                <YAxis
                    dataKey='value'
                    stroke='#F8F8F8'
                />
                <XAxis
                    dataKey='date'
                    stroke='#F8F8F8'
                />
                <Line
                    type='monotone'
                    dataKey='value'
                    name='Hashtags'
                    stroke='#A33BBF'
                    strokeWidth='2'
                    activeDot={{r: 8}}
                />
                <Legend/>
            </LineChart>
        )
    }
}

    export default SimpleLineChart;