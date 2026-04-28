import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#D4AF37', '#C9A227', '#3B2F2F', '#5A3E2B', '#6B7280', '#9CA3AF'];

export const BarChartCard = ({ title, data, dataKey, nameKey = 'name', color = '#D4AF37' }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5">
    <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey={nameKey} tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const PieChartCard = ({ title, data }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5">
    <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={4} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
