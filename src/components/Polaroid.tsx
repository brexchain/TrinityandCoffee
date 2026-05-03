import { motion } from 'motion/react';
import { ExternalLink, Play } from 'lucide-react';

interface PolaroidProps {
  image: string;
  caption: string;
  quote?: string;
  author?: string;
  rotation?: number;
  link?: string;
  onClick?: () => void;
}

export function Polaroid({ image, caption, quote, author, rotation = 0, link, onClick }: PolaroidProps) {
  const isVideo = link && (link.includes('fb.watch') || link.includes('instagram.com/reel') || link.includes('facebook.com'));

  const handleMainClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      className="polaroid w-full max-w-xl mx-auto my-12 cursor-pointer group"
      onClick={handleMainClick}
    >
      <div className="relative overflow-hidden bg-[#e5e7eb] border border-[#f5f5f5]">
        <img
          src={image}
          alt={caption}
          className="w-full h-96 object-cover grayscale-[0.2] transition-all group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 pointer-events-none bg-[rgba(45,90,39,0.05)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {isVideo && (
            <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50">
              <Play size={32} fill="white" />
            </div>
          )}
        </div>
        
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleExternalClick}
            className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white text-accent rounded-full backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
            title="Extern öffnen"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      <div className="pt-8 text-center pb-8">
        <p className="text-3xl text-ink" style={{ fontFamily: "'Brush Script MT', cursive" }}>{caption}</p>
        {quote && (
          <div className="mt-4 border-t border-[rgba(45,90,39,0.1)] pt-4 px-8">
            <p className="italic text-lg text-[rgba(26,43,26,0.6)] font-hand leading-relaxed">"{quote}"</p>
            {author && <p className="text-sm opacity-40 mt-2 font-hand">— {author}</p>}
          </div>
        )}
        {link && !isVideo && (
          <div className="mt-4 text-accent font-hand text-sm underline decoration-accent/30">
            Beitrag ansehen →
          </div>
        )}
        {isVideo && (
          <div className="mt-4 text-accent font-hand text-sm flex items-center justify-center gap-2">
            <Play size={12} fill="currentColor" />
            <span>Video abspielen</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
