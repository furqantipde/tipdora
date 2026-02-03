
import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                privacy: resolve(__dirname, 'privacy-policy.html'),
                terms: resolve(__dirname, 'terms.html'),
                disclaimer: resolve(__dirname, 'disclaimer.html'),
                calculators: resolve(__dirname, 'calculators/index.html'),
                blog: resolve(__dirname, 'blog/index.html'),

                // Financial
                emi: resolve(__dirname, 'calculators/emi-calculator.html'),
                personal_loan: resolve(__dirname, 'calculators/personal-loan-calculator.html'),
                crypto: resolve(__dirname, 'calculators/crypto-profit-calculator.html'),
                discount: resolve(__dirname, 'calculators/discount-calculator.html'),
                currency: resolve(__dirname, 'calculators/currency-converter.html'),
                sip: resolve(__dirname, 'calculators/sip-calculator.html'),
                fd: resolve(__dirname, 'calculators/fd-calculator.html'),
                savings: resolve(__dirname, 'calculators/savings-goal-calculator.html'),
                tax: resolve(__dirname, 'calculators/tax-calculator.html'),
                salary: resolve(__dirname, 'calculators/salary-calculator.html'),

                // Health
                bmi: resolve(__dirname, 'calculators/bmi-calculator.html'),
                bmr: resolve(__dirname, 'calculators/bmr-calculator.html'),
                water: resolve(__dirname, 'calculators/water-intake-calculator.html'),
                pregnancy: resolve(__dirname, 'calculators/pregnancy-due-date-calculator.html'),

                // Education/Daily
                age: resolve(__dirname, 'calculators/age-calculator.html'),
                electricity: resolve(__dirname, 'calculators/electricity-bill-calculator.html'),
                percentage: resolve(__dirname, 'calculators/percentage-calculator.html'),
                gpa: resolve(__dirname, 'calculators/gpa-calculator.html'),
                duration: resolve(__dirname, 'calculators/time-duration-calculator.html'),
            },
        },
    },
});
