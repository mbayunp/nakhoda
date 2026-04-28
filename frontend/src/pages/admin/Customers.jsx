import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Eye, Phone, MapPin, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Swal from 'sweetalert2';
import { customerAPI } from '../../services/api';

const Customers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name:'', contact:'', address:'', notes:'' });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await customerAPI.getAll({ page, limit: 20, search });
      setItems(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch { setItems([]); }
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetch(); }, [fetch]);

  const openAdd = () => { setEditing(null); setForm({ name:'', contact:'', address:'', notes:'' }); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ name: item.name, contact: item.contact||'', address: item.address||'', notes: item.notes||'' }); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name) return Swal.fire({ icon:'warning', title:'Nama wajib diisi' });
    setSaving(true);
    try {
      if (editing) await customerAPI.update(editing.id, form);
      else await customerAPI.create(form);
      Swal.fire({ icon:'success', title:'Data berhasil disimpan', timer:1500, showConfirmButton:false });
      setModal(false); fetch();
    } catch (err) { Swal.fire({ icon:'error', title:'Gagal', text: err.response?.data?.message || 'Error' }); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    const { isConfirmed } = await Swal.fire({ title:'Hapus Pelanggan?', text:`"${item.name}" akan dihapus`, icon:'warning', showCancelButton:true, confirmButtonColor:'#ef4444', confirmButtonText:'Ya, Hapus' });
    if (!isConfirmed) return;
    try { await customerAPI.delete(item.id); Swal.fire({ icon:'success', title:'Terhapus', timer:1200, showConfirmButton:false }); fetch(); } catch { Swal.fire({ icon:'error', title:'Gagal menghapus' }); }
  };

  const showDetail = async (item) => {
    try {
      const { data } = await customerAPI.getById(item.id);
      const c = data.data;
      const orders = c.orders || [];
      Swal.fire({
        title: c.name,
        html: `<div class="text-left text-sm space-y-2 mt-2">
          <p><strong>Kontak:</strong> ${c.contact || '—'}</p>
          <p><strong>Alamat:</strong> ${c.address || '—'}</p>
          <p><strong>Total Order:</strong> ${orders.length} pesanan</p>
          ${orders.length > 0 ? `<p class="mt-2 font-semibold">Riwayat:</p><ul class="list-disc pl-4">${orders.slice(0,5).map(o => `<li>${o.product} (${o.qty} pcs) — ${o.status}</li>`).join('')}</ul>` : ''}
        </div>`,
        confirmButtonColor: '#D4AF37',
      });
    } catch { Swal.fire({ icon:'error', title:'Gagal memuat detail' }); }
  };

  const columns = [
    { key:'name', label:'Nama', render:(v) => <span className="font-semibold">{v}</span> },
    { key:'contact', label:'Kontak', render:(v) => v ? <span className="flex items-center gap-1 text-gray-500"><Phone size={12} />{v}</span> : <span className="text-gray-300">—</span> },
    { key:'address', label:'Alamat', render:(v) => v ? <span className="flex items-center gap-1 text-gray-500 truncate max-w-[200px]"><MapPin size={12} />{v}</span> : <span className="text-gray-300">—</span> },
    { key:'order_count', label:'Orders', render:(v) => <span className="font-bold text-brand-dark">{v || 0}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-extrabold text-gray-900">Customers</h1><p className="text-sm text-gray-400 mt-1">Direktori pelanggan</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-md shadow-brand/20"><Plus size={18} /> Tambah</button>
      </div>

      {loading ? <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-brand" /></div> : (
        <DataTable columns={columns} data={items} searchValue={search} onSearch={(v) => { setSearch(v); setPage(1); }} page={page} totalPages={totalPages} onPageChange={setPage}
          actions={(row) => (
            <div className="flex items-center gap-1 justify-end">
              <button onClick={() => showDetail(row)} className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center justify-center transition"><Eye size={14} /></button>
              <button onClick={() => openEdit(row)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(row)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><Trash2 size={14} /></button>
            </div>
          )} />
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100"><h3 className="text-lg font-bold">{editing ? 'Edit Pelanggan' : 'Tambah Pelanggan'}</h3><button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Nama *</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Kontak</label><input value={form.contact} onChange={(e) => setForm({...form, contact: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" placeholder="+62..." /></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Alamat</label><textarea rows={2} value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm resize-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Catatan</label><input value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" /></div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" onClick={() => setModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Batal</button>
              <button type="submit" disabled={saving} className="px-5 py-2.5 text-sm font-bold text-white bg-brand rounded-xl hover:bg-brand-dark transition flex items-center gap-2 disabled:opacity-50">{saving && <Loader2 size={14} className="animate-spin" />} Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Customers;
