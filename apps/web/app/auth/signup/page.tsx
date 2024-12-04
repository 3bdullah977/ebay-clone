import Link from "next/link";
import React from "react";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <div className="bg-white flex items-center w-full">
      <div className="bg-foreground w-1/2 min-h-screen flex flex-col justify-between p-12 text-white">
        <h3 className="text-3xl">Ubay</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellat nostrum tenetur maxime earum possimus placeat consequatur
          dolorum voluptate explicabo? Unde deleniti amet tempore alias nobis
          similique cupiditate sint error.
        </p>
      </div>
      <div className="bg-white w-1/2 flex justify-center">
        <div className="w-80">
          <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
          <SignupForm />
          <div className="flex justify-between text-sm">
            <p>Already have an account?</p>
            <Link className="underline" href={"/auth/signin"}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
