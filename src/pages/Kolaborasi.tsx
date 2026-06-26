import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Coffee, 
  Handshake, 
  MessageCircle, 
  Send, 
  UploadCloud,
  ArrowDownRight,
  Smile
} from 'lucide-react';

export default function Kolaborasi() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    date: '',
    quantity: '',
    message: ''
  });

  const collabOptions = [
    { 
      id: 'corporate', 
      title: 'Hampers Kantor', 
      desc: 'Bikin HRD tenang, karyawan seneng. Tanpa minimal order, bebas kirim ke seluruh Indonesia!', 
      icon: <Building2 size={40} strokeWidth={1.5} />,
      color: "bg-[#D97736]"
    },
    { 
      id: 'cafe', 
      title: 'Temen WFC Mu', 
      desc: 'Punya cafe atau toko? Kita siap suplai cemilan buat nemenin menu kopimu secara rutin.', 
      icon: <Coffee size={40} strokeWidth={1.5} />,
      color: "bg-[#829079]"
    },
    { 
      id: 'collab', 
      title: 'Kolab Seru-seruan', 
      desc: 'Bikin menu bundling bareng atau event pop-up? Ayo gas, kita obrolin!', 
      icon: <Handshake size={40} strokeWidth={1.5} />,
      color: "bg-[#eab308]"
    },
    { 
      id: 'casual', 
      title: 'Sapa Tetangga', 
      desc: 'Nggak usah formal-formal, mau nanya-nanya doang atau ngasih kritik saran juga boleh.', 
      icon: <MessageCircle size={40} strokeWidth={1.5} />,
      color: "bg-[#4A3022]"
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
    const phoneNumber = "628126120165";
    let text = `Halo Tetangga Oriena! 👋\n\n`;

    if (selectedType === 'corporate') {
      text += `Saya tertarik ngobrol soal *Hampers Kantor* nih.\n\n`;
      text += `🏢 Instansi: ${formData.company || '-'}\n`;
      text += `📦 Estimasi: ${formData.quantity || '-'} box\n`;
      text += `📅 Tanggal: ${formData.date || '-'}\n`;
    } else if (selectedType === 'cafe') {
      text += `Saya mau ngobrolin soal *Suplai Cafe*.\n\n`;
      text += `☕ Nama Cafe: ${formData.company || '-'}\n`;
      text += `📦 Kebutuhan Harian: ${formData.quantity || '-'}\n`;
    } else if (selectedType === 'collab') {
      text += `Ayo kita *Kolab Seru-seruan*!\n\n`;
      text += `🤝 Nama Brand/Acara: ${formData.company || '-'}\n`;
    } else {
      text += `Cuma mau *Sapa Tetangga* aja nih.\n\n`;
    }

    text += `👤 Dari: ${formData.name || '-'}\n`;
    text += `💬 Pesan: ${formData.message || '-'}\n\n`;
    text += `Ditunggu balasan hangatnya ya!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FAF5E9] font-jakarta pb-24 overflow-hidden relative"
    >
      
      {/* ==========================================
      // SECTION: MARQUEE
      // ========================================== */}
      <div className="absolute top-28 md:top-32 left-0 w-[110%] -translate-x-4 bg-[#D97736] border-y-4 border-[#4A3022] py-3 -rotate-2 z-0 overflow-hidden shadow-lg">
        <div className="animate-marquee-custom flex gap-8 whitespace-nowrap text-[#FAF5E9] font-playfair font-black text-xl md:text-2xl uppercase tracking-widest">
          <span>• BUKA PINTU KOLABORASI</span>
          <span>• MARI BERTUMBUH BERSAMA</span>
          <span>• LOKAL MENDUKUNG LOKAL</span>
          <span>• BUKA PINTU KOLABORASI</span>
          <span>• MARI BERTUMBUH BERSAMA</span>
          <span>• LOKAL MENDUKUNG LOKAL</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 md:pt-56 relative z-10">
        
        {/* ==========================================
        // SECTION: HEADER
        // ========================================== */}
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-white border-4 border-[#4A3022] rounded-full text-[#4A3022] font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#4A3022]"
          >
            <Smile size={20} className="text-[#D97736]" /> Halo Tetangga!
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-7xl font-playfair font-black text-[#4A3022] tracking-tight leading-[1.1]"
          >
            Ada ide seru? <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 px-2 text-white">Mari Ngobrol!</span>
              <span className="absolute bottom-1 left-0 w-full h-[100%] bg-[#D97736] -z-10 -rotate-1"></span>
            </span>
          </motion.h1>
          <p className="text-xl text-[#4A3022]/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Dari suplai kopi pagi sampai hampers besar-besar an. Kita buka pintu selebar-lebarnya buat tumbuh bareng.
          </p>
        </div>

        {/* ==========================================
        // SECTION: CARDS PILIHAN
        // ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {collabOptions.map((opt, idx) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1, type: "spring" }}
              onClick={() => {
                setSelectedType(opt.id);
                setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
              }}
              className={`group relative text-left transition-all duration-300 ${
                selectedType === opt.id ? '-translate-y-4' : 'hover:-translate-y-2'
              }`}
            >
              <div 
                className={`h-full border-4 border-[#4A3022] rounded-[2rem] p-6 bg-white flex flex-col z-10 relative transition-all ${
                  selectedType === opt.id 
                    ? 'shadow-[8px_8px_0px_0px_#D97736]' 
                    : 'shadow-[8px_8px_0px_0px_#4A3022] hover:shadow-[12px_12px_0px_0px_#4A3022]'
                }`}
              >
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 border-2 border-[#4A3022] shadow-[4px_4px_0px_0px_#4A3022] ${opt.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {opt.icon}
                </div>
                <h3 className="font-playfair font-black text-2xl text-[#4A3022] mb-3 leading-tight group-hover:text-[#D97736] transition-colors">
                  {opt.title}
                </h3>
                <p className="text-[#4A3022]/70 font-medium leading-relaxed mt-auto">
                  {opt.desc}
                </p>
                
                {selectedType === opt.id && (
                  <div className="absolute top-4 right-4 text-[#D97736] animate-bounce">
                    <ArrowDownRight size={32} strokeWidth={3} />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* ==========================================
        // SECTION: FORM DINAMIS
        // ========================================== */}
        <AnimatePresence mode="wait">
          {selectedType && (
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="overflow-hidden"
            >
              <form 
                onSubmit={handleSendWA} 
                className="bg-[#FAF5E9] p-8 md:p-12 rounded-[3rem] border-4 border-[#4A3022] shadow-[12px_12px_0px_0px_#4A3022] relative z-10 mb-8"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/50 backdrop-blur-sm border-2 border-[#4A3022]/20 rotate-2 shadow-sm"></div>

                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-playfair font-black text-[#4A3022] mb-2 uppercase tracking-wide">
                    📝 Form {collabOptions.find(o => o.id === selectedType)?.title}
                  </h3>
                  <p className="text-[#4A3022]/70 font-bold">
                    Isi detailnya, agar kita bisa ngobrol lebih enak.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Nama Kamu *</label>
                    <input 
                      required 
                      name="name" 
                      onChange={handleInputChange} 
                      type="text" 
                      className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" 
                      placeholder="Panggil aja..." 
                    />
                  </div>

                  {selectedType === 'corporate' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Perusahaan/Kantor *</label>
                        <input 
                          required 
                          name="company" 
                          onChange={handleInputChange} 
                          type="text" 
                          className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" 
                          placeholder="PT Sukses Selalu" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Estimasi Jumlah Box</label>
                        <input 
                          name="quantity" 
                          onChange={handleInputChange} 
                          type="text" 
                          className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" 
                          placeholder="Kira-kira berapa?" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Tanggal Acara</label>
                        <input 
                          name="date" 
                          onChange={handleInputChange} 
                          type="date" 
                          className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2 mt-4">
                        <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Mau titip logo kantor? (Opsional)</label>
                        <label className="w-full bg-white border-4 border-dashed border-[#4A3022] hover:bg-[#D97736]/10 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group">
                          <UploadCloud className="text-[#4A3022] group-hover:-translate-y-2 transition-transform mb-3" size={40} />
                          <p className="text-base text-[#4A3022] font-black mb-1">
                            {fileName ? fileName : 'Klik buat upload file'}
                          </p>
                          <p className="text-sm text-[#4A3022]/60 font-bold text-center">
                            {fileName ? 'Siappp, ntar dikirim via WA ya!' : 'Buat dicetak di pita/kartu ucapan. Max 5MB.'}
                          </p>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                          />
                        </label>
                      </div>
                    </>
                  )}

                  {selectedType === 'cafe' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Nama Tempat Kopi *</label>
                        <input 
                          required 
                          name="company" 
                          onChange={handleInputChange} 
                          type="text" 
                          className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" 
                          placeholder="Teras Kopi..." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Butuh Berapa per Hari?</label>
                        <input 
                          name="quantity" 
                          onChange={handleInputChange} 
                          type="text" 
                          className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" 
                          placeholder="Contoh: 30 Croissant" 
                        />
                      </div>
                    </>
                  )}

                  {selectedType === 'collab' && (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Nama Brand / Acara *</label>
                      <input 
                        required 
                        name="company" 
                        onChange={handleInputChange} 
                        type="text" 
                        className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" 
                        placeholder="Brand / Acara Lo..." 
                      />
                    </div>
                  )}

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Ceritain idemu ke kita *</label>
                    <textarea 
                      required 
                      name="message" 
                      onChange={handleInputChange} 
                      rows={4} 
                      className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all resize-none" 
                      placeholder="Halo Oriena, gw ada ide nih..." 
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t-4 border-[#4A3022] pt-8 mt-4">
                  <p className="text-sm text-[#4A3022] font-bold w-full sm:w-1/2">
                    *Tenang, semua obrolan bakal diterusin langsung ke WhatsApp owner kita. Nggak pake bot!
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full sm:w-auto bg-[#D97736] text-white px-8 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 border-4 border-[#4A3022] shadow-[6px_6px_0px_0px_#4A3022] hover:bg-[#c46a2b] transition-colors shrink-0"
                  >
                    <Send size={24} strokeWidth={2.5} /> Kirim via WhatsApp
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}