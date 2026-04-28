import React, { useState, useEffect, useCallback } from 'react';
import { Plus, X, Calculator, Loader2, Edit2, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import DataTable from '../../components/admin/DataTable';
import { orderAPI, customerAPI } from '../../services/api';
import { formatCurrency, statusColor, paymentColor, formatDate } from '../../utils/formatters';

const STATUSES = ['pending','cutting','sewing','decorating','finishing','delivered','cancelled'];
const PAYMENTS = ['belum','dp','lunas'];

const Orders = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ client_name:'', product:'', qty:0, deadline:'', status:'pending', payment_status:'belum', material_cost:0, sewing_cost:0, printing_cost:0, overhead:0, margin:20, notes:'', customer_id:'' });
  const [hppModal, setHppModal] = useState(false);
  const [hpp, setHpp] = useState({ material:0, qty:0, sewing:0, printing:0, overhead:0, margin:20 });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await orderAPI.getAll({ page, limit: 10, search });
      setItems(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch { setItems([]); }
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetch(); }, [fetch]);

  const loadCustomers = async () => { try { const { data } = await customerAPI.getAll({ limit: 100 }); setCustomers(data.data || []); } catch {} };

  const openAdd = () => { setEditing(null); setForm({ client_name:'', product:'', qty:0, deadline:'', status:'pending', payment_status:'belum', material_cost:0, sewing_cost:0, printing_cost:0, overhead:0, margin:20, notes:'', customer_id:'' }); loadCustomers(); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ client_name: item.client_name, product: item.product, qty: item.qty, deadline: item.deadline||'', status: item.status, payment_status: item.payment_status, material_cost: item.material_cost, sewing_cost: item.sewing_cost, printing_cost: item.printing_cost, overhead: item.overhead, margin: item.margin, notes: item.notes||'', customer_id: item.customer_id||'' }); loadCustomers(); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.client_name || !form.product) return Swal.fire({ icon:'warning', title:'Nama klien & produk wajib diisi' });
    setSaving(true);
    try {
      if (editing) await orderAPI.update(editing.id, form);
      else await orderAPI.create(form);
      Swal.fire({ icon:'success', title: editing ? 'Pesanan diperbarui' : 'Pesanan dibuat', timer:1500, showConfirmButton:false });
      setModal(false); fetch();
    } catch (err) { Swal.fire({ icon:'error', title:'Gagal', text: err.response?.data?.message || 'Error' }); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    const { isConfirmed } = await Swal.fire({ title:'Hapus Pesanan?', text:`"${item.client_name} - ${item.product}" akan dihapus`, icon:'warning', showCancelButton:true, confirmButtonColor:'#ef4444', confirmButtonText:'Ya, Hapus', cancelButtonText:'Batal' });
    if (!isConfirmed) return;
    try { await orderAPI.delete(item.id); Swal.fire({ icon:'success', title:'Terhapus', timer:1200, showConfirmButton:false }); fetch(); } catch { Swal.fire({ icon:'error', title:'Gagal menghapus' }); }
  };

  const totalHpp = (hpp.material * hpp.qty) + hpp.sewing + hpp.printing + hpp.overhead;
  const sellingPrice = totalHpp * (1 + hpp.margin / 100);

  const columns = [
    { key:'client_name', label:'Klien', render:(v) => <span className="font-semibold">{v}</span> },
    { key:'product', label:'Produk' },
    { key:'qty', label:'Qty', render:(v) => <span className="font-mono">{v}</span> },
    { key:'deadline', label:'Deadline', render:(v) => v ? formatDate(v) : '—' },
    { key:'payment_status', label:'Bayar', render:(v) => <span className={`text-xs font-bold px-2 py-1 rounded-lg capitalize ${paymentColor[v]||''}`}>{v==='dp'?'DP':v==='lunas'?'Lunas':'Belum'}</span> },
    { key:'status', label:'Status', render:(v) => <span className={`text-xs font-bold px-2.5 py-1 rounded-lg capitalize ${statusColor[v]||''}`}>{v}</span> },
    { key:'total', label:'Total', render:(v) => <span className="font-semibold text-brand-dark">{formatCurrency(+v||0)}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-extrabold text-gray-900">Orders</h1><p className="text-sm text-gray-400 mt-1">Manajemen pesanan produksi</p></div>
        <div className="flex gap-2">
          <button onClick={() => setHppModal(true)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-xl transition"><Calculator size={16} /> HPP</button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-md shadow-brand/20"><Plus size={18} /> Pesanan Baru</button>
        </div>
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
          <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold">{editing ? 'Edit Pesanan' : 'Pesanan Baru'}</h3>
              <button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Nama Klien *</label><input value={form.client_name} onChange={(e) => setForm({...form, client_name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Produk *</label><input value={form.product} onChange={(e) => setForm({...form, product: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Qty</label><input type="number" value={form.qty} onChange={(e) => setForm({...form, qty: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Deadline</label><input type="date" value={form.deadline} onChange={(e) => setForm({...form, deadline: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Status</label><select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm">{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Pembayaran</label><select value={form.payment_status} onChange={(e) => setForm({...form, payment_status: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm">{PAYMENTS.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Margin %</label><input type="number" value={form.margin} onChange={(e) => setForm({...form, margin: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" /></div>
                <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Catatan</label><textarea rows={2} value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm resize-none" /></div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" onClick={() => setModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Batal</button>
              <button type="submit" disabled={saving} className="px-5 py-2.5 text-sm font-bold text-white bg-brand rounded-xl hover:bg-brand-dark transition flex items-center gap-2 disabled:opacity-50">{saving && <Loader2 size={14} className="animate-spin" />} Simpan</button>
            </div>
          </form>
        </div>
      )}

      {hppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100"><h3 className="text-lg font-bold flex items-center gap-2"><Calculator size={18} className="text-brand" /> HPP Calculator</h3><button onClick={() => setHppModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div>
            <div className="p-6 space-y-4">
              {[{l:'Harga Bahan/pcs',k:'material'},{l:'Jumlah',k:'qty'},{l:'Biaya Jahit',k:'sewing'},{l:'Biaya Sablon',k:'printing'},{l:'Overhead',k:'overhead'},{l:'Margin %',k:'margin'}].map((f) => (
                <div key={f.k}><label className="block text-xs font-semibold text-gray-600 mb-1">{f.l}</label><input type="number" value={hpp[f.k]} onChange={(e) => setHpp({...hpp, [f.k]: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm" /></div>
              ))}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Total HPP</span><span className="font-bold">{formatCurrency(totalHpp)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Harga Jual</span><span className="font-extrabold text-brand-dark text-lg">{formatCurrency(sellingPrice)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Profit</span><span className="font-bold text-green-600">{formatCurrency(sellingPrice - totalHpp)}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
