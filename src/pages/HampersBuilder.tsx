import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Package, CheckCircle, Trash2, Plus, Gift, PenLine, Truck, ArrowRight, Cookie, MessageSquare } from 'lucide-react';
import FotoNastar from '../assets/nastar.png'
interface CookieItem {
  id: string;
  name: string;
  price: number;
  color: string;
  image: string;
}

interface HampersBuilderProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  addToCart?: (product: { id: string | number; name: string; price: number }) => void;
}

export default function HampersBuilder({ addToCart }: HampersBuilderProps) {
  const [boxItems, setBoxItems] = useState<(CookieItem | null)[]>([null, null, null]);
  
  // State Form Custom Hampers
  const [hampersForm, setHampersForm] = useState({
    senderName: '',
    receiverName: '',
    greeting: ''
  });
  
  // STATE BARU BUAT MODE ORDER (Kado vs Sendiri)
  const [orderMode, setOrderMode] = useState<'kado' | 'sendiri'>('kado');
  
  const [isDone, setIsDone] = useState(false);
  const [draggedItem, setDraggedItem] = useState<CookieItem | null>(null);

  const availableCookies: CookieItem[] = [
    { id: 'h1', name: "Nastar Original", price: 70000, color: "#D97736", image: FotoNastar },
    { id: 'h2', name: "Kastangel", price: 80000, color: "#eab308", image: "https://github.com/user-attachments/assets/84bd3842-e1aa-4b09-9acf-16a08c500d56" },
    { id: 'h3', name: "Sagu Keju", price: 70000, color: "#829079", image: "https://github.com/user-attachments/assets/d64f146e-d4c9-4b4b-853d-232a51367c23" },
    { id: 'h4', name: "Almond London", price: 70000, color: "#D97736", image: "https://github.com/user-attachments/assets/dee6937a-0347-4292-b520-363cb271eedb" },
    { id: 'h5', name: "Choco Hazelnut", price: 70000, color: "#4A3022", image: "https://github.com/user-attachments/assets/25ffd389-5403-492b-b581-180cdf375cfa" },
    { id: 'h6', name: "Brownies Keping", price: 35000, color: "#4A3022", image: "https://github.com/user-attachments/assets/9e9d1e01-3962-4c12-bbca-d01ede31e3ef" },
    { id: 'h7', name: "Sus Kering Keju", price: 35000, color: "#eab308", image: "https://github.com/user-attachments/assets/b8e267a8-d73f-401d-8ddc-bef625f21d9d" },
  ];

  const recommendedHampers = [
    { id: 'r1', name: "Hampers Seasonal (Lebaran & Natal)", desc: "Edisi spesial hari raya! Isi Kastengel, Lidah Kucing, Putri Salju. Termasuk box tematik eksklusif.", price: 370000, image: "https://i.pinimg.com/1200x/be/68/12/be6812585ccb5b55a88d3ebac26e5cb1.jpg" },
    { id: 'r2', name: "Sweet Treats Box", desc: "Almond Crispy, Kastengel, Lidah Kucing. Kado manis untuk sahabat.", price: 330000, image: "https://i.pinimg.com/736x/07/98/88/079888dae1e172b609b3ff8a47159ba0.jpg" },
    { id: 'r3', name: "Premium Artisan", desc: "Kastengel + Double Almond Crispy. Kombinasi juara yang nggak pernah salah.", price: 395000, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600" },
  ];

  const currentTotal = boxItems.reduce((total, item) => total + (item ? item.price : 0), 0);
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

  const handleHampersWA = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "628126120165";
    let text = `Halo Admin Oriena! 👋\nSaya mau pesan *Custom Box Hampers* nih:\n\n`;
    
    text += `📦 *ISI HAMPERS (Isi ${filledCount}):*\n`;
    boxItems.forEach((item, index) => {
      if (item) text += `- Slot ${index + 1}: ${item.name} (Rp ${item.price.toLocaleString('id-ID')})\n`;
    });
    
    text += `\n*TOTAL HARGA ISI: Rp ${currentTotal.toLocaleString('id-ID')}*\n`;
    text += `_(Note: Belum termasuk harga box kemasan & ongkir)_\n\n`;
    
    // LOGIKA PERBEDAAN TEKS WA BERDASARKAN MODE
    if (orderMode === 'kado') {
      text += `🎁 *TIPE PESANAN: KADO / GIFT*\n`;
      text += `Dari: ${hampersForm.senderName || '-'}\n`;
      text += `Untuk: ${hampersForm.receiverName || '-'}\n`;
      text += `Pesan Kartu: ${hampersForm.greeting || '-'}\n\n`;
    } else {
      text += `😋 *TIPE PESANAN: KONSUMSI PRIBADI*\n`;
      text += `_(Tidak perlu kartu ucapan)_\n\n`;
    }
    
    text += `Tolong dibantu hitung total keseluruhan pakai boxnya ya Kak!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full bg-[#F7F3EB]">
      
      <div className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b-8 border-[#4A3022] min-h-[90vh] flex items-center bg-[#E0D0BB]">
        <div className="absolute inset-0 z-0">
          <img src="https://i.pinimg.com/1200x/08/0d/f7/080df7c037e92fcf48fefc60b35f637f.jpg" alt="Lantai Kayu" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-playfair font-black text-[#FAF5E9] [-webkit-text-stroke:1px_#4A3022] drop-shadow-[4px_4px_0px_#4A3022] mb-4">
              Rakit Hampersmu.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg font-jakarta text-[#FAF5E9]/90 max-w-2xl mx-auto font-bold">
              Pilih varian kue, atau <span className="bg-[#D97736] text-white px-2 py-0.5 rounded-md border-2 border-[#4A3022]">Tarik & Lepas</span> toples langsung ke dalam box.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }} className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-lg flex justify-between items-center mb-6 px-2">
                <h3 className="text-2xl font-playfair font-black text-[#4A3022] bg-[#FAF5E9] px-3 py-1 rounded-lg border-2 border-[#4A3022]">Box Pengemasan</h3>
                <span className="bg-[#FAF5E9] text-[#4A3022] border-2 border-[#4A3022] px-4 py-1.5 rounded-full font-jakarta font-black text-sm tracking-wider shadow-[4px_4px_0px_#4A3022]">
                  {filledCount} / 3 TERISI
                </span>
              </div>

              <div className="w-full max-w-lg aspect-square bg-[#E0D0BB] border-4 border-[#4A3022] rounded-[3rem] p-6 md:p-8 relative shadow-[12px_12px_0px_rgba(74,48,34,1)]">
                <div className="flex flex-wrap justify-center content-center gap-4 md:gap-6 h-full relative z-10">
                  {[0, 1, 2].map((slotIdx) => (
                    <div 
                      key={slotIdx} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, slotIdx)}
                      className={`relative rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 w-[140px] h-[140px] md:w-[170px] md:h-[170px] ${
                        boxItems[slotIdx] ? 'bg-transparent' : 'bg-[#FAF5E9] border-4 border-dashed border-[#4A3022] hover:border-[#D97736] hover:bg-white'
                      } ${draggedItem && !boxItems[slotIdx] ? 'border-[#D97736] bg-[#D97736]/20 border-solid animate-pulse' : ''}`}
                    >
                      <AnimatePresence mode="wait">
                        {boxItems[slotIdx] ? (
                          <motion.div key="filled" initial={{ scale: 0.5, opacity: 0, y: -50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-full h-full relative group rounded-full overflow-hidden border-4 border-[#4A3022]">
                            <img src={boxItems[slotIdx]!.image} alt={boxItems[slotIdx]!.name} className="w-full h-full object-cover scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3022] via-[#4A3022]/40 to-transparent flex flex-col justify-end p-2 md:p-4 opacity-90">
                              <span className="font-bold font-jakarta text-[#FAF5E9] text-[10px] md:text-sm text-center leading-tight">{boxItems[slotIdx]!.name}</span>
                            </div>
                            <div onClick={() => handleRemoveCookie(slotIdx)} className="absolute inset-0 bg-[#4A3022]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300">
                              <Trash2 className="text-[#FAF5E9]" size={36} />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#4A3022]/30 font-playfair font-black text-3xl md:text-5xl">{slotIdx + 1}</motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {isDone && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#D97736] rounded-[2.5rem] border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022]">
                      <motion.div initial={{ y: -10 }} animate={{ y: 0 }} transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse", ease: "easeInOut" }}>
                        <Package size={100} className="text-white mb-4" strokeWidth={2} />
                      </motion.div>
                      <span className="text-white font-playfair font-black text-3xl tracking-widest uppercase">Box Terisi Penuh</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-10 w-full max-w-lg flex items-center justify-between bg-white border-4 border-[#4A3022] py-4 px-6 rounded-2xl shadow-[6px_6px_0px_#4A3022]">
                <div>
                  <p className="text-[#4A3022] font-jakarta font-black text-sm mb-1 uppercase tracking-wider">Total Harga Isi</p>
                  <p className="text-xs font-jakarta text-[#4A3022]/70 font-bold">*Harga box kemasan akan dihitung terpisah oleh admin.</p>
                </div>
                <motion.p key={currentTotal} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl md:text-3xl font-jakarta font-black text-[#D97736]">
                  Rp {currentTotal.toLocaleString('id-ID')}
                </motion.p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, type: "spring" }} className="lg:col-span-5 space-y-6">
              <AnimatePresence mode="wait">
                {!isDone ? (
                  <motion.div key="select-mode" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#FAF5E9] rounded-[3rem] p-8 border-4 border-[#4A3022] shadow-[8px_8px_0px_rgba(74,48,34,1)]">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#4A3022] text-white rounded-full flex items-center justify-center font-black text-xl">1</div>
                        <h3 className="text-2xl font-playfair font-black text-[#4A3022]">Pilih Isiannya</h3>
                      </div>
                      <p className="text-sm font-jakarta text-[#4A3022]/80 font-medium ml-14">Klik tombol + atau seret kue ke dalam box.</p>
                    </div>

                    <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                      {availableCookies.map((cookie) => {
                        const isFull = filledCount === 3;
                        return (
                          <motion.div
                            whileHover={!isFull ? { scale: 1.02 } : {}} whileTap={!isFull ? { scale: 0.98 } : {}}
                            key={cookie.id} draggable={!isFull} onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, cookie)} onDragEnd={() => setDraggedItem(null)}
                            className={`w-full flex items-center justify-between p-3 rounded-2xl border-4 transition-all ${isFull ? 'opacity-50 cursor-not-allowed border-[#4A3022]/20 bg-[#E0D0BB]' : 'border-[#4A3022] hover:border-[#D97736] bg-white cursor-grab active:cursor-grabbing shadow-[4px_4px_0px_#4A3022] hover:shadow-[2px_2px_0px_#D97736]'}`}
                          >
                            <div className="flex items-center gap-4 pointer-events-none">
                              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#4A3022]">
                                <img src={cookie.image} alt={cookie.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="text-left font-jakarta">
                                <h4 className="font-bold text-[#4A3022] text-lg leading-tight">{cookie.name}</h4>
                                <p className="text-sm text-[#D97736] font-black">+ Rp {cookie.price.toLocaleString('id-ID')}</p>
                              </div>
                            </div>
                            <button disabled={isFull} onClick={() => handleAddCookie(cookie)} className="w-10 h-10 rounded-full flex items-center justify-center text-[#4A3022] border-2 border-[#4A3022] hover:bg-[#D97736] hover:text-white hover:border-[#D97736] transition-colors bg-[#FAF5E9]"><Plus size={24} strokeWidth={3} /></button>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="finish-mode" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#FAF5E9] rounded-[3rem] p-8 border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] relative overflow-hidden">
                    <div className="mb-8 flex items-center gap-3 relative z-10">
                      <div className="w-12 h-12 bg-[#829079] border-2 border-[#4A3022] text-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_#4A3022]"><CheckCircle size={28} /></div>
                      <div>
                        <h3 className="text-3xl font-playfair font-black text-[#4A3022]">Sempurna!</h3>
                        <p className="text-sm font-jakarta text-[#4A3022]/80 font-bold">Pilih tipe pesananmu di bawah ini.</p>
                      </div>
                    </div>

                    <form onSubmit={handleHampersWA} className="relative z-10">
                      
                      {/* TOGGLE MODE PESANAN */}
                      <div className="flex gap-4 mb-6">
                        <button 
                          type="button" 
                          onClick={() => setOrderMode('kado')} 
                          className={`flex-1 py-3 border-4 border-[#4A3022] rounded-xl font-black transition-all ${orderMode === 'kado' ? 'bg-[#D97736] text-white shadow-[4px_4px_0px_#4A3022] -translate-y-1' : 'bg-white text-[#4A3022] hover:bg-[#FAF5E9]'}`}
                        >
                          🎁 Buat Kado
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setOrderMode('sendiri')} 
                          className={`flex-1 py-3 border-4 border-[#4A3022] rounded-xl font-black transition-all ${orderMode === 'sendiri' ? 'bg-[#829079] text-white shadow-[4px_4px_0px_#4A3022] -translate-y-1' : 'bg-white text-[#4A3022] hover:bg-[#FAF5E9]'}`}
                        >
                          😋 Beli Sendiri
                        </button>
                      </div>

                      {/* FORM KARTU UCAPAN (HANYA MUNCUL JIKA MODE KADO) */}
                      <AnimatePresence>
                        {orderMode === 'kado' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <label className="block text-sm font-jakarta font-black text-[#4A3022]">Dari (Pengirim):</label>
                                <input required type="text" value={hampersForm.senderName} onChange={(e) => setHampersForm({...hampersForm, senderName: e.target.value})} className="w-full bg-white border-4 border-[#4A3022] focus:border-[#D97736] rounded-xl p-3 outline-none font-jakarta text-[#4A3022] font-bold transition-colors" placeholder="Nama pengirim" />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-jakarta font-black text-[#4A3022]">Untuk (Penerima):</label>
                                <input required type="text" value={hampersForm.receiverName} onChange={(e) => setHampersForm({...hampersForm, receiverName: e.target.value})} className="w-full bg-white border-4 border-[#4A3022] focus:border-[#D97736] rounded-xl p-3 outline-none font-jakarta text-[#4A3022] font-bold transition-colors" placeholder="Nama penerima" />
                              </div>
                            </div>
                            <div className="space-y-2 mb-6">
                              <label className="block text-sm font-jakarta font-black text-[#4A3022]">Pesan Kartu Ucapan:</label>
                              <textarea required rows={3} value={hampersForm.greeting} onChange={(e) => setHampersForm({...hampersForm, greeting: e.target.value})} placeholder="Tulis ucapan selamat di sini..." className="w-full bg-white border-4 border-[#4A3022] focus:border-[#D97736] rounded-xl p-3 outline-none font-jakarta text-[#4A3022] font-bold resize-none transition-colors"></textarea>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="space-y-4 mt-2">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} type="submit" className={`w-full text-white py-4 border-4 border-[#4A3022] rounded-2xl font-jakarta font-black text-lg flex items-center justify-center gap-2 shadow-[4px_4px_0px_#4A3022] ${orderMode === 'kado' ? 'bg-[#D97736]' : 'bg-[#829079]'}`}>
                          <MessageSquare size={24} /> Pesan {orderMode === 'kado' ? 'Custom' : 'Buat Sendiri'} via WA
                        </motion.button>
                        <button type="button" onClick={() => setIsDone(false)} className="w-full py-3 text-[#4A3022] font-jakarta font-black text-sm hover:text-[#D97736] hover:bg-white border-4 border-transparent hover:border-[#D97736] rounded-xl transition-all">
                          Bongkar & Edit Isi Box
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="py-24 bg-[#F7F3EB] px-4 sm:px-6 lg:px-8 border-b-8 border-[#4A3022]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4">Gimana Cara Kerjanya?</h2>
            <p className="text-lg font-jakarta font-bold text-[#4A3022]/80">Nggak sampai 5 menit, kado spesialmu siap dikirim.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-[#4A3022] z-0"></div>
            {[
              { title: "Pilih Kue", desc: "Tarik 3 varian kue favoritmu ke dalam box pengemasan.", icon: <Cookie size={32} /> },
              { title: "Pilih Mode", desc: "Mau buat diri sendiri atau dikirim sebagai kado? Bebas!", icon: <PenLine size={32} /> },
              { title: "Kami Rakit", desc: "Tim artisan kami akan menyusunnya dengan pita elegan.", icon: <Gift size={32} /> },
              { title: "Dikirim Aman", desc: "Packing berlapis bubble wrap menjamin kue sampai dengan utuh.", icon: <Truck size={32} /> }
            ].map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-[#FAF5E9] border-4 border-[#4A3022] group-hover:bg-[#D97736] group-hover:text-white rounded-full flex items-center justify-center text-[#4A3022] mb-6 transition-colors duration-300 shadow-[4px_4px_0px_#4A3022]">
                  {step.icon}
                </div>
                <h3 className="text-xl font-playfair font-black text-[#4A3022] mb-2">Langkah {idx + 1}: <br/> {step.title}</h3>
                <p className="text-sm font-jakarta font-medium text-[#4A3022]/80">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="inline-block px-4 py-1.5 bg-[#4A3022] text-[#FAF5E9] rounded-full text-xs font-jakarta font-black tracking-widest uppercase mb-4 border-2 border-[#4A3022]">BINGUNG PILIHNYA?</div>
              <h2 className="text-3xl md:text-4xl font-playfair font-black text-[#4A3022]">Rekomendasi Siap Kirim</h2>
            </div>
            <button className="text-[#D97736] font-jakarta font-black flex items-center gap-1 hover:text-[#4A3022] transition-colors">
              Lihat Semua <ArrowRight size={18} strokeWidth={3} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {recommendedHampers.map((hamper, idx) => (
              <motion.div key={hamper.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }} className="bg-[#FAF5E9] rounded-[2.5rem] overflow-hidden border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] group flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative border-b-4 border-[#4A3022]">
                  <img src={hamper.image} alt={hamper.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white border-2 border-[#4A3022] px-4 py-1.5 rounded-full text-[#D97736] font-jakarta font-black text-xs tracking-wider">TERLARIS</div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-2">{hamper.name}</h3>
                  <p className="text-[#4A3022]/80 text-sm font-jakarta font-medium leading-relaxed mb-6 flex-1">{hamper.desc}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-jakarta font-black text-[#D97736]">Rp {hamper.price.toLocaleString('id-ID')}</span>
                    <button 
                      onClick={() => { 
                        if (addToCart) addToCart({ id: hamper.id, name: hamper.name, price: hamper.price });
                        alert(`${hamper.name} masuk keranjang!`); 
                      }} 
                      className="w-12 h-12 rounded-full bg-white border-2 border-[#4A3022] text-[#4A3022] flex items-center justify-center hover:bg-[#D97736] hover:text-white transition-colors active:scale-95 shadow-[2px_2px_0px_#4A3022]"
                    >
                      <Plus size={24} strokeWidth={3} />
                    </button>
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