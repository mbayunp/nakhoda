import React, { useState, useEffect } from 'react';
import { Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { orderAPI } from '../../services/api';

const STAGES = ['pending', 'cutting', 'sewing', 'decorating', 'finishing', 'delivered'];

const Production = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getAll({ limit: 100 });
      const mapped = (data.data || [])
        .filter((o) => o.status !== 'cancelled')
        .map((o) => ({ id: o.id, client: o.client_name, product: o.product, qty: o.qty, status: o.status }));
      setItems(mapped);
    } catch { setItems([]); }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleMove = async (id, currentStatus, direction) => {
    const idx = STAGES.indexOf(currentStatus);
    const newIdx = direction === 'next' ? idx + 1 : idx - 1;

    // Validasi pencegahan error index
    if (newIdx < 0 || newIdx >= STAGES.length) return;

    const nextStatus = STAGES[newIdx];

    const { value: note } = await Swal.fire({
      title: `Pindah ke ${nextStatus.toUpperCase()}?`,
      input: 'text',
      inputPlaceholder: 'Catatan produksi (Opsional)...',
      showCancelButton: true,
      confirmButtonText: 'Ya, Pindahkan',
      cancelButtonText: 'Batal'
    });

    if (note !== undefined) {
      try {
        // Asumsi orderAPI.updateStatus mendukung payload object { status, note }
        // Jika tidak, sesuaikan dengan endpoint backend kamu
        await orderAPI.updateStatus(id, nextStatus, { note });
        Swal.fire({ icon: 'success', title: 'Status diperbarui', timer: 1000, showConfirmButton: false });
        fetchOrders();
      } catch {
        Swal.fire({ icon: 'error', title: 'Gagal update status' });
      }
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 size={32} className="animate-spin text-brand" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Production Board</h1>
        <p className="text-sm text-gray-400 mt-1">Tracking produksi real-time</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">Belum ada pesanan untuk ditampilkan</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {STAGES.map(stage => (
            <div key={stage} className="min-w-[300px] w-[300px] bg-gray-50/80 rounded-2xl p-4 border border-gray-200 shrink-0 flex flex-col max-h-[70vh]">
              <h3 className="font-bold text-gray-700 capitalize mb-4 flex justify-between items-center px-1">
                {stage}
                <span className="bg-white border border-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full text-xs shadow-sm">
                  {items.filter(i => i.status === stage).length}
                </span>
              </h3>

              <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-1">
                {items.filter(i => i.status === stage).map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                    <h4 className="font-bold text-gray-800 text-sm">{item.client}</h4>
                    <p className="text-xs text-gray-500 mt-1 mb-4">{item.product} • <span className="font-bold text-gray-700">{item.qty} pcs</span></p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMove(item.id, stage, 'back')}
                        disabled={stage === STAGES[0]}
                        className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 text-[11px] uppercase tracking-wider font-bold rounded-lg transition"
                      >
                        <ChevronLeft size={14} /> Back
                      </button>
                      <button
                        onClick={() => handleMove(item.id, stage, 'next')}
                        disabled={stage === STAGES[STAGES.length - 1]}
                        className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] uppercase tracking-wider font-bold rounded-lg transition"
                      >
                        Next <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Production;