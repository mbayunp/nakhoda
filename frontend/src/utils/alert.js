import Swal from 'sweetalert2';

export const showSuccess = (message) => {
  return Swal.fire({
    title: 'Berhasil!',
    text: message,
    icon: 'success',
    confirmButtonColor: '#0f172a',
    confirmButtonText: 'Tutup',
    customClass: {
      popup: 'rounded-2xl',
      confirmButton: 'rounded-lg px-6 py-2'
    }
  });
};

export const showError = (message) => {
  return Swal.fire({
    title: 'Gagal',
    text: message,
    icon: 'error',
    confirmButtonColor: '#dc2626',
    confirmButtonText: 'Tutup',
    customClass: {
      popup: 'rounded-2xl',
      confirmButton: 'rounded-lg px-6 py-2'
    }
  });
};

export const showConfirm = (message) => {
  return Swal.fire({
    title: 'Konfirmasi',
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#0f172a',
    cancelButtonColor: '#dc2626',
    confirmButtonText: 'Ya, Lanjut',
    cancelButtonText: 'Batal',
    customClass: {
      popup: 'rounded-2xl',
      confirmButton: 'rounded-lg px-6 py-2',
      cancelButton: 'rounded-lg px-6 py-2'
    }
  });
};
