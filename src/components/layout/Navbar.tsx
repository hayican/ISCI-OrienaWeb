import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
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
    { id: 'kolaborasi', label: 'Kolaborasi' },
  ];

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${
          isScrolled ? 'px-4 sm:px-6 lg:px-8 pt-4' : 'px-0 pt-0'
        }`}
      >
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`w-full transition-all duration-500 ease-in-out ${
            isScrolled 
              ? 'max-w-6xl bg-[#FBF5DF]/90 backdrop-blur-lg shadow-xl shadow-[#8E322B]/10 rounded-[2rem] border-2 border-[#8E322B] py-2' 
              : 'max-w-full bg-[#FBF5DF]/95 backdrop-blur-md border-b-2 border-[#8E322B]/20 rounded-none py-0'
          }`}
        >
          <div className="px-6 md:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* LOGO */}
              <div 
                className="text-3xl font-jakarta font-black tracking-tighter text-[#8E322B] cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleNavigate('beranda')}
              >
                ORIENA.
              </div>

              {/* DESKTOP MENU */}
              <div className="hidden md:flex space-x-8 items-center font-jakarta font-bold text-lg uppercase tracking-wider">
                {navLinks.map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => handleNavigate(link.id)} 
                    className={`hover:text-[#CD6659] transition-colors relative py-2 ${
                      currentView === link.id ? 'text-[#CD6659]' : 'text-[#8E322B]'
                    }`}
                  >
                    {link.label}
                    {currentView === link.id && (
                      <motion.span 
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 w-full h-1 bg-[#CD6659] rounded-t-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* CART & MOBILE TOGGLE */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleNavigate('cart')}
                  className="relative p-2 text-[#8E322B] hover:text-[#CD6659] transition-all hover:scale-110 active:scale-95"
                >
                  <ShoppingBag size={24} strokeWidth={2.5} />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key={cartCount}
                        className="absolute top-0 right-0 bg-[#8E322B] text-[#E8CFA6] text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#FBF5DF] shadow-sm"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                
                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-2 text-[#8E322B] hover:text-[#CD6659] transition-colors" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                </button>
              </div>

            </div>
          </div>
        </motion.nav>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 bg-[#FBF5DF]/95 backdrop-blur-xl border-2 border-[#8E322B] rounded-[2rem] shadow-2xl overflow-hidden font-jakarta"
          >
            <div className="flex flex-col px-6 py-8 space-y-4 font-bold text-lg">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => handleNavigate(link.id)} 
                  className={`text-left py-2 px-4 rounded-xl transition-colors ${
                    currentView === link.id ? 'bg-[#8E322B]/10 text-[#CD6659]' : 'text-[#8E322B] hover:text-[#CD6659] hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              <div className="h-px bg-[#8E322B]/20 my-2"></div>
              
              <button 
                onClick={() => handleNavigate('cart')} 
                className="text-left py-3 text-[#E8CFA6] flex items-center gap-3 bg-[#8E322B] px-5 rounded-full w-full shadow-md active:scale-95 transition-transform"
              >
                <ShoppingBag size={20} strokeWidth={2.5} />
                Keranjang Belanja ({cartCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}