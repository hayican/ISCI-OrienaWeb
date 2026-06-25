import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight } from 'lucide-react';
// Pastikan path import supabase ini sesuai sama folder lu
import { supabase } from '../lib/supabase'; 

export default function AdminLogin({ setCurrentView }: { setCurrentView: React.Dispatch<React.SetStateAction<string>> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Fungsi sakti Supabase buat ngecek email & password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg('Waduh broskie, Email atau Password salah!');
    } else if (data.user) {
      // Kalau berhasil login, langsung lempar ke Dashboard Rahasia
      setCurrentView('dashboard-rahasia');
    }
    
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-[80vh] flex items-center justify-center bg-[#FAF5E9] p-4"
    >
      <div className="w-full max-w-md bg-white border-4 border-[#4A3022] rounded-[2rem] p-8 shadow-[12px_12px_0px_0px_#4A3022]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#4A3022] text-[#FAF5E9] rounded-2xl flex items-center justify-center mx-auto mb-4 border-4 border-[#4A3022] shadow-[4px_4px_0px_0px_#D97736]">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-playfair font-black text-[#4A3022]">Pintu Rahasia</h2>
          <p className="text-[#4A3022]/70 font-jakarta font-bold text-sm mt-2">Hanya untuk Admin Oriena.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-100 border-4 border-red-500 text-red-700 p-3 rounded-xl mb-6 font-bold text-center text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-[#4A3022] uppercase tracking-wider">Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A3022]" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@oriena.com"
                className="w-full bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl py-3 pl-12 pr-4 outline-none font-bold text-[#4A3022] focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-[#4A3022] uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A3022]" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl py-3 pl-12 pr-4 outline-none font-bold text-[#4A3022] focus:shadow-[4px_4px_0px_0px_#D97736] focus:-translate-y-1 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#D97736] text-white font-black py-4 rounded-xl border-4 border-[#4A3022] shadow-[6px_6px_0px_0px_#4A3022] hover:bg-[#c46a2b] hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#4A3022] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Mengecek Sandi...' : <>Masuk Ruang Ganti <ArrowRight size={20} /></>}
          </button>
        </form>
      </div>
    </motion.div>
  );
}