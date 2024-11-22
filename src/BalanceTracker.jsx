import { useState } from 'react';
import { AddExpenseForm } from './AddExpenseForm';
import { BalanceStatus } from './BalanceStatus';
import { RenderRecord } from './RenderRecord';

export function BalanceTracker() {
  const [records, setRecords] = useState([
    { name: 'buy milk', cost: -100, date: '12-2-2023' },
    { name: 'buy mouse', cost: -125, date: '12-5-2023' },
    { name: 'Salary', cost: 900, date: '12-4-2023' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [currBalance, setCurrBalance] = useState(
    records.reduce((acc, item) => (acc += item.cost), 0)
  );
  function handleForm(e) {
    e.preventDefault();
  }
  return (
    <div className="main">
      <h1 className="heading">Expense tracker</h1>
      <BalanceStatus
        records={records}
        setShowForm={setShowForm}
        currBalance={currBalance}
      />
      <AddExpenseForm
        showForm={showForm}
        currBalance={currBalance}
        onSubmit={handleForm}
      />
      <RenderRecord records={records} />
    </div>
  );
}
