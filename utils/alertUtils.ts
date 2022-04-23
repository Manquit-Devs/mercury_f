import Swal from 'sweetalert2';

export const confirmAlert = async (text: string) => {
  return Swal.fire({
    title: 'Warning',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
  });
};

export const successAlert = async (text: string, showConfirmButton = false) => {
  await Swal.fire({
    title: 'Success',
    text,
    icon: 'success',
    showConfirmButton: showConfirmButton,
    timer: showConfirmButton ? 0 : 5000,
  });
};

export const errorAlert = async (text: string, showConfirmButton = false) => {
  await Swal.fire({
    title: 'Error',
    text,
    icon: 'error',
    showConfirmButton: showConfirmButton,
    timer: showConfirmButton ? 0 : 5000,
  });
};
