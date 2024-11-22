/* eslint react/prop-types: 0 */

import { useState } from 'react';

export function TableData({ item, index, onDeleteEntry, key, onUpdateEntry }) {
  const [editMode, setEditMode] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState(item.expenseName);
  const [newExpenseCost, setNewExpenseCost] = useState();

  function handleEditEntry() {
    setEditMode(false);
    console.log(!newExpenseCost, !newExpenseName);

    if (!newExpenseName || !newExpenseCost) {
      setNewExpenseName('');
      setNewExpenseCost('');
      return;
    }
    onUpdateEntry(item.id, newExpenseName, Number(newExpenseCost));
    setNewExpenseName('');
    setNewExpenseCost('');
  }

  return (
    <tr key={key} style={{ color: item.expenseCost > 0 ? 'green' : 'red' }}>
      <td>{index + 1}</td>
      <td>{item.date}</td>
      <td>
        <div className="table-input">
          {editMode ? (
            <input
              type="text"
              placeholder={item.expenseName}
              value={newExpenseName}
              onChange={e => setNewExpenseName(e.target.value)}
            ></input>
          ) : (
            item.expenseName
          )}
        </div>
      </td>
      <td>
        <div className="table-input">
          {editMode ? (
            <input
              type="text"
              placeholder={'$' + Math.abs(item.expenseCost)}
              value={newExpenseCost}
              onChange={e => setNewExpenseCost(e.target.value)}
            ></input>
          ) : (
            '$' + Math.abs(item.expenseCost)
          )}
        </div>
      </td>
      <td className="action_icons">
        <div className="table-input">
          {editMode ? (
            <img src="check.svg" alt="check icon" onClick={handleEditEntry} />
          ) : (
            <img
              src="edit.svg"
              alt="edit icon"
              onClick={() => setEditMode(true)}
            />
          )}
          <img
            src="delete.svg"
            alt=" delete icon"
            onClick={() => onDeleteEntry(item.id)}
          />
        </div>
      </td>
    </tr>
  );
}
