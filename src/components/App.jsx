import { useEffect, useState } from 'react';
import { AddExpenseForm } from './AddExpenseForm';
import { BalanceStatus } from './BalanceStatus';
import { RenderRecord } from './RenderRecord';
import { Charts } from './Charts';
import { PiChart } from './PiChart';
import { Graph } from './Graph';
import { formattedDate, sortRecords } from '../utils/helper';
import { useLocalStorage } from '../utils/hooks';
import { Footer } from './Footer';

export default function App() {
  const [records, setRecords] = useLocalStorage([], 'records');
  const [selectedDate, setSelectedDate] = useState('');
  const [currBalance, setCurrBalance] = useState(0);
  const [showForm, setShowForm] = useState(false);
  let sortDirection = true;

  function handleFormEntry(expenseName, expenseCost, isIncome = false) {
    const date = new Date();
    const newEntry = {
      id: date.toISOString().replace(/[-:.TZ]/g, ''),
      date: formattedDate(),
      expenseName: expenseName,
      expenseCost: isIncome ? expenseCost : -expenseCost,
      uniqueId: crypto.randomUUID(),
    };
    setRecords((records) => [...records, newEntry]);
  }

  function deleteAllEntry(e) {
    e.preventDefault();
    confirm('Are you sure you want to delete all entries?') && setRecords([]);
  }

  function handleDeleteEntry(id) {
    const deletedRecords = records.filter((item) => item.id !== id);
    setRecords(deletedRecords);
  }

  function handleUpdateEntry(id, newExpenseName, newExpenseCost) {
    const recordAfterUpdate = records.map((item) =>
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
    setRecords(sortRecords(records, sortBy, sortDirection, true));
  }

  useEffect(
    () =>
      setCurrBalance(records.reduce((acc, item) => acc + item.expenseCost, 0)),
    [records]
  );
  return (
    <>
      <div className="main">
        <h1 className="heading">Expense tracker</h1>
        <div className="main__input">
          <BalanceStatus
            records={records}
            setShowForm={setShowForm}
            currBalance={currBalance}
            onUpdateBalance={handleFormEntry}
          > </BalanceStatus>
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
            selectedDate={selectedDate}
          />
        </div>
        <Charts>
          <PiChart
            records={records}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <Graph records={records} />
        </Charts>
      </div>
      <Footer />
    </>
  );
}
