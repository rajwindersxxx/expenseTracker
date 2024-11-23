/* eslint react/prop-types: 0 */

import { useState } from 'react';

export function TableData({
  item,
  index,
  onDeleteEntry,
  key,
  onUpdateEntry,
  onEdit,
  currEdit,
}) {
  // const [editMode, setEditMode] = useState(index === currEdit);
  const editMode = index === currEdit;
  const [newExpenseName, setNewExpenseName] = useState(item.expenseName);
  const [newExpenseCost, setNewExpenseCost] = useState(
    Math.abs(item.expenseCost)
  );
  function handleEditEntry(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      handleToggleEdit();
      if (!newExpenseName || !newExpenseCost) return;
      onUpdateEntry(item.id, newExpenseName, Number(newExpenseCost));
      setNewExpenseName('');
      setNewExpenseCost('');
    }
  }
  function handleToggleEdit() {
    onEdit(editMode ? null : index);
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
              onKeyDown={handleEditEntry}
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
              onKeyDown={handleEditEntry}
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
            <img src="edit.svg" alt="edit icon" onClick={handleToggleEdit} />
          )}
          {editMode ? (
            <img
              src="close.svg"
              alt=" delete icon"
              onClick={handleToggleEdit}
            />
          ) : (
            <img
              src="delete.svg"
              alt=" delete icon"
              onClick={() => onDeleteEntry(item.id)}
            />
          )}
        </div>
      </td>
    </tr>
  );
}
