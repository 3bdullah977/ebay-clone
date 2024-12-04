import Link from "next/link";
import React from "react";
import { SigninForm } from "./signin-form";

export default function SignupPage() {
  return (
    <div className="bg-white p-6 rounded-lg border border-1 shadow-sm w-96 flex flex-col justify-center items-center ">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-1">Login</h1>
        <p className="text-sm mb-4 text-gray-700">
          Enter your email below to login to your account
        </p>
        <SigninForm />
        <div className="flex justify-between text-sm mt-3">
          <p>Don't have an account?</p>
          <Link className="underline" href={"/auth/signup"}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
