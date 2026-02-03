
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const resultContainer = document.getElementById('result-container');
    const addBtn = document.getElementById('btn-add-course');
    const calcBtn = document.getElementById('btn-calculate');
    const resetBtn = document.getElementById('btn-reset');

    function addRow() {
        const row = document.createElement('div');
        row.className = 'grid grid-cols-12 gap-4 items-center animate-fade-in';
        row.innerHTML = `
            <div class="col-span-5">
                <input type="text" class="input-field py-2" placeholder="e.g. Math">
            </div>
            <div class="col-span-3">
                <input type="number" class="input-field py-2 text-center course-credits" placeholder="3" value="3">
            </div>
            <div class="col-span-3">
                <select class="input-field py-2 course-grade">
                    <option value="4.0">A (4.0)</option>
                    <option value="3.7">A- (3.7)</option>
                    <option value="3.3">B+ (3.3)</option>
                    <option value="3.0">B (3.0)</option>
                    <option value="2.7">B- (2.7)</option>
                    <option value="2.3">C+ (2.3)</option>
                    <option value="2.0">C (2.0)</option>
                    <option value="1.7">C- (1.7)</option>
                    <option value="1.0">D (1.0)</option>
                    <option value="0.0">F (0.0)</option>
                </select>
            </div>
            <div class="col-span-1 text-center">
                <button class="text-slate-400 hover:text-red-500 transition btn-remove">
                    ✖
                </button>
            </div>
        `;

        row.querySelector('.btn-remove').addEventListener('click', () => {
            if (courseList.children.length > 1) row.remove();
        });

        courseList.appendChild(row);
    }

    // Init with 3 rows
    addRow();
    addRow();
    addRow();

    addBtn?.addEventListener('click', addRow);

    calcBtn?.addEventListener('click', () => {
        let totalPoints = 0;
        let totalCredits = 0;

        const credits = document.querySelectorAll('.course-credits');
        const grades = document.querySelectorAll('.course-grade');

        credits.forEach((creditInput, index) => {
            const cr = parseFloat(creditInput.value);
            const gr = parseFloat(grades[index].value);

            if (!isNaN(cr) && !isNaN(gr)) {
                totalPoints += (cr * gr);
                totalCredits += cr;
            }
        });

        if (totalCredits === 0) return;

        const gpa = totalPoints / totalCredits;

        renderResult(resultContainer, {
            mainLabel: 'Your GPA',
            mainValue: gpa.toFixed(2),
            subLabel: 'Semester Grade Point Average',
            details: [
                { label: 'Total Credits', value: totalCredits },
                { label: 'Total Grade Points', value: totalPoints.toFixed(1) }
            ]
        });
    });

    resetBtn?.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        courseList.innerHTML = '';
        addRow();
        addRow();
        addRow();
    });
});
