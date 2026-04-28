import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ columns, data, searchValue, onSearch, page, totalPages, onPageChange, actions, emptyText = 'Data tidak ditemukan' }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {onSearch && (
        <div className="p-4 border-b border-gray-50">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={searchValue} onChange={(e) => onSearch(e.target.value)} placeholder="Cari..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition" />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/60">
              {columns.map((col) => (
                <th key={col.key} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">{col.label}</th>
              ))}
              {actions && <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr><td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-12 text-gray-400">{emptyText}</td></tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id || i} className="hover:bg-gray-50/50 transition">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-gray-700">{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
                  ))}
                  {actions && <td className="px-5 py-3.5 text-right">{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">Halaman {page} dari {totalPages}</span>
          <div className="flex gap-1">
            <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30"><ChevronLeft size={16} /></button>
            <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30"><ChevronRight size={16} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
