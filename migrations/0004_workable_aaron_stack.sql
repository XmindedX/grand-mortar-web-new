ALTER TABLE "cart_items" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_id_unique" UNIQUE("id");