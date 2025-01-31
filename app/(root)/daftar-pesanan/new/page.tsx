import React from 'react'
import OrderForm from '@/components/OrderForm'
import { Separator } from '@/components/ui/separator'
import {
    SidebarTrigger,
} from '@/components/ui/sidebar'

const page = () => {
    
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
        <OrderForm
        
        />
    </section>

    </>
  )
}

export default page