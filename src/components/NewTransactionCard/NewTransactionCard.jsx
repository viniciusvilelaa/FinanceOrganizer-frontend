import React from "react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import "../NewTransactionCard/newtransactioncard.css";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import { useCategories } from "../../hooks/categories/useCategories";
import CategoryManagerModal from "../CategoryManagerModal/CategoryManagerModal";

export default function NewTransactionCard() {
  const { createTransaction, isCreating } = useCreateTransaction();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const [type, setType] = useState("INCOME");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      amount: parseFloat(amount),
      type,
      categoryId: Number(categoryId),
      description,
      date,
    };
    try {
      await createTransaction(payload);
      setAmount("");
      setType("INCOME");
      setDate("");
      setCategoryId("");
      setDescription("");
      setError("");
    } catch (error) {
      if (error.response?.status === 400) {
        setError("Invalid data. Please check the fields");
      } else if (error.response?.status === 401) {
        setError("Session expired. Please log in again");
      } else {
        setError("Error adding transaction. Please try again");
      }
    }
  }

  return (
    <div className="bg-white rounded-xl p-[25px] w-full card-container">
      <form onSubmit={handleSubmit} className="nt-form">
        {/*TRANSACTION TYPE*/}
        <div className="nt-section">
          <label className="nt-label">Transaction Type</label>
          <div className="nt-type-buttons">
            <button
              type="button"
              className={`nt-type-btn ${type === "INCOME" ? "active-income" : ""}`}
              onClick={() => setType("INCOME")}
            >
              ↑ Income
            </button>

            <button
              type="button"
              className={`nt-type-btn ${type === "EXPENSE" ? "active-expense" : ""}`}
              onClick={() => {
                setType("EXPENSE");
              }}
            >
              ↓ Expense
            </button>
          </div>
        </div>

        {/*TRANSACTION AMOUNT*/}
        <div className="nt-section">
          <label className="nt-label">Amount</label>
          <div className="nt-amount-wrapper">
            <span className="nt-currency">R$</span>
            <NumericFormat
              className="nt-input nt-amount-input"
              placeholder="0,00"
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              value={amount}
              onValueChange={(values) => {
                setAmount(values.value);
              }}
              required
            />
          </div>
        </div>

        {/* Date + Category */}
        <div className="nt-row">
          <div className="nt-section nt-half">
            <label className="nt-label">Date</label>
            <input
              className="nt-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="nt-section nt-half">
            <label className="nt-label">Category</label>
            <div className="nt-category-select-wrapper">
              <select
                className="nt-input nt-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                disabled={isLoadingCategories}
              >
                <option value="" disabled>
                  {isLoadingCategories ? "Loading..." : "Select..."}
                </option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <button
                type="button"
                className="nt-category-btn"
                onClick={() => setModalIsOpen(true)}
                title="Gerenciar Categorias"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="nt-section">
          <label className="nt-label">Description</label>
          <textarea
            className="nt-input nt-textarea"
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <button type="submit" disabled={isCreating} className="nt-submit">
          {isCreating ? "Creating..." : "Add Transaction"}
        </button>
        {error && <p className="nt-error">{error}</p>}
        {sucess && <p className="nt-sucess">{sucess}</p>}
      </form>

      <CategoryManagerModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
}
