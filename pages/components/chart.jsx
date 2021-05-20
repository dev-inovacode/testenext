import React, { Component } from 'react';
import XYAxis from './componentsChart/axis/xy-axis';
import Line from './componentsChart/line/line';
import * as d3 from 'd3'

class ChartTest extends Component {
  constructor() {
    super();
  }
  render() {
    const { data , altura, largura} = this.props;
    
    const parentWidth = 1000;

    const margins = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    };

    const width = largura - margins.left - margins.right;
    const height = 400 - margins.top - margins.bottom;

    const ticks = 5;
    //const t = d3.transition().duration(1000);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.date))
      .rangeRound([0, width]).padding(0.1);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);
      
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <svg
          className="lineChartSvg"
          style={{backgroundColor: "#A33BBF", color: '#F8F8F8', borderRadius: '10px'}}
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </div>
    );
  }
}

export default ChartTest