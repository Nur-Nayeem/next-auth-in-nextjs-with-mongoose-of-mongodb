"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(name, email, password);
    setLoading(true);
    axios
      .post("/api/auth/register", {
        name,
        email,
        password,
      })
      .then(() => {
        setLoading(false);
        e.currentTarget.reset();
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <div className="mx-auto bg-white p-10 space-y-3.5 rounded-lg">
        <h3 className="text-center text-3xl font-semibold">Register</h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary">
            Login Now
          </Link>
        </p>
        <div>
          <form
            onSubmit={handleCreateAccount}
            className="flex flex-col max-w-md sm:w-md gap-6"
          >
            <div className="flex flex-col space-y-1.5 ">
              <label>Name</label>
              <input
                className="bg-base-200 p-2.5 rounded-lg 
              outline-2 outline-gray-200 focus:outline-primary"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <label>Email</label>
              <input
                className="bg-base-200 p-2.5 rounded-lg 
              outline-2 outline-gray-200 focus:outline-primary"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <label>Password</label>
              <input
                className="bg-base-200 p-2.5 rounded-lg outline-2 outline-gray-200 focus:outline-primary"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <button className="btn bg-primary text-base-100 rounded-lg text-lg h-12">
              {loading ? "loading..." : "Register"}
            </button>
          </form>
          <div className="flex items-center justify-between my-5">
            <hr className="text-gray-300 w-[45%]" />
            <span>OR</span>
            <hr className="text-gray-300 w-[45%]" />
          </div>

          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
            className="btn bg-white text-black border-[#e5e5e5] w-full rounded-lg h-12 text-lg"
          >
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
