import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../CSS/click.css";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const handleRedirectTOSigup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("dashboard");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);
  return (
    <div>
      <div id="login-form-wrap">
        <h2>Login</h2>
        <form id="login-form">
          <p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </p>
          <p>
            <input
              type="password"
              id="password"
              name="username"
              placeholder="Password"
              required
              onChange={(e) => setPass(e.target.value)}
              value={password}
            />
          </p>

          <p>
            <input
              type="button"
              id="login"
              value="Login"
              onClick={handleLogin}
            />
          </p>
        </form>
        <div id="create-account-wrap">
          <p>
            Not a member?{" "}
            <label className="createlbl" onClick={handleRedirectTOSigup}>
              Create Account
            </label>
          </p>
        </div>
      </div>
    </div>
  );
}
