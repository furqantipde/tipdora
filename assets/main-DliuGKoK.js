(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();function i(){const s=document.getElementById("app"),a=`
      <header class="glass-nav transition-colors duration-300">
        <nav class="container mx-auto px-4 lg:px-6 py-3">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-2 group">
              <div class="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
                T
              </div>
              <span class="self-center text-xl font-bold whitespace-nowrap text-slate-900 dark:text-white tracking-tight group-hover:text-brand-600 transition-colors">Tipdora</span>
            </a>
  
            <!-- Desktop Nav & Actions -->
            <div class="flex items-center lg:order-2 gap-3">
                <!-- Search (Desktop) -->
                <div class="relative hidden md:block">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input type="text" id="navbar-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-brand-500 focus:border-brand-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-500 dark:focus:border-brand-500" placeholder="Search tools...">
                </div>

                <!-- Dark Mode Toggle -->
                <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-slate-700 rounded-lg text-sm p-2.5 transition-colors">
                    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </button>

                <!-- Mobile Menu Button -->
                <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600" aria-controls="mobile-menu-2" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                  <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            
            <!-- Navbar Links -->
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a href="/" class="block py-2 pr-4 pl-3 text-slate-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-brand-600 lg:p-0 dark:text-slate-300 dark:hover:text-brand-500 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors">Home</a>
                </li>
                <li>
                  <a href="/calculators/index.html" class="block py-2 pr-4 pl-3 text-slate-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-brand-600 lg:p-0 dark:text-slate-300 dark:hover:text-brand-500 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors">Calculators</a>
                </li>
                 <li>
                  <a href="/blog/index.html" class="block py-2 pr-4 pl-3 text-slate-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-brand-600 lg:p-0 dark:text-slate-300 dark:hover:text-brand-500 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors">Blog</a>
                </li>
                <li>
                  <a href="/about.html" class="block py-2 pr-4 pl-3 text-slate-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-brand-600 lg:p-0 dark:text-slate-300 dark:hover:text-brand-500 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors">About</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    `,l=`
      <footer class="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-auto transition-colors duration-300">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-10">
            <div class="md:flex md:justify-between">
              <div class="mb-6 md:mb-0">
                  <a href="/" class="flex items-center gap-2 group">
                     <span class="self-center text-2xl font-bold whitespace-nowrap text-slate-900 dark:text-white tracking-tight">Tipdora</span>
                  </a>
                  <p class="mt-4 text-slate-500 dark:text-slate-400 max-w-xs text-sm">
                      Free, fast, and secure online calculators for finance, health, and daily life. Built for accuracy.
                  </p>
              </div>
              <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                      <ul class="text-gray-600 dark:text-gray-400 font-medium text-sm space-y-3">
                          <li><a href="/calculators/index.html" class="hover:underline hover:text-brand-600 dark:hover:text-brand-500">All Tools</a></li>
                          <li><a href="/blog/index.html" class="hover:underline hover:text-brand-600 dark:hover:text-brand-500">Blog Tutorials</a></li>
                      </ul>
                  </div>
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                      <ul class="text-gray-600 dark:text-gray-400 font-medium text-sm space-y-3">
                          <li><a href="/about.html" class="hover:underline hover:text-brand-600 dark:hover:text-brand-500">About Us</a></li>
                          <li><a href="/contact.html" class="hover:underline hover:text-brand-600 dark:hover:text-brand-500">Contact</a></li>
                      </ul>
                  </div>
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                      <ul class="text-gray-600 dark:text-gray-400 font-medium text-sm space-y-3">
                          <li><a href="/privacy-policy.html" class="hover:underline hover:text-brand-600 dark:hover:text-brand-500">Privacy Policy</a></li>
                          <li><a href="/terms.html" class="hover:underline hover:text-brand-600 dark:hover:text-brand-500">Terms & Conditions</a></li>
                          <li><a href="/disclaimer.html" class="hover:underline hover:text-brand-600 dark:hover:text-brand-500">Disclaimer</a></li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr class="my-6 border-slate-200 sm:mx-auto dark:border-slate-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© <span id="copyright-year">2026</span> <a href="/" class="hover:underline">Tipdora™</a>. All Rights Reserved.
              </span>
          </div>
        </div>
      </footer>
    `;s.insertAdjacentHTML("afterbegin",a),s.insertAdjacentHTML("beforeend",l),document.getElementById("copyright-year").textContent=new Date().getFullYear();const o=document.querySelector('[data-collapse-toggle="mobile-menu-2"]'),e=document.getElementById("mobile-menu-2");o&&e&&o.addEventListener("click",()=>{e.classList.toggle("hidden")})}i();document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("theme-toggle"),a=document.getElementById("theme-toggle-dark-icon"),l=document.getElementById("theme-toggle-light-icon");localStorage.getItem("color-theme")==="dark"||!("color-theme"in localStorage)&&window.matchMedia("(prefers-color-scheme: dark)").matches?(document.documentElement.classList.add("dark"),l?.classList.remove("hidden")):(document.documentElement.classList.remove("dark"),a?.classList.remove("hidden")),s?.addEventListener("click",function(){a.classList.toggle("hidden"),l.classList.toggle("hidden"),localStorage.getItem("color-theme")?localStorage.getItem("color-theme")==="light"?(document.documentElement.classList.add("dark"),localStorage.setItem("color-theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("color-theme","light")):document.documentElement.classList.contains("dark")?(document.documentElement.classList.remove("dark"),localStorage.setItem("color-theme","light")):(document.documentElement.classList.add("dark"),localStorage.setItem("color-theme","dark"))});const o=document.getElementById("navbar-search");o?.addEventListener("keypress",r=>{r.key==="Enter"&&(o.value.toLowerCase(),window.location.href="/calculators/index.html")});const e={root:null,rootMargin:"0px",threshold:.1},t=new IntersectionObserver((r,d)=>{r.forEach(n=>{n.isIntersecting&&(n.target.classList.add("opacity-100","translate-y-0"),n.target.classList.remove("opacity-0","translate-y-4"),d.unobserve(n.target))})},e);document.querySelectorAll(".animate-on-scroll").forEach(r=>{r.classList.add("transition-all","duration-700","opacity-0","translate-y-4"),t.observe(r)})});
