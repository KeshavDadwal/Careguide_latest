import { ToastContainer, toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CONFIG_OPTIONS: ToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const showInfoToast = (toastMessage: string) => {
    toast.info(toastMessage, CONFIG_OPTIONS)
};

export const showSuccessToast = (toastMessage: string) => {
    toast.success(toastMessage, CONFIG_OPTIONS)
};

export const showWarnToast = (toastMessage: string) => {
    toast.warn(toastMessage, CONFIG_OPTIONS)
};

export const showErrorToast = (toastMessage: string) => {
    toast.error(toastMessage, CONFIG_OPTIONS)
};

export const ToastMessage: React.FC = () => {
    return <ToastContainer />
}
