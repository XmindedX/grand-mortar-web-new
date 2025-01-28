"use client"

import React from 'react';
import Link from "next/link"
import { z, ZodType } from "zod";
import {
  FieldValues,
  SubmitHandler,
  DefaultValues,
  useForm,
  UseFormReturn, 
  Path} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FIELD_NAMES, FIELD_TYPES } from "@/constants";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { is } from 'drizzle-orm';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  type: "SIGN_IN" | "SIGN_UP";
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
}

const AuthForm = <T extends FieldValues> ({
  type,
  schema,
  defaultValues,
  onSubmit
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn 
        ? "Login Berhasil" 
        : "Register Berhasil",
        variant: "default",
      });
      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "Login" : "Register"}`,
        description: result.error ?? "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <p className="text-2xl font-bold font-sans text-center -mt-3">
        {isSignIn ? "Login" : "Buat akun"}
      </p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 w-full">

      {Object.keys(defaultValues).map((field) => (
        <FormField
        key={field}
        control={form.control}
        name={field as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
            <FormControl>
              <Input 
              type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} 
              placeholder={
                FIELD_NAMES[field.name as keyof typeof FIELD_NAMES] === "Email" 
                ? "example@gmail.com" 
                : FIELD_NAMES[field.name as keyof typeof FIELD_NAMES] === "Password"
                ? "********"
                : "Masukkan" + " " + FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]
              }
              className=''
              {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      ))}
        <Button type="submit" className='w-full'>
          {isSignIn ? "Masuk" : "Daftar"}
        </Button>
      </form>
    </Form>
    <p className="text-slate-500 text-md font-sans text-center -mt-3">
      {isSignIn ? "Belum punya akun? " : "Sudah punya akun? "}
      <Link href={isSignIn ? "/sign-up" : "/login"} className="text-blue-600 font-bold">{isSignIn ? "Daftar disini" : "Login disini"}</Link>
    </p>
    </div>
  )
}

export default AuthForm