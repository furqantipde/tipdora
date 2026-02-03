
/**
 * Updates the Result UI with standardized styling.
 * @param {HTMLElement} container - The container element to inject results into (e.g. #result-container)
 * @param {Object} data - { mainLabel, mainValue, subLabel, category, details: [{label, value}] }
 */
export function renderResult(container, data) {
    if (!container) return;

    const { mainLabel = 'Result', mainValue, subLabel, category, details = [] } = data;

    // Detail items HTML
    const detailsHTML = details.map(item => `
        <div class="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
            <span class="text-sm text-slate-600 dark:text-slate-400">${item.label}</span>
            <span class="text-sm font-bold text-slate-900 dark:text-white">${item.value}</span>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="animate-on-scroll">
            <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-2">${mainLabel}</p>
            <div class="flex flex-col items-center justify-center mb-4">
                 <span class="text-4xl md:text-5xl font-extrabold text-brand-600 dark:text-brand-400 tracking-tight">${mainValue}</span>
                 ${subLabel ? `<span class="text-base font-medium text-slate-500 dark:text-slate-400 mt-1">${subLabel}</span>` : ''}
            </div>
            
            ${category ? `
            <div class="inline-block px-4 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 font-semibold text-sm mb-6">
                ${category}
            </div>` : ''}
            
            ${details.length > 0 ? `
            <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 text-left w-full mt-2">
                ${detailsHTML}
            </div>` : ''}
            
            <div class="mt-6 flex justify-center">
                 <button onclick="navigator.clipboard.writeText('${mainValue}')" class="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 flex items-center gap-1 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    Copy Result
                 </button>
            </div>
        </div>
    `;

    container.classList.remove('hidden');
    container.classList.add('block');

    // Auto scroll to result on mobile
    if (window.innerWidth < 768) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
