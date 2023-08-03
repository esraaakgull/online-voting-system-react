import { toast } from 'react-toastify';

const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  newestOnTop: false,
  rtl: false,
  theme: 'colored'
};
export const showSuccessNotification = (message) => {
  toast.success(message, toastOptions);
};
export const showErrorNotification = (message) => {
  toast.error(message, toastOptions);
};
export const showWarningNotification = (message) => {
  toast.warn(message, toastOptions);
};
export const showInfoNotification = (message) => {
  toast.info(message, toastOptions);
};
