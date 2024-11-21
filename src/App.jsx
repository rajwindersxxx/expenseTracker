import './App.css';
const expenseRecord = [
  { name: 'buy milk', cost: '234', date: '12-2-2023' },
  { name: 'buy mouse', cost: '3234', date: '12-5-2023' },
  { name: 'buy keyboard', cost: '2334', date: '12-4-2023' },
  { name: 'buy keyboard', cost: '2334', date: '12-4-2023' },
  { name: 'buy keyboard', cost: '2334', date: '12-4-2023' },
  { name: 'buy keyboard', cost: '2334', date: '12-4-2023' },
];
export default function App() {
  return (
    <>
      <BalanceTracker />
    </>
  );
}

function BalanceTracker() {
  return (
    <div className="main">
      <h1 className="heading">Expense tracker</h1>
      <BalanceStatus />
      <AddExpenseForm />
      <RenderRecord />
      <Inputs />
    </div>
  );
}

function BalanceStatus() {
  return (
    <div className="balance">
      <div className="balance__status">
        <h3 className="balance__total">Currant Balance $2435</h3>
        <h3 className="balance__spend">Balance spend : $234</h3>
        <h3 className="balance__income">Total Income : $234</h3>
      </div>
      <div>
        <input
          className="balance__update hidden"
          type="number"
          placeholder="e.g $1000"
        />
        <button className="button width">add balance</button>
      </div>
    </div>
  );
}

function AddExpenseForm() {
  return (
    <form className="expense__form">
      <label>Expense Name:</label>
      <input type="text" placeholder="e.g Buy milk" />
      <label>Expense Cost:</label>
      <input type="number" placeholder="e.g 343$" />
      <label>Balance Left:</label>
      <input type="number" placeholder="e.g 343$" disabled />
      <div className="submit__button">
        <Button>Add expense</Button>
        <Button>Clear Inputs</Button>
        <Button>Delete all</Button>
      </div>
    </form>
  );
}

function RenderRecord() {
  return (
    <div className="records">
      <table>
        <thead>
          <tr>
            <th>Count</th>
            <th>Date</th>
            <th>Expense</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenseRecord.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>${item.cost}</td>
                <td className="action_icons">
                  <img src="edit.svg" alt="" />
                  <img src="delete.svg" alt="" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
// function BalanceHistory() {
//   return <table></table>;
// }

function Inputs() {
  return (
    <div className="action__buttons">
      <Button>Delete all</Button>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
