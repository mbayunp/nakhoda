import React from 'react';

const MetricCard = ({ title, value, icon: Icon, change, changeType = 'up', color = 'brand' }) => {
  const colors = {
    brand: 'bg-brand/10 text-brand',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${colors[color]} flex items-center justify-center`}>
          <Icon size={20} />
        </div>
        {change && (
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${changeType === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {changeType === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 font-medium mt-1">{title}</p>
    </div>
  );
};

export default MetricCard;
