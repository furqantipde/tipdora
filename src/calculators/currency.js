
import { renderResult } from '../components/CalculatorResult.js';

// Mock Rates (In reality this would be an API call)
const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.1,
    AUD: 1.52,
    CAD: 1.35,
    JPY: 148.2
};

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;

        if (isNaN(amount)) return;

        // Convert to USD then to Target
        const inUSD = amount / rates[from];
        const result = inUSD * rates[to];

        renderResult(resultContainer, {
            mainLabel: 'Converted Amount',
            mainValue: `${result.toFixed(2)} ${to}`,
            subLabel: `1 ${from} = ${(rates[to] / rates[from]).toFixed(4)} ${to}`,
            details: [
                { label: 'Amount', value: `${amount} ${from}` },
                { label: 'Exchange Rate', value: (rates[to] / rates[from]).toFixed(4) }
            ]
        });
    });
});
