import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { products } from "@/database/schema";

export async function GET() {
  try {
    const totalProduk = await db.select().from(products);
    return NextResponse.json({ total: totalProduk.length });
  } catch (error) {
    console.error("Error fetching total produk:", error);
    return NextResponse.json({ error: "Terjadi kesalahan dalam mengambil data" }, { status: 500 });
  }
}
