export const formatCurrency = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

export const IMG = (filename) =>
  filename ? `http://localhost:5000/uploads/${filename}` : null;

export const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  cutting: 'bg-blue-100 text-blue-700',
  sewing: 'bg-indigo-100 text-indigo-700',
  decorating: 'bg-purple-100 text-purple-700',
  finishing: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export const paymentColor = {
  lunas: 'bg-green-100 text-green-700',
  dp: 'bg-yellow-100 text-yellow-700',
  belum: 'bg-red-100 text-red-700',
};
