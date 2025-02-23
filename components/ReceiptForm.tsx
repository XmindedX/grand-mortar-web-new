// src/components/receipts/ReceiptForm.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createReceipt } from '@/lib/actions/receipt'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { receiptSchema } from '@/lib/validations'

// const receiptSchema = z.object({
//   userId: z.string().min(1),
//   customer: z.string().min(1),
//   orderId: z.string().min(1),
//   nominal: z.number().min(1),
// })

// type ReceiptData = z.infer<typeof receiptSchema>

// function ReceiptForm({
//   userId,
//   orderId,
//   customer,

// }: {
//   userId: string
//   orderId: string
//   customer: string
// }) {
//   const [nominal, setNominal] = useState(0)
//   const router = useRouter()
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<z.infer<typeof receiptSchema>>({
//     resolver: zodResolver(receiptSchema),
//   })



//   const onSubmit = handleSubmit(async () => {
//     console.log("dipencet")
//     const receiptData: ReceiptData = {
//       userId: userId as string,
//       orderId: orderId as string,
//       customer: customer as string,
//       nominal: nominal,
//     }
//     const result = await createReceipt(receiptData)
//     if (result.success) {
//       window.location.href = '/receipt';
//     } else {
//       console.log("gagal")
//     }
//     console.log("dipencet")
//   })
//   return (
    // <form className="space-y-4">

    //   <div>
    //     <Label htmlFor="nominal">Total Pembayaran</Label>
    //     <Input 
    //       type = "number"
    //       placeholder=""
    //       required
    //       onChange={(e) => setNominal(parseInt(e.target.value))}
    //     />
    //   </div>
    //   <Button className="w-full" disabled={isSubmitting} onClick={() => console.log(nominal)}>
    //     {isSubmitting ? 'Menyimpan...' : 'Buat Receipt'}
    //   </Button>
    // </form>
//   )
// }

// export default ReceiptForm

type FormValue = {
  userId: string
  orderId: string
  customer: string
  nominal: number
}

type ReceiptFormProps = {
  userId: string
  orderId: string
  customer: string
}

type ReceiptData = z.infer<typeof receiptSchema>

export default function ReceiptForm({ userId, customer, orderId }: ReceiptFormProps) {
  const router = useRouter()
  const [nominal, setNominal] = useState(0)

  const form = useForm<FormValue>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      userId: userId as string,
      orderId: orderId as string,
      customer: customer as string,
      nominal: 0,
    },
  })

  const onSubmit = async () => {
    const receiptData: ReceiptData = {
      userId: userId as string,
      orderId: orderId as string,
      customer: customer as string,
      nominal: nominal,
    };
    try {
    const response = await createReceipt(receiptData as any)
    redirect('/receipt')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className="space-y-4">
        <div>
          <Label htmlFor="nominal">Total Pembayaran
          </Label>
          <Input 
            type = "number"
            placeholder=""
            required
            onChange={(e) => setNominal(parseInt(e.target.value))}
          />
        </div>
          <Button 
          type="submit" 
          className="w-full" 
          onClick={onSubmit}>
           Buat Receipt
          </Button>
        </form>
    </div>
  )
}
