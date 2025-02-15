import React from 'react'

import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

type isiCart = {
    id: number;
    cartId: string;
    productId: number;
    quantity: number;
    productImage: string;
    productName: string;
    productPrice: number;
  };

type cartProps = {
    cart: isiCart[]
}

const CartItem = ({cart}: cartProps) => {

  return (
    <>
    {cart.map((item) => (
      <div key={item.id} className="flex items-center justify-between w-full">
        <div className="flex items-center">
            <IKImage
                path={item.productImage}
                urlEndpoint={config.env.imagekit.urlEndpoint}
                alt="image"
                quality={100}
                className="size-full object-cover w-10 h-10"
                width={100}
                height={100}
            />
          <div>
            <h3 className="text-lg font-semibold">{item.productName}</h3>
            <p className="text-gray-600 mr-4">Jumlah: {item.quantity}</p>
            
          </div>
        </div>
        <div className="flex items-center">
            <p className="text-gray-600">Rp. {(item.productPrice).toLocaleString('id-ID')}</p>
        </div>
      </div>
    ))}
    <DropdownMenuSeparator className="mx-0" />
    <div className='flex items-center justify-end'>
      <p className="text-gray-600">Total Harga: Rp. {cart.reduce((total, item) => total + item.productPrice * item.quantity, 0).toLocaleString('id-ID')}</p>
    </div>
    </>
  )
}

export default CartItem