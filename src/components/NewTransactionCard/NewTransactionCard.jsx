import React from 'react';
import { useState } from 'react';
import "../NewTransactionCard/newtransactioncard.css"
import { api } from '../../context/apiContext';
import { toast } from 'sonner';

export default function NewTransactionCard() {

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
            await api.post("/transactions", payload);
            setAmount('');
            setType('INCOME');
            setDate('');
            setCategory('');
            setDescription('');
            toast.success("Transaction added successfully!");
        } catch (error) {
            toast.error("Error adding transaction.");
            if (error.response?.status === 400) {
                setError("Dados invalidos. Verifique os campos");
            } else if (error.response?.status === 401) {
                setError('Sessão expirada. Faça o login novamente');
            } else {
                setError('Erro ao adcionar transição. Tente novamente');
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
                        <input type="number" className='nt-input nt-amount-input'
                            min='0'
                            placeholder='0,00'
                            step="0.01"
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value) }}
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
                            <option value="LAZER">Lazer</option>
                            <option value="COMIDA">Comida</option>
                            <option value="TRANSPORTE">Transporte</option>
                            <option value="SAUDE">Saúde</option>
                            <option value="MORADIA">Moradia</option>
                            <option value="EDUCACAO">Educação</option>
                            <option value="SALARIO">Salário</option>
                            <option value="INVESTIMENTO">Investimento</option>
                            <option value="ASSINATURA">Assinatura</option>
                            <option value="COMBUSTIVEL">Combustível</option>
                            <option value="OUTROS">Outros</option>
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

                <button type="submit" className="nt-submit">
                    Add Transaction
                </button>
                {error && <p className='nt-error'>{error}</p>}
                {sucess && <p className='nt-sucess'>{sucess}</p>}
            </form>
        </div>
    );
}