
const fs = require('fs');
const path = require('path');

const calculatorsDir = path.join(__dirname, '../src/calculators');

fs.readdir(calculatorsDir, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        if (path.extname(file) === '.js') {
            const filePath = path.join(calculatorsDir, file);

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (data.includes('../../components/CalculatorResult.js')) {
                    const result = data.replace('../../components/CalculatorResult.js', '../components/CalculatorResult.js');

                    fs.writeFile(filePath, result, 'utf8', (err) => {
                        if (err) return console.log(err);
                        console.log(`Fixed import in: ${file}`);
                    });
                }
            });
        }
    });
});
