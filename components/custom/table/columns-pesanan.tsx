'use client'
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { MoveDown, MoveUp } from 'lucide-react'

export type ITable = {
    id: string;
    trxId: string;
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
        accessorKey: 'trxId',
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
                    {row.getValue('trxId')}
                </Badge>
            </div>
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
                    Total Harga
                </button>
            )
        },
        cell: ({ row }) =>
        <div className='flex items-start w-28'>
            Rp. {(row.getValue('total') as number).toLocaleString('id-ID')}
        </div>,
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
                    Piutang
                </button>
            )
        },
        cell: ({ row }) =>
        <div className='flex items-start w-28'>
            Rp. {(row.getValue('piutang') as number).toLocaleString('id-ID')}
        </div>,
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
                    Tanggal Pemesanan
                </button>
            )
        },
        cell: ({ row }) =>
            
        <div className='flex items-start w-24'>
            {new Date(row.original.createdAt).toLocaleDateString('id-ID')}
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
                        row.getValue('status') === 'Lunas'
                            ? 'green'
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
        header: () => <span>Action</span>,
        cell: ({ row }) => {
            const [open, setOpen] = useState(false);
    
            return (
                <>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="default" className="w-full h-6">Lihat Detail</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Detail Pesanan</DialogTitle>
                            </DialogHeader>
                            <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <tbody>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">ID Transaksi</td>
                                        <td className="p-2 border border-gray-300">{row.original.trxId}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">Pembeli</td>
                                        <td className="p-2 border border-gray-300">{row.original.customer}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">No. HP</td>
                                        <td className="p-2 border border-gray-300">{row.original.number}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">Email</td>
                                        <td className="p-2 border border-gray-300">{row.original.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">Alamat</td>
                                        <td className="p-2 border border-gray-300">
                                            {row.original.address}, {row.original.city}, {row.original.province}, {row.original.postalCode}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">Total</td>
                                        <td className="p-2 border border-gray-300">Rp. {row.original.total.toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">Piutang</td>
                                        <td className="p-2 border border-gray-300">Rp. {row.original.piutang.toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">Status</td>
                                        <td className="p-2 border border-gray-300">
                                            <span className={`px-2 py-1 rounded text-white ${
                                                row.original.status === 'Lunas' ? 'bg-green-500' : 'bg-red-500'
                                            }`}>
                                                {row.original.status}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border border-gray-300 font-semibold">Tanggal Pemesanan</td>
                                        <td className="p-2 border border-gray-300">
                                            {new Date(row.original.createdAt).toLocaleDateString('id-ID')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
]