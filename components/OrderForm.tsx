"use client"
import { useFieldArray, useForm } from "react-hook-form";
import React from "react";
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Textarea } from '@/components/ui/textarea'
import { Plus, ChevronsUpDown, Check, Trash2 } from 'lucide-react'

let renderCount = 0;

type FormValues = {
    customer: string;
    number: string;
    email: string;
    alamat: string;
    productList: {
      id: string;
      title: string;
      quantity: number;
    }[];
  };

export default function OrderForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            customer: "",
            number: "",
            email: "",
            productList: [{
              id: "",
              title: "",
              quantity: 0,
            }],
        },
      });
    
      const {
        register,
        control,
        handleSubmit,
        formState,
        watch,
        getValues,
        reset,
        trigger,
      } = form;
    
      const { fields, append, remove } = useFieldArray({
        name: "productList",
        control,
      });
    
    const products = [
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
      ]
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <>

        <div className="space-y-4">
            <div className="flex min-h-[calc(100vh_-_160px)] w-full items-center justify-center">
                <Card className="w-full max-w-[780px] rounded-lg p-4">
                    <CardContent>
                        <form className="space-y-5">
                            <div className="space-y-2.5">
                                <label className="block font-semibold leading-tight text-black">
                                    Nama Pembeli
                                </label>
                                <Input
                                    type="text"
                                />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2 sm:gap-3">
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Nomor Telepon
                                    </label>
                                    <div className="w-full">
                                    <Input
                                        type="number"
                                        placeholder="312-718-1914"
                                        className={`rounded-l-none`}
                                    />
                                    </div>
                                    
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="john.example@gmail.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                <label className="block font-semibold leading-tight text-black">
                                    Alamat
                                </label>
                                <Textarea
                                    rows={6}
                                    placeholder="Enter address here"
                                />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-3 sm:gap-3">
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Kota
                                    </label>
                                    <Input
                                    type="text"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Provinsi
                                    </label>
                                    <Input
                                    type="text"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block font-semibold leading-tight text-black">
                                        Kode Pos
                                    </label>
                                    <Input
                                    type="number"
                                    />
                                </div>
                            </div>
                            <DropdownMenuSeparator className="mx-0" />
                            <div className="grid gap-5 sm:grid-cols-3 sm:gap-3">
                                    <label className="block font-semibold leading-tight text-black">
                                        Nama Produk
                                    </label>
                                    <label className="block font-semibold leading-tight text-black">
                                        Jumlah
                                    </label>
                                    <label className="block font-semibold leading-tight text-black">
                                        Harga
                                    </label>
                            </div>
                            
                            <div className="space-y-2.5">
                                {fields.map((field, index) => (
                                
                                <div className="form-control" key={field.id}>
                                    <div className="grid gap-5 sm:grid-cols-3 sm:gap-3">
                                        <div className="space-y-2.5">
                                            <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[200px] justify-between"
                                            >
                                            {value
                                                ? products.find((products) => products.value === value)?.label
                                                : "Pilih produk..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                            <CommandInput placeholder="Cari produk..." />
                                            <CommandList>
                                                <CommandEmpty>Produk tidak ditemukan.</CommandEmpty>
                                                <CommandGroup>
                                                {products.map((products) => (
                                                    <CommandItem
                                                    key={products.value}
                                                    value={products.value}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                    >
                                                    <Check
                                                        className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === products.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {products.label}
                                                    </CommandItem>
                                                ))}
                                                </CommandGroup>
                                            </CommandList>
                                            </Command>
                                        </PopoverContent>
                                        </Popover>
                                        </div>
                                        <div className="space-y-2.5">
                                            <Input
                                            required
                                            type="number"
                                            />
                                        </div>
                                        <div className="flex space-y-2.5">
                                            <span className="flex leading-tight text-black justify-start pt-2 mt-0.5 ml-2">Rp. 100.000.000</span>
                                        {index > 0 && (
                                        <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="flex ml-5"
                                        >
                                            <Trash2 className="size-5" color="red" />
                                        </button>
                                    )}
                                        </div>
                                        
                                    </div>
                                    {/* <input
                                    type="text"
                                    {...register(`productList.${index}.title` as const)}
                                    /> */}

                                    
                                </div>
                                ))}
                            </div>
                            <Button
                                type="button"
                                variant={'black'}
                                className="bg-light-theme text-black hover:text-white"
                                onClick={() =>
                                    append({ id: "", title: "", quantity: 0 })}
                            >
                                <Plus className="size-4" />
                                Tambah Produk
                            </Button>   
                            <DropdownMenuSeparator className="mx-0" />
                            
                            <div className="flex items-center justify-between gap-4">
                                <Button
                                    variant={'outline-general'}
                                    size={'large'}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant={'default'}
                                    size={'large'}
                                >
                                    Buat Order
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
        </>
    )
}