import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { carts } from "@/database/schema";

export async function GET (req: any) {
    const result = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, req.params.id));
    return NextResponse.json(result);
}