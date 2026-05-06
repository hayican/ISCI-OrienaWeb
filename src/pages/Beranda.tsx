import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ShoppingBag, 
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
      className="relative bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-[#4A3022]/10 border border-[#FAF5E9] overflow-hidden group hover:shadow-[#D97736]/10 transition-shadow duration-500"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FAF5E9] rounded-full blur-2xl opacity-60 group-hover:scale-150 transition-transform duration-700"></div>
      
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-[#FAF5E9] text-[#D97736] rounded-2xl flex items-center justify-center mb-2 shadow-inner"
            >
              <Cookie size={32} />
            </motion.div>
            <h3 className="text-3xl font-playfair font-black text-[#4A3022]">Temukan Teman<br/>Nyemilmu!</h3>
            <p className="text-[#4A3022]/70 font-jakarta font-medium">Bingung milih kue? Jawab 3 pertanyaan singkat ini dan biarkan oven kami merekomendasikan.</p>
            <button 
              onClick={() => setStep(1)}
              className="mt-4 bg-[#4A3022] hover:bg-[#3E2723] text-[#FAF5E9] px-8 py-4 rounded-xl font-jakarta font-bold w-full flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95 hover:-translate-y-1"
            >
              Mulai Kuis <ArrowRight size={20} />
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
                <div key={num} className={`h-2 flex-1 rounded-full transition-all duration-500 ${num <= step ? 'bg-[#D97736] scale-y-110' : 'bg-[#FAF5E9]'}`} />
              ))}
            </div>

            <h3 className="text-2xl font-playfair font-bold text-[#4A3022] text-center leading-tight">
              {questions[step - 1].title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step - 1].options.map((opt, idx) => (
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  key={idx}
                  onClick={() => handleAnswer(questions[step - 1].id, opt.value)}
                  className="group flex flex-col items-center justify-center p-6 bg-[#FAF5E9] border-2 border-transparent hover:border-[#D97736] rounded-2xl transition-all duration-300 hover:shadow-lg shadow-[#D97736]/20"
                >
                  <div className="text-[#D97736] mb-4 group-hover:scale-125 transition-transform">
                    {opt.icon}
                  </div>
                  <span className="font-jakarta font-bold text-[#4A3022]">{opt.label}</span>
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
            className="text-center space-y-6"
          >
            <div className="inline-block px-4 py-1.5 bg-[#829079]/10 text-[#829079] rounded-full text-xs font-jakarta font-bold mb-2 animate-pulse">
              PERFECT MATCH ✨
            </div>
            
            {(() => {
              const res = getResult();
              return (
                <>
                  <h3 className="text-3xl font-playfair font-black text-[#4A3022]">{res.name}</h3>
                  <p className="text-[#4A3022]/70 font-jakarta">{res.desc}</p>
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
                      className="bg-[#D97736] hover:bg-[#C46A2B] text-[#FAF5E9] py-4 rounded-xl font-jakarta font-bold w-full transition-all hover:-translate-y-1 active:scale-95 shadow-lg shadow-[#D97736]/30"
                    >
                      Langsung Bungkus!
                    </button>
                    <button 
                      onClick={() => { setStep(0); setAnswers({}); }}
                      className="text-[#829079] font-jakarta font-semibold text-sm hover:underline"
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
      className="space-y-24"
    >
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 flex flex-col-reverse md:flex-row items-center gap-12 overflow-hidden min-h-[85vh]">
        <div className="w-full md:w-1/2 space-y-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block px-4 py-1.5 rounded-full border-2 border-[#829079] text-[#829079] text-xs font-jakarta font-bold tracking-widest uppercase shadow-sm"
          >
            ARTISAN BAKERY & HAMPERS
          </motion.div>
          
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
            className="text-lg md:text-xl font-jakarta text-[#4A3022]/80 max-w-lg leading-relaxed"
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
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('hampers')}
              className="bg-[#D97736] text-[#FAF5E9] px-8 py-4 rounded-2xl font-jakarta font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#D97736]/30 group"
            >
              <Package size={24} className="group-hover:rotate-12 transition-transform" />
              Rakit Hampers
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('katalog')}
              className="bg-transparent border-2 border-[#4A3022] text-[#4A3022] hover:bg-[#4A3022] hover:text-[#FAF5E9] px-8 py-4 rounded-2xl font-jakarta font-bold text-lg flex items-center justify-center gap-3 transition-colors"
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

      {/* 2. HIGHLIGHT SECTION (Dengan efek 3D Tilt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
          {/* Card 1 (Besar) */}
          <motion.div 
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.02, rotateY: 5, rotateX: 2, zIndex: 10 }}
            className="group relative md:col-span-2 bg-[#FAF5E9] rounded-[2rem] p-8 border-2 border-transparent hover:border-[#D97736]/30 overflow-hidden cursor-pointer shadow-lg shadow-[#4A3022]/5 min-h-[300px] flex flex-col justify-end preserve-3d"
            onClick={() => setCurrentView('katalog')}
          >
            <div className="absolute inset-0 bg-[#D97736]/10 group-hover:scale-110 transition-transform duration-700 ease-in-out"></div>
            <div className="relative z-10 w-full md:w-1/2 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl" style={{ transform: "translateZ(30px)" }}>
              <div className="inline-block px-3 py-1 bg-[#D97736] text-[#FAF5E9] rounded-full text-xs font-jakarta font-bold mb-3 shadow-sm animate-pulse">BEST SELLER</div>
              <h3 className="text-3xl font-playfair font-black text-[#4A3022] mb-2">Kastengel Royal</h3>
              <p className="text-[#4A3022]/80 font-jakarta font-medium mb-4 text-sm leading-relaxed">Garing di luar, keju edam yang pecah dan lumer di gigitan pertama.</p>
              <div className="flex items-center text-[#D97736] font-jakarta font-bold group-hover:translate-x-2 transition-transform">
                Lihat Detail <ArrowRight size={18} className="ml-1" />
              </div>
            </div>
          </motion.div>

          {/* Cards Kanan */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 100, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotateY: -5, rotateX: 2 }}
              className="group relative flex-1 bg-[#829079]/10 rounded-[2rem] p-6 border-2 border-transparent hover:border-[#829079]/30 overflow-hidden cursor-pointer flex flex-col justify-between shadow-md preserve-3d"
              onClick={() => setCurrentView('hampers')}
            >
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" style={{ transform: "translateZ(-20px)" }}>
                <Package size={140} />
              </div>
              <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-1">Rakit Hampers</h3>
                <p className="text-[#4A3022]/70 font-jakarta text-sm">Pilih dan susun sendiri isinya.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.05, rotateY: -5, rotateX: 2 }}
              className="group relative flex-1 bg-[#FAF5E9] shadow-md shadow-[#4A3022]/5 rounded-[2rem] p-6 border-2 border-transparent hover:border-[#D97736]/30 overflow-hidden cursor-pointer preserve-3d"
              onClick={() => setCurrentView('katalog')}
            >
              <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: "translateZ(20px)" }}>
                 <div>
                  <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-1">Nastar Classic</h3>
                  <p className="text-[#4A3022]/70 font-jakarta text-sm">Resep rahasia keluarga.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. STORY SECTION (Dengan Parallax Scroll) */}
      <section className="bg-[#4A3022] text-[#FAF5E9] py-24 px-4 sm:px-6 lg:px-8 mt-12 mb-12 relative overflow-hidden rounded-[3rem] mx-4 md:mx-8 shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-full md:w-1/2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-[#FAF5E9]/10 rounded-full text-[#D97736] text-xs font-jakarta font-bold tracking-widest uppercase"
            >
              CERITA DI BALIK DAPUR
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-6xl font-playfair font-black leading-tight"
            >
              Tanpa Pengawet.<br/><span className="text-[#D97736]">Penuh Proses.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1 }}
              className="text-[#FAF5E9]/80 font-jakarta text-lg max-w-md leading-relaxed"
            >
              Kami percaya bahwa rasa terbaik datang dari bahan yang jujur. Mentega pilihan, keju asli, dan proses panggangan artisan yang dijaga suhunya secara presisi.
            </motion.p>
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 relative">
            {/* Parallax elements */}
            <motion.div style={{ y: yParallax1 }} className="pt-20">
              <div className="bg-[#FAF5E9]/10 backdrop-blur-sm rounded-[3rem] aspect-square flex items-center justify-center p-6 border border-[#FAF5E9]/20 shadow-xl hover:scale-110 transition-transform cursor-pointer">
                <div className="text-center">
                  <span className="text-6xl floating inline-block">🧈</span>
                  <p className="mt-4 text-sm font-jakarta font-bold text-[#FAF5E9]/90 tracking-wide uppercase">Premium Butter</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div style={{ y: yParallax2 }}>
              <div className="bg-gradient-to-br from-[#D97736]/30 to-[#D97736]/10 backdrop-blur-sm rounded-[3rem] aspect-square flex items-center justify-center p-6 border border-[#D97736]/30 shadow-xl hover:scale-110 transition-transform cursor-pointer">
                <div className="text-center">
                  <span className="text-6xl floating inline-block" style={{animationDelay: '1s'}}>🧀</span>
                  <p className="mt-4 text-sm font-jakarta font-bold text-[#FAF5E9]/90 tracking-wide uppercase">Keju Edam Asli</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL SECTION (Staggered Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16 overflow-hidden">
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
                 <Star size={32} className="text-[#D97736] fill-[#D97736] drop-shadow-sm" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { name: "Siska P.", role: "Pecinta Kastengel", text: "Gila sih, beneran lumer banget di mulut! Kejunya berasa banget gak pelit." },
            { name: "Bapak Tono", role: "Corporate Client", text: "Pesanan hampers 50 box aman. Packaging elegan, bos pada suka." },
            { name: "Dina M.", role: "Customer Setia", text: "Nastarnya the best! Selainya kerasa buatan rumah, nggak bikin enek." }
          ].map((review, idx) => (
            <motion.div 
              key={idx}
              variants={{ hidden: { opacity: 0, y: 100, rotateX: 45 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 15 } } }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-[#4A3022]/5 border border-[#FAF5E9] flex flex-col justify-between"
            >
              <div>
                <Quote size={40} className="text-[#D97736]/20 mb-6" />
                <p className="text-[#4A3022]/80 font-jakarta font-medium text-lg mb-8 leading-relaxed italic">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-[#FAF5E9] pt-6">
                <div className="w-12 h-12 bg-[#FAF5E9] text-[#D97736] rounded-full flex items-center justify-center font-playfair font-black text-xl shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold font-jakarta text-[#4A3022]">{review.name}</h4>
                  <p className="text-xs font-jakarta text-[#829079] font-bold uppercase tracking-wider mt-1">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </motion.div>
  );
}