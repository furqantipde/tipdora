
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const powerInput = document.getElementById('power');
    const hoursInput = document.getElementById('hours');
    const rateInput = document.getElementById('rate');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const watts = parseFloat(powerInput.value);
        const hours = parseFloat(hoursInput.value);
        const rate = parseFloat(rateInput.value);

        if (isNaN(watts) || isNaN(hours) || isNaN(rate)) return;

        // kWh per day
        const dailyKwh = (watts * hours) / 1000;
        const monthlyKwh = dailyKwh * 30;

        const dailyCost = dailyKwh * rate;
        const monthlyCost = monthlyKwh * rate;
        const yearlyCost = monthlyCost * 12;

        renderResult(resultContainer, {
            mainLabel: 'Monthly Bill',
            mainValue: monthlyCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `Appliance uses ${monthlyKwh.toFixed(2)} kWh / month`,
            details: [
                { label: 'Daily Cost', value: dailyCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Yearly Cost', value: yearlyCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Daily Energy', value: `${dailyKwh.toFixed(3)} kWh` }
            ]
        });
    });
});
