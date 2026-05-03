import { motion } from 'motion/react';

interface PolaroidProps {
  image: string;
  caption: string;
  quote?: string;
  author?: string;
  rotation?: number;
}

export function Polaroid({ image, caption, quote, author, rotation = 0 }: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      className="polaroid w-full max-w-xl mx-auto my-12 cursor-pointer group"
    >
      <div className="relative overflow-hidden bg-[#e5e7eb] border border-[#f5f5f5]">
        <img
          src={image}
          alt={caption}
          className="w-full h-96 object-cover grayscale-[0.2] transition-all group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 pointer-events-none bg-[rgba(139,90,43,0.05)] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="pt-8 text-center">
        <p className="text-3xl text-ink" style={{ fontFamily: "'Brush Script MT', cursive" }}>{caption}</p>
        {quote && (
          <div className="mt-4 border-t border-[rgba(139,90,43,0.1)] pt-4 px-8">
            <p className="italic text-lg text-[rgba(58,50,38,0.7)] font-hand leading-relaxed">"{quote}"</p>
            {author && <p className="text-sm opacity-40 mt-2 font-hand">— {author}</p>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
