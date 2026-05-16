import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, MessageSquare, Printer, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  updateCartItem: (id: string | number, newQuantity: number) => void;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

export default function Cart({ cartItems, updateCartItem, setCurrentView }: CartProps) {
  const [formData, setFormData] = useState({ name: '', address: '', notes: '' });

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutWA = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "628126120165";
    let text = `Halo Admin Oriena! 👋\nSaya mau checkout pesanan dari Website nih:\n\n`;
    text += `🧾 *STRUK PESANAN*\n`;
    
    cartItems.forEach(item => {
        text += `- ${item.name} (${item.quantity}x) = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    
    text += `\n*SUBTOTAL: Rp ${subtotal.toLocaleString('id-ID')}*\n\n`;
    text += `📍 *INFO PENGIRIMAN:*\n`;
    text += `Nama: ${formData.name}\n`;
    text += `Alamat: ${formData.address}\n`;
    text += `Catatan: ${formData.notes || '-'}\n\n`;
    text += `Mohon info total ongkir dan nomor rekening pembayarannya ya Kak!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 font-jakarta">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4">Kasir Oriena.</h1>
        <p className="text-lg text-[#4A3022]/70 max-w-2xl mx-auto">
          {cartCount > 0 ? "Pesananmu udah di meja kasir, tinggal konfirmasi pengiriman aja." : "Keranjangmu masih kosong nih. Yuk jajan dulu!"}
        </p>
      </div>

      {cartCount === 0 ? (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-[#4A3022]/5 border-4 border-[#4A3022] text-center flex flex-col items-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-[#FAF5E9] border-4 border-[#4A3022] text-[#4A3022] rounded-full flex items-center justify-center mb-6 floating">
            <ShoppingBag size={40} />
          </div>
          <h3 className="text-3xl font-playfair font-black text-[#4A3022] mb-2">Belum ada pesanan</h3>
          <p className="text-[#4A3022]/70 font-bold mb-8">Pilih kue favoritmu di Katalog atau Rakit Hampers dulu yuk.</p>
          {/* Tombol kembali yang bener! */}
          <button onClick={() => setCurrentView('katalog')} className="bg-[#D97736] text-white px-8 py-4 border-4 border-[#4A3022] shadow-[6px_6px_0px_0px_#4A3022] rounded-xl font-black flex items-center gap-2 hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#4A3022] transition-all">
            Ke Katalog Produk <ArrowRight size={20} />
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 flex flex-col items-center overflow-hidden pt-4">
            <div className="w-full max-w-sm relative">
              <div className="bg-[#4A3022] w-full h-16 rounded-t-3xl relative z-20 flex items-center justify-center border-b-4 border-black/40 shadow-xl">
                 <Printer className="text-white/50" size={24} />
                 <div className="absolute bottom-0 w-3/4 h-2 bg-black/50 rounded-t-lg"></div>
              </div>
              
              <motion.div 
                initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
                className="bg-[#fdfbf7] w-11/12 mx-auto pb-12 pt-8 px-6 shadow-2xl relative z-10 font-mono text-[#333]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0 100%)' }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black uppercase tracking-widest">ORIENA.</h2>
                  <p className="text-xs mt-1">Artisan Bakery & Hampers</p>
                  <p className="text-xs">Sidoarjo, Jawa Timur</p>
                  <div className="border-b-2 border-dashed border-gray-400 mt-4"></div>
                </div>

                <div className="space-y-4 mb-6 text-sm">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1 border-b border-gray-200 pb-2">
                      <div className="flex justify-between items-start">
                        <p className="uppercase font-bold line-clamp-1 flex-1 pr-2">{item.name}</p>
                        <p className="font-bold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-gray-500">@ Rp {item.price.toLocaleString('id-ID')}</span>
                         <div className="flex items-center gap-3 bg-gray-100 rounded-md px-2 py-1">
                            <button onClick={() => updateCartItem(item.id, item.quantity - 1)} className="hover:text-red-500"><Minus size={14} /></button>
                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className="hover:text-green-500"><Plus size={14} /></button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-dashed border-gray-400 pt-4 space-y-2 text-sm font-bold">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-normal">
                    <span>Tax & Ongkir</span>
                    <span>Dihitung di WA</span>
                  </div>
                </div>

                <div className="border-t-2 border-black mt-6 pt-4 text-center">
                  <p className="text-xs font-bold">TERIMA KASIH</p>
                  <p className="text-[10px] mt-1">Struk ini akan dikirim otomatis ke WA.</p>
                  <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,#333_0,#333_2px,transparent_2px,transparent_4px,#333_4px,#333_5px,transparent_5px,transparent_8px)] mt-4 opacity-70"></div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.form initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} onSubmit={handleCheckoutWA} className="lg:col-span-7 bg-[#FAF5E9] border-4 border-[#4A3022] shadow-[12px_12px_0px_0px_#4A3022] rounded-[2rem] p-8 md:p-10 relative">
            <h3 className="text-3xl font-playfair font-black text-[#4A3022] mb-8 uppercase tracking-wide border-b-4 border-[#4A3022] pb-4">Info Pengiriman</h3>
            
            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Nama Penerima *</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" placeholder="Budi Santoso" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Alamat Lengkap *</label>
                <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all resize-none" placeholder="Jl. Mawar No. 12..."></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-[#4A3022] uppercase tracking-wider">Catatan (Opsional)</label>
                <input name="notes" value={formData.notes} onChange={handleInputChange} type="text" className="w-full bg-white border-4 border-[#4A3022] rounded-xl p-4 outline-none text-[#4A3022] font-bold focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all" placeholder="Titip di pos satpam ya." />
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-[#D97736] text-white py-4 rounded-xl border-4 border-[#4A3022] shadow-[6px_6px_0px_0px_#4A3022] hover:bg-[#c46a2b] font-black text-lg flex items-center justify-center gap-3 transition-colors">
              <MessageSquare size={24} /> Konfirmasi Pesanan via WA
            </motion.button>
          </motion.form>
        </div>
      )}
    </motion.div>
  );
}