import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wand2, Menu, X, Sparkles, Moon, Sun, Search, Youtube, Twitter, Instagram } from 'lucide-react';
import { SearchContext } from '../App';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#252525] text-slate-600 dark:text-slate-400 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { query, setQuery } = useContext(SearchContext);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-slate-100 dark:border-dark-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white">TipDora<span className="text-primary animate-pulse">✨</span></span>
        </Link>

        {/* Search Bar (Hidden on very small screens, visible on md+) */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
           </div>
           <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools (e.g. 'QR', 'Password')..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-dark-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-slate-800 dark:text-slate-200"
           />
        </div>

        {/* Nav & Actions */}
        <div className="flex items-center gap-2 md:gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Home</Link>
            <Link to="/tips" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Micro Tips</Link>
          </nav>
          
          <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-dark-border"></div>
          <ThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-dark-bg border-b border-slate-100 dark:border-dark-border shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
           <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-4 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-dark-border focus:border-primary outline-none text-sm text-slate-800 dark:text-slate-200"
           />
           <Link to="/" className="text-base font-medium text-slate-600 dark:text-slate-300 py-2">Home</Link>
           <Link to="/tips" className="text-base font-medium text-slate-600 dark:text-slate-300 py-2">Micro Tips</Link>
           <Link to="/about" className="text-base font-medium text-slate-600 dark:text-slate-300 py-2">About</Link>
        </div>
      )}
    </header>
  );
};

export const Footer = () => (
  <footer className="bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-dark-border pt-12 pb-8 mt-auto transition-colors duration-300">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-1">
           <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
               <Wand2 className="w-3 h-3" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">TipDora</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Simple Tools. Smart Ideas. Beautifully Delivered. 
            <br/>Fast, free, and privacy-focused.
          </p>
          <div className="flex gap-4">
            <a href="https://www.youtube.com/@Furqantipde" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#FF0000] transition-colors"><Youtube className="w-5 h-5"/></a>
            <a href="https://x.com/tipdeofficial" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5"/></a>
            <a href="https://www.instagram.com/tipdeofficial/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#E1306C] transition-colors"><Instagram className="w-5 h-5"/></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link to="/privacy" className="hover:text-primary dark:hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary dark:hover:text-primary">Terms of Use</Link></li>
            <li><Link to="/cookies" className="hover:text-primary dark:hover:text-primary">Cookie Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link to="/tips" className="hover:text-primary dark:hover:text-primary">Micro Tips</Link></li>
            <li><Link to="/about" className="hover:text-primary dark:hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary dark:hover:text-primary">Contact Support</Link></li>
          </ul>
        </div>
        
         <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Contact</h4>
          <a href="mailto:tipdestore@gmail.com" className="text-sm text-primary hover:underline">tipdestore@gmail.com</a>
        </div>
      </div>
      
      <div className="border-t border-slate-200 dark:border-dark-border pt-8 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">© 2025 TipDora.fun. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-white dark:bg-dark-bg font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);