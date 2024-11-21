import './App.css';
const expenseRecord = [
  { name: 'buy milk', cost: '234', data: '12-2-2023' },
  { name: 'buy mouse', cost: '3234', data: '12-5-2023' },
  { name: 'buy keyboard', cost: '2334', data: '12-4-2023' },
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
        <h2 className="balance__total">Total Balance $2435</h2>
        <h2 className="balance__spend">Balance spend : $234</h2>
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
        <Button className="submit__button">Add expense</Button>
        <Button>Clear Inputs</Button>
      </div>
    </form>
  );
}

function RenderRecord() {
  return (
    <div className="records">
      <table>
        <tr>
          <th>Count</th>
          <th>Date</th>
          <th>Expense</th>
          <th>Cost</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>1</td>
          <td>19-10-2024</td>
          <td>Buy Milk</td>
          <td>$22</td>
          <td className='action_icons'>
            <img src="delete.svg" alt="" />
            <img src="edit.svg" alt="" />
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>19-10-2024</td>
          <td>Buy Milk</td>
          <td>$22</td>
          <td className='action_icons'>
            <img src="delete.svg" alt="" className="icon" />
            <img src="edit.svg" alt="" className="icon" />
          </td>
        </tr>
      </table>
    </div>
  );
}
// function BalanceHistory() {
//   return <table></table>;
// }

function Inputs() {
  return (
    <div className="buttons">
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
