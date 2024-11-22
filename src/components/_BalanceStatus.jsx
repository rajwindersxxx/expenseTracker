import { useState } from 'react';
import { Button } from './_Button';
/* eslint react/prop-types: 0 */

export function BalanceStatus({
  records,
  setShowForm,
  currBalance,
  onUpdateBalance,
}) {
  const [showBalanceInput, setShowBalanceInput] = useState(false);
  const [inputBalance, setInputBalance] = useState('');
  const totalExpense = records
    .filter(item => item.expenseCost < 0)
    .reduce((acc, item) => (acc += item.expenseCost), 0);
  const totalIncome = records
    .filter(item => item.expenseCost > 0)
    .reduce((acc, item) => (acc += item.expenseCost), 0);

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setShowBalanceInput(false);
      onUpdateBalance('income', inputBalance, true);
    }
  }
  return (
    <div className="balance">
      <div className="balance__status">
        <h3 className="balance__total">Currant Balance $ {currBalance}</h3>
        <h3 className="balance__spend">
          Balance spend : $ {Math.abs(totalExpense)}
        </h3>
        <h3 className="balance__income">Total Income : $ {totalIncome}</h3>
      </div>
      <div className="submit__button">
        {showBalanceInput ? (
          <input
            type="number"
            placeholder="Enter Balance"
            className="balance__input"
            onKeyDown={handleKeyDown}
            value={inputBalance}
            onChange={e => setInputBalance(Number(e.target.value))}
          />
        ) : (
          <Button onClick={() => setShowBalanceInput(true)}>
            Update balance
          </Button>
        )}
        <Button onClick={() => setShowForm(showForm => !showForm)}>
          Add expense
        </Button>
      </div>
    </div>
  );
}
