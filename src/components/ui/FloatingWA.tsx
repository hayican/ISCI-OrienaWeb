import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWA() {
  
  /* Membuka tab baru ke WhatsApp Admin dengan pesan bawaan (pre-filled) */
  const handleChat = () => {
    const phoneNumber = "628126120165";
    const text = encodeURIComponent("Halo Kak Endah! Saya mau tanya-tanya soal produk Oriena nih.");
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    /* Render tombol floating statis di pojok kanan bawah layar */
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: -10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleChat}
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_#4A3022] border-4 border-[#4A3022] hover:bg-[#20bd5a] transition-colors"
      title="Chat dengan Tetangga Oriena"
    >
      <MessageCircle size={32} strokeWidth={2.5} />
    </motion.button>
  );
}