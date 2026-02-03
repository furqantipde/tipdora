
document.addEventListener('DOMContentLoaded', () => {

    // Tool 1: X% of Y
    document.getElementById('p1-btn')?.addEventListener('click', () => {
        const x = parseFloat(document.getElementById('p1-x').value);
        const y = parseFloat(document.getElementById('p1-y').value);
        const resultBox = document.getElementById('p1-result');

        if (isNaN(x) || isNaN(y)) return;

        const ans = (x / 100) * y;
        resultBox.textContent = `Result: ${ans}`;
        resultBox.classList.remove('hidden');
    });

    // Tool 2: X is what % of Y
    document.getElementById('p2-btn')?.addEventListener('click', () => {
        const x = parseFloat(document.getElementById('p2-x').value);
        const y = parseFloat(document.getElementById('p2-y').value);
        const resultBox = document.getElementById('p2-result');

        if (isNaN(x) || isNaN(y) || y === 0) return;

        const ans = (x / y) * 100;
        resultBox.textContent = `Result: ${ans.toFixed(2)}%`;
        resultBox.classList.remove('hidden');
    });

    // Tool 3: Decrease/Increase
    document.getElementById('p3-btn')?.addEventListener('click', () => {
        const start = parseFloat(document.getElementById('p3-x').value);
        const end = parseFloat(document.getElementById('p3-y').value);
        const resultBox = document.getElementById('p3-result');

        if (isNaN(start) || isNaN(end) || start === 0) return;

        const diff = end - start;
        const percent = (diff / start) * 100;

        if (percent > 0) {
            resultBox.innerHTML = `Increase of <span class="text-green-500">+${percent.toFixed(2)}%</span>`;
        } else {
            resultBox.innerHTML = `Decrease of <span class="text-red-500">${percent.toFixed(2)}%</span>`;
        }
        resultBox.classList.remove('hidden');
    });

});
