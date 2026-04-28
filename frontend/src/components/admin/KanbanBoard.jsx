import React from 'react';
import { ArrowRight } from 'lucide-react';

const stages = [
  { key: 'pending', label: 'Pending', color: 'border-yellow-300 bg-yellow-50' },
  { key: 'cutting', label: 'Cutting', color: 'border-blue-300 bg-blue-50' },
  { key: 'sewing', label: 'Sewing', color: 'border-indigo-300 bg-indigo-50' },
  { key: 'decorating', label: 'Decorating', color: 'border-purple-300 bg-purple-50' },
  { key: 'finishing', label: 'Finishing', color: 'border-orange-300 bg-orange-50' },
  { key: 'delivered', label: 'Ready', color: 'border-green-300 bg-green-50' },
];

const KanbanBoard = ({ items, onMoveNext }) => {
  const grouped = {};
  stages.forEach((s) => { grouped[s.key] = []; });
  items.forEach((item) => {
    if (grouped[item.status]) grouped[item.status].push(item);
  });

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <div key={stage.key} className={`min-w-[220px] flex-1 rounded-2xl border-2 ${stage.color} p-3`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">{stage.label}</h4>
            <span className="text-xs font-bold bg-white rounded-full w-6 h-6 flex items-center justify-center text-gray-500">{grouped[stage.key].length}</span>
          </div>
          <div className="space-y-2">
            {grouped[stage.key].map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 group hover:shadow-md transition">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.client}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.product} • {item.qty} pcs</p>
                {stage.key !== 'delivered' && onMoveNext && (
                  <button onClick={() => onMoveNext(item.id)} className="mt-2 flex items-center gap-1 text-xs text-brand font-semibold opacity-0 group-hover:opacity-100 transition">
                    Next <ArrowRight size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { stages };
export default KanbanBoard;
