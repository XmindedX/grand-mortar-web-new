'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { MoveDown, MoveUp } from 'lucide-react';

export type ITable = {
    id: string;
    customer: string;
    receiptNumber: string;
    nominal: number;
    createdAt: Date;
};

export const columns: ColumnDef<ITable>[] = [
    {
        accessorKey: 'customer',
        accessorFn: (row) => row.customer,
        header: ({ column }) => (
            <button
                type="button"
                className="flex items-center gap-1.5"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                <span className="inline-flex items-center -space-x-[5px]">
                    <MoveDown className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`} />
                    <MoveUp className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`} />
                </span>
                Pembeli
            </button>
        ),
    },
    {
        accessorKey: 'receiptNumber',
        header: ({ column }) => (
            <button
                type="button"
                className="flex items-center gap-1.5"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                <span className="inline-flex items-center -space-x-[5px]">
                    <MoveDown className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`} />
                    <MoveUp className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`} />
                </span>
                ID
            </button>
        ),
        cell: ({ row }) => <Badge className="bg-gray-400 text-black">{row.getValue('receiptNumber')}</Badge>,
    },
    {
        accessorKey: 'nominal',
        header: ({ column }) => (
            <button
                type="button"
                className="flex items-center gap-1.5"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                <span className="inline-flex items-center -space-x-[5px]">
                    <MoveDown className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`} />
                    <MoveUp className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`} />
                </span>
                Total Pembayaran
            </button>
        ),
        cell: ({ row }) => (
            <div>
                Rp. {(row.getValue('nominal') as number | undefined)?.toLocaleString('id-ID') || '0'}
            </div>
        ),        
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <button
                type="button"
                className="flex items-center gap-1.5"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                <span className="inline-flex items-center -space-x-[5px]">
                    <MoveDown className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`} />
                    <MoveUp className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`} />
                </span>
                Tanggal Pembayaran
            </button>
        ),
        cell: ({ row }) => <div>{new Date(row.original.createdAt).toLocaleDateString('id-ID')}</div>,
    },
    {
        id: 'select',
        header: 'Action',
        cell: ({ row }) => {
            const [open, setOpen] = useState(false);
            return (
                <>
                    <div className="flex gap-2 w-full">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant="default" className="h-6 flex-1">
                                    Lihat Detail
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Detail Transaksi</DialogTitle>
                                </DialogHeader>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <tbody>
                                            <tr>
                                                <td className="p-2 border font-semibold">ID Transaksi</td>
                                                <td className="p-2 border">{row.original.receiptNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 border font-semibold">Pembeli</td>
                                                <td className="p-2 border">{row.original.customer}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 border font-semibold">Total Pembayaran</td>
                                                <td className="p-2 border">Rp. {row.original.nominal.toLocaleString("id-ID")}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 border font-semibold">Tanggal Pembayaran</td>
                                                <td className="p-2 border">{new Date(row.original.createdAt).toLocaleDateString("id-ID")}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
];
