
/**
 * Renders a standardized Tool Card HTML string.
 * @param {Object} tool - { title, description, link, icon, category }
 * @returns {string} HTML string
 */
export function ToolCard({ title, description, link, icon, category }) {
    return `
      <div class="card p-6 group cursor-pointer hover:border-brand-500/30 animate-on-scroll flex flex-col h-full">
          <div class="w-12 h-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              ${icon || '<span class="text-xl">🧮</span>'}
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">${title}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-grow">${description}</p>
          <div class="mt-auto">
             <a href="${link}" class="text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline inline-flex items-center">
                Open Tool <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
             </a>
          </div>
      </div>
    `;
}
