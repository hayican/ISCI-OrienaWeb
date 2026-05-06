import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Coffee, 
  Handshake, 
  MessageCircle, 
  Send, 
  UploadCloud, 
  Package, 
  Store 
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES (TypeScript)
// ==========================================
interface KolaborasiProps {
  setCurrentView?: (view: string) => void;
}

interface FormDataState {
  name: string;
  company: string;
  date: string;
  quantity: string;
  message: string;
}

interface CollabOption {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

// ==========================================
// COMPONENT UTAMA: KOLABORASI
// ==========================================
export default function Kolaborasi({ setCurrentView }: KolaborasiProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    company: '',
    date: '',
    quantity: '',
    message: ''
  });

  const collabOptions: CollabOption[] = [
    { 
      id: 'corporate', 
      title: 'Corporate Hampers', 
      desc: 'Pesanan jumlah besar untuk klien atau karyawan.', 
      icon: <Building2 size={32} /> 
    },
    { 
      id: 'cafe', 
      title: 'Cafe Supply', 
      desc: 'Pemasok pastry reguler untuk coffee shop-mu.', 
      icon: <Coffee size={32} /> 
    },
    { 
      id: 'collab', 
      title: 'Brand Collab', 
      desc: 'Bikin event atau produk bundling bareng.', 
      icon: <Handshake size={32} /> 
    },
    { 
      id: 'casual', 
      title: 'Sapa Kami', 
      desc: 'Cuma mau ngobrol atau nanya-nanya santai.', 
      icon: <MessageCircle size={32} /> 
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "6281234567890"; // Nomor Dummy
    let text = `Halo Oriena! 👋\n\n`;

    if (selectedType === 'corporate') {
      text += `Saya tertarik untuk pesanan Corporate Hampers.\n\n`;
      text += `🏢 Instansi: ${formData.company || '-'}\n`;
      text += `📦 Estimasi Jumlah: ${formData.quantity || '-'} box\n`;
      text += `📅 Tanggal Acara: ${formData.date || '-'}\n`;
      if (fileName) {
        text += `📎 Catatan: Saya punya file logo ("${fileName}") yang akan saya kirim setelah pesan ini untuk dicetak.\n`;
      }
    } else if (selectedType === 'cafe') {
      text += `Saya tertarik untuk supply pastry ke cafe saya.\n\n`;
      text += `☕ Nama Cafe: ${formData.company || '-'}\n`;
      text += `📦 Estimasi Kebutuhan Harian: ${formData.quantity || '-'}\n`;
    } else if (selectedType === 'collab') {
      text += `Saya tertarik untuk ngajak Kolaborasi Brand nih!\n\n`;
      text += `🤝 Nama Brand/Acara: ${formData.company || '-'}\n`;
    } else {
      text += `Mau nanya-nanya dulu nih.\n\n`;
    }

    text += `👤 Nama Saya: ${formData.name || '-'}\n`;
    text += `💬 Pesan: ${formData.message || '-'}\n\n`;
    text += `Ditunggu balasan hangatnya dari dapur Oriena!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  // Varian untuk efek Staggered Reveal Judul
  const titleWords = "Bikin Momen Makin Manis Bareng Oriena.".split(" ");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 overflow-hidden"
    >
      {/* 1. LAYOUT 2 KOLOM */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative mt-8 md:mt-12">
        
        {/* KOLOM KIRI: Headline & Pilihan */}
        <div className="w-full lg:w-5/12 flex flex-col relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block px-4 py-1.5 bg-[#D97736]/10 rounded-full text-[#D97736] text-xs font-jakarta font-bold tracking-widest uppercase mb-6 w-max shadow-sm"
          >
            B2B & PARTNERSHIP
          </motion.div>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-black text-[#4A3022] tracking-tight mb-6 leading-[1.1] flex flex-wrap gap-x-3"
          >
            {titleWords.map((word, idx) => (
              <motion.span 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -90 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
                }}
                className={word === "Oriena." ? "text-[#D97736]" : ""}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-lg font-jakarta text-[#4A3022]/70 leading-relaxed mb-10"
          >
            Dari bingkisan kantor sampai suplai cafe harian. Pilih kebutuhanmu dan mari ngobrol santai bareng tim kami.
          </motion.p>

          <motion.div 
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20 perspective-1000"
          >
            {collabOptions.map((opt) => (
              <motion.button
                key={opt.id}
                variants={{
                  hidden: { opacity: 0, y: 30, rotateY: 20 },
                  visible: { opacity: 1, y: 0, rotateY: 0, transition: { type: "spring" } }
                }}
                whileHover={{ scale: 1.05, y: -5, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(opt.id)}
                className={`group p-6 rounded-[2rem] border-2 text-left transition-colors duration-300 flex flex-col h-full ${
                  selectedType === opt.id 
                    ? 'bg-[#4A3022] border-[#4A3022] shadow-xl shadow-[#4A3022]/20' 
                    : 'bg-white border-[#FAF5E9] shadow-md shadow-[#4A3022]/5 hover:border-[#D97736]/30'
                }`}
              >
                <div className={`mb-4 transition-colors ${selectedType === opt.id ? 'text-[#D97736]' : 'text-[#829079] group-hover:text-[#D97736]'}`}>
                  {opt.icon}
                </div>
                <h3 className={`font-playfair font-black text-lg mb-2 ${selectedType === opt.id ? 'text-[#FAF5E9]' : 'text-[#4A3022]'}`}>
                  {opt.title}
                </h3>
                <p className={`font-jakarta text-sm leading-relaxed mt-auto ${selectedType === opt.id ? 'text-[#FAF5E9]/70' : 'text-[#4A3022]/60'}`}>
                  {opt.desc}
                </p>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* KOLOM KANAN: Visual & Form */}
        <div className="w-full lg:w-7/12 relative">
          
          {/* VISUAL SHOWCASE (Background Estetik Parallax) */}
          <motion.div 
            animate={{ rotate: [2, 4, 2], scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-br from-[#D97736]/10 to-transparent rounded-[3rem] transform origin-bottom-right z-0 border-2 border-[#D97736]/20 flex items-end justify-end p-8 overflow-hidden pointer-events-none"
          >
             <div className="opacity-10 text-[#D97736] translate-x-12 translate-y-12">
                <Package size={300} strokeWidth={1} />
             </div>
          </motion.div>

          <div className="relative z-10 bg-white/95 backdrop-blur-xl min-h-[500px] rounded-[3rem] shadow-2xl shadow-[#4A3022]/5 border border-[#FAF5E9] p-6 sm:p-8 md:p-12 overflow-hidden flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!selectedType ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="text-center py-12"
                >
                  <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    <Package size={80} className="mx-auto text-[#D97736]/30 mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-playfair font-black text-[#4A3022] mb-3">Menunggu Pilihanmu...</h3>
                  <p className="text-[#4A3022]/60 font-jakarta font-medium max-w-sm mx-auto">Silakan klik salah satu opsi kolaborasi di sebelah kiri untuk mulai mengisi detailnya.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key={selectedType}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", damping: 20 }}
                  onSubmit={handleSendWA} 
                  className="w-full"
                >
                  <div className="mb-8">
                    <h3 className="text-3xl font-playfair font-black text-[#4A3022] mb-2 flex items-center gap-3">
                      {collabOptions.find(o => o.id === selectedType)?.icon}
                      {collabOptions.find(o => o.id === selectedType)?.title}
                    </h3>
                    <p className="text-[#4A3022]/60 font-jakarta font-medium">Lengkapi form ini biar admin kami bisa kasih rekomendasi terbaik.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-jakarta">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#4A3022]">Nama Lengkap *</label>
                      <input required name="name" onChange={handleInputChange} type="text" className="w-full bg-[#FAF5E9]/50 border-2 border-[#FAF5E9] focus:border-[#D97736] focus:bg-white rounded-xl p-3.5 outline-none text-[#4A3022] transition-all" placeholder="Cth: Budi Santoso" />
                    </div>

                    {selectedType === 'corporate' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#4A3022]">Instansi/Perusahaan *</label>
                          <input required name="company" onChange={handleInputChange} type="text" className="w-full bg-[#FAF5E9]/50 border-2 border-[#FAF5E9] focus:border-[#D97736] focus:bg-white rounded-xl p-3.5 outline-none text-[#4A3022] transition-all" placeholder="Cth: PT Maju Jaya" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#4A3022]">Estimasi Jumlah Box</label>
                          <input name="quantity" onChange={handleInputChange} type="text" className="w-full bg-[#FAF5E9]/50 border-2 border-[#FAF5E9] focus:border-[#D97736] focus:bg-white rounded-xl p-3.5 outline-none text-[#4A3022] transition-all" placeholder="Cth: 100 box" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#4A3022]">Tanggal Acara / Pengiriman</label>
                          <input name="date" onChange={handleInputChange} type="date" className="w-full bg-[#FAF5E9]/50 border-2 border-[#FAF5E9] focus:border-[#D97736] focus:bg-white rounded-xl p-3.5 outline-none text-[#4A3022] transition-all" />
                        </div>
                        
                        {/* FITUR UPLOAD LOGO */}
                        <div className="space-y-2 md:col-span-2 mt-2">
                          <label className="text-sm font-bold text-[#4A3022]">Upload Logo Perusahaan (Opsional)</label>
                          <label className="w-full bg-white border-2 border-dashed border-[#D97736]/40 hover:border-[#D97736] hover:bg-[#D97736]/5 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group">
                            <UploadCloud className="text-[#D97736]/50 group-hover:text-[#D97736] group-hover:-translate-y-1 transition-transform mb-3" size={32} />
                            <p className="text-sm text-[#4A3022]/80 font-bold mb-1">
                              {fileName ? fileName : 'Klik untuk upload file gambarmu'}
                            </p>
                            <p className="text-xs text-[#4A3022]/50 text-center max-w-xs">
                              {fileName ? 'Logo siap dikirimkan via WA' : 'Format: PNG, JPG (Maksimal 5MB)'}
                            </p>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                          </label>
                        </div>
                      </>
                    )}

                    {selectedType === 'cafe' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#4A3022]">Nama Cafe *</label>
                          <input required name="company" onChange={handleInputChange} type="text" className="w-full bg-[#FAF5E9]/50 border-2 border-[#FAF5E9] focus:border-[#D97736] focus:bg-white rounded-xl p-3.5 outline-none text-[#4A3022] transition-all" placeholder="Cth: Senja Coffee" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#4A3022]">Estimasi Kebutuhan Harian</label>
                          <input name="quantity" onChange={handleInputChange} type="text" className="w-full bg-[#FAF5E9]/50 border-2 border-[#FAF5E9] focus:border-[#D97736] focus:bg-white rounded-xl p-3.5 outline-none text-[#4A3022] transition-all" placeholder="Cth: 20 pcs Pastry/hari" />
                        </div>
                      </>
                    )}

                    {selectedType === 'collab' && (
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-[#4A3022]">Nama Brand / Acara *</label>
                        <input required name="company" onChange={handleInputChange} type="text" className="w-full bg-[#FAF5E9]/50 border-2 border-[#FAF5E9] focus:border-[#D97736] focus:bg-white rounded-xl p-3.5 outline-none text-[#4A3022] transition-all" placeholder="Cth: Brand Fashion X" />
                      </div>
                    )}

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-[#4A3022]">Ceritain detailnya ke kami *</label>
                      <textarea required name="message" onChange={handleInputChange} rows={4} className="w-full bg-[#FAF5E9]/50 border-2 border-[#FAF5E9] focus:border-[#D97736] focus:bg-white rounded-xl p-4 outline-none text-[#4A3022] resize-none transition-all" placeholder="Hai Oriena! Saya tertarik untuk..."></textarea>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#FAF5E9] pt-8">
                    <p className="text-xs text-[#4A3022]/60 font-jakarta font-medium w-full sm:w-1/2">
                      Data ini akan otomatis disalin ke WhatsApp agar mempermudah tim kami melayanimu.
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full sm:w-auto bg-[#D97736] hover:bg-[#C46A2B] text-white px-8 py-4 rounded-2xl font-jakarta font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D97736]/20 shrink-0 transition-colors"
                    >
                      <Send size={20} /> Kirim Pesan via WA
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2. TRUST BADGES (Marquee with Framer Motion) */}
      <div className="mt-32 pt-12 border-t border-[#4A3022]/10 relative">
        <p className="text-center text-xs font-jakarta font-bold text-[#829079] tracking-widest uppercase mb-10">Telah Dipercaya & Bekerjasama Dengan</p>
        
        <div className="overflow-hidden w-full relative flex">
          {/* Efek gradient di kiri-kanan buat transisi alus */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAF5E9] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAF5E9] to-transparent z-10"></div>
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex whitespace-nowrap opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-700 py-4"
          >
            {/* Duplikasi 2 set untuk efek infinite loop yang mulus */}
            {[1, 2].map((set) => (
              <div key={set} className="flex items-center justify-around gap-16 md:gap-24 px-8 md:px-12">
                <div className="flex items-center gap-3 font-playfair font-black text-2xl text-[#4A3022]">
                  <Coffee className="text-[#D97736]" size={32}/> Senja Coffee
                </div>
                <div className="flex items-center gap-3 font-playfair font-black text-2xl text-[#4A3022]">
                  <Building2 className="text-[#D97736]" size={32}/> Bank Sejahtera
                </div>
                <div className="flex items-center gap-3 font-playfair font-black text-2xl text-[#4A3022]">
                  <Package className="text-[#D97736]" size={32}/> Eventoria Inc.
                </div>
                <div className="flex items-center gap-3 font-playfair font-black text-2xl text-[#4A3022]">
                  <Store className="text-[#D97736]" size={32}/> Kopi Lokal
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
}