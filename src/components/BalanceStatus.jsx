import { Button } from './Button';
/* eslint react/prop-types: 0 */

export function BalanceStatus({ records, setShowForm, currBalance }) {
  const totalExpense = records
    .filter(item => item.cost < 0)
    .reduce((acc, item) => (acc += item.cost), 0);
  const totalIncome = records
    .filter(item => item.cost > 0)
    .reduce((acc, item) => (acc += item.cost), 0);
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
        <Button>Update balance</Button>
        <Button onClick={() => setShowForm(showForm => !showForm)}>
          Add expense
        </Button>
      </div>
    </div>
  );
}
