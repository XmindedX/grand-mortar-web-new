"use client"

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { z } from "zod";

import React from "react";
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { cartsSchema } from "@/lib/validations"
import { getCartItems } from "@/lib/actions/cart";

import CartItem from "@/components/cartItem";
import  AddToCart  from '@/components/addToCart'

import axios from "axios";

import { useSession } from "next-auth/react";

type FormValues = {
    customer: string;
    number: string;
    email: string;
    alamat: string;
    productList: {
      value: string;
      label: string;
      quantity: number;
    }[];
  };

  type CartItem = {
    id: number;
    cartId: string;
    productId: number;
    quantity: number;
    productImage: string;
    productName: string;
    productPrice: number;
  };

  type CartData = z.infer<typeof cartsSchema>;

export default function NewOrder() {

    const userId = useSession().data?.user?.id as string;
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
          setIsLoading(true);
          setError(null);
    
          const items = await getCartItems(userId);
    
          if (items.length === 0) {
            setError('Your cart is empty');
          } else {
            setCartItems(items as any);
          }
    
          setIsLoading(false);
        };
    
        fetchCart();
      }, [userId]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get("/api/all-products");
        setProducts(response.data);
    };

    const form = useForm<FormValues>({
        defaultValues: {
            customer: "",
            number: "",
            email: "",
            productList: [{
                value: "",
                label: "",
                quantity: 0,
            }],
        },
      });
      
    
    // console.log(cart, "Cart");
    console.log(cartItems, "CartItems");
        
    return (
        <>

        <div className="space-y-4">
            <div className="flex min-h-[calc(100vh_-_160px)] w-full items-center justify-center">
                <Card className="w-full max-w-[780px] rounded-lg p-4">
                    <CardContent>
                        <form className="space-y-5">
                            <div className="space-y-2.5">
                                <label className="block font-semibold leading-tight text-black">
                                    Nama Pembeli
                                </label>
                                <Input
                                    type="text"
                                />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2 sm:gap-3">
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Nomor Telepon
                                    </label>
                                    <div className="w-full">
                                    <Input
                                        type="number"
                                        placeholder=""
                                        className={`rounded-l-none`}
                                    />
                                    </div>
                                    
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                <label className="block font-semibold leading-tight text-black">
                                    Alamat
                                </label>
                                <Textarea
                                    rows={3}
                                    placeholder=""
                                />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-3 sm:gap-3">
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Kota
                                    </label>
                                    <Input
                                    type="text"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Provinsi
                                    </label>
                                    <Input
                                    type="text"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Kode Pos
                                    </label>
                                    <Input
                                    type="number"
                                    />
                                </div>
                            </div>
                            <DropdownMenuSeparator className="mx-0" />

                            <CartItem cart={cartItems} />
                            
                            <div className="space-y-2.5">
                                <AddToCart products={products} userId={userId} />
                            </div>
                            
                            <div className="flex items-center justify-between gap-4">
                                <Button
                                    variant={'outline-general'}
                                    size={'large'}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant={'default'}
                                    size={'large'}
                                >
                                    Buat Order
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
        </>
    )
}