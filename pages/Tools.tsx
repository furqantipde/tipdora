import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Input, Select, ResultBox, TextArea } from '../components/UI';
import { 
  generateHashtags, generateUsernames, generateNames, 
  generateRandomWord, generateTextToEmoji, generateJoke, generateTrivia, generateQuote
} from '../services/geminiService';
import { QrCode, Copy, RefreshCw, Type, Palette, ArrowRight, Upload, Camera } from 'lucide-react';

// --- Wrappers ---
const ToolPageLayout = ({ title, desc, children }: { title: string; desc: string; children?: React.ReactNode }) => (
  <div className="max-w-3xl mx-auto px-4 py-12 md:py-20 animate-fade-in-up">
    <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{title}</h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg">{desc}</p>
    </div>
    <Card>{children}</Card>
  </div>
);

// --- 1. QR Code Generator ---
export const QRCodeTool = () => {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (text) {
        setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&color=1e293b&bgcolor=ffffff`);
      } else {
        setQrUrl('');
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <ToolPageLayout title="QR Code Generator" desc="Turn any text or URL into a scannable QR code.">
      <div className="flex flex-col items-center gap-8">
        <Input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="https://example.com or any text" 
          label="Enter content"
        />
        <div className="w-64 h-64 bg-white rounded-xl border border-slate-200 dark:border-dark-border flex items-center justify-center overflow-hidden shadow-sm">
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain p-4" />
          ) : (
            <QrCode className="w-12 h-12 text-slate-300 dark:text-slate-600" />
          )}
        </div>
        {qrUrl && (
          <a 
            href={qrUrl} 
            download="qrcode.png" 
            target="_blank" 
            rel="noreferrer"
            className="text-primary hover:text-accent font-medium text-sm underline"
          >
            Open Image to Download
          </a>
        )}
      </div>
    </ToolPageLayout>
  );
};

// --- 2. Hashtag Generator (AI) ---
export const HashtagTool = () => {
  const [keyword, setKeyword] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    const result = await generateHashtags(keyword);
    setHashtags(result);
    setLoading(false);
  };

  return (
    <ToolPageLayout title="Hashtag Generator" desc="Generate trending hashtags for social media.">
      <div className="space-y-6">
        <div className="flex gap-3">
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. travel, food" />
          <Button onClick={handleGenerate} isLoading={loading}>Generate</Button>
        </div>
        <ResultBox content={hashtags.join(' ')} label="Hashtags" />
      </div>
    </ToolPageLayout>
  );
};

// --- 3. Username Generator (AI) ---
export const UsernameTool = () => {
  const [keyword, setKeyword] = useState('');
  const [style, setStyle] = useState('aesthetic');
  const [usernames, setUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    const result = await generateUsernames(keyword, style);
    setUsernames(result);
    setLoading(false);
  };

  return (
    <ToolPageLayout title="Username Ideas" desc="Find unique usernames for any platform.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
             <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword" />
          </div>
          <Select 
            value={style} 
            onChange={(e) => setStyle(e.target.value)} 
            options={[
              { value: 'aesthetic', label: 'Aesthetic' },
              { value: 'cool', label: 'Cool' },
              { value: 'cute', label: 'Cute' },
              { value: 'minimal', label: 'Minimal' },
              { value: 'funny', label: 'Funny' }
            ]} 
          />
        </div>
        <Button onClick={handleGenerate} className="w-full" isLoading={loading}>Generate</Button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
           {usernames.map((u, i) => (
             <button 
                key={i} 
                onClick={() => navigator.clipboard.writeText(u)}
                className="flex justify-between items-center p-3 bg-slate-50 dark:bg-[#252525] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg border border-slate-100 dark:border-dark-border text-sm text-slate-700 dark:text-slate-300 transition-colors group"
             >
                <span>{u}</span>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-primary"/>
             </button>
           ))}
        </div>
      </div>
    </ToolPageLayout>
  );
};

// --- 4. Random Name Generator (AI) ---
export const RandomNameTool = () => {
  const [type, setType] = useState('fantasy character');
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateNames(type);
    setNames(result);
    setLoading(false);
  };

  return (
    <ToolPageLayout title="Random Name Generator" desc="Get creative names for characters or babies.">
      <div className="space-y-6">
        <div className="flex gap-3 flex-col sm:flex-row">
           <Select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            options={[
              { value: 'fantasy character', label: 'Fantasy Character' },
              { value: 'baby boy', label: 'Baby Boy' },
              { value: 'baby girl', label: 'Baby Girl' },
              { value: 'pet', label: 'Pet' },
              { value: 'startup', label: 'Startup Company' }
            ]} 
          />
          <Button onClick={handleGenerate} isLoading={loading} className="whitespace-nowrap">Get Names</Button>
        </div>
        <ResultBox content={names.join('\n')} label="Names" />
      </div>
    </ToolPageLayout>
  );
};

// --- 5. Password Generator ---
export const PasswordTool = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);

  const generate = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  useEffect(() => generate(), []);

  return (
    <ToolPageLayout title="Password Generator" desc="Create strong, secure random passwords.">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
           <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Length: {length}</label>
           <input type="range" min="6" max="32" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>
        <div className="flex gap-3">
           <div className="flex-grow p-4 bg-slate-100 dark:bg-[#080808] rounded-xl font-mono text-lg text-slate-800 dark:text-slate-100 break-all">{password}</div>
           <Button onClick={generate} variant="outline"><RefreshCw className="w-5 h-5"/></Button>
        </div>
        <Button onClick={() => navigator.clipboard.writeText(password)} className="w-full">Copy Password</Button>
      </div>
    </ToolPageLayout>
  );
};

// --- 6. Emoji Generator ---
export const EmojiTool = () => {
  const [emojis, setEmojis] = useState<string[]>([]);

  const generate = () => {
    const pool = ['😀','😂','🥰','😎','🤔','😴','🥶','🤯','🥳','🥸','👻','👽','🤖','🎃','💀','🫶','👍','💪','🧠','👀','🐶','🐱','🦄','🦋','🍕','🌮','🚀','🌈','🔥','✨','🎉','💻'];
    const result = [];
    for(let i=0; i<12; i++) {
       result.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    setEmojis(result);
  };

  useEffect(() => generate(), []);

  return (
    <ToolPageLayout title="Random Emoji" desc="Generate random emojis for fun.">
      <div className="text-center space-y-8">
        <div className="flex flex-wrap justify-center gap-4">
          {emojis.map((e, i) => (
            <div key={i} className="text-4xl hover:scale-125 transition-transform cursor-pointer" onClick={() => navigator.clipboard.writeText(e)} title="Click to copy">{e}</div>
          ))}
        </div>
        <Button onClick={generate}>Shuffle Emojis</Button>
      </div>
    </ToolPageLayout>
  );
};

// --- 7. Color Generator ---
export const ColorTool = () => {
  const [color, setColor] = useState('#4DA6FF');

  const generate = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
  };

  return (
    <ToolPageLayout title="Random Color" desc="Generate a random color HEX.">
      <div className="flex flex-col items-center gap-8">
        <div 
          className="w-48 h-48 rounded-full shadow-lg transition-all duration-500 ease-out border-4 border-white dark:border-dark-border"
          style={{ backgroundColor: color }}
        ></div>
        <div className="text-2xl font-mono font-bold text-slate-700 dark:text-white uppercase">{color}</div>
        <div className="flex gap-4">
           <Button onClick={generate} variant="outline">New Color</Button>
           <Button onClick={() => navigator.clipboard.writeText(color)}>Copy HEX</Button>
        </div>
      </div>
    </ToolPageLayout>
  );
};

// --- 8. Number Generator ---
export const NumberTool = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);

  const generate = () => {
    setResult(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  return (
    <ToolPageLayout title="Random Number" desc="Pick a number within a range.">
      <div className="space-y-8 text-center">
         <div className="flex gap-4">
           <Input type="number" value={min.toString()} onChange={(e) => setMin(Number(e.target.value))} placeholder="Min" label="Minimum" />
           <Input type="number" value={max.toString()} onChange={(e) => setMax(Number(e.target.value))} placeholder="Max" label="Maximum" />
         </div>
         <div className="p-10 bg-slate-50 dark:bg-[#080808] rounded-2xl border border-slate-200 dark:border-dark-border">
            <span className="text-6xl font-bold text-primary">{result !== null ? result : '-'}</span>
         </div>
         <Button onClick={generate} className="w-full md:w-auto">Generate Number</Button>
      </div>
    </ToolPageLayout>
  );
};

// --- 9. Fancy Text ---
export const FancyTextTool = () => {
  const [input, setInput] = useState('TipDora is cool');
  const [outputs, setOutputs] = useState<string[]>([]);

  useEffect(() => {
    if(!input) { setOutputs([]); return; }
    
    const maps: Record<string, string> = {
      bold: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
      italic: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
      script: "𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
      bubble: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
      monospace: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣"
    };
    const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    const generated = Object.values(maps).map(mapStr => {
      return input.split('').map(char => {
        const idx = normal.indexOf(char);
        return idx !== -1 ? mapStr[idx] : char;
      }).join('');
    });
    
    setOutputs(generated);
  }, [input]);

  return (
    <ToolPageLayout title="Fancy Text Generator" desc="Stylish fonts for social bios.">
      <div className="space-y-6">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your text here..." />
        <div className="space-y-3">
          {outputs.map((txt, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-[#080808] border border-slate-100 dark:border-dark-border rounded-xl flex justify-between items-center group hover:border-primary/30 transition-colors">
              <span className="text-lg dark:text-slate-100">{txt}</span>
              <button onClick={() => navigator.clipboard.writeText(txt)} className="opacity-50 group-hover:opacity-100 text-primary"><Copy className="w-5 h-5"/></button>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
};

// --- 10. Word Counter ---
export const WordCounterTool = () => {
  const [text, setText] = useState('');
  
  const stats = {
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    chars: text.length,
    sentences: text.split(/[.!?]+/).filter(Boolean).length,
    paragraphs: text.split(/\n\n+/).filter(Boolean).length
  };

  return (
    <ToolPageLayout title="Word Counter" desc="Real-time text statistics.">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {Object.entries(stats).map(([key, val]) => (
             <div key={key} className="p-4 bg-slate-50 dark:bg-[#080808] rounded-xl border border-slate-100 dark:border-dark-border text-center">
               <div className="text-2xl font-bold text-primary">{val}</div>
               <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">{key}</div>
             </div>
           ))}
        </div>
        <TextArea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Paste text here..." 
          rows={8}
        />
      </div>
    </ToolPageLayout>
  );
};

// --- 11. Random Word Generator ---
export const RandomWordTool = () => {
  const [type, setType] = useState('common');
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await generateRandomWord(type);
    setWord(res);
    setLoading(false);
  };

  return (
    <ToolPageLayout title="Random Word Generator" desc="Generate random words for brainstorming.">
      <div className="space-y-6 text-center">
         <Select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            options={[
              { value: 'common', label: 'Common English Word' },
              { value: 'rare', label: 'Rare/Fancy Word' },
              { value: 'noun', label: 'Noun' },
              { value: 'verb', label: 'Verb' },
              { value: 'adjective', label: 'Adjective' }
            ]} 
          />
         <Button onClick={generate} isLoading={loading}>Generate Word</Button>
         {word && <div className="text-4xl font-bold text-slate-800 dark:text-white mt-4">{word}</div>}
      </div>
    </ToolPageLayout>
  );
};

// 12. Remove Extra Spaces
export const RemoveSpacesTool = () => {
  const [text, setText] = useState('');
  const clean = () => setText(text.replace(/\s+/g, ' ').trim());
  
  return (
    <ToolPageLayout title="Remove Extra Spaces" desc="Clean up messy text formatting.">
      <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text..." />
      <div className="mt-4"><Button onClick={clean}>Clean Text</Button></div>
    </ToolPageLayout>
  );
};

// 13. Case Converter
export const CaseConverterTool = () => {
  const [text, setText] = useState('');
  
  const convert = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    let newText = '';
    if (type === 'upper') newText = text.toUpperCase();
    if (type === 'lower') newText = text.toLowerCase();
    if (type === 'title') newText = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    if (type === 'sentence') newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    setText(newText);
  };

  return (
    <ToolPageLayout title="Case Converter" desc="Convert text case instantly.">
      <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text..." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        <Button variant="outline" onClick={() => convert('upper')}>UPPER</Button>
        <Button variant="outline" onClick={() => convert('lower')}>lower</Button>
        <Button variant="outline" onClick={() => convert('title')}>Title Case</Button>
        <Button variant="outline" onClick={() => convert('sentence')}>Sentence</Button>
      </div>
    </ToolPageLayout>
  );
};

// 14. Reverse Text
export const ReverseTextTool = () => {
  const [text, setText] = useState('');
  const reverse = () => setText(text.split('').reverse().join(''));

  return (
    <ToolPageLayout title="Reverse Text" desc="Flip your text backwards.">
      <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text..." />
      <div className="mt-4"><Button onClick={reverse}>Reverse</Button></div>
    </ToolPageLayout>
  );
};

// 15. Emoji To Text (Simulated/Placeholder for AI)
export const EmojiToTextTool = () => {
  // This would ideally require vision or specific AI text model
  return (
    <ToolPageLayout title="Emoji to Text" desc="Explain emoji meanings (Coming Soon).">
       <div className="text-center py-10">
         <p className="text-slate-500 dark:text-slate-400">This tool is currently being upgraded.</p>
       </div>
    </ToolPageLayout>
  )
}

// 16. Text to Emoji
export const TextToEmojiTool = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await generateTextToEmoji(text);
    setResult(res);
    setLoading(false);
  };

  return (
    <ToolPageLayout title="Text to Emoji" desc="Convert sentences into emoji sequences.">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter a sentence..." />
      <div className="mt-4 mb-6"><Button onClick={generate} isLoading={loading}>Convert</Button></div>
      <ResultBox content={result} />
    </ToolPageLayout>
  );
};

// 17. Duplicate Line Remover
export const DuplicateRemoverTool = () => {
  const [text, setText] = useState('');
  const process = () => {
    const lines = text.split('\n');
    const unique = [...new Set(lines)].join('\n');
    setText(unique);
  };

  return (
    <ToolPageLayout title="Duplicate Line Remover" desc="Remove duplicate lines from lists.">
      <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste list..." rows={8} />
      <div className="mt-4"><Button onClick={process}>Remove Duplicates</Button></div>
    </ToolPageLayout>
  );
};

// 18. Sort Lines
export const SortLinesTool = () => {
  const [text, setText] = useState('');
  const sort = (dir: 'asc' | 'desc') => {
    const lines = text.split('\n').filter(l => l.trim());
    lines.sort();
    if(dir === 'desc') lines.reverse();
    setText(lines.join('\n'));
  };

  return (
    <ToolPageLayout title="Sort Lines" desc="Alphabetize your lists.">
      <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste list..." rows={8} />
      <div className="flex gap-3 mt-4">
        <Button onClick={() => sort('asc')} variant="outline">A-Z</Button>
        <Button onClick={() => sort('desc')} variant="outline">Z-A</Button>
      </div>
    </ToolPageLayout>
  );
};

// 19. Age Calculator
export const AgeCalculatorTool = () => {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState<string | null>(null);

  const calculate = () => {
    if (!birthdate) return;
    const birth = new Date(birthdate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
       const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
       days += prevMonth.getDate();
       months--;
    }
    setAge(`${years} years, ${months} months, ${days} days`);
  };

  return (
    <ToolPageLayout title="Age Calculator" desc="Calculate your exact age.">
      <div className="space-y-6">
        <Input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} label="Date of Birth" />
        <Button onClick={calculate} className="w-full">Calculate</Button>
        {age && <div className="p-6 bg-slate-100 dark:bg-[#080808] rounded-xl text-center text-xl font-bold text-slate-800 dark:text-white">{age}</div>}
      </div>
    </ToolPageLayout>
  );
};

// 20. Percentage Calculator
export const PercentageCalculatorTool = () => {
  const [valA, setValA] = useState('');
  const [valB, setValB] = useState('');
  const [res, setRes] = useState<number | null>(null);

  const calc = () => {
    const a = parseFloat(valA);
    const b = parseFloat(valB);
    if(!isNaN(a) && !isNaN(b)) setRes((a / 100) * b);
  };

  return (
    <ToolPageLayout title="Percentage Calculator" desc="Simple math helper.">
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium flex-wrap">
        <span>What is</span>
        <input type="number" value={valA} onChange={(e) => setValA(e.target.value)} className="w-20 p-2 rounded-lg border border-slate-200 dark:border-dark-border bg-white dark:bg-[#1A1A1A]" placeholder="%" />
        <span>% of</span>
        <input type="number" value={valB} onChange={(e) => setValB(e.target.value)} className="w-20 p-2 rounded-lg border border-slate-200 dark:border-dark-border bg-white dark:bg-[#1A1A1A]" placeholder="Num" />
      </div>
      <div className="mt-6">
         <Button onClick={calc}>Calculate</Button>
      </div>
      {res !== null && <div className="mt-6 text-3xl font-bold text-primary">{res}</div>}
    </ToolPageLayout>
  );
};

// 21. Unit Converter
export const UnitConverterTool = () => {
  const [val, setVal] = useState('');
  const [unit, setUnit] = useState('c-f');
  const [res, setRes] = useState<string>('');

  const convert = () => {
    const v = parseFloat(val);
    if(isNaN(v)) return;
    if(unit === 'c-f') setRes(`${(v * 9/5 + 32).toFixed(2)} °F`);
    if(unit === 'f-c') setRes(`${((v - 32) * 5/9).toFixed(2)} °C`);
    if(unit === 'kg-lb') setRes(`${(v * 2.20462).toFixed(2)} lbs`);
    if(unit === 'lb-kg') setRes(`${(v / 2.20462).toFixed(2)} kg`);
    if(unit === 'm-ft') setRes(`${(v * 3.28084).toFixed(2)} ft`);
  };

  useEffect(() => convert(), [val, unit]);

  return (
    <ToolPageLayout title="Unit Converter" desc="Convert common units easily.">
      <div className="space-y-4">
         <Select 
           value={unit}
           onChange={(e) => setUnit(e.target.value)}
           options={[
             { value: 'c-f', label: 'Celsius to Fahrenheit' },
             { value: 'f-c', label: 'Fahrenheit to Celsius' },
             { value: 'kg-lb', label: 'Kilograms to Pounds' },
             { value: 'lb-kg', label: 'Pounds to Kilograms' },
             { value: 'm-ft', label: 'Meters to Feet' }
           ]}
         />
         <Input type="number" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Enter value" />
         <div className="p-6 bg-slate-50 dark:bg-[#080808] rounded-xl text-center text-2xl font-bold text-slate-800 dark:text-white">
           {res || '...'}
         </div>
      </div>
    </ToolPageLayout>
  );
};

// 22. Color Picker
export const ColorPickerTool = () => {
  const [color, setColor] = useState('#4DA6FF');
  return (
    <ToolPageLayout title="Color Picker" desc="Select a color and get the code.">
      <div className="flex flex-col items-center gap-6">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-32 h-32 rounded-full cursor-pointer overflow-hidden border-4 border-slate-100 dark:border-dark-border" />
        <div className="text-2xl font-mono font-bold text-slate-800 dark:text-white">{color}</div>
        <Button onClick={() => navigator.clipboard.writeText(color)}>Copy HEX</Button>
      </div>
    </ToolPageLayout>
  );
};

// 23. Gradient Generator
export const GradientTool = () => {
  const [c1, setC1] = useState('#4DA6FF');
  const [c2, setC2] = useState('#B280FF');
  const css = `background: linear-gradient(to right, ${c1}, ${c2});`;

  return (
    <ToolPageLayout title="Gradient Generator" desc="Create beautiful CSS gradients.">
      <div className="space-y-6">
        <div className="h-40 w-full rounded-2xl shadow-inner" style={{ background: `linear-gradient(to right, ${c1}, ${c2})` }}></div>
        <div className="flex justify-center gap-4">
          <input type="color" value={c1} onChange={(e) => setC1(e.target.value)} className="w-16 h-16 rounded-xl cursor-pointer" />
          <input type="color" value={c2} onChange={(e) => setC2(e.target.value)} className="w-16 h-16 rounded-xl cursor-pointer" />
        </div>
        <ResultBox content={css} label="CSS Code" />
      </div>
    </ToolPageLayout>
  );
};

// 24. Password Strength
export const PasswordStrengthTool = () => {
  const [pass, setPass] = useState('');
  
  const check = () => {
    let score = 0;
    if(pass.length > 8) score++;
    if(pass.match(/[A-Z]/)) score++;
    if(pass.match(/[0-9]/)) score++;
    if(pass.match(/[^A-Za-z0-9]/)) score++;
    return score;
  };

  const score = check();
  const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <ToolPageLayout title="Password Strength" desc="Test your password security.">
      <Input type="text" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password..." />
      {pass && (
        <div className="mt-6">
           <div className="flex gap-1 h-2 mb-2">
              {[0,1,2,3,4].map(i => (
                <div key={i} className={`flex-1 rounded-full transition-colors ${i <= score ? colors[score] : 'bg-slate-200 dark:bg-dark-border'}`}></div>
              ))}
           </div>
           <div className="text-center font-bold text-slate-700 dark:text-slate-300">{labels[score]}</div>
        </div>
      )}
    </ToolPageLayout>
  );
};

// 25. URL Shortener (Simulated)
export const UrlShortenerTool = () => {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');

  const shorten = () => {
    if(!url) return;
    const hash = Math.random().toString(36).substr(2, 6);
    setShort(`https://tipdora.fun/s/${hash}`);
  };

  return (
    <ToolPageLayout title="URL Shortener" desc="Create short links (Demo).">
      <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://very-long-url.com..." />
      <div className="mt-4"><Button onClick={shorten}>Shorten URL</Button></div>
      {short && <div className="mt-6"><ResultBox content={short} /></div>}
    </ToolPageLayout>
  );
};

