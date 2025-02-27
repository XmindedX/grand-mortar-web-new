import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { orders } from "@/database/schema";

export async function GET() {
  try {
    // Ambil semua orders yang belum lunas
    const ordersList = await db.select().from(orders).where(eq(orders.status, "Belum Lunas"));

    // Hitung total piutang
    const totalPiutang = ordersList.reduce((acc, item) => acc + (item.piutang || 0), 0);

    return NextResponse.json({ totalPiutang });
  } catch (error) {
    console.error("Error fetching total piutang:", error);
    return NextResponse.json({ error: "Terjadi kesalahan dalam mengambil data" }, { status: 500 });
  }
}
