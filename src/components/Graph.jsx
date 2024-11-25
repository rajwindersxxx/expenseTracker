import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState, useEffect } from 'react';
const data = [
  {
    name: 'Page A',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export function Graph({ records }) {
  const [graphEntries, setGraphData] = useState();
  useEffect(() => {
    const graphData = records.reduce((acc, current) => {
      const date = current.date;
      const expense = current.expenseCost;
      if (expense < 0) {
        if (!acc[date]) acc[date] = { date, totalExpense: 0 , totalIncome: 0};
        acc[date].totalExpense += Math.abs(expense);
      }
      if (expense > 0){
        if (!acc[date]) acc[date] = { date, totalExpense: 0 , totalIncome: 0};
        acc[date].totalIncome += Math.abs(expense);

      }
      return acc;
    }, {});

    setGraphData(() => Object.values(graphData));
  }, [records]);
  return (
    <div className="graph">
      <div>
        <h2 className="graph__heading">Expense History</h2>
      </div>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart data={graphEntries}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalExpense"
            stroke="red"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="totalIncome" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
