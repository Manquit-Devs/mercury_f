import Swal from 'sweetalert2';

export const successAlert = async (text: string) => {
  await Swal.fire({
    title: 'Sucesso',
    text,
    icon: 'success',
    showConfirmButton: false,
    timer: 4000,
  });
};

export const errorAlert = async (text: string) => {
  await Swal.fire({
    title: 'Error',
    text,
    icon: 'error',
    showConfirmButton: false,
    timer: 4000,
  });
};
