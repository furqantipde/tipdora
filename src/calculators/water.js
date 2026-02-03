
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
    const activityInput = document.getElementById('activity'); // Minutes of exercise
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value); // kg
        const activity = parseFloat(activityInput.value) || 0; // minutes

        if (isNaN(weight)) return;

        // Base: 35ml per kg
        let intake = weight * 35;

        // Add for activity: 12oz (350ml) per 30 mins
        intake += (activity / 30) * 350;

        const liters = (intake / 1000).toFixed(1);
        const glasses = Math.round(intake / 250); // 250ml glass

        renderResult(resultContainer, {
            mainLabel: 'Daily Water Recommendation',
            mainValue: `${liters} Liters`,
            subLabel: `Approx. ${glasses} glasses (250ml each)`,
            details: [
                { label: 'Based on Weight', value: `${(weight * 35 / 1000).toFixed(1)} L` },
                { label: 'Activity Adjustment', value: `+${((activity / 30) * 0.35).toFixed(1)} L` }
            ]
        });
    });
});
