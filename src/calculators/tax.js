
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const incomeInput = document.getElementById('income');
    const taxRateInput = document.getElementById('rate');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const income = parseFloat(incomeInput.value);
        const rate = parseFloat(taxRateInput.value);

        if (isNaN(income) || isNaN(rate)) return;

        const tax = (income * rate) / 100;
        const netIncome = income - tax;

        renderResult(resultContainer, {
            mainLabel: 'Estimated Tax Payable',
            mainValue: tax.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `Based on a ${rate}% Effective Rate`,
            details: [
                { label: 'Gross Income', value: income.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Net Income (Post-Tax)', value: netIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }
            ]
        });
    });
});
