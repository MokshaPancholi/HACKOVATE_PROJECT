import React, { useState } from "react";

const UserFinancialForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    netWorth: "",
    monthlyBudget: "",
    totalBalance: "",
    monthlySpending: "",
    investments: "",
    creditScore: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4 text-center text-primary">Enter Your Financial Details</h2>
      <div>
        <label className="block mb-1 font-medium text-foreground">Net Worth</label>
        <input
          type="number"
          name="netWorth"
          value={form.netWorth}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus-border-primary"
          placeholder="e.g. 100000"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Monthly Budget</label>
        <input
          type="number"
          name="monthlyBudget"
          value={form.monthlyBudget}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus-border-primary"
          placeholder="e.g. 3000"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Total Balance</label>
        <input
          type="number"
          name="totalBalance"
          value={form.totalBalance}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus-border-primary"
          placeholder="e.g. 50000"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Monthly Spending</label>
        <input
          type="number"
          name="monthlySpending"
          value={form.monthlySpending}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus-border-primary"
          placeholder="e.g. 2000"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Investments</label>
        <input
          type="number"
          name="investments"
          value={form.investments}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus-border-primary"
          placeholder="e.g. 10000"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Credit Score</label>
        <input
          type="number"
          name="creditScore"
          value={form.creditScore}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary"
          placeholder="e.g. 750"
          min="300"
          max="850"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary-foreground transition"
      >
        Submit
      </button>
    </form>
  );
};

export default UserFinancialForm;