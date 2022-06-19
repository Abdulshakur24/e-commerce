import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Logo from "../../assets/audiophile.svg";
import axios from "../../axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../app-redux/features/User";
import { LoadingButton } from "@mui/lab";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      background: 500,
    },
    margin: {
      margin: theme.spacing(0),
    },
  })
);

const isProduction = process.env.NODE_ENV === "production";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d87d4a",
    },
  },
});

const controller = new AbortController();

function Register() {
  const classes = useStyles();
  const [userLogin, setUserLogin] = useState({
    lg_email: "",
    lg_password: "",
  });
  const [userRegister, setUserRegister] = useState({
    rg_name: "",
    rg_email: "",
    rg_password: "",
  });

  const user = useSelector((state) => state.user.user, shallowEqual);

  const [state, setState] = useState(true);
  const [rg_show, setRgShow] = useState(false);
  const [lg_show, setLgShow] = useState(false);
  const [lg_loading, setLgLoading] = useState(false);
  const [rg_loading, setRgLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      Authorization: `Bearer ${token}`,
    };

    const tokenExists = async () => {
      try {
        const { data } = await axios.post(
          "/token",
          { token },
          { method: "POST", signal: controller.signal }
        );
        sessionStorage.setItem("token", data?.token);
        toastifyInfo(`Welcome back ${data.name}!`);
        setLgLoading(false);
        setRgLoading(false);
        dispatch(loadUser(data));
      } catch (error) {
        setLgLoading(false);
        setRgLoading(false);
        toastifyError(error.response?.data);
      }
    };

    if (token) {
      setLgLoading(true);
      setRgLoading(true);
      tokenExists();
    }

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    setLgLoading(true);
    setRgLoading(true);

    const credentialsExists = async () => {
      try {
        const { data } = await axios.get("/auth/credentials", {
          signal: controller.signal,
        });
        sessionStorage.setItem("token", data?.token);
        toastifyInfo(`Welcome ${data.name}!`);
        setLgLoading(false);
        setRgLoading(false);
        dispatch(loadUser(data));
      } catch (error) {
        setLgLoading(false);
        setRgLoading(false);
        error.response?.data && toastifyError(error.response?.data);
      }
    };

    credentialsExists();

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    const loginAsGuest = () => {
      const login = () => {
        setUserLogin({
          lg_email: "guest@gmail.com",
          lg_password: "guest1234",
        });
        const handleSubmitGuest = async () => {
          setLgLoading(true);
          try {
            const { data } = await axios.post("/user/login", {
              lg_email: "guest@gmail.com",
              lg_password: "guest1234",
            });
            sessionStorage.setItem("token", data.token);
            toastifyInfo(`Welcome ${data.name}!`);
            setLgLoading(false);
            dispatch(loadUser(data));
          } catch (error) {
            setLgLoading(false);
            toastifyError(error.response?.data);
          }
        };
        handleSubmitGuest();
      };

      toastifyInfo(
        "Feeling lazy to sign up? Click here to sign in as a Guest",
        login,
        5000,
        "top-right"
      );
    };

    if (lg_loading && rg_loading && !Boolean(sessionStorage.getItem("token")))
      return setTimeout(() => loginAsGuest(), 2000);
  }, [dispatch, lg_loading, rg_loading]);

  const toastifyError = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      closeButton: true,
    });
  };

  const toastifyInfo = (
    info,
    func = () => {},
    autoClose = 3000,
    position = "top-center"
  ) => {
    toast.info(info, {
      position: position,
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClick: func,
    });
  };

  const handleLogin = (name) => (e) => {
    setUserLogin({ ...userLogin, [name]: e.target.value });
  };

  const handleRegister = (name) => (e) => {
    setUserRegister({ ...userRegister, [name]: e.target.value });
  };

  const { lg_email, lg_password } = userLogin;
  const { rg_name, rg_email, rg_password } = userRegister;

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLgLoading(true);
    try {
      const { data } = await axios.post("/user/login", userLogin);
      sessionStorage.setItem("token", data.token);
      toastifyInfo(`Welcome ${data.name}!`);
      setLgLoading(false);
      dispatch(loadUser(data));
    } catch ({ response }) {
      setLgLoading(false);
      toastifyError(response?.data);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setRgLoading(true);

    try {
      const { data } = await axios.post("/user/register", userRegister);
      setRgLoading(false);
      sessionStorage.setItem("token", data.token);
      toastifyInfo(`Welcome ${data.name}!`);
      dispatch(loadUser(data));
    } catch (error) {
      setRgLoading(false);
      toastifyError(error.response?.data);
    }
  };

  const navigate = () =>
    (window.location.href = isProduction
      ? "https://e-commerce-2022.herokuapp.com/auth/google"
      : "http://localhost:5010/auth/google");

  return (
    <div className="register">
      <header>
        <div className="container">
          <img src={Logo} alt="" />
          <h6>Powered by Audiophile</h6>
        </div>
      </header>
      <ThemeProvider theme={theme}>
        <div className="register-body">
          <div className="container">
            {state ? (
              <form onSubmit={handleSubmitLogin}>
                <h1>Login</h1>
                <TextField
                  className={`${classes} a`}
                  label="Email"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input-email"
                  type="email"
                  required
                  onChange={handleLogin("lg_email")}
                  value={lg_email}
                />
                <TextField
                  className={`${classes} a`}
                  label="Password"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input-password"
                  type={lg_show ? "text" : "password"}
                  required
                  onChange={handleLogin("lg_password")}
                  value={lg_password}
                />

                <div className="checkbox">
                  <input type="checkbox" onChange={() => setLgShow(!lg_show)} />
                  <label>{lg_show ? "Hide" : "Show"} password</label>
                </div>

                <p>
                  Don't have an account?
                  <em onClick={() => setState(false)}>Register here</em>
                </p>

                <div className="buttons">
                  <LoadingButton
                    type="submit"
                    loading={lg_loading}
                    variant="outlined"
                  >
                    Login
                  </LoadingButton>

                  <h2>OR</h2>

                  <LoadingButton disabled={lg_loading} onClick={navigate}>
                    <GoogleIcon className="googleIcon" /> GOOGLE
                  </LoadingButton>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitRegister}>
                <h1>Register</h1>
                <TextField
                  className={`${classes} a`}
                  label="Name"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  type="text"
                  required
                  onChange={handleRegister("rg_name")}
                  value={rg_name}
                />
                <TextField
                  className={`${classes} a`}
                  label="Email"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  type="email"
                  required
                  onChange={handleRegister("rg_email")}
                  value={rg_email}
                />
                <TextField
                  className={`${classes} a`}
                  label="Password"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  type={rg_show ? "text" : "password"}
                  required
                  error={false}
                  onChange={handleRegister("rg_password")}
                  value={rg_password}
                />

                <div className="checkbox">
                  <input type="checkbox" onChange={() => setRgShow(!rg_show)} />
                  <label>{rg_show ? "Hide" : "Show"} password</label>
                </div>
                <p>
                  Already have an account?
                  <em onClick={() => setState(true)}> Login here</em>
                </p>

                <div className="buttons">
                  <LoadingButton
                    loading={rg_loading}
                    variant="outlined"
                    type="submit"
                  >
                    Register
                  </LoadingButton>

                  <h2>OR</h2>

                  <LoadingButton disabled={rg_loading} onClick={navigate}>
                    <GoogleIcon className="googleIcon" /> GOOGLE
                  </LoadingButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </ThemeProvider>
      <Redirect to={user ? "/" : "/register"} />
    </div>
  );
}

export default Register;
