import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';
import { PUPPIES } from '../constants';

interface Enkel {
  id: number;
  name: string;
  parent: string;
  family: string;
}

export function FamilyTree() {
  const [enkel, setEnkel] = useState<Enkel[]>([]);

  const addEnkel = () => {
    const name = prompt("Name des Enkels?");
    const parent = prompt("Elternteil? (z.B. Bounty)");
    const family = prompt("Neue Familie?");

    if (name && parent) {
      setEnkel([...enkel, {
        id: Date.now(),
        name,
        parent,
        family: family || 'Unbekannt'
      }]);
    }
  };

  const removeEnkel = (id: number) => {
    setEnkel(enkel.filter(e => e.id !== id));
  };

  return (
    <div className="py-12 px-4 bg-[rgba(255,255,255,0.4)] dark:bg-[#171717] shadow-inner rounded-xl border border-[rgba(139,90,43,0.13)]">
      <div className="text-center mb-12">
        <div className="inline-block border-3 border-[#8b5a2b] dark:border-gold p-6 rounded-lg transform -rotate-1 bg-white dark:bg-[#262626] shadow-lg">
          <p className="font-bold text-lg mb-1 uppercase tracking-widest opacity-60">Eltern</p>
          <p className="text-2xl font-display">Coffee (Papa) & Trinity van Bella (Mama)</p>
        </div>
        <div className="text-4xl text-accent dark:text-gold my-4 animate-bounce">↓</div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-20 px-8">
        {PUPPIES.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-[#262626] border-l-4 border-accent dark:border-gold p-4 px-6 rounded shadow-lg min-w-[200px] text-left transform hover:rotate-0 transition-transform"
            style={{ rotate: `${Math.random() * 4 - 2}deg` }}
          >
            <p className="font-bold text-accent dark:text-gold text-lg">#{i+1} {p.name}</p>
            <p className="text-xs font-hand opacity-60 italic">{p.gender}</p>
            <p className="text-xs mt-2 font-mono whitespace-nowrap">{p.stats.geburtsgewicht} → {p.stats.wochen12}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl text-accent dark:text-gold mb-4">↓</div>
        <p className="font-display text-2xl opacity-50 italic">Hier könnten deine Enkel stehen...</p>
        <button
          onClick={addEnkel}
          className="mt-6 inline-flex items-center gap-2 bg-[#8b5a2b] dark:bg-gold text-[#f5f1e8] dark:text-neutral-900 px-6 py-3 rounded-full font-display text-xl shadow-lg hover:scale-105 transition-transform"
        >
          <Plus size={24} /> Enkel hinzufügen
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <AnimatePresence>
          {enkel.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="bg-[rgba(139,90,43,0.1)] dark:bg-[rgba(212,175,55,0.1)] border-2 border-dashed border-[#8b5a2b] dark:border-gold p-5 rounded-xl shadow-sm min-w-[150px] relative group"
            >
              <button
                onClick={() => removeEnkel(e.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
              <div className="text-3xl mb-2 text-center">🐾</div>
              <p className="font-bold text-center text-lg">{e.name}</p>
              <div className="mt-2 text-xs border-t border-[rgba(139,90,43,0.2)] pt-2 space-y-1">
                <p><span className="opacity-60">Kind von:</span> {e.parent}</p>
                <p><span className="opacity-60">Familie:</span> {e.family}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
