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
        const {data} = this.props
        return (
        <LineChart
            width={1000}
            height={300}
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
            <Line
            type='monotone'
            dataKey='value'
            stroke='#A33BBF'
            strokeWidth='2'
            activeDot={{r: 8}}
            />
            <CartesianGrid strokeDasharray='3 3'/>
            <Tooltip/>
            <YAxis dataKey='value'/>
            <XAxis dataKey='date'/>
            <Legend />
        </LineChart>
        );
    }
    }

    export default SimpleLineChart;