
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const P = parseFloat(amountInput.value);
        const R = parseFloat(rateInput.value);
        const N = parseFloat(yearsInput.value) * 12; // months

        if (isNaN(P) || isNaN(R) || isNaN(N)) return;

        const i = R / 100 / 12;
        // SIP Formula: M = P * ({[1 + i]^n - 1} / i) * (1 + i)
        const M = P * ((Math.pow(1 + i, N) - 1) / i) * (1 + i);
        const invested = P * N;
        const profit = M - invested;

        renderResult(resultContainer, {
            mainLabel: 'Total Value',
            mainValue: M.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `Total Wealth Gained`,
            details: [
                { label: 'Invested Amount', value: invested.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Estimated Returns', value: profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }
            ]
        });
    });
});
