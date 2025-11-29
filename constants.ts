import { Tool, MicroTip } from './types';

export const TOOLS: Tool[] = [
  // Generators
  { id: 'image-generator', name: 'Image Generator', description: 'Generate images using AI.', category: 'generator', icon: 'Image', path: '/tool/image-generator' },
  { id: 'qr-code', name: 'QR Code Generator', description: 'Create QR codes for URLs and text instantly.', category: 'generator', icon: 'QrCode', path: '/tool/qr-code' },
  { id: 'password-gen', name: 'Random Password', description: 'Secure, customizable password generator.', category: 'generator', icon: 'Lock', path: '/tool/password-gen' },
  { id: 'username-gen', name: 'Username Ideas', description: 'Generate catchy usernames for social media.', category: 'generator', icon: 'User', path: '/tool/username-gen' },
  { id: 'random-name', name: 'Random Name', description: 'Get random names for characters or testing.', category: 'generator', icon: 'Users', path: '/tool/random-name' },
  { id: 'random-number', name: 'Random Number', description: 'Generate a number within a specific range.', category: 'generator', icon: 'Hash', path: '/tool/random-number' },
  { id: 'random-color', name: 'Random Color', description: 'Generate random HEX and RGB colors.', category: 'generator', icon: 'Palette', path: '/tool/random-color' },
  { id: 'random-word', name: 'Random Word', description: 'Spark creativity with random words.', category: 'generator', icon: 'Type', path: '/tool/random-word' },
  { id: 'random-joke', name: 'Random Joke', description: 'Get a random funny joke to brighten your day.', category: 'generator', icon: 'Smile', path: '/tool/random-joke' },
  { id: 'dice-roller', name: 'Dice Roller', description: 'Roll 1-6 dice virtually.', category: 'fun', icon: 'Dices', path: '/tool/dice-roller' },
  { id: 'spin-wheel', name: 'Spin the Wheel', description: 'Make decisions with a random wheel.', category: 'fun', icon: 'CircleDot', path: '/tool/spin-wheel' },
  { id: 'uuid-gen', name: 'UUID Generator', description: 'Generate valid Version 4 UUIDs.', category: 'dev', icon: 'Fingerprint', path: '/tool/uuid-gen' },
  
  // Text Tools
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and sentences.', category: 'text', icon: 'AlignLeft', path: '/tool/word-counter' },
  { id: 'case-converter', name: 'Case Converter', description: 'UPPERCASE, lowercase, Title Case, etc.', category: 'text', icon: 'CaseUpper', path: '/tool/case-converter' },
  { id: 'remove-spaces', name: 'Remove Extra Spaces', description: 'Clean up text by removing double spaces.', category: 'text', icon: 'Minimize2', path: '/tool/remove-spaces' },
  { id: 'reverse-text', name: 'Reverse Text', description: 'Flip your text backwards.', category: 'text', icon: 'MoveHorizontal', path: '/tool/reverse-text' },
  { id: 'duplicate-remover', name: 'Duplicate Line Remover', description: 'Remove duplicate lines from lists.', category: 'text', icon: 'ListX', path: '/tool/duplicate-remover' },
  { id: 'sort-lines', name: 'Sort Lines', description: 'Alphabetize your lists instantly.', category: 'text', icon: 'ArrowDownAZ', path: '/tool/sort-lines' },
  { id: 'fancy-text', name: 'Fancy Text', description: 'Ⓒⓞⓝⓥⓔⓡⓣ text to 𝑓𝑎𝑛𝑐𝑦 styles.', category: 'fun', icon: 'Sparkles', path: '/tool/fancy-text' },
  { id: 'emoji-text', name: 'Emoji ↔ Text', description: 'Convert text to emoji speak.', category: 'fun', icon: 'Smile', path: '/tool/emoji-text' },
  
  // Calculators
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate exact age from date of birth.', category: 'calculator', icon: 'Calendar', path: '/tool/age-calculator' },
  { id: 'percentage-calc', name: 'Percentage Calculator', description: 'Simple percentage calculations.', category: 'calculator', icon: 'Percent', path: '/tool/percentage-calc' },
  
  // Converters & Dev
  { id: 'unit-converter', name: 'Unit Converter', description: 'Length, weight, and temperature.', category: 'converter', icon: 'Ruler', path: '/tool/unit-converter' },
  { id: 'color-picker', name: 'Color Picker', description: 'Pick colors and get Hex/RGB codes.', category: 'dev', icon: 'Pipette', path: '/tool/color-picker' },
  { id: 'base64', name: 'Base64 Encode/Decode', description: 'Convert text to Base64 and back.', category: 'dev', icon: 'Code2', path: '/tool/base64' },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Encode or decode URL strings.', category: 'dev', icon: 'Link', path: '/tool/url-encoder' },
  { id: 'binary-converter', name: 'Binary Converter', description: 'Text to Binary and Binary to Text.', category: 'dev', icon: 'Binary', path: '/tool/binary-converter' },
  { id: 'qr-scanner', name: 'QR Code Scanner', description: 'Scan QR codes directly from your camera.', category: 'dev', icon: 'ScanLine', path: '/tool/qr-scanner' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum', description: 'Generate placeholder text.', category: 'generator', icon: 'FileText', path: '/tool/lorem-ipsum' },
];

export const TIPS: MicroTip[] = [
  {
    category: "Tech",
    title: "Digital Wellness",
    icon: "Smartphone",
    content: [
      "Use 'Gray Scale' mode on your phone to reduce addiction.",
      "Follow the 20-20-20 rule: Every 20 mins, look at something 20 feet away for 20 seconds.",
      "Clear your browser cache monthly to speed up surfing.",
      "Use a password manager like Bitwarden instead of remembering passwords.",
      "Enable 2FA on all major accounts immediately.",
      "Update your OS regularly to patch security vulnerabilities.",
      "Clean your keyboard with compressed air once a week.",
      "Use 'Night Shift' or 'f.lux' to reduce blue light at night.",
      "Unsubscribe from one newsletter every day to clean your inbox.",
      "Restart your phone once a week to clear RAM."
    ]
  },
  {
    category: "AI",
    title: "Prompt Engineering",
    icon: "Bot",
    content: [
      "Be specific: Instead of 'write a poem', say 'write a haiku about rain'.",
      "Assign a persona: 'Act as a senior software engineer'.",
      "Ask for format: 'Output the result as a markdown table'.",
      "Use delimiters like quotes or triple dashes to separate context.",
      "Iterate: Use the output to refine your next prompt.",
      "Ask the AI to explain its reasoning step-by-step.",
      "Limit length: 'In under 50 words...'.",
      "Check facts: AI hallucinations are real, always verify data.",
      "Use examples: Provide a 'few-shot' example of what you want.",
      "Treat it like a conversation, not a search engine."
    ]
  },
  {
    category: "Productivity",
    title: "Focus & Flow",
    icon: "Zap",
    content: [
      "The 2-Minute Rule: If it takes < 2 mins, do it now.",
      "Eat the Frog: Do the hardest task first thing in the morning.",
      "Pomodoro Technique: 25 minutes work, 5 minutes break.",
      "Turn off all non-human notifications (apps, news, games).",
      "Keep a clean workspace; physical clutter creates mental clutter.",
      "Batch similar tasks together (e.g., answer all emails at 11 AM).",
      "Write tomorrow's to-do list before you finish today.",
      "Learn keyboard shortcuts for your most used apps.",
      "Single-tasking beats multi-tasking every time.",
      "Hydrate. Your brain needs water to focus."
    ]
  },
  {
    category: "Dev",
    title: "Web Development",
    icon: "Code",
    content: [
      "Semantic HTML improves accessibility and SEO automatically.",
      "Use 'rem' instead of 'px' for font sizes to respect user settings.",
      "Always compress images (WebP) before uploading to production.",
      "Console.log is fine, but have you tried Console.table()?",
      "Use CSS Grid for layout and Flexbox for alignment.",
      "Lighthouse scores matter: aim for all green.",
      "Prefer const/let over var to avoid scope issues.",
      "Learn Git command line; GUIs are limited.",
      "Sanitize all inputs, client-side validation is not security.",
      "Comment 'Why', not 'What'. The code shows 'What'."
    ]
  },
  {
    category: "Design",
    title: "UI/UX Principles",
    icon: "PenTool",
    content: [
      "White space is not empty space; it's an active design element.",
      "Limit your font pairings to 2 (maximum 3) typefaces.",
      "Contrast ratio matters: ensure text is readable (WCAG AA).",
      "Consistency builds trust: use the same button styles everywhere.",
      "Mobile-first design prevents layout issues later.",
      "Visual Hierarchy: Make important things big and bold.",
      "Don't make users think; navigation should be intuitive.",
      "Use color 60-30-10 rule: 60% dominant, 30% secondary, 10% accent.",
      "Feedback is key: hover states and active states confirm actions.",
      "Test on real devices, not just the browser inspector."
    ]
  },
  {
    category: "Marketing",
    title: "Growth & SEO",
    icon: "TrendingUp",
    content: [
      "Content is King, but Distribution is Queen.",
      "Focus on Long-Tail Keywords for easier ranking.",
      "Social Proof (reviews, testimonials) increases conversion rates.",
      "A/B Test your headlines; they are the 80/20 of clicks.",
      "Email marketing has the highest ROI of any channel.",
      "Provide value first, ask for the sale second.",
      "Optimize for Featured Snippets by answering questions directly.",
      "Backlinks from high-authority sites are SEO gold.",
      "Consistency is better than virality.",
      "Know your audience: create a User Persona."
    ]
  }
];