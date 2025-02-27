import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ProductForm from '@/components/ProductForm'

const page = () => {
  return (
    <>
    <Button asChild variant="outline">
        <Link href="/produk">Kembali</Link>
    </Button>

    <section className="flex flex-col w-full gap-4">
        <ProductForm
        type="create"
        
        />
    </section>

    </>
  )
}

export default page