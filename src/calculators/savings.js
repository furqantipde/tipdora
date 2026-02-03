
import { renderResult } from '../../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const goalInput = document.getElementById('goal');
    const existingInput = document.getElementById('existing');
    const monthsInput = document.getElementById('months');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const G = parseFloat(goalInput.value);
        const E = parseFloat(existingInput.value) || 0;
        const M = parseFloat(monthsInput.value);

        if (isNaN(G) || isNaN(M) || M <= 0) return;

        const needed = G - E;
        if (needed <= 0) {
            renderResult(resultContainer, {
                mainLabel: 'Goal Reached!',
                mainValue: '$0',
                subLabel: 'You already have enough saved.',
                category: 'Success'
            });
            return;
        }

        const monthlySaving = needed / M;

        renderResult(resultContainer, {
            mainLabel: 'Monthly Savings Needed',
            mainValue: monthlySaving.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `To reach goal in ${M} months`,
            details: [
                { label: 'Target Goal', value: G.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Existing Savings', value: E.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Remaining Amount', value: needed.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }
            ]
        });
    });
});
