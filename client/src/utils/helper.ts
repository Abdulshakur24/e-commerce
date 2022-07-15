import { createTheme } from "@mui/material";
import { toast } from "react-toastify";
import axios from "./axios";

export const getOrderHistory = async () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.get("/history/all");
  return data;
};

export const toastifyError = (error: string) => {
  toast.error(error, {
    position: "top-center",
    autoClose: 4500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    closeButton: true,
  });
};

export const toastifyInfo = (
  info: string,
  func = () => {},
  autoClose = 3000,
  position:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left" = "top-center",
  delay = 0
) => {
  toast.info(info, {
    position,
    delay,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    onClick: func,
  });
};

export const toastifySucces = (success: string) => {
  toast.success(success, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
  });
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#d87d4a",
    },
  },
});
