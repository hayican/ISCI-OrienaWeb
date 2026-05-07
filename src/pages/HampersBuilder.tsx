import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Package, CheckCircle, Trash2, Plus, Star, Gift, PenLine, Truck, ArrowRight, Cookie } from 'lucide-react';

interface CookieItem {
  id: string;
  name: string;
  price: number;
  color: string;
  image: string;
}

interface HampersBuilderProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

// Hook untuk efek 3D Hover
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

export default function HampersBuilder({ setCartCount }: HampersBuilderProps) {
  const [boxItems, setBoxItems] = useState<(CookieItem | null)[]>([null, null, null, null]);
  const [greeting, setGreeting] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [draggedItem, setDraggedItem] = useState<CookieItem | null>(null);

  const { tilt, handleMouseMove, handleMouseLeave } = use3DTilt();

  // Data Cookies (Link foto diupdate ke yang lebih stabil)
  const availableCookies: CookieItem[] = [
    { id: 'h1', name: "Nastar Lumer", price: 85000, color: "#D97736", image: "https://images.unsplash.com/photo-1618923850106-9d324b5a2656?auto=format&fit=crop&q=80&w=400" },
    { id: 'h2', name: "Kastengel Royal", price: 95000, color: "#eab308", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400" },
    { id: 'h3', name: "Putri Salju", price: 80000, color: "#829079", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400" },
    { id: 'h4', name: "Sagu Keju", price: 75000, color: "#4A3022", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400" },
    { id: 'h5', name: "Almond Crispy", price: 65000, color: "#D97736", image: "https://images.unsplash.com/photo-1600431562968-ef337c8733ed?auto=format&fit=crop&q=80&w=400" },
    { id: 'h6', name: "Lidah Kucing", price: 60000, color: "#eab308", image: "https://images.unsplash.com/photo-1557310717-d6bea9f36682?auto=format&fit=crop&q=80&w=400" },
  ];

  const recommendedHampers = [
    { id: 'r1', name: "Paket Hampers Lebaran", desc: "Kastengel, Nastar, Putri Salju, Sagu Keju. Termasuk box hard-cover elegan dan pita.", price: 370000, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600" },
    { id: 'r2', name: "Sweet Treats Box", desc: "Almond Crispy, Nastar Lumer, Lidah Kucing, Putri Salju. Kado manis untuk sahabat terkasih.", price: 330000, image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=600" },
    { id: 'r3', name: "Premium Artisan", desc: "Double Kastengel + Double Nastar Lumer. Kombinasi juara yang nggak pernah salah.", price: 395000, image: "https://images.unsplash.com/photo-1608350587842-8354c000bd93?auto=format&fit=crop&q=80&w=600" },
  ];

  const baseBoxPrice = 35000;
  const currentTotal = boxItems.reduce((total, item) => total + (item ? item.price : 0), baseBoxPrice);
  const filledCount = boxItems.filter(item => item !== null).length;

  const checkCompletion = (newBox: (CookieItem | null)[]) => {
    if (newBox.filter(item => item === null).length === 0) {
      setTimeout(() => setIsDone(true), 600);
    }
  };

  const handleAddCookie = (cookie: CookieItem) => {
    const emptySlotIndex = boxItems.findIndex(item => item === null);
    if (emptySlotIndex !== -1) {
      const newBoxItems = [...boxItems];
      newBoxItems[emptySlotIndex] = cookie;
      setBoxItems(newBoxItems);
      checkCompletion(newBoxItems);
    }
  };

  const handleRemoveCookie = (index: number) => {
    const newBoxItems = [...boxItems];
    newBoxItems[index] = null;
    setBoxItems(newBoxItems);
    setIsDone(false);
  };

  const handleDragStart = (e: React.DragEvent, cookie: CookieItem) => {
    setDraggedItem(cookie);
    e.dataTransfer.setData('cookieId', cookie.id);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    if (draggedItem && !boxItems[slotIndex]) {
      const newBoxItems = [...boxItems];
      newBoxItems[slotIndex] = draggedItem;
      setBoxItems(newBoxItems);
      setDraggedItem(null);
      checkCompletion(newBoxItems);
    }
  };

  const handleFinish = () => {
    setCartCount(prev => prev + 1);
    setBoxItems([null, null, null, null]);
    setGreeting('');
    setIsDone(false);
    alert("Hampers custom berhasil dimasukkan ke keranjang!");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const woodBg = "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=2000";
  const basketTexture = "https://images.unsplash.com/photo-1596541223126-787db87f8489?auto=format&fit=crop&q=80&w=800";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full bg-[#FAF5E9]">
      
      {/* SECTION 1: MEJA KAYU & AREA RAKIT (DRAG & DROP ZONE) */}
      <div className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b-8 border-[#4A3022] min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <motion.img animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} src={woodBg} className="w-full h-full object-cover" alt="Wooden Table" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A3022]/95 via-[#4A3022]/80 to-[#4A3022]/95 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-playfair font-black text-[#FAF5E9] mb-4 drop-shadow-2xl">
              Rakit Hampersmu.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg font-jakarta text-[#FAF5E9]/90 max-w-2xl mx-auto font-medium">
              Tarik kursi ke meja kayu kami. Pilih varian kue, atau <span className="font-bold text-[#D97736] bg-white/10 px-2 py-0.5 rounded-md">Tarik & Lepas (Drag & Drop)</span> toples langsung ke dalam box.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* KIRI: KOTAK PARCEL */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }} className="lg:col-span-7 flex flex-col items-center perspective-1000">
              <div className="w-full max-w-lg flex justify-between items-center mb-6 px-2">
                <h3 className="text-2xl font-playfair font-black text-[#FAF5E9] drop-shadow-md">Box Pengemasan</h3>
                <span className="bg-[#D97736] text-[#FAF5E9] px-4 py-1.5 rounded-full font-jakarta font-bold text-sm tracking-wider shadow-lg">
                  {filledCount} / 4 TERISI
                </span>
              </div>

              <motion.div 
                onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
                animate={{ rotateX: tilt.x + 15, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-full max-w-lg aspect-square bg-[#c4a482] border-[20px] border-[#5a361e] rounded-[3rem] p-6 md:p-8 relative shadow-[inset_0_30px_60px_rgba(0,0,0,0.9),_0_35px_60px_rgba(0,0,0,0.7)] preserve-3d"
                style={{ backgroundImage: `url(${basketTexture})`, backgroundSize: 'cover', backgroundBlendMode: 'multiply' }}
              >
                <div className="grid grid-cols-2 gap-4 md:gap-6 h-full relative z-10 place-items-center preserve-3d" style={{ transform: 'translateZ(40px)' }}>
                  {[0, 1, 2, 3].map((slotIdx) => (
                    <div 
                      key={slotIdx} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, slotIdx)}
                      className={`relative bg-black/50 backdrop-blur-sm rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300 w-full aspect-square max-w-[160px] md:max-w-[180px] ${
                        boxItems[slotIdx] ? 'border-none shadow-[inset_0_-15px_25px_rgba(0,0,0,0.6),_0_20px_30px_rgba(0,0,0,0.8)]' : 'border-white/30 hover:border-[#D97736] hover:bg-black/70'
                      } ${draggedItem && !boxItems[slotIdx] ? 'border-[#D97736] bg-[#D97736]/20 animate-pulse' : ''}`}
                    >
                      <AnimatePresence mode="wait">
                        {boxItems[slotIdx] ? (
                          <motion.div key="filled" initial={{ scale: 0.5, opacity: 0, y: -50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-full h-full relative group">
                            <img src={boxItems[slotIdx]!.image} alt={boxItems[slotIdx]!.name} className="w-full h-full object-cover scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3022]/90 via-black/20 to-transparent flex flex-col justify-end p-2 md:p-4">
                              <span className="font-bold font-jakarta text-white text-[10px] md:text-sm text-center leading-tight drop-shadow-md">{boxItems[slotIdx]!.name}</span>
                            </div>
                            <div onClick={() => handleRemoveCookie(slotIdx)} className="absolute inset-0 bg-[#4A3022]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm">
                              <Trash2 className="text-white" size={32} />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/30 font-playfair font-black text-3xl md:text-5xl drop-shadow-sm">
                            {slotIdx + 1}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {isDone && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, translateZ: 80 }} animate={{ opacity: 1, scale: 1, translateZ: 80 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-[#D97736]/95 to-[#4A3022]/95 backdrop-blur-md rounded-[2.5rem] border-4 border-[#FAF5E9]/50 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
                    >
                      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}>
                        <Package size={120} className="text-[#FAF5E9] mb-4 drop-shadow-2xl" strokeWidth={1} />
                      </motion.div>
                      <span className="text-white font-playfair font-black text-3xl tracking-widest uppercase drop-shadow-md">Box Tersegel</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="mt-12 w-full max-w-lg flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 py-5 px-8 rounded-2xl shadow-xl">
                <div>
                  <p className="text-[#FAF5E9]/70 font-jakarta font-bold text-sm mb-1 uppercase tracking-wider">Total Estimasi</p>
                  <p className="text-xs font-jakarta text-[#FAF5E9]/50">*Termasuk box kayu/hard-cover Rp35.000</p>
                </div>
                <motion.p key={currentTotal} initial={{ scale: 1.2, color: "#D97736" }} animate={{ scale: 1, color: "#FAF5E9" }} className="text-3xl font-jakarta font-black text-[#FAF5E9] drop-shadow-md">
                  Rp {currentTotal.toLocaleString('id-ID')}
                </motion.p>
              </div>
            </motion.div>

            {/* KANAN: PILIHAN ISIAN */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, type: "spring" }} className="lg:col-span-5 space-y-6">
              <AnimatePresence mode="wait">
                {!isDone ? (
                  <motion.div key="select-mode" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border border-white/50">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#D97736] text-white rounded-full flex items-center justify-center font-black text-xl shadow-inner">1</div>
                        <h3 className="text-2xl font-playfair font-black text-[#4A3022]">Pilih Isiannya</h3>
                      </div>
                      <p className="text-sm font-jakarta text-[#4A3022]/60 ml-14">Klik tombol plus atau seret (drag) kue ke dalam box.</p>
                    </div>

                    <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                      {availableCookies.map((cookie) => {
                        const isFull = filledCount === 4;
                        return (
                          <motion.div
                            whileHover={!isFull ? { scale: 1.02 } : {}} whileTap={!isFull ? { scale: 0.98 } : {}}
                            key={cookie.id} draggable={!isFull}
                            onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, cookie)}
                            onDragEnd={() => setDraggedItem(null)}
                            className={`w-full flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${isFull ? 'opacity-50 cursor-not-allowed border-[#FAF5E9] bg-gray-50' : 'border-[#FAF5E9] hover:border-[#D97736] bg-white cursor-grab active:cursor-grabbing hover:shadow-lg shadow-[#D97736]/10'}`}
                          >
                            <div className="flex items-center gap-4 pointer-events-none">
                              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                                <img src={cookie.image} alt={cookie.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="text-left font-jakarta">
                                <h4 className="font-bold text-[#4A3022] text-lg leading-tight">{cookie.name}</h4>
                                <p className="text-sm text-[#D97736] font-bold">+ Rp {cookie.price.toLocaleString('id-ID')}</p>
                              </div>
                            </div>
                            <button disabled={isFull} onClick={() => handleAddCookie(cookie)} className="w-10 h-10 rounded-full flex items-center justify-center text-[#4A3022]/30 hover:bg-[#D97736] hover:text-white transition-colors"><Plus size={24} /></button>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="finish-mode" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border-2 border-[#D97736]/30 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D97736]/20 rounded-full blur-2xl"></div>
                    <div className="mb-8 flex items-center gap-3 relative z-10">
                      <div className="w-12 h-12 bg-[#829079] text-white rounded-full flex items-center justify-center shadow-inner"><CheckCircle size={28} /></div>
                      <div>
                        <h3 className="text-3xl font-playfair font-black text-[#4A3022]">Box Sempurna!</h3>
                        <p className="text-sm font-jakarta text-[#4A3022]/60 font-medium">Hampers custommu siap diproses.</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 relative z-10">
                      <label className="block text-sm font-jakarta font-bold text-[#4A3022]">Tulis Kartu Ucapan (Opsional):</label>
                      <textarea rows={4} value={greeting} onChange={(e) => setGreeting(e.target.value)} placeholder="Contoh: Selamat Lebaran ya bro! Mohon maaf lahir batin..." className="w-full bg-[#FAF5E9]/80 border-2 border-[#FAF5E9] focus:border-[#D97736] rounded-2xl p-5 outline-none font-jakarta text-[#4A3022] resize-none transition-colors shadow-inner"></textarea>
                    </div>

                    <div className="relative z-10 space-y-3">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={handleFinish} className="w-full bg-[#D97736] text-white py-4 rounded-2xl font-jakarta font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-[#D97736]/30">
                        <ShoppingBag size={24} /> Masukkan Keranjang
                      </motion.button>
                      <button onClick={() => setIsDone(false)} className="w-full py-3 text-[#4A3022]/60 font-jakarta font-bold text-sm hover:text-[#D97736] hover:bg-[#D97736]/10 rounded-xl transition-colors">
                        Bongkar & Edit Isi Box
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CARA KERJA (How it Works) */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4">Gimana Cara Kerjanya?</h2>
            <p className="text-lg font-jakarta text-[#4A3022]/70">Nggak sampai 5 menit, kado spesialmu siap dikirim.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Garis Penghubung (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-[#FAF5E9] -translate-y-1/2 z-0"></div>

            {[
              { title: "Pilih Kue", desc: "Tarik 4 varian kue favoritmu ke dalam box pengemasan.", icon: <Cookie size={32} /> },
              { title: "Tulis Pesan", desc: "Sematkan kartu ucapan gratis dengan pesan personalmu.", icon: <PenLine size={32} /> },
              { title: "Kami Rakit", desc: "Tim artisan kami akan menyusunnya dengan pita elegan.", icon: <Gift size={32} /> },
              { title: "Dikirim Aman", desc: "Packing berlapis bubble wrap menjamin kue sampai dengan utuh.", icon: <Truck size={32} /> }
            ].map((step, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-white border-4 border-[#FAF5E9] group-hover:border-[#D97736] rounded-full flex items-center justify-center text-[#D97736] mb-6 shadow-xl transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-playfair font-bold text-[#4A3022] mb-2">Langkah {idx + 1}: <br/> {step.title}</h3>
                <p className="text-sm font-jakarta text-[#4A3022]/70">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: REKOMENDASI HAMPERS PRE-BUILT */}
      <section className="py-24 bg-[#FAF5E9] px-4 sm:px-6 lg:px-8 border-t border-[#4A3022]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="inline-block px-4 py-1.5 bg-[#D97736]/10 rounded-full text-[#D97736] text-xs font-jakarta font-bold tracking-widest uppercase mb-4">
                BINGUNG PILIHNYA?
              </div>
              <h2 className="text-3xl md:text-4xl font-playfair font-black text-[#4A3022]">Rekomendasi Siap Kirim</h2>
            </div>
            <button className="text-[#D97736] font-jakarta font-bold flex items-center gap-1 hover:underline">
              Lihat Semua <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {recommendedHampers.map((hamper, idx) => (
              <motion.div 
                key={hamper.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-[#4A3022]/5 border border-[#FAF5E9] group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={hamper.image} alt={hamper.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[#D97736] font-jakarta font-black text-xs tracking-wider shadow-sm">TERLARIS</div>
                </div>
                <div className="p-6 md:p-8 flex flex-col h-[280px]">
                  <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-2">{hamper.name}</h3>
                  <p className="text-[#4A3022]/70 text-sm font-jakarta font-medium leading-relaxed mb-6 flex-1">{hamper.desc}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-jakarta font-black text-[#D97736]">Rp {hamper.price.toLocaleString('id-ID')}</span>
                    <button onClick={() => { setCartCount(prev => prev + 1); alert(`${hamper.name} masuk keranjang!`); }} className="w-12 h-12 rounded-full bg-[#FAF5E9] text-[#4A3022] flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-colors shadow-sm active:scale-95"><Plus size={24} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  );
}