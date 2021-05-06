import React from 'react'
import * as d3 from 'd3'

class BarChart extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    componentDidMount() {
        const {data, height, width, color} = this.props
        const acessToRef = d3.select(this.myRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#CCCCCC')
            .style('padding', 10)
            .style('margin-left', 50)
            
        acessToRef.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * 70)
            .attr('y', (d, i) => height - 10 * d)
            .attr('width', 65)
            .attr('height', (d, i) => d * 10)
            .attr('fill', color)
    }

    render() {
        return <div ref={this.myRef}/>
    }
}

export default BarChart