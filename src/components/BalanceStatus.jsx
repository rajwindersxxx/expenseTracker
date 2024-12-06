
export function BalanceStatus({
  records,
  currBalance,
  children
}) {
  const totalExpense = records
    .filter(item => item.expenseCost < 0)
    .reduce((acc, item) => (acc += item.expenseCost), 0);
  const totalIncome = records
    .filter(item => item.expenseCost > 0)
    .reduce((acc, item) => (acc += item.expenseCost), 0);

  return (
    <div className="balance">
      <div className="balance__status">
        <h3 className="balance__total">
          Currant Balance{' '}
          <span style={{ color: currBalance < 0 ? 'red' : 'green' }}>
            $ {currBalance}
          </span>
        </h3>
        <h3 className="balance__spend">
          Balance spend : $ {Math.abs(totalExpense)}
        </h3>
        <h3 className="balance__income">Total Income : $ {totalIncome}</h3>
      </div>
      {children}
    </div>
  );
}
