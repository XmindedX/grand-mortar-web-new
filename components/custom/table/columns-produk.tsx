'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { MoveDown, MoveUp } from 'lucide-react'
import { IKImage } from "imagekitio-next";
import { deleteProduct } from '@/lib/actions/product';
import config from "@/lib/config";

export type ITable = {
    id: string,
    title: string,
    price: number,
    stock: number,
    image: string,
}

export const columns: ColumnDef<ITable>[] = [
    
    {
        accessorKey: 'image',
        header: ({ table }) => (
            <div></div>
        ),
        cell: ({ row }) => (
            
            <div className="flex items-start gap-2">
                    <div className="size-10 overflow-hidden">
                        <IKImage
                            path={row.getValue('image')}
                            urlEndpoint={config.env.imagekit.urlEndpoint}
                            alt="image"
                            loading="lazy"
                            className="size-full object-cover w-10 h-10"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'title',
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
                    Nama Produk
                </button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-start gap-2">
                    <span>{row.getValue('title')}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'price',
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
                    Harga
                </button>
            )
        },
        cell: ({ row }) => <div>{row.getValue('price')}</div>,
    },
    {
        accessorKey: 'stock',
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
                    Stok
                </button>
            )
        },
        cell: ({ row }) => <div>{row.getValue('stock')}</div>,
    },
    {
        id: 'select',
        header: ({ table }) => <span>Action</span>,
        cell: ({ row }) => (
            <div className="flex items-center gap-2 w-full">
                <Button 
                    variant="default" 
                    className="w-full h-6" 
                    onClick={() => window.location.href = `/produk/edit/${row.original.id}`}
                >
                    Edit
                </Button>
                <Button 
                    variant="destructive" 
                    className="w-full h-6"
                    onClick={async () => {
                        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
                        if (!isConfirmed) return;
    
                        try {
                            await deleteProduct(row.original);
                            window.location.reload();
                        } catch (error) {
                            console.error("Gagal menghapus produk:", error);
                            alert("Terjadi kesalahan saat menghapus produk.");
                        }
                    }}
                >
                    Hapus
                </Button>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
]