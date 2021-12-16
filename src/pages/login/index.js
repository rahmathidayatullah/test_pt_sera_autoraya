import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../features/authentication/actions";
export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {
    navigate("/home");
    reset();
  };

  useEffect(() => {
    if (auth.statusLogin === "error") {
      alert("password atau email salah");
    }
    if (localStorage.getItem("token")) {
      navigate("/product");
    }
  }, [auth.statusLogin]);
  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-sm  font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "email not correct",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "email not valid",
                    },
                  })}
                  onChange={handleChange}
                  value={form.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.email && (
                  <p className="mt-2 text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "password not correct",
                  })}
                  onChange={handleChange}
                  value={form.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="password"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.password && (
                  <p className="mt-2 text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
