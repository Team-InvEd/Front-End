import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid, Tooltip } from 'recharts';

export default class Graph extends Component {
    
    showChart = () => {
        if (this.state.toggleChart) {
          return (
            <BarChart
              isAnimationActive={true}
              width={610}
              height={320}
              //data={this.state.dataArr}
              data={this.state.dataArr}
              margin={{ top: 0, right: 15, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                // tickFormatter={formatXAxis}
                isAnimationActive={true}
              />
              <YAxis />
              <Tooltip />
              <Bar
                type="monotone"
                dataKey="close"
                stroke="#8884D8"
                fill="#8884D8"
              />
            </BarChart>
          );
        } else {
        //   return <Loading />;
        }
      };
    
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
