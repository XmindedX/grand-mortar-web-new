'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { MoveDown, MoveUp } from 'lucide-react'

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
                <div className="flex items-start w-28">
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
            <div className='flex items-start w-12'>
                <Badge className="bg-gray-400 text-black">
                    {row.getValue('sales_id')}
                </Badge>
            </div>
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
                    Total Harga
                </button>
            )
        },
        cell: ({ row }) =>
        <div className='flex items-start w-28'>
            {row.getValue('category')}
        </div>,
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
                    Kurang Bayar
                </button>
            )
        },
        cell: ({ row }) =>
        <div className='flex items-start w-28'>
            {row.getValue('location')}
        </div>,
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
                    Tanggal Pemesanan
                </button>
            )
        },
        cell: ({ row }) =>
        <div className='flex items-start w-24'>
            {row.getValue('date')}
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
            <div className='flex items-start w-28'>
                <Badge
                    variant={
                        row.getValue('status') === 'done'
                            ? 'green'
                            : row.getValue('status') === 'pending'
                            ? 'orange'
                            : 'red'
                    }
                    className="capitalize w-full text-center justify-center"
                >
                    {row.getValue('status')}
                </Badge>
            </div>
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
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
]