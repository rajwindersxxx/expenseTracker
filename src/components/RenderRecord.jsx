import { useEffect, useState } from 'react';
import { TableData } from './TableData';
export function RenderRecord({
  records,
  onSort,
  onDeleteEntry,
  onUpdateEntry,
  showForm,
}) {
  const [editStatus, setCurrEditStatus] = useState(null);
  useEffect(() => {
    if (showForm) {
      setCurrEditStatus(() => null);
    }
  }, [showForm]);

  return (
    <div className="records">
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort('count')}>Count</th>
            <th onClick={() => onSort('date')}>Date</th>
            <th onClick={() => onSort('expenseName')}>Expense</th>
            <th onClick={() => onSort('expenseCost')}>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, i) => {
            return (
              <TableData
                key={item.uniqueId}
                item={item}
                index={i}
                currEdit={editStatus}
                onDeleteEntry={onDeleteEntry}
                onUpdateEntry={onUpdateEntry}
                onEdit={setCurrEditStatus}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
