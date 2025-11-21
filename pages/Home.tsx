import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, Hash, AtSign, User, Lock, Smile, 
  Palette, Binary, Type, WholeWord, Zap, 
  ShieldCheck, Globe, UserCheck, Scissors, 
  RefreshCw, AlignLeft, ArrowRightLeft, MessageSquare, 
  Copy, ListOrdered, Calculator, Percent, Scale, 
  Pipette, PaintBucket, ShieldAlert, Link2, 
  Image as ImageIcon, HelpCircle, Dices, Activity,
  FileText, Calendar, Quote, ScanLine, Code2, 
  Radio, Braces, Terminal, FileCode
} from 'lucide-react';
import { ToolGridItem, SectionTitle } from '../components/UI';
import { SearchContext } from '../App';

const tools = [
  // Existing
  { id: 'qr', title: 'QR Generator', desc: 'Create custom QR codes.', icon: <QrCode className="w-6 h-6" />, path: '/tools/qr' },
  { id: 'hashtag', title: 'Hashtag Gen', desc: 'Trending AI hashtags.', icon: <Hash className="w-6 h-6" />, path: '/tools/hashtags' },
  { id: 'username', title: 'Username Gen', desc: 'Unique handles & ideas.', icon: <AtSign className="w-6 h-6" />, path: '/tools/usernames' },
  { id: 'random-name', title: 'Random Name', desc: 'Creative names for all.', icon: <User className="w-6 h-6" />, path: '/tools/random-name' },
  { id: 'password', title: 'Password Gen', desc: 'Strong, secure passwords.', icon: <Lock className="w-6 h-6" />, path: '/tools/password' },
  { id: 'emoji', title: 'Emoji Picker', desc: 'Random fun emojis.', icon: <Smile className="w-6 h-6" />, path: '/tools/emoji' },
  { id: 'color', title: 'Color Gen', desc: 'Random palettes & HEX.', icon: <Palette className="w-6 h-6" />, path: '/tools/color' },
  { id: 'number', title: 'Random Number', desc: 'Pick numbers in range.', icon: <Binary className="w-6 h-6" />, path: '/tools/number' },
  { id: 'random-word', title: 'Random Word', desc: 'Words for brainstorming.', icon: <MessageSquare className="w-6 h-6" />, path: '/tools/random-word' },
  { id: 'fancy', title: 'Fancy Text', desc: 'Stylish fonts for bios.', icon: <Type className="w-6 h-6" />, path: '/tools/fancy-text' },
  { id: 'word-counter', title: 'Word Counter', desc: 'Count words & chars.', icon: <WholeWord className="w-6 h-6" />, path: '/tools/word-counter' },
  { id: 'remove-spaces', title: 'Trim Spaces', desc: 'Clean messy text.', icon: <Scissors className="w-6 h-6" />, path: '/tools/remove-spaces' },
  { id: 'case-converter', title: 'Case Converter', desc: 'UPPER, lower, Title.', icon: <RefreshCw className="w-6 h-6" />, path: '/tools/case-converter' },
  { id: 'reverse-text', title: 'Reverse Text', desc: 'Flip text backwards.', icon: <ArrowRightLeft className="w-6 h-6" />, path: '/tools/reverse-text' },
  { id: 'emoji-to-text', title: 'Emoji to Text', desc: 'Describe emojis (AI).', icon: <Smile className="w-6 h-6" />, path: '/tools/emoji-to-text' },
  { id: 'text-to-emoji', title: 'Text to Emoji', desc: 'Convert text to icons.', icon: <Smile className="w-6 h-6" />, path: '/tools/text-to-emoji' },
  { id: 'duplicate-remover', title: 'Dedup Lines', desc: 'Remove duplicates.', icon: <Copy className="w-6 h-6" />, path: '/tools/duplicate-remover' },
  { id: 'sort-lines', title: 'Sort Lines', desc: 'Alphabetize lists.', icon: <ListOrdered className="w-6 h-6" />, path: '/tools/sort-lines' },
  { id: 'age-calculator', title: 'Age Calc', desc: 'Calculate exact age.', icon: <Calculator className="w-6 h-6" />, path: '/tools/age-calculator' },
  { id: 'percentage', title: 'Percent Calc', desc: 'Simple % math.', icon: <Percent className="w-6 h-6" />, path: '/tools/percentage-calculator' },
  { id: 'unit-converter', title: 'Unit Converter', desc: 'Length, weight, etc.', icon: <Scale className="w-6 h-6" />, path: '/tools/unit-converter' },
  { id: 'color-picker', title: 'Color Picker', desc: 'Select & copy colors.', icon: <Pipette className="w-6 h-6" />, path: '/tools/color-picker' },
  { id: 'gradient', title: 'Gradient Gen', desc: 'CSS gradients.', icon: <PaintBucket className="w-6 h-6" />, path: '/tools/gradient' },
  { id: 'password-strength', title: 'Pass Strength', desc: 'Check security.', icon: <ShieldAlert className="w-6 h-6" />, path: '/tools/password-strength' },
  { id: 'url-shortener', title: 'URL Shortener', desc: 'Shorten links (Demo).', icon: <Link2 className="w-6 h-6" />, path: '/tools/url-shortener' },
  { id: 'meme-maker', title: 'Meme Maker', desc: 'Caption images.', icon: <ImageIcon className="w-6 h-6" />, path: '/tools/meme-maker' },
  { id: 'joke', title: 'Random Joke', desc: 'Daily laughter.', icon: <Smile className="w-6 h-6" />, path: '/tools/joke' },
  { id: 'trivia', title: 'Trivia Facts', desc: 'Learn something new.', icon: <HelpCircle className="w-6 h-6" />, path: '/tools/trivia' },
  { id: 'dice', title: 'Dice Roller', desc: 'Roll 3D dice.', icon: <Dices className="w-6 h-6" />, path: '/tools/dice' },
  { id: 'wheel', title: 'Spin Wheel', desc: 'Make decisions.', icon: <Activity className="w-6 h-6" />, path: '/tools/wheel' },
  
  // New Tools
  { id: 'lorem-ipsum', title: 'Lorem Ipsum', desc: 'Generate dummy text.', icon: <FileText className="w-6 h-6" />, path: '/tools/lorem-ipsum' },
  { id: 'random-date', title: 'Random Date', desc: 'Generate dates.', icon: <Calendar className="w-6 h-6" />, path: '/tools/random-date' },
  { id: 'lorem-emoji', title: 'Lorem Emoji', desc: 'Random emoji strings.', icon: <Smile className="w-6 h-6" />, path: '/tools/lorem-emoji' },
  { id: 'quote', title: 'Random Quote', desc: 'Inspiring quotes.', icon: <Quote className="w-6 h-6" />, path: '/tools/quote' },
  { id: 'qr-scanner', title: 'QR Scanner', desc: 'Scan codes online.', icon: <ScanLine className="w-6 h-6" />, path: '/tools/qr-scanner' },
  { id: 'binary', title: 'Binary Conv', desc: 'Text to 010101.', icon: <Binary className="w-6 h-6" />, path: '/tools/binary' },
  { id: 'morse', title: 'Morse Code', desc: 'Text to dots/dashes.', icon: <Radio className="w-6 h-6" />, path: '/tools/morse' },
  { id: 'html-encoder', title: 'HTML Encode', desc: 'Escape characters.', icon: <Code2 className="w-6 h-6" />, path: '/tools/html-encoder' },
  { id: 'url-encoder', title: 'URL Encode', desc: 'Encode URI strings.', icon: <Link2 className="w-6 h-6" />, path: '/tools/url-encoder' },
  { id: 'base64', title: 'Base64 Tool', desc: 'Encode/Decode Base64.', icon: <Terminal className="w-6 h-6" />, path: '/tools/base64' },
];

