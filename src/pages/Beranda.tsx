import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Coffee, 
  MonitorPlay, 
  Cookie, 
  CakeSlice, 
  Package, 
  MessageSquare, 
  CheckCircle,
  Star,
  Quote
} from 'lucide-react';

interface BerandaProps {
  navigateTo: (page: string) => void;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

// ==========================================
// KOMPONEN PENDUKUNG HALAMAN BERANDA
// ==========================================

function TasteMatcher({ setCartCount }: { setCartCount: React.Dispatch<React.SetStateAction<number>> }) {
  const [step, setStep] = useState(0);
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

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
  };

  const getResult = () => {
    if (answers.q1 === 'gurih') return { name: "Kastengel Royal", desc: "Gurihnya keju edam asli, renyah di luar lumer di dalam.", price: 95000 };
    if (answers.q1 === 'manis' && answers.q3 === 'lumer') return { name: "Nastar Classic", desc: "Selai nanas homemade yang lumer berpadu dengan adonan butter premium.", price: 85000 };
    return { name: "Almond Crispy", desc: "Tipis, renyah, manis yang pas buat nemenin maraton series favoritmu.", price: 65000 };
  };

  return (
    <div className="relative bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-[#4A3022]/5 border border-[#FAF5E9] overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FAF5E9] rounded-full blur-2xl opacity-60"></div>
      
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="w-16 h-16 bg-[#FAF5E9] text-[#D97736] rounded-2xl flex items-center justify-center mb-2">
              <Cookie size={32} />
            </div>
            <h3 className="text-3xl font-black text-[#4A3022]">Temukan Teman<br/>Nyemilmu!</h3>
            <p className="text-[#4A3022]/70 font-medium">Bingung milih kue? Jawab 3 pertanyaan singkat ini dan biarkan oven kami yang merekomendasikan.</p>
            <button 
              onClick={() => setStep(1)}
              className="mt-4 bg-[#4A3022] hover:bg-[#3E2723] text-[#FAF5E9] px-8 py-4 rounded-xl font-bold w-full flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              Mulai Kuis <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step > 0 && step <= questions.length && (
          <motion.div 
            key={`question-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className={`h-2 flex-1 rounded-full ${num <= step ? 'bg-[#D97736]' : 'bg-[#FAF5E9]'}`} />
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#4A3022] text-center leading-tight">
              {questions[step - 1].title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(questions[step - 1].id, opt.value)}
                  className="group flex flex-col items-center justify-center p-6 bg-[#FAF5E9] border-2 border-transparent hover:border-[#D97736] rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-[#D97736] mb-4 group-hover:scale-110 transition-transform">
                    {opt.icon}
                  </div>
                  <span className="font-bold text-[#4A3022]">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step > questions.length && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="inline-block px-4 py-1.5 bg-[#829079]/10 text-[#829079] rounded-full text-sm font-bold mb-2">
              PERFECT MATCH ✨
            </div>
            
            {(() => {
              const res = getResult();
              return (
                <>
                  <h3 className="text-3xl font-black text-[#4A3022]">{res.name}</h3>
                  <p className="text-[#4A3022]/70">{res.desc}</p>
                  <div className="text-2xl font-bold text-[#D97736]">
                    Rp {res.price.toLocaleString('id-ID')}
                  </div>
                  
                  <div className="pt-4 flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        setCartCount(prev => prev + 1);
                        resetQuiz();
                      }}
                      className="bg-[#D97736] hover:bg-[#C46A2B] text-[#FAF5E9] py-4 rounded-xl font-bold w-full transition-transform active:scale-95 shadow-lg shadow-[#D97736]/20"
                    >
                      Langsung Bungkus!
                    </button>
                    <button 
                      onClick={resetQuiz}
                      className="text-[#829079] font-semibold text-sm hover:underline"
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
    </div>
  );
}

function HighlightSection({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-black text-[#4A3022] mb-4"
        >
          Langsung dari Oven.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[#4A3022]/70 max-w-2xl mx-auto"
        >
          Pilihan artisan favorit yang paling sering dicari buat nemenin momen-momen spesialmu.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group relative md:col-span-2 bg-[#FAF5E9] rounded-[2rem] p-8 border-2 border-transparent hover:border-[#D97736]/30 overflow-hidden cursor-pointer shadow-lg shadow-[#4A3022]/5 transition-all duration-300 min-h-[300px] flex flex-col justify-end"
          onClick={() => navigateTo('katalog')}
        >
          <div className="absolute inset-0 bg-[#D97736]/10 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
          
          <div className="relative z-10 w-full md:w-1/2 bg-white/80 backdrop-blur-md p-6 rounded-3xl">
            <div className="inline-block px-3 py-1 bg-[#D97736] text-[#FAF5E9] rounded-full text-xs font-bold mb-3">BEST SELLER</div>
            <h3 className="text-2xl font-black text-[#4A3022] mb-2">Kastengel Royal</h3>
            <p className="text-[#4A3022]/80 font-medium mb-4 text-sm">Garing di luar, keju edam yang pecah dan lumer di gigitan pertama.</p>
            <div className="flex items-center text-[#D97736] font-bold group-hover:translate-x-2 transition-transform">
              Lihat Detail <ArrowRight size={18} className="ml-1" />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative flex-1 bg-[#829079]/10 rounded-[2rem] p-6 border-2 border-transparent hover:border-[#829079]/30 overflow-hidden cursor-pointer flex flex-col justify-between"
            onClick={() => navigateTo('hampers')}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <Package size={120} />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#4A3022] mb-1">Rakit Hampers</h3>
              <p className="text-[#4A3022]/70 text-sm">Pilih dan susun sendiri isinya.</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#829079] group-hover:bg-[#829079] group-hover:text-white transition-colors mt-4">
              <ArrowRight size={20} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative flex-1 bg-[#FAF5E9] shadow-lg shadow-[#4A3022]/5 rounded-[2rem] p-6 border-2 border-transparent hover:border-[#D97736]/30 overflow-hidden cursor-pointer"
            onClick={() => navigateTo('katalog')}
          >
            <div className="absolute inset-0 bg-[#D97736]/5 group-hover:bg-[#D97736]/10 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div>
                <h3 className="text-xl font-black text-[#4A3022] mb-1">Nastar Classic</h3>
                <p className="text-[#4A3022]/70 text-sm">Resep rahasia keluarga.</p>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-bold text-[#D97736]">
                Rp 85.000
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="bg-[#4A3022] text-[#FAF5E9] py-20 px-4 sm:px-6 lg:px-8 mt-12 mb-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-[#FAF5E9]/10 rounded-full text-[#D97736] text-sm font-bold tracking-wide"
          >
            CERITA DI BALIK DAPUR
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Tanpa Pengawet.<br/>Penuh Proses.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#FAF5E9]/80 text-lg max-w-md leading-relaxed"
          >
            Kami percaya bahwa rasa terbaik datang dari bahan yang jujur. Mentega pilihan, keju asli, dan proses panggangan artisan yang dijaga suhunya secara presisi. Dari adonan pertama hingga masuk ke dalam toples.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 inline-flex items-center text-[#D97736] font-bold hover:text-white transition-colors"
          >
            Baca Kisah Kami <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </div>

        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#FAF5E9]/10 rounded-[2rem] aspect-square flex items-center justify-center p-6 border border-[#FAF5E9]/20"
          >
            <div className="text-center">
              <span className="text-4xl">🧈</span>
              <p className="mt-2 text-sm font-medium text-[#FAF5E9]/70">Premium Butter</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#D97736]/20 rounded-[2rem] aspect-square flex items-center justify-center p-6 mt-8 border border-[#D97736]/30"
          >
            <div className="text-center">
              <span className="text-4xl">🧀</span>
              <p className="mt-2 text-sm font-medium text-[#FAF5E9]/70">Keju Edam Asli</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const reviews = [
    { name: "Siska P.", role: "Pecinta Kastengel", text: "Gila sih, beneran lumer banget di mulut! Kejunya berasa banget gak pelit sama sekali." },
    { name: "Bapak Tono", role: "Corporate Client", text: "Pesanan hampers untuk 50 klien kantor aman sentosa. Packagingnya rapi dan elegan." },
    { name: "Dina M.", role: "Beli buat Lebaran", text: "Nastarnya the best! Selai nanasnya kerasa buatan rumah banget, nggak terlalu manis." }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#4A3022] mb-4"
          >
            Manisnya Kata Mereka.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#4A3022]/70 max-w-lg"
          >
            Bukan kata kami, tapi kata mereka yang udah nyobain langsung resep rahasia dapur Oriena.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex gap-1"
        >
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} size={28} className="text-[#D97736] fill-[#D97736]" />
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="bg-white p-8 rounded-[2rem] shadow-xl shadow-[#4A3022]/5 border border-[#FAF5E9] hover:-translate-y-2 transition-transform duration-300"
          >
            <Quote size={32} className="text-[#D97736]/20 mb-6" />
            <p className="text-[#4A3022]/80 font-medium mb-8 leading-relaxed">
              "{review.text}"
            </p>
            <div>
              <h4 className="font-bold text-[#4A3022]">{review.name}</h4>
              <p className="text-sm text-[#829079] font-medium">{review.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// MAIN BERANDA COMPONENT
// ==========================================

const Beranda: React.FC<BerandaProps> = ({ navigateTo, setCartCount }) => {
  return (
    <div className="space-y-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full border border-[#829079] text-[#829079] text-sm font-bold tracking-wide"
          >
            ARTISAN BAKERY & HAMPERS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight"
          >
            Bawa Hangatnya <br/>
            <span className="text-[#D97736]">Oven Kami</span> ke <br/>
            Meja Anda.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#4A3022]/80 max-w-lg leading-relaxed"
          >
            Nastar lumer, kastengel garing, dan berbagai kreasi pastry yang dibuat dengan tangan untuk menyempurnakan momen Anda.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button 
              onClick={() => navigateTo('hampers')}
              className="bg-[#D97736] hover:bg-[#C46A2B] text-[#FAF5E9] px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D97736]/20"
            >
              <Package size={24} />
              Rakit Hampers
            </button>
            <button 
              onClick={() => navigateTo('katalog')}
              className="bg-transparent border-2 border-[#4A3022] text-[#4A3022] hover:bg-[#4A3022] hover:text-[#FAF5E9] px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors"
            >
              Lihat Menu
            </button>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2">
          <TasteMatcher setCartCount={setCartCount} />
        </div>
      </section>

      <HighlightSection navigateTo={navigateTo} />
      <StorySection />
      <TestimonialSection />
    </div>
  );
};

export default Beranda;