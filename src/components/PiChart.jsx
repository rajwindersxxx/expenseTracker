import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
/* eslint react/prop-types: 0 */

export function PiChart({ records }) {
  const [expenseRecords, setExpenseRecord] = useState([]);
  const expenseToday = expenseRecords?.reduce(
    (acc, item) => (acc += item.value),
    0
  );
  const date = new Date();
  const dataToday = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  useEffect(() => {
    setExpenseRecord(() =>
      records
        .filter(item => item.expenseCost < 0 && item.date === dataToday)
        .map(item => {
          return { name: item.expenseName, value: -item.expenseCost };
        })
    );
  }, [records]);

  return (
    <div className="piChart__box">
      <div className="chart_description">
        <h2 className="sub__heading">Today Summary &rarr;</h2>
        <h2 style={{ color: 'red' }}>${expenseToday}</h2>
      </div>
      <div className="pi_chart">
        {expenseRecords.length > 0 ? (
          <div className="pi_chart-diagram">
            <PieChart width={350} height={320}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={expenseRecords}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#7c2d12"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
        ) : (
          <div className='noDataError'>No Expense yet</div>
        )}
      </div>
    </div>
  );
}
