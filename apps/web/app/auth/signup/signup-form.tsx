"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Input } from "@/components/ui/input";
import { CreateUserDto } from "@ebay-clone/nestjs-libs/dtos";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Inputs = CreateUserDto;

export function SignupForm() {
  const router = useRouter();
  const resolver = useMemo(() => {
    return classValidatorResolver(CreateUserDto);
  }, []);

  const form = useForm<Inputs>({
    resolver,
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "buyer",
    },
  });

  async function onSubmit(data: Inputs) {
    const res = await signup(data);
    if (res) {
      if ("error" in res) {
        form.setError("root", { message: res.error });
      } else router.push("/auth/signin");
    } else {
      form.setError("root", { message: "Unknown error" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="text-red-500 text-sm">
          {form.formState.errors.root?.message}
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>Sign Up</SubmitButton>
      </form>
    </Form>
  );
}