// 26. Meme Maker
export const MemeMakerTool = () => {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      const img = new Image();
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = () => setImage(img);
    }
  };

  useEffect(() => {
    if(canvasRef.current && image) {
      const ctx = canvasRef.current.getContext('2d');
      if(ctx) {
        canvasRef.current.width = image.width;
        canvasRef.current.height = image.height;
        ctx.drawImage(image, 0, 0);
        
        ctx.font = `${image.width/10}px Impact`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = image.width/200;
        ctx.textAlign = 'center';
        
        ctx.fillText(top.toUpperCase(), image.width/2, image.height*0.15);
        ctx.strokeText(top.toUpperCase(), image.width/2, image.height*0.15);
        
        ctx.fillText(bottom.toUpperCase(), image.width/2, image.height*0.9);
        ctx.strokeText(bottom.toUpperCase(), image.width/2, image.height*0.9);
      }
    }
  }, [image, top, bottom]);

  return (
    <ToolPageLayout title="Meme Generator" desc="Create custom memes instantly.">
      <div className="space-y-4">
        <input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
        <Input value={top} onChange={(e) => setTop(e.target.value)} placeholder="Top Text" />
        <Input value={bottom} onChange={(e) => setBottom(e.target.value)} placeholder="Bottom Text" />
        <div className="border border-slate-200 dark:border-dark-border rounded-xl overflow-hidden bg-slate-100 dark:bg-[#080808] flex justify-center">
           <canvas ref={canvasRef} className="max-w-full max-h-[500px]" />
        </div>
      </div>
    </ToolPageLayout>
  );
};

