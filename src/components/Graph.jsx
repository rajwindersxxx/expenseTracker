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

export function Graph({ records }) {
  const [graphEntries, setGraphData] = useState();
  let newRecords = records.sort((a, b) => a.id - b.id);
  useEffect(() => {
    const graphData = newRecords.reduce((acc, current) => {
      const date = current.date;
      const expense = current.expenseCost;
      if (expense < 0) {
        if (!acc[date]) acc[date] = { date, totalExpense: 0, totalIncome: 0 };
        acc[date].totalExpense += Math.abs(expense);
      }
      if (expense > 0) {
        if (!acc[date]) acc[date] = { date, totalExpense: 0, totalIncome: 0 };
        acc[date].totalIncome += Math.abs(expense);
      }
      return acc;
    }, {});

    setGraphData(() => Object.values(graphData));
  }, [newRecords]);
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
