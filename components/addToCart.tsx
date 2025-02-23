"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Combobox } from "./ui/combobox"
import { CirclePlus } from "lucide-react"
import { useState } from "react"

import { z } from "zod"

import { cartItemsSchema, cartsSchema } from "@/lib/validations"
import { createCart } from "@/lib/actions/cart"
import { toast } from "@/hooks/use-toast"

interface AddToCartProps {
  products: Product[];
  userId: string;
}

type CartData = z.infer<typeof cartsSchema>;
type CartItems = z.infer<typeof cartItemsSchema>;

export default function AddToCart({products, userId}: AddToCartProps)  {
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartId, setCartId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productList, setProductList] = useState([]);

  const handleAddToCart = async () => {
    if (!selectedProductId) {
      setError('Please select a product');
      return;
    }

    const cartData: CartData = {
      userId: userId,
    };

    const cartItem: CartItems = {
      cartId: cartId as any,
      productId: selectedProductId,
      quantity: quantity
    }

    // Validasi data menggunakan Zod
    const validationResult = cartsSchema.safeParse(cartData);
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    try {
      
      await createCart(cartData as any, cartItem as any);

      toast({
        title: "Menambahkan produk",
        description: "Produk berhasil ditambahkan",
        variant: "default",
      });
      setError(null); // Reset error

    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
    }

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
        <CirclePlus color = "black"/>
            Tambah Produk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah produk</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Produk
            </Label>
            
            <Combobox products={products}
        onSelectProduct={(productId) => setSelectedProductId(productId)} />
            
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Jumlah
            </Label>
            <Input
              type="number"
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full"
              placeholder=""
            />
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick = {handleAddToCart} disabled={loading || !selectedProductId}>
          {loading ? "Menambahkan..." : "Tambah Produk"}
          </Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}