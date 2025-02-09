
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Combobox } from "./ui/combobox"
import { CirclePlus } from "lucide-react"
import axios from "axios"
import  config  from "@/lib/config"
import { useSession } from "next-auth/react"


export default function AddToCart()  {

  const { data: session } = useSession();
  const userId = session?.user.id;

  const handleAddToCart = async () => {
    const result = await axios.post(`/api/cart`, {
      userId: userId,
      productId: productId?.id,
      quantity: quantity,
    });
  }

  const fetchProducts = async() => {
    await fetch(`${config.env.apiEndpoint}/api/products`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
        <CirclePlus color = "black"/>
            Tambah Produk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah produk</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Produk
            </Label>
            <Combobox />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Jumlah
            </Label>
            <Input id="qty" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            Tambah Produk
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}