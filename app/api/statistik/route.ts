import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { orders, products } from "@/database/schema";
import { eq, gte, lt, and } from "drizzle-orm";
import { sql } from "drizzle-orm"; // Tambahkan ini

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

    const statistik = [];

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 1);

      // Hitung jumlah produk per bulan
      const produkCount = await db
        .select({ count: sql<number>`COUNT(*)` }) // ✅ Perbaikan COUNT
        .from(products)
        .where(and(gte(products.createdAt, startDate), lt(products.createdAt, endDate)));

      // Ambil total piutang bulan ini
      const piutangData = await db
        .select()
        .from(orders)
        .where(and(gte(orders.createdAt, startDate), lt(orders.createdAt, endDate)));

      const totalPiutang = piutangData.reduce((acc, order) => acc + (order.piutang || 0), 0);
      const totalPendapatan = piutangData.reduce((acc, order) => acc + (order.total || 0), 0);

      statistik.push({
        month: new Date(0, month).toLocaleString("id-ID", { month: "long" }),
        totalProduk: produkCount[0].count,
        totalPiutang,
        totalPendapatan,
      });
    }

    return NextResponse.json(statistik);
  } catch (error) {
    console.error("Error fetching statistik:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
