import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'text' | 'generator' | 'calculator' | 'converter' | 'fun' | 'dev';
  icon: string; // We will map string names to components
  path: string;
}

export interface MicroTip {
  category: string;
  icon: string;
  title: string;
  content: string[]; // List of tips
}

export type Theme = 'light' | 'dark';

export interface GeneratedResult {
  text?: string;
  value?: number | string;
  error?: string;
}