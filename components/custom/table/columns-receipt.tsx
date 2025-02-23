'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { MoveDown, MoveUp } from 'lucide-react'
import Image from 'next/image'

export type ITable = {
    id: string
    pembeli: {
        image: string
        name: string
    }
    sales_id: string
    category: string
    location: string
    date: string
    status: 'done' | 'pending' | 'cancelled'
}

export const columns: ColumnDef<ITable>[] = [
    {
        accessorKey: 'name',
        accessorFn: (row) => row.pembeli.name,
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
        cell: ({ row }) => {
            const image = row.original.pembeli

            return (
                <div className="flex items-center gap-2">
                    <div className="size-6 overflow-hidden">
                        <Image
                            src={image.image}
                            alt={image.name}
                            className="size-full object-cover"
                            width={24}
                            height={24}
                        />
                    </div>
                    <span>{image.name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'sales_id',
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
                {row.getValue('sales_id')}
            </Badge>
        ),
    },

    {
        accessorKey: 'category',
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
        cell: ({ row }) => <div>{row.getValue('category')}</div>,
    },
    {
        accessorKey: 'location',
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
        cell: ({ row }) => <div>{row.getValue('location')}</div>,
    },
    {
        accessorKey: 'date',
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
        cell: ({ row }) => <div>{row.getValue('date')}</div>,
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
                    row.getValue('status') === 'done'
                        ? 'green'
                        : row.getValue('status') === 'pending'
                          ? 'orange'
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
                <Button variant="default" className='w-full h-6'>
                    Buat Receipt
                </Button>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
]