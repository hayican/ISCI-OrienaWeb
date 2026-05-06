    import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare } from 'lucide-react';

// ==========================================
// CUSTOM ICONS (Karena Lucide hapus icon sosmed)
// ==========================================
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D97736] mx-1 animate-pulse">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

// ==========================================
// INTERFACE & COMPONENT
// ==========================================
interface FooterProps {
  setCurrentView: (view: string) => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#4A3022] text-[#FAF5E9] pt-16 pb-8 rounded-t-[3rem] mt-12 relative overflow-hidden font-jakarta">
      {/* Background Texture Tipis */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Kolom 1 & 2: Branding */}
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              whileHover={{ scale: 1.05, originX: 0 }}
              className="text-4xl font-playfair font-black tracking-tighter text-[#D97736] cursor-pointer w-max"
              onClick={() => handleNavigate('beranda')}
            >
              ORIENA.
            </motion.div>
            <p className="text-[#FAF5E9]/70 max-w-sm leading-relaxed text-sm md:text-base">
              Memadukan resep artisan klasik dengan pengalaman digital modern. Setiap toples adalah cerita hangat dari oven kami untuk Anda.
            </p>
            <div className="flex space-x-4 pt-2">
              <button className="w-10 h-10 rounded-full bg-[#FAF5E9]/10 flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-all hover:scale-110 shadow-lg">
                <InstagramIcon />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#FAF5E9]/10 flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-all hover:scale-110 shadow-lg">
                <FacebookIcon />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#FAF5E9]/10 flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-all hover:scale-110 shadow-lg">
                <MessageSquare size={20} />
              </button>
            </div>
          </div>

          {/* Kolom 3: Navigasi */}
          <div className="space-y-6">
            <h4 className="text-xl font-playfair font-bold text-[#D97736]">Jelajahi</h4>
            <ul className="space-y-3 font-medium text-[#FAF5E9]/80 text-sm md:text-base">
              {['beranda', 'tentang', 'katalog', 'hampers', 'kolaborasi'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNavigate(item)} 
                    className="hover:text-white hover:translate-x-2 transition-all capitalize"
                  >
                    {item === 'hampers' ? 'Rakit Hampers' : item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="space-y-6">
            <h4 className="text-xl font-playfair font-bold text-[#D97736]">Sapa Kami</h4>
            <ul className="space-y-4 text-[#FAF5E9]/80 text-sm">
              <li className="flex items-start gap-3 group cursor-pointer">
                <MapPin size={18} className="shrink-0 text-[#D97736] group-hover:animate-bounce mt-1" />
                <span className="group-hover:text-white transition-colors leading-relaxed">
                  Jl. Artisan Bakery No. 12, Sidoarjo, Jawa Timur
                </span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <Phone size={18} className="shrink-0 text-[#D97736] group-hover:animate-bounce" />
                <span className="group-hover:text-white transition-colors">+62 812-3456-7890</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-[#FAF5E9]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[#FAF5E9]/50 text-xs sm:text-sm">
          <p>© 2026 Oriena Artisan Bakery. All rights reserved.</p>
          <p className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
            Dibuat dengan <HeartIcon /> untuk WCC 2026
          </p>
        </div>
      </div>
    </footer>
  );
}