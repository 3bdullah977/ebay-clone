import Link from "next/link";
import React from "react";
import { SigninForm } from "./signin-form";

export default function SignupPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <SigninForm />
      <div className="flex justify-between text-sm">
        <p>Don't have an account?</p>
        <Link className="underline" href={"/auth/signup"}>
          Sign Un
        </Link>
      </div>
    </div>
  );
}
