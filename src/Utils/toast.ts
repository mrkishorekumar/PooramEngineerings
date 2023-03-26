

import { ToastOptions } from '../../node_modules/react-toastify/dist/types/index' 

export const toastSettings : ToastOptions<{}> | undefined  = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}