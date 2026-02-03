
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    base: '/tipdora/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                contact: 'contact.html',
                privacy: 'privacy-policy.html',
                terms: 'terms.html',
                disclaimer: 'disclaimer.html',
                calculators: 'calculators/index.html',
                blog: 'blog/index.html',

                // Financial
                emi: 'calculators/emi-calculator.html',
                personal_loan: 'calculators/personal-loan-calculator.html',
                crypto: 'calculators/crypto-profit-calculator.html',
                discount: 'calculators/discount-calculator.html',
                currency: 'calculators/currency-converter.html',
                sip: 'calculators/sip-calculator.html',
                fd: 'calculators/fd-calculator.html',
                savings: 'calculators/savings-goal-calculator.html',
                tax: 'calculators/tax-calculator.html',
                salary: 'calculators/salary-calculator.html',

                // Health
                bmi: 'calculators/bmi-calculator.html',
                bmr: 'calculators/bmr-calculator.html',
                water: 'calculators/water-intake-calculator.html',
                pregnancy: 'calculators/pregnancy-due-date-calculator.html',

                // Education/Daily
                age: 'calculators/age-calculator.html',
                electricity: 'calculators/electricity-bill-calculator.html',
                percentage: 'calculators/percentage-calculator.html',
                gpa: 'calculators/gpa-calculator.html',
                duration: 'calculators/time-duration-calculator.html',
            },
        },
    },
});
