import React from 'react'
import * as d3 from 'd3'

class ChartLine extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    componentDidMount() {
        const {height, width, color} = this.props

        const margin = ({top: 20, right: 30, bottom: 30, left: 40})

        const data = [
            {date: new Date("2007-04-23T00:00:00.000Z"), value: 93.24},
            {date: new Date("2007-04-24T00:00:00.000Z"), value: 95.35},
            {date: new Date("2007-04-25T00:00:00.000Z"), value: 98.84},
            {date: new Date("2007-04-26T00:00:00.000Z"), value: 99.92},
            {date: new Date("2007-04-29T00:00:00.000Z"), value: 99.8},
            {date: new Date("2007-05-01T00:00:00.000Z"), value: 99.47},
            {date: new Date("2007-05-02T00:00:00.000Z"), value: 100.39},
            {date: new Date("2007-05-03T00:00:00.000Z"), value: 100.4},
            {date: new Date("2007-05-04T00:00:00.000Z"), value: 100.81},
            {date: new Date("2007-05-07T00:00:00.000Z"), value: 103.92},
            {date: new Date("2007-05-08T00:00:00.000Z"), value: 105.06},
            {date: new Date("2007-05-09T00:00:00.000Z"), value: 106.88},
            {date: new Date("2007-05-09T00:00:00.000Z"), value: 107.34},
            {date: new Date("2007-05-10T00:00:00.000Z"), value: 108.74},
            {date: new Date("2007-05-13T00:00:00.000Z"), value: 109.36},
            {date: new Date("2007-05-14T00:00:00.000Z"), value: 107.52},
            {date: new Date("2007-05-15T00:00:00.000Z"), value: 107.34},
            {date: new Date("2007-05-16T00:00:00.000Z"), value: 109.44},
            {date: new Date("2007-05-17T00:00:00.000Z"), value: 110.02},
            {date: new Date("2007-05-20T00:00:00.000Z"), value: 111.98},
            {date: new Date("2007-05-21T00:00:00.000Z"), value: 113.54},
            {date: new Date("2007-05-22T00:00:00.000Z"), value: 112.89},
            {date: new Date("2007-05-23T00:00:00.000Z"), value: 110.69},
            {date: new Date("2007-05-24T00:00:00.000Z"), value: 113.62},
            {date: new Date("2007-05-28T00:00:00.000Z"), value: 114.35},
            {date: new Date("2007-05-29T00:00:00.000Z"), value: 118.77},
            {date: new Date("2007-05-30T00:00:00.000Z"), value: 121.19},
            {date: new Date("2007-06-01T00:00:00.000Z"), value: 118.4},
            {date: new Date("2007-06-04T00:00:00.000Z"), value: 121.33},
            {date: new Date("2007-06-05T00:00:00.000Z"), value: 122.67},
            {date: new Date("2007-06-06T00:00:00.000Z"), value: 123.64},
            {date: new Date("2007-06-07T00:00:00.000Z"), value: 124.07},
            {date: new Date("2007-06-08T00:00:00.000Z"), value: 124.49},
            {date: new Date("2007-06-10T00:00:00.000Z"), value: 120.19},
            {date: new Date("2007-06-11T00:00:00.000Z"), value: 120.38},
            {date: new Date("2007-06-12T00:00:00.000Z"), value: 117.5},
            {date: new Date("2007-06-13T00:00:00.000Z"), value: 118.75},
            {date: new Date("2007-06-14T00:00:00.000Z"), value: 120.5},
            {date: new Date("2007-06-17T00:00:00.000Z"), value: 125.09},
            {date: new Date("2007-06-18T00:00:00.000Z"), value: 123.66},
            {date: new Date("2007-06-19T00:00:00.000Z"), value: 121.55},
            {date: new Date("2007-06-20T00:00:00.000Z"), value: 123.9},
            {date: new Date("2007-06-21T00:00:00.000Z"), value: 123},
            {date: new Date("2007-06-24T00:00:00.000Z"), value: 122.34},
            {date: new Date("2007-06-25T00:00:00.000Z"), value: 119.65},
            {date: new Date("2007-06-26T00:00:00.000Z"), value: 121.89},
            {date: new Date("2007-06-27T00:00:00.000Z"), value: 120.56},
            {date: new Date("2007-06-28T00:00:00.000Z"), value: 122.04},
            {date: new Date("2007-07-02T00:00:00.000Z"), value: 121.26},
            {date: new Date("2007-07-03T00:00:00.000Z"), value: 127.17},
            {date: new Date("2007-07-05T00:00:00.000Z"), value: 132.75},
            {date: new Date("2007-07-06T00:00:00.000Z"), value: 132.3},
            {date: new Date("2007-07-09T00:00:00.000Z"), value: 130.33},
            {date: new Date("2007-07-09T00:00:00.000Z"), value: 132.35},
            {date: new Date("2007-07-10T00:00:00.000Z"), value: 132.39},
            {date: new Date("2007-07-11T00:00:00.000Z"), value: 134.07},
            {date: new Date("2007-07-12T00:00:00.000Z"), value: 137.73},
            {date: new Date("2007-07-15T00:00:00.000Z"), value: 138.1},
            {date: new Date("2007-07-16T00:00:00.000Z"), value: 138.91},
            {date: new Date("2007-07-17T00:00:00.000Z"), value: 138.12},
            {date: new Date("2007-07-18T00:00:00.000Z"), value: 140},
            {date: new Date("2007-07-19T00:00:00.000Z"), value: 143.75},
            {date: new Date("2007-07-22T00:00:00.000Z"), value: 143.7},
            {date: new Date("2007-07-23T00:00:00.000Z"), value: 134.89},
            {date: new Date("2007-07-24T00:00:00.000Z"), value: 137.26},
            {date: new Date("2007-07-25T00:00:00.000Z"), value: 146},
            {date: new Date("2007-07-26T00:00:00.000Z"), value: 143.85},
            {date: new Date("2007-07-29T00:00:00.000Z"), value: 141.43},
            {date: new Date("2007-07-30T00:00:00.000Z"), value: 131.76},
            {date: new Date("2007-08-01T00:00:00.000Z"), value: 135},
            {date: new Date("2007-08-02T00:00:00.000Z"), value: 136.49},
            {date: new Date("2007-08-03T00:00:00.000Z"), value: 131.85},
            {date: new Date("2007-08-06T00:00:00.000Z"), value: 135.25},
            {date: new Date("2007-08-07T00:00:00.000Z"), value: 135.03},
            {date: new Date("2007-08-08T00:00:00.000Z"), value: 134.01},
            {date: new Date("2007-08-09T00:00:00.000Z"), value: 126.39},
            {date: new Date("2007-08-09T00:00:00.000Z"), value: 125},
            {date: new Date("2007-08-12T00:00:00.000Z"), value: 127.79},
            {date: new Date("2007-08-13T00:00:00.000Z"), value: 124.03},
            {date: new Date("2007-08-14T00:00:00.000Z"), value: 119.9},
            {date: new Date("2007-08-15T00:00:00.000Z"), value: 117.05},
            {date: new Date("2007-08-16T00:00:00.000Z"), value: 122.06},
            {date: new Date("2007-08-19T00:00:00.000Z"), value: 122.22},
            {date: new Date("2007-08-20T00:00:00.000Z"), value: 127.57},
            {date: new Date("2007-08-21T00:00:00.000Z"), value: 132.51},
            {date: new Date("2007-08-22T00:00:00.000Z"), value: 131.07},
            {date: new Date("2007-08-23T00:00:00.000Z"), value: 135.3},
            {date: new Date("2007-08-26T00:00:00.000Z"), value: 132.25},
            {date: new Date("2007-08-27T00:00:00.000Z"), value: 126.82},
            {date: new Date("2007-08-28T00:00:00.000Z"), value: 134.08},
            {date: new Date("2007-08-29T00:00:00.000Z"), value: 136.25},
            {date: new Date("2007-08-30T00:00:00.000Z"), value: 138.48},
            {date: new Date("2007-09-04T00:00:00.000Z"), value: 144.16},
            {date: new Date("2007-09-05T00:00:00.000Z"), value: 136.76},
            {date: new Date("2007-09-06T00:00:00.000Z"), value: 135.01},
            {date: new Date("2007-09-07T00:00:00.000Z"), value: 131.77},
            {date: new Date("2007-09-09T00:00:00.000Z"), value: 136.71},
            {date: new Date("2007-09-10T00:00:00.000Z"), value: 135.49},
            {date: new Date("2007-09-11T00:00:00.000Z"), value: 136.85},
            {date: new Date("2007-09-12T00:00:00.000Z"), value: 137.2},
            {date: new Date("2007-09-13T00:00:00.000Z"), value: 138.81},
            {date: new Date("2007-09-16T00:00:00.000Z"), value: 138.41},
            {date: new Date("2007-09-17T00:00:00.000Z"), value: 140.92},
            {date: new Date("2007-09-18T00:00:00.000Z"), value: 140.77},
            {date: new Date("2007-09-19T00:00:00.000Z"), value: 140.31},
            {date: new Date("2007-09-20T00:00:00.000Z"), value: 144.15},
            {date: new Date("2007-09-23T00:00:00.000Z"), value: 148.28},
            {date: new Date("2007-09-24T00:00:00.000Z"), value: 153.18},
            {date: new Date("2007-09-25T00:00:00.000Z"), value: 152.77},
            {date: new Date("2007-09-26T00:00:00.000Z"), value: 154.5},
            {date: new Date("2007-09-27T00:00:00.000Z"), value: 153.47},
            {date: new Date("2007-10-01T00:00:00.000Z"), value: 156.34},
            {date: new Date("2007-10-02T00:00:00.000Z"), value: 158.45},
            {date: new Date("2007-10-03T00:00:00.000Z"), value: 157.92},
            {date: new Date("2007-10-04T00:00:00.000Z"), value: 156.24},
            {date: new Date("2007-10-05T00:00:00.000Z"), value: 161.45},
            {date: new Date("2007-10-08T00:00:00.000Z"), value: 167.91},
            {date: new Date("2007-10-09T00:00:00.000Z"), value: 167.86},
            {date: new Date("2007-10-09T00:00:00.000Z"), value: 166.79},
            {date: new Date("2007-10-10T00:00:00.000Z"), value: 162.23},
            {date: new Date("2007-10-11T00:00:00.000Z"), value: 167.25},
            {date: new Date("2007-10-14T00:00:00.000Z"), value: 166.98},
            {date: new Date("2007-10-15T00:00:00.000Z"), value: 169.58},
            {date: new Date("2007-10-16T00:00:00.000Z"), value: 172.75},
            {date: new Date("2007-10-17T00:00:00.000Z"), value: 173.5},
            {date: new Date("2007-10-18T00:00:00.000Z"), value: 170.42},
            {date: new Date("2007-10-21T00:00:00.000Z"), value: 174.36},
            {date: new Date("2007-10-22T00:00:00.000Z"), value: 186.16},
            {date: new Date("2007-10-23T00:00:00.000Z"), value: 185.93},
            {date: new Date("2007-10-24T00:00:00.000Z"), value: 182.78},
            {date: new Date("2007-10-25T00:00:00.000Z"), value: 184.7},
            {date: new Date("2007-10-28T00:00:00.000Z"), value: 185.09},
            {date: new Date("2007-10-29T00:00:00.000Z"), value: 187},
            {date: new Date("2007-10-30T00:00:00.000Z"), value: 189.95},
            {date: new Date("2007-11-01T00:00:00.000Z"), value: 187.44},
            {date: new Date("2007-11-02T00:00:00.000Z"), value: 187.87},
            {date: new Date("2007-11-05T00:00:00.000Z"), value: 186.18},
            {date: new Date("2007-11-06T00:00:00.000Z"), value: 191.79},
            {date: new Date("2007-11-07T00:00:00.000Z"), value: 186.3},
            {date: new Date("2007-11-08T00:00:00.000Z"), value: 175.47},
            {date: new Date("2007-11-09T00:00:00.000Z"), value: 165.37},
            {date: new Date("2007-11-11T00:00:00.000Z"), value: 153.76},
            {date: new Date("2007-11-12T00:00:00.000Z"), value: 169.96},
            {date: new Date("2007-11-13T00:00:00.000Z"), value: 166.11},
            {date: new Date("2007-11-14T00:00:00.000Z"), value: 164.3},
            {date: new Date("2007-11-15T00:00:00.000Z"), value: 166.39},
            {date: new Date("2007-11-18T00:00:00.000Z"), value: 163.95},
            {date: new Date("2007-11-19T00:00:00.000Z"), value: 168.85},
            {date: new Date("2007-11-20T00:00:00.000Z"), value: 168.46},
            {date: new Date("2007-11-22T00:00:00.000Z"), value: 171.54},
            {date: new Date("2007-11-25T00:00:00.000Z"), value: 172.54},
            {date: new Date("2007-11-26T00:00:00.000Z"), value: 174.81},
            {date: new Date("2007-11-27T00:00:00.000Z"), value: 180.22},
            {date: new Date("2007-11-28T00:00:00.000Z"), value: 184.29},
            {date: new Date("2007-11-29T00:00:00.000Z"), value: 182.22},
            {date: new Date("2007-12-03T00:00:00.000Z"), value: 178.86},
            {date: new Date("2007-12-04T00:00:00.000Z"), value: 179.81},
            {date: new Date("2007-12-05T00:00:00.000Z"), value: 185.5},
            {date: new Date("2007-12-06T00:00:00.000Z"), value: 189.95},
            {date: new Date("2007-12-07T00:00:00.000Z"), value: 194.3},
            {date: new Date("2007-12-09T00:00:00.000Z"), value: 194.21},
            {date: new Date("2007-12-10T00:00:00.000Z"), value: 188.54},
            {date: new Date("2007-12-11T00:00:00.000Z"), value: 190.86},
            {date: new Date("2007-12-12T00:00:00.000Z"), value: 191.83},
            {date: new Date("2007-12-13T00:00:00.000Z"), value: 190.39},
            {date: new Date("2007-12-16T00:00:00.000Z"), value: 184.4},
            {date: new Date("2007-12-17T00:00:00.000Z"), value: 182.98},
            {date: new Date("2007-12-18T00:00:00.000Z"), value: 183.12},
            {date: new Date("2007-12-19T00:00:00.000Z"), value: 187.21},
            {date: new Date("2007-12-20T00:00:00.000Z"), value: 193.91},
            {date: new Date("2007-12-23T00:00:00.000Z"), value: 198.8},
            {date: new Date("2007-12-25T00:00:00.000Z"), value: 198.95},
            {date: new Date("2007-12-26T00:00:00.000Z"), value: 198.57},
            {date: new Date("2007-12-27T00:00:00.000Z"), value: 199.83},
            {date: new Date("2007-12-30T00:00:00.000Z"), value: 198.08}
        ]

        const line = d3.line()
        .defined(d => !isNaN(d.value))
        .x(d => x(d.date))
        .y(d => y(d.value))

        const x = d3.scaleUtc()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right])

        const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top])

        const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

        const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain"))
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y))

        const acessToRef = d3.select(this.myRef.current)
            .append('svg')
            .attr("viewBox", [0, 0, width, height])
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#CCCCCC')
            .style('padding', 10)
            .style('margin-left', 50)

            acessToRef.append("g")
                .call(xAxis)
                

            acessToRef.append("g")
                .call(yAxis)
            
            acessToRef.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "red")  
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", line)
    }

    render() {
        return <div ref={this.myRef}></div>
    }
}

export default ChartLine