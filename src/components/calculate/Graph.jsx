import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip
} from "recharts";

export default class Graph extends Component {
  state = {
    dataArr: []
  };

  componentWillMount() {
    this.setData();
  }

  setData = () => {
    this.setState({
      dataArr: [
        {
          name: "4 Year In-State Price",
          currentprice: this.props.data.inStatePrice * 4,
          futureprice: this.props.data.futureInStateCost
        },
        {
          name: "4 Year Out-of-State Price",
          currentprice: this.props.data.outStatePrice * 4,
          futureprice: this.props.data.futureOutStateCost
        }
      ]
    });
  };

  showChart = () => {
    return (
      <BarChart
        isAnimationActive={true}
        width={610}
        height={320}
        data={this.state.dataArr}
        margin={{ top: 0, right: 15, left: 0, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="name"
          // tickFormatter={formatXAxis}
          isAnimationActive={true}
        />
        <YAxis />
        <Tooltip />
        <Bar
          type="monotone"
          dataKey="currentprice"
          fill="#8884D8"
          barSize={30}
        />
        <Bar
          type="monotone"
          dataKey="futureprice"
          fill="#8884D8"
          barSize={30}
        />
      </BarChart>
    );
  };

  render() {
    console.log(this.props);
    console.log(this.state.dataArr);
    return <div>{this.showChart()}</div>;
  }
}
