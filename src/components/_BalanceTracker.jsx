import { useEffect, useState } from 'react';
import { AddExpenseForm } from './_AddExpenseForm';
import { BalanceStatus } from './_BalanceStatus';
import { RenderRecord } from './_RenderRecord';

// * this it the main component *******

export function BalanceTracker() {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currBalance, setCurrBalance] = useState(0);
  const [sortDirection, setSortDirection] = useState(true);

  // help form internet
  useEffect(() => {
    setCurrBalance(records.reduce((acc, item) => acc + item.expenseCost, 0));
  }, [records]);

  function handleFormEntry(expenseName, expenseCost, isIncome = false) {
    !isIncome && setShowForm(false);
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

  function handleSortRecords(sortBy) {
    if (sortBy === 'count' || sortBy === 'date') {
      const sortedRecords = records.slice().sort((a, b) => {
        return sortDirection ? b.id - a.id : a.id - b.id;
      });
      setSortDirection(sortDirection => !sortDirection);
      setRecords(sortedRecords);
    }

    if (sortBy === 'expenseCost') {
      const sortedRecords = records.slice().sort((a, b) => {
        return sortDirection
          ? b.expenseCost - a.expenseCost
          : a.expenseCost - b.expenseCost;
      });
      setSortDirection(sortDirection => !sortDirection);
      setRecords(sortedRecords);
    }

    if (sortBy === 'expenseName') {
      const sortedRecords = records.slice().sort((a, b) => {
        return sortDirection
          ? b.expenseName - a.expenseName
          : a.expenseName - b.expenseName;
      });
      setSortDirection(sortDirection => !sortDirection);
      setRecords(sortedRecords);
    }
  }

  function handleDeleteEntry(id) {
    const deletedRecords = records.filter(item => item.id !== id);
    setRecords(deletedRecords);
  }
  function handleUpdateEntry(id, newExpenseName, newExpenseCost) {
    console.log(id, newExpenseName, newExpenseCost);
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
      <RenderRecord
        records={records}
        onSort={handleSortRecords}
        onDeleteEntry={handleDeleteEntry}
        onUpdateEntry={handleUpdateEntry}
      />
    </div>
  );
}
