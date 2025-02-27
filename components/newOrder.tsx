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

import { orderItemsSchema, orderSchema } from "@/lib/validations"
import { cartsSchema } from "@/lib/validations"
import { getCartItems } from "@/lib/actions/cart";
import { createOrder } from "@/lib/actions/order";

import CartItem from "@/components/cartItem";
import  AddToCart  from '@/components/addToCart'

import axios from "axios";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type FormValues = {
    userId: string;
    customer: string;
    number: number;
    email: string;
    address: string;
    city: string;
    province: string;
    postalCode: number;
    status: string;
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
  type OrderData = z.infer<typeof orderSchema>;
  type ItemsData = z.infer<typeof orderItemsSchema>;

export default function NewOrder() {

    const userId = useSession().data?.user?.id as string;
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [customer, setCostumer] = useState<string | null>(null);
    const [number, setNumber] = useState<number | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const [province, setProvince] = useState<string | null>(null);
    const [postalCode, setPostalCode] = useState<number | null>(null);
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

        const interval = setInterval(fetchCart, 5000);
        return () => clearInterval(interval);

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
            userId: userId,
            customer: "",
            number: 0,
            email: "",
            address: "",
            city: "",
            province: "",
            postalCode: 0,
        },
      });

      const onSubmit = async () => {
        const orderData: OrderData = {
          userId: userId,
          customer: customer as string,
          number: number as number,
          email: email as string,
          address: address as string,
          city: city as string,
          province: province as string,
          postalCode: postalCode as number,
        };
    
        const itemsData = cartItems.map((item) => ({
          orderId: orderId,
          productId: item.productId,
          quantity: item.quantity
        }))
        const response = await createOrder(orderData as any, itemsData as any);

        redirect("/daftar-pesanan")
      }
        
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
                                    onChange={(e) => setCostumer(e.target.value)}
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
                                        onChange={(e) => setNumber(parseInt(e.target.value))}
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
                                        onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-3 sm:gap-3">
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Kota
                                    </label>
                                    <Input
                                    type="text"
                                    onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Provinsi
                                    </label>
                                    <Input
                                    type="text"
                                    onChange={(e) => setProvince(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Kode Pos
                                    </label>
                                    <Input
                                    type="number"
                                    onChange={(e) => setPostalCode(parseInt(e.target.value))}
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
                                    onClick={form.handleSubmit(onSubmit)}
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