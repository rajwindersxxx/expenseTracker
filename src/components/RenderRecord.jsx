/* eslint react/prop-types: 0 */
import { TableData } from './TableData';
export function RenderRecord({
  records,
  onSort,
  onDeleteEntry,
  onUpdateEntry,
}) {
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
                onDeleteEntry={onDeleteEntry}
                item={item}
                index={i}
                onUpdateEntry={onUpdateEntry}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
