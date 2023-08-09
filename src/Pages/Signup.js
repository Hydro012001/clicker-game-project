import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Services/firebaseConfig";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user) {
          const user = res.user;
          updateProfile(user, {
            displayName: name,
          });
          navigate("/");
        } else {
          alert("Error found");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleRedirectToLogin = () => {
    navigate("/");
  };
  return (
    <div>
      <div id="login-form-wrap">
        <h2>Signup</h2>
        <form id="login-form">
          <p>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </p>
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
              value="Signup"
              onClick={handleCreateAccount}
            />
          </p>
        </form>
        <div id="create-account-wrap">
          <p>
            Already a member?{" "}
            <label className="createlbl" onClick={handleRedirectToLogin}>
              Login
            </label>
          </p>
        </div>
      </div>
    </div>
  );
}
