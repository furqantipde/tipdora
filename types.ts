import React from 'react';

export enum ToolCategory {
  GENERATOR = 'Generator',
  UTILITY = 'Utility',
  FUN = 'Fun',
  INFO = 'Info'
}

export interface ToolMeta {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  category: ToolCategory;
}

export interface GenerationResult {
  text: string;
  isError?: boolean;
}

export interface TipCard {
  id: string;
  title: string;
  category: string;
  color: string;
}