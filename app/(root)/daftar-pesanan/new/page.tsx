import React from 'react'
// import OrderForm from '@/components/OrderForm'
import NewOrder from '@/components/newOrder'
import { Separator } from '@/components/ui/separator'
import {
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { db } from '@/database/drizzle'
import { products } from '@/database/schema'
import { ITable } from '@/components/custom/table/columns-produk'
import { productData } from '@/components/addToCart'

const page = async () => {
    const Produk = await db.select().from(products)

    const data: productData[] = [
        ...Produk.map((items) => ({
            id: items.id,
            title: items.title,
            price: items.price,
            stock: items.stock,
            image: items.image,
            // Add other properties as needed
          })),
    ]
    
        // const data: ITable[] = [
        //     ...Produk.map((items) => ({
        //         id: items.id,
        //         title: items.title,
        //         price: items.price,
        //         stock: items.stock,
        //         image: items.image,
        //         // Add other properties as needed
        //       })),
        // ]


  return (
    <>
    <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="font-bold text-2xl font-sans text-black/90">Buat Order</span>
        </div>
    </header>

    <section className="flex flex-col w-full gap-4">
        
        <NewOrder />
    </section>

    </>
  )
}

export default page