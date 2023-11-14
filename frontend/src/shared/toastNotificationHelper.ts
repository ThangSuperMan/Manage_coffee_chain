import { toast } from 'react-toastify';

const essentialSettings = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const notifySuccess = (message: string) => {
  // @ts-ignore
  toast.success(message, essentialSettings);
};

export const notififyError = (message: string) => {
  // @ts-ignore
  toast.error(message, essentialSettings);
};
