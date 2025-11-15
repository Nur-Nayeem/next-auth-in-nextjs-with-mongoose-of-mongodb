"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    console.log("signIn result:", result);

    if (result?.error) {
      console.log("Login failed");
      return;
    }

    // ⭐ Fix for production: wait for session cookie to apply
    setTimeout(() => {
      router.push(result?.url || "/");
    }, 200);
  };

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <div className="mx-auto bg-white p-10 space-y-3.5">
        <h3 className="text-center text-3xl font-semibold rounded-lg">Login</h3>
        <p className="text-center">
          Dont have an account?{" "}
          <Link href={"/register"} className="text-primary">
            Register Now
          </Link>
        </p>

        <form onSubmit={handleLoginAccount} className="space-y-6">
          <div>
            <label>Email</label>
            <input
              className="bg-base-200 p-2.5 rounded-lg"
              type="email"
              name="email"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              className="bg-base-200 p-2.5 rounded-lg"
              type="password"
              name="password"
              required
            />
          </div>

          <button className="btn bg-primary text-base-100 rounded-lg h-12 w-full">
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center justify-between my-5">
          <hr className="w-[45%]" />
          <span>OR</span>
          <hr className="w-[45%]" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="btn bg-white border w-full rounded-lg h-12 text-lg"
        >
          Login with Google
        </button>
      </div>
    </section>
  );
};

export default Login;