// 27. Random Joke
export const JokeTool = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  
  const fetchJoke = async () => {
    setLoading(true);
    const res = await generateJoke();
    setJoke(res);
    setLoading(false);
  };

  return (
    <ToolPageLayout title="Random Joke" desc="Get a daily dose of laughter.">
       <div className="text-center">
          <Button onClick={fetchJoke} isLoading={loading}>Tell me a joke</Button>
          {joke && <div className="mt-8 text-xl font-medium text-slate-800 dark:text-slate-200 italic">"{joke}"</div>}
       </div>
    </ToolPageLayout>
  );
};

// 28. Random Trivia
export const TriviaTool = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  
  const fetchTrivia = async () => {
    setLoading(true);
    const res = await generateTrivia('Random');
    setFact(res);
    setLoading(false);
  };

  return (
    <ToolPageLayout title="Random Trivia" desc="Learn something new today.">
       <div className="text-center">
          <Button onClick={fetchTrivia} isLoading={loading}>Get Fact</Button>
          {fact && <div className="mt-8 text-xl font-medium text-slate-800 dark:text-slate-200">{fact}</div>}
       </div>
    </ToolPageLayout>
  );
};

// 29. Dice Roller
export const DiceTool = () => {
  const [val, setVal] = useState(1);
  const roll = () => setVal(Math.floor(Math.random() * 6) + 1);
  
  return (
    <ToolPageLayout title="Dice Roller" desc="Virtual dice for games.">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto bg-white dark:bg-[#080808] border-4 border-slate-800 dark:border-slate-200 rounded-2xl flex items-center justify-center text-6xl font-bold mb-8 shadow-xl">
          {val}
        </div>
        <Button onClick={roll}>Roll Dice</Button>
      </div>
    </ToolPageLayout>
  );
};

// 30. Spin Wheel
export const WheelTool = () => {
  const [items, setItems] = useState('Pizza,Burgers,Sushi,Tacos');
  const [winner, setWinner] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if(isSpinning) return;
    setIsSpinning(true);
    setWinner('');
    const list = items.split(',').filter(i => i.trim());
    if(list.length < 2) { setIsSpinning(false); return; }
    
    let i = 0;
    const interval = setInterval(() => {
       setWinner(list[Math.floor(Math.random() * list.length)]);
       i++;
       if(i > 20) {
         clearInterval(interval);
         setIsSpinning(false);
       }
    }, 100);
  };

  return (
    <ToolPageLayout title="Spin the Wheel" desc="Can't decide? Let fate choose.">
      <div className="space-y-6 text-center">
        <TextArea value={items} onChange={(e) => setItems(e.target.value)} label="Options (comma separated)" />
        <Button onClick={spin} disabled={isSpinning}>Spin!</Button>
        {winner && <div className="text-3xl font-bold text-primary animate-bounce">{winner}</div>}
      </div>
    </ToolPageLayout>
  );
};

