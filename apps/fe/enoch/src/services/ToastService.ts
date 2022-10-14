import { toast } from 'react-toastify';

export interface ToastOptions {
  position?: string,
  autoClose?: number,
  hideProgressBar?: boolean,
  closeOnClick?: boolean,
  pauseOnHover?: boolean,
  draggable?: boolean,
  progress?: undefined,
  type?: string,
}

class ToastService {
  defaultToastConfig: ToastOptions
  constructor() {
    this.defaultToastConfig = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    }
  }

  config(options : any)  {    
    return {...this.defaultToastConfig, ...options }
  }

  success(message: string, options?: ToastOptions) {
    toast.success(message, this.config(options))
  }

  error(message: string, options?: ToastOptions) {
    toast.error(message, this.config(options))
  }

  warning(message: string, options?: ToastOptions) {
    toast.warning(message, this.config(options))
  }

  info(message: string, options?: ToastOptions) {
    toast.info(message, this.config(options))
  }
  
}

export default new ToastService();