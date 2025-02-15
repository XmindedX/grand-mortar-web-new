import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { products } from "@/database/schema";

export async function GET (req: any) {
    const result = await db.select().from(products);
    return NextResponse.json(result);
}