// --- 31. Lorem Ipsum ---
export const LoremIpsumTool = () => {
  const [paras, setParas] = useState(3);
  const [text, setText] = useState('');

  const generate = () => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    setText(Array(paras).fill(lorem).join('\n\n'));
  };

  useEffect(() => generate(), [paras]);

  return (
    <ToolPageLayout title="Lorem Ipsum" desc="Generate dummy text.">
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm">Paragraphs:</label>
        <input type="number" value={paras} onChange={(e) => setParas(Number(e.target.value))} className="w-20 p-2 rounded border dark:bg-[#080808] dark:border-dark-border" min="1" max="20" />
      </div>
      <ResultBox content={text} />
    </ToolPageLayout>
  );
};

// --- 32. Random Date ---
export const RandomDateTool = () => {
  const [start, setStart] = useState('2000-01-01');
  const [end, setEnd] = useState('2025-12-31');
  const [date, setDate] = useState('');

  const generate = () => {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (s > e) return;
    const random = new Date(s + Math.random() * (e - s));
    setDate(random.toDateString());
  };

  return (
    <ToolPageLayout title="Random Date" desc="Pick a date between range.">
      <div className="flex gap-4 mb-6">
        <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} label="Start Date" />
        <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} label="End Date" />
      </div>
      <Button onClick={generate} className="w-full">Generate</Button>
      {date && <div className="mt-8 text-2xl font-bold text-center">{date}</div>}
    </ToolPageLayout>
  );
};

