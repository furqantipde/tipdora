
import { renderResult } from '../../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const age = parseFloat(ageInput.value);
        const height = parseFloat(heightInput.value); // cm
        const weight = parseFloat(weightInput.value); // kg
        const gender = genderSelect.value;

        if (isNaN(age) || isNaN(height) || isNaN(weight)) return;

        // Mifflin-St Jeor Equation
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);

        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        renderResult(resultContainer, {
            mainLabel: 'Basal Metabolic Rate',
            mainValue: `${Math.round(bmr)} kcal`,
            subLabel: 'Calories burned at rest daily',
            details: [
                { label: 'Activity Level: Sedentary', value: `${Math.round(bmr * 1.2)} kcal` },
                { label: 'Activity Level: Active', value: `${Math.round(bmr * 1.55)} kcal` }
            ]
        });
    });
});
