import { useState, useEffect } from 'react';
import { motion, } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setPct(p => {
        const next = p + (p < 60 ? 2.5 : p < 85 ? 1.2 : 0.6);
        if (next >= 100) {
          clearInterval(iv);
          setTimeout(onComplete, 600);
          return 100;
        }
        return next;
      });
    }, 25);
    return () => clearInterval(iv);
  }, [onComplete]);

  const msgs = [
    'Memanaskan Oven...',
    'Menguleni Adonan...',
    'Menambahkan Mentega...',
    'Hampir Matang...',
  ];
  const msgIdx = pct < 30 ? 0 : pct < 55 ? 1 : pct < 80 ? 2 : 3;

  const floatingItems = ['🍪', '🧁', '🥐', '🎂', '🍩', '🧀', '🧈'];

  return (
    <motion.div
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3E2318 0%, #4A3022 40%, #5C3D28 100%)',
      }}
    >
      {/* Ambient orbs */}
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ delay: i * 0.15, duration: 1.5 }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${180 + i * 120}px`,
            height: `${180 + i * 120}px`,
            background: '#D97736',
            filter: 'blur(70px)',
            left: `${5 + i * 22}%`,
            top: `${15 + i * 15}%`,
          }}
        />
      ))}

      {/* Floating emojis */}
      {phase >= 1 &&
        floatingItems.map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            animate={{
              opacity: 0.45,
              y: -60 - i * 25,
              rotate: (i % 2 === 0 ? 1 : -1) * 180,
              x: (i % 2 === 0 ? 1 : -1) * (15 + i * 18),
            }}
            transition={{ delay: 0.1 + i * 0.1, duration: 2.5, ease: 'easeOut' }}
            className="absolute text-3xl pointer-events-none select-none"
            style={{
              left: `${8 + i * 12}%`,
              bottom: '18%',
              filter: 'drop-shadow(0 0 12px rgba(217,119,54,0.6))',
            }}
          >
            {emoji}
          </motion.div>
        ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-7">
        {/* 3D spinning icon box */}
        <motion.div
          initial={{ scale: 0, rotateY: 0 }}
          animate={{ scale: 1, rotateY: 360 }}
          transition={{ duration: 1.0, ease: 'backOut' }}
          className="w-28 h-28 rounded-[2rem] flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #D97736, #c46a2b)',
            boxShadow: '0 20px 60px rgba(217,119,54,0.5)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        >
          <span className="text-5xl" style={{ animation: 'floatA 6s ease-in-out infinite' }}>
            🍪
          </span>
          {/* Steam particles */}
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/40"
              style={{
                top: '-8px',
                left: `${28 + i * 16}%`,
                animation: `steam 2s ease-out infinite`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </motion.div>

        {/* Logo */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              background:
                'linear-gradient(90deg,#D97736,#FAF5E9,#eab308,#D97736,#FAF5E9)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            ORIENA.
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="text-[#FAF5E9]/50 font-semibold tracking-[0.35em] uppercase text-xs"
        >
          Artisan Bakery & Hampers
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-72 md:w-96"
        >
          <div className="flex justify-between text-[#FAF5E9]/40 text-[11px] font-semibold mb-2 tracking-wide">
            <span>{msgs[msgIdx]}</span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="h-1 bg-[#FAF5E9]/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${pct}%`,
                background:
                  'linear-gradient(90deg, #D97736, #FAF5E9, #D97736)',
                backgroundSize: '200% auto',
                animation: 'bg-pan 2s linear infinite',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-[#FAF5E9]/25 text-[11px] font-medium tracking-widest uppercase"
      >
        © 2026 Oriena Artisan Bakery
      </motion.p>

      {/* Keyframe styles */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217,119,54,0); }
          50% { box-shadow: 0 0 30px 8px rgba(217,119,54,0.25); }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(4deg); }
          66% { transform: translateY(-7px) rotate(-2deg); }
        }
        @keyframes steam {
          0% { opacity: 0; transform: translateY(0) scale(0.8); }
          40% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-35px) scale(1.4); }
        }
        @keyframes shimmer {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes bg-pan {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
}