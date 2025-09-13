import React from "react";
import UserFinancialForm from "../dashboard/components/UserFinancialForm";
import { useNavigate } from "react-router-dom";

const UserFinancialFormPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    // Send data to backend API
    fetch("http://127.0.0.1:8000/api/financial-profile/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        net_worth: data.netWorth,
        monthly_budget: data.monthlyBudget,
        total_balance: data.totalBalance,
        monthly_spending: data.monthlySpending,
        investments: data.investments,
        credit_score: data.creditScore,
        user: 1 // TODO: Replace with actual user ID from auth
      })
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.ok) {
          navigate("/dashboard", { state: { financialProfile: result } });
        } else {
          let errorMsg = "Failed to save financial data.";
          if (result && result.error) errorMsg += `\n${result.error}`;
          if (result && result.user_detail) errorMsg += `\n${result.user_detail}`;
          if (result && typeof result === "object") errorMsg += `\n${JSON.stringify(result)}`;
          alert(errorMsg);
        }
      })
      .catch((err) => {
        alert("Failed to save financial data.\n" + err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <UserFinancialForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default UserFinancialFormPage;

/* 
  You can access this page at: http://localhost:YOUR_PORT/user-financial-form-page
*/