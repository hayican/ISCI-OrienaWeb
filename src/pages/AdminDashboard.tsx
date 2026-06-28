import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Trash2, Package, RefreshCw, X, Cookie, BarChart2, Upload, Edit2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  image: string;
  badge: string; 
}

export default function AdminDashboard({ setCurrentView }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Cookies');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newBadge, setNewBadge] = useState(''); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // STATE BARU BUAT EDIT
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<string>(''); // Nyimpen URL foto lama kalau ga mau diganti

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FUNGSI BUAT MBUKA MODAL DAN NGISI DATA LAMA KE DALAM FORM
  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setNewName(product.name);
    setNewCategory(product.category);
    setNewPrice(product.price.toString());
    setNewDesc(product.desc);
    setNewBadge(product.badge || '');
    setCurrentImage(product.image); // Simpen URL lama
    setImageFile(null); // Kosongin file inputnya
    setIsModalOpen(true);
  };

  // FUNGSI BUAT RESET FORM
  const resetForm = () => {
    setNewName(''); setNewCategory('Cookies'); setNewPrice(''); 
    setNewDesc(''); setNewBadge(''); setImageFile(null);
    setEditingId(null); setCurrentImage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm(); // Pastiin form bersih pas ditutup
  };

  // FUNGSI GABUNGAN: CREATE & UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = currentImage; // Defaultnya pake gambar lama kalau lagi mode EDIT dan ga milih gambar baru

      // KALAU ADA GAMBAR BARU YANG DIPILIH (Buat mode Tambah BARU, atau Edit ganti foto)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`; 
        
        const { error: uploadError } = await supabase.storage
          .from('product-images') 
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        finalImageUrl = publicUrlData.publicUrl;

        // Kalau lagi mode Edit dan ngupload foto baru, foto lamanya kita hapus dari Storage biar ga menuhin
        if (editingId && currentImage) {
           const oldFileName = currentImage.split('/').pop();
           if (oldFileName) {
             await supabase.storage.from('product-images').remove([oldFileName]);
           }
        }
      } else if (!editingId) {
        // Kalau mode Tambah Baru tapi gak ada gambar, tolak!
        alert("Pilih foto kuenya dulu dong Bu!");
        setUploading(false);
        return;
      }

      const productData = { 
        name: newName, 
        category: newCategory, 
        price: parseInt(newPrice), 
        desc: newDesc, 
        image: finalImageUrl,
        badge: newBadge === '' ? null : newBadge 
      };

      if (editingId) {
        // JALUR UPDATE (EDIT)
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId);

        if (updateError) throw updateError;
        alert('Mantap! Data kue berhasil diperbarui!');
      } else {
        // JALUR INSERT (TAMBAH BARU)
        const { error: insertError } = await supabase
          .from('products')
          .insert([productData]);

        if (insertError) throw insertError;
        alert('Mantap! Menu berhasil ditambah!');
      }

      handleCloseModal();
      fetchProducts();
      
    } catch (error: any) {
      alert('Waduh gagal broskie: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number, imageUrl: string) => {
    if (window.confirm('Yakin mau hapus menu ini Bu?')) {
      setLoading(true);
      await supabase.from('products').delete().eq('id', id);
      
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from('product-images').remove([fileName]);
      }
      
      fetchProducts();
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView('beranda');
  };

  return (
    <div className="min-h-screen bg-[#FAF5E9] p-4 md:p-8 font-jakarta">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-center bg-white border-4 border-[#4A3022] p-6 rounded-3xl shadow-[8px_8px_0px_#4A3022] mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-black text-[#4A3022]">Ruang Ganti Admin</h1>
            <p className="text-[#4A3022]/80 font-bold mt-1">Kelola etalase Oriena dengan mudah.</p>
          </div>
          <button onClick={handleLogout} className="bg-[#FAF5E9] text-red-600 border-4 border-[#4A3022] px-4 py-2 rounded-xl font-black flex items-center gap-2 hover:bg-red-600 hover:text-white transition-colors shadow-[4px_4px_0px_#4A3022] active:translate-y-1 active:shadow-none">
            <LogOut size={20} /> Keluar
          </button>
        </div>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#E0D0BB] border-4 border-[#4A3022] p-6 rounded-3xl shadow-[6px_6px_0px_#4A3022] flex items-center gap-4">
            <div className="p-4 bg-[#4A3022] text-white rounded-2xl border-2 border-[#4A3022]"><Package size={32} /></div>
            <div>
              <p className="text-sm font-black text-[#4A3022]/70 uppercase">Total Etalase</p>
              <h2 className="text-4xl font-playfair font-black text-[#4A3022]">{products.length} Menu</h2>
            </div>
          </div>
          <div className="bg-[#FAF5E9] border-4 border-[#4A3022] p-6 rounded-3xl shadow-[6px_6px_0px_#4A3022] flex flex-col justify-center">
            <p className="text-sm font-black text-[#4A3022]/70 uppercase mb-2">Rincian Kategori</p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-[#D97736] text-white px-3 py-1 rounded-md text-sm font-bold border-2 border-[#4A3022]">Cookies: {products.filter(p => p.category === 'Cookies').length}</span>
              <span className="bg-[#829079] text-white px-3 py-1 rounded-md text-sm font-bold border-2 border-[#4A3022]">Bakery: {products.filter(p => p.category === 'Bakery').length}</span>
              <span className="bg-[#4A3022] text-white px-3 py-1 rounded-md text-sm font-bold border-2 border-[#4A3022]">Snack: {products.filter(p => p.category === 'Snack').length}</span>
            </div>
          </div>
          <div className="bg-white border-4 border-[#4A3022] p-6 rounded-3xl shadow-[6px_6px_0px_#4A3022] flex items-center gap-4">
            <div className="p-4 bg-[#829079] text-white rounded-2xl border-2 border-[#4A3022]"><BarChart2 size={32} /></div>
            <div>
              <p className="text-sm font-black text-[#4A3022]/70 uppercase">Status Database</p>
              <h2 className="text-xl mt-1 font-jakarta font-black text-[#4A3022]">{loading ? 'Memuat...' : 'Online 🟢'}</h2>
            </div>
          </div>
        </div>

        {/* Tabel Utama */}
        <div className="bg-white border-4 border-[#4A3022] p-6 md:p-8 rounded-3xl shadow-[8px_8px_0px_#4A3022]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-playfair font-black text-[#4A3022]">Daftar Produk Aktif</h2>
            <div className="flex gap-3">
              <button onClick={fetchProducts} className="p-3 bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl hover:bg-[#D97736] hover:text-white transition-colors shadow-[4px_4px_0px_#4A3022] active:translate-y-1 active:shadow-none">
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#D97736] text-white border-4 border-[#4A3022] px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-[#c46a2b] transition-colors shadow-[4px_4px_0px_#4A3022] active:translate-y-1 active:shadow-none">
                <Plus size={20} strokeWidth={3} /> Tambah Menu Baru
              </button>
            </div>
          </div>

          {loading && products.length === 0 ? (
            <div className="text-center py-16 font-bold text-[#4A3022]/60 animate-pulse">Menarik data dari server...</div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-4 border-[#4A3022]">
                    <th className="pb-4 font-black text-[#4A3022] w-20">Foto</th>
                    <th className="pb-4 font-black text-[#4A3022]">Info Produk</th>
                    <th className="pb-4 font-black text-[#4A3022]">Harga</th>
                    <th className="pb-4 font-black text-[#4A3022] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b-2 border-[#4A3022]/10 hover:bg-[#FAF5E9] transition-colors">
                      <td className="py-4">
                        <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover border-2 border-[#4A3022]" />
                      </td>
                      <td className="py-4 pr-4">
                        <div className="font-black text-lg text-[#4A3022] mb-1 flex items-center gap-2">
                          {p.name}
                          {p.badge && (
                            <span className="bg-[#D97736] text-white text-[10px] px-2 py-0.5 rounded-md font-bold tracking-wider">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <div className="inline-block px-2 py-1 bg-white border-2 border-[#4A3022] text-xs text-[#D97736] font-black uppercase rounded-md">{p.category}</div>
                      </td>
                      <td className="py-4 font-black text-[#4A3022] text-lg">Rp {p.price.toLocaleString('id-ID')}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* TOMBOL EDIT BARU */}
                          <button onClick={() => handleEditClick(p)} className="p-3 bg-white text-[#D97736] border-2 border-[#4A3022] rounded-xl hover:bg-[#D97736] hover:text-white transition-colors shadow-[2px_2px_0px_#4A3022] active:translate-y-1 active:shadow-none">
                            <Edit2 size={20} />
                          </button>
                          <button onClick={() => handleDelete(p.id, p.image)} className="p-3 bg-white text-red-600 border-2 border-[#4A3022] rounded-xl hover:bg-red-600 hover:text-white transition-colors shadow-[2px_2px_0px_#4A3022] active:translate-y-1 active:shadow-none">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && <tr><td colSpan={4} className="text-center py-10 font-bold text-[#4A3022]/50">Belum ada menu, tambahin dong broskie!</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* POPUP MODAL TAMBAH/EDIT MENU */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A3022]/80 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-white w-full max-w-lg rounded-[2rem] border-4 border-[#4A3022] shadow-[12px_12px_0px_#D97736] overflow-hidden">
                <div className="bg-[#FAF5E9] border-b-4 border-[#4A3022] p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-playfair font-black text-[#4A3022] flex items-center gap-2">
                    <Cookie size={24} /> {editingId ? 'Edit Menu' : 'Masukkan Menu Baru'}
                  </h2>
                  <button onClick={handleCloseModal} className="p-2 bg-white border-4 border-[#4A3022] rounded-xl hover:bg-red-500 hover:text-white transition-colors shadow-[4px_4px_0px_#4A3022] active:translate-y-1 active:shadow-none">
                    <X size={20} strokeWidth={3} />
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-xs font-black text-[#4A3022] uppercase tracking-wider">Nama Kue</label>
                      <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} className="w-full mt-1 bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl px-4 py-3 outline-none font-bold text-[#4A3022] focus:border-[#D97736] transition-colors" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-black text-[#4A3022] uppercase tracking-wider">Kategori</label>
                        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full mt-1 bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl px-4 py-3 outline-none font-bold text-[#4A3022] focus:border-[#D97736] transition-colors appearance-none">
                          <option value="Cookies">Cookies</option>
                          <option value="Bakery">Bakery</option>
                          <option value="Snack">Snack</option>
                          <option value="Lain-lain">Lain-lain</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-black text-[#4A3022] uppercase tracking-wider">Harga (Rp)</label>
                        <input type="number" required value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full mt-1 bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl px-4 py-3 outline-none font-bold text-[#4A3022] focus:border-[#D97736] transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-[#4A3022] uppercase tracking-wider">Label Spesial (Opsional)</label>
                      <select value={newBadge} onChange={e => setNewBadge(e.target.value)} className="w-full mt-1 bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl px-4 py-3 outline-none font-bold text-[#4A3022] focus:border-[#D97736] transition-colors appearance-none">
                        <option value="">-- Tidak Ada --</option>
                        <option value="BEST SELLER">BEST SELLER</option>
                      </select>
                      <p className="text-[10px] text-[#4A3022]/60 mt-1 font-bold">Pilih "BEST SELLER" agar kue ini muncul di urutan paling atas Katalog Pembeli.</p>
                    </div>
                    
                    <div>
                      <label className="text-xs font-black text-[#4A3022] uppercase tracking-wider">
                        {editingId ? 'Ganti Foto (Biarkan kosong jika tidak diganti)' : 'Upload Foto Asli'}
                      </label>
                      <div className="mt-1 relative">
                        <input 
                          type="file" 
                          accept="image/*" 
                          required={!editingId} // Wajib kalau mode tambah baru, nggak wajib kalau mode edit
                          onChange={e => setImageFile(e.target.files?.[0] || null)} 
                          className="w-full bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl px-4 py-3 outline-none font-bold text-[#4A3022] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-[#4A3022] file:text-sm file:font-bold file:bg-[#D97736] file:text-white hover:file:bg-[#c46a2b] transition-colors" 
                        />
                      </div>
                      {/* Kalau mode edit dan ga masukin foto baru, tampilin preview foto lama biar admin tenang */}
                      {editingId && !imageFile && (
                         <div className="mt-2 flex items-center gap-2">
                           <span className="text-[10px] font-bold text-[#4A3022]/60">Foto saat ini:</span>
                           <img src={currentImage} alt="Current" className="w-8 h-8 rounded border border-[#4A3022] object-cover" />
                         </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-black text-[#4A3022] uppercase tracking-wider">Deskripsi Singkat</label>
                      <textarea required value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={3} className="w-full mt-1 bg-[#FAF5E9] border-4 border-[#4A3022] rounded-xl px-4 py-3 outline-none font-bold text-[#4A3022] focus:border-[#D97736] transition-colors"></textarea>
                    </div>
                    <button type="submit" disabled={uploading} className="w-full bg-[#D97736] text-white border-4 border-[#4A3022] py-4 mt-2 rounded-xl font-black text-lg shadow-[6px_6px_0px_#4A3022] hover:bg-[#c46a2b] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                      {uploading ? <RefreshCw className="animate-spin" /> : <Upload />}
                      {uploading ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Simpan ke Database')}
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}