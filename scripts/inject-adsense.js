
const fs = require('fs');
const path = require('path');

const ADSENSE_CODE = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7167735201258720"
     crossorigin="anonymous"></script>
`;

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
                getHtmlFiles(filePath, fileList);
            }
        } else {
            if (path.extname(file) === '.html') {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function injectAdSense() {
    const rootDir = process.cwd();
    const files = getHtmlFiles(rootDir);

    console.log(`Found ${files.length} HTML files.`);

    let modifiedCount = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');

        if (content.includes('ca-pub-7167735201258720')) {
            console.log(`Skipping ${path.basename(file)} - Already accepted.`);
            continue;
        }

        // Inject before </head>
        if (content.includes('</head>')) {
            content = content.replace('</head>', `${ADSENSE_CODE}\n</head>`);
            fs.writeFileSync(file, content, 'utf-8');
            console.log(`Injected AdSense code into ${path.basename(file)}`);
            modifiedCount++;
        } else {
            console.warn(`Warning: No </head> tag found in ${path.basename(file)}`);
        }
    }
    console.log(`\nSuccess! Modified ${modifiedCount} files.`);
}

injectAdSense();
