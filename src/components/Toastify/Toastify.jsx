import { Bounce, toast } from "react-toastify";

export const notify = (msg,status) =>
  toast[status](msg, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
    transition: Bounce,
  });
