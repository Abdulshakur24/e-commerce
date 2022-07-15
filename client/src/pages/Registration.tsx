import { TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Logo from "src/assets/audiophile.svg";
import axios from "src/utils/axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "src/hooks/useAuth";
import { theme, toastifyError, toastifyInfo } from "src/utils/helper";
import { useQuery } from "react-query";

const isProduction = process.env.NODE_ENV === "production";

const controller = new AbortController();

function Register() {
  const [userLogin, setUserLogin] = useState({
    lg_email: "",
    lg_password: "",
  });

  const [userRegister, setUserRegister] = useState({
    rg_name: "",
    rg_email: "",
    rg_password: "",
  });

  const navigator = useNavigate();

  const [state, setState] = useState(true);
  const [rg_show, setRgShow] = useState(false);
  const [lg_show, setLgShow] = useState(false);
  const [lg_loading, setLgLoading] = useState(false);
  const [rg_loading, setRgLoading] = useState(false);

  const { loadUser } = useAuth();

  // login in automatically if token existed in localStorage.

  useQuery("user/auto-login", async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        "/user/token",
        { token },
        {
          method: "POST",
          signal: controller.signal,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("token", data.token);
      toastifyInfo(`Welcome back ${data.name}!`);
      setLgLoading(false);
      setRgLoading(false);
      loadUser(data);
      navigator("/", { replace: true });
    }
  });

  // check temporary google credentials in db
  useQuery("user/google-credential", () => {
    setLgLoading(true);
    setRgLoading(true);
    const credentialsExists = async () => {
      try {
        const { data } = await axios.get("/auth/credentials", {
          signal: controller.signal,
          method: "GET",
        });
        localStorage.setItem("token", data?.token);
        toastifyInfo(`Welcome ${data.name}!`);
        setLgLoading(false);
        setRgLoading(false);
        loadUser(data);
        navigator("/", { replace: true });
      } catch (error: any) {
        setLgLoading(false);
        setRgLoading(false);
        error.response?.data && toastifyError(error.response?.data);
      }
    };
    credentialsExists();
  });

  const handleLogin = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [name]: e.target.value });
  };

  const handleRegister =
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setUserRegister({ ...userRegister, [name]: e.target.value });
    };

  const { lg_email, lg_password } = userLogin;
  const { rg_name, rg_email, rg_password } = userRegister;

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLgLoading(true);
    try {
      const { data } = await axios.post("/user/login", userLogin);
      localStorage.setItem("token", data.token);
      toastifyInfo(`Welcome ${data.name}!`);
      setLgLoading(false);
      loadUser(data);
      navigator("/", { replace: true });
    } catch (error: any) {
      setLgLoading(false);
      toastifyError(error.response?.data);
    }
  };

  const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRgLoading(true);

    try {
      const { data } = await axios.post("/user/register", userRegister);
      setRgLoading(false);
      localStorage.setItem("token", data.token);
      toastifyInfo(`Welcome ${data.name}!`);
      loadUser(data);
      navigator("/", { replace: true });
    } catch (error: any) {
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
                  className={` a`}
                  label="Email"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input-email"
                  type="email"
                  required
                  onChange={handleLogin("lg_email")}
                  value={lg_email}
                />
                <TextField
                  className={` a`}
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
                  className={` a`}
                  label="Name"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  type="text"
                  required
                  onChange={handleRegister("rg_name")}
                  value={rg_name}
                />
                <TextField
                  className={` a`}
                  label="Email"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  type="email"
                  required
                  onChange={handleRegister("rg_email")}
                  value={rg_email}
                />
                <TextField
                  className={` a`}
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
    </div>
  );
}

export default Register;
