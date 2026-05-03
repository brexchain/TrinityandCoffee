import { motion } from 'motion/react';
import { Puppy } from '../constants';
import { Play, ExternalLink } from 'lucide-react';

export interface PuppyCardProps {
  puppy: Puppy;
  key?: string | number;
  onVideoClick?: (url: string) => void;
}

export function PuppyCard({ puppy, onVideoClick }: PuppyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-[#1a241a] p-6 shadow-md border-l-4 border-accent dark:border-gold transform -rotate-1 hover:rotate-0 transition-transform duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-display text-3xl text-accent dark:text-gold">
          {puppy.name} {puppy.emoji}
        </h3>
        <span className="text-xs uppercase tracking-widest opacity-40">
          {puppy.gender}
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <p><strong>Erkennung:</strong> {puppy.merkmale}</p>
        <p><strong>Besitzer:</strong> {puppy.besitzer}</p>
        
        <div className="bg-[rgba(45,90,39,0.05)] dark:bg-[rgba(244,208,63,0.05)] p-3 rounded-sm mt-4 font-mono text-xs space-y-1">
          {puppy.stats.geburtsgewicht && (
            <p>Geburt: <span className="text-accent dark:text-gold">{puppy.stats.geburtsgewicht}</span></p>
          )}
          {puppy.stats.nach24h && (
            <p>Nach 24h: <span className="text-accent dark:text-gold">{puppy.stats.nach24h}</span></p>
          )}
          <p>12 Wochen: <span className="text-accent dark:text-gold font-bold">{puppy.stats.wochen12}</span></p>
        </div>
      </div>
      
      {puppy.quote && (
        <p className="mt-4 italic text-sm opacity-60 text-right">
          "{puppy.quote}"
        </p>
      )}

      {puppy.videoUrl && (
        <div className="mt-6 flex gap-2">
          <motion.button
            onClick={() => onVideoClick?.(puppy.videoUrl!)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent text-white rounded-lg text-sm font-display uppercase tracking-widest hover:brightness-110 transition-colors"
          >
            <Play size={14} fill="white" />
            <span>Abspielen</span>
          </motion.button>
          <motion.a
            href={puppy.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 border-2 border-accent/20 text-accent rounded-lg hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-center"
            title="Auf Facebook/Instagram ansehen"
          >
            <ExternalLink size={20} />
          </motion.a>
        </div>
      )}
    </motion.div>
  );
}
