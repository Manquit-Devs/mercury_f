import Swal from 'sweetalert2';

export const successAlert = async (text: string, showConfirmButton = false) => {
  await Swal.fire({
    title: 'Sucesso',
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
