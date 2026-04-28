import React, { useState, useEffect } from 'react';
import KanbanBoard from '../../components/admin/KanbanBoard';
import { Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { orderAPI } from '../../services/api';

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

  const handleMoveNext = async (id) => {
    const stageOrder = ['pending','cutting','sewing','decorating','finishing','delivered'];
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const idx = stageOrder.indexOf(item.status);
    if (idx < 0 || idx >= stageOrder.length - 1) return;
    const next = stageOrder[idx + 1];
    try {
      await orderAPI.updateStatus(id, next);
      Swal.fire({ icon: 'success', title: `Dipindahkan ke ${next}`, timer: 1000, showConfirmButton: false });
      fetchOrders();
    } catch { Swal.fire({ icon: 'error', title: 'Gagal update status' }); }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 size={32} className="animate-spin text-brand" /></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold text-gray-900">Production Board</h1><p className="text-sm text-gray-400 mt-1">Tracking produksi real-time</p></div>
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">Belum ada pesanan untuk ditampilkan</div>
      ) : (
        <KanbanBoard items={items} onMoveNext={handleMoveNext} />
      )}
    </div>
  );
};

export default Production;