// --- 33. Lorem Emoji ---
export const LoremEmojiTool = () => {
  const [count, setCount] = useState(20);
  const [text, setText] = useState('');

  const generate = () => {
    const pool = ['😀','😂','🥰','😎','🤔','🚀','🌈','🔥','✨','🎉','💻','🍕','🌮','🐱','🐶'];
    let res = "";
    for(let i=0; i<count; i++) res += pool[Math.floor(Math.random() * pool.length)];
    setText(res);
  };

  useEffect(() => generate(), [count]);

  return (
    <ToolPageLayout title="Lorem Emoji" desc="Generate random string of emojis.">
       <div className="mb-4">
          <label>Count: {count}</label>
          <input type="range" min="10" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full" />
       </div>
       <ResultBox content={text} />
    </ToolPageLayout>
  );
};

// --- 34. Random Quote ---
export const RandomQuoteTool = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');

  const fetch = async () => {
    setLoading(true);
    const res = await generateQuote(category);
    setQuote(res);
    setLoading(false);
  };

  return (
    <ToolPageLayout title="Random Quote" desc="Get inspired instantly.">
       <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Topic (optional, e.g. Love, Work)" />
       <div className="mt-4 text-center">
          <Button onClick={fetch} isLoading={loading}>Get Quote</Button>
          {quote && <div className="mt-8 text-xl italic font-serif">"{quote}"</div>}
       </div>
    </ToolPageLayout>
  );
};

