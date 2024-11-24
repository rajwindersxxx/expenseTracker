import { useEffect, useState } from 'react';
import { AddExpenseForm } from './AddExpenseForm';
import { BalanceStatus } from './BalanceStatus';
import { RenderRecord } from './RenderRecord';
import { Charts } from './Charts';
// * this it the main component *******

export function BalanceTracker() {
  const [records, setRecords] = useState(() => {
    const storedRecord = localStorage.getItem('records');
    return storedRecord ? JSON.parse(storedRecord) : [];
  });
  const [currBalance, setCurrBalance] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [sortDirection, setSortDirection] = useState(true);

  // help form internet
  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  useEffect(
    () =>
      setCurrBalance(records.reduce((acc, item) => acc + item.expenseCost, 0)),
    [records]
  );

  function handleFormEntry(expenseName, expenseCost, isIncome = false) {
    if (!expenseName || !expenseCost) return;
    const date = new Date();
    const newEntry = {
      id: date.toISOString().replace(/[-:.TZ]/g, ''),
      date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
      expenseName: expenseName,
      expenseCost: isIncome ? expenseCost : -expenseCost,
      uniqueId: crypto.randomUUID(),
    };
    setRecords(records => [...records, newEntry]);
  }

  function deleteAllEntry(e) {
    e.preventDefault();
    const result = confirm('Are you sure you want to delete all entries?');
    if (result) setRecords([]);
  }

  function handleDeleteEntry(id) {
    const deletedRecords = records.filter(item => item.id !== id);
    setRecords(deletedRecords);
  }

  function handleUpdateEntry(id, newExpenseName, newExpenseCost) {
    const recordAfterUpdate = records.map(item =>
      item.id === id
        ? {
            ...item,
            expenseName: newExpenseName,
            expenseCost:
              item.expenseCost > 0 ? newExpenseCost : -newExpenseCost,
          }
        : item
    );
    setRecords(recordAfterUpdate);
  }
  function handleSortRecords(sortBy) {
    if (sortBy === 'count' || sortBy === 'date') setRecords(sortRecords('id'));

    if (sortBy === 'expenseCost') setRecords(sortRecords('expenseCost'));

    if (sortBy === 'expenseName') setRecords(sortRecords('expenseName', true));
  }

  function sortRecords(field, typeString = false) {
    const sortedRecords = records.slice().sort((a, b) => {
      if (typeString) {
        return sortDirection
          ? b[field].localeCompare(a[field])
          : a[field].localeCompare(b[field]);
      } else {
        return sortDirection ? b[field] - a[field] : a[field] - b[field];
      }
    });
    setSortDirection(sortDirection => !sortDirection);
    return sortedRecords;
  }

  return (
    <div className="main">
      <h1 className="heading">Expense tracker</h1>
      <div className="main__input">
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
        <RenderRecord
          records={records}
          onSort={handleSortRecords}
          onDeleteEntry={handleDeleteEntry}
          onUpdateEntry={handleUpdateEntry}
          showForm={showForm}
        />
      </div>
      <Charts records={records} />
    </div>
  );
}
