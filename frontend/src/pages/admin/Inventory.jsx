import React, { useState, useEffect, useCallback } from 'react';
import { Plus, AlertTriangle, ArrowDownCircle, ArrowUpCircle, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Swal from 'sweetalert2';
import { materialAPI } from '../../services/api';

const CATS = ['Kain','Aksesoris','Benang','Packaging','Lainnya'];

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ sku:'', name:'', category:'Lainnya', stock:0, min_stock:0, unit:'pcs', supplier_name:'', supplier_contact:'', supplier_notes:'' });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await materialAPI.getAll({ page, limit: 20, search });
      setItems(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch { setItems([]); }
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetch(); }, [fetch]);

  const lowCount = items.filter((m) => +m.stock < +m.min_stock).length;
  const openAdd = () => { setEditing(null); setForm({ sku:'', name:'', category:'Lainnya', stock:0, min_stock:0, unit:'pcs', supplier_name:'', supplier_contact:'', supplier_notes:'' }); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ sku: item.sku, name: item.name, category: item.category, stock: item.stock, min_stock: item.min_stock, unit: item.unit, supplier_name: item.supplier_name||'', supplier_contact: item.supplier_contact||'', supplier_notes: item.supplier_notes||'' }); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.sku) return Swal.fire({ icon:'warning', title:'SKU & nama wajib diisi' });
    setSaving(true);
    try {
      if (editing) await materialAPI.update(editing.id, form);
      else await materialAPI.create(form);
      Swal.fire({ icon:'success', title:'Data berhasil disimpan', timer:1500, showConfirmButton:false });
      setModal(false); fetch();
    } catch (err) { Swal.fire({ icon:'error', title:'Gagal', text: err.response?.data?.message || 'Error' }); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    const { isConfirmed } = await Swal.fire({ title:'Hapus Material?', text:`"${item.name}" akan dihapus`, icon:'warning', showCancelButton:true, confirmButtonColor:'#ef4444', confirmButtonText:'Ya, Hapus' });
    if (!isConfirmed) return;
    try { await materialAPI.delete(item.id); Swal.fire({ icon:'success', title:'Terhapus', timer:1200, showConfirmButton:false }); fetch(); } catch { Swal.fire({ icon:'error', title:'Gagal menghapus' }); }
  };

  const handleStockAdjust = async (item, type) => {
    const { value } = await Swal.fire({ title: `Stok ${type === 'in' ? 'Masuk' : 'Keluar'}`, input:'number', inputLabel:`Jumlah (${item.unit})`, inputAttributes:{min:1}, showCancelButton:true, confirmButtonColor:'#D4AF37' });
    if (!value) return;
    try { await materialAPI.adjustStock(item.id, { adjustment: +value, type }); Swal.fire({ icon:'success', title:`Stok ${type === 'in' ? 'masuk' : 'keluar'} berhasil`, timer:1200, showConfirmButton:false }); fetch(); } catch (err) { Swal.fire({ icon:'error', title:'Gagal', text: err.response?.data?.message || 'Error' }); }
  };

  const columns = [
    { key:'sku', label:'SKU', render:(v) => <span className="font-mono text-xs text-gray-500">{v}</span> },
    { key:'name', label:'Material', render:(v) => <span className="font-semibold">{v}</span> },
    { key:'category', label:'Kategori', render:(v) => <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{v}</span> },
    { key:'stock', label:'Stok', render:(v,row) => <span className={`font-bold ${+v < +row.min_stock ? 'text-red-600' : 'text-gray-800'}`}>{v} {row.unit}</span> },
    { key:'min_stock', label:'Min', render:(v,row) => <span className="text-gray-400">{v} {row.unit}</span> },
    { key:'id', label:'Status', render:(_,row) => +row.stock < +row.min_stock ? <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded-lg flex items-center gap-1 w-fit"><AlertTriangle size={10} /> Low</span> : <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-lg">OK</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-extrabold text-gray-900">Inventory</h1><p className="text-sm text-gray-400 mt-1">Manajemen stok bahan baku</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-md shadow-brand/20"><Plus size={18} /> Tambah Material</button>
      </div>

      {lowCount > 0 && <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"><AlertTriangle size={20} className="text-red-500 shrink-0" /><p className="text-sm text-red-700"><strong>{lowCount} material</strong> di bawah stok minimum.</p></div>}

      {loading ? <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-brand" /></div> : (
        <DataTable columns={columns} data={items} searchValue={search} onSearch={(v) => { setSearch(v); setPage(1); }} page={page} totalPages={totalPages} onPageChange={setPage}
          actions={(row) => (
            <div className="flex items-center gap-1 justify-end">
              <button onClick={() => handleStockAdjust(row,'in')} className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition" title="Stok Masuk"><ArrowDownCircle size={14} /></button>
              <button onClick={() => handleStockAdjust(row,'out')} className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center justify-center transition" title="Stok Keluar"><ArrowUpCircle size={14} /></button>
              <button onClick={() => openEdit(row)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(row)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><Trash2 size={14} /></button>
            </div>
          )} />
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100"><h3 className="text-lg font-bold">{editing ? 'Edit Material' : 'Tambah Material'}</h3><button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">SKU *</label><input value={form.sku} onChange={(e) => setForm({...form, sku: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Nama *</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Kategori</label><select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm">{CATS.map((c) => <option key={c}>{c}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Unit</label><input value={form.unit} onChange={(e) => setForm({...form, unit: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Stok Awal</label><input type="number" value={form.stock} onChange={(e) => setForm({...form, stock: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Min Stok</label><input type="number" value={form.min_stock} onChange={(e) => setForm({...form, min_stock: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" /></div>
                <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Supplier</label><input value={form.supplier_name} onChange={(e) => setForm({...form, supplier_name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" placeholder="Nama supplier" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Kontak Supplier</label><input value={form.supplier_contact} onChange={(e) => setForm({...form, supplier_contact: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" /></div>
              </div>
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

export default Inventory;
