import { useState } from 'react';
import { Button } from './_Button';
/* eslint react/prop-types: 0 */

export function AddExpenseForm({ showForm, currBalance, onSubmit , onDeleteAllEntry}) {
  const [expenseName, setExpenseName] = useState('');
  const [expenseCost, setExpenseCost] = useState('');
  const balanceLeft = currBalance - expenseCost;

  function handleForm(e) {
    e.preventDefault();
    onSubmit(expenseName, expenseCost);
    setExpenseCost(0);
    setExpenseName('');
  }

  function clearFields(e) {
    e.preventDefault();
    setExpenseCost(0);
    setExpenseName('');
  }
  return (
    <form className={`expense__form ${showForm || 'hidden'}`}>
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
        onChange={e =>
          setExpenseCost(
            Number(e.target.value) <= currBalance
              ? Number(e.target.value)
              : expenseCost
          )
        }
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
        <Button onClick={handleForm}>Submit</Button>
        <Button onClick={clearFields}>Clear Inputs</Button>
        <Button onClick={onDeleteAllEntry}>Delete all</Button>
      </div>
    </form>
  );
}
