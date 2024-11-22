import { useEffect, useState } from 'react';
import { AddExpenseForm } from './_AddExpenseForm';
import { BalanceStatus } from './_BalanceStatus';
import { RenderRecord } from './_RenderRecord';

export function BalanceTracker() {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currBalance, setCurrBalance] = useState(0);
  // help form internet
  useEffect(() => {
    setCurrBalance(records.reduce((acc, item) => acc + item.expenseCost, 0));
  }, [records]);

  function handleFormEntry(expenseName, expenseCost, isIncome = false) {
    if (!expenseName || !expenseCost) return;
    const date = new Date();
    const entryObject = {
      id: date.toISOString().replace(/[-:.TZ]/g, ''),
      date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
      expenseName: expenseName,
      expenseCost: isIncome ? expenseCost : -expenseCost,
      key: crypto.randomUUID(),
    };
    setRecords(records => [...records, entryObject]);
    setShowForm(false);
  }

  function deleteAllEntry(e) {
    e.preventDefault();
    setRecords([]);
  }
  return (
    <div className="main">
      <h1 className="heading">Expense tracker</h1>
      <BalanceStatus
        records={records}
        setShowForm={setShowForm}
        currBalance={currBalance}
        onUpdateBalance={handleFormEntry}
      />
      <AddExpenseForm
        showForm={showForm}
        currBalance={currBalance}
        onSubmit={handleFormEntry}
        onDeleteAllEntry={deleteAllEntry}
      />
      <RenderRecord records={records} />
    </div>
  );
}
