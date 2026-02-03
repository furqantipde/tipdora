
document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const unitSwitch = document.getElementById('unitSwitch'); // metric or imperial

    const resultBmi = document.getElementById('result-bmi');
    const resultCategory = document.getElementById('result-category');

    const btnCalculate = document.getElementById('btn-calculate');
    const btnReset = document.getElementById('btn-reset');

    // Placeholder logic for units (assuming metric for simplicity or standardizing)
    // To keep it simple production-wise: providing standard inputs.
    // Let's assume Metric (kg, cm) by default.

    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const heightCm = parseFloat(heightInput.value);

        if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
            return;
        }

        // BMI = kg / m^2
        const heightM = heightCm / 100;
        const bmi = weight / (heightM * heightM);

        let category = '';
        let colorClass = 'text-gray-900';

        if (bmi < 18.5) {
            category = 'Underweight';
            colorClass = 'text-blue-600';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal Weight';
            colorClass = 'text-green-600';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            colorClass = 'text-yellow-600';
        } else {
            category = 'Obese';
            colorClass = 'text-red-600';
        }

        resultBmi.textContent = bmi.toFixed(2);
        resultCategory.textContent = category;
        resultCategory.className = `text-xl font-bold ${colorClass}`;
    }

    btnCalculate.addEventListener('click', calculateBMI);

    btnReset.addEventListener('click', () => {
        weightInput.value = '';
        heightInput.value = '';
        resultBmi.textContent = '-';
        resultCategory.textContent = '-';
        resultCategory.className = 'text-xl font-bold text-gray-900';
    });
});
