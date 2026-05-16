import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, X, Star, Plus } from 'lucide-react';

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

export default function Katalog({ setCartCount }: KatalogProps) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // KATEGORI UDAH DIUPDATE SESUAI G-FORM
  const filters = ['Semua', 'Cookies', 'Bakery', 'Snack', 'Hampers'];

  // DATA HIGHLIGHT (BENTO GRID) - BEST SELLER DARI G-FORM
  const bentoProducts: Product[] = [
    { id: 1, name: "Nastar Original", category: "Cookies", price: 85000, desc: "Cookies nastar lumer dengan isian nanas asli buatan sendiri. Best seller nomor 1 Oriena!", gridClass: "md:col-span-2 md:row-span-2 h-[300px] md:h-[624px]", badge: "BEST SELLER", image: "https://images.unsplash.com/photo-1590080874088-eec64895e423?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Roti Sisir Mentega", category: "Bakery", price: 15000, desc: "Roti sisir klasik yang super lembut dengan olesan mentega manis yang pas di lidah.", gridClass: "md:col-span-1 md:row-span-1 h-[300px]", badge: "BEST SELLER", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "Sustik (Sus Kering)", category: "Snack", price: 20000, desc: "Cemilan sus kering gurih yang renyah banget. Pas buat nemenin nugas atau ngantor.", gridClass: "md:col-span-1 md:row-span-1 h-[300px]", badge: "BEST SELLER", image: "https://images.unsplash.com/photo-1600431562968-ef337c8733ed?auto=format&fit=crop&q=80&w=600" },
    { id: 4, name: "Bolen Lilit", category: "Bakery", price: 35000, desc: "Kulit bolen yang flaky dengan isian pisang manis dan cokelat lumer di dalam.", gridClass: "md:col-span-2 md:row-span-1 h-[300px]", image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=800" },
   // GANTI DATA ID 6 DI DALAM bentoProducts JADI GINI:
    { id: 6, name: "Hampers Seasonal (Lebaran & Natal)", category: "Hampers", price: 115000, desc: "Paket eksklusif edisi hari raya. Sempurna untuk hantaran Lebaran atau kado manis saat Natal.", gridClass: "md:col-span-1 md:row-span-2 h-[300px] md:h-[624px]", badge: "SEASONAL", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600" },
    { id: 7, name: "Kastengel Keju", category: "Cookies", price: 95000, desc: "Garing di luar, keju edam yang pecah dan lumer di gigitan pertama. Bikin nagih!", gridClass: "md:col-span-1 md:row-span-1 h-[300px]", image: "https://images.unsplash.com/photo-1605335135706-9076f827a1fc?auto=format&fit=crop&q=80&w=600" },
  ];

  // DATA SEMUA PRODUK 
  const allProducts: Product[] = [
    ...bentoProducts.slice(0, 6), 
    { id: 11, name: "Lidah Kucing", category: "Cookies", price: 65000, desc: "Tipis, renyah, dan manisnya pas. Cocok banget disandingkan dengan teh hangat.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400" },
    { id: 14, name: "Pastry Stick", category: "Snack", price: 25000, desc: "Snack pastry panjang renyah dengan taburan keju parmesan yang gurih.", image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=400" },
    { id: 16, name: "Hampers Mini", category: "Hampers", price: 75000, desc: "Paket ekonomis isi 2 toples kecil. Harga ramah di kantong.", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=400" },
    { id: 17, name: "Nastar Toples Kecil", category: "Cookies", price: 45000, desc: "Versi ekonomis dari nastar original kami.", image: "https://images.unsplash.com/photo-1600431562217-1563e41c4a04?auto=format&fit=crop&q=80&w=400" },
    { id: 20, name: "Mini Roti Sisir", category: "Bakery", price: 5000, desc: "Roti sisir versi sekali lahap. Harga paling murah!", image: "https://images.unsplash.com/photo-1606822819825-f370ee1c1b18?auto=format&fit=crop&q=80&w=400" },
  ];

  const filterLogic = (product: Product) => {
    const matchCategory = activeFilter === 'Semua' || product.category === activeFilter;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  };

  const filteredBento = bentoProducts.filter(filterLogic);
  const filteredAll = allProducts.filter(filterLogic);

  const heroImage = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=2000";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24 bg-[#F7F3EB] min-h-screen">
      
      {/* HERO BANNER - Solid Border & Tuku Style */}
      <div className="relative w-full h-[300px] md:h-[400px] mb-16 flex items-center justify-center overflow-hidden border-b-8 border-[#4A3022]">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Katalog Oriena" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-[#4A3022]/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16 md:mt-0">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#FAF5E9] border-4 border-[#4A3022] px-8 py-6 rounded-3xl shadow-[8px_8px_0px_#4A3022]">
            <h1 className="text-4xl md:text-6xl font-playfair font-black text-[#4A3022] mb-2">
              Koleksi <span className="text-[#D97736]">Rasa.</span>
            </h1>
            <p className="text-md font-jakarta text-[#4A3022]/80 font-bold">
              Eksplorasi mahakarya oven kami untuk teman ngopimu.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEARCH & FILTER (Flat Bold) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-6 mb-16">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A3022]" size={24} strokeWidth={3} />
            <input type="text" placeholder="Cari nastar, roti sisir..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full font-jakarta font-bold bg-white border-4 border-[#4A3022] focus:border-[#D97736] rounded-2xl py-4 pl-14 pr-4 outline-none text-[#4A3022] shadow-[6px_6px_0px_#4A3022] transition-colors placeholder:text-[#4A3022]/40" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-6 py-2.5 rounded-xl font-jakarta font-black text-sm transition-all duration-300 border-4 ${activeFilter === filter ? 'bg-[#4A3022] text-[#FAF5E9] border-[#4A3022] shadow-[4px_4px_0px_#D97736] translate-y-1' : 'bg-white text-[#4A3022] border-[#4A3022] hover:bg-[#FAF5E9] shadow-[4px_4px_0px_#4A3022] hover:-translate-y-1'}`}>
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* PROMO CARDS - Static & Flat
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#4A3022] border-2 border-[#4A3022] rounded-xl flex items-center justify-center text-[#FAF5E9] shadow-[4px_4px_0px_#D97736]"><Tag size={24} /></div>
            <h2 className="text-3xl font-playfair font-black text-[#4A3022]">Penawaran Terbatas</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#D97736] rounded-[2rem] p-8 text-white relative border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022] overflow-hidden">
              <div className="absolute -right-8 -top-8 opacity-20 text-[#4A3022]"><Cookie size={200} /></div>
              <div className="relative z-10 flex flex-col justify-center h-full">
                <span className="bg-white text-[#4A3022] border-2 border-[#4A3022] px-4 py-1.5 rounded-full text-xs font-jakarta font-black tracking-wider mb-4 w-max shadow-[2px_2px_0px_#4A3022]">BUNDLE SPESIAL</span>
                <h3 className="text-3xl font-playfair font-black mb-4 leading-tight">Beli 3 Toples Cookies,<br/>Gratis Ongkir!</h3>
                <button className="bg-white text-[#D97736] border-4 border-[#4A3022] px-8 py-3.5 rounded-xl font-jakarta font-black text-sm hover:bg-[#FAF5E9] transition-colors shadow-[4px_4px_0px_#4A3022] w-max mt-4 active:translate-y-1 active:shadow-none">Klaim Promo</button>
              </div>
            </div>

            <div className="bg-[#E0D0BB] rounded-[2rem] p-8 text-[#4A3022] relative border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022] overflow-hidden">
              <div className="absolute -right-8 -top-8 opacity-10"><Coffee size={200} /></div>
              <div className="relative z-10 flex flex-col justify-center h-full">
                <span className="bg-[#4A3022] text-[#FAF5E9] border-2 border-[#4A3022] px-4 py-1.5 rounded-full text-xs font-jakarta font-black tracking-wider mb-4 w-max shadow-[2px_2px_0px_#D97736]">PAKET NGOPI</span>
                <h3 className="text-3xl font-playfair font-black mb-4 leading-tight">2 Roti Bebas Pilih <br/>+ 1 Kopi Oriena</h3>
                <button className="bg-[#D97736] text-white border-4 border-[#4A3022] px-8 py-3.5 rounded-xl font-jakarta font-black text-sm hover:bg-[#c46a2b] transition-colors shadow-[4px_4px_0px_#4A3022] w-max mt-4 active:translate-y-1 active:shadow-none">Lihat Paket</button>
              </div>
            </div>
          </div>
        </div> */}

        {/* SECTION: BENTO GRID (Koleksi Unggulan) */}
        {filteredBento.length > 0 && (
          <div className="mb-24">
             <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-playfair font-black text-[#4A3022]">Koleksi Unggulan</h2>
            </div>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence>
                {filteredBento.map((product) => (
                  <motion.div
                    layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} key={`bento-${product.id}`} onClick={() => setSelectedProduct(product)}
                    className={`group cursor-pointer relative rounded-[2rem] overflow-hidden bg-white border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] hover:shadow-[4px_4px_0px_#4A3022] hover:translate-y-1 transition-all flex flex-col ${product.gridClass}`}
                  >
                    <div className="flex-1 relative overflow-hidden bg-gray-100">
                      <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                      {product.badge && <div className="absolute top-4 left-4 z-20"><span className="bg-[#D97736] border-2 border-[#4A3022] text-[#FAF5E9] px-3 py-1.5 rounded-full text-xs font-jakarta font-black tracking-widest shadow-[2px_2px_0px_#4A3022]">{product.badge}</span></div>}
                    </div>
                    <div className="p-5 bg-white border-t-4 border-[#4A3022] flex flex-col justify-between h-32 md:h-40">
                      <div>
                        <p className="text-[#829079] font-jakarta font-black text-xs tracking-wider uppercase mb-1">{product.category}</p>
                        <h3 className="text-xl md:text-2xl font-playfair font-black text-[#4A3022] leading-tight line-clamp-2">{product.name}</h3>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                         <span className="text-lg font-jakarta font-black text-[#D97736]">Rp {product.price.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* SECTION: SEMUA PRODUK */}
        {filteredAll.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 border-t-4 border-[#4A3022] pt-8">
              <h3 className="text-3xl font-playfair font-black text-[#4A3022]">Semua Menu Kami</h3>
            </div>
            
            <motion.div layout className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              <AnimatePresence>
                {filteredAll.map((product) => (
                  <motion.div
                    layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} key={`all-${product.id}`} onClick={() => setSelectedProduct(product)}
                    className="group cursor-pointer bg-white rounded-2xl p-3 border-4 border-[#4A3022] shadow-[6px_6px_0px_#4A3022] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#D97736] transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="aspect-square bg-[#E0D0BB] rounded-xl mb-3 border-2 border-[#4A3022] relative overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col flex-1 px-1">
                      <p className="text-[#829079] text-[10px] font-jakarta font-black uppercase tracking-wider mb-1">{product.category}</p>
                      <h4 className="font-playfair font-black text-[#4A3022] mb-1 line-clamp-2 leading-tight text-sm md:text-base">{product.name}</h4>
                      <span className="text-[#D97736] font-jakarta font-black text-sm mt-auto mb-3">Rp {product.price.toLocaleString('id-ID')}</span>
                      <button className="w-full py-2 bg-[#FAF5E9] group-hover:bg-[#D97736] border-2 border-[#4A3022] text-[#4A3022] group-hover:text-white rounded-xl font-jakarta font-black text-xs transition-colors flex justify-center items-center gap-2 shadow-[2px_2px_0px_#4A3022] active:translate-y-0.5 active:shadow-none">
                        <Plus size={16} strokeWidth={3} /> Tambah
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* MODAL POP UP PRODUCT */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#4A3022]/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
              <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-[#FAF5E9] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-4 border-[#4A3022] flex flex-col md:flex-row shadow-[12px_12px_0px_#D97736] relative custom-scrollbar" onClick={(e) => e.stopPropagation()}>
                
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-white border-4 border-[#4A3022] text-[#4A3022] rounded-xl hover:bg-[#D97736] hover:text-white transition-all z-30 shadow-[4px_4px_0px_#4A3022] active:translate-y-1 active:shadow-none"><X size={24} strokeWidth={3} /></button>
                
                <div className="w-full md:w-1/2 relative min-h-[300px] border-b-4 md:border-b-0 md:border-r-4 border-[#4A3022]">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center font-jakarta bg-[#FAF5E9]">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-[#4A3022] text-[#4A3022] rounded-full text-xs font-black tracking-widest uppercase mb-4 w-max shadow-[2px_2px_0px_#4A3022]">
                    <Star size={14} fill="currentColor" /> {selectedProduct.category}
                  </span>
                  
                  <h2 className="text-3xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4">{selectedProduct.name}</h2>
                  <p className="text-[#4A3022]/80 mb-8 font-bold text-base leading-relaxed">{selectedProduct.desc}</p>
                  
                  <div className="text-4xl font-black text-[#D97736] mb-8 bg-white border-4 border-[#4A3022] px-6 py-3 rounded-2xl w-max shadow-[4px_4px_0px_#4A3022]">
                    Rp {selectedProduct.price.toLocaleString('id-ID')}
                  </div>
                  
                  <button onClick={() => { setCartCount(prev => prev + 1); setSelectedProduct(null); }} className="w-full bg-[#D97736] text-white border-4 border-[#4A3022] py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#c46a2b] active:translate-y-1 transition-all shadow-[6px_6px_0px_#4A3022] active:shadow-none">
                    <ShoppingBag size={20} strokeWidth={3} /> Masukkan Keranjang
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}