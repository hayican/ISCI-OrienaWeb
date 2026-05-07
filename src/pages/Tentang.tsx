import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Tentang() {
  // Setup Animasi Parallax & Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const targetRef = useRef(null);
  const { scrollYProgress: imgScroll } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(imgScroll, [0, 1], [-50, 50]);

  // Data Timeline
  const timeline = [
    { year: "2020", title: "Resep Pertama", desc: "Berawal dari hobi membuatkan kue kering untuk keluarga, sebuah resep nastar turun temurun mulai disempurnakan di dapur kecil berukuran 3x3 meter.", icon: <Clock size={24} /> },
    { year: "2023", title: "Pintu Toko Terbuka", desc: "Oriena akhirnya membuka toko fisik pertama dengan konsep open-kitchen agar pelanggan bisa mencium wangi panggangan.", icon: <Store size={24} /> },
    { year: "2026", title: "Langkah Digital", desc: "Oriena berevolusi. Menghadirkan pengalaman interaktif bagi pelanggan untuk merakit hampers mereka sendiri secara digital.", icon: <MonitorPlay size={24} /> }
  ];

  // Data Gallery Drag
  const galleryItems = [
    { id: 1, title: "Etalase Kaca", desc: "Disajikan segar setiap pagi.", icon: <Store size={48} /> },
    { id: 2, title: "Dapur Produksi", desc: "Resep diolah dengan cinta.", icon: <CakeSlice size={48} /> },
    { id: 3, title: "Ruang Tunggu", desc: "Nyaman dan wangi mentega.", icon: <Coffee size={48} /> },
    { id: 4, title: "Meja Packing", desc: "Dikemas teliti satu per satu.", icon: <Package size={48} /> },
    { id: 5, title: "Gudang Bahan", desc: "Bahan premium pilihan.", icon: <ShoppingBag size={48} /> },
  ];

  const titleWords = "Cerita dari Dapur Kami.".split(" ");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-32 pt-12 pb-24 overflow-hidden relative"
    >
      {/* SCROLL PROGRESS BAR (Mind-blowing detail) */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-[#D97736] origin-left z-[100]" style={{ scaleX }} />

      {/* 1. HERO SECTION (Masking Reveal) */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
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
          className="text-xl md:text-2xl font-jakarta text-[#4A3022]/70 leading-relaxed max-w-2xl mx-auto"
        >
          Lebih dari sekadar bahan baku premium, Oriena adalah tentang merawat tradisi dan menciptakan momen manis di setiap gigitan.
        </motion.p>
      </section>

      {/* 2. FOUNDER SECTION (Parallax Image) */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-[#4A3022]/5 border border-[#FAF5E9] flex flex-col md:flex-row items-center gap-12"
        >
          <div className="w-full md:w-2/5 overflow-hidden rounded-[2.5rem]" ref={targetRef}>
            <motion.div 
              style={{ y: imgY }}
              className="aspect-[4/5] bg-[#D97736]/10 relative flex items-center justify-center group scale-[1.2]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3022]/60 to-transparent z-10"></div>
              <User size={120} className="text-[#D97736]/40 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-12 left-0 right-0 text-center z-20">
                 <span className="font-jakarta font-bold text-[#FAF5E9] text-sm bg-[#4A3022]/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg">
                   Simulasi Foto: Owner Oriena
                 </span>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-3/5 text-center md:text-left space-y-6">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-block px-4 py-1.5 bg-[#D97736]/10 rounded-full text-[#D97736] text-xs font-jakarta font-bold tracking-widest uppercase">
              SOSOK DI BALIK DAPUR
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h2 className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022] mb-2">Sarah Oriena</h2>
              <p className="text-[#D97736] font-jakarta font-black tracking-widest uppercase text-sm">Founder & Head Baker</p>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-[#4A3022]/80 leading-relaxed font-playfair italic text-2xl relative py-4"
            >
              <span className="hidden md:block text-6xl text-[#D97736]/10 absolute -top-4 -left-6">"</span>
              Bagi saya, membuat kue bukan sekadar mengaduk bahan, tapi tentang membagikan kehangatan ke setiap rumah yang menikmatinya.
              <span className="hidden md:block text-6xl text-[#D97736]/10 absolute -bottom-8 right-0">"</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="flex justify-center md:justify-start gap-4 pt-4"
            >
              {[InstagramIcon, LinkedinIcon, FacebookIcon].map((Icon, i) =>(
                <motion.button key={i} whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-full bg-[#FAF5E9] flex items-center justify-center text-[#4A3022] hover:bg-[#D97736] hover:text-white transition-colors shadow-sm hover:shadow-md">
                  <Icon size={20} />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3. STATISTIK (Staggered Counter effect) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#4A3022] to-[#3a251a] rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10"
          >
            {[
              { icon: <Package size={32} />, val: "50k+", label: "Toples Terjual" },
              { icon: <CakeSlice size={32} />, val: "20+", label: "Resep Artisan" },
              { icon: <Clock size={32} />, val: "5Thn", label: "Pengalaman" },
              { icon: <Award size={32} />, val: "100%", label: "Bahan Premium" }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 50, scale: 0.5 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5 } } }} className="text-center group">
                <div className="w-16 h-16 bg-[#FAF5E9]/10 backdrop-blur-sm text-[#D97736] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#FAF5E9]/20 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {stat.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-playfair font-black text-[#FAF5E9] mb-2 drop-shadow-lg">{stat.val}</h3>
                <p className="text-[#FAF5E9]/70 font-jakarta font-medium text-sm md:text-base tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. FILOSOFI KAMI (3D Flip Hover) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022]">
            Bukan Sekadar Kue Kering
          </motion.h2>
        </div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective-1000"
        >
          {[
            { icon: <Heart size={36} />, title: "Dibuat Sepenuh Hati", desc: "Setiap adonan kami uleni dengan tangan dan takaran presisi menjaga keaslian rasa rumahan." },
            { icon: <Flame size={36} />, title: "Fresh dari Oven", desc: "Tidak ada stok lama. Semua yang Anda terima dipanggang berdasarkan pesanan." },
            { icon: <Sparkles size={36} />, title: "Standar Premium", desc: "Menggunakan butter pilihan, keju edam asli, tanpa tambahan pengawet." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={{ hidden: { opacity: 0, rotateY: 90 }, visible: { opacity: 1, rotateY: 0, transition: { duration: 0.8, type: "spring" } } }}
              whileHover={{ scale: 1.05, y: -10, zIndex: 10 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#FAF5E9] shadow-xl shadow-[#4A3022]/5 text-center cursor-pointer preserve-3d"
            >
              <div className="w-20 h-20 bg-[#FAF5E9] text-[#D97736] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner" style={{ transform: "translateZ(30px)" }}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-4" style={{ transform: "translateZ(20px)" }}>{item.title}</h3>
              <p className="text-[#4A3022]/70 font-jakarta font-medium leading-relaxed" style={{ transform: "translateZ(10px)" }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. TIMELINE (Fixed Zigzag) */}
      <section className="max-w-5xl mx-auto px-4 pt-12 overflow-hidden">
        <div className="text-center mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022]">
            Perjalanan Waktu
          </motion.h2>
        </div>

        <div className="relative space-y-12 md:space-y-24 py-8">
          {/* Garis Vertikal Tengah (Desktop) / Kiri (Mobile) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-1 bg-[#D97736]/20 md:-translate-x-1/2 rounded-full z-0"></div>

          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot Icon */}
              <motion.div 
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-4 border-[#D97736] rounded-full flex items-center justify-center text-[#D97736] shadow-lg z-10"
              >
                {item.icon}
              </motion.div>

              {/* Spacer buat Desktop biar kontennya kedorong ke satu sisi */}
              <div className="hidden md:block md:w-1/2"></div>

              {/* Content Card */}
              <div className={`pl-20 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <div className="bg-[#FAF5E9] p-8 rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-[#4A3022]/5">
                  <span className="text-[#829079] font-playfair font-black text-3xl mb-2 block">{item.year}</span>
                  <h3 className="text-2xl font-playfair font-bold text-[#4A3022] mb-3">{item.title}</h3>
                  <p className="text-[#4A3022]/70 font-jakarta leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. DRAGGABLE GALLERY (Physics Slider) */}
     <section className="max-w-full mx-auto pt-24 pb-12 overflow-hidden bg-[#4A3022] mt-12 ">
        <div className="text-center mb-12 px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-playfair font-black text-[#FAF5E9] mb-4">
            Mengintip Dapur Oriena
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg font-jakarta text-[#FAF5E9]/70">
            Geser untuk melihat (Drag to scroll)
          </motion.p>
        </div>

        {/* Panggil komponen Gallery yang udah di-upgrade di sini */}
        <AutoScrollGallery items={galleryItems} />
      </section>
    </motion.div>
  );
}

function AutoScrollGallery({ items }: { items: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Array digandakan 3x biar loopingnya mulus nggak putus
  const displayPhotos = [...items, ...items, ...items];

  useEffect(() => {
    let animationId: number;
    const autoScroll = () => {
      // Jalan otomatis cuma kalau lagi NGGAK ditahan (isDown = false)
      if (carouselRef.current && !isDown) {
        carouselRef.current.scrollLeft += 1.5; // Kecepatan auto-scroll
        
        // Logika Loop Tanpa Batas (Seamless Loop)
        if (carouselRef.current.scrollLeft >= (carouselRef.current.scrollWidth / 3) * 2) {
          carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 3;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };
    autoScroll();
    return () => cancelAnimationFrame(animationId);
  }, [isDown]);

  // Handler untuk Mouse (Desktop)
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
    const walk = (x - startX) * 2; // Angka 2 ini kecepatan geser pas ditarik
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handler untuk Touch (Mobile)
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
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {displayPhotos.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -15, rotate: 2 }}
          className="min-w-[280px] md:min-w-[400px] aspect-square md:aspect-[4/3] bg-white border border-[#FAF5E9] shadow-xl shadow-[#4A3022]/5 rounded-[2.5rem] overflow-hidden relative group flex-shrink-0 transition-transform"
        >
          <div className="absolute inset-0 bg-[#FAF5E9]/50 flex flex-col items-center justify-center text-[#4A3022]/30 group-hover:scale-125 group-hover:text-[#D97736] transition-all duration-700 pointer-events-none">
            {item.icon}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none">
            <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-1">{item.title}</h3>
            <p className="text-[#4A3022]/70 font-jakarta font-medium text-sm">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}   