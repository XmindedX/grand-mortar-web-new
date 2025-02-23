'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { ColumnDef } from '@tanstack/react-table'
import { MoveDown, MoveUp } from 'lucide-react'

import router from 'next/router'


export type ITable = {
    id: string;
    customer: string;
    number: string;
    email: string;
    address: string;
    city: string;
    province: string;
    postalCode: number;
    status: string;
    total: number;
    piutang: number;
    createdAt: Date;
}

export const columns: ColumnDef<ITable>[] = [
    {
        accessorKey: 'customer',
        accessorFn: (row) => row.customer,
        header: ({ column }) => {
            return (
                <button
                    type="button"
                    className="flex items-center gap-1.5"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="inline-flex items-center -space-x-[5px]">
                        <MoveDown
                            className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`}
                        />
                        <MoveUp
                            className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`}
                        />
                    </span>
                    Pembeli
                </button>
            )
        },
    },
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <button
                    type="button"
                    className="flex items-center gap-1.5"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="inline-flex items-center -space-x-[5px]">
                        <MoveDown
                            className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`}
                        />
                        <MoveUp
                            className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`}
                        />
                    </span>
                    ID
                </button>
            )
        },
        cell: ({ row }) => (
            <Badge className="bg-gray-400 text-black">
                {row.getValue('total')}
            </Badge>
        ),
    },

    {
        accessorKey: 'total',
        header: ({ column }) => {
            return (
                <button
                    type="button"
                    className="flex items-center gap-1.5"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="inline-flex items-center -space-x-[5px]">
                        <MoveDown
                            className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`}
                        />
                        <MoveUp
                            className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`}
                        />
                    </span>
                    Category
                </button>
            )
        },
        cell: ({ row }) => <div>{row.getValue('total')}</div>,
    },
    {
        accessorKey: 'piutang',
        header: ({ column }) => {
            return (
                <button
                    type="button"
                    className="flex items-center gap-1.5"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="inline-flex items-center -space-x-[5px]">
                        <MoveDown
                            className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`}
                        />
                        <MoveUp
                            className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`}
                        />
                    </span>
                    Location
                </button>
            )
        },
        cell: ({ row }) => <div>{row.getValue('piutang')}</div>,
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <button
                    type="button"
                    className="flex items-center gap-1.5"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="inline-flex items-center -space-x-[5px]">
                        <MoveDown
                            className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`}
                        />
                        <MoveUp
                            className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`}
                        />
                    </span>
                    Date
                </button>
            )
        },
        cell: ({ row }) => 
        <div>
            {new Date(row.original.createdAt).toLocaleDateString()}
        </div>,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <button
                    type="button"
                    className="flex items-center gap-1.5"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="inline-flex items-center -space-x-[5px]">
                        <MoveDown
                            className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`}
                        />
                        <MoveUp
                            className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`}
                        />
                    </span>
                    Status
                </button>
            )
        },
        cell: ({ row }) => (
            <Badge
                variant={
                    row.getValue('status') === 'Lunas'
                        ? 'green'
                        : 'red'
                }
                className="capitalize w-full"
            >
                {row.getValue('status')}
            </Badge>
        ),
    },
    {
        id: 'select',
        header: ({ table }) => (
            <span>Action</span>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2 w-full">
                <Button variant="default" className='w-full h-6'>
                    Lihat Detail
                </Button>
                <Button variant="default" className='w-full h-6' onClick={() => {router.push(`/invoice/${row.original.id}`)}}>
                    Buat Receipt
                </Button>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
]
