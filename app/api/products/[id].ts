import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database/drizzle";
import { products } from "@/database/schema";
import { eq, sql } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "DELETE") {
        try {
            if (typeof id !== "string" || !/^[0-9a-f-]{36}$/.test(id)) {
                return res.status(400).json({ message: "ID tidak valid" });
            }

            await db.delete(products).where(eq(products.id, sql`${id}::uuid`));

            return res.status(200).json({ message: "Produk berhasil dihapus" });
        } catch (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({ message: "Terjadi kesalahan saat menghapus produk" });
        }
    } else {
        res.setHeader("Allow", ["DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
