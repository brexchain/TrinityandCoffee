import { motion } from 'motion/react';
import { Puppy } from '../constants';

export interface PuppyCardProps {
  puppy: Puppy;
}

export function PuppyCard({ puppy }: PuppyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-[#262626] p-6 shadow-md border-l-4 border-[#8b5a2b] dark:border-gold transform -rotate-1 hover:rotate-0 transition-transform duration-300"
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
        
        <div className="bg-[rgba(139,90,43,0.05)] dark:bg-[rgba(212,175,55,0.05)] p-3 rounded-sm mt-4 font-mono text-xs space-y-1">
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
    </motion.div>
  );
}
