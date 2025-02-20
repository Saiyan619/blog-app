import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../utils/Context";
import Nav from "../../globalComponents/Nav";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, register, fetchUserData, isAuthenticated, user, logout } = useAuth();

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleEmailLogin = (e) => {
    setLoginData({ ...loginData, email: e.target.value });
  };
  const handlePasswordLogin = (e) => {
    setLoginData({ ...loginData, password: e.target.value });
  };
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        console.log("Login successful!");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Login submitted:", loginData);
    navigate("/");
  };

  return (
    <div>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* <div className="rounded-md shadow-sm -space-y-px"> */}

            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>

              <div>
                <fieldset className="fieldset">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={loginData.email}
                    onChange={handleEmailLogin}
                    placeholder="mail@site.com"
                    className="input"
                  />
                  <p className="fieldset-label">Enter a valid Email</p>
                </fieldset>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <div>
                <fieldset className="fieldset">
                  <input
                    id="password"
                    className="input"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handlePasswordLogin}
                    placeholder="Password"
                  />
                  <p className="fieldset-label">Login you password</p>
                </fieldset>
              </div>
            </div>
            {/* </div> */}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary w-full"
                >
                  login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
