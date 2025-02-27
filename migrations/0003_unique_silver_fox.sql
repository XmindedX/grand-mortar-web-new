ALTER TABLE "carts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_id_unique" UNIQUE("id");