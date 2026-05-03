import { useState } from 'react';
import { motion, AnimatePresence, useIsPresent } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import ReactPlayer from 'react-player';

interface VideoModalProps {
  url: string | null;
  onClose: () => void;
}

function VideoPlayerWrapper({ url, isReady, setIsReady }: { url: string, isReady: boolean, setIsReady: (val: boolean) => void }) {
  const isPresent = useIsPresent();
  
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      controls
      playing={isReady && isPresent}
      onReady={() => setIsReady(true)}
      onError={(e) => console.error("ReactPlayer Error:", e)}
      config={{
        facebook: {
          appId: '', // You can add a FB app ID here if needed
          version: 'v12.0'
        }
      }}
    />
  );
}

export function VideoModal({ url, onClose }: VideoModalProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <AnimatePresence onExitComplete={() => setIsReady(false)}>
      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 flex items-center gap-2 px-4 shadow-lg group"
                title="Direkt auf Facebook/Instagram ansehen"
              >
                <span className="text-[10px] uppercase tracking-tighter font-display hidden group-hover:block">Extern öffnen</span>
                <ExternalLink size={20} />
              </a>
              <button
                onClick={onClose}
                className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 shadow-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="w-full h-full">
              <VideoPlayerWrapper url={url} isReady={isReady} setIsReady={setIsReady} />
            </div>
            
            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white/60 text-sm font-hand">Video wird geladen...</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
