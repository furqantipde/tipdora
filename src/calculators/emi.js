
import { renderResult } from '../../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const tenureInput = document.getElementById('tenure');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const principal = parseFloat(amountInput.value);
        const rate = parseFloat(rateInput.value);
        const tenure = parseFloat(tenureInput.value);

        if (isNaN(principal) || isNaN(rate) || isNaN(tenure)) return;

        const monthlyRate = rate / 12 / 100;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);

        const totalPayment = emi * tenure;
        const totalInterest = totalPayment - principal;

        renderResult(resultContainer, {
            mainLabel: 'Monthly EMI',
            mainValue: emi.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `Total Interest: ${totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
            details: [
                { label: 'Principal Amount', value: principal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Total Payment', value: totalPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }
            ]
        });
    });

    document.getElementById('btn-reset')?.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        amountInput.value = '';
        rateInput.value = '';
        tenureInput.value = '';
    });
});
