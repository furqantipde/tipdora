import React, { useState } from 'react';
import { Card, Button } from '../components/UI';
import { generateTips } from '../services/geminiService';
import { Smartphone, Gamepad2, Cpu, Lightbulb } from 'lucide-react';

const categories = [
  { id: 'tech', label: 'Tech Tips', icon: <Cpu className="w-5 h-5"/>, color: 'text-blue-500' },
  { id: 'phone', label: 'Phone Hacks', icon: <Smartphone className="w-5 h-5"/>, color: 'text-purple-500' },
  { id: 'gaming', label: 'Gaming Tips', icon: <Gamepad2 className="w-5 h-5"/>, color: 'text-green-500' },
  { id: 'ai', label: 'AI Prompts', icon: <Lightbulb className="w-5 h-5"/>, color: 'text-yellow-500' }
];

const Tips = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTips = async (catId: string) => {
    setLoading(true);
    const cat = categories.find(c => c.id === catId);
    const result = await generateTips(cat?.label || 'General Tech');
    setTips(result);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTips(activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Micro Tips</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Bite-sized knowledge to make your life easier.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeCategory === cat.id 
              ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-lg scale-105' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span className={activeCategory === cat.id ? 'text-white' : cat.color}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid gap-4">
        {loading ? (
           <div className="text-center py-20">
             <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
             <p className="text-slate-400">Curating tips for you...</p>
           </div>
        ) : (
          tips.map((tip, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 border-l-primary border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex gap-4">
                 <span className="font-bold text-slate-300 dark:text-slate-600 text-xl">#{index + 1}</span>
                 <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{tip}</p>
               </div>
            </div>
          ))
        )}
      </div>
      
      {!loading && (
        <div className="mt-8 text-center">
           <Button onClick={() => fetchTips(activeCategory)} variant="secondary">Load New Tips</Button>
        </div>
      )}
    </div>
  );
};

export default Tips;