
document.addEventListener('DOMContentLoaded', () => {
    // Section 1: X% of Y
    const p1NumX = document.getElementById('p1-num-x');
    const p1NumY = document.getElementById('p1-num-y');
    const p1Result = document.getElementById('p1-result');
    const p1Btn = document.getElementById('p1-btn');

    // Section 2: X is what % of Y
    const p2NumX = document.getElementById('p2-num-x');
    const p2NumY = document.getElementById('p2-num-y');
    const p2Result = document.getElementById('p2-result');
    const p2Btn = document.getElementById('p2-btn');

    // Section 3: Percentage Increase/Decrease
    const p3From = document.getElementById('p3-from');
    const p3To = document.getElementById('p3-to');
    const p3Result = document.getElementById('p3-result');
    const p3Btn = document.getElementById('p3-btn');

    // 1. Calculate X% of Y
    p1Btn.addEventListener('click', () => {
        const x = parseFloat(p1NumX.value);
        const y = parseFloat(p1NumY.value);
        if (isNaN(x) || isNaN(y)) return;

        const result = (x / 100) * y;
        p1Result.textContent = result.toFixed(2);
    });

    // 2. X is what % of Y
    p2Btn.addEventListener('click', () => {
        const x = parseFloat(p2NumX.value);
        const y = parseFloat(p2NumY.value);
        if (isNaN(x) || isNaN(y) || y === 0) return;

        const result = (x / y) * 100;
        p2Result.textContent = result.toFixed(2) + '%';
    });

    // 3. Percentage Change
    p3Btn.addEventListener('click', () => {
        const from = parseFloat(p3From.value);
        const to = parseFloat(p3To.value);
        if (isNaN(from) || isNaN(to) || from === 0) return;

        const diff = to - from;
        const result = (diff / from) * 100;
        const sign = result > 0 ? '+' : '';

        p3Result.textContent = sign + result.toFixed(2) + '%';
        p3Result.className = result >= 0 ? 'text-xl font-bold text-green-600' : 'text-xl font-bold text-red-600';
    });

});
