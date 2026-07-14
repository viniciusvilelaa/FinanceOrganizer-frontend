import React from 'react';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import "../NewTransactionCard/newtransactioncard.css"
import { toast } from 'sonner';
import { useCreateTransaction } from '../../hooks/useCreateTransaction';

export default function NewTransactionCard() {

    const {createTransaction, isCreating} = useCreateTransaction()

    const [type, setType] = useState('INCOME');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');



    async function handleSubmit(e) {
        e.preventDefault();
        const payload = { amount: parseFloat(amount), type, category, description, date };
        try {
            await createTransaction(payload)
            setAmount('');
            setType('INCOME');
            setDate('');
            setCategory('');
            setDescription('');
            setError('');
        } catch (error) {
            if (error.response?.status === 400) {
                setError("Invalid data. Please check the fields");
            } else if (error.response?.status === 401) {
                setError('Session expired. Please log in again');
            } else {
                setError('Error adding transaction. Please try again');
            }
        }
    }


    return (

        <div className="bg-white rounded-xl p-[25px] w-full card-container">

            <form onSubmit={handleSubmit} className='nt-form'>

                {/*TRANSACTION TYPE*/}
                <div className='nt-section'>
                    <label className='nt-label'>Transaction Type</label>
                    <div className='nt-type-buttons'>
                        <button type='button' className={`nt-type-btn ${type === 'INCOME' ? 'active-income' : ''}`} onClick={() => setType('INCOME')}>
                            ↑ Income
                        </button>

                        <button type='button' className={`nt-type-btn ${type === 'EXPENSE' ? 'active-expense' : ''}`} onClick={() => { setType('EXPENSE') }}>
                            ↓ Expense
                        </button>
                    </div>
                </div>

                {/*TRANSACTION AMOUNT*/}
                <div className='nt-section'>
                    <label className='nt-label'>Amount</label>
                    <div className="nt-amount-wrapper">
                        <span className='nt-currency'>R$</span>
                        <NumericFormat className='nt-input nt-amount-input'
                            placeholder='0,00'
                            thousandSeparator="."
                            decimalSeparator=','
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            value={amount}
                            onValueChange={(values) => { setAmount(values.value) }}
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
                        <select
                            className="nt-input nt-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select...</option>
                            <option value="LAZER">Leisure</option>
                            <option value="COMIDA">Food</option>
                            <option value="TRANSPORTE">Transport</option>
                            <option value="SAUDE">Health</option>
                            <option value="MORADIA">Housing</option>
                            <option value="EDUCACAO">Education</option>
                            <option value="SALARIO">Salary</option>
                            <option value="INVESTIMENTO">Investment</option>
                            <option value="ASSINATURA">Subscription</option>
                            <option value="COMBUSTIVEL">Fuel</option>
                            <option value="OUTROS">Others</option>
                        </select>
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
                    {isCreating ? 'Creating...' : 'Add Transaction'}
                </button>
                {error && <p className='nt-error'>{error}</p>}
                {sucess && <p className='nt-sucess'>{sucess}</p>}
            </form>
        </div>
    );
}