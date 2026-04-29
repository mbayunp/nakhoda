import React, { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, AlertTriangle, TrendingUp, Clock, Package, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <Loader2 size={40} className="animate-spin text-brand" />
      <p className="text-sm text-gray-400 font-medium">Memuat data metrik...</p>
    </div>
  );

  const s = summary || {};
  const statusData = (s.statusCounts || []).map((c) => ({ name: c.status, value: +c.count }));
  const latest = s.latestOrders || [];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Ringkasan aktivitas produksi dan keuangan Anda.</p>
        </div>
        <Link to="/admin/orders" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          Buat Pesanan Baru
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard icon={ShoppingCart} title="Pesanan Aktif" value={s.activeOrders ?? 0} color="brand" />
        <MetricCard icon={DollarSign} title="Estimasi Omzet" value={formatCurrency(s.monthRevenue ?? 0)} color="green" />
        <MetricCard icon={AlertTriangle} title="Deadline < 7 Hari" value={s.nearDeadline ?? 0} color="red" />
        <MetricCard icon={TrendingUp} title="Produksi Selesai" value={s.delivered ?? 0} color="blue" />
      </div>

      {/* Charts Section */}
      {statusData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
            <PieChartCard title="Status Produksi Berjalan" data={statusData} />
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-gray-400">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-gray-800 font-bold mb-1">Grafik Pendapatan</h3>
            <p className="text-gray-500 text-sm max-w-[250px]">Grafik tren revenue akan otomatis tampil setelah ada data transaksi lunas bulan ini.</p>
          </div>
        </div>
      )}

      {/* Table & Inventory Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Latest Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Pesanan Masuk Terbaru</h3>
            <Link to="/admin/orders" className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center gap-1 group">
              Lihat Semua <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {latest.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 text-gray-400">
              <ShoppingCart size={40} className="mb-3 text-gray-200" />
              <p className="text-sm font-medium">Belum ada data pesanan baru</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-100">
                    <th className="px-6 py-4">Nama Klien</th>
                    <th className="px-6 py-4">Item Produk</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {latest.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-gray-800">{o.client_name || o.customer?.name || '—'}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{o.product}</td>
                      <td className="px-6 py-4 text-gray-600">{o.qty} <span className="text-xs text-gray-400">pcs</span></td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center justify-center text-[11px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${statusColor[o.status] || 'bg-gray-100 text-gray-600'}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                        <Clock size={14} className="text-gray-400 group-hover:text-brand transition-colors" />
                        {o.deadline ? formatDate(o.deadline) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Widget */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Package size={18} className="text-orange-500" /> Peringatan Stok
            </h3>
          </div>

          <div className="p-6 flex-1 bg-gray-50/30">
            {lowStock.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-10 text-center">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-sm font-bold text-gray-700">Semua Stok Aman</p>
                <p className="text-xs text-gray-400 mt-1">Material produksi mencukupi</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lowStock.map((item) => {
                  const percentage = Math.min(100, (+item.stock / +item.min_stock) * 100);
                  const isCritical = percentage < 30;

                  return (
                    <div key={item.id} className={`rounded-xl p-4 border ${isCritical ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <p className={`text-sm font-bold ${isCritical ? 'text-red-900' : 'text-orange-900'}`}>{item.name}</p>
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${isCritical ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                          Sisa {item.stock} {item.unit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 mb-1.5">
                        <span className={`text-[11px] font-medium ${isCritical ? 'text-red-500' : 'text-orange-500'}`}>Kapasitas Menipis</span>
                        <span className="text-[11px] text-gray-500 font-medium">Batas Min: {item.min_stock}</span>
                      </div>
                      <div className={`w-full rounded-full h-1.5 ${isCritical ? 'bg-red-200' : 'bg-orange-200'}`}>
                        <div className={`h-1.5 rounded-full ${isCritical ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;