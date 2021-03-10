import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'

const COLORS = {
  'hp': '#6e202e',
  'attack': '#0a0a0a',
  'defense': '#05e814',
  'special-defense': '#144217',
  'special-attack': '#a9aaab',
  'speed': '#1381f0'
};


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  return (
    <g>
      <text x={cx} y={cy - 15} dy={8} textAnchor="middle" fill={fill}>
        {payload.stat.name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={fill}>
        {payload.base_stat}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default function StatsChart({ stats }) {

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <ResponsiveContainer width={'100%'} height={400} >
      <PieChart width={350} height={350}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          data={stats}
          cx={'50%'}
          cy={'50%'}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="base_stat"
        >
          {stats.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.stat.name]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
