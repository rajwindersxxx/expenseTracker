import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { DatePicker } from './DatePicker';
import { formattedDate } from '../utils/helper';
/* eslint react/prop-types: 0 */

export function PiChart({ records, setSelectedDate, selectedDate }) {
  const [expenseRecords, setExpenseRecord] = useState([]);
  const expenseToday = expenseRecords?.reduce(
    (acc, item) => (acc += item.value),
    0
  );

  const dateToday = formattedDate();
  useEffect(() => {
    setExpenseRecord(() =>
      records
        .filter(
          (item) =>
            item.expenseCost < 0 &&
            item.date === `${selectedDate ? selectedDate : dateToday}`
        )
        .map((item) => {
          return { name: item.expenseName, value: -item.expenseCost };
        })
    );
  }, [dateToday, records, selectedDate]);

  return (
    <div className="piChart__box">
      <div className="chart_description">
        <DatePicker
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
       
        <h2 style={{ color: 'red' }}>  ${expenseToday}</h2>
      </div>
      <div className="pi_chart">
        {expenseRecords.length > 0 ? (
          <div className="pi_chart-diagram">
            <PieChart width={400} height={400}>
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
          <div className="noDataError">Select date to show expense</div>
        )}
      </div>
    </div>
  );
}
