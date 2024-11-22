import { useState } from 'react';
import { Button } from './_Button';
/* eslint react/prop-types: 0 */

export function BalanceStatus({
  records,
  setShowForm,
  currBalance,
  onUpdateBalance,
}) {
  const [inputBalance, setInputBalance] = useState('');
  const totalExpense = records
    .filter(item => item.expenseCost < 0)
    .reduce((acc, item) => (acc += item.expenseCost), 0);
  const totalIncome = records
    .filter(item => item.expenseCost > 0)
    .reduce((acc, item) => (acc += item.expenseCost), 0);

  function handleUpdateBalance(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      onUpdateBalance('Income', inputBalance, true);
      setInputBalance('');
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
        <div className="balance__input">
          <input
            type="number"
            placeholder="Add Balance"
            onKeyDown={handleUpdateBalance}
            value={inputBalance}
            onChange={e => setInputBalance(Number(e.target.value))}
          />
          <img src="add.svg" alt="add icon" onClick={handleUpdateBalance} />
        </div>
        <Button onClick={() => setShowForm(showForm => !showForm)}>
          Add expense
        </Button>
      </div>
    </div>
  );
}
