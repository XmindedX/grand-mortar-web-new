import React from 'react'

import ProductForm from '@/components/ProductForm'

import { db } from '@/database/drizzle'
import { products } from '@/database/schema'
import { eq } from 'drizzle-orm'

const page = async({
    params,
  }: {
    params: { id: string }
  }) => {
    const product = await db
    .select()
    .from(products)
    .where(eq(products.id, (params.id)))
    .then((res) => res[0])

    console.log(product, "product");
  return (
    <>
    <section className="flex flex-col w-full gap-4">
        <ProductForm
        type="update"
        price={product?.price ?? 0}
        stock={product?.stock ?? 0}
        id={product?.id ?? ""}
        title={product?.title ?? ""}
        image={product?.image ?? ""}
        />
    </section>

    </>
  )
}

export default page