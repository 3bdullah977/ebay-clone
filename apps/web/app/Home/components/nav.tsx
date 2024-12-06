"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SearchProductsDto } from "@ebay-clone/nestjs-libs/dtos";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SearchForm() {
  const router = useRouter();
  const resolver = useMemo(() => {
    return classValidatorResolver(SearchProductsDto);
  }, []);

  const form = useForm<SearchProductsDto>({
    resolver,
    defaultValues: { query: "" },
  });

  async function onSubmit(data: SearchProductsDto) {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-[50%]">
                    <Search className="absolute left-2 top-[10px]" size={20} />
                    <Input
                      placeholder="Search for anything"
                      className="pl-10 py-5"
                      {...field}
                    />
                  </div>
                  {/* <div> */}
                  <Button
                    variant="outline"
                    className="bg-primary text-white py-5 px-14">
                    Search
                  </Button>
                  {/* </div> */}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default function Nav() {
  return (
    <>
      <nav className="flex items-center min-h-[10vh] justify-between">
        <div className="text-4xl font-semibold">
          <h1>
            <span className="text-red-600">U</span>
            <span className="text-blue-600">b</span>
            <span className="text-yellow-400">a</span>
            <span className="text-green-500">y</span>
          </h1>
        </div>
        <div className="flex-1">
          <SearchForm />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href={"/Home"}
                  className="flex items-center gap-1 cursor-pointer">
                  <UserIcon size={20} />
                  <p className="font-semibold">Profile</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-1 text-red-600 hover:text-red-500 cursor-pointer">
                <LogOut size={20} />
                <p className="font-semibold">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}
