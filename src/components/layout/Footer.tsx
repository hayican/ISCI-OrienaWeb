import React from 'react';
import { MessageSquare, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  navigateTo: (page: string) => void;
}

// Komponen Pembantu untuk Icon Hati
const HeartIcon = () => (
  <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D97736] mx-1">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-[#4A3022] text-[#FAF5E9] pt-16 pb-8 rounded-t-[3rem] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2 space-y-6">
            <div className="text-3xl font-black tracking-tighter text-[#D97736]">
              ORIENA.
            </div>
            <p className="text-[#FAF5E9]/70 max-w-sm leading-relaxed">
              Memadukan resep artisan klasik dengan pengalaman digital modern. Setiap toples adalah cerita hangat dari oven kami untuk Anda.
            </p>
            <div className="flex space-x-4">
              {/* <button className="w-10 h-10 rounded-full bg-[#FAF5E9]/10 flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-colors">
                <Instagram size={20} />
              </button> */}
              <button className="w-10 h-10 rounded-full bg-[#FAF5E9]/10 flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-colors">
                <MessageSquare size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-[#D97736]">Jelajahi</h4>
            <ul className="space-y-3 font-medium text-[#FAF5E9]/80">
              <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Beranda</button></li>
              <li><button onClick={() => navigateTo('tentang')} className="hover:text-white transition-colors">Tentang Kami</button></li>
              <li><button onClick={() => navigateTo('katalog')} className="hover:text-white transition-colors">Katalog Menu</button></li>
              <li><button onClick={() => navigateTo('hampers')} className="hover:text-white transition-colors">Rakit Hampers Custom</button></li>
              <li><button onClick={() => navigateTo('kolaborasi')} className="hover:text-white transition-colors">Ruang Kolaborasi</button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-[#D97736]">Sapa Kami</h4>
            <ul className="space-y-4 text-[#FAF5E9]/80 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-[#D97736]" />
                <span>Jl. Artisan Bakery No. 12, Sidoarjo, Jawa Timur</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-[#D97736]" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#FAF5E9]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[#FAF5E9]/50 text-sm">
          <p>© 2026 Oriena Artisan Bakery. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <HeartIcon /> untuk WCC 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
