
import { renderResult } from '../../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const typeInput = document.getElementById('type');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const type = typeInput.value; // 'hourly' or 'annual'

        if (isNaN(amount)) return;

        let annual, monthly, weekly, hourly;

        if (type === 'hourly') {
            hourly = amount;
            weekly = amount * 40; // Assuming 40hr week
            annual = weekly * 52;
            monthly = annual / 12;
        } else {
            annual = amount;
            monthly = annual / 12;
            weekly = annual / 52;
            hourly = weekly / 40;
        }

        renderResult(resultContainer, {
            mainLabel: 'Annual Salary',
            mainValue: annual.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `Based on standard 40h work week`,
            details: [
                { label: 'Annual', value: annual.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Monthly', value: monthly.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Weekly', value: weekly.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Hourly Rate', value: hourly.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
            ]
        });
    });
});
