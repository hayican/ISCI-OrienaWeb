import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';

// Definisikan tipe props karena kita pakai TypeScript
interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartCount: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({
  currentView,
  setCurrentView,
  cartCount,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Logic buat deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      // Kalau di-scroll lebih dari 50px ke bawah, navbar jadi floating
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'katalog', label: 'Katalog' },
    { id: 'hampers', label: 'Rakit Hampers' },
    { id: 'kolaborasi', label: 'Kolaborasi' },
  ];

  return (
    <>
      {/* 
        Bungkus nav pakai fixed z-50 dan tambahin transisi.
        Kalau isScrolled true, kita kasih padding/margin atas dan persempit max-width-nya.
      */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out px-4 sm:px-6 lg:px-8 ${
          isScrolled ? 'pt-4' : 'pt-0 px-0 sm:px-0 lg:px-0'
        }`}
      >
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`w-full transition-all duration-500 ease-in-out ${
            isScrolled 
              ? 'max-w-6xl bg-[#FAF5E9]/80 backdrop-blur-lg shadow-xl shadow-[#4A3022]/10 rounded-[2rem] border border-white/50 py-2' 
              : 'max-w-full bg-[#FAF5E9]/95 backdrop-blur-md border-b border-[#4A3022]/10 rounded-none py-0'
          }`}
        >
          <div className="px-6 md:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* LOGO */}
              <div 
                className="text-2xl font-playfair font-black tracking-tighter text-[#D97736] cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleNavigate('beranda')}
              >
                ORIENA.
              </div>

              {/* DESKTOP MENU */}
              <div className="hidden md:flex space-x-8 items-center font-jakarta font-bold text-sm uppercase tracking-wider">
                {navLinks.map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => handleNavigate(link.id)} 
                    className={`hover:text-[#D97736] transition-colors relative py-2 ${
                      currentView === link.id ? 'text-[#D97736]' : 'text-[#4A3022]'
                    }`}
                  >
                    {link.label}
                    {currentView === link.id && (
                      <motion.span 
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 w-full h-1 bg-[#D97736] rounded-t-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* CART & MOBILE TOGGLE */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleNavigate('cart')}
                  className="relative p-2 text-[#4A3022] hover:text-[#D97736] transition-all hover:scale-110 active:scale-95"
                >
                  <ShoppingBag size={24} />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key={cartCount}
                        className="absolute top-0 right-0 bg-[#D97736] text-[#FAF5E9] text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#FAF5E9] shadow-sm"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                
                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-2 text-[#4A3022] hover:text-[#D97736] transition-colors" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

            </div>
          </div>
        </motion.nav>
      </div>

      {/* MOBILE MENU DROPDOWN (GLASSMORPHISM) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 bg-[#FAF5E9]/95 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl overflow-hidden font-jakarta"
          >
            <div className="flex flex-col px-6 py-8 space-y-4 font-bold text-lg">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => handleNavigate(link.id)} 
                  className={`text-left py-2 px-4 rounded-xl transition-colors ${
                    currentView === link.id ? 'bg-[#D97736]/10 text-[#D97736]' : 'text-[#4A3022] hover:text-[#D97736] hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              <div className="h-px bg-[#4A3022]/10 my-2"></div>
              
              <button 
                onClick={() => handleNavigate('cart')} 
                className="text-left py-3 text-white flex items-center gap-3 bg-[#D97736] px-5 rounded-xl w-full shadow-md active:scale-95 transition-transform"
              >
                <ShoppingBag size={20} />
                Keranjang Belanja ({cartCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
