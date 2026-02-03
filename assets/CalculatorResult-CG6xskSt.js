function o(t,d){if(!t)return;const{mainLabel:n="Result",mainValue:e,subLabel:a,category:s,details:l=[]}=d,i=l.map(r=>`
        <div class="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
            <span class="text-sm text-slate-600 dark:text-slate-400">${r.label}</span>
            <span class="text-sm font-bold text-slate-900 dark:text-white">${r.value}</span>
        </div>
    `).join("");t.innerHTML=`
        <div class="animate-on-scroll">
            <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-2">${n}</p>
            <div class="flex flex-col items-center justify-center mb-4">
                 <span class="text-4xl md:text-5xl font-extrabold text-brand-600 dark:text-brand-400 tracking-tight">${e}</span>
                 ${a?`<span class="text-base font-medium text-slate-500 dark:text-slate-400 mt-1">${a}</span>`:""}
            </div>
            
            ${s?`
            <div class="inline-block px-4 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 font-semibold text-sm mb-6">
                ${s}
            </div>`:""}
            
            ${l.length>0?`
            <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 text-left w-full mt-2">
                ${i}
            </div>`:""}
            
            <div class="mt-6 flex justify-center">
                 <button onclick="navigator.clipboard.writeText('${e}')" class="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 flex items-center gap-1 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    Copy Result
                 </button>
            </div>
        </div>
    `,t.classList.remove("hidden"),t.classList.add("block"),window.innerWidth<768&&t.scrollIntoView({behavior:"smooth",block:"start"})}export{o as r};
