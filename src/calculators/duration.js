
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const start = new Date(startInput.value);
        const end = new Date(endInput.value);

        if (isNaN(start) || isNaN(end)) return;

        const diffMs = Math.abs(end - start);

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        renderResult(resultContainer, {
            mainLabel: 'Total Duration',
            mainValue: `${days} Days`,
            subLabel: `${hours} hours and ${minutes} minutes`,
            details: [
                { label: 'From', value: start.toLocaleString() },
                { label: 'To', value: end.toLocaleString() },
                { label: 'Total Hours', value: (diffMs / (1000 * 60 * 60)).toFixed(1) + ' hrs' }
            ]
        });
    });

    document.getElementById('btn-reset')?.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        startInput.value = '';
        endInput.value = '';
    });
});
