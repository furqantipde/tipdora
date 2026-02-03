
import { renderResult } from '../components/CalculatorResult.js';

document.addEventListener('DOMContentLoaded', () => {
    const investmentInput = document.getElementById('investment');
    const initialPriceInput = document.getElementById('initial');
    const finalPriceInput = document.getElementById('final');
    const feesInput = document.getElementById('fees');
    const resultContainer = document.getElementById('result-container');

    document.getElementById('btn-calculate')?.addEventListener('click', () => {
        const invest = parseFloat(investmentInput.value);
        const buyPrice = parseFloat(initialPriceInput.value);
        const sellPrice = parseFloat(finalPriceInput.value);
        const feePercent = parseFloat(feesInput.value) || 0;

        if (isNaN(invest) || isNaN(buyPrice) || isNaN(sellPrice)) return;

        // Coins purchased
        const coins = invest / buyPrice;

        // Sell Value
        let sellValue = coins * sellPrice;

        // Deduct fees (simplified: total fee on exit or entry+exit? Doing simple flat fee on profit logic for now, or just total fee)
        // Let's assume fee is on total transaction volume.
        const entryFee = invest * (feePercent / 100);
        const exitFee = sellValue * (feePercent / 100);
        const totalFees = entryFee + exitFee;

        const netProfit = sellValue - invest - totalFees;
        const profitPercent = (netProfit / invest) * 100;

        const isProfit = netProfit >= 0;

        renderResult(resultContainer, {
            mainLabel: isProfit ? 'Total Profit' : 'Total Loss',
            mainValue: netProfit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            subLabel: `${profitPercent.toFixed(2)}% Return`,
            category: isProfit ? 'Profit 🚀' : 'Loss 📉',
            details: [
                { label: 'Total Fees', value: totalFees.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Exit Value', value: sellValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
                { label: 'Amount Coins', value: coins.toFixed(6) }
            ]
        });
    });
});
