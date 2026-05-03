import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Pause, Download, ChartBar, TreePine, Camera, Quote, MessageCircle, Facebook, Settings, Plus, Trash2, Edit3, X, Save, Play } from 'lucide-react';
import html2canvas from 'html2canvas';

import { PUPPIES, TIMELINE_EVENTS, WHATSAPP_CHATS, GALLERY_IMAGES } from './constants';
import { Polaroid } from './components/Polaroid';
import { PuppyCard } from './components/PuppyCard';
import { WeightChart } from './components/WeightChart';
import { FamilyTree } from './components/FamilyTree';
import { VideoModal } from './components/VideoModal';

export default function App() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['alle']);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDogfatherMode, setIsDogfatherMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const sections = [
    { id: 'gallery-section', label: 'Schnappschüsse' },
    { id: 'story-section', label: 'Storyline' },
    { id: 'charts-section', label: 'Gewicht' },
    { id: 'puppy-section', label: 'Besatzung' },
    { id: 'family-tree-section', label: 'Stammbaum' },
    { id: 'community-section', label: 'Community' },
  ];

  // Filter Toggle Logic
  const toggleFilter = (t: string) => {
    if (t === 'alle') {
      setActiveFilters(['alle']);
      return;
    }

    const newFilters = activeFilters.includes(t)
      ? activeFilters.filter(f => f !== t)
      : [...activeFilters.filter(f => f !== 'alle'), t];

    setActiveFilters(newFilters.length === 0 ? ['alle'] : newFilters);
  };

  // Persistence logic for content
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('dog_chats');
    return saved ? JSON.parse(saved) : WHATSAPP_CHATS;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('dog_gallery');
    return saved ? JSON.parse(saved) : GALLERY_IMAGES;
  });

  useEffect(() => {
    localStorage.setItem('dog_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('dog_gallery', JSON.stringify(gallery));
  }, [gallery]);

  // Admin Actions
  const addChat = (msg: string, author: string) => {
    const newChat = { author, message: msg, date: new Date().toLocaleDateString('de-DE') };
    setChats([newChat, ...chats]);
  };

  const removeChat = (index: number) => {
    setChats(chats.filter((_: any, i: number) => i !== index));
  };

  const addImage = (url: string, title: string) => {
    setGallery([...gallery, { url, title }]);
  };

  const removeImage = (index: number) => {
    setGallery(gallery.filter((_: any, i: number) => i !== index));
  };

  // Music Playback Logic
  useEffect(() => {
    const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement;
    const dogfatherMusic = document.getElementById('dogfatherMusic') as HTMLAudioElement;
    
    if (!bgMusic || !dogfatherMusic) return;

    const playMusic = async (el: HTMLAudioElement) => {
      try {
        await el.play();
      } catch (err) {
        console.warn("Playback blocked or interrupted:", err);
        // Do not force state to false immediately as user might have to interact first
      }
    };

    if (isMusicPlaying) {
      if (isDogfatherMode) {
        bgMusic.pause();
        playMusic(dogfatherMusic);
      } else {
        dogfatherMusic.pause();
        playMusic(bgMusic);
      }
    } else {
      bgMusic.pause();
      dogfatherMusic.pause();
    }
  }, [isMusicPlaying, isDogfatherMode]);

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
      backgroundColor: isDogfatherMode ? '#0f140f' : '#f0f7f0',
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, [isDogfatherMode]);

  const filteredEvents = TIMELINE_EVENTS.filter(event => {
    if (activeFilters.includes('alle')) return true;
    return event.tags.some(tag => activeFilters.includes(tag)) || 
           activeFilters.some(f => event.title.toLowerCase().includes(f.toLowerCase()) || event.caption.toLowerCase().includes(f.toLowerCase()));
  });

  const filteredPuppies = PUPPIES.filter(puppy => {
    if (activeFilters.includes('alle')) return true;
    // If selecting specific tags like 'welpenbad', don't show puppies directly unless they match
    const showsPuppy = activeFilters.some(f => puppy.id === f || puppy.tags.includes(f));
    return showsPuppy;
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

      {/* Video Modal */}
      <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />

      {/* Floating Mobile Nav */}
      <div className="fixed bottom-6 right-6 z-[600] md:hidden">
        <motion.div
          className="flex flex-col gap-2 pointer-events-none"
        >
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="pointer-events-auto flex flex-col gap-2 mb-2"
              >
                {sections.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-accent text-white p-3 rounded-full shadow-lg flex items-center justify-center whitespace-nowrap"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest mr-2 pl-2">
                       {s.label}
                    </span>
                    <div className="w-2 h-2 bg-white rounded-full mr-1" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="pointer-events-auto w-14 h-14 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Settings size={24} />}
          </button>
        </motion.div>
      </div>

      {/* Fast Navigation Bar (Desktop & Tablet) */}
      <div className="fixed top-0 left-0 right-0 z-[500] bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border-b border-accent/10 h-12 flex items-center justify-center gap-4 md:gap-8 text-[10px] uppercase tracking-widest font-display overflow-x-auto no-scrollbar px-6 shadow-sm">
        <div className="flex items-center gap-4 min-w-max">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="hover:text-accent transition-colors whitespace-nowrap p-2 relative group"
            >
              {s.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-[500] p-3 bg-white/50 backdrop-blur-md border border-accent/20 rounded-full shadow-md text-accent hover:bg-accent hover:text-white transition-all hidden md:flex"
      >
        <Plus size={20} className="rotate-45" />
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24" id="main-content">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-dashed border-[rgba(45,90,39,0.3)] pb-12 relative font-serif">
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
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mt-2">
              <p className="text-xl md:text-2xl opacity-80 italic font-hand">Ein Wurf voller Wunder — Die Geschichte einer Reise</p>
              <div className="flex gap-2">
                <a 
                  href="https://chat.whatsapp.com/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#25D366] text-white rounded-full hover:rotate-12 transition-all shadow-md flex items-center gap-2 px-4"
                >
                  <MessageCircle size={18} />
                  <span className="text-sm font-bold">WhatsApp</span>
                </a>
                <a 
                  href="https://facebook.com/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1877F2] text-white rounded-full hover:-rotate-12 transition-all shadow-md flex items-center gap-2 px-4"
                >
                  <Facebook size={18} />
                  <span className="text-sm font-bold">Facebook</span>
                </a>
                <button 
                  onClick={() => setIsAdmin(!isAdmin)}
                  className={`p-2 rounded-full transition-all shadow-md ${isAdmin ? 'bg-accent text-white scale-110 shadow-[0_0_15px_rgba(45,90,39,0.4)]' : 'bg-white/50 text-gray-400 opacity-40 hover:opacity-100'}`}
                  title="Admin Modus"
                >
                  <Settings size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="text-right mt-6 md:mt-0">
            <div className="inline-block bg-accent dark:bg-gold text-paper dark:text-neutral-900 px-6 py-2 rounded-full font-bold transform rotate-3 shadow-lg">
              Wurfdatum: 28. September 2025
            </div>
          </div>
        </header>

        {/* Snapshot Gallery (Horizontal Swipe) */}
        <section className="mb-24" id="gallery-section">
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
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-shrink-0 w-72 h-48 bg-white/20 dark:bg-white/5 border-2 border-dashed border-accent select-none flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-white/30 transition-colors"
                onClick={() => {
                  const url = prompt('Bild URL eingeben:');
                  const title = prompt('Titel eingeben:');
                  if (url && title) addImage(url, title);
                }}
              >
                <Plus size={40} className="text-accent mb-2" />
                <p className="font-display text-sm uppercase translate-y-1">Bild hinzufügen</p>
              </motion.div>
            )}
            {gallery.map((img: any, i: number) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => img.type === 'video' ? setActiveVideo(img.url) : null}
                className={`flex-shrink-0 w-72 h-48 bg-white dark:bg-[#262626] p-2 shadow-xl border border-neutral-100 dark:border-neutral-800 snap-start relative group ${img.type === 'video' ? 'cursor-pointer' : ''}`}
              >
                {isAdmin && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                    className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <div className="relative w-full h-full overflow-hidden">
                  <img 
                    src={img.type === 'video' ? img.thumbnail : img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {img.type === 'video' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50 mb-2">
                        <Play size={24} fill="white" />
                      </div>
                      <a 
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/10 hover:bg-white/20 p-1.5 rounded-md text-[8px] uppercase tracking-tighter text-white border border-white/20 backdrop-blur-sm flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ExternalLink size={10} />
                        Extern öffnen
                      </a>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-display">
                    {img.title} {img.type === 'video' ? '(Video)' : ''}
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
                <h2 className="text-2xl font-bold border-b border-[rgba(26,43,26,0.15)] pb-2 mb-6 font-display flex items-center justify-between">
                  <span>Die Rasselbande</span>
                  {activeFilters.length > 1 && !activeFilters.includes('alle') && (
                    <button 
                      onClick={() => setActiveFilters(['alle'])}
                      className="text-[10px] uppercase tracking-widest text-accent font-sans opacity-60 hover:opacity-100 transition-opacity"
                    >
                      Reset
                    </button>
                  )}
                </h2>
                
                <div className="grid grid-cols-4 gap-2 mb-8">
                  <button
                    onClick={() => toggleFilter('alle')}
                    className={`col-span-4 py-2 rounded-lg font-hand text-lg transition-all duration-300 border-2 ${
                      activeFilters.includes('alle') 
                        ? 'bg-accent text-white border-accent' 
                        : 'bg-white/50 border-transparent hover:border-accent/30'
                    }`}
                  >
                    Alle anzeigen
                  </button>
                  
                  {PUPPIES.filter(p => p.id !== 'cora').map((p) => {
                    const isSelected = activeFilters.includes(p.id);
                    return (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFilter(p.id)}
                        className={`
                          relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 border-2
                          ${isSelected 
                            ? 'bg-accent/10 border-accent scale-105 shadow-md' 
                            : 'bg-white/50 border-transparent grayscale-[0.5] opacity-70 hover:grayscale-0 hover:opacity-100'}
                        `}
                      >
                        <span className="text-2xl mb-1">{p.emoji}</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter truncate w-full text-center">{p.name}</span>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-2">Themen & Events</p>
                  <div className="flex flex-wrap gap-2">
                    {['meilenstein', 'welpenbad', 'trinity'].map((t) => {
                      const isSelected = activeFilters.includes(t);
                      return (
                        <button
                          key={t}
                          onClick={() => toggleFilter(t)}
                          className={`
                            px-3 py-1 rounded-full font-hand transition-all duration-300 border
                            ${isSelected 
                              ? 'bg-accent text-white border-accent' 
                              : 'bg-white/50 border-transparent hover:border-accent/30 text-ink/70'}
                          `}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mini Stats Card */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-[rgba(45,90,39,0.05)] border-2 border-dashed border-[rgba(45,90,39,0.15)] p-6 rounded-xl transform -rotate-1"
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
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '10%' }} className="bg-accent h-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-hand"><span>Woche 12 (Gesamt)</span><span className="font-bold">74.3 kg</span></div>
                  <div className="w-full bg-[#e5e7eb] h-2.5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} className="bg-accent h-full" />
                  </div>
                </div>
                <p className="text-xl font-display text-accent dark:text-gold">+2.627% Team-Wachstum</p>
              </div>
            </motion.div>

            {/* Timeline Events */}
            <div className="space-y-48" id="story-section">
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
                    link={(event as any).link}
                    onClick={() => {
                      const link = (event as any).link;
                      if (link && (link.includes('fb.watch') || link.includes('instagram.com/reel') || link.includes('facebook.com/permalink'))) {
                        setActiveVideo(link);
                      } else if (link) {
                         window.open(link, '_blank');
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Charts Section */}
            {(activeFilters.includes('alle') || activeFilters.includes('statistik') || activeFilters.includes('meilenstein')) && (
              <section id="charts-section" className="py-24 border-y-2 border-dashed border-[rgba(45,90,39,0.1)]">
                <div className="mb-12 text-center">
                  <h2 className="font-display text-5xl text-accent dark:text-gold mb-4">Gewichtskurve</h2>
                  <p className="opacity-60 italic">Die Reise von 2,7kg zu stolzen 74kg</p>
                </div>
                <WeightChart />
              </section>
            )}

            {/* Puppy Grid - Horizontal Cards */}
            <section className="py-24" id="puppy-section">
              <h2 className="text-center font-display text-6xl mb-20 italic underline decoration-[rgba(45,90,39,0.2)] decoration-wavy">Die Besatzung</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredPuppies.map((p) => (
                  <PuppyCard key={p.id} puppy={p} onVideoClick={setActiveVideo} />
                ))}
              </div>
            </section>

            {/* Family Tree */}
            {(activeFilters.includes('alle') || activeFilters.includes('trinity')) && (
              <section id="family-tree-section" className="py-24">
                <h2 className="text-center font-display text-6xl mb-20">Die Trinity-Dynastie</h2>
                <FamilyTree />
              </section>
            )}
          </main>
        </div>

        {/* WhatsApp Chat Section */}
        <section className="py-24 border-t border-[rgba(45,90,39,0.1)]" id="community-section">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl text-accent dark:text-gold mb-4">Stimmen aus der Community</h2>
            <p className="opacity-60 italic font-hand">Highlights aus der WhatsApp-Gruppe</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/20 dark:bg-white/5 border-2 border-dashed border-accent p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/30 transition-colors h-full"
                onClick={() => {
                  const author = prompt('Name oder Nummer:');
                  const msg = prompt('Nachricht:');
                  if (author && msg) addChat(msg, author);
                }}
              >
                <Plus size={32} className="text-accent mb-2" />
                <p className="font-display text-sm uppercase">Zitat hinzufügen</p>
              </motion.div>
            )}
            {chats.map((chat: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(15,20,15,0.4)] p-6 rounded-2xl border border-[rgba(45,90,39,0.1)] shadow-sm relative overflow-hidden group"
              >
                {isAdmin && (
                  <button 
                    onClick={() => removeChat(i)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
                <div className="absolute top-0 left-0 w-1 h-full bg-[rgba(45,90,39,0.2)] group-hover:bg-accent transition-colors" />
                <p className="font-hand text-lg mb-4 text-ink opacity-90">"{chat.message}"</p>
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
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a 
                href="https://chat.whatsapp.com/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-xl shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] transition-all"
              >
                <MessageCircle size={24} />
                WhatsApp Gruppe beitreten
              </a>
              <a 
                href="https://facebook.com/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#1877F2] text-white px-8 py-4 rounded-full font-bold text-xl shadow-[0_4px_20px_rgba(24,119,242,0.4)] hover:bg-[#145DB2] transition-all"
              >
                <Facebook size={24} />
                Facebook Seite folgen
              </a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="mt-48 pt-12 border-t border-[rgba(45,90,39,0.15)] flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-6">
          <p className="font-hand italic">"Alle 7 gehen ihre eigenen Wege, alle Besitzer werden sich gegenseitig helfen" — C.S.</p>
          <div className="flex space-x-8 font-display text-lg">
            <span className="flex items-center gap-1">📸 Album Export</span>
            <span className="flex items-center gap-1">🌳 Stammbaum</span>
            <span className="flex items-center gap-1 text-accent dark:text-gold">♪ Chopin aktiv</span>
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
          className="flex items-center gap-2 bg-white dark:bg-[#1a241a] text-accent dark:text-gold px-4 py-2 rounded-full border-2 border-accent dark:border-gold shadow-xl hover:bg-accent hover:text-white transition-all text-sm font-display"
        >
          <ChartBar size={18} /> Chart
        </button>
        <button
          onClick={() => handleExport('family-tree-section', 'trinity-stammbaum')}
          className="flex items-center gap-2 bg-white dark:bg-[#1a241a] text-accent dark:text-gold px-4 py-2 rounded-full border-2 border-accent dark:border-gold shadow-xl hover:bg-accent hover:text-white transition-all text-sm font-display"
        >
          <TreePine size={18} /> Baum
        </button>
        <button
          onClick={() => handleExport('main-content', 'trinity-scrapbook-page')}
          className="flex items-center gap-2 bg-white dark:bg-[#1a241a] text-accent dark:text-gold px-4 py-2 rounded-full border-2 border-accent dark:border-gold shadow-xl hover:bg-accent hover:text-white transition-all text-sm font-display"
        >
          <Camera size={18} /> Seite
        </button>
      </div>
    </div>
  );
}
