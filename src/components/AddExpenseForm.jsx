import { useState } from 'react';
import { Button } from './Button';
/* eslint react/prop-types: 0 */

export function AddExpenseForm({ showForm, currBalance, onSubmit }) {
  const [expenseName, setExpenseName] = useState();
  const [expenseCost, setExpenseCost] = useState(0);
  const balanceLeft = currBalance - expenseCost;

  return (
    <form
      className={`expense__form ${showForm || 'hidden'}`}
      onSubmit={onSubmit}
    >
      <label>Expense Name:</label>
      <input
        value={expenseName}
        onChange={e => setExpenseName(e.target.value)}
        type="text"
        placeholder="e.g Buy milk"
      />
      <label>Expense Cost:</label>
      <input
        value={expenseCost}
        onChange={e => setExpenseCost(e.target.value)}
        type="number"
        placeholder="e.g 343$"
      />
      <label>Balance Left:</label>
      <input
        value={balanceLeft}
        type="number"
        placeholder="e.g 343$"
        disabled
      />
      <div className="submit__button">
        <Button>Submit</Button>
        <Button>Clear Inputs</Button>
        <Button>Delete all</Button>
      </div>
    </form>
  );
}
