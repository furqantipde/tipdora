import React, { useState } from 'react';
import { Card } from '../components/UI';
import { Youtube, Twitter, Instagram } from 'lucide-react';

const LegalLayout = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{title}</h1>
    <Card className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
      {children}
    </Card>
  </div>
);

export const About = () => (
  <LegalLayout title="About TipDora">
    <p className="mb-4">
      TipDora is your one-stop destination for free, aesthetic, and simple online tools. Our mission is to provide fast, accessible, and privacy-friendly utilities to everyone. Whether you need to generate QR codes, hashtags, usernames, or random content, TipDora delivers smart ideas instantly.
    </p>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Our Mission</h3>
    <p className="mb-4">
      To make simple tools accessible to everyone. In a web cluttered with ads and paywalls, TipDora stands for simplicity and elegance.
    </p>
    
    <div className="flex gap-6 mt-8">
      <a href="https://www.youtube.com/@Furqantipde" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#FF0000] transition-colors"><Youtube className="w-5 h-5"/> YouTube</a>
      <a href="https://x.com/tipdeofficial" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5"/> Twitter</a>
      <a href="https://www.instagram.com/tipdeofficial/" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#E1306C] transition-colors"><Instagram className="w-5 h-5"/> Instagram</a>
    </div>
  </LegalLayout>
);

export const Privacy = () => (
  <LegalLayout title="Privacy Policy">
    <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <p className="mb-4">
      At TipDora.fun, we prioritize your privacy. This document outlines the types of personal information we receive and collect when you use TipDora.fun.
    </p>
    <ul className="list-disc pl-5 space-y-2 mb-6">
      <li><strong>No Accounts Needed:</strong> You do not need to create an account to use our tools.</li>
      <li><strong>Client-Side Execution:</strong> Most tools run entirely in your browser. We do not store your inputs.</li>
      <li><strong>Analytics:</strong> We may use basic, anonymous analytics to improve user experience.</li>
    </ul>
  </LegalLayout>
);

export const Terms = () => (
  <LegalLayout title="Terms of Use">
    <p className="mb-4">
      By accessing TipDora.fun, you agree to be bound by these Terms of Use.
    </p>
    <ul className="list-disc pl-5 space-y-2">
      <li>Tools are free for personal use.</li>
      <li>Do not use our tools for illegal activities.</li>
      <li>TipDora is not responsible for user misuse of generated content.</li>
      <li>We provide tools "as is" without guarantees of accuracy.</li>
    </ul>
  </LegalLayout>
);

export const Contact = () => (
  <LegalLayout title="Contact Us">
    <p className="mb-6">
      Have a suggestion for a new tool? Found a bug? Just want to say hi?
    </p>
    <div className="bg-slate-50 dark:bg-[#080808] p-6 rounded-xl border border-slate-200 dark:border-dark-border text-center">
      <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">Email Us At</p>
      <a href="mailto:tipdestore@gmail.com" className="text-2xl font-bold text-primary hover:underline">tipdestore@gmail.com</a>
    </div>
    <div className="flex justify-center gap-6 mt-8">
      <a href="https://www.youtube.com/@Furqantipde" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><Youtube className="w-6 h-6"/></a>
      <a href="https://x.com/tipdeofficial" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><Twitter className="w-6 h-6"/></a>
      <a href="https://www.instagram.com/tipdeofficial/" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><Instagram className="w-6 h-6"/></a>
    </div>
  </LegalLayout>
);

export const Cookies = () => {
  const [accepted, setAccepted] = useState(true);
  return (
    <LegalLayout title="Cookie Policy">
      <p className="mb-4">
        TipDora.fun uses very minimal cookies. We only use cookies necessary to keep the website functional (like your dark mode preference).
      </p>
      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#080808] rounded-xl border border-slate-200 dark:border-dark-border mt-8">
        <span>Allow Essential Cookies</span>
        <button 
          onClick={() => setAccepted(!accepted)}
          className={`w-12 h-6 rounded-full transition-colors relative ${accepted ? 'bg-primary' : 'bg-slate-300'}`}
        >
          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${accepted ? 'left-7' : 'left-1'}`}></span>
        </button>
      </div>
    </LegalLayout>
  );
};