import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare } from 'lucide-react';

// ==========================================
// CUSTOM ICONS (Facebook Dihapus)
// ==========================================
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

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

  // Nomor WA Owner
  const waNumber = "628126120165";
  const waLink = `https://wa.me/${waNumber}?text=Halo%20Admin%20Oriena,%20saya%20mau%20tanya-tanya%20dong!`;

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
              
              {/* LINK INSTAGRAM - Ganti href-nya ya broskie! */}
              <a 
                href="https://www.instagram.com/pastrystick.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF5E9]/10 flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-all hover:scale-110 shadow-lg"
              >
                <InstagramIcon />
              </a>
              
              {/* LINK WHATSAPP */}
              <a 
                href={waLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF5E9]/10 flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-all hover:scale-110 shadow-lg"
              >
                <MessageSquare size={20} />
              </a>

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
                  16/04 no, Jl. Tanjungsari No.4B, Penambangan, Krembangan, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257
                </span>
              </li>
              
              {/* TEKS NOMOR JUGA BISA DIKLIK LANGSUNG KE WA */}
              <a 
                href={waLink}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Phone size={18} className="shrink-0 text-[#D97736] group-hover:animate-bounce" />
                <span className="group-hover:text-white transition-colors">+62 812-6120-165</span>
              </a>

            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-[#FAF5E9]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[#FAF5E9]/50 text-xs sm:text-sm">
          <p>© 2026 Oriena Artisan Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}