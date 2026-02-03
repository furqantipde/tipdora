
document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const btnAddCourse = document.getElementById('btn-add-course');
    const resultGpa = document.getElementById('result-gpa');
    const btnCalculate = document.getElementById('btn-calculate');
    const btnReset = document.getElementById('btn-reset');

    // Grade points mapping
    const gradePoints = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    function addCourseRow() {
        const row = document.createElement('div');
        row.className = 'grid grid-cols-3 gap-2 mb-2 course-row';
        row.innerHTML = `
            <input type="text" class="course-name bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-2" placeholder="Subject">
            <input type="number" class="course-credits bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-2" placeholder="Credits" min="1">
            <select class="course-grade bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-2">
                <option value="A">A / 4.0</option>
                <option value="A-">A- / 3.7</option>
                <option value="B+">B+ / 3.3</option>
                <option value="B">B / 3.0</option>
                <option value="B-">B- / 2.7</option>
                <option value="C+">C+ / 2.3</option>
                <option value="C">C / 2.0</option>
                <option value="C-">C- / 1.7</option>
                <option value="D+">D+ / 1.3</option>
                <option value="D">D / 1.0</option>
                <option value="F">F / 0</option>
            </select>
        `;
        courseList.appendChild(row);
    }

    function calculateGPA() {
        let totalPoints = 0;
        let totalCredits = 0;

        const rows = document.querySelectorAll('.course-row');

        rows.forEach(row => {
            const credits = parseFloat(row.querySelector('.course-credits').value);
            const grade = row.querySelector('.course-grade').value;

            if (!isNaN(credits) && credits > 0) {
                const points = gradePoints[grade];
                totalPoints += (points * credits);
                totalCredits += credits;
            }
        });

        if (totalCredits === 0) {
            resultGpa.textContent = "0.00";
            return;
        }

        const gpa = totalPoints / totalCredits;
        resultGpa.textContent = gpa.toFixed(2);
    }

    // Add 4 initial rows
    for (let i = 0; i < 4; i++) addCourseRow();

    btnAddCourse.addEventListener('click', addCourseRow);
    btnCalculate.addEventListener('click', calculateGPA);
    btnReset.addEventListener('click', () => {
        courseList.innerHTML = '';
        for (let i = 0; i < 4; i++) addCourseRow();
        resultGpa.textContent = '-';
    });
});
