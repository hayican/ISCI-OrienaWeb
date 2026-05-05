import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  navigateTo: (page: string) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigateTo, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-[#FAF5E9]/90 backdrop-blur-md z-50 border-b border-[#4A3022]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="text-2xl font-black tracking-tighter text-[#D97736] cursor-pointer"
              onClick={() => handleNavigate('home')}
            >
              ORIENA.
            </div>

            <div className="hidden md:flex space-x-8 items-center font-medium">
              <button onClick={() => handleNavigate('home')} className={`hover:text-[#D97736] transition-colors ${currentPage === 'home' ? 'text-[#D97736]' : ''}`}>Beranda</button>
              <button onClick={() => handleNavigate('tentang')} className={`hover:text-[#D97736] transition-colors ${currentPage === 'tentang' ? 'text-[#D97736]' : ''}`}>Tentang</button>
              <button onClick={() => handleNavigate('katalog')} className={`hover:text-[#D97736] transition-colors ${currentPage === 'katalog' ? 'text-[#D97736]' : ''}`}>Katalog</button>
              <button onClick={() => handleNavigate('hampers')} className={`hover:text-[#D97736] transition-colors ${currentPage === 'hampers' ? 'text-[#D97736]' : ''}`}>Rakit Hampers</button>
              <button onClick={() => handleNavigate('kolaborasi')} className={`hover:text-[#D97736] transition-colors ${currentPage === 'kolaborasi' ? 'text-[#D97736]' : ''}`}>Kolaborasi</button>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleNavigate('cart')}
                className="relative p-2 text-[#4A3022] hover:text-[#D97736] transition-colors"
              >
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#D97736] text-[#FAF5E9] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#FAF5E9] border-b border-[#4A3022]/10 overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 space-y-4 font-medium">
                <button onClick={() => handleNavigate('home')} className="text-left py-2 hover:text-[#D97736]">Beranda</button>
                <button onClick={() => handleNavigate('tentang')} className="text-left py-2 hover:text-[#D97736]">Tentang</button>
                <button onClick={() => handleNavigate('katalog')} className="text-left py-2 hover:text-[#D97736]">Katalog</button>
                <button onClick={() => handleNavigate('hampers')} className="text-left py-2 hover:text-[#D97736]">Rakit Hampers</button>
                <button onClick={() => handleNavigate('kolaborasi')} className="text-left py-2 hover:text-[#D97736]">Kolaborasi</button>
                <button onClick={() => handleNavigate('cart')} className="text-left py-2 hover:text-[#D97736] flex items-center gap-2">
                  Keranjang ({cartCount})
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;