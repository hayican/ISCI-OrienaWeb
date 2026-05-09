import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Coffee, 
  MonitorPlay, 
  Cookie, 
  CakeSlice, 
  CheckCircle, 
  MessageSquare,
  Package,
  Quote,
  Star
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES (TypeScript)
// ==========================================
interface BerandaProps {
  setCurrentView: (view: string) => void;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

interface TasteMatcherProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

// ==========================================
// COMPONENT 1: TASTE MATCHER (Kuis Interaktif)
// ==========================================
function TasteMatcher({ setCartCount }: TasteMatcherProps) {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'q1',
      title: "Lagi pengen rasa yang kayak gimana nih?",
      options: [
        { label: "Manis Legit", value: "manis", icon: <CakeSlice size={28} /> },
        { label: "Gurih Keju", value: "gurih", icon: <Cookie size={28} /> }
      ]
    },
    {
      id: 'q2',
      title: "Biasanya buat temen apa?",
      options: [
        { label: "Ngopi Pagi", value: "ngopi", icon: <Coffee size={28} /> },
        { label: "Nonton Netflix", value: "netflix", icon: <MonitorPlay size={28} /> }
      ]
    },
    {
      id: 'q3',
      title: "Tekstur favorit kamu?",
      options: [
        { label: "Lumer di Mulut", value: "lumer", icon: <MessageSquare size={28} /> },
        { label: "Garing Kress", value: "garing", icon: <CheckCircle size={28} /> }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setStep(prev => prev + 1);
  };

  const getResult = () => {
    if (answers.q1 === 'gurih') return { name: "Kastengel Royal", desc: "Gurihnya keju edam asli, renyah di luar lumer di dalam.", price: 95000 };
    if (answers.q1 === 'manis' && answers.q3 === 'lumer') return { name: "Nastar Classic", desc: "Selai nanas homemade yang lumer berpadu dengan adonan butter premium.", price: 85000 };
    return { name: "Almond Crispy", desc: "Tipis, renyah, manis yang pas buat nemenin maraton series favoritmu.", price: 65000 };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, type: "spring", bounce: 0.4 }}
      className="relative bg-[#FAF5E9] p-8 md:p-10 rounded-[2rem] border-4 border-[#4A3022] shadow-[12px_12px_0px_rgba(74,48,34,1)] overflow-hidden group"
    >
      {/* Pola flat bulat di latar belakang */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D97736]/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
      
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center text-center space-y-6 relative z-10"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-white border-4 border-[#4A3022] text-[#D97736] rounded-2xl flex items-center justify-center mb-2 shadow-[4px_4px_0px_rgba(74,48,34,1)]"
            >
              <Cookie size={32} strokeWidth={2.5} />
            </motion.div>
            <h3 className="text-3xl font-playfair font-black text-[#4A3022]">Temukan Teman<br/>Nyemilmu!</h3>
            <p className="text-[#4A3022]/80 font-jakarta font-bold">Bingung milih kue? Jawab 3 pertanyaan singkat ini dan biarkan oven kami merekomendasikan.</p>
            <button 
              onClick={() => setStep(1)}
              className="mt-4 bg-[#4A3022] hover:bg-[#D97736] text-[#FAF5E9] px-8 py-4 rounded-xl border-4 border-[#4A3022] font-jakarta font-black w-full flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_rgba(74,48,34,1)] active:shadow-[0px_0px_0px_rgba(74,48,34,1)] active:translate-y-1 hover:-translate-y-1"
            >
              Mulai Kuis <ArrowRight size={20} strokeWidth={3} />
            </button>
          </motion.div>
        )}

        {step > 0 && step <= questions.length && (
          <motion.div 
            key={`question-${step}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="space-y-8 relative z-10"
          >
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className={`h-2 flex-1 rounded-full border-2 border-[#4A3022] transition-all duration-500 ${num <= step ? 'bg-[#D97736] scale-y-110' : 'bg-white'}`} />
              ))}
            </div>

            <h3 className="text-2xl font-playfair font-black text-[#4A3022] text-center leading-tight">
              {questions[step - 1].title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step - 1].options.map((opt, idx) => (
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98, y: 2, boxShadow: "0px 0px 0px rgba(74,48,34,1)" }}
                  key={idx}
                  onClick={() => handleAnswer(questions[step - 1].id, opt.value)}
                  className="group flex flex-col items-center justify-center p-6 bg-white border-4 border-[#4A3022] hover:bg-[#D97736] rounded-2xl transition-colors duration-300 shadow-[6px_6px_0px_rgba(74,48,34,1)]"
                >
                  <div className="text-[#D97736] group-hover:text-white mb-4 transition-colors">
                    {opt.icon}
                  </div>
                  <span className="font-jakarta font-black text-[#4A3022] group-hover:text-white transition-colors">{opt.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step > questions.length && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center space-y-6 relative z-10"
          >
            <div className="inline-block px-4 py-1.5 bg-[#4A3022] text-[#FAF5E9] border-2 border-[#4A3022] rounded-full text-xs font-jakarta font-black mb-2 shadow-[2px_2px_0px_rgba(74,48,34,1)]">
              PERFECT MATCH ✨
            </div>
            
            {(() => {
              const res = getResult();
              return (
                <>
                  <h3 className="text-3xl font-playfair font-black text-[#4A3022]">{res.name}</h3>
                  <p className="text-[#4A3022]/80 font-jakarta font-bold">{res.desc}</p>
                  <motion.div 
                    initial={{ scale: 1.5, color: '#4A3022' }} 
                    animate={{ scale: 1, color: '#D97736' }} 
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-jakarta font-black"
                  >
                    Rp {res.price.toLocaleString('id-ID')}
                  </motion.div>
                  
                  <div className="pt-4 flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        setCartCount(prev => prev + 1);
                        setStep(0);
                        setAnswers({});
                        alert(`${res.name} masuk keranjang!`);
                      }}
                      className="bg-[#D97736] text-[#FAF5E9] border-4 border-[#4A3022] py-4 rounded-xl font-jakarta font-black w-full transition-all active:translate-y-1 hover:-translate-y-1 shadow-[4px_4px_0px_rgba(74,48,34,1)] active:shadow-[0px_0px_0px_rgba(74,48,34,1)]"
                    >
                      Langsung Bungkus!
                    </button>
                    <button 
                      onClick={() => { setStep(0); setAnswers({}); }}
                      className="text-[#4A3022] font-jakarta font-black text-sm hover:underline mt-2"
                    >
                      Ulangi Kuis
                    </button>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ==========================================
// COMPONENT UTAMA: BERANDA
// ==========================================
export default function Beranda({ setCurrentView, setCartCount }: BerandaProps) {
  // Setup Parallax Scroll
  const { scrollYProgress } = useScroll();
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Varian animasi Staggered Text untuk Judul Hero
  const title = "Bawa Hangatnya Oven Kami ke Meja Anda.".split(" ");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F7F3EB]" // Dasar background warm
    >
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20 flex flex-col-reverse md:flex-row items-center gap-12 overflow-hidden min-h-[85vh]">
        <div className="w-full md:w-1/2 space-y-8 relative z-10">
          
          {/* Staggered Text Reveal Animation */}
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="text-5xl md:text-7xl font-playfair font-black leading-[1.1] tracking-tight text-[#4A3022] flex flex-wrap gap-x-4"
          >
            {title.map((word, idx) => (
              <motion.span 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -90 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
                }}
                className={word === "Oven" || word === "Kami" ? "text-[#D97736]" : ""}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl font-jakarta text-[#4A3022]/80 font-bold max-w-lg leading-relaxed"
          >
            Nastar lumer, kastengel garing, dan berbagai kreasi pastry yang dibuat dengan tangan untuk menyempurnakan momen Anda.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.button 
              whileHover={{ y: -4 }} whileTap={{ y: 2, boxShadow: "0px 0px 0px rgba(74,48,34,1)" }}
              onClick={() => setCurrentView('hampers')}
              className="bg-[#D97736] text-[#FAF5E9] px-8 py-4 rounded-2xl border-4 border-[#4A3022] font-jakarta font-black text-lg flex items-center justify-center gap-3 shadow-[6px_6px_0px_rgba(74,48,34,1)] transition-all group"
            >
              <Package size={24} className="group-hover:rotate-12 transition-transform" />
              Rakit Hampers
            </motion.button>
            <motion.button 
              whileHover={{ y: -4 }} whileTap={{ y: 2, boxShadow: "0px 0px 0px rgba(74,48,34,1)" }}
              onClick={() => setCurrentView('katalog')}
              className="bg-white text-[#4A3022] border-4 border-[#4A3022] hover:bg-[#FAF5E9] px-8 py-4 rounded-2xl font-jakarta font-black text-lg flex items-center justify-center gap-3 shadow-[6px_6px_0px_rgba(74,48,34,1)] transition-all"
            >
              Lihat Menu
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Image / Taste Matcher */}
        <div className="w-full md:w-1/2 relative z-10 perspective-1000">
          <TasteMatcher setCartCount={setCartCount} />
        </div>
      </section>

      {/* 2. HIGHLIGHT SECTION (Solid / Flat Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4"
          >
            Langsung dari Oven.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 (Besar) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ y: -8 }}
            className="group relative md:col-span-2 bg-[#E0D0BB] rounded-[2rem] p-8 border-4 border-[#4A3022] shadow-[8px_8px_0px_rgba(74,48,34,1)] overflow-hidden cursor-pointer flex flex-col justify-end min-h-[300px]"
            onClick={() => setCurrentView('katalog')}
          >
            {/* Dekorasi shape abstrak khas brand lokal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97736] rounded-bl-[100%] group-hover:scale-110 transition-transform duration-700 ease-in-out border-b-4 border-l-4 border-[#4A3022]"></div>
            
            <div className="relative z-10 w-full md:w-1/2 bg-white p-6 rounded-3xl border-4 border-[#4A3022] shadow-[6px_6px_0px_rgba(74,48,34,1)] mt-auto">
              <div className="inline-block px-3 py-1 bg-[#D97736] text-[#FAF5E9] rounded-full text-xs font-jakarta font-black mb-3 border-2 border-[#4A3022]">BEST SELLER</div>
              <h3 className="text-3xl font-playfair font-black text-[#4A3022] mb-2">Kastengel Royal</h3>
              <p className="text-[#4A3022]/80 font-jakarta font-bold mb-4 text-sm leading-relaxed">Garing di luar, keju edam yang pecah dan lumer di gigitan pertama.</p>
              <div className="flex items-center text-[#D97736] font-jakarta font-black group-hover:translate-x-2 transition-transform">
                Lihat Detail <ArrowRight size={18} className="ml-1" strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Cards Kanan */}
          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ y: -6 }}
              className="group relative flex-1 bg-[#D97736] text-white rounded-[2rem] p-6 border-4 border-[#4A3022] shadow-[6px_6px_0px_rgba(74,48,34,1)] overflow-hidden cursor-pointer flex flex-col justify-between"
              onClick={() => setCurrentView('hampers')}
            >
              <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 text-[#4A3022]">
                <Package size={140} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-playfair font-black mb-1">Rakit Hampers</h3>
                <p className="font-jakarta text-sm font-bold opacity-90">Pilih dan susun sendiri isinya.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              whileHover={{ y: -6 }}
              className="group relative flex-1 bg-[#FAF5E9] rounded-[2rem] p-6 border-4 border-[#4A3022] shadow-[6px_6px_0px_rgba(74,48,34,1)] overflow-hidden cursor-pointer"
              onClick={() => setCurrentView('katalog')}
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                  <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-1">Nastar Classic</h3>
                  <p className="text-[#4A3022]/80 font-jakarta text-sm font-bold">Resep rahasia keluarga.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. STORY SECTION (Tema Solid Kopi Tuku dengan Foto) */}
      <section className="bg-[#D2C5B3] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-y-8 border-[#4A3022]">
        {/* Pattern dihapus agar warna solid dan lebih clean */}
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-[#4A3022] text-[#FAF5E9] border-2 border-[#4A3022] rounded-full text-xs font-jakarta font-black tracking-widest uppercase shadow-[4px_4px_0px_rgba(217,119,54,1)]"
            >
              CERITA DI BALIK DAPUR
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-6xl font-playfair font-black text-[#4A3022] leading-tight drop-shadow-[2px_2px_0px_#FAF5E9]"
            >
              Tanpa Pengawet.<br/><span className="text-[#D97736]">Penuh Perasaan.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1 }}
              className="text-[#4A3022]/90 font-jakarta font-bold text-lg max-w-md leading-relaxed"
            >
              Kami percaya bahwa rasa terbaik datang dari bahan yang jujur. Mentega pilihan, keju asli, dan proses panggangan artisan yang dijaga suhunya secara presisi.
            </motion.p>
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 relative">
            {/* Foto Premium Butter */}
            <motion.div style={{ y: yParallax1 }} className="pt-20">
              <div className="bg-white rounded-[2rem] flex flex-col overflow-hidden border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] hover:-translate-y-2 transition-transform cursor-pointer">
                <div className="h-40 sm:h-48 w-full border-b-4 border-[#4A3022]">
                  <img src="https://i.pinimg.com/1200x/8b/ca/86/8bca86af3169e15ef1dcb7a5ffd150b6.jpg" alt="Premium Butter" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center bg-[#FAF5E9]">
                  <p className="font-jakarta font-black text-[#4A3022] tracking-wide uppercase text-sm">Premium Butter</p>
                </div>
              </div>
            </motion.div>
            
            {/* Foto Keju Edam Asli */}
            <motion.div style={{ y: yParallax2 }}>
              <div className="bg-white rounded-[2rem] flex flex-col overflow-hidden border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] hover:-translate-y-2 transition-transform cursor-pointer">
                <div className="h-40 sm:h-48 w-full border-b-4 border-[#4A3022]">
                  <img src="https://i.pinimg.com/736x/06/a5/25/06a525f631c5e2d058b06c15228eb296.jpg" alt="Keju Edam Asli" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center bg-[#D97736]">
                  <p className="font-jakarta font-black text-white tracking-wide uppercase text-sm">Keju Edam Asli</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL SECTION (Flat & Solid Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022]"
          >
            Manisnya Kata Mereka.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}
            className="flex gap-1"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: i * 0.1, duration: 2 }}>
                 <Star size={32} className="text-[#D97736] fill-[#D97736]" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { name: "Siska P.", role: "Pecinta Kastengel", text: "Gila sih, beneran lumer banget di mulut! Kejunya berasa banget gak pelit." },
            { name: "Bapak Tono", role: "Corporate Client", text: "Pesanan hampers 50 box aman. Packaging elegan, bos pada suka." },
            { name: "Dina M.", role: "Customer Setia", text: "Nastarnya the best! Selainya kerasa buatan rumah, nggak bikin enek." }
          ].map((review, idx) => (
            <motion.div 
              key={idx}
              variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } } }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] flex flex-col justify-between"
            >
              <div>
                <Quote size={40} className="text-[#D97736] mb-6" strokeWidth={3} />
                <p className="text-[#4A3022] font-jakarta font-bold text-lg mb-8 leading-relaxed">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-4 border-t-4 border-[#4A3022] pt-6">
                <div className="w-12 h-12 bg-[#D97736] border-2 border-[#4A3022] text-[#FAF5E9] rounded-full flex items-center justify-center font-playfair font-black text-xl shadow-[2px_2px_0px_#4A3022]">
                  {review.name.charAt(0)}
                </div>
                
                <div>
                  <h4 className="font-black font-jakarta text-[#4A3022]">{review.name}</h4>
                  <p className="text-xs font-jakarta text-[#4A3022]/70 font-bold uppercase tracking-wider mt-1">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </motion.div>
  );
}