import cx from "classnames";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default Signin;

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
      } else {
        router.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div id="login-page">
        <div class="login">
          <h2 class="login-title">Login</h2>
          <p class="notice">Please login to access the system</p>
          <form class="form-login" onSubmit={submit}>
            <label for="email">E-mail</label>
            <div class="input-email">
              <i class="fas fa-envelope icon"></i>
              <input
                type="email"
                name="email"
                placeholder="Enter your e-mail"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label for="password">Password</label>
            <div class="input-password">
              <i class="fas fa-lock icon"></i>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="checkbox">
              <label for="remember">
                <input type="checkbox" name="remember" />
                Remember me
              </label>
            </div>
            <button type="submit">
              <i class="fas fa-door-open"></i> Login
            </button>
          </form>
          <a href="#">Forgot your password?</a>
          <div class="created"></div>
        </div>
        <div class="background">
          <h1>
            Donec in dapibus augue sed nisi nunc suscipit eget enim sit amet
          </h1>
        </div>
      </div>
    </>
  );
}
