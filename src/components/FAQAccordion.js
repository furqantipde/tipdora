
/**
 * Initializes FAQ Accordion functionality.
 * Expects HTML structure:
 * .faq-item > .faq-trigger
 * .faq-item > .faq-content
 */
export function initFAQ() {
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            const icon = trigger.querySelector('.faq-icon');

            // Toggle current
            const isOpen = !content.classList.contains('hidden');

            // Close all others (optional, but cleaner)
            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

            if (!isOpen) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

/**
 * Returns HTML string for an FAQ List
 * @param {Array} items - [{ question, answer }]
 */
export function renderFAQ(items) {
    return items.map((item, index) => `
        <div class="faq-item border-b border-slate-200 dark:border-slate-700 last:border-0">
            <button class="faq-trigger w-full flex justify-between items-center py-4 text-left focus:outline-none group">
                <span class="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">${item.question}</span>
                <span class="faq-icon transition-transform duration-300 transform text-slate-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div class="faq-content hidden pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                ${item.answer}
            </div>
        </div>
    `).join('');
}
