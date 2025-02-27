import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { products } from "@/database/schema";

export async function GET(req: any) {
    const result = await db.select().from(products).where(eq(products.id, req.params.id));
    return NextResponse.json(result);
}