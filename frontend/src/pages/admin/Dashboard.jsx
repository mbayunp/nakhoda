import React, { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, AlertTriangle, TrendingUp, Clock, Package, Loader2 } from 'lucide-react';
import MetricCard from '../../components/admin/MetricCard';
import { BarChartCard, PieChartCard } from '../../components/admin/ChartCard';
import { orderAPI, materialAPI } from '../../services/api';
import { formatCurrency, statusColor, formatDate } from '../../utils/formatters';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [sumRes, stockRes] = await Promise.all([orderAPI.summary(), materialAPI.lowStock()]);
        setSummary(sumRes.data.data || sumRes.data.message);
        setLowStock(stockRes.data.data || []);
      } catch { }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={32} className="animate-spin text-brand" /></div>;

  const s = summary || {};
  const statusData = (s.statusCounts || []).map((c) => ({ name: c.status, value: +c.count }));
  const latest = s.latestOrders || [];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1><p className="text-sm text-gray-400 mt-1">Ringkasan eksekutif</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={ShoppingCart} title="Pesanan Aktif" value={s.activeOrders ?? 0} color="brand" />
        <MetricCard icon={DollarSign} title="Estimasi Omzet" value={formatCurrency(s.monthRevenue ?? 0)} color="green" />
        <MetricCard icon={AlertTriangle} title="Deadline < 7 Hari" value={s.nearDeadline ?? 0} color="red" />
        <MetricCard icon={TrendingUp} title="Produksi Selesai" value={s.delivered ?? 0} color="blue" />
      </div>

      {statusData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PieChartCard title="Status Produksi" data={statusData} />
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-center text-gray-400 text-sm">
            Grafik revenue akan tampil saat ada transaksi
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50"><h3 className="text-sm font-bold text-gray-800">Pesanan Terbaru</h3></div>
          {latest.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">Belum ada pesanan</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50/60">
                  {['Klien','Produk','Qty','Status','Deadline'].map((h) => <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-2.5">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {latest.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-medium">{o.client_name || o.customer?.name || '—'}</td>
                      <td className="px-5 py-3 text-gray-500">{o.product}</td>
                      <td className="px-5 py-3 text-gray-500">{o.qty}</td>
                      <td className="px-5 py-3"><span className={`text-xs font-bold px-2.5 py-1 rounded-lg capitalize ${statusColor[o.status] || ''}`}>{o.status}</span></td>
                      <td className="px-5 py-3 text-gray-500 flex items-center gap-1"><Clock size={12} />{o.deadline ? formatDate(o.deadline) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><Package size={16} className="text-red-500" />Stok Rendah</h3>
          {lowStock.length === 0 ? (
            <p className="text-sm text-gray-400">Semua stok aman ✓</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((item) => (
                <div key={item.id} className="bg-red-50 rounded-xl p-3 border border-red-100">
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-red-600 font-bold">{item.stock} {item.unit}</span>
                    <span className="text-xs text-gray-400">Min: {item.min_stock}</span>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-1.5 mt-2">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (+item.stock / +item.min_stock) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
