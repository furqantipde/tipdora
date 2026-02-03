
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

        // EMI Formula
        const n = T * 12; // months
        const r = R / 12 / 100; // monthly rate

        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        renderResult(resultContainer, {
            mainLabel: 'Monthly Installment (EMI)',
            mainValue: emi.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `Total Interest: ${totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
            details: [
                { label: 'Loan Amount', value: P.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Total Repayment', value: totalPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Loan Tenure', value: `${T} Years (${n} Months)` }
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
