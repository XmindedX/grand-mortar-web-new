"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, SortingState } from "@tanstack/react-table"
import { MoveDown, MoveUp, Trash2, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

// Create a context to share the selectedOrderIds state with the columns
const TableContext = createContext<{
  selectedOrderIds: string[];
  setSelectedOrderIds: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  selectedOrderIds: [],
  setSelectedOrderIds: () => {},
});

interface DataTableProps {
  data: ITable[];
  columns: ColumnDef<ITable>[];
  filterField?: string;
}

export function DataTable({ data, columns, filterField }: DataTableProps) {
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  return (
    <TableContext.Provider value={{ selectedOrderIds, setSelectedOrderIds }}>
      <div className="space-y-4">
        {/* Table */}
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th 
                      key={header.id}
                      className="text-left p-3 text-sm font-medium text-gray-700 border-b"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 border-b">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TableContext.Provider>
  )
}

// Hook to use the table context
export function useTableContext() {
  return useContext(TableContext);
}

// Define columns outside the component
export const columns: ColumnDef<ITable>[] = [
  // Add checkbox column at the beginning
  {
    id: "select",
    header: ({ table }) => {
      const { selectedOrderIds, setSelectedOrderIds } = useTableContext();
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedOrderIds(
              value ? table.getRowModel().rows.map(row => row.original.id) : []
            );
          }}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      const { selectedOrderIds, setSelectedOrderIds } = useTableContext();
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedOrderIds(prev =>
              value ? [...prev, row.original.id] : prev.filter(id => id !== row.original.id)
            );
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
    
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
          <Badge className="bg-gray-400 text-black">
              {row.getValue('trxId')}
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
                  Total
              </button>
          )
      },
      cell: ({ row }) => <div>
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
      cell: ({ row }) => <div>
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
                  Date
              </button>
          )
      },
      cell: ({ row }) => 
      <div>
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
      ),
  },
  {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
          const [open, setOpen] = useState(false);

          const handleDelete = async (id: string) => {
              if (!confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) return;
          
              try {
                  const response = await fetch(`/api/transactions/${id}`, {
                      method: "DELETE",
                  });
          
                  const data = await response.json();
                  if (!response.ok) throw new Error(data.message || "Gagal menghapus transaksi");
          
                  alert("Transaksi berhasil dihapus");
                  window.location.reload();
              } catch (error) {
                  if (error instanceof Error) {
                      alert("Error: " + error.message);
                  } else {
                      alert("Terjadi kesalahan yang tidak diketahui");
                  }
              }
          };
          
          return (
              <div className="flex gap-2">
                  <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                          <Button variant="default" className="h-6 flex-1">Lihat Detail</Button>
                      </DialogTrigger>
                      <DialogContent>
                          <DialogHeader>
                              <DialogTitle>Detail Transaksi</DialogTitle>
                          </DialogHeader>
                          <div className="overflow-x-auto">
                              <table className="w-full border-collapse border border-gray-300">
                                  <tbody>
                                      <tr><td className="p-2 border font-semibold">ID Transaksi</td><td className="p-2 border">{row.original.trxId}</td></tr>
                                      <tr><td className="p-2 border font-semibold">Pembeli</td><td className="p-2 border">{row.original.customer}</td></tr>
                                      <tr><td className="p-2 border font-semibold">No. HP</td><td className="p-2 border">{row.original.number}</td></tr>
                                      <tr><td className="p-2 border font-semibold">Email</td><td className="p-2 border">{row.original.email}</td></tr>
                                      <tr>
                                          <td className="p-2 border font-semibold">Alamat</td>
                                          <td className="p-2 border">{row.original.address}, {row.original.city}, {row.original.province}, {row.original.postalCode}</td>
                                      </tr>
                                      <tr><td className="p-2 border font-semibold">Total</td><td className="p-2 border">Rp. {row.original.total.toLocaleString("id-ID")}</td></tr>
                                      <tr><td className="p-2 border font-semibold">Piutang</td><td className="p-2 border">Rp. {row.original.piutang.toLocaleString("id-ID")}</td></tr>
                                      <tr>
                                          <td className="p-2 border font-semibold">Status</td>
                                          <td className="p-2 border">
                                              <Badge className={`px-2 py-1 rounded text-white ${row.original.status === "Lunas" ? "bg-green-500" : "bg-red-500"}`}>
                                                  {row.original.status}
                                              </Badge>
                                          </td>
                                      </tr>
                                      <tr><td className="p-2 border font-semibold">Tanggal Pemesanan</td><td className="p-2 border">{new Date(row.original.createdAt).toLocaleDateString("id-ID")}</td></tr>
                                  </tbody>
                              </table>
                          </div>
                      </DialogContent>
                  </Dialog>
  
                  <Button variant="default" className="h-6 flex-1" onClick={() => window.location.href = `/receipt/new/${row.original.id}`}>
                      Buat Receipt
                  </Button>
                  
                  <Button variant="destructive" className="h-6 flex-1" onClick={() => handleDelete(row.original.id)}>
                      <Trash2 className="size-4" />
                  </Button>
              </div>
          );
      },
  },
];