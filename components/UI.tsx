import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy, Loader2 } from 'lucide-react';

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  isLoading = false
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 border border-transparent",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 dark:bg-dark-card dark:hover:bg-[#252525] border border-transparent dark:border-dark-border",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary dark:border-dark-border dark:text-slate-300 dark:hover:border-primary dark:hover:text-primary bg-transparent"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

export const Input = ({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  className = ""
}: {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  className?: string;
}) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 ${className}`}
    />
  </div>
);

export const TextArea = ({
  value,
  onChange,
  placeholder,
  label,
  className = "",
  rows = 4
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  rows?: number;
}) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none ${className}`}
    />
  </div>
);

export const Select = ({
  value,
  onChange,
  options,
  label
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  label?: string;
}) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{label}</label>}
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 dark:text-slate-100 appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  </div>
);

export const Card = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-slate-100 dark:border-dark-border p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

export const ResultBox = ({ content, label = "Result" }: { content: string; label?: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute top-0 left-0 bg-slate-50 dark:bg-[#252525] px-3 py-1 rounded-br-lg border-r border-b border-slate-200 dark:border-dark-border text-xs font-medium text-slate-500 dark:text-slate-300">
        {label}
      </div>
      <div className="w-full min-h-[120px] p-6 pt-10 bg-slate-50 dark:bg-[#080808] rounded-xl border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 break-words whitespace-pre-wrap font-mono text-sm">
        {content || <span className="text-slate-400 dark:text-slate-600 italic">Generated output will appear here...</span>}
      </div>
      {content && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-lg bg-white dark:bg-dark-card shadow-sm border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-[#252525] transition-all text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};

interface ToolGridItemProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const ToolGridItem: React.FC<ToolGridItemProps> = ({ to, icon, title, desc }) => (
  <Link to={to} className="block group h-full relative">
    <div className="h-full bg-white dark:bg-dark-card p-6 rounded-2xl border border-slate-100 dark:border-dark-border shadow-sm hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/5 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-[#252525] text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">{title}</h3>
      
      {/* Tooltip */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[200px] px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs rounded-lg shadow-lg pointer-events-none z-20">
        {desc}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-white"></div>
      </div>
    </div>
  </Link>
);

export const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h2>
    {subtitle && <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);