
import { renderResult } from '../../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const tenureInput = document.getElementById('tenure');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const P = parseFloat(amountInput.value);
        const R = parseFloat(rateInput.value);
        const T = parseFloat(tenureInput.value); // Years

        if (isNaN(P) || isNaN(R) || isNaN(T)) return;

        // Simple Compound Interest for FD (Annual Compounding)
        // A = P(1 + R/100)^N
        const A = P * Math.pow((1 + R / 100), T);
        const I = A - P;

        renderResult(resultContainer, {
            mainLabel: 'Maturity Amount',
            mainValue: A.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `Total Interest: ${I.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
            details: [
                { label: 'Invested Amount', value: P.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Tenure', value: `${T} Years` },
                { label: 'Interest Rate', value: `${R}%` }
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
