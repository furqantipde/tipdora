
document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('start-date');
    const startTimeInput = document.getElementById('start-time');
    const endDateInput = document.getElementById('end-date');
    const endTimeInput = document.getElementById('end-time');

    const resultTime = document.getElementById('result-time');

    const btnCalculate = document.getElementById('btn-calculate');
    const btnReset = document.getElementById('btn-reset');

    // Set default values to current date/time
    const now = new Date();
    startDateInput.valueAsDate = now;
    endDateInput.valueAsDate = now;
    startTimeInput.value = "09:00";
    endTimeInput.value = "17:00";

    function calculateDuration() {
        const startStr = `${startDateInput.value}T${startTimeInput.value}`;
        const endStr = `${endDateInput.value}T${endTimeInput.value}`;

        const start = new Date(startStr);
        const end = new Date(endStr);

        if (isNaN(start) || isNaN(end)) return;

        let diff = end - start;
        let suffix = "";

        if (diff < 0) {
            diff = Math.abs(diff);
            suffix = " (End date is before start date)";
        }

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        // Detailed breakdown string
        let resultText = "";
        if (days > 0) resultText += `${days} days, `;
        if (hours > 0 || days > 0) resultText += `${hours} hours, `;
        resultText += `${minutes} minutes`;

        if (resultText === "") resultText = "0 minutes";

        resultTime.textContent = resultText + suffix;
    }

    btnCalculate.addEventListener('click', calculateDuration);

    btnReset.addEventListener('click', () => {
        resultTime.textContent = '-';
    });
});
