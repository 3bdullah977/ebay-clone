"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Input } from "@/components/ui/input";
import { LoginDto } from "@ebay-clone/nestjs-libs/dtos";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { signin } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function SigninForm() {
  const router = useRouter();
  const resolver = useMemo(() => {
    return classValidatorResolver(LoginDto);
  }, []);

  const form = useForm<LoginDto>({
    resolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginDto) {
    const res = await signin(data);
    if (res === "success") router.push("/");
    else form.setError("root", { message: "Invalid credentials" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="text-red-500 text-sm">
          {form.formState.errors.root?.message}
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>Sign In</SubmitButton>
      </form>
    </Form>
  );
}
