import '../TransactionFilters/transactionFilters.css';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function GoalFilters({ filters, onFilterChange }) {
    const MONTHS = [
        { value: '', label: 'All months' },
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const [localName, setLocalName] = useState(filters.name || '');

    const [debouncedName] = useDebounce(localName, 500);

    useEffect(()=> {
        setLocalName(filters.name || '');
    }, [filters.name]);

    useEffect(()=> {
        onFilterChange('name', debouncedName);
    }, [debouncedName]);

    return (
        <div className='filters-container'>

            <input className='filter-input'
                type='text'
                placeholder='Search by name'
                value={localName || ''}
                onChange={(e) => setLocalName(e.target.value)}>
            </input>

            <select className='filters-input'
                value={filters.month || ''}
                onChange={(e) => onFilterChange('month', e.target.value)}>
                {MONTHS.map((month) => (<option key={month.value} value={month.value}>
                    {month.label}
                </option>))}
            </select>

            <select className='filter-input'
                value={filters.year || ''}
                onChange={(e) => onFilterChange('year', e.target.value)}
            >
                {years.filter(Boolean).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

        </div>
    )

}