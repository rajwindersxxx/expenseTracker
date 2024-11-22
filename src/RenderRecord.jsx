export function RenderRecord({ records }) {
  return (
    <div className="records">
      <table>
        <thead>
          <tr>
            <th>Count</th>
            <th>Date</th>
            <th>Expense</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td style={{ color: item.cost > 0 ? 'green' : 'red' }}>
                  ${Math.abs(item.cost)}
                </td>
                <td className="action_icons">
                  <img src="edit.svg" alt="edit icon" />
                  <img src="delete.svg" alt=" delete icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
