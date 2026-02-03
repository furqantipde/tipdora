
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const lmp = new Date(dateInput.value);

        if (isNaN(lmp.getTime())) return;

        // Due Date = LMP + 280 days
        const dueDate = new Date(lmp.getTime());
        dueDate.setDate(dueDate.getDate() + 280);

        // Conception Date (approx 14 days after LMP)
        const conceptionDate = new Date(lmp.getTime());
        conceptionDate.setDate(conceptionDate.getDate() + 14);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        renderResult(resultContainer, {
            mainLabel: 'Estimated Due Date',
            mainValue: dueDate.toLocaleDateString('en-US', options),
            subLabel: 'Baby arrives in approx. 40 weeks',
            details: [
                { label: 'Likely Conception Date', value: conceptionDate.toLocaleDateString('en-US') },
                { label: 'First Trimester Ends', value: new Date(lmp.getTime() + (12 * 7 * 86400000)).toLocaleDateString('en-US') }
            ]
        });
    });
});
