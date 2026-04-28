import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import DataTable from '../../components/admin/DataTable';
import { portfolioAPI } from '../../services/api';
import { IMG } from '../../utils/formatters';

const CATS = ['Kemeja', 'Kaos', 'Jaket', 'Seragam', 'Merchandise', 'Lainnya'];

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', category: 'Lainnya', is_featured: false });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await portfolioAPI.getAll({ page, limit: 10, search });
      setItems(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch { setItems([]); }
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditing(null); setForm({ title: '', description: '', category: 'Lainnya', is_featured: false }); setImageFile(null); setPreview(null); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ title: item.title, description: item.description || '', category: item.category, is_featured: item.is_featured }); setImageFile(null); setPreview(item.image ? IMG(item.image) : null); setModal(true); };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setPreview(URL.createObjectURL(file)); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return Swal.fire({ icon: 'warning', title: 'Judul wajib diisi' });
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('category', form.category);
      fd.append('is_featured', form.is_featured);
      if (imageFile) fd.append('image', imageFile);

      if (editing) { await portfolioAPI.update(editing.id, fd); }
      else { await portfolioAPI.create(fd); }

      Swal.fire({ icon: 'success', title: editing ? 'Portfolio diperbarui' : 'Portfolio ditambahkan', timer: 1500, showConfirmButton: false });
      setModal(false);
      fetchData();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Gagal menyimpan', text: err.response?.data?.message || 'Terjadi kesalahan' });
    }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    const { isConfirmed } = await Swal.fire({ title: 'Hapus Portfolio?', text: `"${item.title}" akan dihapus permanen.`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', confirmButtonText: 'Ya, Hapus', cancelButtonText: 'Batal' });
    if (!isConfirmed) return;
    try {
      await portfolioAPI.delete(item.id);
      Swal.fire({ icon: 'success', title: 'Terhapus', timer: 1200, showConfirmButton: false });
      fetchData();
    } catch { Swal.fire({ icon: 'error', title: 'Gagal menghapus' }); }
  };

  const columns = [
    { key: 'image', label: 'Gambar', render: (v) => v ? <img src={IMG(v)} alt="" className="w-12 h-12 rounded-lg object-cover" /> : <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center"><ImageIcon size={16} className="text-gray-300" /></div> },
    { key: 'title', label: 'Judul', render: (v) => <span className="font-semibold">{v}</span> },
    { key: 'category', label: 'Kategori', render: (v) => <span className="text-xs font-bold bg-brand/10 text-brand-dark px-2.5 py-1 rounded-lg">{v}</span> },
    { key: 'is_featured', label: 'Featured', render: (v) => v ? <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-lg">Ya</span> : <span className="text-xs text-gray-400">—</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Portfolio</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola portfolio showcase</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-md shadow-brand/20">
          <Plus size={18} /> Tambah
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-brand" /></div>
      ) : (
        <DataTable
          columns={columns}
          data={items}
          searchValue={search}
          onSearch={(v) => { setSearch(v); setPage(1); }}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          actions={(row) => (
            <div className="flex items-center gap-1 justify-end">
              <button onClick={() => openEdit(row)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(row)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><Trash2 size={14} /></button>
            </div>
          )}
        />
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold">{editing ? 'Edit Portfolio' : 'Tambah Portfolio'}</h3>
              <button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Judul *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm">
                    {CATS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand" />
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gambar</label>
                {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-2" />}
                <label className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-brand/50 transition text-sm text-gray-500">
                  <Upload size={16} /> Pilih Gambar
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" onClick={() => setModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Batal</button>
              <button type="submit" disabled={saving} className="px-5 py-2.5 text-sm font-bold text-white bg-brand rounded-xl hover:bg-brand-dark transition flex items-center gap-2 disabled:opacity-50">
                {saving && <Loader2 size={14} className="animate-spin" />} Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