const features = [
  { title: 'Lightning Fast', desc: 'Instant results with optimized performance.', icon: <Zap className="w-5 h-5" /> },
  { title: '100% Free', desc: 'No hidden fees, subscriptions, or paywalls.', icon: <Globe className="w-5 h-5" /> },
  { title: 'No Login', desc: 'Start using tools immediately without signing up.', icon: <UserCheck className="w-5 h-5" /> },
  { title: 'Secure', desc: 'Everything runs in your browser or via secure APIs.', icon: <ShieldCheck className="w-5 h-5" /> },
];

const Home = () => {
  const { query } = useContext(SearchContext);
  const navigate = useNavigate();

  // Filter tools based on search query
  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(query.toLowerCase()) || 
    tool.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Navigate if exact match (handling via effect is tricky with typing, so we do it on click or just filter here)
  // Real-time navigation might be annoying while typing, so we just filter. 
  // However, if user hits Enter in search bar (handled in Layout), we could navigate. 
  // For now, filtering the grid is the best UX.

  return (
    <div className="pb-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section - Only show if not searching or if query is empty */}
      {!query && (
        <div className="relative overflow-hidden border-b border-slate-100 dark:border-dark-border bg-white dark:bg-dark-bg">
          <div className="absolute inset-0 bg-[radial-gradient(#4DA6FF10_1px,transparent_1px)] dark:bg-[radial-gradient(#4DA6FF05_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 text-primary text-sm font-medium mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              40+ Free Tools Available
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Simple Tools. <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Smart Ideas.</span> <br/>
              Beautifully Delivered.
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Free online generators, tools, and tips — fast, simple, and aesthetic.
            </p>
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {query && (
          <div className="mb-8 text-lg text-slate-500 dark:text-slate-400">
            Searching for "{query}" - Found {filteredTools.length} tools
          </div>
        )}
        
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <ToolGridItem 
                key={tool.id} 
                to={tool.path} 
                icon={tool.icon} 
                title={tool.title} 
                desc={tool.desc} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <div className="text-6xl mb-4">🔍</div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">No tools found</h3>
             <p className="text-slate-500">Try a different search term.</p>
          </div>
        )}
      </div>

      {/* Why TipDora Section - Only show if not searching */}
      {!query && (
        <div className="bg-slate-50/50 dark:bg-[#050505] border-y border-slate-100 dark:border-dark-border py-20 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
             <SectionTitle title="Why TipDora?" subtitle="We focus on user experience above all else." />
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-[#252525] flex items-center justify-center text-primary mb-4">
                      {feat.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{feat.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;