// --- 35. QR Scanner (Placeholder) ---
export const QrScannerTool = () => {
  // Real browser scanning needs BarcodeDetector or external libs not available here
  return (
    <ToolPageLayout title="QR Scanner" desc="Scan QR codes from images.">
       <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-dark-border rounded-xl">
         <Upload className="w-12 h-12 mx-auto text-slate-300 mb-4" />
         <p className="text-slate-500 mb-4">Upload a QR code image to decode it.</p>
         <input type="file" className="hidden" id="qr-upload" />
         <label htmlFor="qr-upload" className="cursor-pointer inline-flex px-6 py-2 bg-primary text-white rounded-lg">Select Image</label>
         <p className="mt-4 text-xs text-slate-400">Live camera scanning coming soon.</p>
       </div>
    </ToolPageLayout>
  );
};

// --- 36. Binary Converter ---
export const BinaryConverterTool = () => {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');

  const toBinary = () => {
    setBinary(text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
  };
  
  const toText = () => {
    setText(binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join(''));
  };

  return (
    <ToolPageLayout title="Binary Converter" desc="Translate Text to Binary and back.">
       <div className="space-y-4">
         <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Plain Text" rows={3} />
         <div className="flex gap-4">
           <Button onClick={toBinary}>Text → Binary</Button>
           <Button onClick={toText} variant="outline">Binary → Text</Button>
         </div>
         <TextArea value={binary} onChange={(e) => setBinary(e.target.value)} placeholder="01001000 01101001" rows={3} />
       </div>
    </ToolPageLayout>
  );
};

// --- 37. Morse Code ---
export const MorseTool = () => {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');
  
  const MORSE_CODE: Record<string, string> = { 
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
    '9': '----.', '0': '-----', ' ': '/'
  };

  const toMorse = () => {
    setMorse(text.toUpperCase().split('').map(c => MORSE_CODE[c] || c).join(' '));
  };

  return (
    <ToolPageLayout title="Morse Code" desc="Convert text to dots and dashes.">
       <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
       <div className="mt-4 mb-4"><Button onClick={toMorse}>Convert</Button></div>
       <ResultBox content={morse} label="Morse" />
    </ToolPageLayout>
  );
};

// --- 38. HTML Encoder ---
export const HtmlEncoderTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => setOutput(input.replace(/[\u00A0-\u9999<>&]/g, i => '&#'+i.charCodeAt(0)+';'));
  const decode = () => {
    const txt = document.createElement("textarea");
    txt.innerHTML = input;
    setOutput(txt.value);
  };

  return (
    <ToolPageLayout title="HTML Encoder" desc="Escape/Unescape HTML entities.">
      <TextArea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Input..." />
      <div className="flex gap-4 my-4">
        <Button onClick={encode}>Encode</Button>
        <Button onClick={decode} variant="outline">Decode</Button>
      </div>
      <ResultBox content={output} />
    </ToolPageLayout>
  );
};

// --- 39. URL Encoder ---
export const UrlEncoderTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => setOutput(encodeURIComponent(input));
  const decode = () => setOutput(decodeURIComponent(input));

  return (
    <ToolPageLayout title="URL Encoder" desc="Encode/Decode URL components.">
      <TextArea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Input..." />
      <div className="flex gap-4 my-4">
        <Button onClick={encode}>Encode</Button>
        <Button onClick={decode} variant="outline">Decode</Button>
      </div>
      <ResultBox content={output} />
    </ToolPageLayout>
  );
};

// --- 40. Base64 ---
export const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => {
    try { setOutput(btoa(input)); } catch { setOutput("Error encoding"); }
  };
  const decode = () => {
    try { setOutput(atob(input)); } catch { setOutput("Error decoding"); }
  };

  return (
    <ToolPageLayout title="Base64 Tool" desc="Base64 Encode/Decode strings.">
      <TextArea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Input..." />
      <div className="flex gap-4 my-4">
        <Button onClick={encode}>Encode</Button>
        <Button onClick={decode} variant="outline">Decode</Button>
      </div>
      <ResultBox content={output} />
    </ToolPageLayout>
  );
};