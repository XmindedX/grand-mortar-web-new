
import { columns, ITable } from '@/components/custom/table/columns-receipt'
import { DataTable } from '@/components/custom/table/data-table'
import { Button } from '@/components/ui/button'
import { FaFileExport } from "react-icons/fa6";
import { Plus } from 'lucide-react'
import Link from 'next/link'

import React from "react";

import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { db } from '@/database/drizzle'
import { receipts } from '@/database/schema'

const page = async () => {
  const receiptList = await db.select().from(receipts)

    const data: ITable[] = [
        ...receiptList.map((items) => ({
            id: items.id,
            receiptNumber: items.receiptNumber,
            customer: items.customer,
            nominal: items.nominal,
            createdAt: items.createdAt as Date,
          })),
    ]

  return (
    <>
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <span className="font-bold text-2xl font-sans text-black/90">Daftar Receipt</span>
      </div>
    </header>
    <div className="space-y-4 ml-3 mr-3">
            <div className="min-h-[calc(100vh_-_160px)] w-full ">
                <div className="flex items-center justify-between gap-4 overflow-x-auto rounded-t-lg bg-white px-5 py-[17px]">
                    <div className="flex items-center gap-2.5">
                        <div id="search-table"></div>
                    </div>
                        <div className="flex items-center gap-2.5">
                        <Link href="/" target="_blank">
                            <Button
                            variant={'default'}
                            size ={'sm'}
                            >
                                <FaFileExport />
                                Export
                            </Button>
                        </Link>
                    </div>
                </div>
                <DataTable columns={columns} data={data} filterField="customer"/>
            </div>
        </div>
    </>
  )
}

export default page