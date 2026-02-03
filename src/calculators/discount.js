
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const originalInput = document.getElementById('original');
    const discountInput = document.getElementById('discount');
    const taxInput = document.getElementById('tax');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const original = parseFloat(originalInput.value);
        const discountPercent = parseFloat(discountInput.value);
        const taxPercent = parseFloat(taxInput.value) || 0;

        if (isNaN(original) || isNaN(discountPercent)) return;

        const saved = original * (discountPercent / 100);
        const afterDiscount = original - saved;

        const taxAmount = afterDiscount * (taxPercent / 100);
        const finalPrice = afterDiscount + taxAmount;

        renderResult(resultContainer, {
            mainLabel: 'Final Price',
            mainValue: finalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `You Save: ${saved.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
            details: [
                { label: 'Original Price', value: original.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Discount', value: `-${discountPercent}%` },
                { label: 'Tax', value: `+${taxAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` }
            ]
        });
    });
});
