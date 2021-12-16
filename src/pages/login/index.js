import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../features/authentication/actions";
import ErrorField from "../../components/atoms/error";
import Label from "../../components/atoms/label";
import Button from "../../components/atoms/button";
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
      <h1 className="p-6 text-2xl font-semibold">
        Email dan password bebas karena api login dan register tidak bisa
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <Label>Email</Label>
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
                  className="input-field"
                />
                {errors.email && (
                  <ErrorField>{errors.email.message}</ErrorField>
                )}
              </div>

              <div className="col-span-6">
                <Label>Password</Label>
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
                  className="input-field"
                />

                {errors.password && (
                  <ErrorField>{errors.password.message}</ErrorField>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button type="submit" className="btn">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
