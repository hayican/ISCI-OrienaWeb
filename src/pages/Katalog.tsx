import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowRight, ShoppingBag, Cookie, Tag, Coffee, ChevronDown, X, Star } from 'lucide-react';

interface KatalogProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  image: string;
  badge?: string;
  gridClass?: string;
}

// Custom Hook untuk Efek 3D Card
function use3DTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });
  return { tilt, handleMouseMove, handleMouseLeave };
}

export default function Katalog({ setCartCount }: KatalogProps) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filters = ['Semua', 'Kering', 'Basah', 'Hampers'];

  const tiltPromo1 = use3DTilt();
  const tiltPromo2 = use3DTilt();

  // Data Produk
  const bentoProducts: Product[] = [
    { id: 1, name: "Kastengel Royal", category: "Kering", price: 95000, desc: "Keju edam asli, full butter. Garing di luar, keju edam yang pecah dan lumer di gigitan pertama.", gridClass: "md:col-span-2 md:row-span-2 h-[300px] md:h-[624px]", badge: "BEST SELLER", image: "https://images.unsplash.com/photo-1605335135706-9076f827a1fc?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Nastar Classic", category: "Kering", price: 85000, desc: "Selai nanas homemade lumer yang dibuat perlahan dengan rempah pilihan.", gridClass: "md:col-span-1 md:row-span-1 h-[300px]", image: "https://images.unsplash.com/photo-1590080874088-eec64895e423?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "Almond Crispy", category: "Kering", price: 65000, desc: "Tipis, renyah, manis pas. Cocok banget buat nemenin ngopi sore.", gridClass: "md:col-span-1 md:row-span-1 h-[300px]", image: "https://images.unsplash.com/photo-1600431562968-ef337c8733ed?auto=format&fit=crop&q=80&w=600" },
    { id: 4, name: "Choco Cheese Pastry", category: "Basah", price: 45000, desc: "Flaky pastry dengan isian lumer cokelat Belgia dan keju gurih.", gridClass: "md:col-span-2 md:row-span-1 h-[300px]", badge: "NEW", image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Paket Hampers Lebaran", category: "Hampers", price: 250000, desc: "Isi 3 toples bebas pilih. Packaging hardbox eksklusif dengan kartu ucapan.", gridClass: "md:col-span-1 md:row-span-2 h-[300px] md:h-[624px]", badge: "SPESIAL", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600" },
    { id: 7, name: "Sagu Keju Lumer", category: "Kering", price: 75000, desc: "Tekstur ngeprul yang ngangenin, lumer begitu masuk mulut.", gridClass: "md:col-span-1 md:row-span-1 h-[300px]", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600" },
  ];

  const regularProducts: Product[] = [
    { id: 11, name: "Palm Cheese Cookies", category: "Kering", price: 85000, desc: "Balutan gula aren asli dan gurihnya keju.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400" },
    { id: 14, name: "Croissant Butter", category: "Basah", price: 25000, desc: "Flaky dan buttery, cocok disandingkan dengan teh.", image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=400" },
    { id: 16, name: "Hampers Mini", category: "Hampers", price: 150000, desc: "Paket ekonomis isi 2 toples kecil.", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=400" },
    { id: 17, name: "Oatmeal Raisin", category: "Kering", price: 65000, desc: "Cookies gandum sehat dengan kismis manis.", image: "https://images.unsplash.com/photo-1600431562217-1563e41c4a04?auto=format&fit=crop&q=80&w=400" },
    { id: 20, name: "Brownie Bites", category: "Basah", price: 50000, desc: "Potongan brownies fudgy sekali hap.", image: "https://images.unsplash.com/photo-1606822819825-f370ee1c1b18?auto=format&fit=crop&q=80&w=400" },
  ];

  const filterLogic = (product: Product) => {
    const matchCategory = activeFilter === 'Semua' || product.category === activeFilter;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  };

  const filteredBento = bentoProducts.filter(filterLogic);
  const filteredRegular = regularProducts.filter(filterLogic);
  const heroImage = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=2000";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24">
      {/* HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[400px] mb-12 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Katalog Oriena" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5E9] via-[#4A3022]/60 to-[#4A3022]/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16 md:mt-0">
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100 }} className="text-4xl md:text-6xl font-playfair font-black text-white mb-4 drop-shadow-lg">
            Koleksi <span className="text-[#D97736]">Penuh Rasa.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg font-jakarta text-white/90 font-medium drop-shadow-md">
            Eksplorasi mahakarya oven kami. Temukan pendamping momen spesialmu di sini.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEARCH & FILTER */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-6 mb-16">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A3022]/50" size={20} />
            <input type="text" placeholder="Cari nastar, kastengel..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full font-jakarta bg-white border-2 border-[#FAF5E9] focus:border-[#D97736] rounded-full py-4 pl-12 pr-4 outline-none text-[#4A3022] font-medium shadow-sm transition-colors placeholder:text-[#4A3022]/40" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-6 py-2.5 rounded-full font-jakarta font-bold text-sm transition-all duration-300 ${activeFilter === filter ? 'bg-[#4A3022] text-[#FAF5E9] shadow-lg scale-105' : 'bg-white text-[#4A3022]/70 hover:bg-[#D97736]/10 hover:text-[#D97736] border border-[#FAF5E9]'}`}>
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* PROMO CARDS (3D) */}
        <div className="mb-20 overflow-hidden">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#D97736]/10 rounded-xl flex items-center justify-center text-[#D97736]"><Tag size={24} /></div>
            <h2 className="text-3xl font-playfair font-black text-[#4A3022]">Penawaran Terbatas</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              onMouseMove={tiltPromo1.handleMouseMove} onMouseLeave={tiltPromo1.handleMouseLeave} animate={{ rotateX: tiltPromo1.tilt.x, rotateY: tiltPromo1.tilt.y }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-gradient-to-br from-[#D97736] to-[#c46a2b] rounded-[2.5rem] p-8 text-white relative group shadow-xl preserve-3d cursor-pointer"
            >
              <div className="absolute -right-8 -top-8 opacity-20 group-hover:scale-110 transition-transform duration-700 pointer-events-none" style={{ transform: 'translateZ(-50px)' }}><Cookie size={200} /></div>
              <div className="relative z-10 flex flex-col justify-center preserve-3d" style={{ transform: 'translateZ(30px)' }}>
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-xs font-jakarta font-black tracking-wider mb-4 w-max shadow-sm">BUNDLE SPESIAL</span>
                <h3 className="text-3xl font-playfair font-black mb-4 leading-tight drop-shadow-md">Beli 3 Toples Kering,<br/>Gratis Ongkir!</h3>
                <button className="bg-white text-[#D97736] px-8 py-3.5 rounded-2xl font-jakarta font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg w-max mt-4">Klaim Promo</button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              onMouseMove={tiltPromo2.handleMouseMove} onMouseLeave={tiltPromo2.handleMouseLeave} animate={{ rotateX: tiltPromo2.tilt.x, rotateY: tiltPromo2.tilt.y }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-gradient-to-br from-[#4A3022] to-[#2d1d14] rounded-[2.5rem] p-8 text-white relative group shadow-xl preserve-3d cursor-pointer"
            >
              <div className="absolute -right-8 -top-8 opacity-20 group-hover:scale-110 transition-transform duration-700 pointer-events-none" style={{ transform: 'translateZ(-50px)' }}><Coffee size={200} /></div>
              <div className="relative z-10 flex flex-col justify-center preserve-3d" style={{ transform: 'translateZ(30px)' }}>
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-xs font-jakarta font-black tracking-wider mb-4 w-max shadow-sm">PAKET NGOPI</span>
                <h3 className="text-3xl font-playfair font-black mb-4 leading-tight drop-shadow-md">2 Pastry Bebas Pilih <br/>+ 1 Kopi Oriena</h3>
                <button className="bg-[#D97736] text-white px-8 py-3.5 rounded-2xl font-jakarta font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg w-max mt-4">Lihat Paket</button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BENTO GRID (Filtered) */}
        {filteredBento.length > 0 && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
            <AnimatePresence>
              {filteredBento.map((product, idx) => (
                <motion.div
                  layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }} key={product.id} onClick={() => setSelectedProduct(product)}
                  className={`group cursor-pointer relative rounded-[2rem] overflow-hidden bg-black shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${product.gridClass}`}
                >
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A3022]/90 via-[#4A3022]/30 to-transparent"></div>
                  {product.badge && <div className="absolute top-6 left-6 z-20"><span className="bg-[#D97736] text-[#FAF5E9] px-4 py-2 rounded-full text-xs font-jakarta font-black tracking-widest shadow-lg">{product.badge}</span></div>}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col h-full justify-end">
                    <p className="text-white/80 font-jakarta font-bold text-sm tracking-wider uppercase mb-1 drop-shadow-md">{product.category}</p>
                    <h3 className="text-3xl font-playfair font-black text-white mb-2 leading-tight drop-shadow-lg">{product.name}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* MODAL POP UP PRODUCT */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#4A3022]/60 backdrop-blur-md" onClick={() => setSelectedProduct(null)}>
              <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-3 bg-white/50 backdrop-blur-sm rounded-full hover:bg-[#D97736] hover:text-white transition-all z-30 shadow-md"><X size={24} /></button>
                <div className="w-full md:w-1/2 relative min-h-[300px]"><img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" /></div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center font-jakarta">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#829079]/10 text-[#829079] rounded-full text-xs font-bold tracking-widest uppercase mb-4 w-max"><Star size={14} fill="currentColor" /> {selectedProduct.category}</span>
                  <h2 className="text-3xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4">{selectedProduct.name}</h2>
                  <p className="text-[#4A3022]/70 mb-8 font-medium text-lg">{selectedProduct.desc}</p>
                  <div className="text-4xl font-black text-[#D97736] mb-8">Rp {selectedProduct.price.toLocaleString('id-ID')}</div>
                  <button onClick={() => { setCartCount(prev => prev + 1); setSelectedProduct(null); }} className="w-full bg-[#D97736] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95 transition-all shadow-sm"><ShoppingBag size={20} /> Masukkan Keranjang</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}