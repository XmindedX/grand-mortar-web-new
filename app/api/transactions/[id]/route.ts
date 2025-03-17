import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { orders, orderItems, receipts } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
        }

        // Cek apakah transaksi masih ada
        const existingOrder = await db
            .select()
            .from(orders)
            .where(eq(orders.id, id))
            .limit(1);

        if (existingOrder.length === 0) {
            return NextResponse.json({ message: "Transaksi tidak ditemukan" }, { status: 404 });
        }

        // Hapus semua order_items yang terkait
        await db.delete(orderItems).where(eq(orderItems.orderId, id));

        // Hapus semua receipts yang terkait
        await db.delete(receipts).where(eq(receipts.orderId, id));

        // Hapus transaksi (orders)
        await db.delete(orders).where(eq(orders.id, id));

        return NextResponse.json({ message: "Transaksi berhasil dihapus" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return NextResponse.json({ message: "Terjadi kesalahan saat menghapus transaksi", error: String(error) }, { status: 500 });
    }
}
