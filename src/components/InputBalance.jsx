import { useState } from "react";
import { Button } from "./Button";


export function InputBalance({onUpdateBalance, setShowForm}) {
  const [inputBalance, setInputBalance] = useState('');

    function handleUpdateBalance(e) {
        if (e.key === 'Enter' || e.type === 'click') {
          onUpdateBalance('Income', inputBalance, true);
          setInputBalance('');
        }
      }
  return (
    <div className="submit__button">
      <div className="balance__input">
        <input
          type="number"
          placeholder="Add Balance"
          onKeyDown={handleUpdateBalance}
          value={inputBalance}
          onChange={(e) => setInputBalance(Number(e.target.value))}
        />
        <img src="add.svg" alt="add icon" onClick={handleUpdateBalance} />
      </div>
      <Button onClick={() => setShowForm((showForm) => !showForm)}>
        Add expense
      </Button>
    </div>
  );
}
