"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

import axios from "axios";
import { useEffect, useState } from "react";

export function Combobox() {

  const [open, setOpen] = React.useState(false)
  const [label, setLabel] = useState()
  const [value, setValue] = useState()

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts();
  }, [])


  const getProducts = async () => {
    const result = await axios.post(`/api/all-products`);
    return setProductList(result.data);
  }

  console.log(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? productList.find((product) => product?.title === value)?.title
            : "Pilih produk..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cari produk..." className="h-9" />
          <CommandList>
            <CommandEmpty>Produk tidak ditemukan</CommandEmpty>
            <CommandGroup>
            {productList.map((product, index) => (
              
              <CommandItem
                key={index}
                value={product?.title}

                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {product?.title}
                <Check
                  className={cn(
                    "ml-auto",
                    value === product?.title ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>

            ))}

              {/* {productList.map((product, index) => (
                <CommandItem
                  key={index}
                  value={product}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {product}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === product ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))} */}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
