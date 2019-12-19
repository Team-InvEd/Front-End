import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  LabelList,
  CartesianGrid,
  Tooltip
} from "recharts";

export default class Graph extends Component {
  state = {
    dataArr: []
  };

  showChart = () => {
    console.log(this);
    let dataArr = [
      {
        name: "In-State Students",
        "Current Cost": this.props.data.inStatePrice * 4,
        "Current Cost Label":
          "$" + Math.formatNum(this.props.data.inStatePrice * 4),
        "Future Cost": this.props.data.futureInStateCost,
        "Future Cost Label":
          "$" + Math.formatNum(this.props.data.futureInStateCost)
      },
      {
        name: "Out-of-State Students",
        "Current Cost": this.props.data.outStatePrice * 4,
        "Current Cost Label":
          "$" + Math.formatNum(this.props.data.outStatePrice * 4),
        "Future Cost": this.props.data.futureOutStateCost,
        "Future Cost Label":
          "$" + Math.formatNum(this.props.data.futureOutStateCost)
      },
      {
        name: "Private University Students",
        "Current Cost": this.props.data.avgPrivPrice * 4,
        "Current Cost Label":
          "$" + Math.formatNum(this.props.data.avgPrivPrice * 4),
        "Future Cost": this.props.data.futurePrivCost,
        "Future Cost Label":
          "$" + Math.formatNum(this.props.data.futurePrivCost)
      }
    ];

    return (
      <BarChart
        // isAnimationActive={true}
        width={800}
        height={400}
        //    data={this.state.dataArr}
        data={dataArr}
        margin={{ top: 0, right: 15, left: 0, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="name"
          // tickFormatter={formatXAxis}
          // isAnimationActive={true}
        />
        <YAxis />
        <Tooltip />
        <Bar 
        type="monotone" 
        dataKey="Current Cost" 
        fill="#4578a8" 
        barSize={30}>
          <LabelList dataKey="Current Cost Label" position="left" />
        </Bar>
        <Bar
          type="monotone"
          dataKey="Future Cost"
          fill="#508a46"
          barSize={30}
        >
          <LabelList dataKey="Future Cost Label" position="right" />
        </Bar>
        <Legend />
      </BarChart>
    );
  };

  render() {
    console.log(this.props);
    console.log(this.state.dataArr);
    return (
      <div>
        {/* {this.setData()} */}
        {this.showChart()}
      </div>
    );
  }
}
