import React from 'react'
import * as d3 from 'd3'

class ChartLine extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    componentDidMount() {
        const {data, height, width} = this.props

        const margin = ({top: 20, right: 30, bottom: 30, left: 40})

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