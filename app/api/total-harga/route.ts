import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { receipts } from "@/database/schema";

export async function GET() {
  try {
    // Ambil semua data dari tabel receipts dan jumlahkan nominalnya
    const receiptList = await db.select().from(receipts);
    const totalHarga = receiptList.reduce((acc, item) => acc + (item.nominal || 0), 0);

    return NextResponse.json({ totalHarga });
  } catch (error) {
    console.error("Error fetching total harga:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
