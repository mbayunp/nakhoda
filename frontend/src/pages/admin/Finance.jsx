import React, { useState, useEffect, useCallback } from 'react';
import { DollarSign, TrendingUp, Receipt, Plus, X, Loader2, Edit2, Trash2 } from 'lucide-react';
import MetricCard from '../../components/admin/MetricCard';
import DataTable from '../../components/admin/DataTable';
import Swal from 'sweetalert2';
import { transactionAPI } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';

const Finance = () => {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, profit: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ type:'income', amount:0, method:'transfer', description:'', date: new Date().toISOString().slice(0,10), order_id:'' });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [listRes, sumRes] = await Promise.all([
        transactionAPI.getAll({ page, limit: 20, search }),
        transactionAPI.summary(),
      ]);
      setItems(listRes.data.data || []);
      setTotalPages(listRes.data.pagination?.totalPages || 1);
      setSummary(sumRes.data.data || sumRes.data.message || {});
    } catch { setItems([]); }
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetch(); }, [fetch]);

  const openAdd = () => { setEditing(null); setForm({ type:'income', amount:0, method:'transfer', description:'', date: new Date().toISOString().slice(0,10), order_id:'' }); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ type: item.type, amount: item.amount, method: item.method||'', description: item.description||'', date: item.date, order_id: item.order_id||'' }); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.description) return Swal.fire({ icon:'warning', title:'Jumlah & deskripsi wajib diisi' });
    setSaving(true);
    try {
      if (editing) await transactionAPI.update(editing.id, form);
      else await transactionAPI.create(form);
      Swal.fire({ icon:'success', title:'Transaksi berhasil disimpan', timer:1500, showConfirmButton:false });
      setModal(false); fetch();
    } catch (err) { Swal.fire({ icon:'error', title:'Gagal', text: err.response?.data?.message || 'Error' }); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    const { isConfirmed } = await Swal.fire({ title:'Hapus Transaksi?', icon:'warning', showCancelButton:true, confirmButtonColor:'#ef4444', confirmButtonText:'Ya, Hapus' });
    if (!isConfirmed) return;
    try { await transactionAPI.delete(item.id); Swal.fire({ icon:'success', title:'Terhapus', timer:1200, showConfirmButton:false }); fetch(); } catch { Swal.fire({ icon:'error', title:'Gagal menghapus' }); }
  };

  const columns = [
    { key:'date', label:'Tanggal', render:(v) => formatDate(v) },
    { key:'type', label:'Tipe', render:(v) => <span className={`text-xs font-bold px-2 py-1 rounded-lg ${v === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{v === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span> },
    { key:'description', label:'Deskripsi', render:(v) => <span className="font-medium">{v}</span> },
    { key:'method', label:'Metode', render:(v) => <span className="text-xs text-gray-500 capitalize">{v || '—'}</span> },
    { key:'amount', label:'Jumlah', render:(v,row) => <span className={`font-bold ${row.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{row.type === 'income' ? '+' : '-'}{formatCurrency(+v)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-extrabold text-gray-900">Finance</h1><p className="text-sm text-gray-400 mt-1">Laporan keuangan</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-md shadow-brand/20"><Plus size={18} /> Catat Transaksi</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard icon={DollarSign} title="Total Pemasukan" value={formatCurrency(summary.totalIncome || 0)} color="green" />
        <MetricCard icon={Receipt} title="Total Pengeluaran" value={formatCurrency(summary.totalExpense || 0)} color="red" />
        <MetricCard icon={TrendingUp} title="Profit" value={formatCurrency(summary.profit || 0)} color="brand" />
      </div>

      {loading ? <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-brand" /></div> : (
        <DataTable columns={columns} data={items} searchValue={search} onSearch={(v) => { setSearch(v); setPage(1); }} page={page} totalPages={totalPages} onPageChange={setPage}
          actions={(row) => (
            <div className="flex items-center gap-1 justify-end">
              <button onClick={() => openEdit(row)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(row)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><Trash2 size={14} /></button>
            </div>
          )} />
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100"><h3 className="text-lg font-bold">{editing ? 'Edit Transaksi' : 'Catat Transaksi'}</h3><button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tipe</label><select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm"><option value="income">Pemasukan</option><option value="expense">Pengeluaran</option></select></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Jumlah (Rp) *</label><input type="number" value={form.amount} onChange={(e) => setForm({...form, amount: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Deskripsi *</label><input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Metode</label><select value={form.method} onChange={(e) => setForm({...form, method: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm"><option value="transfer">Transfer</option><option value="cash">Cash</option><option value="other">Lainnya</option></select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal</label><input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" /></div>
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

export default Finance;
