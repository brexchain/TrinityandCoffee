import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Pause, Download, ChartBar, TreePine, Camera, Quote, MessageCircle } from 'lucide-react';
import html2canvas from 'html2canvas';

import { PUPPIES, TIMELINE_EVENTS, WHATSAPP_CHATS, GALLERY_IMAGES } from './constants';
import { Polaroid } from './components/Polaroid';
import { PuppyCard } from './components/PuppyCard';
import { WeightChart } from './components/WeightChart';
import { FamilyTree } from './components/FamilyTree';

export default function App() {
  const [filter, setFilter] = useState('alle');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDogfatherMode, setIsDogfatherMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  // Easter Egg Logic
  const handleTitleClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 5) {
      setIsDogfatherMode(!isDogfatherMode);
      setClickCount(0);
      if (!isDogfatherMode) {
        setShowQuote(true);
        setTimeout(() => setShowQuote(false), 4000);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  useEffect(() => {
    if (isDogfatherMode) {
      document.body.classList.add('dogfather-mode');
    } else {
      document.body.classList.remove('dogfather-mode');
    }
  }, [isDogfatherMode]);

  // Export Logic
  const handleExport = useCallback(async (id: string, fileName: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const canvas = await html2canvas(element, {
      backgroundColor: isDogfatherMode ? '#1a1a1a' : '#f5f1e8',
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, [isDogfatherMode]);

  const filteredEvents = TIMELINE_EVENTS.filter(event => {
    if (filter === 'alle') return true;
    return event.tags.includes(filter) || event.title.toLowerCase().includes(filter) || event.caption.toLowerCase().includes(filter);
  });

  const filteredPuppies = PUPPIES.filter(puppy => {
    if (filter === 'alle') return true;
    if (['meilenstein', 'welpenbad', 'trinity'].includes(filter)) return false;
    return puppy.id === filter || puppy.tags.includes(filter);
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background Music Placeholders */}
      <audio id="bgMusic" loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      <audio id="dogfatherMusic" loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" />

      {/* Easter Egg Overlay */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[rgba(0,0,0,0.9)] text-gold"
          >
            <div className="max-w-xl text-center border-3 border-gold p-8 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.4)]">
              <Quote className="mx-auto mb-6 opacity-50" size={48} />
              <p className="font-display text-3xl mb-6">
                "Well done! ... You're hired!<br />
                Die überwacht jetzt nur mehr ... die Hack'n g'hört dir"
              </p>
              <p className="text-xl opacity-60">— +43 664 5107941, 16.12.25</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16" id="main-content">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-dashed border-[rgba(139,90,43,0.4)] pb-12 relative font-serif">
          <div className="text-left w-full md:w-auto">
            <motion.h1
              onClick={handleTitleClick}
              initial={{ rotate: -2, y: -20 }}
              animate={{ rotate: -1.5, y: 0 }}
              className="font-display text-7xl md:text-8xl text-accent dark:text-gold cursor-pointer select-none mb-2 hover:scale-105 transition-transform"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Trinity & Coffee
            </motion.h1>
            <p className="text-xl md:text-2xl opacity-80 italic pl-2 font-hand">Ein Wurf voller Wunder — Die Geschichte einer Reise</p>
          </div>
          <div className="text-right mt-6 md:mt-0">
            <div className="inline-block bg-accent dark:bg-gold text-paper dark:text-neutral-900 px-6 py-2 rounded-full font-bold transform rotate-3 shadow-lg">
              Wurfdatum: 28. September 2025
            </div>
          </div>
        </header>

        {/* Snapshot Gallery (Horizontal Swipe) */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-4xl text-accent dark:text-gold">Schnappschüsse</h2>
              <p className="text-sm italic opacity-60 font-hand">Die schönsten Momente im Querformat</p>
            </div>
            <div className="hidden md:flex gap-2">
               <span className="text-xs opacity-40 font-mono italic">← Swipe to explore →</span>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar -mx-4 px-4 mask-fade-edges">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 w-72 h-48 bg-white dark:bg-[#262626] p-2 shadow-xl border border-neutral-100 dark:border-neutral-800 snap-start"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-display">
                    {img.title}
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Call to action card at the end of the swipe */}
            <motion.a
              href="https://chat.whatsapp.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-72 h-48 bg-[#25D366] p-6 flex flex-col items-center justify-center text-center text-white shadow-xl snap-start cursor-pointer hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle size={40} className="mb-4" />
              <p className="font-display text-xl mb-1">Mehr Fotos?</p>
              <p className="text-xs opacity-90">Komm in unsere WhatsApp Gruppe!</p>
            </motion.a>
          </div>
        </section>

        {/* Dynamic Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar Area: Sticky Filter */}
          <aside className="md:col-span-3 space-y-8">
            <div className="sticky top-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b border-[rgba(58,50,38,0.2)] pb-2 mb-4 font-display">Die Rasselbande</h2>
                <nav className="flex flex-col gap-3">
                  {['alle', ...PUPPIES.filter(p => !['cora'].includes(p.id)).map(p => p.id), 'meilenstein', 'welpenbad', 'trinity'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilter(t)}
                      className={`
                        text-left px-5 py-2.5 rounded-lg font-hand text-lg capitalize transition-all duration-300 border-l-4
                        ${filter === t 
                          ? 'bg-[rgba(139,90,43,0.13)] border-[#8b5a2b] translate-x-2' 
                          : 'bg-[rgba(255,255,255,0.5)] border-transparent hover:border-[rgba(139,90,43,0.5)] hover:bg-white'}
                      `}
                    >
                      {t === 'alle' ? 'Alle 7 anzeigen' : t}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Mini Stats Card */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-[rgba(139,90,43,0.05)] border-2 border-dashed border-[rgba(139,90,43,0.2)] p-6 rounded-xl transform -rotate-1"
              >
                <p className="text-sm italic opacity-80 font-hand">
                  "Geduld zahlt sich aus. 7 Wunder erblicken das Licht."
                </p>
              </motion.div>
            </div>
          </aside>

          {/* Main Feed Area */}
          <main className="md:col-span-9 space-y-32">
            {/* Stats Summary - Now more prominent in the feed */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="paper-card"
            >
              <h3 className="text-xs uppercase tracking-widest text-accent dark:text-gold mb-6 opacity-60">Wachstums-Statistik</h3>
              <div className="space-y-8 max-w-lg mx-auto">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-hand"><span>Geburt (Gesamt)</span><span className="font-bold">2.7 kg</span></div>
                  <div className="w-full bg-[#e5e7eb] h-2.5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '10%' }} className="bg-[#8b5a2b] h-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-hand"><span>Woche 12 (Gesamt)</span><span className="font-bold">74.3 kg</span></div>
                  <div className="w-full bg-[#e5e7eb] h-2.5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} className="bg-[#8b5a2b] h-full" />
                  </div>
                </div>
                <p className="text-xl font-display text-accent dark:text-gold">+2.627% Team-Wachstum</p>
              </div>
            </motion.div>

            {/* Timeline Events */}
            <div className="space-y-48">
              {filteredEvents.map((event, idx) => (
                <div key={idx} className="relative group">
                  <div className="text-center mb-12">
                    <h2 className="font-display text-5xl text-accent dark:text-gold mb-3">{event.date}</h2>
                    <h3 className="text-2xl opacity-60 font-hand italic">{event.title}</h3>
                  </div>
                  <Polaroid 
                    image={event.image}
                    caption={event.caption}
                    quote={event.quote}
                    author={event.author}
                    rotation={idx % 2 === 0 ? 1.5 : -1.5}
                  />
                </div>
              ))}
            </div>

            {/* Charts Section */}
            {(filter === 'alle' || filter === 'statistik' || filter === 'meilenstein') && (
              <section id="charts-section" className="py-24 border-y-2 border-dashed border-[rgba(139,90,43,0.1)]">
                <div className="mb-12 text-center">
                  <h2 className="font-display text-5xl text-accent dark:text-gold mb-4">Gewichtskurve</h2>
                  <p className="opacity-60 italic">Die Reise von 2,7kg zu stolzen 74kg</p>
                </div>
                <WeightChart />
              </section>
            )}

            {/* Puppy Grid - Horizontal Cards */}
            <section className="py-24">
              <h2 className="text-center font-display text-6xl mb-20 italic underline decoration-[rgba(139,90,43,0.2)] decoration-wavy">Die Besatzung</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredPuppies.map((p) => (
                  <PuppyCard key={p.id} puppy={p} />
                ))}
              </div>
            </section>

            {/* Family Tree */}
            {(filter === 'alle' || filter === 'trinity') && (
              <section id="family-tree-section" className="py-24">
                <h2 className="text-center font-display text-6xl mb-20">Die Trinity-Dynastie</h2>
                <FamilyTree />
              </section>
            )}
          </main>
        </div>

        {/* WhatsApp Chat Section */}
        <section className="py-24 border-t border-[rgba(139,90,43,0.1)]">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl text-accent dark:text-gold mb-4">Stimmen aus der Community</h2>
            <p className="opacity-60 italic font-hand">Highlights aus der WhatsApp-Gruppe</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {WHATSAPP_CHATS.map((chat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(38,38,38,0.4)] p-6 rounded-2xl border border-[rgba(139,90,43,0.1)] shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[rgba(139,90,43,0.2)] group-hover:bg-[#8b5a2b] transition-colors" />
                <p className="font-hand text-lg mb-4 text-[rgba(58,50,38,0.8)]">"{chat.message}"</p>
                <div className="flex justify-between items-center text-xs opacity-50 font-mono">
                  <span>{chat.author}</span>
                  <span>{chat.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[rgba(37,211,102,0.1)] border-2 border-dashed border-[rgba(37,211,102,0.4)] p-8 rounded-3xl text-center shadow-lg"
          >
            <MessageCircle className="mx-auto mb-4 text-[#25D366]" size={48} />
            <h3 className="font-display text-3xl mb-4">Bleib auf dem Laufenden!</h3>
            <p className="font-hand text-xl mb-8 opacity-80">
              Folge Trinity und ihrer Rasselbande direkt auf WhatsApp für tägliche Updates und neue Fotos.
            </p>
            <a 
              href="https://chat.whatsapp.com/example" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-xl shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] transition-all"
            >
              WhatsApp Gruppe beitreten
            </a>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="mt-48 pt-12 border-t border-[rgba(139,90,43,0.2)] flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-6">
          <p className="font-hand italic">"Alle 7 gehen ihre eigenen Wege, alle Besitzer werden sich gegenseitig helfen" — C.S.</p>
          <div className="flex space-x-8 font-display text-lg">
            <span className="flex items-center gap-1">📸 Album Export</span>
            <span className="flex items-center gap-1">🌳 Stammbaum</span>
            <span className="flex items-center gap-1 text-[#8b5a2b] dark:text-gold">♪ Chopin aktiv</span>
          </div>
        </footer>
      </div>


      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[200]">
        <button
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="w-14 h-14 rounded-full bg-accent dark:bg-gold text-paper dark:text-neutral-900 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          {isMusicPlaying ? <Pause size={24} /> : <Music size={24} />}
        </button>
      </div>

      <div className="fixed bottom-6 left-6 flex gap-4 z-[200]">
        <button
          onClick={() => handleExport('charts-section', 'trinity-gewicht-chart')}
          className="flex items-center gap-2 bg-white dark:bg-[#262626] text-[#8b5a2b] dark:text-gold px-4 py-2 rounded-full border-2 border-[#8b5a2b] dark:border-gold shadow-xl hover:bg-[#8b5a2b] hover:text-white transition-all text-sm font-display"
        >
          <ChartBar size={18} /> Chart
        </button>
        <button
          onClick={() => handleExport('family-tree-section', 'trinity-stammbaum')}
          className="flex items-center gap-2 bg-white dark:bg-[#262626] text-[#8b5a2b] dark:text-gold px-4 py-2 rounded-full border-2 border-[#8b5a2b] dark:border-gold shadow-xl hover:bg-[#8b5a2b] hover:text-white transition-all text-sm font-display"
        >
          <TreePine size={18} /> Baum
        </button>
        <button
          onClick={() => handleExport('main-content', 'trinity-scrapbook-page')}
          className="flex items-center gap-2 bg-white dark:bg-[#262626] text-[#8b5a2b] dark:text-gold px-4 py-2 rounded-full border-2 border-[#8b5a2b] dark:border-gold shadow-xl hover:bg-[#8b5a2b] hover:text-white transition-all text-sm font-display"
        >
          <Camera size={18} /> Seite
        </button>
      </div>
    </div>
  );
}
