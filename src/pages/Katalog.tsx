import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, X, Star, Plus, Cookie, Heart, Coffee, Gift } from 'lucide-react';
import FotoNastar from '../assets/nastar.png'

interface KatalogProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  addToCart?: (product: { id: string | number; name: string; price: number }) => void;
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

export default function Katalog({ addToCart }: KatalogProps) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filters = ['Semua', 'Cookies', 'Bakery', 'Snack', 'Lain-lain'];

  const carouselProducts: Product[] = [
    { id: 1, name: "Nastar Original", category: "Cookies", price: 70000, desc: "Cookies nastar lumer dengan isian nanas asli buatan sendiri. Best seller nomor 1 Oriena!", badge: "BEST SELLER", image: FotoNastar },
    { id: 2, name: "Roti Sisir Mentega", category: "Bakery", price: 45000, desc: "Roti sisir klasik yang super lembut dengan olesan mentega manis yang pas di lidah.", badge: "FAVORIT", image: "https://github.com/user-attachments/assets/f075d205-bb78-42c1-8466-ef803038a700" },
    { id: 3, name: "Sustik (Sus Kering)", category: "Snack", price: 15000, desc: "Cemilan sus kering gurih yang renyah banget. Pas buat nemenin nugas atau ngantor.", badge: "RENYAH", image: "https://github.com/user-attachments/assets/b8e267a8-d73f-401d-8ddc-bef625f21d9d" },
  ];

  const allProducts: Product[] = [
    { id: 1, name: "Sosis Boom", category: "Bakery", price: 6000, desc: "Roti empuk dengan isian sosis gurih dan saus spesial yang meledak di mulut.", image: "https://github.com/user-attachments/assets/04256e46-d329-42f5-9367-bb0b3774b718" },
    { id: 2, name: "Mini Pizza", category: "Bakery", price: 5000, desc: "Pizza ukuran personal dengan topping keju, sosis, dan saus tomat lezat.", image: "https://github.com/user-attachments/assets/993b0a3d-2b50-4b4a-a360-2429736c53ad" },
    { id: 3, name: "Royal Twist", category: "Bakery", price: 5000, desc: "Roti kepang lembut dengan paduan rasa manis yang mewah di setiap gigitan.", image: "https://github.com/user-attachments/assets/744a5f2f-3b6a-4d81-b74f-dde9cb8684fa" },
    { id: 4, name: "Mexican Bun", category: "Bakery", price: 6500, desc: "Roti kopi khas meksiko dengan wangi mentega dan kopi yang menggoda.", image: "https://github.com/user-attachments/assets/825a0fbd-c5e5-4c8e-9a01-6a4df4ecac17" },
    { id: 5, name: "Choco Banana", category: "Bakery", price: 6500, desc: "Paduan klasik pisang manis dan cokelat lumer berbalut roti lembut.", image: "https://github.com/user-attachments/assets/63dea38a-c8ea-45a7-a9be-0b93d7c7d79e" },
    { id: 6, name: "Donat", category: "Bakery", price: 40000, desc: "Donat empuk menul-menul dengan pilihan topping manis favoritmu.", image: "https://github.com/user-attachments/assets/70da76b6-51f0-4339-9375-3c61293c4231" },
    { id: 7, name: "Japanese Milk Buns", category: "Bakery", price: 40000, desc: "Roti sobek ala jepang super fluffy, lumer di mulut bagai kapas.", image: "https://github.com/user-attachments/assets/e3556d1d-af8a-4050-aca1-4be3ea887df4" },
    { id: 8, name: "Roti Sisir Mentega", category: "Bakery", price: 45000, desc: "Roti sisir klasik yang super lembut dengan olesan mentega manis.", image: "https://github.com/user-attachments/assets/f075d205-bb78-42c1-8466-ef803038a700" },
    { id: 9, name: "Cheese Smoked Beef", category: "Bakery", price: 60000, desc: "Pastry gurih berlapis dengan isian smoked beef premium dan keju lumer.", image: "https://github.com/user-attachments/assets/9747ffa5-b711-4bb7-9441-a29a1f40eb9d" },
    { id: 10, name: "Almond London", category: "Cookies", price: 70000, desc: "Cookies renyah berbalut cokelat premium dan taburan almond panggang.", image: "https://github.com/user-attachments/assets/dee6937a-0347-4292-b520-363cb271eedb" },
    { id: 11, name: "Choco Hazelnut", category: "Cookies", price: 70000, desc: "Cookies cokelat pekat dengan isian selai hazelnut yang meleleh.", image: "https://github.com/user-attachments/assets/25ffd389-5403-492b-b581-180cdf375cfa" },
    { id: 12, name: "Sagu Keju", category: "Cookies", price: 70000, desc: "Tekstur ngeprul yang ngangenin, lumer begitu masuk mulut.", image: "https://github.com/user-attachments/assets/d64f146e-d4c9-4b4b-853d-232a51367c23" },
    { id: 13, name: "Kastangel", category: "Cookies", price: 80000, desc: "Garing di luar, keju edam yang pecah dan lumer di gigitan pertama.", image: "https://github.com/user-attachments/assets/84bd3842-e1aa-4b09-9acf-16a08c500d56" },
    { id: 14, name: "Brownies Keping", category: "Snack", price: 35000, desc: "Keripik brownies tipis renyah dengan rasa cokelat yang intens.", image: "https://github.com/user-attachments/assets/9e9d1e01-3962-4c12-bbca-d01ede31e3ef" },
    { id: 15, name: "Sus Kering Keju", category: "Snack", price: 35000, desc: "Varian sus kering dengan tambahan keju edam gurih di dalam adonannya.", image: "https://github.com/user-attachments/assets/b8e267a8-d73f-401d-8ddc-bef625f21d9d" },
  ];

  const filterLogic = (product: Product) => {
    const matchCategory = activeFilter === 'Semua' || product.category === activeFilter;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  };

  const filteredCarousel = carouselProducts.filter(filterLogic);
  const filteredAll = allProducts.filter(filterLogic);

  useEffect(() => {
    if (filteredCarousel.length <= 1) return;
    
    const timer = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % filteredCarousel.length);
    }, 3000); 

    return () => clearInterval(timer);
  }, [filteredCarousel.length]);

  const heroImage = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=2000";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24 bg-[#F7F3EB] min-h-screen">
      
      {/* HERO SECTION */}
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
        
        {/* PENCARIAN & FILTER BUTTONS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-6 mb-16">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A3022]" size={24} strokeWidth={3} />
            <input type="text" placeholder="Cari nastar, roti sisir..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full font-jakarta font-bold bg-white border-4 border-[#4A3022] focus:border-[#D97736] rounded-2xl py-4 pl-14 pr-4 outline-none text-[#4A3022] shadow-[6px_6px_0px_#4A3022] transition-colors placeholder:text-[#4A3022]/40" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button key={filter} onClick={() => { setActiveFilter(filter); setCarouselIndex(0); }} className={`px-6 py-2.5 rounded-xl font-jakarta font-black text-sm transition-all duration-300 border-4 ${activeFilter === filter ? 'bg-[#4A3022] text-[#FAF5E9] border-[#4A3022] shadow-[4px_4px_0px_#D97736] translate-y-1' : 'bg-white text-[#4A3022] border-[#4A3022] hover:bg-[#FAF5E9] shadow-[4px_4px_0px_#4A3022] hover:-translate-y-1'}`}>
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* SECTION BARU: MOMEN / SOCIAL PROOF (PENGGANTI KATEGORI/PROMO) - ALA KOPI TUKU */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#4A3022] border-2 border-[#4A3022] rounded-xl flex items-center justify-center text-[#FAF5E9] shadow-[4px_4px_0px_#D97736]"><Heart size={24} /></div>
            <h2 className="text-3xl font-playfair font-black text-[#4A3022]">Lebih Dari Sekadar Kue</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kartu Momen 1 (Ngopi) */}
            <motion.div 
              className="group relative h-[280px] md:h-[350px] rounded-[2rem] border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022] overflow-hidden bg-[#E0D0BB] cursor-default"
            >
              {/* Gambar Background */}
              <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" alt="Ngopi bareng Oriena" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
              <div className="absolute inset-0 bg-[#4A3022]/20 group-hover:bg-[#4A3022]/40 transition-colors duration-500"></div>
              
              {/* STIKER POP-UP ALA TUKU */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 opacity-0 group-hover:opacity-100 group-hover:rotate-6 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                <div className="bg-[#D97736] text-white border-4 border-[#4A3022] px-4 py-2 rounded-2xl font-jakarta font-black text-sm shadow-[4px_4px_0px_#4A3022] flex items-center gap-2">
                  <Coffee size={18} strokeWidth={3} /> Nyore Santuy!
                </div>
              </div>

              {/* Kotak Cerita */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-10">
                <motion.div className="bg-white/95 backdrop-blur-sm border-4 border-[#4A3022] p-5 md:p-6 rounded-3xl shadow-[6px_6px_0px_#4A3022] group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-1 md:mb-2">Teman Kopi Pagimu.</h3>
                  <p className="text-[#4A3022]/80 font-jakarta font-bold text-xs md:text-sm">Manisnya roti sisir dan secangkir kopi hangat bikin beban kerja atau nugas numpuk jadi kerasa lebih ringan.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Kartu Momen 2 (Hampers) */}
            <motion.div 
              className="group relative h-[280px] md:h-[350px] rounded-[2rem] border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022] overflow-hidden bg-[#FAF5E9] cursor-default"
            >
              {/* Gambar Background */}
              <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800" alt="Hampers Oriena" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
              <div className="absolute inset-0 bg-[#4A3022]/20 group-hover:bg-[#4A3022]/40 transition-colors duration-500"></div>
              
              {/* STIKER POP-UP ALA TUKU */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 opacity-0 group-hover:opacity-100 group-hover:-rotate-6 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                <div className="bg-[#829079] text-white border-4 border-[#4A3022] px-4 py-2 rounded-2xl font-jakarta font-black text-sm shadow-[4px_4px_0px_#4A3022] flex items-center gap-2">
                  <Gift size={18} strokeWidth={3} /> Buka Bareng!
                </div>
              </div>

              {/* Kotak Cerita */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-10">
                <motion.div className="bg-white/95 backdrop-blur-sm border-4 border-[#4A3022] p-5 md:p-6 rounded-3xl shadow-[6px_6px_0px_#4A3022] group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-1 md:mb-2">Rayakan Bersama.</h3>
                  <p className="text-[#4A3022]/80 font-jakarta font-bold text-xs md:text-sm">Kirim kehangatan oven kami untuk orang tersayang. Pas banget buat rayain ulang tahun atau hari raya spesial.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CAROUSEL KOLEKSI UNGGULAN */}
        {filteredCarousel.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-playfair font-black text-[#4A3022]">Koleksi Unggulan</h2>
            </div>
            
            <div className="relative w-full h-[450px] md:h-[550px] rounded-[2rem] border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022] overflow-hidden bg-[#E0D0BB]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={carouselIndex}
                  initial={{ x: "100%" }} 
                  animate={{ x: 0 }}      
                  exit={{ x: "-100%" }}   
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full cursor-pointer group"
                  onClick={() => setSelectedProduct(filteredCarousel[carouselIndex])}
                >
                  <img src={filteredCarousel[carouselIndex].image} alt={filteredCarousel[carouselIndex].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A3022] via-[#4A3022]/60 to-transparent opacity-90"></div>
                  
                  {filteredCarousel[carouselIndex].badge && (
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                      <span className="bg-[#D97736] border-2 border-[#4A3022] text-[#FAF5E9] px-4 py-2 rounded-full text-xs md:text-sm font-jakarta font-black tracking-widest shadow-[4px_4px_0px_#4A3022]">
                        {filteredCarousel[carouselIndex].badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                    <p className="text-[#D97736] font-jakarta font-black text-sm md:text-base tracking-widest uppercase mb-2 drop-shadow-[2px_2px_0px_#4A3022]">
                      {filteredCarousel[carouselIndex].category}
                    </p>
                    <h3 className="text-4xl md:text-6xl font-playfair font-black text-[#FAF5E9] mb-4 drop-shadow-[4px_4px_0px_#4A3022] leading-tight">
                      {filteredCarousel[carouselIndex].name}
                    </h3>
                    <p className="text-white/90 font-jakarta font-bold text-base md:text-lg max-w-2xl line-clamp-2 md:line-clamp-none mb-6">
                      {filteredCarousel[carouselIndex].desc}
                    </p>
                    
                    <div className="inline-flex items-center bg-[#FAF5E9] border-4 border-[#4A3022] text-[#D97736] px-6 py-3 rounded-2xl font-jakarta font-black text-xl shadow-[6px_6px_0px_#4A3022] group-hover:bg-[#D97736] group-hover:text-[#FAF5E9] transition-colors">
                      Rp {filteredCarousel[carouselIndex].price.toLocaleString('id-ID')}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                {filteredCarousel.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-3 rounded-full border-2 border-[#4A3022] shadow-[2px_2px_0px_#4A3022] transition-all duration-300 ${carouselIndex === idx ? 'w-10 bg-[#D97736]' : 'w-3 bg-[#FAF5E9]'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GRID SEMUA MENU */}
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
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          if (addToCart) {
                            addToCart({ id: product.id, name: product.name, price: product.price });
                            alert(`${product.name} masuk keranjang!`);
                          }
                        }} 
                        className="w-full py-2 bg-[#FAF5E9] group-hover:bg-[#D97736] border-2 border-[#4A3022] text-[#4A3022] group-hover:text-white rounded-xl font-jakarta font-black text-xs transition-colors flex justify-center items-center gap-2 shadow-[2px_2px_0px_#4A3022] active:translate-y-0.5 active:shadow-none"
                      >
                        <Plus size={16} strokeWidth={3} /> Tambah
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* JIKA KOSONG */}
        {filteredCarousel.length === 0 && filteredAll.length === 0 && (
          <div className="text-center py-24 bg-white border-4 border-[#4A3022] rounded-3xl shadow-[8px_8px_0px_#4A3022]">
            <Cookie size={64} className="mx-auto text-[#4A3022]/30 mb-4" />
            <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-2">Waduh, kuenya nggak ketemu!</h3>
            <p className="text-[#4A3022]/60 font-jakarta font-bold">Coba cari pakai kata kunci lain atau reset filter.</p>
          </div>
        )}

        {/* MODAL DETAIL PRODUK */}
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
                  
                  <button 
                    onClick={() => { 
                      if (addToCart) {
                        addToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price });
                        alert(`${selectedProduct.name} masuk keranjang!`);
                      }
                      setSelectedProduct(null); 
                    }} 
                    className="w-full bg-[#D97736] text-white border-4 border-[#4A3022] py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#c46a2b] active:translate-y-1 transition-all shadow-[6px_6px_0px_#4A3022] active:shadow-none"
                  >
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