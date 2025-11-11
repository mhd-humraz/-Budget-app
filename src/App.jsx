import React, { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    setTransactions([
      ...transactions,
      { id: Date.now(), text, amount: parseFloat(amount) },
    ]);

    setText("");
    setAmount("");
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">💰 Budgeting App</h1>

      {/* Balance */}
      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold">Balance:</p>
        <p className="text-lg font-bold">
          ₹{(income + expense).toFixed(2)}
        </p>
      </div>

      {/* Income / Expense */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 p-3 rounded-lg text-center">
          <h3 className="text-green-600 font-semibold">Income</h3>
          <p className="font-bold">₹{income.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-3 rounded-lg text-center">
          <h3 className="text-red-600 font-semibold">Expense</h3>
          <p className="font-bold">₹{expense.toFixed(2)}</p>
        </div>
      </div>

      {/* Add Transaction */}
      <form onSubmit={addTransaction} className="mb-6">
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="number"
          placeholder="Enter amount (+income / -expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </form>

      {/* Transaction List */}
      <ul className="divide-y">
        {transactions.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between p-2 ${
              t.amount > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <span>{t.text}</span>
            <span>{t.amount > 0 ? "+" : ""}{t.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
