
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const dobInput = document.getElementById('dob');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const dobValue = dobInput.value;
        if (!dobValue) return;

        const dob = new Date(dobValue);
        const today = new Date();

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        renderResult(resultContainer, {
            mainLabel: 'Your Exact Age',
            mainValue: `${years} Years`,
            subLabel: `${months} Months, ${days} Days`,
            details: [
                { label: 'Date of Birth', value: dob.toLocaleDateString() },
                { label: 'Today\'s Date', value: today.toLocaleDateString() }
            ]
        });
    });

    document.getElementById('btn-reset')?.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        dobInput.value = '';
    });
});
