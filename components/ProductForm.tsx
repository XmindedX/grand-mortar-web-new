"use client"

import React from 'react';
import { z } from "zod";
import {
  useForm,
  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FileUpload from "@/components/FileUpload";
import { Card, CardContent } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { productSchema } from '@/lib/validations';
import { createProduct } from '@/lib/actions/product';

interface Props extends Partial<Product> {
  type?: "create" | "update";
  price?: number;
  stock?: number;
}

const ProductForm = ({type,...product}: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title ?? "",
      price: product?.price ?? 0,
      image: product?.image ?? "",
      stock: product?.stock ?? 0,
    },
  });
  const onSubmit = async (value: z.infer<typeof productSchema>) => {
    const result = await createProduct(value);

    if (result.success) {
      toast({
        title: "Success",
        description: "Produk berhasil dibuat",
      });
      router.push("/produk");
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh_-_160px)] w-full items-center justify-center">
        <Card className="w-full max-w-[780px] rounded-lg p-4">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name={"title"}
                        render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='capitalize'>
                                Nama Produk
                            </FormLabel>
                            <FormControl>
                            <Input 
                            required 
                            placeholder="Nama Produk"
                            className=''
                            {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name={"price"}
                        render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='capitalize'>
                                Harga
                            </FormLabel>
                            <FormControl>
                            <Input 
                            required
                            type="number"
                            placeholder="Harga"
                            className=''
                            {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name={"stock"}
                        render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='capitalize'>
                                Stok
                            </FormLabel>
                            <FormControl>
                            <Input
                            required
                            type="number"
                            min={0}
                            placeholder="Stok"
                            className=''
                            {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name={"image"}
                        render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='capitalize'>
                                Foto Produk
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                type="image"
                                accept="image/*"
                                placeholder="Upload Foto Produk"
                                folder="products/images"
                                variant="light"
                                onFileChange={field.onChange}
                                value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                        />
                        <Button type="submit">Tambah Produk</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default ProductForm;