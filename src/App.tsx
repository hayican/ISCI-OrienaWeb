import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Import Layout & UI
import LoadingScreen from './components/ui/LoadingScreen'; 
import Navbar from './components/layout/Navbar';

// Import Pages
import Beranda from './pages/Beranda';
import Tentang from './pages/Tentang';
import Katalog from './pages/Katalog'; // <-- UDAH DI IMPORT
// import HampersBuilder from './pages/HampersBuilder';
// import Kolaborasi from './pages/Kolaborasi';
// import Cart from './pages/Cart';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('beranda');
  const [cartCount, setCartCount] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'beranda': 
        return <Beranda key="beranda" setCurrentView={setCurrentView} setCartCount={setCartCount} />;
      case 'tentang': 
        return <Tentang key="tentang" />;
      case 'katalog': 
        return <Katalog key="katalog" setCartCount={setCartCount} />; // <-- UDAH DIPANGGIL
      
      // Sisanya masih dummy
      case 'hampers': 
        return <motion.div key="hampers" initial={{opacity: 0}} animate={{opacity: 1}} className="p-8 text-center text-2xl mt-20 font-playfair font-black">Halaman Rakit Hampers (Segera Hadir) 🎁</motion.div>;
      case 'kolaborasi': 
        return <motion.div key="kolaborasi" initial={{opacity: 0}} animate={{opacity: 1}} className="p-8 text-center text-2xl mt-20 font-playfair font-black">Halaman Kolaborasi (Segera Hadir) 🤝</motion.div>;
      case 'cart': 
        return <motion.div key="cart" initial={{opacity: 0}} animate={{opacity: 1}} className="p-8 text-center text-2xl mt-20 font-playfair font-black">Halaman Keranjang (Segera Hadir) 🛒</motion.div>;
      
      default: 
        return <Beranda key="default" setCurrentView={setCurrentView} setCartCount={setCartCount} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5E9] text-[#4A3022] font-jakarta selection:bg-[#D97736] selection:text-[#FAF5E9] overflow-x-hidden relative">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar 
            currentView={currentView} setCurrentView={setCurrentView}
            cartCount={cartCount}
            isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          <main className="min-h-[80vh]">
            <AnimatePresence mode="wait">
              {renderView()}
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
}