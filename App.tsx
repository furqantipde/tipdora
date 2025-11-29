import React, { useState, useEffect, useMemo, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { TOOLS, TIPS } from './constants';
import { Tool, MicroTip } from './types';
import { processTextTool, generateContent, calculateResult } from './utils/toolLogic';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Activity className={className} />;
  return <IconComponent className={className} />;
};

const Header = ({ darkMode, toggleTheme, searchTerm, setSearchTerm }: any) => {
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        const match = TOOLS.find(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (match) {
            navigate(match.path);
            setSearchTerm('');
        }
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="relative">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
              TipDora
            </h1>
            <span className="absolute -top-1 left-[1.35rem] text-brand-blue animate-pulse">✨</span>
          </div>
        </Link>

        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icons.Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-full leading-5 bg-slate-50 dark:bg-brand-darkCard text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 sm:text-sm transition-all shadow-sm"
              placeholder="Search for tools..."
            />
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Icons.Sun className="h-5 w-5" /> : <Icons.Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-white dark:bg-brand-darkCard border-t border-slate-200 dark:border-slate-800 mt-auto">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:order-2 space-x-6">
          <a href="#" className="text-slate-400 hover:text-brand-blue"><Icons.Twitter className="h-5 w-5" /></a>
          <a href="#" className="text-slate-400 hover:text-brand-blue"><Icons.Youtube className="h-5 w-5" /></a>
          <a href="#" className="text-slate-400 hover:text-brand-blue"><Icons.Instagram className="h-5 w-5" /></a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <div className="flex justify-center md:justify-start space-x-6 mb-4 flex-wrap">
             <Link to="/about" className="text-sm text-slate-500 hover:text-brand-purple">About</Link>
             <Link to="/privacy" className="text-sm text-slate-500 hover:text-brand-purple">Privacy</Link>
             <Link to="/cookies" className="text-sm text-slate-500 hover:text-brand-purple">Cookies</Link>
             <Link to="/terms" className="text-sm text-slate-500 hover:text-brand-purple">Terms</Link>
             <a href="mailto:tipdestore@gmail.com" className="text-sm text-slate-500 hover:text-brand-purple">Contact</a>
          </div>
          <p className="text-center md:text-left text-xs text-slate-400">
            &copy; {new Date().getFullYear()} TipDora. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

const CookieBanner = () => {
  const [accepted, setAccepted] = useState(() => localStorage.getItem('cookieConsent') === 'true');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [accepted]);

  if (accepted || !visible) return null;

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setAccepted(true);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-brand-darkCard border-t border-slate-200 dark:border-slate-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-300 text-center sm:text-left">
          We use essential cookies to ensure TipDora works beautifully. <Link to="/cookies" className="text-brand-blue hover:underline">Learn more</Link>.
        </p>
        <div className="flex gap-3">
             <button onClick={accept} className="px-6 py-2 bg-brand-blue text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors shadow-lg shadow-brand-blue/20">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => (
  <Link to={tool.path} className="group relative bg-white dark:bg-brand-darkCard rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800">
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <Icons.ArrowUpRight className="h-5 w-5 text-brand-blue" />
    </div>
    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 text-brand-blue mb-4 group-hover:scale-110 transition-transform duration-300">
      <DynamicIcon name={tool.icon} className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{tool.name}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{tool.description}</p>
  </Link>
);

const MicroTipCard: React.FC<{ tip: MicroTip }> = ({ tip }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white dark:bg-brand-darkCard rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300 ${isOpen ? 'row-span-2 shadow-lg' : 'hover:shadow-md'}`}>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 dark:bg-slate-800 rounded-lg text-brand-purple">
            <DynamicIcon name={tip.icon} className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{tip.category} Tips</h3>
        </div>
        <Icons.ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 duration-300">
          <h4 className="text-sm font-medium text-brand-blue mb-3">{tip.title}</h4>
          <ul className="space-y-2">
            {tip.content.map((t, i) => (
              <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                <span className="mr-2 text-brand-purple">•</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- Pages ---

const Home = ({ searchTerm }: { searchTerm: string }) => {
  const filteredTools = useMemo(() => {
    if (!searchTerm) return TOOLS;
    return TOOLS.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-16 py-10">
      {/* Hero */}
      {!searchTerm && (
        <section className="text-center max-w-3xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-brand-blue text-xs font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-blue mr-2 animate-pulse"></span>
            New Tools Added Weekly
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Simple Tools. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Smart Ideas.</span><br/>Beautifully Delivered.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A curated collection of free online generators, calculators, and utilities. Fast, client-side, and designed for focus.
          </p>
          <div className="pt-4">
             <a href="#tools" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-brand-blue/25">
               Explore Tools
             </a>
          </div>
        </section>
      )}

      {/* Tools Grid */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {searchTerm ? `Search Results (${filteredTools.length})` : 'Popular Tools'}
          </h2>
        </div>
        
        {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <Icons.SearchX className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">No tools found</h3>
                <p className="mt-1 text-sm text-slate-500">Try adjusting your search terms.</p>
            </div>
        )}
      </section>

      {/* Micro Tips */}
      {!searchTerm && (
          <section className="bg-slate-50 dark:bg-brand-dark py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Micro Tips</h2>
                <p className="text-slate-500 dark:text-slate-400">Byte-sized wisdom for your daily life.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TIPS.map((tip, idx) => (
                  <MicroTipCard key={idx} tip={tip} />
                ))}
              </div>
            </div>
          </section>
      )}
    </div>
  );
};

const ToolView = () => {
  const { id } = useParams();
  const tool = TOOLS.find(t => t.id === id || t.path.endsWith(`/${id}`));
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [inputs, setInputs] = useState<any>({}); // For multi-input calculators
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageResult, setImageResult] = useState('');

  // QR Code State
  const [qrValue, setQrValue] = useState('');

  // Password State
  const [passLength, setPassLength] = useState(16);

  // QR Scanner State
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState('');

  useEffect(() => {
    setInput('');
    setOutput('');
    setInputs({});
    setQrValue('');
    setCopied(false);
    setIsScanning(false);
    setScanError('');
    setImageResult('');
    setIsLoading(false);
    
    // Cleanup scanning if leaving page
    return () => stopScan();
  }, [id]);

  // QR Scanner Logic
  const startScan = async () => {
      setIsScanning(true);
      setScanError('');
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.setAttribute("playsinline", "true");
              await videoRef.current.play();
              requestAnimationFrame(tick);
          }
      } catch (err) {
          console.error("Camera error:", err);
          setScanError("Could not access camera. Please allow permission.");
          setIsScanning(false);
      }
  };

  const stopScan = () => {
      if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
      }
      setIsScanning(false);
  };

  const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          if (canvasRef.current) {
              const canvas = canvasRef.current;
              const video = videoRef.current;
              canvas.height = video.videoHeight;
              canvas.width = video.videoWidth;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  // Use jsQR from window object
                  const jsQR = (window as any).jsQR;
                  if (jsQR) {
                      const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
                      if (code) {
                          setOutput(code.data);
                          stopScan(); // Stop after successful scan
                          return;
                      }
                  }
              }
          }
      }
      if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
         requestAnimationFrame(tick);
      }
  };


  if (!tool) {
      return (
          <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Tool Not Found</h2>
            <Link to="/" className="text-brand-blue hover:underline">Go Home</Link>
          </div>
      );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Logic Router
  const handleAction = async () => {
    if (tool.id === 'image-generator') {
      if (!input) return;
      setIsLoading(true);
      setOutput('');
      setImageResult('');
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: input }]
          }
        });
        
        let foundImage = false;
        if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
             for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64EncodeString = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64EncodeString}`;
                    setImageResult(imageUrl);
                    foundImage = true;
                }
             }
        }
        if (!foundImage) {
            setOutput('No image generated. Please try a different prompt.');
        }

      } catch (e) {
        console.error(e);
        setOutput('Error generating image. Please ensure your API key is valid and try again.');
      }
      setIsLoading(false);
      return;
    }

    if (tool.category === 'generator') {
        if (tool.id === 'qr-code') {
            setQrValue(input);
            return;
        }
        const res = generateContent(tool.id, { length: passLength });
        setOutput(res);
    } else if (tool.category === 'calculator') {
        const res = calculateResult(tool.id, inputs);
        setOutput(res);
    } else {
        const res = processTextTool(tool.id, input);
        setOutput(res);
    }
  };

  // Specific Rendering Logic
  const renderContent = () => {
      // 1. QR Code Special Case
      if (tool.id === 'qr-code') {
          return (
              <div className="space-y-6">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter URL or text..."
                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue/50 outline-none"
                  />
                  <button onClick={handleAction} className="w-full py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
                      Generate QR
                  </button>
                  {qrValue && (
                      <div className="flex justify-center p-6 bg-white rounded-xl">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`} alt="QR Code" className="rounded-lg shadow-md" />
                      </div>
                  )}
              </div>
          )
      }

      // 1.5 QR Scanner Special Case
      if (tool.id === 'qr-scanner') {
        return (
            <div className="space-y-6 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-square bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
                    {!isScanning && !output && (
                         <div className="text-center p-4">
                             <DynamicIcon name="ScanLine" className="h-12 w-12 text-slate-500 mx-auto mb-2" />
                             <p className="text-slate-400">Camera is off</p>
                         </div>
                    )}
                    <video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover ${!isScanning ? 'hidden' : ''}`} muted />
                    <canvas ref={canvasRef} className="hidden" />
                </div>
                
                {scanError && <p className="text-red-500 text-sm">{scanError}</p>}

                <div className="flex space-x-4">
                    {!isScanning ? (
                        <button onClick={startScan} className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors flex items-center">
                            <Icons.Camera className="mr-2 h-5 w-5" /> Start Scan
                        </button>
                    ) : (
                        <button onClick={stopScan} className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors flex items-center">
                            <Icons.StopCircle className="mr-2 h-5 w-5" /> Stop Scan
                        </button>
                    )}
                </div>
            </div>
        )
      }

      // 2. Calculator Special Case
      if (tool.category === 'calculator') {
          return (
              <div className="space-y-6">
                  {tool.id === 'age-calculator' && (
                       <div>
                           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date of Birth</label>
                           <input type="date" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white" onChange={(e) => setInputs({...inputs, date: e.target.value})} />
                       </div>
                  )}
                  {tool.id === 'percentage-calc' && (
                       <div className="flex gap-4">
                           <input type="number" placeholder="Value" className="w-1/2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white" onChange={(e) => setInputs({...inputs, val: e.target.value})} />
                           <input type="number" placeholder="Total" className="w-1/2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white" onChange={(e) => setInputs({...inputs, total: e.target.value})} />
                       </div>
                  )}
                  <button onClick={handleAction} className="w-full py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">Calculate</button>
              </div>
          );
      }

      // 3. Standard Text/Gen Case
      return (
          <div className="space-y-6">
              {tool.category !== 'generator' && (
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type or paste content here..."
                    className="w-full h-40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue/50 outline-none resize-none"
                />
              )}

              {tool.id === 'image-generator' && (
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                    className="w-full h-32 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue/50 outline-none resize-none"
                />
              )}
              
              <button 
                onClick={handleAction}
                disabled={isLoading}
                className={`w-full py-3 font-semibold rounded-xl transition-all shadow-lg shadow-brand-blue/20 active:scale-[0.98] ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-blue hover:bg-blue-600 text-white'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Icons.Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Generating...
                  </span>
                ) : (
                  tool.category === 'generator' ? 'Generate' : 'Process'
                )}
              </button>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-blue mb-8 transition-colors">
        <Icons.ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
      </Link>
      
      <div className="bg-white dark:bg-brand-darkCard rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-4 mb-4">
               <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl text-brand-blue">
                 <DynamicIcon name={tool.icon} className="h-8 w-8" />
               </div>
               <div>
                   <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.name}</h1>
                   <p className="text-slate-500 dark:text-slate-400">{tool.description}</p>
               </div>
           </div>
        </div>

        <div className="p-8 bg-slate-50/50 dark:bg-transparent">
            {renderContent()}

            {imageResult && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex justify-center">
                    <div className="relative group">
                      <img src={imageResult} alt="Generated AI" className="rounded-xl shadow-lg max-w-full" />
                      <a href={imageResult} download="generated-image.png" className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md text-slate-900 hover:text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
                         <Icons.Download className="h-5 w-5" />
                      </a>
                    </div>
                </div>
            )}

            {output && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Result</label>
                        <button 
                            onClick={handleCopy}
                            className={`flex items-center text-xs font-medium px-3 py-1 rounded-full transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}
                        >
                            {copied ? <Icons.Check className="h-3 w-3 mr-1" /> : <Icons.Copy className="h-3 w-3 mr-1" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <div className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-sm break-all">
                        {output}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const SimplePage: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-800 dark:text-slate-200">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">{title}</h1>
        <div className="prose dark:prose-invert">
            {children}
        </div>
    </div>
);

// --- Main App Logic ---

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-brand-dark transition-colors duration-300 font-sans">
        <Header darkMode={darkMode} toggleTheme={toggleTheme} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/tool/:id" element={<ToolView />} />
            
            {/* Legal Pages */}
            <Route path="/about" element={<SimplePage title="About Us"><p>TipDora is designed to be the cleanest, fastest utility belt for the internet. We believe tools shouldn't be cluttered with ads or complex interfaces. Our mission is to provide simple, client-side tools that respect your privacy.</p></SimplePage>} />
            <Route path="/privacy" element={<SimplePage title="Privacy Policy"><p>We prioritize your privacy. All tools on TipDora run primarily on the client-side (in your browser). We do not store your inputs, passwords, or generated content on our servers. We use minimal analytics to understand site usage.</p></SimplePage>} />
            <Route path="/cookies" element={<SimplePage title="Cookie Policy"><p>TipDora is committed to being lightweight and privacy-focused. We use LocalStorage (a modern cookie equivalent) solely to remember your preferences, such as Dark Mode and specific tool settings. We do not use third-party tracking cookies or sell your data.</p><p className="mt-4">You can clear your preferences at any time by clearing your browser's site data.</p></SimplePage>} />
            <Route path="/terms" element={<SimplePage title="Terms of Service"><p>By using TipDora, you agree to use the tools responsibly. We are not liable for any generated content or decisions made based on our calculators.</p></SimplePage>} />
          </Routes>
        </main>
        
        <CookieBanner />
        <Footer />
      </div>
    </Router>
  );
};

export default App;