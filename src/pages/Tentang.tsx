import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Store, 
  MonitorPlay, 
  User, 
  Package, 
  CakeSlice, 
  Award,
  Heart,
  Flame,
  Sparkles,
  ShoppingBag,
  Coffee
} from 'lucide-react';

import FotoOwner from "../assets/owner.jpeg";

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Tentang() {
  // Data Timeline
  const timeline = [
    { year: "2008", title: "Resep Pertama", desc: "mulai berjualan sebagai pengisi waktu", icon: <Clock size={24} strokeWidth={3} /> },
    { year: "2016", title: "Pintu Toko Terbuka", desc: "mulai fokus dan jadi pekerjaan utama,", icon: <Store size={24} strokeWidth={3} /> },
    { year: "2026", title: "Rebranding oriena", desc: "Oriena berkembang menjadi usaha yang banyak diinginkan oleh pelanggan", icon: <MonitorPlay size={24} strokeWidth={3} /> }
  ];

  // Data Gallery Drag
  const galleryItems = [
    { id: 1, title: "Etalase Kaca", desc: "Disajikan segar setiap pagi.", icon: <Store size={64} strokeWidth={1.5} /> },
    { id: 2, title: "Dapur Produksi", desc: "Resep diolah dengan cinta.", icon: <CakeSlice size={64} strokeWidth={1.5} /> },
    { id: 3, title: "Ruang Tunggu", desc: "Nyaman dan wangi mentega.", icon: <Coffee size={64} strokeWidth={1.5} /> },
    { id: 4, title: "Meja Packing", desc: "Dikemas teliti satu per satu.", icon: <Package size={64} strokeWidth={1.5} /> },
    { id: 5, title: "Gudang Bahan", desc: "Bahan premium pilihan.", icon: <ShoppingBag size={64} strokeWidth={1.5} /> },
  ];

  const titleWords = "Cerita dari Dapur Kami.".split(" ");

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-[#F7F3EB] min-h-screen pt-12 pb-24 overflow-hidden relative"
    >
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-12 mb-24">
        <h1 className="text-5xl md:text-7xl font-playfair font-black text-[#4A3022] tracking-tight flex flex-wrap justify-center gap-x-4 overflow-hidden">
          {titleWords.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
              className={`inline-block ${word === 'Dapur' ? 'text-[#D97736]' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl font-jakarta font-bold text-[#4A3022]/80 leading-relaxed max-w-2xl mx-auto"
        >
          Lebih dari sekadar bahan baku premium, Oriena adalah tentang merawat tradisi dan menciptakan momen manis di setiap gigitan.
        </motion.p>
      </section>

      {/* 1.5 SEJARAH SECTION (Neo-Brutalism Story Block) */}
      <section className="max-w-5xl mx-auto px-4 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-white border-4 border-[#4A3022] shadow-[12px_12px_0px_#D97736] rounded-[2rem] p-8 md:p-12 relative"
        >
          {/* Aksen Pin/Pita di pojok */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#F7F3EB] border-4 border-[#4A3022] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#4A3022] z-10 rotate-12">
            <span className="text-2xl"></span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
              <div className="inline-block px-4 py-1.5 bg-[#D97736] text-[#FAF5E9] border-2 border-[#4A3022] rounded-full text-xs font-jakarta font-black tracking-widest uppercase shadow-[4px_4px_0px_#4A3022] mb-4">
                AWAL MULA
              </div>
              <h2 className="text-3xl md:text-4xl font-playfair font-black text-[#4A3022] leading-tight">
                Bagaimana <br/>Dapur Ini <br/>Bermula.
              </h2>
            </div>
            
            <div className="w-full md:w-2/3 border-l-0 md:border-l-4 border-[#4A3022] md:pl-8 pt-4 md:pt-0 space-y-4">

  
              <p className="text-[#4A3022]/90 font-jakarta font-bold text-lg leading-relaxed">
                Bermula sebagai PasPastry, kini kami berevolusi menjadi <span className="font-black text-[#D97736]">Oriena</span> (<span className="font-black">Original & Enak</span>). 
              </p>
              <p className="text-[#4A3022]/90 font-jakarta font-bold text-lg leading-relaxed">
                Rahasia kami tak pernah berubah, kreasi 100% <span className="italic">handmade</span> dengan takaran rasa yang pas dan harga terjangkau. Semuanya didedikasikan agar kehangatan oven kami bisa dinikmati oleh semua kalangan.
              </p>
           

            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. FOUNDER SECTION (Flat Bold Style) */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, type: "spring" }}
          className="bg-[#E0D0BB] rounded-[3rem] p-8 md:p-12 border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022] flex flex-col md:flex-row items-center gap-12"
        >
          <div className="aspect-[4/5] bg-[#FAF5E9] relative flex items-center justify-center overflow-hidden">
              {/* Pattern Kopi Tuku (Stripes) di background */}
              <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #4A3022 25%, transparent 25%, transparent 75%, #4A3022 75%, #4A3022)', backgroundSize: '20px 20px' }}></div>
              
              {/* HAPUS IKON <User /> DAN GANTI JADI TAG <img /> INI */}
              <img 
              src={FotoOwner} // Inget jangan pake kutip, panggil variabel import lokalnya
              alt="Bu Endah Pujiastuti" 
              className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-500" 
            />
              
              
              <div className="absolute bottom-6 left-0 right-0 text-center z-20">
                 <span className="font-jakarta font-black text-[#4A3022] text-sm bg-white border-4 border-[#4A3022] px-6 py-2 rounded-full shadow-[4px_4px_0px_#D97736]">
                   Owner Oriena
                 </span>
              </div>
          </div>

          <div className="w-full md:w-3/5 text-center md:text-left space-y-6">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-block px-4 py-1.5 bg-[#4A3022] text-[#FAF5E9] border-2 border-[#4A3022] rounded-full text-xs font-jakarta font-black tracking-widest uppercase shadow-[4px_4px_0px_#D97736]">
              SOSOK DI BALIK DAPUR
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h2 className="text-4xl md:text-6xl font-playfair font-black text-[#4A3022] mb-2">Endah Pujiastuti</h2>
              <p className="text-[#D97736] font-jakarta font-black tracking-widest uppercase text-sm">Founder & Head Baker</p>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-[#4A3022] leading-relaxed font-jakarta font-bold text-xl relative py-4"
            >
              "Bagi saya, membuat kue bukan sekadar mengaduk bahan, tapi tentang membagikan kehangatan ke setiap rumah yang menikmatinya."
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="flex justify-center md:justify-start gap-4 pt-4"
            >
              {[InstagramIcon, LinkedinIcon, FacebookIcon].map((Icon, i) =>(
                <motion.button key={i} whileHover={{ y: -4 }} whileTap={{ y: 2, boxShadow: "0px 0px 0px #4A3022" }} className="w-14 h-14 rounded-2xl bg-white border-4 border-[#4A3022] flex items-center justify-center text-[#4A3022] hover:bg-[#D97736] hover:text-white transition-colors shadow-[4px_4px_0px_#4A3022]">
                  <Icon size={24} />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3. STATISTIK (Solid Flat Grid) */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="bg-[#D97736] rounded-[3rem] p-10 md:p-16 relative overflow-hidden border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022]">
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10"
          >
            {[
              { icon: <Package size={32} strokeWidth={2.5} />, val: "50k+", label: "Toples Terjual" },
              { icon: <CakeSlice size={32} strokeWidth={2.5} />, val: "20+", label: "Resep Artisan" },
              { icon: <Clock size={32} strokeWidth={2.5} />, val: "18Thn", label: "Pengalaman" },
              { icon: <Award size={32} strokeWidth={2.5} />, val: "100%", label: "Bahan Premium" }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 50, scale: 0.8 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5 } } }} className="bg-[#FAF5E9] border-4 border-[#4A3022] rounded-3xl p-6 shadow-[6px_6px_0px_#4A3022] text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-[#4A3022] text-white border-2 border-[#4A3022] rounded-full flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-playfair font-black text-[#4A3022] mb-1">{stat.val}</h3>
                <p className="text-[#4A3022]/80 font-jakarta font-black text-xs md:text-sm tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. FILOSOFI KAMI (Hard Shadow Cards) */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022]">
            Bukan Sekadar Kue Kering
          </motion.h2>
        </div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            { icon: <Heart size={36} strokeWidth={2.5} />, title: "Dibuat Sepenuh Hati", desc: "Setiap adonan kami uleni dengan tangan dan takaran presisi menjaga keaslian rasa rumahan." },
            { icon: <Flame size={36} strokeWidth={2.5} />, title: "Fresh dari Oven", desc: "Tidak ada stok lama. Semua yang Anda terima dipanggang berdasarkan pesanan." },
            { icon: <Sparkles size={36} strokeWidth={2.5} />, title: "Standar Premium", desc: "Menggunakan butter pilihan, keju edam asli, tanpa tambahan pengawet buatan." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } } }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] hover:shadow-[12px_12px_0px_#D97736] transition-all text-center cursor-pointer"
            >
              <div className="w-20 h-20 bg-[#D97736] text-white border-4 border-[#4A3022] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_#4A3022]">
                {item.icon}
              </div>
              <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-4">{item.title}</h3>
              <p className="text-[#4A3022]/80 font-jakarta font-bold leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. TIMELINE (Solid Line & Dots) */}
      <section className="max-w-5xl mx-auto px-4 mb-32 overflow-hidden">
        <div className="text-center mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022]">
            Perjalanan Waktu
          </motion.h2>
        </div>

        <div className="relative space-y-12 md:space-y-24 py-8">
          {/* Garis Vertikal Tegas */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-2 bg-[#4A3022] md:-translate-x-1/2 z-0"></div>

          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot Icon - Flat & Bold */}
              <motion.div 
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-[#D97736] border-4 border-[#4A3022] rounded-full flex items-center justify-center text-white shadow-[4px_4px_0px_#4A3022] z-10"
              >
                {item.icon}
              </motion.div>

              <div className="hidden md:block md:w-1/2"></div>

              {/* Content Card */}
              <div className={`pl-20 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <div className="bg-white p-8 rounded-[2rem] border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#D97736] transition-all duration-300">
                  <div className={`inline-block bg-[#FAF5E9] border-2 border-[#4A3022] text-[#D97736] px-4 py-1.5 rounded-xl font-jakarta font-black text-xl mb-4 shadow-[4px_4px_0px_#4A3022] ${idx % 2 === 0 ? 'ml-auto' : ''}`}>
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-3">{item.title}</h3>
                  <p className="text-[#4A3022]/80 font-jakarta font-bold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. DRAGGABLE GALLERY (DIPERLAMBAT) */}
     <section className="max-w-full mx-auto pt-24 pb-12 overflow-hidden bg-[#E0D0BB] border-y-8 border-[#4A3022]">
        <div className="text-center mb-12 px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4">
            Mengintip Dapur Oriena
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg font-jakarta font-bold text-[#4A3022]/80 bg-[#FAF5E9] border-2 border-[#4A3022] inline-block px-6 py-2 rounded-full shadow-[4px_4px_0px_#D97736]">
            Geser untuk melihat
          </motion.p>
        </div>

        <AutoScrollGallery items={galleryItems} />
      </section>
    </motion.div>
  );
}

// ==========================================
// KOMPONEN: AUTO SCROLL GALLERY
// ==========================================
function AutoScrollGallery({ items }: { items: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const displayPhotos = [...items, ...items, ...items];

  useEffect(() => {
    let animationId: number;
    const autoScroll = () => {
      if (carouselRef.current && !isDown) {
        // KECEPATAN DIPERLAMBAT DARI 1.5 MENJADI 0.6
        carouselRef.current.scrollLeft += 0.6; 
        
        if (carouselRef.current.scrollLeft >= (carouselRef.current.scrollWidth / 3) * 2) {
          carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 3;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };
    autoScroll();
    return () => cancelAnimationFrame(animationId);
  }, [isDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (carouselRef.current) {
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDown(true);
    if (carouselRef.current) {
      setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };
  const handleTouchEnd = () => setIsDown(false);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDown || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={carouselRef}
      className="flex gap-6 overflow-x-hidden cursor-grab active:cursor-grabbing px-4 md:px-8 pb-12 pt-4 hide-scrollbar"
      onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove}
    >
      {displayPhotos.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -10, rotate: -2 }}
          className="min-w-[280px] md:min-w-[400px] aspect-square md:aspect-[4/3] bg-white border-4 border-[#4A3022] shadow-[8px_8px_0px_#4A3022] rounded-[2.5rem] overflow-hidden relative group flex-shrink-0 transition-transform"
        >
          <div className="absolute inset-0 bg-[#FAF5E9] flex flex-col items-center justify-center text-[#D97736] border-b-4 border-[#4A3022] group-hover:bg-[#4A3022] group-hover:text-white transition-colors duration-500 pointer-events-none">
            {item.icon}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-white border-t-4 border-[#4A3022] pointer-events-none z-10">
            <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-1">{item.title}</h3>
            <p className="text-[#4A3022]/80 font-jakarta font-bold text-sm">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}